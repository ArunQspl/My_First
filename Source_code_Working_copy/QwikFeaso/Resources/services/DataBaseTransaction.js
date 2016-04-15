/**
 * @projectDescription QwikFeaso
 * 
 * @author List- vivek Gidmare(vivek.gidmare@quagnitia.com),Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */


var resultset;

//DBFeaso.execute('create table if not exists User(UserID INT ,FirstName TEXT,LastName TEXT,Email TEXT primary Key,RegistrationDate TEXT,IsRegistered INTEGER);');


/*
 * Function to create app database 
 */

function createQwikFeasoDB(){
	var DBFeaso=Ti.Database.install('/Data/DBFeaso.sqlite','QwikFeaso');
	DBFeaso.close();
}

/**
 * Function registers user details
 * @param {String} firstName	Holds first name of the user
 * @param {String} lastName		Holds lastName name of the user
 * @param {String} UserEmail	Holds UserEmail name of the user
 * @return	Returns the flag determining status of user 
 */
function RegisterUser (userId,firstName,lastName,UserEmail) 
	{
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var isNewUser;
	resultset=DBFeaso.execute('select * from User');
	
	Ti.API.info('resultset'+resultset.isValidRow());
	
	if(!resultset.isValidRow())
	{
		//Recordtable is empty
		DBFeaso.execute('insert into User(UserID,FirstName,LastName,Email,RegistrationDate,IsRegistered) values(?,?,?,?,?,?)',userId,firstName,lastName,UserEmail,'2012-10-22 10:12:2222',0);
		isNewUser=true;
	}
	else
	{
		//user details  present 
		while(resultset.isValidRow())
		{
			var FirstName=resultset.fieldByName('FirstName');
			var LastName=resultset.fieldByName('LastName');
			var Email=resultset.fieldByName('Email');
			var RegistrationDate=resultset.fieldByName('RegistrationDate');
			var IsRegistered=resultset.fieldByName('IsRegistered');
			isNewUser=false;
			
			if(Email !=UserEmail)
			{
			DBFeaso.execute('insert into User(FirstName,LastName,Email,RegistrationDate,IsRegistered) values(?,?,?,?,?)',firstName,lastName,UserEmail,'2012-10-22 10:12:2222',0);
				isNewUser=true;
			}
			resultset.next();
		}
	}
	resultset.close();
	DBFeaso.close();
	return isNewUser;

}

/**
 * Function updates Cost Element
 * @param {Integer} ceId	Holds Cost Element ID
 * @param {Integer} cgId	Holds Cost Group ID
 * @param {Real} newValue	Holds new value for corresponding Cost Element
 */
function updateCostElement (ceId,cgId,newValue) {
	var CEId;
	var CGId;
	var value;
	CEId = ceId;
	CGId = cgId;
	value = newValue;
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute("UPDATE CostElements SET DefaultValue = '"+value+"'"+" WHERE CostElementID = "+CEId);
  	DBFeaso.close();
}


/**
 * Function updates Room Dimensions
 * @param {Integer} roomSubCatId	Holds Room Subcategory ID
 * @param {Real} newWidth			Holds width
 * @param {Real} newDepth			Holds depth
 * @param {Real} newAreaM2			Holds area in meter2
 * @param {Real} newAreaF2			Holds area in feet2
 * @param {String} unit				Holds unit
 */
function updateRoomDimensions(roomSubCatId,newWidth,newDepth,newAreaM2,newAreaF2,unit){
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute("UPDATE RoomSubsCategory SET Width = "+newWidth+", Depth = "+newDepth+", AreaM2 = "+newAreaM2+", AreaF2 = "+newAreaF2+", Unit = '"+unit+"' WHERE RoomSubCategotyID = "+roomSubCatId);
	DBFeaso.close();
}


/**
 * Function updates Build Quality Details
 * @param {Integer} buildId		Holds Build ID
 * @param {Integer} basic		Holds value for basic quality
 * @param {Integer} standard	Holds value for standard quality
 * @param {Integer} high		Holds value for high quality
 */
function updateBuildQualityDetails (buildId,basic,standard,high) {
  var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute("UPDATE BuildQuality SET Basic = "+basic+", Standard = "+standard+", High = "+high+" WHERE BuildQualityID = "+buildId);
	DBFeaso.close();
}

/**
 * Function updates Build Difficulty Details
 * @param {Integer} buildId		Holds Build ID
 * @param {Integer} defVal		Holds value % of basic difficulty
 */
function updateBuildDifficultyDetails (buildId,defVal) {
  var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute("UPDATE BuildDifficulty SET DefaultValue = "+defVal+" WHERE BuildDifficultyID = "+buildId);
	DBFeaso.close();
}

/**
 * Function updates Build Difficulty Details
 * @param {Integer} buildId		Holds Build ID
 * @param {Integer} defVal		Holds value % of basic difficulty
 */
function updateFitoutCostDetails (FcId,/*none,*/basic,standard,high,premium) {
  var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute("UPDATE FitoutCosts SET Basic = "+basic+", Standard = "+standard+", High = "+high+", Premium = "+premium+" WHERE FitoutCostsID = "+FcId);
	DBFeaso.close();
}


/**
 * Function updates Room Dimension Settings
 * @param {String} name		
 * @param {String} value	
 */
function updateRoomDimensionSettings(name,value){
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute("UPDATE RoomDimensionSettings SET Value = '"+value+"'  WHERE Name = '"+name+"'");
	DBFeaso.close();
}


/**
 * Function Adds Scenario Details
 * @param {String} sceneName		Holds Scenario name
 */
function addScenarioDetails (sceneName) {
	var DBFeaso = Ti.Database.open('QwikFeaso');
  	DBFeaso.execute('insert into Feasibility(FeasibilityName,IsDeleted) values(?,?)',	sceneName,0);
	DBFeaso.close();
}

/**
 * Function Adds Scenario Details
 * @param {Integer} cgId	Holds Cost Group ID
 * @param {Integer} ceId	Holds Cost Element ID
 * @param {Integer} defVal	Holds default value of Cost Element for specified scenario
 */
function setDefaultsForScenario (cgId,ceId,defVal) {
	var i=0;
	var DBFeaso = Ti.Database.open('QwikFeaso');
	resultset=DBFeaso.execute('select max(FeasibilityID) FeasibilityID from Feasibility');
	while(resultset.isValidRow())
	{
		i = resultset.fieldByName('FeasibilityID');
		resultset.next();
	}
	resultset.close();	
  	DBFeaso.execute('insert into DefaultValusForScenarios(CostGroupsID,CostElementID,FeasibilityID,DefaultValue,IsDeleted) values(?,?,?,?,?)',cgId,ceId,i,defVal,0);
	DBFeaso.close();
}


/**
 * Function Get Default Values For Scenario
 * @param {Integer} sceneId	Holds Scenario ID
 * @return Returns default value of Cost Element for specified scenario
 */
function getDefaultsForScenario(sceneId){
	var defVal=[];
	var DBFeaso = Ti.Database.open('QwikFeaso');
	resultset=DBFeaso.execute("select CostElementID,CostGroupingID,DefaultValue from CostElements where DefaultValue != '' union select CostElementID,CostGroupsID,DefaultValue from DefaultValusForScenarios where FeasibilityID=? and DefaultValue != ''",sceneId);
	
	while(resultset.isValidRow())
	{
		defVal.push({CEId:resultset.fieldByName('CostElementID'),CGID:resultset.fieldByName('CostGroupingID'),DefaultValue:resultset.fieldByName('DefaultValue')});
		resultset.next();
	}
	resultset.close();
	DBFeaso.close();
	return defVal;
}


/**
 * Function Update User Default Values For Scenario
 * @param {String} ceName		Holds Cost Element name
 * @param {String} sceneName	Holds Scenario name
 * @param {Integer} ceId		Holds Cost Element Id
 * @param {Integer} sceneId		Holds Scenario Id
 * @param {Integer} newValue	Holds new value of Cost Element for specified scenario
 */
function updateUserDefaultValuesForScenario (ceName,sceneName,ceId,sceneId,newValue) {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	
	/*if(ceName != '')
		DBFeaso.execute("UPDATE CostElements SET Name = '"+ceName+ "' WHERE CostElementID = "+ceId);*/
		
	if(ceName != '')
		DBFeaso.execute("UPDATE CostElements SET Name = \""+ceName+ "\" WHERE CostElementID = "+ceId);	
	
	//DBFeaso.execute("UPDATE Feasibility SET FeasibilityName = '"+sceneName+"' "+" WHERE FeasibilityID = "+sceneId);
	DBFeaso.execute("UPDATE Feasibility SET FeasibilityName = \""+sceneName+"\" "+" WHERE FeasibilityID = "+sceneId);
	DBFeaso.execute("UPDATE DefaultValusForScenarios SET DefaultValue = '"+newValue+ "'" +" WHERE FeasibilityID = "+sceneId+" AND CostElementID = "+ceId);
  	DBFeaso.close();
}


/**
 * Function Delete Scenario Details
 * @param {Integer} sceneId		Holds Scenario Id
 */
function deleteScenarioDetails (sceneId) {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute("DELETE FROM Feasibility WHERE FeasibilityID = "+sceneId);
	DBFeaso.execute("DELETE FROM DefaultValusForScenarios WHERE FeasibilityID = "+sceneId);
  	DBFeaso.close();
}

/*
 * This function use to direct user for registration on first installation of app
 * after that user will directly send on dashBoard screen 
 * 
 * will ask user to enter details only on first use of app
 * 
 */
function DirectToRegister () {
	var ShouldDirectToRegister;
	var DBFeaso = Ti.Database.open('QwikFeaso');
	resultset=DBFeaso.execute('select * from User');
	if(!resultset.isValidRow())
	{
		ShouldDirectToRegister=true;
	}
	else
	{
		ShouldDirectToRegister=false;
	}
	resultset.close();
	DBFeaso.close();

	return ShouldDirectToRegister;
  
}


/**
 * Function will be used for  adding Populating Cost Groups
 * 
 */
function AddCostGroupings() {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute('create table if not exists CostGroupings(CostGroupingID INT primary Key,Name TEXT,AllowInQwikFeaso INT,AllowInDetailedFeaso INT,ShowToUser Int,HasScenarioValue INT,HasExpense INT,HasRevenue INT);');
 
 /**Qwik >     1=Present in QwikFeaso 0=Absent inQwikFeaso,
  *Detailed >	1=Present in DetailedFeaso 0=Absent in DetailedFeaso
  * ShowToUser >1=Show this CostGroup to User 0=Don't Show this CostGroup to User
  * HasScenarioValue >1=Has Default value for Each Scenario 0=Don't have Default Value for Scenario
  * 
  */
	DBFeaso.execute('BEGIN;'); //Add ; after BEGIN to work into Android //=> http://www.titaniumdevelopment.com.au/blog/2012/01/27/10x-faster-inserts-in-sqlite-using-begin-commit-in-appcelerator-titanium-mobile/

 	resultset=DBFeaso.execute('select * from CostGroupings');

	if(!resultset.isValidRow())
	{
 		CostGroups=[{gpID:1,gpName:'Purchasing Costs',Qwik:1,Detailed:1,ShowToUser:1,HasScenarioValue:0,HasExpense:1,HasRevenue:0},
				//{gpID:2,gpName:'Land Size & Usage',Qwik:1,Detailed:1,ShowToUser:1,HasScenarioValue:0,HasExpense:0,HasRevenue:0},
				{gpID:3,gpName:'Existing Dwelling (If Any)',Qwik:1,Detailed:1,ShowToUser:1,HasScenarioValue:0,HasExpense:0,HasRevenue:1},
				//{gpID:4,gpName:'Development Phase',Qwik:0,Detailed:1,ShowToUser:1,HasScenarioValue:1,HasExpense:1,HasRevenue:0},
				{gpID:4,gpName:'Design Phase',Qwik:0,Detailed:1,ShowToUser:1,HasScenarioValue:1,HasExpense:1,HasRevenue:0},
				{gpID:5,gpName:'Pre Construction Phase',Qwik:0,Detailed:1,ShowToUser:1,HasScenarioValue:1,HasExpense:1,HasRevenue:0},
				{gpID:16,gpName:'Dwellings to be Constructed',Qwik:1,Detailed:1,ShowToUser:1,HasScenarioValue:0,HasExpense:1,HasRevenue:1},
				{gpID:17,gpName:'Vacant Land',Qwik:1,Detailed:1,ShowToUser:1,HasScenarioValue:0,HasExpense:0,HasRevenue:1},
				{gpID:6,gpName:'Construction Cost Per Dwelling',Qwik:0,Detailed:1,ShowToUser:1,HasScenarioValue:1,HasExpense:1,HasRevenue:0},
				{gpID:7,gpName:'Construction Phase',Qwik:0,Detailed:1,ShowToUser:1,HasScenarioValue:1,HasExpense:1,HasRevenue:0},
				{gpID:8,gpName:'Optional Construction Costs',Qwik:1,Detailed:1,ShowToUser:1,HasScenarioValue:1,HasExpense:1,HasRevenue:0},
				{gpID:9,gpName:'Post Construction Phase',Qwik:0,Detailed:1,ShowToUser:1,HasScenarioValue:1,HasExpense:1,HasRevenue:0},
				{gpID:10,gpName:'Contingency',Qwik:0,Detailed:1,ShowToUser:1,HasScenarioValue:0,HasExpense:1,HasRevenue:0},
				{gpID:11,gpName:'Sales Costs',Qwik:0,Detailed:1,ShowToUser:1,HasScenarioValue:0,HasExpense:1,HasRevenue:0},
				{gpID:12,gpName:'Project Timelines (Months)',Qwik:0,Detailed:1,ShowToUser:1,HasScenarioValue:0,HasExpense:0,HasRevenue:0},
				{gpID:13,gpName:'Funding Costs',Qwik:0,Detailed:1,ShowToUser:1,HasScenarioValue:0,HasExpense:1,HasRevenue:0},
				{gpID:14,gpName:'Profitability',Qwik:0,Detailed:1,ShowToUser:1,HasScenarioValue:0,HasExpense:0,HasRevenue:0},
				
				];
		for(var i=0;i< CostGroups.length;i++)
		{
			DBFeaso.execute('insert into CostGroupings(CostGroupingID,Name,AllowInQwikFeaso,AllowInDetailedFeaso,ShowToUser,HasScenarioValue,HasExpense,HasRevenue) values(?,?,?,?,?,?,?,?)',
						CostGroups[i].gpID,CostGroups[i].gpName,CostGroups[i].Qwik,CostGroups[i].Detailed,CostGroups[i].ShowToUser,CostGroups[i].HasScenarioValue,CostGroups[i].HasExpense,CostGroups[i].HasRevenue);
		}				
 	}

	resultset.close();
	DBFeaso.execute('COMMIT;');
	DBFeaso.close();
}

/**
 * Function will add costElement to Database with their default setting(Values)
 */
