/* @author Alden Partridge
 *
 */
import java.io.*;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class prog5sessionlogger {

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
		// Variable used to convert nanotime's measurements into seconds, since it never changes it is a final
		final double NANO_TO_SECONDS = 1000000000.0;
		
		// This string represents the user's query
		String question = null;
		
		// These variables are used for timing of the session length
		long startTime, endTime;
		double sessionLength;
		
		// Variables to measure the amount of utterances by the both the user and system
		int user_utterance = 0, system_utterance = 0;
		
		// This int is used for to determine what answer is to be given
		int responseCode = 0;
				
		// This List is used for the csv file
		List<String[]> dataLines = new ArrayList<>();
						
		// This variable is used for the csv file, starts at 1 because the file starts at line 1
		int numChatFile = 1;
					
		//Creates a buffered reader for console input
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		
		//Creates a representative, a completed program 2 would be used here to fill in the parameters
		Representative rep = new Representative("Lucas Atkinson", "P.O. Box 583, Marion 29571" 
		, "333D Blatt Bldg., Columbia 29201" , "57" 
		, "(843) 423-8237" , "(803) 212-6936", "Agriculture, Natural Resources & Environmental Affairs, and Rules"
		, "House of Representatives, 2017-Present");
		
		//This ArrayList is used to hold the delimited user input 
		Vector<String> questionFrags = new Vector<String>();
		
		// Starts timing how long the session lasts
		startTime = System.nanoTime();
		
		// This block is used to get the local time of the system in the format of hour.minutes
		// For some reason it automatically changes as the local time changes so it can make multiple log files 
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH.mm");
		LocalTime fileLocalTime = java.time.LocalTime.now();
		String fileFormattedTime = fileLocalTime.format(formatter);
		
		// do while loop to allow the running of multiple commands during a session
			do {
				try {	
					File outputLog = new File("data\\chat_sessions\\"+ java.time.LocalDate.now() + "_" + fileFormattedTime + ".txt");
					FileWriter logWriter = new FileWriter(outputLog, true);
					
					//Resets the vector
					questionFrags.clear();

					//Query for user question, then read the response
					System.out.println("Please ask me a question: ");
					logWriter.write("\nPlease ask me a question: \n");
					question = reader.readLine();
					logWriter.write(question+"\n");
					user_utterance++;
					
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
						logWriter.write("Good bye!\n");
						endTime = System.nanoTime();
						sessionLength = (endTime - startTime)/NANO_TO_SECONDS;
						logWriter.write("Total duration is " + sessionLength + " seconds.\n");
						system_utterance++;
						logWriter.write("The user asked " + user_utterance + " times, and the system responded " + system_utterance + " times.");
						logWriter.close();
						
						// The follow block is used to write to the .csv file
						try {
							File csvFile = new File("data\\chat_sessions\\chat_statistics.csv");
							csvFile.createNewFile(); // if file exists, does nothing. If file doesn't, creates new file
							FileWriter csvWriter = new FileWriter(csvFile, true);
							BufferedReader csvReader = new BufferedReader(new FileReader(csvFile));
							String lines = null;
							while ((lines = csvReader.readLine()) != null) {
								numChatFile++;
							}
							dataLines.add(new String[] {Integer.toString(numChatFile), Integer.toString(user_utterance), Integer.toString(system_utterance), Double.toString(sessionLength)});
							
							for (String[] data : dataLines) {
							    StringBuilder line = new StringBuilder();
							    for (int i = 0; i < data.length; i++) {
							        line.append(data[i]);
							        if (i != data.length - 1) {
							            line.append(',');
							        }
							    }
							    line.append("\n");
							    csvWriter.write(line.toString());
							}
							csvWriter.close();
							csvReader.close();
						}
						catch (Exception e) {
							System.out.println("An error has occurred, could not output to .csv file.");
							System.out.println(e);
						}
						System.exit(0);
					}
					// Personal Info
					else if (responseCode == 2) {
						System.out.println("I am representative " + rep.getName() + ".");
						system_utterance++;
						logWriter.write("I am representative " + rep.getName() + ".\n");
						logWriter.close();
					}
					// Home address
					else if (responseCode == 3) {
						System.out.println("My home address " + rep.getHomeAddress());
						system_utterance++;
						logWriter.write("My home address " + rep.getHomeAddress()+"\n");
						logWriter.close();
					}
					// Contact info
					else if (responseCode == 4) {
						System.out.println(rep.getContactInfo());
						system_utterance++;
						logWriter.write(rep.getContactInfo());
						logWriter.close();
					}
					// Committee Assignments
					else if (responseCode == 5) {
						System.out.println("I have been in the following committees: " + rep.getCommittees());
						system_utterance++;
						logWriter.write("I have been in the following committees: " + rep.getCommittees()+"\n");
						logWriter.close();
					}
					// All info
					else if (responseCode == 6) {
						System.out.println(rep.getAllInfo());
						system_utterance++;
						logWriter.write(rep.getAllInfo());
						logWriter.close();
					}
					// Does not match any current questions close enough
					else {
						System.out.println("Could you please rephrase that?");
						system_utterance++;
						logWriter.write("Could you please rephrase that?\n");
						logWriter.close();
					}
				}
				//Catches exceptions just in case
				catch (Exception e) {
					System.out.println("An error has occurred, ending the program.");
					System.out.println(e);
					System.out.println("Could not log session.");
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
