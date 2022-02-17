/*
 * Shape.h
 *
 *  Created on: Feb 8, 2022
 *      Author: Alden Partridge
 */

#ifndef SHAPE_H_
#define SHAPE_H_

#include <string>

using namespace std;

class Shape {
	private:
		double area;
		double perimeter;
		string errorMessage;
	public:
		Shape();
		virtual ~Shape();
		double getArea();
		double getPerimeter();
		string getErrorMessage();
};

#endif /* SHAPE_H_ */