function AddCostElement () {
 var DBFeaso = Ti.Database.open('QwikFeaso');
 //DBFeaso.execute('create table if not exists ScenarioDetailsPageTable(RowID INTEGER primary Key AUTOINCREMENT,CostElementID INT,Name TEXT,DefaultValue TEXT,CostGroupingID INT,IsDeleted Int,CrossImage INT,HasUnitSign INT,HasButton INT);');
 //DBFeaso.execute('create table if not exists ScenarioDetailsPageTable(RowID INTEGER primary Key AUTOINCREMENT,CostElementID INT,Name TEXT,DefaultValue TEXT,CostGroupingID INT,IsDeleted Int,CrossImage INT,HasUnitSign INT,HasButton INT,Validation INT);');
  //DBFeaso.execute('create table if not exists CostElements(CostElementID INT primary Key,Name TEXT,DefaultValue TEXT,AllowInQwikFeaso INT,AllowInDetailedFeaso INT,IsCommonToAll INT,CostGroupingID INT,IsDeleted Int,CrossImage INT,HasUnitSign INT,HasButton INT,IsItDefaultValue INT,HasResult INT);');
  DBFeaso.execute('create table if not exists CostElements(CostElementID INT primary Key,Name TEXT,DefaultValue TEXT,AllowInQwikFeaso INT,AllowInDetailedFeaso INT,IsCommonToAll INT,CostGroupingID INT,IsDeleted Int,CrossImage INT,HasUnitSign INT,HasButton INT,IsItDefaultValue INT,HasResult INT,Validation INT);');
/*Qwik >    1=Present in QwikFeaso 0=Absent inQwikFeaso,
  *Detailed >	1=Present in DetailedFeaso 0=Absent in DetailedFeaso
  * IsCommonToAll > Default value is common for all scenarios 1=Common 0=Different
  *  IsDeleted  1=deleted 0=present in list
  * CrossImage(Option to Delete CE) 1=CrossImage present for particular Cost Element 0=cant be deleted
  * HasUntSign 1=has unit with specific unit sign 0=dont have any unit simply number VALUE
  * HasBtn 1=btn to choose different value from option 0=have only 1 value option
  * IsItDefaultValue 1=Defaulealue entered is current default value 0= it is not current default Value
  */
  resultset=DBFeaso.execute('select * from CostElements')
 DBFeaso.execute('BEGIN;'); 
  if(!resultset.isValidRow())
 {
 	CostElements=[
 				
 				{geID:1,geName:'Purchase Price',DefaultValue:'',Qwik:1,Detailed:1,IsCommonToAll:0,GrpID:1,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:1},
				{geID:2,geName:'Deposit Required',DefaultValue:10,Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:1,IsDeleted:0,crossImage:0,HasUnitSign:'%',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:3,geName:'Closing Costs',DefaultValue:4,Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:1,IsDeleted:0,crossImage:0,HasUnitSign:'%',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:1},
				{geID:4,geName:'Holding Costs',DefaultValue:500,Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:1,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:7,geName:'Value of Dwelling to be retained',DefaultValue:'',Qwik:1,Detailed:1,IsCommonToAll:0,GrpID:3,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:8,geName:'Rental income during construction',DefaultValue:'',Qwik:1,Detailed:1,IsCommonToAll:0,GrpID:3,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:10,geName:'Architect / Draftsman',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:11,geName:'Town Planner',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:12,geName:'Traffic Engineer',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:13,geName:'Acoustics Engineer',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:14,geName:'Landscape Designer',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:15,geName:'Surveyor',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:16,geName:'Hydraulics Consultant',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:17,geName:'Civil Engineer',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				//{geID:18,geName:'Quantitive Surveyor',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:18,geName:'Quantity Surveyor',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:19,geName:'Solicitor',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:20,geName:'Body Corporate',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:21,geName:'Advertising',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:22,geName:'Application Fees (Development Application)',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:4,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:23,geName:'BA Drawings',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:5,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:24,geName:'Sewer Design',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:5,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				//{geID:25,geName:'Water Design',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:5,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:26,geName:'Hydraulic Plan',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:5,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:27,geName:'Plumbing Application',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:5,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:28,geName:'Engineering Design',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:5,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:29,geName:'Application Fees (Building Approval)',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:5,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				
				
				{geID:70,geName:'How many new Dwellings?',DefaultValue:'0',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:6,IsDeleted:0,crossImage:0,HasUnitSign:'',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:0},
				{geID:32,geName:'Council Contribution Fees',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:6,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				
				
				{geID:34,geName:'Sewer Construction',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:7,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:35,geName:'Water Connection',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:7,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:36,geName:'Plumbing Inspection Fees',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:7,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:37,geName:'Plan Sealing',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:7,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:38,geName:'Utilities (Electricity, Gas, Phone, etc)',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:7,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:39,geName:'Earthworks & fill',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:7,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:40,geName:'Retaining walls',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:7,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:41,geName:'Vegetation removal',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:7,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:42,geName:'Landscaping, Fences, Driveways, etc',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:7,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				
				
				{geID:43,geName:'Renovation',DefaultValue:0,Qwik:1,Detailed:1,IsCommonToAll:0,GrpID:8,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:44,geName:'Demolition',DefaultValue:20000,Qwik:1,Detailed:1,IsCommonToAll:0,GrpID:8,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:45,geName:'Dwelling Relocation',DefaultValue:30000,Qwik:1,Detailed:1,IsCommonToAll:0,GrpID:8,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:46,geName:'Build Under House',DefaultValue:50000,Qwik:1,Detailed:1,IsCommonToAll:0,GrpID:8,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:71,geName:'Retaining walls',DefaultValue:15000,Qwik:1,Detailed:1,IsCommonToAll:0,GrpID:8,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:72,geName:'Pool',DefaultValue:30000,Qwik:1,Detailed:1,IsCommonToAll:0,GrpID:8,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:33,geName:'Project Management',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:8,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				
				//{geID:47,geName:'Linen Plan',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:9,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:47,geName:'Title (Linen) Plan',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:9,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:48,geName:'Sealing Fee',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:9,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:49,geName:'Titles Office',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:9,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				{geID:50,geName:'Miscellaneous',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:9,IsDeleted:0,crossImage:0,HasUnitSign:'$',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:0},
				
				{geID:51,geName:'Contingency',DefaultValue:10,Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:10,IsDeleted:0,crossImage:0,HasUnitSign:'%',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:1},
				
				{geID:52,geName:'Real Estate Agent & Marketing Fees',DefaultValue:3,Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:11,IsDeleted:0,crossImage:0,HasUnitSign:'%',hasBtn:0,IsItDefValue:1,HasResult:1,Validation:1},
				
				
				{geID:53,geName:'Balance of Purchase due when?',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:12,IsDeleted:0,crossImage:0,HasUnitSign:'',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:54,geName:'Holding Stage',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:12,IsDeleted:0,crossImage:0,HasUnitSign:'',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:55,geName:'Development Phase',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:12,IsDeleted:0,crossImage:0,HasUnitSign:'',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:56,geName:'Pre Construction Phase',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:12,IsDeleted:0,crossImage:0,HasUnitSign:'',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:57,geName:'Construction Phase',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:12,IsDeleted:0,crossImage:0,HasUnitSign:'',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:58,geName:'Sales Process',DefaultValue:'',Qwik:0,Detailed:1,IsCommonToAll:0,GrpID:12,IsDeleted:0,crossImage:0,HasUnitSign:'',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				
				{geID:59,geName:'% of Deposit to be funded (i.e. Loan not Cash)',DefaultValue:100,Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:13,IsDeleted:0,crossImage:0,HasUnitSign:'%',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:60,geName:'% of Purchase to be funded',DefaultValue:100,Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:13,IsDeleted:0,crossImage:0,HasUnitSign:'%',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:61,geName:'% of Development Phase to be funded',DefaultValue:100,Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:13,IsDeleted:0,crossImage:0,HasUnitSign:'%',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:62,geName:'% of Pre Construction Phase to be funded',DefaultValue:100,Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:13,IsDeleted:0,crossImage:0,HasUnitSign:'%',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:63,geName:'% of Construction Phase to be funded',DefaultValue:100,Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:13,IsDeleted:0,crossImage:0,HasUnitSign:'%',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:64,geName:'Type of Loan',DefaultValue:'Interest Only',Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:13,IsDeleted:0,crossImage:0,HasUnitSign:'',hasBtn:1,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:65,geName:'Term In Years',DefaultValue:30,Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:13,IsDeleted:0,crossImage:0,HasUnitSign:'',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:66,geName:'Repayments (Every?)',DefaultValue:'Month',Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:13,IsDeleted:0,crossImage:0,HasUnitSign:'',hasBtn:1,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:67,geName:'Interest Rate',DefaultValue:7.5,Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:13,IsDeleted:0,crossImage:0,HasUnitSign:'%',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				{geID:68,geName:'When is First Payment made?',DefaultValue:'End of period',Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:13,IsDeleted:0,crossImage:0,HasUnitSign:'',hasBtn:1,IsItDefValue:1,HasResult:0,Validation:1},
				
				{geID:69,geName:'Profit Target',DefaultValue:'20',Qwik:0,Detailed:1,IsCommonToAll:1,GrpID:14,IsDeleted:0,crossImage:0,HasUnitSign:'%',hasBtn:0,IsItDefValue:1,HasResult:0,Validation:1},
				
				];
	for(var i=0;i< CostElements.length;i++)
	{
		DBFeaso.execute('insert into CostElements(CostElementID,Name,DefaultValue,AllowInQwikFeaso,AllowInDetailedFeaso,IsCommonToAll,CostGroupingID,IsDeleted,CrossImage,HasUnitSign,HasButton,IsItDefaultValue,HasResult,Validation) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
					CostElements[i].geID,CostElements[i].geName,CostElements[i].DefaultValue,CostElements[i].Qwik,CostElements[i].Detailed,CostElements[i].IsCommonToAll,
					CostElements[i].GrpID,CostElements[i].IsDeleted,CostElements[i].crossImage,CostElements[i].HasUnitSign,CostElements[i].hasBtn,CostElements[i].IsItDefValue,CostElements[i].HasResult,CostElements[i].Validation);
	}				
				
 }
   	resultset.close();
	DBFeaso.execute('COMMIT;');
	DBFeaso.close();
  
}

/*
 * Deletes Cost Element permanently
 * @param {Integer} ceId	Holds the Cost Element Id to be deleted
 */

function deleteCostElement (ceId) {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute("DELETE FROM CostElements WHERE CostElementID = "+ceId);
	DBFeaso.execute("DELETE FROM DefaultValusForScenarios WHERE CostElementID = "+ceId);	
	DBFeaso.close();
}

/**
 * function will populate roomCategory Data in Database
 */
function AddRoomCategory () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute('create table if not exists RoomCategory(RoomCategoryID INT primary Key,Name TEXT);');
  	resultset=DBFeaso.execute('select * from RoomCategory');
   DBFeaso.execute('BEGIN;'); 
  if(!resultset.isValidRow())
 	{
 		var RoomCategory=[
 							{RCID:1,Name:'Bedrooms'},
 							{RCID:2,Name:'Other Rooms & Spaces'},
 							{RCID:3,Name:'Kitchens'},
 							{RCID:4,Name:'Bathrooms'},
 							{RCID:5,Name:'Decks'},
 							{RCID:6,Name:'Garages'}
 						];
	 	for(var i=0;i< RoomCategory.length;i++)
		{
		DBFeaso.execute('insert into RoomCategory(RoomCategoryID,Name) values(?,?)',RoomCategory[i].RCID,RoomCategory[i].Name);
		}
		Ti.API.info('RoomCategory populated for First Time');					
 	}
  resultset.close();
  DBFeaso.execute('COMMIT;');
  DBFeaso.close();
}

/**
 * Function populate Room Subcategory details
 */

function AddRoomSubCategory () {
var DBFeaso = Ti.Database.open('QwikFeaso');
 DBFeaso.execute('create table if not exists RoomSubsCategory(RoomSubCategotyID INT primary Key,Name TEXT,Width REAL,Depth REAL,Unit TEXT,AreaM2 REAL,AreaF2 REAL,RoomCategoryID INT,IsDeleted INT);');
  resultset=DBFeaso.execute('select * from RoomSubsCategory');
  DBFeaso.execute('BEGIN;'); 
if(!resultset.isValidRow())
 	{
 		//1 meter=3.28084 Ft
 		//1 ft =0.3048 meter
 		var RoomSubCategory=[
 							{RoomSubCID:1,Name:'Small Bedroom',Width:3,Depth:3,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:1,IsDeleted:0},
 							{RoomSubCID:2,Name:'Standard Bedroom',Width:3.6,Depth:3,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:1,IsDeleted:0},
 							{RoomSubCID:3,Name:'Large Bedroom',Width:3.6,Depth:3.6,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:1,IsDeleted:0},
 							{RoomSubCID:4,Name:'Double Bedroom',Width:4,Depth:4,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:1,IsDeleted:0},
 							{RoomSubCID:5,Name:'Master Bedroom',Width:5,Depth:4,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:1,IsDeleted:0},
 							
 							{RoomSubCID:6,Name:'Build in Wardrobe',Width:2,Depth:0.6,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:2,IsDeleted:0},
 							{RoomSubCID:7,Name:'Walk In Wardrobe',Width:2.4,Depth:2,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:2,IsDeleted:0},
 							{RoomSubCID:8,Name:'Lounge Room',Width:5,Depth:4,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:2,IsDeleted:0},
 							{RoomSubCID:9,Name:'Dining',Width:4,Depth:3,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:2,IsDeleted:0},
 							{RoomSubCID:10,Name:'Family Room',Width:6,Depth:4.5,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:2,IsDeleted:0},
 							{RoomSubCID:11,Name:'Rumpus Room',Width:6,Depth:4.5,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:2,IsDeleted:0},
 							{RoomSubCID:12,Name:'Study',Width:3,Depth:2.4,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:2,IsDeleted:0},
 							{RoomSubCID:13,Name:'large Study',Width:3.6,Depth:3,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:2,IsDeleted:0},
 							{RoomSubCID:14,Name:'Straight Flight of Stairs',Width:3.75,Depth:1,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:2,IsDeleted:0},
 							{RoomSubCID:15,Name:'Return Flight of Stairs',Width:2.8,Depth:2,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:2,IsDeleted:0},
 							{RoomSubCID:16,Name:'Small Laundry',Width:3,Depth:1.5,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:2,IsDeleted:0},
 							{RoomSubCID:17,Name:'Large laundry',Width:3.6,Depth:2.1,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:2,IsDeleted:0},
 							
 							{RoomSubCID:18,Name:'Galley Kitchen',Width:3.6,Depth:2.7,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:3,IsDeleted:0},
 							{RoomSubCID:19,Name:'Standard Kitchen',Width:4,Depth:3.3,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:3,IsDeleted:0},
 							{RoomSubCID:20,Name:'Large Kitchen',Width:4.5,Depth:3.6,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:3,IsDeleted:0},
 							
 							{RoomSubCID:21,Name:'Small Bathroom',Width:2,Depth:2,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:4,IsDeleted:0},
 							{RoomSubCID:22,Name:'Medium Bathroom',Width:3,Depth:1.8,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:4,IsDeleted:0},
 							{RoomSubCID:23,Name:'Large Bathroom',Width:3.6,Depth:2,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:4,IsDeleted:0},
 							{RoomSubCID:24,Name:'Small Rectangle Ensuite',Width:2.4,Depth:0.9,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:4,IsDeleted:0},
 							{RoomSubCID:25,Name:'Small Square Ensuite',Width:1.8,Depth:1.8,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:4,IsDeleted:0},
 							{RoomSubCID:26,Name:'Ensuite',Width:3,Depth:1.8,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:4,IsDeleted:0},
 							{RoomSubCID:27,Name:'large Ensuite',Width:4,Depth:2.4,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:4,IsDeleted:0},
 							{RoomSubCID:28,Name:'Small Powder Room',Width:2,Depth:0.9,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:4,IsDeleted:0},
 							{RoomSubCID:29,Name:'Large Powder Room',Width:2,Depth:2,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:4,IsDeleted:0},
 							{RoomSubCID:30,Name:'Toilet',Width:1.5,Depth:0.9,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:4,IsDeleted:0},
 							
 							{RoomSubCID:31,Name:'Small Deck',Width:3,Depth:3,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:5,IsDeleted:0},
 							{RoomSubCID:32,Name:'Medium Deck',Width:4,Depth:3.6,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:5,IsDeleted:0},
 							{RoomSubCID:33,Name:'Large Deck',Width:6,Depth:5,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:5,IsDeleted:0},
 							{RoomSubCID:34,Name:'Small Porch',Width:1.2,Depth:1.2,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:5,IsDeleted:0},
 							{RoomSubCID:35,Name:'Medium Porch',Width:2,Depth:1.5,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:5,IsDeleted:0},
 							{RoomSubCID:36,Name:'Large Porch',Width:3,Depth:3,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:5,IsDeleted:0},
 						
 							{RoomSubCID:37,Name:'Single Garage',Width:6,Depth:3,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:6,IsDeleted:0},
 							{RoomSubCID:38,Name:'Double Garage',Width:6,Depth:6,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:6,IsDeleted:0},
 							{RoomSubCID:39,Name:'Store Room',Width:6,Depth:1,Unit:'m2',AreaM2:'',AreaFt2:'',RoomCatID:6,IsDeleted:0},
 						
 						];
 			for(var i=0;i< RoomSubCategory.length;i++)
			{
				if(RoomSubCategory[i].Unit == 'm2')
				{
					//if Unit of measure selected is m2 
					DBFeaso.execute('insert into RoomSubsCategory(RoomSubCategotyID,Name,Width,Depth,Unit,AreaM2,AreaF2,RoomCategoryID,IsDeleted) values(?,?,?,?,?,?,?,?,?)',
							RoomSubCategory[i].RoomSubCID,RoomSubCategory[i].Name,RoomSubCategory[i].Width,RoomSubCategory[i].Depth,RoomSubCategory[i].Unit,RoomSubCategory[i].Width*RoomSubCategory[i].Depth,
							((RoomSubCategory[i].Width*3.28084)*(RoomSubCategory[i].Depth*3.28084)),RoomSubCategory[i].RoomCatID,RoomSubCategory[i].IsDeleted);
				}
				else
				{
					//if Unit of measure selected is f2 
					DBFeaso.execute('insert into RoomSubsCategory(RoomSubCategotyID,Name,Width,Depth,Unit,AreaM2,AreaF2,RoomCategoryID,IsDeleted) values(?,?,?,?,?,?,?,?,?)',
							RoomSubCategory[i].RoomSubCID,RoomSubCategory[i].Name,RoomSubCategory[i].Width,RoomSubCategory[i].Depth,RoomSubCategory[i].Unit,(RoomSubCategory[i].Width*0.3048)*(RoomSubCategory[i].Depth*0.3048),
							(RoomSubCategory[i].Width*RoomSubCategory[i].Depth),RoomSubCategory[i].RoomCatID,RoomSubCategory[i].IsDeleted);
				}
			}	
 						
 	}
	
	 resultset.close();
 DBFeaso.execute('COMMIT;');
DBFeaso.close();
 
}

/**
 * Function populate RoomDimension Settings
 */

function AddRoomDimensionSetting () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
  DBFeaso.execute('create table if not exists RoomDimensionSettings(RoomDimensionSettingID INT primary Key,Name TEXT,Value TEXT,IsDeleted INT);');
  resultset=DBFeaso.execute('select * from RoomDimensionSettings');
  if(!resultset.isValidRow())
 	{
 		var RoomDimensionSetting=[
 							{RDSID:1,Name:'Unit of Measure',Value:'m2',IsDeleted:0},//value 1=m2 2=f2
 							{RDSID:2,Name:'% Allowances for Hallways & Open Space',Value:5,IsDeleted:0},
 						];
	 	for(var i=0;i< RoomDimensionSetting.length;i++)
		{
		DBFeaso.execute('insert into RoomDimensionSettings(RoomDimensionSettingID,Name,Value,IsDeleted) values(?,?,?,?)',
						RoomDimensionSetting[i].RDSID,RoomDimensionSetting[i].Name,RoomDimensionSetting[i].Value,RoomDimensionSetting[i].IsDeleted);
		}
 	}
 	resultset.close();
	DBFeaso.close();
}


/**
 * Function populate Build Difficulty settings
 */
function AddBuildDifficulty () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
  DBFeaso.execute('create table if not exists BuildDifficulty(BuildDifficultyID INT primary Key,Name TEXT,DefaultValue INT,IsDeleted INT);');
  resultset=DBFeaso.execute('select * from BuildDifficulty');
  if(!resultset.isValidRow())
 	{
 		var BuildDifficulty=[
 							{BDID:1,Name:'Easy',DefaultValue:100,IsDeleted:0},
 							{BDID:2,Name:'Hard',DefaultValue:120,IsDeleted:0},
 							{BDID:3,Name:'Medium',DefaultValue:107,IsDeleted:0},
 							];
 							
	 	for(var i=0;i< BuildDifficulty.length;i++)
		{
		DBFeaso.execute('insert into BuildDifficulty(BuildDifficultyID,Name,DefaultValue,IsDeleted) values(?,?,?,?)',
						BuildDifficulty[i].BDID,BuildDifficulty[i].Name,BuildDifficulty[i].DefaultValue,BuildDifficulty[i].IsDeleted);
		}
 	}
  	resultset.close();
	DBFeaso.close();
}


/**
 * Function populate Build quality settings
 */
function AddBuildQuality () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
  DBFeaso.execute('create table if not exists BuildQuality(BuildQualityID INT primary Key,Name TEXT,Basic REAL,Standard REAL,High REAL,IsDeleted INT);');
  resultset=DBFeaso.execute('select * from BuildQuality');
  if(!resultset.isValidRow())
 	{
 		var BuildQuality=[
 							{BQID:1,Name:'Bathrooms',Basic:1200,Standard:1500,High:1800,IsDeleted:0},
 							{BQID:2,Name:'Decks',Basic:700,Standard:800,High:900,IsDeleted:0},
 							{BQID:3,Name:'Garages',Basic:900,Standard:900,High:900,IsDeleted:0},
 							{BQID:4,Name:'Internal Rooms',Basic:1200,Standard:1500,High:1800,IsDeleted:0},
 							{BQID:5,Name:'Kitchens',Basic:1200,Standard:1500,High:1800,IsDeleted:0}
 							];
 							
	 	for(var i=0;i< BuildQuality.length;i++)
		{
		DBFeaso.execute('insert into BuildQuality(BuildQualityID,Name,Basic,Standard,High,IsDeleted) values(?,?,?,?,?,?)',
						BuildQuality[i].BQID,BuildQuality[i].Name,BuildQuality[i].Basic,BuildQuality[i].Standard,BuildQuality[i].High,BuildQuality[i].IsDeleted);
		}
 	}
  	resultset.close();
	DBFeaso.close();
  
}

/**
 * Function will populate default fitoutCosts Setting
 * 
 */

function addFitoutCosts () {
  var DBFeaso = Ti.Database.open('QwikFeaso');
  DBFeaso.execute('create table if not exists FitoutCosts(FitoutCostsID INT primary Key,Name TEXT,None Text,Basic REAL,Standard REAL,High REAL,Premium REAL);');
  resultset=DBFeaso.execute('select * from FitoutCosts');
  if(!resultset.isValidRow())
 	{
 		var FitoutCost=[
 							{fcID:1,Name:'Bathroom (Vanity, Sink, Taps, Shower, Bath, etc)',None:'Not Possible',Basic:2000,Standard:2500,High:3000,Premium:5000},
 							{fcID:2,Name:'Kitchen (Benches, Splashback, Appliances, etc)',None:'Not Possible',Basic:2000,Standard:3000,High:5000,Premium:20000},
 							{fcID:3,Name:'Landscaping & Driveways & Fencing',None:'0',Basic:5000,Standard:7500,High:12000,Premium:20000},
 							];
 							
	 	for(var i=0;i< FitoutCost.length;i++)
		{
		DBFeaso.execute('insert into FitoutCosts(FitoutCostsID,Name,None,Basic,Standard,High,Premium) values(?,?,?,?,?,?,?)',
						FitoutCost[i].fcID,FitoutCost[i].Name,FitoutCost[i].None,FitoutCost[i].Basic,FitoutCost[i].Standard,FitoutCost[i].High,FitoutCost[i].Premium);
		}
 	}
  	resultset.close();
	DBFeaso.close();
}




/**
 * Function populate dwelling list
 */
function AddDwellings () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
  DBFeaso.execute('create table if not exists Dwellings(DwellingID INT primary Key,Name TEXT,BuildQuality TEXT,BuildDifficulty TEXT,BathroomFitout TEXT,KitchenFitout TEXT,LandsapingFitout TEXT,IsDeleted Int);');
  /**
   * DwellingID = ID for particular dwelling
   * Name = Name for Dwelling
   * IsDeleted 1=Dwelling is deleted 0=Dwelling is present in list
   */
  resultset=DBFeaso.execute('select * from Dwellings');
  DBFeaso.execute('BEGIN;'); 
  
  if(!resultset.isValidRow())
 	{
		var DwellingsList=[
							//{DwellingID:1,Name:'Vacant Land',buildQuality:'Standard',buildDifficulty:'Easy',bathroomFC:'Standard',kitchenFC:'Standard',LandscapingFC:'None',isDeleted:0},
							{DwellingID:1,Name:'1 Bedroom Bedsit',buildQuality:'Standard',buildDifficulty:'Easy',bathroomFC:'Standard',kitchenFC:'Standard',LandscapingFC:'None',isDeleted:0},
							{DwellingID:2,Name:'2 Bedroom Unit',buildQuality:'Standard',buildDifficulty:'Easy',bathroomFC:'Standard',kitchenFC:'Standard',LandscapingFC:'None',isDeleted:0},
							{DwellingID:3,Name:'3 Bedroom Townhouse',buildQuality:'Standard',buildDifficulty:'Easy',bathroomFC:'Standard',kitchenFC:'Standard',LandscapingFC:'None',isDeleted:0},
							
		];					
 		for(var i=0;i< DwellingsList.length;i++)
		{
		DBFeaso.execute('insert into Dwellings(DwellingID,Name,BuildQuality,BuildDifficulty,BathroomFitout,KitchenFitout,LandsapingFitout,IsDeleted) values(?,?,?,?,?,?,?,?)',
						DwellingsList[i].DwellingID,DwellingsList[i].Name,DwellingsList[i].buildQuality,DwellingsList[i].buildDifficulty,DwellingsList[i].bathroomFC,DwellingsList[i].kitchenFC,DwellingsList[i].LandscapingFC,DwellingsList[i].isDeleted);
		}
 	
	 }
	resultset.close();
	DBFeaso.execute('COMMIT;');
	DBFeaso.close();
}



/**
 * function will  link Room Category,Room Sub Category,Dwellings tables to one another
 * and will insert data to DwellingDetails Table 
 */

function DwellingDetails () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute('create table if not exists DwellingDetails(DwellingDetailID INTEGER PRIMARY KEY AUTOINCREMENT,DwellingID INT,RoomCategoryID INT,RoomSubCategotyID INT,DwellingQuantity REAL,IsDeleted INT);');
 	resultset=DBFeaso.execute('select * from DwellingDetails');	
 		
 	var DwellingQuantity=[
 		
 							{DwellingID:1,RoomID:1,SubRoomID:1,Value:1},
 							{DwellingID:1,RoomID:2,SubRoomID:6,Value:1},
 							{DwellingID:1,RoomID:2,SubRoomID:8,Value:1},	
 							{DwellingID:1,RoomID:3,SubRoomID:18,Value:1},	
 							{DwellingID:1,RoomID:4,SubRoomID:21,Value:1},	
 							{DwellingID:1,RoomID:6,SubRoomID:37,Value:1},
 							
 							{DwellingID:2,RoomID:1,SubRoomID:2,Value:2},
 							{DwellingID:2,RoomID:2,SubRoomID:6,Value:2},
 							{DwellingID:2,RoomID:2,SubRoomID:8,Value:1},	
 							{DwellingID:2,RoomID:2,SubRoomID:9,Value:1},	
 							{DwellingID:2,RoomID:2,SubRoomID:16,Value:1},
 							{DwellingID:2,RoomID:3,SubRoomID:18,Value:1},	
 							{DwellingID:2,RoomID:4,SubRoomID:21,Value:1},
 							{DwellingID:2,RoomID:6,SubRoomID:37,Value:1},
 							
 							{DwellingID:3,RoomID:1,SubRoomID:2,Value:2},
 							{DwellingID:3,RoomID:1,SubRoomID:3,Value:1},
 							{DwellingID:3,RoomID:2,SubRoomID:6,Value:3},	
 							{DwellingID:3,RoomID:2,SubRoomID:8,Value:1},	
 							{DwellingID:3,RoomID:2,SubRoomID:9,Value:1},
 							{DwellingID:3,RoomID:2,SubRoomID:14,Value:1},	
 							{DwellingID:3,RoomID:2,SubRoomID:16,Value:1},
 							{DwellingID:3,RoomID:3,SubRoomID:19,Value:1},
 							{DwellingID:3,RoomID:4,SubRoomID:22,Value:1},
 							{DwellingID:3,RoomID:4,SubRoomID:25,Value:1},
 							{DwellingID:3,RoomID:5,SubRoomID:31,Value:1},
 							{DwellingID:3,RoomID:5,SubRoomID:34,Value:1},
 							{DwellingID:3,RoomID:6,SubRoomID:38,Value:1},
 							];
 		
 		
	DBFeaso.execute('BEGIN;'); 
 		
	if(!resultset.isValidRow())
 	{
 		var DwellingIDresultset=DBFeaso.execute('select * from Dwellings');
 	
 		while(DwellingIDresultset.isValidRow())
		{
			var DwellingID=DwellingIDresultset.fieldByName('DwellingID');
			var RoomCategoryIDresultset=DBFeaso.execute('select * from RoomCategory');
			 	 while(RoomCategoryIDresultset.isValidRow())
					{
						var RoomCategoryID=RoomCategoryIDresultset.fieldByName('RoomCategoryID');
								var	RoomSubCategotyIDresultset=DBFeaso.execute('select RoomSubCategotyID,Name from RoomSubsCategory where RoomCategoryID ='+RoomCategoryID);
							 	 while(RoomSubCategotyIDresultset.isValidRow())
									{
										var RoomSubCategotyID=RoomSubCategotyIDresultset.fieldByName('RoomSubCategotyID');
						        		DBFeaso.execute('insert into DwellingDetails(DwellingID,RoomCategoryID,RoomSubCategotyID,DwellingQuantity,IsDeleted) values(?,?,?,?,?)',
											DwellingID,RoomCategoryID,RoomSubCategotyID,0,0);
  
										RoomSubCategotyIDresultset.next();
									}
						RoomSubCategotyIDresultset.close();
						RoomCategoryIDresultset.next();
					}
			RoomCategoryIDresultset.close();
			DwellingIDresultset.next();
		}
 		DwellingIDresultset.close();
 		
 		for (var i=0; i < DwellingQuantity.length; i++) {
 			DBFeaso.execute('update DwellingDetails set DwellingQuantity='+DwellingQuantity[i].Value+' where DwellingID='+DwellingQuantity[i].DwellingID+' and RoomCategoryID='+DwellingQuantity[i].RoomID+' and RoomSubCategotyID='+DwellingQuantity[i].SubRoomID);
		 };
 	}
 	resultset.close();
 	DBFeaso.execute('COMMIT;');
	DBFeaso.close();	
 	 
}

