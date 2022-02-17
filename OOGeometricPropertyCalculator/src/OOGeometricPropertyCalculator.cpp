/*
 * OOGeometricPropertyCalculator.cpp
 *
 *  Created on: Feb 8, 2022
 *      Author: Alden Partridge
 */

#include "Shape.h"
#include "Circle.h"
#include "Triangle.h"
#include "Rectangle.h"

#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>

using namespace std;

int main () {

	int choice;
	string delimiter = " ";

	//The input and output file pathways
	string input_file = "data/input.txt";
	string output_file = "data/output.txt";

	//string line holds the line as the program goes through the input file
	string line;
	//string output is used to make a string that will be put into the output file
	string output = "";

	//polygon is a nested vector that will hold vectors that represent the lines of the input file
	vector<vector<string>> polygon{};
	//lineV is a vector that represents a singular line of the input file that has been broken up
	vector<string> lineV{};

	size_t pos = 0;

	//Informs user on the program and queries for which option
	cout<<"Welcome to the OOGeometricPropertyCalculator, please fill in the input file and then run this program again before proceeding."<<endl;
	/*
	cout<<"Now, please enter either 1 for the AREA of all shapes in the input file, 2 for the PERIMETER of all shapes in the input file, or anything else to end the program: "<<endl;
	cin>>choice;
	*/
	//this is for debugging purposes, the console input does not work when running through debug mode
	choice = 1;

	//input and output stream for the input and output files
	ifstream input_myfile(input_file);
	ofstream output_myfile(output_file);

	//creates the rectangle, circle, and triangle objects to be used for calculation
	Rectangle rec;
	Circle cir;
	Triangle tri;

	//Area
	if (choice == 1) {
		//Check to make sure that the input file is open, otherwise throw an error message
		if (input_myfile.is_open()) {
			//Check to make sure that the output file is open, otherwise throw an error message
			if (output_myfile.is_open()) {
				//Loops through the lines
				while (getline(input_myfile, line)) {
					//Once on a line, goes through it to find the information
					while ((pos = line.find(delimiter)) != string::npos) {
						lineV.push_back(line.substr(0, pos));
						line.erase(0, pos + delimiter.length());
					}
					lineV.push_back(line);
					polygon.push_back(lineV);
					lineV.clear();
					}

				for (unsigned int a = 0; a < polygon.size(); a++) {
					//((polygon[a][0] == "Circle")||(polygon[a][0] == "circle")) ((polygon[a][0].compare("Circle")== 0)||(polygon[a][0].compare("circle")==0))
					if  ((polygon[a][0] == "Circle")||(polygon[a][0] == "circle")) {
						if (polygon[a].size() == 2) {
							cir.setRadius(stod(polygon[a][1]));
							output = "Circle area: " + to_string(cir.getArea()) + "\n";
							cout<<"Putting area of line "<<a+1<<" into output file."<<endl;
							output_myfile<<output;
						}
						else {
							output = cir.getErrorMessage();
							cout<<"Error on line "<<a+1<<endl;
							output_myfile<<output;
						}
					}
					//((polygon[a][0] == "Rectangle")||(polygon[a][0] == "rectangle")) ((polygon[a][0].compare("Rectangle")== 0)||(polygon[a][0].compare("rectangle")==0))
					else if  ((polygon[a][0] == "Rectangle")||(polygon[a][0] == "rectangle")) {
						if (polygon[a].size() == 3) {
							rec.setLength(stod(polygon[a][1]));
							rec.setBreadth(stod(polygon[a][2]));
							output = "Rectangle area: " + to_string(rec.getArea()) + "\n";
							cout<<"Putting area of line "<<a+1<<" into output file."<<endl;
							output_myfile<<output;
						}
						else {
							output = rec.getErrorMessage();
							cout<<"Error on line "<<a+1<<endl;
							output_myfile<<output;
						}
					}

					else if ((polygon[a][0] == "Triangle")||(polygon[a][0] == "triangle")) {
						if (polygon[a].size() == 4) {
							tri.setSideA(stod(polygon[a][1]));
							tri.setSideB(stod(polygon[a][2]));
							tri.setSideC(stod(polygon[a][3]));
							output = "Triangle Area: " + to_string(tri.getArea()) + "\n";
							cout<<"Putting area of line "<<a+1<<" into output file."<<endl;
							output_myfile<<output;
						}
						else {
							output = tri.getErrorMessage();
							cout<<"Error on line "<<a+1<<endl;
							output_myfile<<output;
						}
					}

					else {
						output = "The name does not match either: Triangle, Circle, or Rectangle.\n";
						output_myfile<<output;
					}

					//for (unsigned int b = 0; b < polygon[a].size(); b++) {
						//cout<<polygon[a][b]<<" "<<a<<" "<<b<<endl;
					//}
				}

				}
			else {
				cout<<"The output file could not be opened, please ensure that the path is valid.";
				return 1;
				}
			}
			else {
				cout<<"The input file could not be opened, please ensure that the path is valid.";
				return 1;
			}
		}
	//Perimeter
	else if (choice == 2) {
		//Check to make sure that the input file is open, otherwise throw an error message
				if (input_myfile.is_open()) {
					//Check to make sure that the output file is open, otherwise throw an error message
					if (output_myfile.is_open()) {
						//Loops through the lines
						while (getline(input_myfile, line)) {
							//Once on a line, goes through it to find the information
							while ((pos = line.find(delimiter)) != string::npos) {
								lineV.push_back(line.substr(0, pos));
								line.erase(0, pos + delimiter.length());
							}
							lineV.push_back(line);
							polygon.push_back(lineV);
							lineV.clear();
							}

						for (unsigned int a = 0; a < polygon.size(); a++) {

							if  ((polygon[a][0] == "Circle")||(polygon[a][0] == "circle")) {
								if (polygon[a].size() == 2) {
									cir.setRadius(stod(polygon[a][1]));
									output = "Circle perimeter: " + to_string(cir.getPerimeter()) + "\n";
									cout<<"Putting perimeter of line "<<a+1<<" into output file."<<endl;
									output_myfile<<output;
								}
								else {
									output = cir.getErrorMessage();
									cout<<"Error on line "<<a+1<<endl;
									output_myfile<<output;
								}
							}

							else if ((polygon[a][0] == "Rectangle")||(polygon[a][0] == "rectangle")) {
								if (polygon[a].size() == 3) {
									rec.setLength(stod(polygon[a][1]));
									rec.setBreadth(stod(polygon[a][2]));
									output = "Rectangle perimeter: " + to_string(rec.getPerimeter()) + "\n";
									cout<<"Putting perimeter of line "<<a+1<<" into output file."<<endl;
									output_myfile<<output;
								}
								else {
									output = rec.getErrorMessage();
									cout<<"Error on line "<<a+1<<endl;
									output_myfile<<output;
								}
							}

							else if ((polygon[a][0] == "Triangle")||(polygon[a][0] == "triangle")) {
								if (polygon[a].size() == 4) {
									tri.setSideA(stod(polygon[a][1]));
									tri.setSideB(stod(polygon[a][2]));
									tri.setSideC(stod(polygon[a][3]));
									output = "Triangle periemter: " + to_string(tri.getPerimeter()) + "\n";
									cout<<"Putting perimeter of line "<<a+1<<" into output file."<<endl;
									output_myfile<<output;
								}
								else {
									output = tri.getErrorMessage();
									cout<<"Error on line "<<a+1<<endl;
									output_myfile<<output;
								}
							}

							else {
								output = "The name does not match either: Triangle, Circle, or Rectangle.\n";
								output_myfile<<output;
							}
						}

						}
					else {
						cout<<"The output file could not be opened, please ensure that the path is valid.";
						return 1;
						}
					}
					else {
						cout<<"The input file could not be opened, please ensure that the path is valid.";
						return 1;
					}
	}
	//End program
	else {
		cout<<"Neither 1 nor 2 were selected, exiting program.";
		return 0;
	}
}
