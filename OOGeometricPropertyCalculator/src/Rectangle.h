/*
 * Rectangle.h
 *
 *  Created on: Feb 8, 2022
 *      Author: Alden Partridge
 */

#ifndef RECTANGLE_H_
#define RECTANGLE_H_
#include "Shape.h"
#pragma once

class Rectangle : public Shape{
	protected:
		double length, breadth;
	public:
		Rectangle(double length, double breadth);
		Rectangle();
		virtual ~Rectangle();
		double getArea();
		double getPerimeter();
		void setLength(double);
		void setBreadth(double);
		string getErrorMessage();
};

#endif /* RECTANGLE_H_ */
