
import argparse

import Queue
import numpy as np
import numpy.random as random
import cv2
import noise

# idee pour la suite ...
# 1 - feelic.fr PtolemyJS creer une map random avec n=random() cells en mode voronoi
# 2 - Au centre de chaque cell generer un bruit de perlin -- parametres en fonction de distance aux autres cells
# 3 - Ajouter les perlin noises
# 4 - Decider de terre vs mer avec un threshold
# 5 - Reshaper en hexa a la fin et sous-echantillonner


#===========
# functions
#===========

def compute_prob(map, n, threshold=0.1):
	'''
	Decide whether a pixel is land (return true) or water (return false) based on a probability function
	
	Here, the probability is simply a gaussian G of average 0 and stdev sigma. If |G(0,sigma)| < threshold,
	then return 1. 
	
	With a gaussian function, 66% of the values will be between 0 and sigma and 95% between 0 and 3*sigma. 
	The output is then fully parameterized by sigma and threshold. In order to make land masses limited in space, 
	sigma increases when the number of land pixels increases : sigma = # of non-zero pixels in map / size of the map
	
	To account for several land islands, the parameter n is introduced. In this case, the gaussian function becomes: 
	(n+1)*|G(0,sigma)| < threshold (with n+1  since the inde n starts at 0 for 1 island). In this case, the probabily of drawing 
	a land pixel is increased n-times to account for the n land masses. Conversely, the number of non-zero pixels in the map 
	will increase faster, making the gaussian spread wider, which balances the process. 
	
	This function is just an example and could be adapted to get a more complex behavior. 
	'''
	w,h = map.shape

	sigma = 1.0*np.count_nonzero(map)/np.size(map)

	return np.abs(random.normal(0,sigma)*np.sqrt(n+1))<threshold




#===========
# main loop
#===========

if __name__ == '__main__':

	# Always start by seeding the random number generator
	random.seed()
	
	#properties
	parser = argparse.ArgumentParser(description='Process some integers.')
	parser.add_argument('h', metavar='N', type=int, nargs='?',const=100)
	parser.add_argument('w', metavar='N', type=int,  nargs='?', const=100)
	parser.add_argument('size', metavar='N', type=int,  nargs='?',const=1)

	args = parser.parse_args()

	w = args.w 
	h = args.h 
        size=args.size 

	map = np.zeros((w,h))
	walked_places = np.zeros((w,h))

	nbCells = random.randint(0,5) #0-indexed, 0 means 1 cell

	#dice-like patterns with n+1 points as starting seeds
	divisions = np.asarray([
	    [[w/2,h/2]],
	    [[w/4,h/4],[3*w/4,3*h/4]],
	    [[w/4,h/4],[3*w/4,3*h/4],[w/2,h/2]],
	    [[w/4,h/4],[3*w/4,3*h/4],[w/4,3*h/4],[3*w/4,h/4]],
	    [[w/4,h/4],[3*w/4,3*h/4],[w/4,3*h/4],[3*w/4,h/4],[w/2,h/2]]])

	seeds = np.asarray(divisions[nbCells])

	points = Queue.Queue()

	maxSize = size*w*h

	for seed in seeds:
	    map[seed[0], seed[1]] = 1
	    walked_places[seed[0],seed[1]] = 1
	    points.put(seed)


	earthSize = np.count_nonzero(map)

	while earthSize<maxSize and not points.empty():

		cur_pix = points.get()

		# orientations, 8-connectivity
		orient = [(1, 0), (0, 1), (-1, 0), (0, -1), (1, 1), (1, -1), (-1, -1), (-1, 1)]

		# Scan tiles around and decide whether it is land or water
		for j in range(len(orient)):
			temp_pix = [cur_pix[0] +orient[j][0], cur_pix[1] +orient[j][1]]

			# are we still in range?
			is_on_map = w>temp_pix[0]>0 and h>temp_pix[1]>0

			# If the index is within the limits of the map and the pixels has not been looked at already
			if is_on_map and walked_places[temp_pix[0],temp_pix[1]] == 0:
				walked_places[temp_pix[0],temp_pix[1]] = 1
				
				# if this is a land pixel, update map 
				# and place point in the queue for continuing the region growing
				if compute_prob(map,nbCells):
					map[temp_pix[0],temp_pix[1]] = 1
					points.put(temp_pix)

		# update the earthsize for the while condition 
		earthSize = np.count_nonzero(map)


                
	#======
	# Construct an image for visualization of the generated map
	#======

        
	kernel = np.ones((5,5),np.uint8)
	closing = cv2.morphologyEx(map*255, cv2.MORPH_CLOSE, kernel)

	cv2.imshow( "Display window", closing);
	cv2.waitKey(0)
