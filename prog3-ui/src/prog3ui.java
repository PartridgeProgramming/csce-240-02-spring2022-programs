/**
 * 
 */

/**
 * @author Alden Partridge
 *
 */
import java.io.*;

public class prog3ui {

	/**
	 * @param args
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
		
		// do while loop to allow the running of multiple commands during a session
			do {
				try {	
					System.out.println("Please ask me a question: ");
					question = reader.readLine();
						if (question.equalsIgnoreCase("exit")||question.equalsIgnoreCase("q")) {
							System.out.println("Good bye!");
							System.exit(0);
						}
						else if (question.contains("name")) {
							System.out.println("I am representative " + rep.getName());
						}
						else if (question.contains("region")||question.contains("district")) {
							System.out.println("I am the representative for " + rep.getRegion());
						}
						else if (question.contains("personal phone")) {
							System.out.println("My personal phone number is " + rep.getHomePhone());
						}
						else if (question.contains("live")) {
							System.out.println("My home address " + rep.getHomeAddress());
						}
						else if (question.contains("contact")) {
							System.out.println("You can contact me at " + rep.getContactAddress() + ".");
							System.out.println("My contact line is " + rep.getBusPhone() + ".");
						}
						else if (question.contains("committees")||question.contains("committee")) {
							System.out.println("I have been in the following committees: " + rep.getCommittees());
						}
						else if (question.contains("service")) {
							System.out.println("Here is my history of public service: " + rep.getServiceDates());
						}
						else if (question.equalsIgnoreCase("tell me everything")) {
							System.out.println(rep.getAllInfo());
						}
						else {
							System.out.println("I do not know this information.");
						}
					}
					//Catches exceptions just in case
					catch (Exception e) {
						System.out.println("An error has occurred, ending the program.");
						System.exit(1);
					}
				}
				// Exit command executed, program ends
				while (!question.equalsIgnoreCase("exit")||question.equalsIgnoreCase("q"));
				System.exit(0);
			}
}
