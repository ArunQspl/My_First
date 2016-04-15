/*
 * firstRun === flag indicating to show 'First run wizard' or not
 * registered === flag indicating user is registered or not (locally)
 * userid		_|
 * username	_|	
 * firstName	_|	
 * lastName	_|======== user related data
 * country		_|	
 * region		_|
 * promocode	_|
 * db_version  === db version 
 */


function setFirstRun (bool) {
	Ti.App.Properties.setBool('firstRun',bool);
}

function getFirstRun () {
	var bool = Ti.App.Properties.getBool('firstRun',true);
	return bool;
}

function setRegistration (bool) {
	Ti.App.Properties.setBool('registered',bool);
}

function getRegistration () {
	var bool = Ti.App.Properties.getBool('registered',false);
	return bool;
}

function setUserData (userId,userName,firstName,lastName,country,region,promocode) {
	Ti.App.Properties.setString('userid',userId);
	Ti.App.Properties.setString('username',userName);
	Ti.App.Properties.setString('firstName',firstName);
	Ti.App.Properties.setString('lastName',lastName);
	Ti.App.Properties.setString('country',country);
	Ti.App.Properties.setString('region',region);
	Ti.App.Properties.setString('promocode',promocode);
}

function getUserId () {
	var userId = Ti.App.Properties.getString('userid','');
	return userId;
}

function getUserName () {
	var userName = Ti.App.Properties.getString('username','');
	return userName;
}

function getFirstName () {
	var firstName = Ti.App.Properties.getString('firstName','');
	return firstName;
}

function getLastName () {
	var lastName = Ti.App.Properties.getString('lastName','');
	return lastName;
}

function getCountry () {
	var country = Ti.App.Properties.getString('country','');
	return country;
}

function getRegion () {
	var region = Ti.App.Properties.getString('region','');
	return region;
}

function getPromoCode () {
	var promocode = Ti.App.Properties.getString('promocode','');
	return promocode;
}

function setIsDwellingAdded (bool) {
  Ti.App.Properties.setBool('isDwellingAdded',bool);
}

function getIsDwellingAdded () {
	var isDwellingAdded = Ti.App.Properties.getString('isDwellingAdded','');
	return isDwellingAdded;
}

function getDBVersion () {
	var db_version = Ti.App.Properties.getString('db_version','V1.0');
	return db_version;
}

function setDBVersion (version) {
	var db_version = Ti.App.Properties.setString('db_version',version);
}



