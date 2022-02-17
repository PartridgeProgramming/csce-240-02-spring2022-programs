/*
 * Rectangle.cpp
 *
 *  Created on: Feb 8, 2022
 *      Author: Alden Partridge
 */

#include "Rectangle.h"
	//public:
		Rectangle::Rectangle(double l, double b) {
			length = l, breadth = b;
		}
		Rectangle::Rectangle() {
			length = 0, breadth = 0;
		}
		Rectangle::~Rectangle() {
			//destructor stub
		}
		double Rectangle::getArea() {
			return length*breadth;
		}
		double Rectangle::getPerimeter() {
			return 2*(length*breadth);
		}
		void Rectangle::setBreadth(double b) {
			breadth = b;
		}
		void Rectangle::setLength(double l) {
			length = l;
		}
		string Rectangle::getErrorMessage() {
			return "An error has occurred with the rectangle class.\n";
		}
