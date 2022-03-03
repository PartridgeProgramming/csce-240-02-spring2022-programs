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
	String name, homeAddress, contactAddress, region, homePhone, businessPhone, committees, service;
	public Representative() {
		name = "Give me a name";
		homeAddress = "Home address not given";
		contactAddress = "Contact address not given";
		region = "Region not given";
		homePhone = "Home phone number not given";
		businessPhone = "Business phone number not given";
		committees = "No committees given";
		service = "No service dates given";
	}
	public Representative(String nam, String homeAdd, String conAdd, String reg, String homPhon, String busPhon, String com, String serv) {
		name = nam;
		homeAddress = homeAdd;
		contactAddress = conAdd;
		region = reg;
		homePhone = homPhon;
		businessPhone = busPhon;
		committees = com;
		service = serv;
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
	public void setServiceDates(String servDates) {
		service = servDates;
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
	public String getServiceDates() {
		return service;
	}
	public String getAllInfo() {
		return "I am representative" + getName() 
		+ "\nMy home address " + getHomeAddress() 
		+ "\nYou can contact me at " + getContactAddress() 
		+ "\nI am the representative for " + getRegion() 
		+ "\nYou can contact me personally with this number" + getHomePhone() 
		+ "\nMy contact line is " + getBusPhone()
		+ "\nI have been in the following committees: " + getCommittees()
		+ "\nI have been a representative from: " + getServiceDates();
	}
}
