/**
 * @author Ryan Capron
 */

import java.io.BufferedWriter;
import java.io.*;
import java.util.*;
import java.util.Scanner;
import java.net.URL;
import java.net.URLConnection;

public class extractor {

    /**
     * Declaring all private variables.
     */
    private ArrayList<String> webdoc = new ArrayList<String>();
    private String WEBSITE = "https://www.scstatehouse.gov/member.php?code=";
    private URLConnection url;

    /**
     * Constructs instance of class given URLCode.
     * @param URLCode is unique for each district.
     */
    public extractor(String URLCode) {
        try {
            System.out.println("Retrieving District Representative Data");
            this.url = new URL(WEBSITE + URLCode).openConnection();
            Scanner scanner = new Scanner(url.getInputStream());
            while(scanner.hasNextLine())
                this.webdoc.add(scanner.nextLine());
            scanner.close();

            System.out.println("Cleaning up representative data");
            this.webdoc = cleanData(this.webdoc);
            outputFile();
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
            System.out.println("Could not retrive data");
            //TODO call readHTML()
        }
    }

    /**
     * This takes html information from local ArrayList and outputs it to html file.
     */
    private void outputFile() {
        try {
            BufferedWriter output = new BufferedWriter(new FileWriter("data/html.txt"));

            for (int i = 0;i < webdoc.size();i++) {
                output.write(webdoc.get(i));
                output.newLine();
            }
    
            output.close();
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
    
    /**
     * @param input is an HTML populated Arraylist<String>.
     * @return is an ArrayList<String> with only information only relavent to district representative.
     */
    private ArrayList<String> cleanData(ArrayList<String> input) {
        int start = 0;
        ArrayList<String> ret = new ArrayList<String>();
        for (int i = 0;i < webdoc.size();i++) {
            if (input.get(i).contains("Representative")) {
                start = i;
                break;
            }
        }
        for (int i = start;i < webdoc.size();i++) {
            ret.add(input.get(i));
        }
        return ret;
    }

    /**
     * All get methods pulling certain information from the local Arraylist webdoc.
     */
    public String getName() {
        String[] name;
        for (String i : webdoc) {
            if (i.contains("Representative")) {
                name = i.split("</a> &gt; ");
                name[2] = name[2].replaceAll("</span>", "");
                return name[2];
            }
        }
        return "I do not know the name of the representative";
    }
    public String getParty() {
        for(String i : webdoc) {
            if (i.contains("Republican")) {
                return getName() + "is a Republican.";
            }
        }
        return getName() + " is a Democrat.";
    }
    public String getCounties(String distNum) {
        String[] line;
        for(String i : webdoc) {
            if (i.contains("District " + distNum)) {
                line = i.split("13px;\">");
                line = line[1].split(" Counties");
                line[0] = line[0].replaceAll("&amp; ", "and ");
                return line[0];
            }
        }
        return "I do not know the counties he is responsible for.";
    }
    public String getBAdress() {
        String[] line;
        for (int i = 0;i < webdoc.size();i++) {
            if(webdoc.get(i).contains("Columbia Address")) {
                line = webdoc.get(i + 1).split("0;\">");
                line[1] = line[1].replaceAll("<br>", " ");
                line[1] = line[1].replaceAll("</p>", "");
                return line[1];
            }
        }
        return "I do not know the business address";
    }
    public String getHAddress() {
        String[] line;
        for (int i = 0;i < webdoc.size();i++) {
            if(webdoc.get(i).contains("Home Address")) {
                line = webdoc.get(i + 1).split("0;\">");
                line[1] = line[1].replaceAll("<br>", "\n");
                line[1] = line[1].replaceAll("</p>", "");
                return line[1];
            }
        }
        return "I do not know the home address";
    }
    /**
     * @param location is used to determine which set of phone numbers to return.
     * @return is representative's phone number for the specified location.
     */
    public String getPhone(String location) {
    	 String[] line;
         // If branch for finding home phone numbers
         if(location.equalsIgnoreCase("Home")) {
             for (int i = 0;i < webdoc.size();i++) {
                 if(webdoc.get(i).contains("Business Phone")) {
                 	 line = webdoc.get(i).split("Business Phone</span> ");
                      line[1] = line[1].replaceAll("</p>", "");
                      return getName() + "'s Home Phone number is " + line[1];
                 }
             }
             return "I do not know the " + location + " phone number.";
         }
         // If branch for finding business location phone numbers
         else if(location.equalsIgnoreCase("Business")) {
         	int count = 0;
             for (int i = 0;i < webdoc.size();i++) {
                 if(webdoc.get(i).contains("Business Phone")) {
                 	if (count > 0) {
                 		line = webdoc.get(i).split("Business Phone</span> ");
                         line[1] = line[1].replaceAll("</p>", "");
                         return getName() + "'s Columbia Phone number is " + line[1]; //
                 	}
                 	else
                 		count++;
                 	}
             	}
             return "I do not know the " + location + " phone number.";
         }
         // Return if invalid input is given
         return "The two available locatoins are \"Home\" and \"Business\" (Not case-sensitive)";
    }
    public String getPInformation() {
        String pInformation = "";
        for (int i = 0;i < webdoc.size();i++) {
            if(webdoc.get(i).contains("Personal Information")) {
                pInformation = webdoc.get(i + 2);
                pInformation = pInformation.replaceAll("</li><li style=\"margin: 5px 0 0 0; list-style-type:square;\" >", "\n");
                pInformation = pInformation.replaceAll("<li style=\"margin: 5px 0 0 0; list-style-type:square;\" >", "");
                pInformation = pInformation.replaceAll("<i>", "");
                pInformation = pInformation.replaceAll("</i>", "");
                pInformation = pInformation.replaceAll("</li></ul>", "");
                return getName() + "'s personal information is as follows: \n" + pInformation;
            }
        }
        return "fail";
    }
    public String getCAssignments() {
        for (int i = 0; i < webdoc.size();i++) {
            if(webdoc.get(i).contains("Committee Assignments")) {
                String line = webdoc.get(i + 2);
                line = line.replaceAll("(<li style=\"margin: 5px 0 0 0; list-style-type:square;\" ><a HREF=\"/committee[.]php[?]chamber=H#...\">)", "\n");
                line = line.replaceAll("(</a></li></ul>)|(</a></li>)", "");
                return getName() + "\'s Committee Assignments are: " + line;
            }
        }
        return "I do not know the Committee Assignments";
    }
    public int getLines() {
        int lineCount = webdoc.size();

        return lineCount;
    }
    public int getCharacters() {
        int charCount = 0;
        
        for (int i = 0;i < webdoc.size();i++) {
            charCount += webdoc.get(i).length();
        }

        return charCount;
    }
    public int getWords() {
        int wordCount = 0;

        for (int i = 0;i < webdoc.size();i++) {
            String[] splitLine = webdoc.get(i).split(" ");
            wordCount += splitLine.length;
        }

        return wordCount;
    }
    public ArrayList<String> getHTMLArray() {
        return this.webdoc;
    }
    public void readHTML() {
        //TODO read local HTML into this.webdoc
    }
}