/**
 * Function Update Dwelling Details
 * @param {String} dwelName			Holds Dwelling name
 * @param {Integer} dwelId			Holds Dwelling Id
 * @param {Integer} roomCatId		Holds Room Category Id
 * @param {Integer} roomSubCat		Holds Room SubCategory Id 
 * @param {Integer} qty				Holds new quantity of Room SubCategory for specified dwelling
 */
function updateDwellingDetails (dwelName,dwelId,roomCatId,roomSubCat,qty) {
  var DBFeaso = Ti.Database.open('QwikFeaso');
  DBFeaso.execute('update DwellingDetails set DwellingQuantity='+qty+' where DwellingID='+dwelId+' and RoomCategoryID='+roomCatId+' and RoomSubCategotyID='+roomSubCat);
  //DBFeaso.execute("update Dwellings set Name = '"+dwelName+"' "+" where DwellingID="+dwelId);
  DBFeaso.execute("update Dwellings set Name = \""+dwelName+"\" "+" where DwellingID="+dwelId);
  DBFeaso.close();
}

function saveDwellingConstructionCost (dwellingID,dDiff,dQuality,dBathroomF,dKitchenF,dlandscapingF) {
	
	var DBFeaso = Ti.Database.open('QwikFeaso');
    DBFeaso.execute("update Dwellings set BuildQuality='"+dQuality+"'"+",BuildDifficulty='"+dDiff+"'"+",BathroomFitout='"+dBathroomF+"'"+",KitchenFitout='"+dKitchenF+"'"+",LandsapingFitout='"+dlandscapingF+ "'" +" where DwellingID="+dwellingID);//dwellingID
    DBFeaso.close();
}


