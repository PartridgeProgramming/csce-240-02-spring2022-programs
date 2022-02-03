/**
 * 
 */

/**
 * @author Alden Partridge
 *
 */
import java.io.*;

public class prog1Extractor {

	/**
	 * @param args
	 */
	public static void main(String[] args) throws IOException {
		// Strings for the input path and the district name
		String inputPath = null; 
		String districtName = "District "; 
		
		//Creates a buffered reader for console input
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		
		//Introductory text to inform user what the program is and how to start it.
		System.out.println("Welcome to the program 1 extractor! This program will read the contents of a .txt");
		System.out.println("copy of a district representative information and will display some key information.");
		System.out.println("Please enter the path for the input file: ");
		inputPath = reader.readLine();	
		
		System.out.println("Now please enter the district number: ");
		districtName += reader.readLine();
		
		//Initializes the FileReader to be used for the inputPath
		FileReader inFileReader = null;
		
		//Try and catch tree for the the file input
		try {
			File inputFile = new File(inputPath);
			inFileReader = new FileReader(inputFile);
		}
		//Catches nullPointerException in case the path given is not valid
		catch (Exception NullPointerException) {
			System.out.println("The given path: " + inputPath + ", is not a valid path.");
			System.exit(1);
		}
		
		//Creates a BufferedReader for the input file
		BufferedReader inBuffReader = new BufferedReader(inFileReader);
		//Initializes an array that will store each line in the input file
		String[] words= null; 
		//This string stores the whole line before it is broken down to count for the words and characters
		String line;
		//Starts the count for lines, words, and characters at 0
		int lineCount = 0;
		int wordCount = 0;
		int charsCount = 0;
	
		while ((line=inBuffReader.readLine()) != null) {
			charsCount += line.length();
			lineCount++;
			// \\s+ regex for space delimiter
			words = line.split("\\s+");
			wordCount += words.length;
		}
		PrintStream outPutFile = new PrintStream(new File("data/output.txt"));
		System.setOut(outPutFile);
			System.out.println(districtName);
			System.out.println("\tThere are " + lineCount + " lines in the file.");
			System.out.println("\tThere are " + wordCount + " words in the file.");
			System.out.println("\tThere are " + charsCount + " characters in the file.");
			inBuffReader.close();
		System.exit(0);
		}
}
