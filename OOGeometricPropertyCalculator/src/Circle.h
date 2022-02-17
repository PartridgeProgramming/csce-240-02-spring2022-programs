/*
 * Circle.h
 *
 *  Created on: Feb 8, 2022
 *      Author: Alden Partridge
 */

#ifndef CIRCLE_H_
#define CIRCLE_H_
#include "Shape.h"

class Circle : public Shape{
	private:
		double radius;
	public:
		Circle(const double r);
		Circle();
		virtual ~Circle();
		double getArea();
		double getPerimeter();
		void setRadius(double);
		string getErrorMessage();
};

#endif /* CIRCLE_H_ */
