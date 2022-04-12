/**
 * 
 */

/**
 * @author Alden Partridge
 *
 */
public class Representative {

	/**
	 * 
	 */
	String name, party, homeAddress, contactAddress, region, homePhone, businessPhone, committees;
	public Representative() {
		name = "Give me a name";
		party = "Party not given";
		homeAddress = "Home address not given";
		contactAddress = "Contact address not given";
		region = "Region not given";
		homePhone = "Home phone number not given";
		businessPhone = "Business phone number not given";
		committees = "No committees given";
	}
	public Representative(String nam, String part, String homeAdd, String conAdd, String reg, 
			String homPhon, String busPhon, String com) {
		name = nam;
		party = part;
		homeAddress = homeAdd;
		contactAddress = conAdd;
		region = reg;
		homePhone = homPhon;
		businessPhone = busPhon;
		committees = com;
	}
	public void setName(String nam) {
		name = nam;
	}
	public void setHomeAddress(String homeAdd) {
		homeAddress = homeAdd;
	}
	public void setContactAddress(String conAdd) {
		contactAddress = conAdd;
	}
	public void setRegion(String reg) {
		region = reg;
	}
	public void setHomePhone(String homePhon) {
		homePhone = homePhon;
	}
	public void setBusPhone(String busPhon) {
		businessPhone = busPhon;
	}
	public void setCommittees(String com) {
		committees = com;
	}
	public void setParty(String part) {
		party = part;
	}
	public String getName() {
		return name;
	}
	public String getHomeAddress() {
		return homeAddress;
	}
	public String getContactAddress() {
		return contactAddress;
	}
	public String getRegion() {
		return region;
	}
	public String getHomePhone() {
		return homePhone;
	}
	public String getBusPhone() {
		return businessPhone;
	}
	public String getCommittees() {
		return committees;
	}
	public String getParty() {
		return party;
	}
	public String getContactInfo() {
		return "I am " + getName()
		+ "\nI am the representative for  " + getRegion() + " counties." 
		+ "\nMy home address is " + getHomeAddress() 
		+ "\nYou can contact me at " + getContactAddress() 
		+ "\nYou can contact me personally with this number " + getHomePhone() 
		+ "\nMy contact line is " + getBusPhone();
	}
	public String getAllInfo() {
		return "I am representative " + getName() + "."
		+ "\n" + getParty()
		+ "\nMy home address is at " + getHomeAddress() 
		+ "\nYou can contact me at " + getContactAddress() 
		+ "\nI am the representative for " + getRegion() + " counties." 
		+ "\n" + getHomePhone() 
		+ "\n" + getBusPhone()
		+ "\n" + getCommittees();
	}
}
