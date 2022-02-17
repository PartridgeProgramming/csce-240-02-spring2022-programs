/*
 * Shape.cpp
 *
 *  Created on: Feb 8, 2022
 *      Author: Alden Partridge
 */

#include "Shape.h"
/*
	protected:
		double area = 0;
		double perimeter = 0;
		std::string errorMessage = "An error has occurred.";
		*/
	//public:
		Shape::Shape() {
			area = 0; perimeter = 0, errorMessage = "An error has occurred";
		}
		Shape::~Shape() {
			//destructor stub
		}
		double Shape::getArea() {
			return area;
		}
		double Shape::getPerimeter() {
			return perimeter;
		}
		string Shape::getErrorMessage() {
			return errorMessage;
		}

