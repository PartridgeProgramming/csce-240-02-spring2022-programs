/*
 * FileBasedCalculator.cpp
 *
 *  Created on: Jan 18, 2022
 *      Author: Alden Partridge
 *  Note: Unfortunately, doesn't actually work right now. Provides no output in the output file.
 */

#include <iostream>
#include <string>
#include <fstream>
#include <vector>

using namespace std;

vector<string> splitStrings(string str, char dl) {
		string word = "";

		int l = str.size();

		vector<string> substr_list;
		for (int i = 0; i < l; i++) {
			if (str[i] != dl)
				word = word +str[i];
			else {
				if ((int)word.size() != 0)
					substr_list.push_back(word);
				word = "";
			}
		}
		return substr_list;
	}
int main() {
	ifstream in("input.txt");
	if (in) {
		in.seekg(0, std::ios::end);
		size_t len = in.tellg();
		in.seekg(0);
		string contents(len + 1, '\0');
		in.read(&contents[0], len);

		//Sets a delimiter
		char dl = '\n';

		//Makes a vector for the input
		vector<string> res = splitStrings(contents, dl);

		int i = 0;
		while (getline(in, res[i])) {
			in >> res[i];
			i++;
		}
		in.close();
		//Sets the numbers to the second and third lines in the input file
		double numba1 = stod(res[1]);
		double numba2 = stod(res[2]);

		//Initializes the result for the output file
		double result = 0;

		//if tree to determine what operation to use based on the first line in the input file
		if (res[0] == "add") {
			result = numba1 + numba2;
		}
		if (res[0] == "subtract") {
			result = numba1 - numba2;
		}
		if (res[0] == "multiply") {
			result = numba1 * numba2;
		}
		if (res[0] == "divide") {
			result = numba1 / numba2;
		}

		//Opens up an output file and puts the result into it
		fstream myoutput;
		myoutput.open("output.txt", ios::out);
		if (myoutput.is_open()) {
			myoutput<<result;
			myoutput.close();
		}
		return 0;
	}
}


