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
	public static void main(String[] args) {	
		// This string represents a command that the user will input
		String question = null;
		int confidence = 0;
				
		//Creates a buffered reader for console input
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		
		//Creates a representative, a completed program 2 would be used here to fill in the parameters
		Representative rep = new Representative("Lucas Atkinson", "P.O. Box 583, Marion 29571" 
		, "333D Blatt Bldg., Columbia 29201" , "57" 
		, "(843) 423-8237" , "(803) 212-6936", "Agriculture, Natural Resources & Environmental Affairs, and Rules"
		, "House of Representatives, 2017-Present");
		
		//This ArrayList is used to hold the delimited user input 
		ArrayList<String> questionFrags = new ArrayList<String>(99);
		
		//
		
		// do while loop to allow the running of multiple commands during a session
			do {
				try {	
					//Resets the confidence variable and the 
					questionFrags.clear();
					confidence = 0;
					
					//Query for user question, then read the response
					System.out.println("Please ask me a question: ");
					question = reader.readLine();
					
					//Puts the response into the ArrayList by separating the whole string using empty space as the delimiter
					String[] questionDelimited = question.split("\\s+");
					
					//Uses the array to input in the response
					for (int i = 0; i >= questionDelimited.length; i++) {
						questionFrags.add(questionDelimited[i]);
					}
					questionFrags.trimToSize();
					
					//Currently used to test if the arrayList is actually getting filled, will be removed later
					for (int j = 0; j >= questionFrags.size(); j++) {
						System.out.print(questionFrags.get(j));
					}
					
						if (question.equalsIgnoreCase("exit")||question.equalsIgnoreCase("q")) {
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
}