/**
 * Function populate dwelling details
 */
function DwellingDetailsSummary () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
  DBFeaso.execute('create table if not exists DwellingDetailsSummary(DwellingDetailSummaryID INTEGER PRIMARY KEY AUTOINCREMENT,DwellingID INT,TotalLivingAreaM2 REAL,TotalLivingAreaFt2 REAL,TotalConstructionAreaM2 REAL,TotalConstructionAreaFt2 REAL,TotalConstructionCostM2 INT,TotalConstructionCostFt2 INT,Summary TEXT,BathroomFitoutCost REAL,KitchenFitoutCost REAL,LandsapingFitoutCost REAL,TotalFitoutCosts REAL,TotalCost REAL,IsDeleted INT);');
 DBFeaso.execute('delete from DwellingDetailsSummary');
  resultset=DBFeaso.execute('select * from DwellingDetailsSummary');	
	
		var Percent_Allowances=DBFeaso.execute('select Value from RoomDimensionSettings where RoomDimensionSettingID=2');
		var Percents=Percent_Allowances.fieldByName('Value');
		Percent_Allowances.close();
		var DecimalPercent=Percents/100;
	DBFeaso.execute('BEGIN;');  
 if(!resultset.isValidRow())
 	{//if Table has no value the insert default value provided by Client
 		var DwellingIDresultset=DBFeaso.execute('select * from Dwellings');
 	while(DwellingIDresultset.isValidRow())
		{
			var DwellingID=DwellingIDresultset.fieldByName('DwellingID');
			var DwellingBQuality=DwellingIDresultset.fieldByName('BuildQuality');
			var DwellingBDifficulty=DwellingIDresultset.fieldByName('BuildDifficulty');
			var DwellingBathroomFC=DwellingIDresultset.fieldByName('BathroomFitout');
			var DwellingKitchenFC=DwellingIDresultset.fieldByName('KitchenFitout');
			var DwellingLandscapingFC=DwellingIDresultset.fieldByName('LandsapingFitout');
			
			Ti.API.info(DwellingID+': '+DwellingBQuality+': '+DwellingBDifficulty);
			Ti.API.info(DwellingBathroomFC+': '+DwellingKitchenFC+': '+DwellingKitchenFC);
			
			var InternalRoomArea=0;	var KitchenArea=0;var BathroomsArea=0;var DeckArea=0;
			var GarageArea=0;
						
			var NoOfBedRoom=0;
			var NoOfBathrooms=0;
			var NoOfKitchen=0;
			var NoOfCarParks=0		
			
			var NoOfLoungeroom=0;
			var NoOfDiningRoom=0;
			var NoOfFamillyRooms=0;
			var NoOfRumPusRoom=0;
			var NoOfVerandah=0;
			var NoOfBalcony=0;
			
			var InternalRoomAreaWithPercentAllowance;
			
			var InternalRoomCost=0; var KitchenCost=0; var BathroomCost=0; var DecksCost=0;var GaragesCost=0;
			
			var BuiledQuality=0;//for Standard default
			var BuildDifficulty=0;//easy default
			var BuiledDiffRS=DBFeaso.execute("select * from BuildDifficulty where IsDeleted=0 and Name ='"+DwellingBDifficulty+"'");//for easy
			
 				var RoomCategoryIDresultset=DBFeaso.execute('select * from RoomCategory');
			 	 while(RoomCategoryIDresultset.isValidRow())
					{
						var RoomCategoryID=RoomCategoryIDresultset.fieldByName('RoomCategoryID');
						var SubCategoryResult=DBFeaso.execute('select RoomSubCategotyID,AreaM2 from RoomSubsCategory where RoomCategoryID='+RoomCategoryID);	
					      while(SubCategoryResult.isValidRow())
									{
								var RoomSubCategotyID=SubCategoryResult.fieldByName('RoomSubCategotyID');
								var RoomSubCategoryAreaM2=SubCategoryResult.fieldByName('AreaM2');
								var Quantity=DBFeaso.execute('select DwellingQuantity from DwellingDetails where DwellingID= ? and RoomCategoryID=? and RoomSubCategotyID=?',DwellingID,RoomCategoryID,RoomSubCategotyID);
									while(Quantity.isValidRow())
									{
										var RoomQuantity=Quantity.fieldByName('DwellingQuantity');
										Quantity.next();
									}
									Quantity.close();
						//To Create Summary
								if(RoomCategoryID == 1)
								{//BedRoom
									NoOfBedRoom=NoOfBedRoom+RoomQuantity;
								}else
								  if(RoomCategoryID ==3)
									{//Kitchen
									 NoOfKitchen=NoOfKitchen+RoomQuantity;
									}
								else
								if(RoomCategoryID ==4)
								{//Bathrooms
									var OnlyBathroomNo=0;
									var ToiletNo=0
									if(RoomSubCategotyID >= 21 && RoomSubCategotyID <= 27)
									{
										OnlyBathroomNo=OnlyBathroomNo+RoomQuantity;
									}
									if(RoomSubCategotyID > 27 && RoomSubCategotyID <= 30)
									{
										ToiletNo=ToiletNo+RoomQuantity;
									}
									NoOfBathrooms=NoOfBathrooms+(OnlyBathroomNo+(ToiletNo/2));
								}
								else
								if(RoomCategoryID ==6)
								{//Decks
									var SingleGarageNo=0;
									var DoubleGarageNo=0;
									if(RoomSubCategotyID == 37)
									{
										SingleGarageNo=SingleGarageNo+RoomQuantity;
									}
									if(RoomSubCategotyID == 38)
									{
										DoubleGarageNo=DoubleGarageNo+(RoomQuantity*2);
									}
									NoOfCarParks=NoOfCarParks+(SingleGarageNo+DoubleGarageNo);
								}
				//To Calculate Total Living Area and Construction area and ConstructionCost
											if(RoomCategoryID == 1 || RoomCategoryID == 2)
											{
												InternalRoomArea=InternalRoomArea+RoomSubCategoryAreaM2*RoomQuantity;
												InternalRoomAreaWithPercentAllowance=InternalRoomArea*(1+Percents/100);
												//var BuiledQualityRS=DBFeaso.execute('select standard from BuildQuality where BuildQualityID=4');//for standard
												var BuiledQualityRS=DBFeaso.execute('select '+DwellingBQuality+' from BuildQuality where BuildQualityID=4 and IsDeleted=0');//for standard
												while(BuiledQualityRS.isValidRow())
												{
													BuiledQuality=BuiledQualityRS.fieldByName(''+DwellingBQuality);
													BuiledQualityRS.next();
												}			
												BuiledQualityRS.close();
												BuildDifficulty=BuiledDiffRS.fieldByName('DefaultValue');
												InternalRoomCost=InternalRoomAreaWithPercentAllowance*(BuiledQuality*[BuildDifficulty/100]);
											
											}
											else
											if(RoomCategoryID == 3)
											{
												KitchenArea=KitchenArea+RoomSubCategoryAreaM2*RoomQuantity;
												var BuiledQualityRS=DBFeaso.execute('select '+DwellingBQuality+' from BuildQuality where BuildQualityID=5 and IsDeleted=0');
												while(BuiledQualityRS.isValidRow())
													{
															BuiledQuality=BuiledQualityRS.fieldByName(''+DwellingBQuality);
															BuiledQualityRS.next();
													}			
												BuiledQualityRS.close();
												
												BuildDifficulty=BuiledDiffRS.fieldByName('DefaultValue');
												
												KitchenCost=KitchenArea*(BuiledQuality*[BuildDifficulty/100]);
												
											}
											else
											if(RoomCategoryID == 4)
											{
												BathroomsArea=BathroomsArea+RoomSubCategoryAreaM2*RoomQuantity;
												var BuiledQualityRS=DBFeaso.execute('select '+DwellingBQuality+' from BuildQuality where BuildQualityID=1 and IsDeleted=0');
												while(BuiledQualityRS.isValidRow())
													{
														BuiledQuality=BuiledQualityRS.fieldByName(''+DwellingBQuality);
														BuiledQualityRS.next();
													}
												BuiledQualityRS.close();
												BuildDifficulty=BuiledDiffRS.fieldByName('DefaultValue');
												BathroomCost=BathroomsArea*(BuiledQuality*[BuildDifficulty/100]);
											
											}
											else
											if(RoomCategoryID == 5)
											{
												DeckArea=DeckArea+RoomSubCategoryAreaM2*RoomQuantity;
												var BuiledQualityRS=DBFeaso.execute('select '+DwellingBQuality+' from BuildQuality where BuildQualityID=2 and IsDeleted=0');
												while(BuiledQualityRS.isValidRow())
													{
														BuiledQuality=BuiledQualityRS.fieldByName(''+DwellingBQuality);
														BuiledQualityRS.next();
													}
												BuiledQualityRS.close();
												BuildDifficulty=BuiledDiffRS.fieldByName('DefaultValue');
												DecksCost=DeckArea*(BuiledQuality*[BuildDifficulty/100]);
											}
											else
											{//if(RoomCategoryID == 6)
												GarageArea=GarageArea+RoomSubCategoryAreaM2*RoomQuantity;
												var BuiledQualityRS=DBFeaso.execute('select '+DwellingBQuality+' from BuildQuality where BuildQualityID=3 and IsDeleted=0');
												while(BuiledQualityRS.isValidRow())
													{
															BuiledQuality=BuiledQualityRS.fieldByName(''+DwellingBQuality);
														BuiledQualityRS.next();
													}
												BuiledQualityRS.close();
												BuildDifficulty=BuiledDiffRS.fieldByName('DefaultValue');
												GaragesCost=GarageArea*(BuiledQuality*[BuildDifficulty/100]);
											}
								
								   SubCategoryResult.next();
								   }
							
							SubCategoryResult.close();	
							
							
						RoomCategoryIDresultset.next();
					}
		BuiledDiffRS.close();			
 		RoomCategoryIDresultset.close();
 		
 		var TotalLivingArea=InternalRoomAreaWithPercentAllowance+KitchenArea+BathroomsArea;
 		var TotalConstructionArea=TotalLivingArea+DeckArea+GarageArea;
 		
 		/**
 		 * Query To generate summary of Dwelling
 		 */
 		var SummaryRS=DBFeaso.execute("select r.RoomSubCategotyID,r.name,d.dwellingquantity from DwellingDetails d, RoomSubsCategory r where d.RoomSubCategotyID=r.RoomSubCategotyID and d.DwellingID =? and d.dwellingquantity > 0",DwellingID);		
 		var detailedSummary='';
 		while(SummaryRS.isValidRow())
 		{
 			detailedSummary=detailedSummary.toString().concat(SummaryRS.fieldByName('DwellingQuantity').toString().concat(' x '+SummaryRS.fieldByName('Name').toString())+',') ;
 			SummaryRS.next();
 		}	
 		SummaryRS.close();	
		//Calculting fitout Costs for Bathroom ,kitchen,landscaping
		//option selected value* no of respective room (this is for Bathroom & kitchen only)
		//for Landscaping -> option selected value
		/*
		 * 1=bathroom    default=standard
		 * 2=kithcen	 default=standard
		 * 3=landscaping default=premium
		 */
	var Bfc = 0;	
	var result=DBFeaso.execute('select '+DwellingBathroomFC+' from FitoutCosts where FitoutCostsID=1');
	while(result.isValidRow())
	{
		Bfc=result.fieldByName(DwellingBathroomFC);
		result.next();	
	}
	result.close();
	
	var Kfc = 0;
	var result=DBFeaso.execute('select '+DwellingKitchenFC+' from FitoutCosts where FitoutCostsID=2');
	while(result.isValidRow())
	{
		Kfc=result.fieldByName(DwellingKitchenFC);
		result.next();	
	}
	result.close();
	
	var LandscapingFitoutCost = 0;
	var result=DBFeaso.execute('select '+DwellingLandscapingFC+' from FitoutCosts where FitoutCostsID=3');
	while(result.isValidRow())
	{
		LandscapingFitoutCost=result.fieldByName(DwellingLandscapingFC);
		result.next();	
	}
	result.close();
		
	//var Bfc= getFitoutcostforRooms(1,''+DwellingBathroomFC);
	var BathroomFitoutCost=NoOfBathrooms*Bfc;
	//var Kfc= getFitoutcostforRooms(2,''+DwellingKitchenFC);
	var KitchenFitoutCost=NoOfKitchen * Kfc;  	
		
	//var LandscapingFitoutCost= getFitoutcostforRooms(3,''+DwellingLandscapingFC);

 		//======Cost Calculation
 		var TotalConstructionCostM2=parseInt(InternalRoomCost)+parseInt(KitchenCost)+parseInt(BathroomCost)+parseInt(DecksCost)+parseInt(GaragesCost);
 		var TotalFitoutCost=parseInt(BathroomFitoutCost)+parseInt(KitchenFitoutCost)+parseInt(LandscapingFitoutCost);
 		
 		var totalCost=parseInt(TotalConstructionCostM2)+parseInt(TotalFitoutCost);
 		//Ti.API.info('TotalConstructionCostM2:'+TotalConstructionCostM2);
 		DBFeaso.execute('insert into DwellingDetailsSummary(DwellingID,TotalLivingAreaM2,TotalLivingAreaFt2,TotalConstructionAreaM2,TotalConstructionAreaFt2,TotalConstructionCostM2,TotalConstructionCostFt2,Summary,BathroomFitoutCost,KitchenFitoutCost,LandsapingFitoutCost,TotalFitoutCosts,TotalCost,IsDeleted) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
 															DwellingID,TotalLivingArea,0,TotalConstructionArea,0,TotalConstructionCostM2,0,detailedSummary.slice(0,-1),BathroomFitoutCost,KitchenFitoutCost,LandscapingFitoutCost,TotalFitoutCost,totalCost,0);
 		DwellingIDresultset.next();	
 			}
 		DwellingIDresultset.close();
 		
 	}
 	resultset.close();
 	
  	DBFeaso.execute('COMMIT;');
