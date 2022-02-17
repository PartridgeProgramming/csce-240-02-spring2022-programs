/*
 * Triangle.h
 *
 *  Created on: Feb 8, 2022
 *      Author: Alden Partridge
 */

#ifndef TRIANGLE_H_
#define TRIANGLE_H_
#include "Shape.h"

class Triangle : public Shape{
	protected:
		double sideA,sideB,sideC;
	public:
		Triangle(const double a, const double b, const double c);
		Triangle();
		virtual ~Triangle();
		double getArea();
		double getPerimeter();
		void setSideA(double);
		void setSideB(double);
		void setSideC(double);
		string getErrorMessage();
};

#endif /* TRIANGLE_H_ */
