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
		// This string represents a command that the user will input
		String question = null;
		
				
		//Creates a buffered reader for console input
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		
		//Creates a representative, a completed program 2 would be used here to fill in the parameters
		Representative rep = new Representative("Lucas Atkinson", "P.O. Box 583, Marion 29571" 
		, "333D Blatt Bldg., Columbia 29201" , "57" 
		, "(843) 423-8237" , "(803) 212-6936", "Agriculture, Natural Resources & Environmental Affairs, and Rules"
		, "House of Representatives, 2017-Present");
		
		//This ArrayList is used to hold the delimited user input 
		Vector<String> questionFrags = new Vector<String>();
		
		//
		
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
					questionFrags.trimToSize();
					
					if (question.equalsIgnoreCase("exit")||question.equalsIgnoreCase("q")||question.equalsIgnoreCase("quit")) {
						System.out.println("Good bye!");
						System.exit(0);
					}
					if (question.contains("name")) {
						System.out.println("I am representative " + rep.getName());
					}
					if (question.contains("region")||question.contains("district")) {
						System.out.println("I am the representative for " + rep.getRegion());
					}
					if (question.contains("personal phone")) {
						System.out.println("My personal phone number is " + rep.getHomePhone());
					}
					if (question.contains("live")) {
						System.out.println("My home address " + rep.getHomeAddress());
					}
					if (question.contains("contact")) {
						System.out.println("You can contact me at " + rep.getContactAddress() + ".");
						System.out.println("My contact line is " + rep.getBusPhone() + ".");
					}
					if (question.contains("committees")||question.contains("committee")) {
						System.out.println("I have been in the following committees: " + rep.getCommittees());
					}
					if (question.contains("service")) {
						System.out.println("Here is my history of public service: " + rep.getServiceDates());
					}
					if (question.equalsIgnoreCase("tell me everything")) {
						System.out.println(rep.getAllInfo());
					}
						/*
						else {
							System.out.println("I do not know this information.");
						}
						*/
						
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
				System.exit(0);
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
	public int testResponse(Vector<String> testing) {
		int confidence = 0, responseCode = 0;
		final int questionsSupported = 6;
		String[] testAgainst1 = new String[] {"q", "quit", "Q", "Quit"};
		String[] testAgainst2 = new String[] {"Tell", "me", "about", "the" ,"representative"};
		String[] testAgainst3 = new String[] {"Where", "does", "the", "rep", "live"};
		String[] testAgainst4 = new String[] {"How", "do", "I", "contact", "my", "rep "};
		String[] testAgainst5 = new String[] {"What", "committees", "is", "my ", "repo ", "on"};
		String[] testAgainst6 = new String[] {"Tell", "me", "everything"};
		for (int i = 0; i < questionsSupported; i++) {
			
		}
		
		
		return responseCode;
	}
	//========================================================================
}
