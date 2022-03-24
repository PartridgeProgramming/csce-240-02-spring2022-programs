/*
* @author Alden Partridge
 *
 */
import java.io.*;
import java.util.*;

public class prog4userintent2querymapper {

	/**
	 * @param args
	 */
	
	/*
	 * Known user query
	 * "Tell me about the representative"
	 * "Where does the rep live"
	 * "How do I contact my rep"
	 * "What committees is my repo on"
	 * "Tell me everything"
	 */
	public static void main(String[] args) {	
		// This string represents the user's query
		String question = null;
		// This int is used for to determine what answer is to be given
		int responseCode = 0;
				
		//Creates a buffered reader for console input
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		
		//Creates a representative, a completed program 2 would be used here to fill in the parameters
		Representative rep = new Representative("Lucas Atkinson", "P.O. Box 583, Marion 29571" 
		, "333D Blatt Bldg., Columbia 29201" , "57" 
		, "(843) 423-8237" , "(803) 212-6936", "Agriculture, Natural Resources & Environmental Affairs, and Rules"
		, "House of Representatives, 2017-Present");
		
		//This ArrayList is used to hold the delimited user input 
		Vector<String> questionFrags = new Vector<String>();

		// do while loop to allow the running of multiple commands during a session
			do {
				try {	
					//Resets the vector
					questionFrags.clear();

					//Query for user question, then read the response
					System.out.println("Please ask me a question: ");
					question = reader.readLine();
					
					//Puts the response into the ArrayList by separating the whole string using empty space as the delimiter
					String[] questionDelimited = question.split("\\s+");
					
					//Uses the array to input in the response
					for (int i = 0; i <= questionDelimited.length-1; i++) {
						questionFrags.add(questionDelimited[i]);
					}
					
					responseCode = testResponse(questionFrags);
					
					//Quit or Q to exit the program
					if (responseCode == 1) {
						System.out.println("Good bye!");
						System.exit(0);
					}
					// Personal Info
					else if (responseCode == 2) {
						System.out.println("I am representative " + rep.getName() + ".");
					}
					// Home address
					else if (responseCode == 3) {
						System.out.println("My home address " + rep.getHomeAddress());
					}
					// Contact info
					else if (responseCode == 4) {
						System.out.println(rep.getContactInfo());
					}
					// Committee Assignments
					else if (responseCode == 5) {
						System.out.println("I have been in the following committees: " + rep.getCommittees());
					}
					// All info
					else if (responseCode == 6) {
						System.out.println(rep.getAllInfo());
					}
					// Does not match any current questions close enough
					else {
						System.out.println("Could you please rephrase that?");
					}
				}
				//Catches exceptions just in case
				catch (Exception e) {
					System.out.println("An error has occurred, ending the program.");
					System.out.println(e);
					System.exit(1);
				}
			}
			// Exit command executed, program ends
			while (!question.equalsIgnoreCase("exit")||question.equalsIgnoreCase("q"));
		}
	//========================================================================
	/*
	 * 1 = quit program
	 * 2 = rep personal info
	 * 3 = contact info, home address
	 * 4 = contact info
	 * 5 = committee assignments
	 * 6 = give all information
	 */
	public static int testResponse(Vector<String> testing) {
		int confidence = 0;
		final int questionsSupported = 6;
		String[] testAgainst1 = new String[] {"q", "quit", "Q", "Quit"};
		String[] testAgainst2 = new String[] {"Tell", "me", "about", "the" ,"representative"};
		String[] testAgainst3 = new String[] {"Where", "does", "the", "rep", "live"};
		String[] testAgainst4 = new String[] {"How", "do", "I", "contact", "my", "rep "};
		String[] testAgainst5 = new String[] {"What", "committees", "is", "my ", "repo ", "on"};
		String[] testAgainst6 = new String[] {"Tell", "me", "everything"};
		for (int i0 = 0; i0 < questionsSupported; i0++) {
			if (testing.size() >= testAgainst1.length) {
			//Testing for the quit program keywords
				for (int i1 = 0; i1 < testAgainst1.length; i1++) {
					if (testing.contains(testAgainst1[i1])) {
						confidence++;
					}
				}
				// If any of the keywords are detected, end the program
				if (confidence > 0) {
					return 1;
				}
				confidence = 0;
			}
			else {
				for (int i1 = 0; i1 < testing.size(); i1++) {
					if (testing.contains(testAgainst1[i1])) {
						confidence++;
					}
				}
				// If any of the keywords are detected, end the program
				if (confidence > 0) {
					return 1;
				}
				confidence = 0;
			}
			//Testing for the rep personal info keywords
			if (testing.size() >= testAgainst2.length) {
				for (int i2 = 0; i2 < testAgainst2.length; i2++) {
					if (testing.contains(testAgainst2[i2])) {
						confidence++;
					}
				}
				// 4/5 is the minimum
				if (confidence >= 4) {
					return 2;
				}
				confidence = 0;
			}
			else {
				for (int i2 = 0; i2 < testing.size(); i2++) {
					if (testing.contains(testAgainst2[i2])) {
						confidence++;
					}
				}
				// 4/5 is the minimum
				if (confidence >= 4) {
					return 2;
				}
				confidence = 0;
			}
			//Testing for the home address keywords
			if (testing.size() >= testAgainst3.length) {
				for (int i3 = 0; i3 < testAgainst3.length; i3++) {
					if (testing.contains(testAgainst3[i3])) {
						confidence++;
					}
				}
				// 4/5 is the minimum
				if (confidence >= 4) {
					return 3;
				}
				confidence = 0;
			}
			else {
				for (int i3 = 0; i3 < testing.size(); i3++) {
					if (testing.contains(testAgainst3[i3])) {
						confidence++;
					}
				}
				// 4/5 is the minimum
				if (confidence > 4) {
					return 3;
				}
				confidence = 0;
			}
			//Testing for the contact info keywords
			if (testing.size() >= testAgainst4.length) {
				for (int i4 = 0; i4 < testAgainst4.length; i4++) {
					if (testing.contains(testAgainst4[i4])) {
						confidence++;
					}
				}
				// 5/6 is the minimum
				if (confidence >= 5) {
					return 4;
				}
				confidence = 0;
			}
			else {
				for (int i4 = 0; i4 < testing.size(); i4++) {
					if (testing.contains(testAgainst4[i4])) {
						confidence++;
					}
				}
				// 5/6 is the minimum
				if (confidence > 5) {
					return 4;
				}
				confidence = 0;
			}
			//Testing for the committee assignments keywords
			if (testing.size() >= testAgainst5.length) {
				for (int i5 = 0; i5 < testAgainst5.length; i5++) {
					if (testing.contains(testAgainst5[i5])) {
						confidence++;
					}
				}
				// 5/6 is the minimum
				if (confidence >= 5) {
					return 5;
				}
				confidence = 0;
			}
			else {
				for (int i5 = 0; i5 < testing.size(); i5++) {
					if (testing.contains(testAgainst5[i5])) {
						confidence++;
					}
				}
				// 5/6 is the minimum
				if (confidence >= 5) {
					return 5;
				}
				confidence = 0;
			}
			//Testing for the tell me everything keywords
			if (testing.size() >= testAgainst6.length) {
				for (int i6 = 0; i6 < testAgainst6.length; i6++) {
					if (testing.contains(testAgainst6[i6])) {
						confidence++;
					}
				}
				// All words need to match
				if (confidence >= 3) {
					return 6;
				}
				confidence = 0;
			}
			else {
				for (int i6 = 0; i6 < testing.size(); i6++) {
					if (testing.contains(testAgainst6[i6])) {
						confidence++;
					}
				}
				// All words need to match
				if (confidence >= 3) {
					return 6;
				}
				confidence = 0;
			}
		}
		return questionsSupported+1;
	}
	//========================================================================
}