DBFeaso.close();
}

//==============================

/**
 * Function adds property photos
 */
function AddPropertyPhotos () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
		DBFeaso.execute('create table if not exists PropertyPhotos(PropertyPhotoID INTEGER PRIMARY KEY AUTOINCREMENT,Photo TEXT,IsDefault INT,PropertyID INT,IsDeleted INT);');
  	DBFeaso.close();
}


/**
 * Function add properties
 */
function AddProperties () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
 	 DBFeaso.execute('create table if not exists Properties(PropertyID INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT,Address TEXT,IsDeleted INT);');
 	 var resultSet = DBFeaso.execute("SELECT * FROM Properties");
 	 if(!resultSet.isValidRow()){
 	 	DBFeaso.execute("INSERT INTO Properties(Name,Address,IsDeleted) VALUES('My Favourite Property','2 Nice St, Happy Valley',0)");
 	 	var photo = Ti.Platform.osname == 'android'?'/images/default_property1.png':'images/def.png';
  	 	DBFeaso.execute('insert into PropertyPhotos(Photo,IsDefault,PropertyID,IsDeleted) values(?,?,?,?)',photo,1,1,0);
 	 }
 	 DBFeaso.close();
}
/**
 * Function populate new feasibility details
 */ 
function InsertFeasibility () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
   DBFeaso.execute('create table if not exists Feasibility(FeasibilityID INTEGER PRIMARY KEY AUTOINCREMENT,FeasibilityName TEXT,IsDeleted INT);');
 	DBFeaso.execute('BEGIN;');  
  resultset=DBFeaso.execute('select * from Feasibility');
  if(!resultset.isValidRow())
 	{
 		var Feasibility=[
				{Name:'Splitter (2 Lots on one Title)'},
				{Name:'Raw site suitable for Townhouses or Units'},
				{Name:'Property has existing Development Approval'},
				{Name:'Property has existing Building  (Operational Works) Approval'},
				];
	 	for(var i=0;i< Feasibility.length;i++)
		{
		DBFeaso.execute('insert into Feasibility(FeasibilityName,IsDeleted) values(?,?)',Feasibility[i].Name,0);
		}
 	}
  resultset.close();
   DBFeaso.execute('COMMIT;');
  DBFeaso.close();
}

/**
 * Function add default values for scenarios
 */
function AddDefaultValusForScenarios () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
  DBFeaso.execute('create table if not exists DefaultValusForScenarios(DefaultValusForScenariosID INTEGER PRIMARY KEY AUTOINCREMENT,CostGroupsID INT,CostElementID INT,FeasibilityID INT,DefaultValue INT,IsDeleted INT);');
  DBFeaso.execute('BEGIN;');
  resultset=DBFeaso.execute('select * from DefaultValusForScenarios');
  
  var DefaultScenarioValus=[{geID:10,GrpID:4,IsDeleted:0,fesibilityID:1,Value:500},{geID:10,GrpID:4,IsDeleted:0,fesibilityID:2,Value:20000},{geID:10,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:10,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:11,GrpID:4,IsDeleted:0,fesibilityID:1,Value:3500},{geID:11,GrpID:4,IsDeleted:0,fesibilityID:2,Value:15000},{geID:11,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:11,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:12,GrpID:4,IsDeleted:0,fesibilityID:1,Value:0},{geID:12,GrpID:4,IsDeleted:0,fesibilityID:2,Value:2500},{geID:12,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:12,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:13,GrpID:4,IsDeleted:0,fesibilityID:1,Value:0},{geID:13,GrpID:4,IsDeleted:0,fesibilityID:2,Value:3000},{geID:13,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:13,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:14,GrpID:4,IsDeleted:0,fesibilityID:1,Value:0},{geID:14,GrpID:4,IsDeleted:0,fesibilityID:2,Value:1500},{geID:14,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:14,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:15,GrpID:4,IsDeleted:0,fesibilityID:1,Value:2000},{geID:15,GrpID:4,IsDeleted:0,fesibilityID:2,Value:5000},{geID:15,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:15,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:16,GrpID:4,IsDeleted:0,fesibilityID:1,Value:2500},{geID:16,GrpID:4,IsDeleted:0,fesibilityID:2,Value:4000},{geID:16,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:16,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:17,GrpID:4,IsDeleted:0,fesibilityID:1,Value:1500},{geID:17,GrpID:4,IsDeleted:0,fesibilityID:2,Value:2500},{geID:17,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:17,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:18,GrpID:4,IsDeleted:0,fesibilityID:1,Value:0},{geID:18,GrpID:4,IsDeleted:0,fesibilityID:2,Value:5000},{geID:18,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:18,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:19,GrpID:4,IsDeleted:0,fesibilityID:1,Value:1500},{geID:19,GrpID:4,IsDeleted:0,fesibilityID:2,Value:1500},{geID:19,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:19,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:20,GrpID:4,IsDeleted:0,fesibilityID:1,Value:0},{geID:20,GrpID:4,IsDeleted:0,fesibilityID:2,Value:5000},{geID:20,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:20,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:21,GrpID:4,IsDeleted:0,fesibilityID:1,Value:0},{geID:21,GrpID:4,IsDeleted:0,fesibilityID:2,Value:1000},{geID:21,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:21,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:22,GrpID:4,IsDeleted:0,fesibilityID:1,Value:0},{geID:22,GrpID:4,IsDeleted:0,fesibilityID:2,Value:20000},{geID:22,GrpID:4,IsDeleted:0,fesibilityID:3,Value:0},{geID:22,GrpID:4,IsDeleted:0,fesibilityID:4,Value:0},
				
				
				{geID:23,GrpID:5,IsDeleted:0,fesibilityID:1,Value:0},{geID:23,GrpID:5,IsDeleted:0,fesibilityID:2,Value:20000},{geID:23,GrpID:5,IsDeleted:0,fesibilityID:3,Value:20000},{geID:23,GrpID:5,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:24,GrpID:5,IsDeleted:0,fesibilityID:1,Value:2000},{geID:24,GrpID:5,IsDeleted:0,fesibilityID:2,Value:3000},{geID:24,GrpID:5,IsDeleted:0,fesibilityID:3,Value:3000},{geID:24,GrpID:5,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:25,GrpID:5,IsDeleted:0,fesibilityID:1,Value:0},{geID:25,GrpID:5,IsDeleted:0,fesibilityID:2,Value:2000},{geID:25,GrpID:5,IsDeleted:0,fesibilityID:3,Value:2000},{geID:25,GrpID:5,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:26,GrpID:5,IsDeleted:0,fesibilityID:1,Value:2000},{geID:26,GrpID:5,IsDeleted:0,fesibilityID:2,Value:5000},{geID:26,GrpID:5,IsDeleted:0,fesibilityID:3,Value:5000},{geID:26,GrpID:5,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:27,GrpID:5,IsDeleted:0,fesibilityID:1,Value:0},{geID:27,GrpID:5,IsDeleted:0,fesibilityID:2,Value:5000},{geID:27,GrpID:5,IsDeleted:0,fesibilityID:3,Value:5000},{geID:27,GrpID:5,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:28,GrpID:5,IsDeleted:0,fesibilityID:1,Value:0},{geID:28,GrpID:5,IsDeleted:0,fesibilityID:2,Value:12000},{geID:28,GrpID:5,IsDeleted:0,fesibilityID:3,Value:12000},{geID:28,GrpID:5,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:29,GrpID:5,IsDeleted:0,fesibilityID:1,Value:0},{geID:29,GrpID:5,IsDeleted:0,fesibilityID:2,Value:7500},{geID:29,GrpID:5,IsDeleted:0,fesibilityID:3,Value:7500},{geID:29,GrpID:5,IsDeleted:0,fesibilityID:4,Value:0},
				
 				{geID:32,GrpID:6,IsDeleted:0,fesibilityID:1,Value:26000},{geID:32,GrpID:6,IsDeleted:0,fesibilityID:2,Value:25000},{geID:32,GrpID:6,IsDeleted:0,fesibilityID:3,Value:25000},{geID:32,GrpID:6,IsDeleted:0,fesibilityID:4,Value:25000},
				
				{geID:33,GrpID:8,IsDeleted:0,fesibilityID:1,Value:0},{geID:33,GrpID:8,IsDeleted:0,fesibilityID:2,Value:80000},{geID:33,GrpID:8,IsDeleted:0,fesibilityID:3,Value:65000},{geID:33,GrpID:8,IsDeleted:0,fesibilityID:4,Value:50000},
				{geID:34,GrpID:7,IsDeleted:0,fesibilityID:1,Value:2500},{geID:34,GrpID:7,IsDeleted:0,fesibilityID:2,Value:25000},{geID:34,GrpID:7,IsDeleted:0,fesibilityID:3,Value:25000},{geID:34,GrpID:7,IsDeleted:0,fesibilityID:4,Value:25000},
				{geID:35,GrpID:7,IsDeleted:0,fesibilityID:1,Value:2500},{geID:35,GrpID:7,IsDeleted:0,fesibilityID:2,Value:10000},{geID:35,GrpID:7,IsDeleted:0,fesibilityID:3,Value:10000},{geID:35,GrpID:7,IsDeleted:0,fesibilityID:4,Value:10000},
				{geID:36,GrpID:7,IsDeleted:0,fesibilityID:1,Value:0},{geID:36,GrpID:7,IsDeleted:0,fesibilityID:2,Value:5000},{geID:36,GrpID:7,IsDeleted:0,fesibilityID:3,Value:5000},{geID:36,GrpID:7,IsDeleted:0,fesibilityID:4,Value:5000},
				{geID:37,GrpID:7,IsDeleted:0,fesibilityID:1,Value:1500},{geID:37,GrpID:7,IsDeleted:0,fesibilityID:2,Value:2500},{geID:37,GrpID:7,IsDeleted:0,fesibilityID:3,Value:2500},{geID:37,GrpID:7,IsDeleted:0,fesibilityID:4,Value:2500},
				{geID:38,GrpID:7,IsDeleted:0,fesibilityID:1,Value:0},{geID:38,GrpID:7,IsDeleted:0,fesibilityID:2,Value:2000},{geID:38,GrpID:7,IsDeleted:0,fesibilityID:3,Value:2000},{geID:38,GrpID:7,IsDeleted:0,fesibilityID:4,Value:2000},
				{geID:39,GrpID:7,IsDeleted:0,fesibilityID:1,Value:0},{geID:39,GrpID:7,IsDeleted:0,fesibilityID:2,Value:5000},{geID:39,GrpID:7,IsDeleted:0,fesibilityID:3,Value:5000},{geID:39,GrpID:7,IsDeleted:0,fesibilityID:4,Value:5000},
				{geID:40,GrpID:7,IsDeleted:0,fesibilityID:1,Value:0},{geID:40,GrpID:7,IsDeleted:0,fesibilityID:2,Value:0},{geID:40,GrpID:7,IsDeleted:0,fesibilityID:3,Value:0},{geID:40,GrpID:7,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:41,GrpID:7,IsDeleted:0,fesibilityID:1,Value:1500},{geID:41,GrpID:7,IsDeleted:0,fesibilityID:2,Value:1500},{geID:41,GrpID:7,IsDeleted:0,fesibilityID:3,Value:1500},{geID:41,GrpID:7,IsDeleted:0,fesibilityID:4,Value:1500},
				{geID:42,GrpID:7,IsDeleted:0,fesibilityID:1,Value:0},{geID:42,GrpID:7,IsDeleted:0,fesibilityID:2,Value:40000},{geID:42,GrpID:7,IsDeleted:0,fesibilityID:3,Value:40000},{geID:42,GrpID:7,IsDeleted:0,fesibilityID:4,Value:40000},
				
				
				{geID:47,GrpID:9,IsDeleted:0,fesibilityID:1,Value:4000},{geID:47,GrpID:9,IsDeleted:0,fesibilityID:2,Value:8000},{geID:47,GrpID:9,IsDeleted:0,fesibilityID:3,Value:8000},{geID:47,GrpID:9,IsDeleted:0,fesibilityID:4,Value:8000},
				{geID:48,GrpID:9,IsDeleted:0,fesibilityID:1,Value:2000},{geID:48,GrpID:9,IsDeleted:0,fesibilityID:2,Value:6000},{geID:48,GrpID:9,IsDeleted:0,fesibilityID:3,Value:6000},{geID:48,GrpID:9,IsDeleted:0,fesibilityID:4,Value:6000},
				{geID:49,GrpID:9,IsDeleted:0,fesibilityID:1,Value:1000},{geID:49,GrpID:9,IsDeleted:0,fesibilityID:2,Value:2000},{geID:49,GrpID:9,IsDeleted:0,fesibilityID:3,Value:2000},{geID:49,GrpID:9,IsDeleted:0,fesibilityID:4,Value:2000},
				{geID:50,GrpID:9,IsDeleted:0,fesibilityID:1,Value:1000},{geID:50,GrpID:9,IsDeleted:0,fesibilityID:2,Value:10000},{geID:50,GrpID:9,IsDeleted:0,fesibilityID:3,Value:10000},{geID:50,GrpID:9,IsDeleted:0,fesibilityID:4,Value:10000},
				
				{geID:53,GrpID:12,IsDeleted:0,fesibilityID:1,Value:1},{geID:53,GrpID:12,IsDeleted:0,fesibilityID:2,Value:1},{geID:53,GrpID:12,IsDeleted:0,fesibilityID:3,Value:1},{geID:53,GrpID:12,IsDeleted:0,fesibilityID:4,Value:1},
				{geID:54,GrpID:12,IsDeleted:0,fesibilityID:1,Value:1},{geID:54,GrpID:12,IsDeleted:0,fesibilityID:2,Value:3},{geID:54,GrpID:12,IsDeleted:0,fesibilityID:3,Value:3},{geID:54,GrpID:12,IsDeleted:0,fesibilityID:4,Value:3},
				{geID:55,GrpID:12,IsDeleted:0,fesibilityID:1,Value:1},{geID:55,GrpID:12,IsDeleted:0,fesibilityID:2,Value:12},{geID:55,GrpID:12,IsDeleted:0,fesibilityID:3,Value:0},{geID:55,GrpID:12,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:56,GrpID:12,IsDeleted:0,fesibilityID:1,Value:0},{geID:56,GrpID:12,IsDeleted:0,fesibilityID:2,Value:3},{geID:56,GrpID:12,IsDeleted:0,fesibilityID:3,Value:3},{geID:56,GrpID:12,IsDeleted:0,fesibilityID:4,Value:0},
				{geID:57,GrpID:12,IsDeleted:0,fesibilityID:1,Value:0},{geID:57,GrpID:12,IsDeleted:0,fesibilityID:2,Value:9},{geID:57,GrpID:12,IsDeleted:0,fesibilityID:3,Value:9},{geID:57,GrpID:12,IsDeleted:0,fesibilityID:4,Value:9},
				{geID:58,GrpID:12,IsDeleted:0,fesibilityID:1,Value:3},{geID:58,GrpID:12,IsDeleted:0,fesibilityID:2,Value:3},{geID:58,GrpID:12,IsDeleted:0,fesibilityID:3,Value:3},{geID:58,GrpID:12,IsDeleted:0,fesibilityID:4,Value:3},
			];
  if(!resultset.isValidRow())
 	{
 		for(var i=0;i<DefaultScenarioValus.length;i++)
 		{
 		DBFeaso.execute('insert into DefaultValusForScenarios(CostGroupsID,CostElementID,FeasibilityID,DefaultValue,IsDeleted) values(?,?,?,?,?)',
 			DefaultScenarioValus[i].GrpID,DefaultScenarioValus[i].geID,DefaultScenarioValus[i].fesibilityID,DefaultScenarioValus[i].Value,DefaultScenarioValus[i].IsDeleted);
 		}
 		//resultset.next();
 	}
 	resultset.close();
 	DBFeaso.execute('COMMIT;');
  DBFeaso.close();
}

