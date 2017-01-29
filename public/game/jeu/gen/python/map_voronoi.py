import numpy as np
import numpy.random as random
import cv2
import Queue
import noise

# 1 - feelic.fr PtolemyJS creer une map random avec n=random() cells en mode voronoi
# 2 - Au centre de chaque cell generer un bruit de perlin -- parametres en fonction de distance aux autres cells
# 3 - Ajouter les perlin noises
# 4 - Decider de terre vs mer avec un threshold
# 5 - Reshaper en hexa a la fin et sous-echantillonner


#===========
# functions
#===========

def compute_prob(map, n, threshold=0.1):
	w,h = map.shape

	sigma = 1.0*np.count_nonzero(map)/np.size(map)

	return np.abs(random.normal(0,sigma)*np.sqrt(n+1))<threshold


#===========
# main loop
#===========

random.seed()
w = 150
h = 150

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

maxSize = 0.5*w*h

for seed in seeds:
    map[seed[0], seed[1]] = 1
    walked_places[seed[0],seed[1]] = 1
    points.put(seed)


earthSize = np.count_nonzero(map)


while earthSize<maxSize and not points.empty():

	cur_pix = points.get()

	# orientations
	orient = [(1, 0), (0, 1), (-1, 0), (0, -1), (1, 1), (1, -1), (-1, -1), (-1, 1)]

	for j in range(len(orient)):
		temp_pix = [cur_pix[0] +orient[j][0], cur_pix[1] +orient[j][1]]

		# are we still in range?
		is_on_map = w>temp_pix[0]>0 and h>temp_pix[1]>0

		if is_on_map and walked_places[temp_pix[0],temp_pix[1]] == 0:
			walked_places[temp_pix[0],temp_pix[1]] = 1
			if compute_prob(map,nbCells):
				map[temp_pix[0],temp_pix[1]] = 1
				points.put(temp_pix)

	earthSize = np.count_nonzero(map)



kernel = np.ones((5,5),np.uint8)
closing = cv2.morphologyEx(map*255, cv2.MORPH_CLOSE, kernel)

cv2.imshow( "Display window", closing);
cv2.waitKey(0)
