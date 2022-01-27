/*
 * GeometricPropertyCalculator.cpp
 *
 *  Created on: Jan 25, 2022
 *      Author: Alden Partridge
 *  Note: unless otherwise specified measurements are in cm.
 */

#include <iostream>
#include <string>
#include <cmath>
#include <fstream>
#include <sstream>
#include <vector>
#include <bits/stdc++.h>

using namespace std;
//================================================
struct Rectangle {
	double length;
	double breadth;
};
//================================================
struct Circle {
	double radius;
};
//================================================
struct Triangle {
	double side1;
	double side2;
	double side3;
};
//================================================
//Methods to get the area or perimeter of a rectangle
double RectangleArea(double length, double breadth) {
	return length*breadth;
}
double RectanglePerimeter(double length, double breadth) {
	return 2*(length*breadth);
}
//================================================
//Methods to get the area or perimeter of a circle
double CircleArea(double r) {
	return M_PI*pow(r,2);
}
double CirclePerimeter(double r) {
	return 2*M_PI*r;
}
//================================================
//Methods to get the area or the perimeter of a triangle
//Finds area of a triangle using Heron's Formula
double TriangleArea(double a, double b, double c) {
	double p = (a+b+c)/2;
	return pow(p*(p-a)*(p-b)*(p-c),0.5);
}
double TrianglePerimeter(double a, double b, double c) {
	return a*b*c;
}
//================================================
int main() {
	int answer = 0;

	//Default values for the program to run
	string input_file = "data/input.txt";
	string output_file = "data/output.txt";
	string line;
	string delimiter = " ";
	string::size_type sz;

	//Polygon vector holds the text in the input file
	vector<string> polygon{};

	//polyAruguments vector will hold all values in the input value except the first,
	//since that is supposed to be the signifier of what polygon for calculation
	vector<double> polyArguments{};

	size_t pos = 0;
	string output = "An error has occurred.";

	//input and output stream for the input and output files
	ifstream input_myfile(input_file);
	ofstream output_myfile(output_file);

	cout<<"Welcome to the Geometric Property Calculator, if you haven't already please configure the input file. \nOnce done, reboot this program and enter either a 1 for the area or 2 for the perimeter: ";
	cin>>answer;

	//1 was selected, Area
	if (answer == 1) {
		//Checks if the input file is open, otherwise throw an error message
		if (input_myfile.is_open()) {
			//Checks if the output file is open, otherwise throw an error message
			if (output_myfile.is_open()) {
				//Populates the vector polygon using the text in the input file
				while (getline(input_myfile, line)) {
					while ((pos = line.find(delimiter)) != string::npos) {
						polygon.push_back(line.substr(0, pos));
						line.erase(0, pos + delimiter.length());
					}
					polygon.push_back(line);
				}

					//Populates the polyArugments vector by using the polygon vector
					//unsigned int just to get rid of the warning
					for (unsigned int j = 1; j < polygon.size(); j++) {
						polyArguments.insert(polyArguments.begin()+j-1,stod(polygon[j]));
					}

					//if else tree to compare the first value of the polygon vector for calculation, otherwise throw an error message in the output file
						if (polygon[0].compare("RECTAGNLE") == 0) {
							if (polygon.size() != 3) {
								output_myfile<<"RECTAGNLE AREA Not enough information for calculation! Double check the input file.";
								cout<<"RECTAGNLE AREA Not enough information for calculation! Double check the input file.";
								return 1;
							}
							output = "RECTAGNLE AREA " + to_string(RectangleArea(polyArguments[0], polyArguments[1]));
							output_myfile << output;
							cout<<"Operation successful, check output file.";
						}
						else if (polygon[0].compare("TRIANGLE") == 0) {
							if (polygon.size() != 4) {
								output_myfile<<"TRIANGLE AREA Not enough information for calculation! Double check the input file.";
								cout<<"TRIANGLE AREA Not enough information for calculation! Double check the input file.";
								return 1;
							}
							output = "TRIANGLE AREA " + to_string(TriangleArea(polyArguments[0], polyArguments[1], polyArguments[2]));
							output_myfile << output;
							cout<<"Operation successful, check output file.";
						}
						else if (polygon[0].compare("CIRCLE") == 0) {
							if (polygon.size() != 2) {
								output_myfile<<"CIRCLE AREA Not enough information for calculation! Double check the input file.";
								cout<<"CIRCLE AREA Not enough information for calculation! Double check the input file.";
								return 1;
							}
							output = "CIRCLE AREA " + to_string(CircleArea(polyArguments[0]));
							output_myfile << output;
							cout<<"Operation successful, check output file.";
						}
						else {
							cout<<"The first value in the input file is not recognized, please ensure that the input file is formatted correctly and then reboot this program.";
						}
					output_myfile.close();
				}
			else {
				cout<<"Unable to open output file - " << output_file << endl;
			}
		}
		else {
			cout<<"Unable to open input file - " << input_file << endl;
		}
		input_myfile.close();
	}

	//2 was selected, Perimeter
	else if (answer == 2) {
		//Checks if the input file is open, otherwise throw an error message
				if (input_myfile.is_open()) {
					//Checks if the output file is open, otherwise throw an error message
					if (output_myfile.is_open()) {
						//Populates the vector polygon using the text in the input file
						while (getline(input_myfile, line)) {
							while ((pos = line.find(delimiter)) != string::npos) {
								polygon.push_back(line.substr(0, pos));
								line.erase(0, pos + delimiter.length());
							}
							polygon.push_back(line);
						}

							//Populates the polyArugments vector by using the polygon vector
							//unsigned int just to get rid of the warning
							for (unsigned int j = 1; j < polygon.size(); j++) {
								polyArguments.insert(polyArguments.begin()+j-1,stod(polygon[j]));
							}

				//if else tree to compare the first value of the polygon vector for calculation, otherwise throw an error message in the output file
					if (polygon[0].compare("RECTAGNLE") == 0) {
						if (polygon.size() != 3) {
							output_myfile<<"RECTANGLE PERIMETER Not enough information for calculation! Double check the input file.";
							cout<<"RECTANGLE PERIMETER Not enough information for calculation! Double check the input file.";
							return 1;
						}
						output = "RECTAGNLE PERIMETER " + to_string(RectanglePerimeter(polyArguments[0], polyArguments[1]));
						output_myfile << output;
						cout<<"Operation successful, check output file.";
					}
					else if (polygon[0].compare("TRIANGLE") == 0) {
						if (polygon.size() != 4) {
							output_myfile<<"TRIANGLE PERIMETER Not enough information for calculation! Double check the input file.";
							cout<<"TRIANGLE PERIMETER Not enough information for calculation! Double check the input file.";
							return 1;
						}
					output = "TRIANGLE PERIMETER " + to_string(TrianglePerimeter(polyArguments[0], polyArguments[1], polyArguments[2]));
					output_myfile << output;
					cout<<"Operation successful, check output file.";
					}
					else if (polygon[0].compare("CIRCLE") == 0) {
						if (polygon.size() != 2) {
							output_myfile<<"CIRCLE PERIMETER Not enough information for calculation! Double check the input file.";
							cout<<"CIRCLE PERIMETER Not enough information for calculation! Double check the input file.";
							return 1;
						}
					output = "CIRCLE PERIMETER " + to_string(CirclePerimeter(polyArguments[0]));
					output_myfile << output;
					cout<<"Operation successful, check output file.";
					}
					else {
						cout<<"The first value in the input file is not recognized, please ensure that the input file is formatted correctly and then reboot this program.";
						}
						output_myfile.close();
					}
					else {
						cout<<"Unable to open output file - " << output_file << endl;
					}
				}
				else {
					cout<<"Unable to open input file - " << input_file << endl;
				}
				input_myfile.close();
	}

	//Neither 1 or 2 was selected, give error message
		else {
			cout<<"You selected neither 1 nor 2. Reboot this program and you can try again.\n";
		}
	return 0;
}
