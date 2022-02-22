import java.io.*;

/**
 * @author Alden Partridge
 *
 */
public class prog2processor {

	/**
	 * @param args
	 */
	public static void main(String[] args) throws IOException { 
		// Strings for the input path
		String inputPath = null; 
		
		// This string represents a command that the user will input
		String command = null;
		
		//Creates a buffered reader for console input
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		
		//Introductory text to inform user what the program is and how to start it.
		System.out.println("Welcome to program 2 processor! This program will read the contents of a .txt copy of ");
		System.out.println("a district representative information and will display information based on given commands.");
		System.out.println("Please enter the path for the input file: ");
		inputPath = reader.readLine();	
		
		// do while loop to allow the running of multiple commands during a session
		do {
			try {
				File inputFile = new File(inputPath);
				FileReader inFileReader = new FileReader(inputFile);
				
				//Creates a BufferedReader for the input file
				BufferedReader inBuffReader = new BufferedReader(inFileReader);
				
				System.out.println("Please enter a command, you can enter \"displayCommands\" to display all of your command options: ");
				command = reader.readLine();
					switch (command) {
					case "displayCommands":
						displayCommands();
						break;
						/*
						 * since not all of the contact information methods were finished, 
						 * the contactInfo command is commented out since it would have just been an combination of them all
					case "contactInfo":
						try {
							//displayContactInfo(inputFile);
						}
						catch (Exception NullPointerException) {
							System.out.println("An error has occurred while running this command.");
						}
						break;
						*/
					case "contactInfo:name":
						try {
							System.out.println(getName(inBuffReader));
						}
						catch (Exception NullPointerException) {
							System.out.println("An error has occurred while running this command.");
						}
						break;
					case "contactInfo:region":
						try {
							System.out.println(getRegion(inBuffReader));
						}
						catch (Exception NullPointerException) {
							System.out.println("An error has occurred while running this command.");
						}
						break;
						/*
						 * since the address methods are unfinished, this section is commented out
					case "contactInfo:homeAddress":
						try {
							System.out.println(getHomeAddress(inBuffReader));
						}
						catch (Exception NullPointerException) {
							System.out.println("An error has occurred while running this command.");
						}
						break;
					case "contactInfo:colAddress":
						try {
							//System.out.println(getColAddress(inBuffReader));
						}
						catch (Exception NullPointerException) {
							System.out.println("An error has occurred while running this command.");
						}
						break;
						*/
					case "contactInfo:busPhone":
						try {
							System.out.println(getBusPhone(inBuffReader));
						}
						catch (Exception NullPointerException) {
							System.out.println("An error has occurred while running this command.");
						}
						break;
					case "contactInfo:homePhone":
						try {
							System.out.println(getHomePhone(inBuffReader));
						}
						catch (Exception NullPointerException) {
							System.out.println("An error has occurred while running this command.");
						}
						break;
					case "help-contactInfo":
						System.out.println("The command \"contactInfo\" is used to display the contact information of the representative in the file.");
						System.out.println("It has the subcommands: contactInfo:name, contactInfo:region, contactInfo:busPhone, contactInfo:homePhone");
						break;
					case "exit":
						System.out.println("Exiting the program.");
						System.exit(0);
						break;
					default:
						System.out.println("Command not reconginzed, please try again.");
					}
			}
			//Catches nullPointerException in case the path given is not valid
			catch (Exception NullPointerException) {
				System.out.println("The given path: " + inputPath + ", is not a valid path.");
				System.exit(1);
			}
		}
		// Exit command executed, program ends
		while (!command.equalsIgnoreCase("exit"));
	}
	//==========================================================================================================
	static String getName(BufferedReader br) throws IOException {
		String line, findWord = "Representative";
		//Initializes an array that will store each line in the input file
		String[] words= null; 
		while ((line=br.readLine()) != null) {
			words=line.split(" ");  //Split the word using space
	          for (String word : words) 
	          {
	                 if (word.equals(findWord))   //Search for the given word
	                 {
	                	for (int i = 0; i > words.length; i++) {
	                		words[i]=line;
	                	}
	                	br.close();
	                	return line;
	                 }
	          }
		}
		br.close();
		return "Name not found";
	}
	//=====================================================================
	static String getRegion(BufferedReader br) throws IOException{
		String line, findWord = "District";
		
		//Initializes an array that will store each line in the input file
		String[] words= null; 
		while ((line=br.readLine()) != null) {
			words=line.split(" ");  //Split the word using space
	          for (String word : words) 
	          {
	                 if (word.equals(findWord))   //Search for the given word
	                 {
	                	for (int i = 0; i > words.length; i++) {
	                		words[i]=line;
	                	}
	                	br.close();
	                	return line;
	                 }
	          }
		}
		br.close();
		return "Region not found";
	}
	//=====================================================================
	/*
	 * the address commands are unfinished
	static String getHomeAddress(BufferedReader br) throws IOException{
		String line, address = "", findWord = "Home", findNextWord = "Address";
		
		int iterator = 0;
		boolean moveLoop = false;
		//Initializes an array that will store each line in the input file
		String[] words= null; 
		while ((line=br.readLine()) != null) {
			words=line.split(" ");  //Split the word using space
	          for (String word : words) {
	        	  if (word.equals(findWord)) {  //Search the first part of the given words
	        		  if (!words[iterator+1].equals(findNextWord)) { //Search the second part of the given words
	        			  break;
	        		  }
	        		  else {
	        			  moveLoop = true;
	        		  }
	        		//br.close();
      			  	//return address;
	                }
	                iterator++;
	          }
	          iterator = 0;
	          if (moveLoop == true) {
		          address = line;
				  for (int i = 0; i > 3; i++) {
	    			  br.readLine();
	    			  address += line;
				  }
				  br.close();
				  return address;
	          }
		}
		br.close();
		return "Home address not found";
	}

	String getColAddress(File inFile) {
		
		return colAddress;
	}
	*/
	//=====================================================================
	static String getBusPhone(BufferedReader br) throws IOException{
		String line, findWord = "Business";
		
		//Initializes an array that will store each line in the input file
		String[] words= null; 
		
		while ((line=br.readLine()) != null) {
			words=line.split(" ");  //Split the word using space
	          for (String word : words) 
	          {
	                 if (word.equals(findWord))   //Search for the given word
	                 {
	                	for (int i = 0; i > words.length; i++) {
	                		words[i]=line;
	                	}
	                	br.close();
	                	return line;
	                 }
	          }
		}
		br.close();
		return "Business phone number not found";
	}
	//=====================================================================
	
