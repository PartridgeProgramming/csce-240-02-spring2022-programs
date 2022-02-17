/*
 * Triangle.cpp
 *
 *  Created on: Feb 8, 2022
 *      Author: Alden Partridge
 */
#include <cmath>
#include "Triangle.h"

	//public:
		Triangle::Triangle(double a, double b, double c) {
			sideA =a, sideB = b, sideC = c;
		}
		Triangle::Triangle() {
			sideA = 0, sideB = 0, sideC = 0;
		}
		Triangle::~Triangle() {
			//destructor stub
		}
		double Triangle::getArea() {
				double p = (sideA+sideB+sideC)/2;
				return pow(p*(p-sideA)*(p-sideB)*(p-sideC),0.5);
			}
		double Triangle::getPerimeter() {
				return sideA*sideB*sideC;
			}
		void Triangle::setSideA(double a) {
			sideA = a;
		}
		void Triangle::setSideB(double b) {
			sideB = b;
		}
		void Triangle::setSideC(double c) {
			sideC = c;
		}
		string Triangle::getErrorMessage() {
			return "An error has occurred with the triangle class.\n";
		}

