import numpy as np
import numpy.random as random
import cv2

import Queue



def compute_prob(map, threshold=0.1):
	w,h = map.shape

	sigma = 1.0*np.count_nonzero(map)/np.size(map)

	return np.abs(random.Light.normal(0,sigma))<threshold




random.seed()


w = 200
h = 200

map = np.zeros((w,h))
walked_places = np.zeros((w,h))

# earth should be 60% of the map
maxSize = 0.6*w*h

seed = [w/2,h/2]#[random.randint(w/3,w-w/3),random.randint(h/5,h-h/5)]
map[seed[0],seed[1]] = 1
walked_places[seed[0],seed[1]] = 1


earthSize = np.count_nonzero(map)


#seed_point // starting point
#visited // boolean array/matrix, same size as image
#point_queue // empty queue

#point_queue.enqueue( seed_point )
#visited( seed_point ) = true
#
#while( point_queue is not empty ) {
#    this_point = point_queue.dequeue()
#    for each neighbour of this_point {
#        if not visited( neighbour ) and neighbour is black/red/whatever
#            point_queue.enqueue( neighbour )
#            visited( neighbour ) = true
#    }
#}


points = Queue.Queue()
points.put(seed)


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
			if compute_prob(map):
				map[temp_pix[0],temp_pix[1]] = 1
				points.put(temp_pix)

	earthSize = np.count_nonzero(map)



kernel = np.ones((5,5),np.uint8)
closing = cv2.morphologyEx(map*255, cv2.MORPH_CLOSE, kernel)

cv2.imshow( "Display window", closing);
cv2.waitKey(0)