/**
 * Function add dwelling for scenario
 * @param {String} dwellingID			Holds Dwelling id
 * @param {String} dwellingName			Holds Dwelling name
 */
function AddDwellingForScenario (dwellingID,dwellingName) {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var rs=DBFeaso.execute('select TotalConstructionCostM2 from DwellingDetailsSummary where DwellingID=?',dwellingID);
	while(rs.isValidRow())
	{
		//here we are storing Construction cost of dwelling to show in build cost field
		DBFeaso.execute("insert into ScenarioDetailsPageTable(CostElementID,Name,DefaultValue,CostGroupingID,IsDeleted,CrossImage,HasUnitSign,HasButton) values(?,?,?,?,?,?,?,?)",
					dwellingID,dwellingName,rs.fieldByName('TotalConstructionCostM2'),16,0,1,'$',0);
		rs.next();
	}
	rs.close();
 	 DBFeaso.close();	
}

/**
 * Function add dwelling for scenario
 * @param {String} dwellingID			Holds Dwelling id
 * @param {String} dwellingName			Holds Dwelling name
 */
function AddVacantlandForScenario () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	/*var rowIDRS=DBFeaso.execute('select max(CostElementID) CostElementID from CostElements');
   var ceId = 0;
	  while(rowIDRS.isValidRow())
		  {
		  	 ceId=rowIDRS.fieldByName('CostElementID');
		  	 rowIDRS.next();
		  }
	rowIDRS.close();
	
	ceId++;*/
	DBFeaso.execute("insert into ScenarioDetailsPageTable(CostElementID,Name,DefaultValue,CostGroupingID,IsDeleted,CrossImage,HasUnitSign,HasButton) values(?,?,?,?,?,?,?,?)",	0,'Vacant Land',0,17,0,0,'',0);
 	DBFeaso.close();	
}


/*Will be called after selecting one of the scenario
 * 
 * in Scenario.js
 */

function ObtainScenarios (feaso,feasibility) {
	
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var QwikGenerated;
	var DetailedGenerated;
	/*ObtainedSceanrioID ID for track of summary going to generate or generated
	 * Name = Name for Track like feasibility1,feasibility 2....
	 * QwikGenarated  1=this feasibility obtained in qwik mode
	 * DetailedGenarated 1=this feasibility obtained in Detailed mode
	 * IsDeleted   1=Is feasibility deletaed(No longer used)
	 * IsCompleted 1=Previous Track has detailed summary saved 0=yet not saved
	 */
	resultset=DBFeaso.execute('select * from ObtainedSceanrio');
	if(feaso == 'q')
		{
			//Scenario Generated in Qwik Mode
			QwikGenerated=1;
			DetailedGenerated=0;
		}
		else
		{//Scenario Generated in Detailed Mode
			QwikGenerated=0;
			DetailedGenerated=1;
		}
		
	if(resultset.isValidRow())
		{
		DBFeaso.execute('delete from ObtainedSceanrio where IsCompleted=0');	
		
		}
	DBFeaso.execute('insert into ObtainedSceanrio(Name,QwikGenarated,DetailedGenarated,FeasibilityID,IsDeleted,IsCompleted) values(?,?,?,?,?,?)','Feasibility 1',QwikGenerated,DetailedGenerated,feasibility,0,0);
	
	resultset.close();
	  DBFeaso.close();	
}

/*This function will Store Values input By User in scenario Details screen
 * 
 */
function InsertFeasoInputValue (ValuesArray) {
	
	var DBFeaso = Ti.Database.open('QwikFeaso');
   DBFeaso.execute('create table if not exists UserInputValue(UserInputValueID INTEGER PRIMARY KEY AUTOINCREMENT,ObtainedScenarioID INT,CostElementID INT,CostGroupID INT,ValueByUser TEXT,IsDeleted INT);');
  
  var rowIDRS=DBFeaso.execute('select * from ObtainedSceanrio where ObtainedSceanrioID=(select max(ObtainedSceanrioID) from ObtainedSceanrio)');
  var ObtainedSceanrioID;
	  while(rowIDRS.isValidRow())
	  {
	  	 ObtainedSceanrioID=rowIDRS.fieldByName('ObtainedSceanrioID');
	  	 rowIDRS.next();
	  }
	 rowIDRS.close();
  
  DBFeaso.execute('delete from UserInputValue');
  
  DBFeaso.execute('BEGIN;');  
  resultset=DBFeaso.execute('select * from UserInputValue');
	 if(!resultset.isValidRow())
	 {
	 	for(var i=0;i<ValuesArray.length;i++)
	 	{
	 	DBFeaso.execute('insert into UserInputValue(ObtainedScenarioID,CostElementID,CostGroupID,ValueByUser,IsDeleted) values(?,?,?,?,?)',
	 	ObtainedSceanrioID,ValuesArray[i].ceID,ValuesArray[i].cgId,ValuesArray[i].value,0);
	 	}
	 }
	resultset.close();
	
	DBFeaso.execute('COMMIT;');
  DBFeaso.close();
}

/**
 * Function insert dwelling details
 * @param {List} DwellingDetailsArray	Holds list of dwelling added by user for Scenario
 */
function InsertDwellingDetails (DwellingDetailsArray) {
    var DBFeaso = Ti.Database.open('QwikFeaso');	
	DBFeaso.execute('create table if not exists UserAddedDwelling(RowID INT,ObtainedScenarioID INT,DwellingID INT,Quantity INT,SalesPriceEach INT,BuildCost INT,Expense INT,Revenue INT);');
  
  var rowIDRS=DBFeaso.execute('select * from ObtainedSceanrio where ObtainedSceanrioID=(select max(ObtainedSceanrioID) from ObtainedSceanrio)');
   var ObtainedSceanrioID;
	  while(rowIDRS.isValidRow())
		  {
		  	 ObtainedSceanrioID=rowIDRS.fieldByName('ObtainedSceanrioID');
		  	 rowIDRS.next();
		  }
		 rowIDRS.close();
  
   DBFeaso.execute('delete from UserAddedDwelling');
   DBFeaso.execute('BEGIN;'); 
  resultset=DBFeaso.execute('select * from UserAddedDwelling');
  
  if(!resultset.isValidRow())
	{
		var AddedDwellingRS=DBFeaso.execute('select * from ScenarioDetailsPageTable where CostGroupingID=16 and CostElementID !=30 and CostElementID !=31');
		var rows = [];
		while(AddedDwellingRS.isValidRow())
		{
			var rowId = AddedDwellingRS.fieldByName('RowID');
			rows.push({
				rowId:AddedDwellingRS.fieldByName('RowID'),
			});
			var DwellinID=AddedDwellingRS.fieldByName('CostElementID');
			DBFeaso.execute('insert into UserAddedDwelling(RowID,ObtainedScenarioID,DwellingID) values(?,?,?)',rowId,ObtainedSceanrioID,DwellinID);
			
			AddedDwellingRS.next();
		}
		AddedDwellingRS.close();
		
		for(var i=0;i<rows.length;i++){
			
			DBFeaso.execute('Update UserAddedDwelling set Quantity=?,SalesPriceEach=?,BuildCost=? where RowID=?',
							DwellingDetailsArray[i].Quantity,DwellingDetailsArray[i].SalesPrice,DwellingDetailsArray[i].BuildCost,rows[i].rowId);
			
		}
		
	}
  DBFeaso.execute('COMMIT;');
  resultset.close();
  DBFeaso.close();
  
}

/**
 * Function insert dwelling details
 * @param {List} DwellingDetailsArray	Holds list of dwelling added by user for Scenario
 */
function InsertVacantLandDetails (VacantLandArray) {
    var DBFeaso = Ti.Database.open('QwikFeaso');	
	DBFeaso.execute('create table if not exists UserAddedVacantLand(RowID INT,ObtainedScenarioID INT,VacantLandID INT,Quantity INT,SalesPriceEach INT,LotSize INT,Expense INT,Revenue INT,Name TEXT);');
  
  var rowIDRS=DBFeaso.execute('select * from ObtainedSceanrio where ObtainedSceanrioID=(select max(ObtainedSceanrioID) from ObtainedSceanrio)');
   var ObtainedSceanrioID;
	  while(rowIDRS.isValidRow())
		  {
		  	 ObtainedSceanrioID=rowIDRS.fieldByName('ObtainedSceanrioID');
		  	 rowIDRS.next();
		  }
		 rowIDRS.close();
  
   DBFeaso.execute('delete from UserAddedVacantLand');
   DBFeaso.execute('BEGIN;'); 
  resultset=DBFeaso.execute('select * from UserAddedVacantLand');
  
  if(!resultset.isValidRow())
	{
		var AddedDwellingRS=DBFeaso.execute('select * from ScenarioDetailsPageTable where CostGroupingID=17');// and CostElementID !=30 and CostElementID !=31');
		var rows = [];
		while(AddedDwellingRS.isValidRow())
		{
			var rowId = AddedDwellingRS.fieldByName('RowID');
			rows.push({
				rowId:AddedDwellingRS.fieldByName('RowID'),
			});
			var DwellinID=AddedDwellingRS.fieldByName('CostElementID');
			DBFeaso.execute('insert into UserAddedVacantLand(RowID,ObtainedScenarioID,VacantLandID,Name,Expense,Revenue) values(?,?,?,?,?,?)',rowId,ObtainedSceanrioID,DwellinID,'Vacant Land',0,0);
			
			AddedDwellingRS.next();
		}
		AddedDwellingRS.close();
		
		for(var i=0;i<rows.length;i++){
			
			DBFeaso.execute('Update UserAddedVacantLand set Quantity=?,SalesPriceEach=?,LotSize=? where RowID=?',	VacantLandArray[i].Quantity,VacantLandArray[i].SalesPrice,VacantLandArray[i].LotSize,rows[i].rowId);
			
		}
		
	}
  DBFeaso.execute('COMMIT;');
  resultset.close();
  DBFeaso.close();
  
}

/**
 * Function combine the values from default values of Cost Element for scenario, values from common to all and values provided by user
 * for particular Cost Element
 */