	static String getHomePhone(BufferedReader br) throws IOException {
		String line, findWord = "Business";
		
		//due to the fact that the second "business" phone number is actually the home phone number, 
		//this count is to make sure only the second phone number is put out
		int count = 0;
		
		//Initializes an array that will store each line in the input file
		String[] words= null; 
		while ((line=br.readLine()) != null) {
			words=line.split(" ");  //Split the word using space
	          for (String word : words) 
	          {
	                 if (word.equals(findWord))   //Search for the given word
	                 {
	                	if (count==1) {
	                		for (int i = 0; i > words.length; i++) {
		                		words[i]=line;
		                	}
		                	br.close();
		                	return line;
	                	}
	                	count++;
	                 }
	          }
		}
		br.close();
		return "Business phone number not found";
	}
	//=====================================================================
	/*
	static void displayContactInfo(File inFile) throws IOException {
		System.out.println(getName(inFile));
		System.out.println(getRegion(inFile));
		System.out.println(getHomeAddress(inFile));
		System.out.println(getColAddress(inFile));
		System.out.println(getHomePhone(inFile));
	}
	*/
	//personal information
	
	//committee assignments
	
	//sponsored bills in the house
	
	//voting records
	
	
	// displayCommands - this command is used to display all the commands that are supported
	// *Psst, don't forget to update as you come up with more commands!
	public static void displayCommands() {
		System.out.println("Here are all the currently supported commands: displayCommands, contactInfo, exit");
		System.out.println("Some of these commands have subcommands, you can type \"help-\" and a command name to see more info.");
		System.out.println("For example, help-contactInfo will display that contactInfo has the subcommand contactInfo-name");
		System.out.println("Keep in mind that all commands are case sensitive.");
	}
}
