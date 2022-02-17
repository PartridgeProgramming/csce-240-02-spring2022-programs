/*
 * Circle.cpp
 *
 *  Created on: Feb 8, 2022
 *      Author: Alden Partridge
 */

#include "Circle.h"
#include <cmath>
	//public:
		Circle::Circle(double r) {
			radius = r;
		}
		Circle::Circle() {
			radius = 0;
		}
		Circle::~Circle() {
			//destructor stub
		}
		double Circle::getArea() {
				return M_PI*pow(radius,2);
			}
		double Circle::getPerimeter(){
				return 2*M_PI*radius;
			}
		void Circle::setRadius(double r) {
			radius = r;
		}
		string Circle::getErrorMessage() {
			return "An error has occurred with the circle class.\n";
		}