function ValuesUsingForCalculation (unselectedOptionalConstructionCostE) {
	
	var DBFeaso = Ti.Database.open('QwikFeaso');	
	 DBFeaso.execute('create table if not exists ValuesUsingForCalculation(ValuesUsingForCalculationID INTEGER PRIMARY KEY AUTOINCREMENT,ObtainedScenarioID INT,CostElementID INT,Value TEXT,CostGroupId INT);');
	   DBFeaso.execute('BEGIN;'); 
	  var ObtainScenarioRS=DBFeaso.execute('select * from ObtainedSceanrio where ObtainedSceanrioID=(select max(ObtainedSceanrioID) from ObtainedSceanrio)');
	 var ScenarioID; var ScenarioFesibility;
	  while(ObtainScenarioRS.isValidRow())
	  {
	  	  ScenarioID=ObtainScenarioRS.fieldByName('ObtainedSceanrioID');
	  	 ScenarioFesibility=ObtainScenarioRS.fieldByName('FeasibilityID');
	  	ObtainScenarioRS.next();
	  }
	 ObtainScenarioRS.close(); 
	  
	  DBFeaso.execute('delete from ValuesUsingForCalculation');
	  var AllcostElementCount=0;
	   resultset=DBFeaso.execute('select * from ValuesUsingForCalculation');
	  if(!resultset.isValidRow())
	  {
		  var whereClause='('+unselectedOptionalConstructionCostE.join(',')+')';
		  var AllCeIDRS=DBFeaso.execute('select * from CostElements where CostElementID not in '+whereClause);
			  while(AllCeIDRS.isValidRow())
			  	{
			  		DBFeaso.execute('insert into ValuesUsingForCalculation(ObtainedScenarioID,CostElementID,CostGroupId) values(?,?,?)',ScenarioID,AllCeIDRS.fieldByName('CostElementID'),AllCeIDRS.fieldByName('CostGroupingID'));
			  		 	AllcostElementCount=AllcostElementCount+1;
				  		AllCeIDRS.next();
			  		 
			  		}
			  	AllCeIDRS.close();
	  }
	  resultset.close();

/**
 * Firstly populate cost Elements with common values
 * available for all scenarios
 * 
 */
  var CommonValueCECount=0;
  
 var CommonValueRS=DBFeaso.execute('select * from CostElements where IsCommonToAll=1 and IsItDefaultValue=1');
 
  while(CommonValueRS.isValidRow())
  {
   	DBFeaso.execute("Update ValuesUsingForCalculation set Value=? where CostElementID =?",CommonValueRS.fieldByName('DefaultValue').replace(/\s/g, ""),CommonValueRS.fieldByName('CostElementID'));
  	CommonValueCECount=CommonValueCECount+1;
  	CommonValueRS.next();
  }
  CommonValueRS.close();
  
  /***
   * Now populate cost Elements with Default values
   * available for all scenarios
   */
  var DefaultValuesCECount=0;
  var ScenarioValueRS=DBFeaso.execute('select * from DefaultValusForScenarios where FeasibilityID='+ScenarioFesibility);
  while(ScenarioValueRS.isValidRow())
  {
	DBFeaso.execute("Update ValuesUsingForCalculation set Value= ? where CostElementID = ?",ScenarioValueRS.fieldByName('DefaultValue'),ScenarioValueRS.fieldByName('CostElementID'));
  	DefaultValuesCECount=DefaultValuesCECount+1;
  	ScenarioValueRS.next();
  }
  ScenarioValueRS.close();
  var UserInputValueCECount=0;
  var UserInputValueRS=DBFeaso.execute('select * from UserInputValue');
  while(UserInputValueRS.isValidRow())
  {//now atlast enter user inputed value
  	var CeID=UserInputValueRS.fieldByName('CostElementID');
  	var CgID=UserInputValueRS.fieldByName('CostGroupID');
	DBFeaso.execute("Update ValuesUsingForCalculation set Value= ? where CostElementID = ?",UserInputValueRS.fieldByName('ValueByUser'),CeID);
  	UserInputValueCECount=UserInputValueCECount+1;
  	UserInputValueRS.next();
  }
  UserInputValueRS.close();
  DBFeaso.execute('COMMIT;');
  DBFeaso.close();   
}


/**
 * Function stores recently generated summary
 */
function CreateResultDB (unselectedOptionalConstructionCostE) {
var DBFeaso = Ti.Database.open('QwikFeaso');		
  DBFeaso.execute('create table if not exists TempResultSummary(ResultSummaryID INTEGER PRIMARY KEY AUTOINCREMENT,ObtainedScenarioID INT,CostGroupID INT,CostElementID INT,Value TEXT);');
   DBFeaso.execute('BEGIN;'); 
 DBFeaso.execute('delete  from TempResultSummary');
  
  var ObtainScenarioRS=DBFeaso.execute('select * from ObtainedSceanrio where ObtainedSceanrioID=(select max(ObtainedSceanrioID) from ObtainedSceanrio)');
  var ScenarioID;
  while(ObtainScenarioRS.isValidRow())
  {
  	 ScenarioID=ObtainScenarioRS.fieldByName('ObtainedSceanrioID');
  	ObtainScenarioRS.next();
  }
  ObtainScenarioRS.close();
  var countCE=0;
  var whereClause='('+unselectedOptionalConstructionCostE.join(',')+')';
  	var GetResultSet=DBFeaso.execute('select * from CostElements where HasResult=1 and CostElementID not in '+whereClause);
	while(GetResultSet.isValidRow())
	{
		DBFeaso.execute('insert into TempResultSummary(ObtainedScenarioID,CostGroupID,CostElementID) values(?,?,?)',ScenarioID,GetResultSet.fieldByName('CostGroupingID'),GetResultSet.fieldByName('CostElementID'));
		countCE=countCE+1;
		GetResultSet.next();
	}
  	GetResultSet.close();
  	
  DBFeaso.execute('COMMIT;');
  DBFeaso.close();  
  
}
/**
 * Function stores values for different options for payments
 */
function CreatePaymentPerYearTable () {
	var DBFeaso = Ti.Database.open('QwikFeaso');	
	DBFeaso.execute('create table if not exists PaymentPerYear(PaymentPerYearID INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT,Value INT);');
	var PayPerYear=[
					{Name:'Year',Value:1},
					{Name:'Month',Value:12},
					{Name:'Fortnight',Value:26},
					{Name:'Week',Value:52},
					];
	 DBFeaso.execute('BEGIN;'); 
	resultset=DBFeaso.execute('select * from PaymentPerYear');
	if(!resultset.isValidRow())
	{	for(var i=0;i<PayPerYear.length;i++)
		{
			DBFeaso.execute('insert into PaymentPerYear(Name,Value) values(?,?)',PayPerYear[i].Name,PayPerYear[i].Value);
		}
	}
	resultset.close();
	DBFeaso.execute('COMMIT;');
  DBFeaso.close();
}

/*function createNewCETable () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
  DBFeaso.execute('create table if not exists NewCostElements(CostElementID INT primary Key,Name TEXT,CostGroupingID INT);');
DBFeaso.close();
}*/


/**
 * Function saves the data for summary elements which are static
 */
function SummaryStaticData () {
	var DBFeaso = Ti.Database.open('QwikFeaso');	
	DBFeaso.execute('create table if not exists SummaryStaticData(SummaryStaticDataID INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT,Expense TEXT,Revenue TEXT,ProfitLoss TEXT);');
	
	var StaticData=[
					{Name:'ProfitLoss',},
					{Name:'DealNoDeal'},
					{Name:'Raw Cost'},
					{Name:'Funding Cost'},
					{Name:'Total Income'},
					];
	 DBFeaso.execute('BEGIN;'); 
	resultset=DBFeaso.execute('select * from SummaryStaticData');
	if(!resultset.isValidRow())
	{
		for(var i=0;i<StaticData.length;i++)
		{
			DBFeaso.execute('insert into SummaryStaticData(Name) values(?)',StaticData[i].Name);
		}
	}
  resultset.close();
  DBFeaso.execute('COMMIT;');
  DBFeaso.close();
}


/**
 * Function stores values related to funding cost
 */
function SetFundingCostresult() {
	//caleed after clicking summary in ScenarioDetails.js
	
	var DBFeaso = Ti.Database.open('QwikFeaso');	
	DBFeaso.execute('create table if not exists FundingCostresult(FundingCostresultID INTEGER PRIMARY KEY AUTOINCREMENT,CostElementID INT,Name TEXT,Expense TEXT,Revenue TEXT,ProfitLoss TEXT);');

	  var ObtainScenarioRS=DBFeaso.execute('select * from ObtainedSceanrio where ObtainedSceanrioID=(select max(ObtainedSceanrioID) from ObtainedSceanrio)');
	  var ScenarioID;
	  while(ObtainScenarioRS.isValidRow())
	  {
	  	 ScenarioID=ObtainScenarioRS.fieldByName('ObtainedSceanrioID');
	  	ObtainScenarioRS.next();
	  }
	  ObtainScenarioRS.close();
	DBFeaso.execute('Delete  from FundingCostresult');
	var StaticData=[
					{ID:1,Name:'Deposit',},
					{ID:2,Name:'Purchase & On Costs'},
					{ID:3,Name:'Development Phase'},
					{ID:4,Name:'Pre Construction Phase'},
					{ID:5,Name:'Construction Phase'},
					];
	 DBFeaso.execute('BEGIN;'); 
	resultset=DBFeaso.execute('select * from FundingCostresult');
	if(!resultset.isValidRow())
	{
		for(var i=0;i<StaticData.length;i++)
		{
			DBFeaso.execute('insert into FundingCostresult(CostElementID,Name) values(?,?)',StaticData[i].ID,StaticData[i].Name);
		
			DBFeaso.execute('insert into TempResultSummary(ObtainedScenarioID,CostGroupID,CostElementID) values(?,?,?)',ScenarioID,13,StaticData[i].ID);
			
		}
	}
  resultset.close();
  DBFeaso.execute('COMMIT;');
  DBFeaso.close();
	
  }
/**
 * Function updated dwelling details summary
 */
function UpdateDwellingDetailsSummary () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	
	var res = DBFeaso.execute('select * from UserAddedDwelling');
	if(res.isValidRow())
	{
		resultset=DBFeaso.execute('select * from DwellingDetailsSummary');	
		while(resultset.isValidRow())
	 			{
	 				var buildCostRS=DBFeaso.execute('select BuildQuality,BuildDifficulty from DwellingDetailsSummary where DwellingID=?',resultset.fieldByName('DwellingID'));
	 				
				 		DBFeaso.execute('update DwellingDetailsSummary set TotalLivingAreaM2=?,TotalLivingAreaFt2=?,TotalConstructionAreaM2=?,TotalConstructionAreaFt2=?,TotalConstructionCostM2=?,TotalConstructionCostFt2=?,Summary=?,BuildQuality=?,BuildDifficulty=?,IsDeleted=? where DwellingID=?',
				 		resultset.fieldByName('TotalLivingAreaM2'),resultset.fieldByName('TotalLivingAreaFt2'),resultset.fieldByName('TotalConstructionAreaM2'),
				 		resultset.fieldByName('TotalConstructionAreaFt2'),resultset.fieldByName('TotalConstructionCostM2'),
				 		resultset.fieldByName('TotalConstructionCostFt2'),resultset.fieldByName('Summary'),buildCostRS.fieldByName('BuildQuality'),buildCostRS.fieldByName('BuildDifficulty'),resultset.fieldByName('IsDeleted'),resultset.fieldByName('DwellingID'));
	 				resultset.next();
	 			}
	 				buildCostRS.close();
	 	resultset.close();		
	}
	res.close();
   DBFeaso.close();
}

/**
 * Function clears temp dwelling detail summary generated by Build Quality and Build Difficulty
 */
function ClearTempDwelling () {
  var DBFeaso = Ti.Database.open('QwikFeaso');
  DBFeaso.execute('Delete from TempDwellingDetailsSummary');	
 DBFeaso.close();

}
/**
 * Function Add New CostElement
 * @param {Integer} name	Holds name of Cost Element
 * @param {Integer} q		Holds identifier for qwik feaso
 * @param {Integer} d	Holds identifier for detail feaso
 * @param {Integer} cgId	Holds Cost Group Id
 */
function addNewCostElement (name,q,d,cgId) {
  var resSet;
  var noOfCostElem;
  var DBFeaso = Ti.Database.open('QwikFeaso');
  resSet = DBFeaso.execute("select max(CostElementID) CostElementID from CostElements");
  while(resSet.isValidRow())
	{
		noOfCostElem = resSet.fieldByName('CostElementID');
		resSet.next();	
	}
	resSet.close();
   DBFeaso.execute('insert into CostElements(CostElementID,Name,AllowInQwikFeaso,AllowInDetailedFeaso,IsCommonToAll,CostGroupingID,IsDeleted,CrossImage,HasUnitSign,HasButton,IsItDefaultValue,HasResult) values(?,?,?,?,?,?,?,?,?,?,?,?)',noOfCostElem+1,name,q,d,0,cgId,0,0,'$',0,1,1);
   DBFeaso.close();
}


/**
 * Function inserts a new cost element with its default values for each scenario 
 * @param {Integer} cgId		Holds Cost Group Id
 * @param {Integer} sceneId		Holds scenario id
 * @param {Integer} defVal		Holds default value of cost element for each scenario
 */
function insertIntoDefValForScenarios (cgId,sceneId,defVal) {
  var resSet;
  var noOfCostElem;
  var DBFeaso = Ti.Database.open('QwikFeaso');
  resSet = DBFeaso.execute("select max(CostElementID) CostElementID from CostElements");
  while(resSet.isValidRow())
	{
		noOfCostElem = resSet.fieldByName('CostElementID');
		resSet.next();	
	}
	resSet.close();
	DBFeaso.execute('insert into DefaultValusForScenarios(CostGroupsID,CostElementID,FeasibilityID,DefaultValue,IsDeleted) values(?,?,?,?,?)',cgId,noOfCostElem,sceneId,defVal,0);
	DBFeaso.close();
	
}

/**
 * Function adds a new dwelling 
 * @param {String} dwelName		Holds name of the dwelling
 */
function addNewDwelling (dwelName,constructionCostValues) {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	  var rowIDRS=DBFeaso.execute('select max(DwellingID) DwellingID from Dwellings');
	  var maxDwellingID;
	  while(rowIDRS.isValidRow())
	  {
	  	 maxDwellingID=rowIDRS.fieldByName('DwellingID');
	  	rowIDRS.next();
	  }
	  rowIDRS.close();
  
  	DBFeaso.execute("insert into Dwellings(DwellingID,Name,BuildDifficulty,BuildQuality,BathroomFitout,KitchenFitout,LandsapingFitout,IsDeleted) values(?,?,?,?,?,?,?,?)",
  	maxDwellingID+1,dwelName,constructionCostValues[0],constructionCostValues[1],constructionCostValues[2],constructionCostValues[3],constructionCostValues[4],0);
  	
   DBFeaso.close();
   
}

/**
 * Function inserts details of newly created dwelling 
 * @param {String} dwelName			Holds name of the dwelling
 * @param {Integer} roomCatId		Holds Room Category id
 * @param {Integer} roomSubCat		Holds Room Sub Category id
 * @param {Integer} qty				Holds value of quantity for each Room Sub Category
 */
function addDwellingDetails (dwelName,roomCatId,roomSubCat,qty) {
  var DBFeaso = Ti.Database.open('QwikFeaso');
  var rowIDRS=DBFeaso.execute('select max(DwellingID) DwellingID from Dwellings');
  var maxDwellingID;
  while(rowIDRS.isValidRow())
  {
  	 maxDwellingID=rowIDRS.fieldByName('DwellingID');
  	rowIDRS.next();
  }
  rowIDRS.close();
  DBFeaso.execute('insert into DwellingDetails(DwellingID,RoomCategoryID,RoomSubCategotyID,DwellingQuantity,IsDeleted) values(?,?,?,?,?)',
											maxDwellingID,roomCatId,roomSubCat,qty,0);
 DBFeaso.close();
}

