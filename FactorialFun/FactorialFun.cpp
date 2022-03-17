/*
 * FactorialFun.cpp
 *
 *  Created on: Mar 15, 2022
 *      Author: Alden Partridge
 */

#include "FactorialFun.h"

#include <vector>
#include <iostream>
#include <string>
#include <chrono>

using namespace std;
//==================================================================
unsigned int factorial(unsigned int f) {
	if (f < 1) {
		throw invalid_argument("f must be greater than 1");
	}
	unsigned int factorial = 1;
	for (unsigned int i = 1; f >= i; i++) {
		factorial*=i;
		}
	return factorial;
}
//==================================================================
unsigned long long int combination(unsigned int n, unsigned int r) {
	if (n <= r) {
		throw invalid_argument("r must be smaller than n");
	}
	if ((n<1)||(r<1)) {
		throw invalid_argument("r or n need to be greater than 1");
	}
	int combination = (factorial(n)/(factorial(r)*(factorial(n-r))));
	return combination;
}
//==================================================================
int main () {
	string line;
	string delimiter = " ";
	bool end = false;
	size_t pos = 0;

	vector<string> lineV{};
	int lineArgs[2]={};

	try {
		while (end != true) {
			line = "";
			cout<<"> FactorialFun ";
			cin>>line;
			//line = "4 8";
			while ((pos = line.find(delimiter)) != string::npos) {
					lineV.push_back(line.substr(0, pos));
					line.erase(0, pos + delimiter.length());
				}
			lineV.push_back(line);
			line = "";

			for (unsigned int j = 0; j < lineV.size(); j++) {
				lineArgs[j] = stoi(lineV[j]);
			}

			if (lineV.size() == 1) {
				auto start = std::chrono::steady_clock::now();
				cout<<factorial(lineArgs[0])<<endl;
				auto end = std::chrono::steady_clock::now();
				std::chrono::duration<double> diff_in_seconds = end - start;
				cout<<"Time for processing "<<diff_in_seconds.count()<< " seconds"<<endl<<endl;
				lineV.clear();
			}

			else if (lineV.size() == 2) {
				auto start = std::chrono::steady_clock::now();
				cout<<endl<<combination(lineArgs[0], lineArgs[1])<<endl;
				auto end = std::chrono::steady_clock::now();
				std::chrono::duration<double> diff_in_seconds = end - start;
				cout<<"Time for processing "<<diff_in_seconds.count()<< " seconds"<<endl<<endl;
				lineV.clear();
			}

			else {
				lineV.clear();
				cout<<"Too many input values given."<<endl;
				end = true;
			}
		}
		cout<<"Exiting program";
		return 0;
	}
	catch (invalid_argument&) {
		cout<<"An error has occurred! Exiting program.";
		//end = true;
		return 1;
	}
}

