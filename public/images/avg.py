#!/usr/bin/python3

import cv2

img = cv2.imread('background.png')

h, w = img.shape[:2]


b, g, r = 0, 0, 0
for i in range(h):
	for j in range(w):
		b = b+img[i,j,0]
		g = g+img[i,j,1]
		r = r+img[i,j,2]

print(str( int(r/(w*h)) ), str(int(g/(w*h))), str(int(b/(w*h))))
cv2.waitKey(0)