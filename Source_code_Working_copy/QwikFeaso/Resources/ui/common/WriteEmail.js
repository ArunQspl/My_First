// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied
function StringBuilder(value)
{
    this.strings = new Array("");
    this.append(value);
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value)
{
    if (value)
    {
        this.strings.push(value);
    }
}

// Clears the string buffer
StringBuilder.prototype.clear = function ()
{
    this.strings.length = 1;
}

// Converts this instance to a String.
StringBuilder.prototype.toString = function ()
{
    return this.strings.join("");
}

/*
 * Function to write welcome mail
 */
function welcomeMail (firstName) {
	
	var sb = new StringBuilder();
	
	sb.append("Welcome "+firstName+",<br/><br/>");
	sb.append("<p>");
	sb.append("The team at Developer Network offer QwikFeaso and a range of other Property Development");
	sb.append("services for developers just like you. Our services include assisting with sourcing your next project,");
	sb.append("finding JV partners, assisting with selling off the plan and much more.");
	sb.append("</p>");
	
	sb.append("<p>");
	sb.append("Please visit us at www.developernetwork.com.au to see our complete range of services, and we look");
	sb.append("forward to assisting you in the near future.");
	sb.append("</p>");
	
	sb.append("<p>");
	sb.append("QwikFeaso comes pre-loaded with a range of property development strategies, but it's true power");
	sb.append("comes from it's ability to be completely customised to meet your specific property development");
	sb.append("needs. To fully understand the capabilities, flexibility and power of QwikFeaso please take the time to");
	sb.append("look at our website at www.developernetwork.com.au/qwikfeaso");
	sb.append("</p>");
	
	sb.append("<p>");
	sb.append("Don't forget that we are continually striving to improve QwikFeaso, so if you have any feedback");
	sb.append("(Good or Bad) or would like to see additional features implemented please take to time to contact us");
	sb.append("at qwikfeaso@developernetwork.com.au and we will do everything that we can to assist.");
	sb.append("</p>");
	
	sb.append("<p>");
	sb.append("We hope that you enjoy using QwikFeaso, we have certainly enjoyed building it for you.");
	sb.append("</p>");
	
	sb.append("<br />Regards");
	sb.append("<br /><br />The Developer Network Team");
	
	return sb.toString();
  
}

/*
 * Function to write update user detail mail
 */

function updateUserDetailMail (firstName,lastName,country,region,email,authCode) {
  
  var sb = new StringBuilder();
	
	sb.append("Hi "+firstName+",<br/><br/>");
	sb.append("<p>");
	sb.append("Thanks for updating your registration details.");
	sb.append("</p>");
	
	sb.append("<p>");
	sb.append("Just to confirm that we have it correct, we note that you have updated your details as per below.");
	sb.append("</p>");
	
	sb.append("<p>");
	sb.append("First Name : "+firstName);
	sb.append("<br>Last Name : "+lastName);
	sb.append("<br>Country : "+country);
	sb.append("<br>Region : "+region);
	sb.append("<br>Email : "+email);
	sb.append("<br>Authentication Code : "+authCode);
	sb.append("</p>");
	
	sb.append("<p>");
	sb.append("If any of these details are incorrect you may update them from within the 'Licensed User Details'");
	sb.append("section of the App, or by emailing us at qwikfeaso@developernetwork.com.au");
	sb.append("</p>");
	
	sb.append("<p>");
	sb.append("Don't forget that we are continually striving to improve QwikFeaso, so if you have any feedback");
	sb.append("(Good or Bad) or would like to see additional features implemented please take to time to contact us");
	sb.append("at qwikfeaso@developernetwork.com.au and we will do everything that we can to assist.");
	sb.append("</p>");
	
	sb.append("<p>");
	sb.append("We hope that you enjoy using QwikFeaso, we have certainly enjoyed building it for you.");
	sb.append("</p>");
	
	sb.append("<br />Regards");
	sb.append("<br /><br />The Developer Network Team");
	
	return sb.toString();
}