/**
 * Function deletes a dwelling 
 * @param {Integer} dwelId		Holds dwelling id to be deleted
 */
function deleteDwelling(dwelId)
{
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute("delete from Dwellings where DwellingID = "+dwelId);
	DBFeaso.execute("delete from DwellingDetails where DwellingID = "+dwelId);
	DBFeaso.close();
}

/**
 * Function creates a temporary table for storing the images selected by the user for property 
 */
function createTempPropPhotosLst () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute('create table if not exists TempPropertyPhotos(PropertyPhotoID INTEGER PRIMARY KEY AUTOINCREMENT,Photo TEXT);');
	DBFeaso.close();
  
}

/**
 * Function drops the  temporary table created for storing the images selected by the user for property 
 */
function dropTempPropPhotosLst () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute('Drop table if exists TempPropertyPhotos');
	DBFeaso.close();
  
}

/**
 * Function insert a new property with its Name, Address and Default Photo
 * @param {String} name		Holds name of the property
 * @param {String} addr		Holds address of the property
 * @param {String} photo	Holds path of the default image for the property
 */
function insertNewProperty (name,addr,photo) {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var noOfProps;
  	DBFeaso.execute('insert into Properties(Name,Address,IsDeleted) values(?,?,?)',name,addr,0);
  	GetResultSet=DBFeaso.execute('select max(PropertyID) PropertyID from Properties');
  
  while(GetResultSet.isValidRow())
  {
  	noOfProps = GetResultSet.fieldByName('PropertyID')
  	GetResultSet.next();
  }
  GetResultSet.close();
  if(photo == '')
  {
  	photo = Ti.Platform.osname == 'android'?'/images/def.png':'images/default_property1.png';
  	DBFeaso.execute('insert into PropertyPhotos(Photo,IsDefault,PropertyID,IsDeleted) values(?,?,?,?)',
						photo,1,noOfProps,0);
  }
  else
  {
  	DBFeaso.execute('insert into PropertyPhotos(Photo,IsDefault,PropertyID,IsDeleted) values(?,?,?,?)',
						photo,1,noOfProps,0);
  }
  DBFeaso.execute('Drop table if exists TempPropertyPhotos');
  DBFeaso.close();
  
}

/**
 * Function updates a property with its new Name, Address 
 * @param {Integer} PropertyId	Holds property id to be deleted
 * @param {String} name			Holds name of the property
 * @param {String} addr			Holds address of the property
 */
function updatePropertyDetails(PropertyId,name,addr){
  var DBFeaso = Ti.Database.open('QwikFeaso');
	 DBFeaso.execute("UPDATE Properties SET Name = '"+name+"' , Address = '"+addr+"' WHERE PropertyID = "+PropertyId);
	 DBFeaso.close();
}

/**
 * Function updates a property with its new  Default Photo
 * @param {Integer} PropertyId	Holds property id to be deleted
 * @param {Integer} propPhotoID	Holds property photo id to be replaced with previous default image
 */
function updatePropertyPhoto(PropertyId,propPhotoID){
  var DBFeaso = Ti.Database.open('QwikFeaso');
  DBFeaso.execute("UPDATE PropertyPhotos SET IsDefault = 0 Where PropertyID = "+PropertyId);
  DBFeaso.execute("update PropertyPhotos set IsDefault = 1 where PropertyPhotoID = "+propPhotoID+" and PropertyID = "+PropertyId);
  DBFeaso.close();
}


/**
 * Function deletes photo from the list of photos set for properties
 * @param {Integer} PropertyId	Holds property id to be deleted
 * @param {Integer} propPhotoID	Holds property photo id to be deleted
 */
function deletePropertyPhoto (PropertyId,propPhotoID) {
   var DBFeaso = Ti.Database.open('QwikFeaso');
   var res = DBFeaso.execute("select * from PropertyPhotos where PropertyID = "+PropertyId+" and PropertyPhotoID = "+propPhotoID);
   var isDef;
   var count = 0;
   if(res.isValidRow() == true)
   {
   	while(res.isValidRow())
   	{
   		isDef = res.fieldByName('IsDefault');
   	 	res.next();
   	}
   	 
   }
   res.close();
   DBFeaso.close();
   if(isDef == 1)
   {
   	var DBFeaso = Ti.Database.open('QwikFeaso');
   	DBFeaso.execute('BEGIN;');
   	DBFeaso.execute("delete from PropertyPhotos where PropertyPhotoID = "+propPhotoID);
   	DBFeaso.execute('COMMIT;');
   	DBFeaso.close();
   	
   	var DBFeaso = Ti.Database.open('QwikFeaso');
   	var cntRes = DBFeaso.execute("select count(*) c from PropertyPhotos where PropertyID = "+PropertyId);
   	if(cntRes.isValidRow() == true)
   	{
	   	while(cntRes.isValidRow())
	   	{
	   		count = cntRes.fieldByName('c');
	   	 	cntRes.next();
	   	}
   	}
   	cntRes.close();
   	if(count != 0)
   	{
   		var minRes = DBFeaso.execute("select min(PropertyPhotoID) PropertyPhotoID from PropertyPhotos where PropertyID = "+PropertyId);
   		var min = 0;
   		if(minRes.isValidRow() == true)
   		{
		   	while(minRes.isValidRow())
		   	{
		   		min = minRes.fieldByName('PropertyPhotoID');
		   		minRes.next();
		   	}
	    }
   		minRes.close();
   		DBFeaso.execute("update PropertyPhotos set IsDefault = 1 where PropertyPhotoID = "+min+" and PropertyID = "+PropertyId);
   	}
   	else
   	{
   		var img = Ti.Platform.osname == 'android'?'/images/def.png':'images/def.png';
	  	DBFeaso.execute('insert into PropertyPhotos(Photo,IsDefault,PropertyID,IsDeleted) values(?,?,?,?)',img,1,PropertyId,0);
   	}
   	DBFeaso.close();	
   }
   else
   {
	   	var DBFeaso = Ti.Database.open('QwikFeaso');
	   	DBFeaso.execute('BEGIN;');
   		DBFeaso.execute("delete from PropertyPhotos where PropertyPhotoID = "+propPhotoID);
   		DBFeaso.execute('COMMIT;');
   		DBFeaso.close();
   }
}

function deleteProperty(propId){
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute('BEGIN;');
   	DBFeaso.execute("delete from Properties where PropertyID = "+propId);
   	DBFeaso.execute("delete from PropertyPhotos where PropertyID = "+propId);
   	DBFeaso.execute('COMMIT;');
   	DBFeaso.close();
}

/**
 * Function deletes photo from the list of temporary photos while adding a new property
 * @param {Integer} propPhotoID	Holds property photo id to be deleted
 */
function deleteTempPropPhoto (propPhotoId) {
		var DBFeaso = Ti.Database.open('QwikFeaso');
		DBFeaso.execute('BEGIN;');
   		DBFeaso.execute("delete from TempPropertyPhotos where PropertyPhotoID = "+propPhotoId);
   		DBFeaso.execute('COMMIT;');
   		DBFeaso.close();
}

/**
 * Function inserts the photo currently selected by the user into the Default property photos
 * table and then trauncates the temporary table so that user can go on adding new photos
 * @param {Integer} PropertyId	Holds property id for which photos are to be added in its list of default photos
 */
function insertTempPropPhotosIntoDef (PropertyId) {
	var PropertyList=[];
  	var DBFeaso = Ti.Database.open('QwikFeaso');
  	GetResultSet=DBFeaso.execute('select * from TempPropertyPhotos');
	while(GetResultSet.isValidRow())
  	{
  		PropertyList.push({
  			PropertyID:''+GetResultSet.fieldByName('PropertyPhotoID'),
  			imgName:''+GetResultSet.fieldByName('Photo')
  		});
  		GetResultSet.next();
  	}
  	GetResultSet.close();
  	DBFeaso.execute('delete from TempPropertyPhotos');
  	DBFeaso.close();
  	
  	var DBFeaso = Ti.Database.open('QwikFeaso');	
  	var path;
  	path =  (Ti.Platform.osname == 'android' ? Ti.Filesystem.externalStorageDirectory : Ti.Filesystem.applicationDataDirectory );
  	for(var i=0;i<PropertyList.length;i++)
  	{
  		DBFeaso.execute('insert into PropertyPhotos(Photo,IsDefault,PropertyID,IsDeleted) values(?,?,?,?)',
						path + Ti.Filesystem.separator + PropertyList[i].imgName,0,PropertyId,0); 	
  	}
	
	DBFeaso.close();
}

function insertPropPhotosIntoDef (PropertyId,filename) {
  	
  	var DBFeaso = Ti.Database.open('QwikFeaso');	
  	var path;
  	path =  (Ti.Platform.osname == 'android' ? Ti.Filesystem.externalStorageDirectory : Ti.Filesystem.applicationDataDirectory );
  	DBFeaso.execute('insert into PropertyPhotos(Photo,IsDefault,PropertyID,IsDeleted) values(?,?,?,?)',
						path + Ti.Filesystem.separator + filename,0,PropertyId,0);
	DBFeaso.close();
}


/**
 * Function will create table for linking summary to property before writing any logic
 * for linking
 */
function ScenarioToPropertyTable () {
  var DBFeaso = Ti.Database.open('QwikFeaso');
   DBFeaso.execute('create table if not exists ScenarioToProperty(PropertyScenarioID INTEGER PRIMARY KEY AUTOINCREMENT ,PropertyID INT  ,ScenarioID INT, foreign key(PropertyID) references Properties(PropertyID),foreign key(ScenarioID) references ObtainedSceanrio(ObtainedSceanrioID));');
DBFeaso.close();
}


/**
 * Function is used to link summary/feasibility to a particular property
 * @param {Integer} propertyID	Holds property id to which feasibility has to be assigned
 * @param {Integer} propertyID	Holds property id to which feasibility has to be assigned
 * @return	Returns a flag that identifies whether currently selected Feasibility has already been 
 * assigned to the specified property
 */
function AddScenarioToProperty (propertyID,feasId) {
	
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var ScenID=[];
	var AlreadyPresent=false;
  	var resultset=DBFeaso.execute('select * from ScenarioToProperty where PropertyID = '+propertyID+' and ScenarioID = '+feasId);	
  	
  	/**
  	 * Logic to check whether current Summary/feasibility has already been assigned to the property
  	 */
  	if (!resultset.isValidRow()) 
  	{
  		DBFeaso.execute('insert into ScenarioToProperty(PropertyID,ScenarioID) values(?,?)',propertyID,feasId);
  		/*
  		 * Flag
  		 */
  		AlreadyPresent=false;
  		resultset.close();
	  	DBFeaso.close();
		return AlreadyPresent;
  	}
  	else
  	{
  		/*
  		 * Flag
  		 */
  		AlreadyPresent=true;
  		resultset.close();
	  	DBFeaso.close();
		return AlreadyPresent;
	}
	  	
}


/**
 * Function save summary details (summary id,Summary name,Generated through qwikfeaso or Detailed feaso etc)
 */
function CreateObtainedScenarioTable () {
var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute('create table if not exists ObtainedSceanrio(ObtainedSceanrioID INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT,QwikGenarated INT,DetailedGenarated INT,FeasibilityID INT,IsDeleted INT,IsCompleted INT);');
	DBFeaso.close();	
}

/**
 * Function will add just saved summary to latest created property(Property Created from Summary popup)
 * 
 * return ISPresent status abt feasibility for particular property
 * 
 */
function AddFeasibilityToLastProperty () {
	
  var DBFeaso = Ti.Database.open('QwikFeaso');
  var FeasibilityID=null;
  var propId=null;
  
		resultset=DBFeaso.execute('SELECT max(ObtainedSceanrioID) ObtainedSceanrioID FROM ObtainedSceanrio');
		while(resultset.isValidRow())
		{
		 FeasibilityID =resultset.fieldByName('ObtainedSceanrioID');
		resultset.next();
		}
		resultset.close();
		
		
			resultset=DBFeaso.execute('SELECT max(PropertyID) PropertyID FROM Properties');
			while(resultset.isValidRow())
			{
				propId = resultset.fieldByName('PropertyID');
				resultset.next();
			}
			 resultset.close(); 
		
		var ISPresent = false;
		  ISPresent=AddScenarioToProperty(propId,FeasibilityID);		
			
		DBFeaso.close();
		return ISPresent;
}

function deleteScenarioToProperty(feasId,propId)
{
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute("DELETE FROM ScenarioToProperty WHERE PropertyID = "+propId+" AND ScenarioID = "+feasId);
	DBFeaso.execute("DELETE FROM FinalSummary WHERE ObtainedSceanrioID = "+feasId);
	DBFeaso.execute("DELETE FROM ObtainedSceanrio WHERE ObtainedSceanrioID = "+feasId);
	DBFeaso.close();
}

/*
 * Creates a table of final summary of newly generated feasibility
 * @param compactSummary {List}	Stores the final result data for the current feasibility
 * @param pl {String}			Stores the profit/loss percent for the current feasibility
 * @param dnd {String}			Stores the Deal/NoDeal for the current feasibility
 */

function storeCompactSummary (compactSummary,pl,dnd) {
	
  var DBFeaso = Ti.Database.open('QwikFeaso');
  DBFeaso.execute("CREATE TABLE IF NOT EXISTS FinalSummary(ObtainedSceanrioID INTEGER,Name TEXT,PL TEXT, DND TEXT, Expense REAL, Revenue REAL, ProfitLoss REAL, CEID INTEGER, CGID INTEGER)");
  var tempResultSet = DBFeaso.execute("select max(ObtainedScenarioID) ObtainedScenarioID from TempResultSummary");
  var cntScenarioId = '';
  	while(tempResultSet.isValidRow())
  	{
  		cntScenarioId = tempResultSet.fieldByName('ObtainedScenarioID');
  		tempResultSet.next();
  	}
  tempResultSet.close();
  var resultset = DBFeaso.execute("SELECT * FROM FinalSummary WHERE ObtainedSceanrioID = "+cntScenarioId);
  if(!resultset.isValidRow())
  { 	
  	DBFeaso.execute("INSERT INTO FinalSummary(ObtainedSceanrioID,PL,DND) VALUES(?,?,?)",cntScenarioId,pl,dnd);
  	for(var i=0;i<compactSummary.length;i++)
  	{
  		DBFeaso.execute("INSERT INTO FinalSummary(ObtainedSceanrioID,Name,Expense,Revenue,ProfitLoss,CEID,CGID) VALUES(?,?,?,?,?,?,?)",cntScenarioId,compactSummary[i].Name,compactSummary[i].Expense,compactSummary[i].Revenue,compactSummary[i].ProfitLoss,compactSummary[i].CEID,compactSummary[i].CGID);
  	}
  }
  resultset.close();
  DBFeaso.close();
}



