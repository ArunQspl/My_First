/**
 * @projectDescription QwikFeaso
 * 
 * @author List- vivek Gidmare(vivek.gidmare@quagnitia.com),Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */
Ti.include('/services/DataBaseTransaction.js')	
var GetResultSet;

/**
 * Function give details about room sub category
 * @return  array holding details about  room sub category
 */
function GetRoomDimensionDetails(){
	var DBFeaso = Ti.Database.open('QwikFeaso');
	GetResultSet=DBFeaso.execute('select * from RoomSubsCategory');
	RoomDimensionDetails=[];
	while(GetResultSet.isValidRow())
	{
		RoomDimensionDetails.push({
			roomSubcatId:GetResultSet.fieldByName('RoomSubCategotyID'),
			Name:''+GetResultSet.fieldByName('Name'),
			Width:GetResultSet.fieldByName('Width'),
			Depth:GetResultSet.fieldByName('Depth'),
			Unit:''+GetResultSet.fieldByName('Unit'),
			AreaM2:GetResultSet.fieldByName('AreaM2'),
			AreaF2:GetResultSet.fieldByName('AreaF2'),
			roomCatId:GetResultSet.fieldByName('RoomCategoryID'),
			isDeleted:GetResultSet.fieldByName('IsDeleted'),
			});
		
		GetResultSet.next();	
	}
	GetResultSet.close();
	DBFeaso.close();
  return RoomDimensionDetails;
}

function GetRoomDimensions(id){
	var DBFeaso = Ti.Database.open('QwikFeaso');
	GetResultSet=DBFeaso.execute('select * from RoomSubsCategory where RoomCategoryID = '+id);
	RoomDimensionDetails=[];
	while(GetResultSet.isValidRow())
	{
		var rowWidthTextField = Ti.UI.createLabel({
		             left: '48%',
		             width: '15%', 
		             value:'',
		             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
					text:GetResultSet.fieldByName('Name'),
		             height: '55%', 
					 backgroundColor:'#fff',
		             borderColor:glblLightGrayFont,
		             borderRadius:5,
		             borderWidth:1,
		             font:Ti.Platform.osname =='android' 
										 ?{fontSize:'20%'}
										 :{fontSize:'12%'},
					 paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
		             textAlign:Ti.Platform.osname == 'android'?'right':'right',
		          	 
		             });
		    var view = Ti.UI.createView({
		            	width: '100%',
		            	height: '10%'
		            });
		     view.add(rowWidthTextField);       
		RoomDimensionDetails.push({
			roomSubcatId:GetResultSet.fieldByName('RoomSubCategotyID'),
			Name:''+GetResultSet.fieldByName('Name'),
			Width:GetResultSet.fieldByName('Width'),
			Depth:GetResultSet.fieldByName('Depth'),
			Unit:''+GetResultSet.fieldByName('Unit'),
			AreaM2:GetResultSet.fieldByName('AreaM2'),
			AreaF2:GetResultSet.fieldByName('AreaF2'),
			roomCatId:GetResultSet.fieldByName('RoomCategoryID'),
			isDeleted:GetResultSet.fieldByName('IsDeleted'),
			});
		
		GetResultSet.next();	
	}
	GetResultSet.close();
	DBFeaso.close();
  return RoomDimensionDetails;
}

/**
 * @return array holding  details about build Quality 
 */
function GetBuildQualityDetails () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
  GetResultSet=DBFeaso.execute('select * from BuildQuality');
	BuildQualityDetails=[];
	while(GetResultSet.isValidRow())
	{
		BuildQualityDetails.push({
			buildId:GetResultSet.fieldByName('BuildQualityID'),
			Name:GetResultSet.fieldByName('Name'),
			Basic:GetResultSet.fieldByName('Basic'),
			Standard:GetResultSet.fieldByName('Standard'),
			High:GetResultSet.fieldByName('High'),
			isDeleted:GetResultSet.fieldByName('IsDeleted'),
			});
		
		GetResultSet.next();	
	}
	GetResultSet.close();
	DBFeaso.close();
  return BuildQualityDetails;
}

/**
 * @return array holding  details about build Difficulty 
 */
function GetBuildDifficultyDetails(){
	var DBFeaso = Ti.Database.open('QwikFeaso');
	GetResultSet=DBFeaso.execute('select * from BuildDifficulty');
	BuildDifficultyDetails=[];
	while(GetResultSet.isValidRow())
	{
		BuildDifficultyDetails.push({
			buildId:GetResultSet.fieldByName('BuildDifficultyID'),
			Name:GetResultSet.fieldByName('Name'),
			DefaultValue:GetResultSet.fieldByName('DefaultValue'),
			isDeleted:GetResultSet.fieldByName('IsDeleted'),
			});
		
		GetResultSet.next();	
	}
	GetResultSet.close();
	DBFeaso.close();
  return BuildDifficultyDetails;
}


function GetFitoutCosts () {
var DBFeaso = Ti.Database.open('QwikFeaso');
	GetResultSet=DBFeaso.execute('select * from FitoutCosts');
	FitoutCostsDetails=[];
	while(GetResultSet.isValidRow())
	{
		FitoutCostsDetails.push({
			FcId:GetResultSet.fieldByName('FitoutCostsID'),
			Name:GetResultSet.fieldByName('Name'),
			None:GetResultSet.fieldByName('None'),
			Basic:GetResultSet.fieldByName('Basic'),
			Standard:GetResultSet.fieldByName('Standard'),
			High:GetResultSet.fieldByName('High'),
			Premium:GetResultSet.fieldByName('Premium'),
			});
		
		GetResultSet.next();	
	}
	GetResultSet.close();
	DBFeaso.close();
  return FitoutCostsDetails;
  
};

function getFitoutcostforRooms (fitoutCostID,option) {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var FitoutCosts;
	GetResultSet=DBFeaso.execute('select '+option+' from FitoutCosts where FitoutCostsID=?',fitoutCostID);
	while(GetResultSet.isValidRow())
	{
		FitoutCosts=GetResultSet.fieldByName(''+option);
		GetResultSet.next();	
	}
	GetResultSet.close();
	DBFeaso.close();
  return FitoutCosts;
  
}

/**
 * @return array holding Cost Elements with their default values for each scenario 
 */
function GetDefaultsForCostElementList(){
	var CostElementList=[];
	var DBFeaso = Ti.Database.open('QwikFeaso');
	GetResultSet=DBFeaso.execute("select CE.* from costelements CE where costelementid in (select costelementid from DefaultValusForScenarios)");
	while(GetResultSet.isValidRow())
	{
		CostElementList.push({CostElementID:GetResultSet.fieldByName('CostElementID'),Name:''+GetResultSet.fieldByName('Name'),DefaultValue:''+GetResultSet.fieldByName('DefaultValue'),AllowInQwikFeaso:GetResultSet.fieldByName('AllowInQwikFeaso'),
		AllowInDetailedFeaso:GetResultSet.fieldByName('AllowInDetailedFeaso'),IsCommonToAll:GetResultSet.fieldByName('IsCommonToAll'),CostGroupingID:GetResultSet.fieldByName('CostGroupingID'),IsDeleted:GetResultSet.fieldByName('IsDeleted'),
		CrossImage:GetResultSet.fieldByName('CrossImage'),HasUnitSign:GetResultSet.fieldByName('HasUnitSign'),HasButton:GetResultSet.fieldByName('HasButton')});
		GetResultSet.next();
	}
	
	 GetResultSet.close();
	 DBFeaso.close();
  return CostElementList;
}
/**
 * @return array holding Cost Groups with their name and the flag indicating whether to show 
 * it in Qwik Feaso or Detail Feaso 
 */
function GetDefaultsForCostGroupList(){
	var CostGroupList=[];
	var DBFeaso = Ti.Database.open('QwikFeaso');
	GetResultSet=DBFeaso.execute("select CE.* from CostGroupings CE where CostGroupingID in (select CostGroupsID from DefaultValusForScenarios)");
	while(GetResultSet.isValidRow())
	{
		CostGroupList.push({CostGroupingID:GetResultSet.fieldByName('CostGroupingID'),Name:''+GetResultSet.fieldByName('Name'),AllowInQwikFeaso:GetResultSet.fieldByName('AllowInQwikFeaso'),AllowInDetailedFeaso:GetResultSet.fieldByName('AllowInDetailedFeaso'),ShowToUser:GetResultSet.fieldByName('ShowToUser')});
		GetResultSet.next();
	}
	 GetResultSet.close();
	 DBFeaso.close();
  return CostGroupList;
}

/**
 * @return  Room Dimension setting element list
 * 
 */
function GetRoomDimensionSettings () {
  var roomDimensionSettingsList = [];
  var DBFeaso = Ti.Database.open('QwikFeaso');
  GetResultSet=DBFeaso.execute("SELECT * FROM RoomDimensionSettings");
  while(GetResultSet.isValidRow())
	{
		roomDimensionSettingsList.push({
			roomDimenSettings:GetResultSet.fieldByName('RoomDimensionSettingID'),
			Name:GetResultSet.fieldByName('Name'),
			Value:GetResultSet.fieldByName('Value'),
			isDeleted:GetResultSet.fieldByName('IsDeleted'),
		});
		GetResultSet.next();
	}
	GetResultSet.close();
	DBFeaso.close();
  return roomDimensionSettingsList;
}


/**
 * @return Scenario List
 */
function GetFeasibilityList () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	GetResultSet=DBFeaso.execute('select * from Feasibility');
	FeasiBilityList=[];
	while(GetResultSet.isValidRow())
	{
		FeasiBilityList.push({
			MenuID:GetResultSet.fieldByName('FeasibilityID'),
			Name:''+GetResultSet.fieldByName('FeasibilityName'),
			IsDeleted:GetResultSet.fieldByName('IsDeleted')});
		
		GetResultSet.next();	
	}
	GetResultSet.close();
	 DBFeaso.close();
	
  return FeasiBilityList;
}
//===============================================

/**
 * Function will return Cost Grouping list according to feasibility
 * 
 */
function getCostGroupsList (feaso) {
	/*
	 * 10 = QwikFewaso Cost Groups  
	 * 01 = DetailedFeso Cost Groups
	 * 
	 */
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var CostGroupList=[];
	if(feaso == 10)
	{
		GetResultSet=DBFeaso.execute('select * from CostGroupings where AllowInQwikFeaso=1');
	}
	else
	if(feaso == 01)
	{
		GetResultSet=DBFeaso.execute('select * from CostGroupings where AllowInDetailedFeaso=1');
	}
	
	while(GetResultSet.isValidRow())
	{
		CostGroupList.push({CostGroupingID:GetResultSet.fieldByName('CostGroupingID'),Name:''+GetResultSet.fieldByName('Name'),AllowInQwikFeaso:GetResultSet.fieldByName('AllowInQwikFeaso'),AllowInDetailedFeaso:GetResultSet.fieldByName('AllowInDetailedFeaso'),ShowToUser:GetResultSet.fieldByName('ShowToUser')});
		GetResultSet.next();
	}
	
	 GetResultSet.close();
	  DBFeaso.close();
  return CostGroupList;
}
//===============================================
/**
 * Function will return Cost Element List for specified Feaso.
 */
function getCostElemetsList (feaso) {
  	/*
	 * 10 = QwikFewaso Cost Element  
	 * 01 = DetailedFeso Cost Element
	 * 
	 */
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var CostElementList=[];
	if(feaso == 10)
	{
		GetResultSet=DBFeaso.execute('select * from CostElements where AllowInQwikFeaso=1');
		
	}
	else
	if(feaso == 01)
	{
		GetResultSet=DBFeaso.execute('select * from CostElements where AllowInDetailedFeaso=1');
	}
	
	while(GetResultSet.isValidRow())
	{
		CostElementList.push({
			CostElementID:GetResultSet.fieldByName('CostElementID'),
			Name:''+GetResultSet.fieldByName('Name'),
			DefaultValue:''+GetResultSet.fieldByName('DefaultValue'),
			AllowInQwikFeaso:GetResultSet.fieldByName('AllowInQwikFeaso'),
			AllowInDetailedFeaso:GetResultSet.fieldByName('AllowInDetailedFeaso'),
			IsCommonToAll:GetResultSet.fieldByName('IsCommonToAll'),
			CostGroupingID:GetResultSet.fieldByName('CostGroupingID'),
			IsDeleted:GetResultSet.fieldByName('IsDeleted'),
			CrossImage:GetResultSet.fieldByName('CrossImage'),
			HasUnitSign:GetResultSet.fieldByName('HasUnitSign'),
			HasButton:GetResultSet.fieldByName('HasButton'),
			Validation:GetResultSet.fieldByName('Validation'),
		});
		GetResultSet.next();
	}
	
	 GetResultSet.close();
	   DBFeaso.close();
	   
  return CostElementList;
}

/**
 * 
 * @return list of properties
 */
function getPropertiesList () {
  var PropertyList=[];
  var DBFeaso = Ti.Database.open('QwikFeaso');
  GetResultSet=DBFeaso.execute('select * from Properties');
  
  while(GetResultSet.isValidRow())
  {
  	var GetPropertyPthotoResultSet=DBFeaso.execute('select * from PropertyPhotos where PropertyID='+GetResultSet.fieldByName('PropertyID')+' and IsDefault=1 and IsDeleted=0');
  	while(GetPropertyPthotoResultSet.isValidRow())
  	{
  		var PhotoPath=GetPropertyPthotoResultSet.fieldByName('Photo');
  		PropertyList.push({PropertyID:''+GetResultSet.fieldByName('PropertyID'),Name:''+GetResultSet.fieldByName('Name'),Address:''+GetResultSet.fieldByName('Address'),PrpertyPhotoID:''+PhotoPath});
  	GetPropertyPthotoResultSet.next();
  	}
  	
  	GetPropertyPthotoResultSet.close();
  	GetResultSet.next();
  }
  	GetResultSet.close();
    DBFeaso.close();
  	return PropertyList;
}

///===============================Called from CostElement.js=========
/**
 * @return list of cost element having values for particular scenario
 * 
 */

function GetSettingCostElements () {
 var DBFeaso = Ti.Database.open('QwikFeaso');
  GetResultSet=DBFeaso.execute('select * from CostGroupings where HasScenarioValue=1');
 
  var CostGroupList=[];
	  while(GetResultSet.isValidRow())
	  {
	  	CostGroupList.push({CostGroupID:GetResultSet.fieldByName('CostGroupingID'),Name:GetResultSet.fieldByName('Name')});
	  	GetResultSet.next();
	  }
  	GetResultSet.close();
   DBFeaso.close();
  return CostGroupList;
}

//==============Called from AddCostElement.js===================
/**
 * @return list of cost element Details
 */
function getCostElementDetailList () {
	 var DBFeaso = Ti.Database.open('QwikFeaso');
	var List=[];
	  GetResultSet=DBFeaso.execute('select * from CostElements');
	  while(GetResultSet.isValidRow())
	  {
	  	List.push({CostElementID:GetResultSet.fieldByName('CostElementID'),CostElementName:GetResultSet.fieldByName('Name'),CostGroupId:GetResultSet.fieldByName('CostGroupingID')});
	  	GetResultSet.next();
	  }
	  GetResultSet.close();
   DBFeaso.close();
  return List;
}

///======================Called from CommonSetting.js========================

/**
 * @return list of cost groups having common values for all scenario
 */
function getCommonSettingCostGroup () {
	
	var List=[];
  var DBFeaso = Ti.Database.open('QwikFeaso');
  GetResultSet=DBFeaso.execute('select DISTINCT CostGroupingID from CostElements where IsCommonToAll=1 and IsItDefaultValue=1');
  
  while(GetResultSet.isValidRow())
  {
  	var CostGrpResultSet=DBFeaso.execute('select * from CostGroupings where CostGroupingID='+GetResultSet.fieldByName('CostGroupingID'));
	  	while(CostGrpResultSet.isValidRow())
	  	{
	  	 List.push({CostGroupID:CostGrpResultSet.fieldByName('CostGroupingID'),Name:CostGrpResultSet.fieldByName('Name')});
	 	CostGrpResultSet.next();
	 	}
	  	CostGrpResultSet.close();
  GetResultSet.next();
  }
  GetResultSet.close();
  DBFeaso.close();
  return List;
}

/**
 * @return list of cost element having common values for all scenario
 */

function getCommonSettingCostElement () {
 var List=[];
 var DBFeaso = Ti.Database.open('QwikFeaso');
  GetResultSet=DBFeaso.execute('select * from CostElements where IsCommonToAll=1 and IsItDefaultValue=1');
  while(GetResultSet.isValidRow())
  {
  	List.push({costElementID:GetResultSet.fieldByName('CostElementID'),costGroupID:GetResultSet.fieldByName('CostGroupingID'),Name:GetResultSet.fieldByName('Name'),
  				DefaultValue:GetResultSet.fieldByName('DefaultValue'),HasBtn:GetResultSet.fieldByName('HasButton'),HasUnit:GetResultSet.fieldByName('HasUnitSign')});
  	
  	GetResultSet.next();
  }
  GetResultSet.close();
  DBFeaso.close();
  return List;
}

/**
 * @return temporary list of dwelling generated using build quality and difficulty
 * 
 */
function getTempDetailedDwellingList () {
	var List=[];
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var DwellingRs=DBFeaso.execute('select * from Dwellings where IsDeleted=0');
	while(DwellingRs.isValidRow())
	{
		var DID=DwellingRs.fieldByName('DwellingID');
		var DwellingName=DwellingRs.fieldByName('Name');
			GetResultSet=DBFeaso.execute('select * from TempDwellingDetailsSummary where DwellingID='+DID);
	  		while(GetResultSet.isValidRow())
	  		{
	  		List.push({DwellingID:DID,DwellingName:''+DwellingName,TotalLivingAreaM2:GetResultSet.fieldByName('TotalLivingAreaM2'),
	  				ConstructionAreaM2:GetResultSet.fieldByName('TotalConstructionAreaM2'),BaseConstructionCostM2:GetResultSet.fieldByName('TotalConstructionCostM2'),
	  				Summary:GetResultSet.fieldByName('Summary')});
	  		GetResultSet.next();
	  		}
			GetResultSet.close();
		
		DwellingRs.next();
	}
	DwellingRs.close();
	 DBFeaso.close();
	
	return List;
}

/**
 * @return list of Dwelling for setting module
 * 
 */
function getSettingDetailedDwellingList () {
	var List=[];
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var DwellingRs=DBFeaso.execute('select * from Dwellings where IsDeleted=0');
	while(DwellingRs.isValidRow())
	{
		var DID=DwellingRs.fieldByName('DwellingID');
		var DwellingName=DwellingRs.fieldByName('Name');
		GetResultSet=DBFeaso.execute('select * from DwellingDetailsSummary where DwellingID='+DID);
  		while(GetResultSet.isValidRow())
  		{
  		List.push({DwellingID:DID,DwellingName:''+DwellingName,TotalLivingAreaM2:GetResultSet.fieldByName('TotalLivingAreaM2'),
  				ConstructionAreaM2:GetResultSet.fieldByName('TotalConstructionAreaM2'),BaseConstructionCostM2:GetResultSet.fieldByName('TotalConstructionCostM2'),
  				Summary:GetResultSet.fieldByName('Summary')});
  		GetResultSet.next();
  		}
		GetResultSet.close();
		
		DwellingRs.next();
	}
	DwellingRs.close();
	 DBFeaso.close();
	
	return List;
}
/**
 * @return list containing details about dwelling
 */
function GetDetailedDwellingList (dwellingID) {
  var List=[];
	var DBFeaso = Ti.Database.open('QwikFeaso');
	/*var DwellingRs=DBFeaso.execute('SELECT dd.DwellingID,rsc.RoomCategoryID,rsc.RoomSubCategotyID,rsc.name,dd.DwellingQuantity FROM DwellingDetails dd, RoomSubsCategory rsc WHERE DwellingID =  '
									+dwellingID+' AND  dd.RoomSubCategotyID = rsc.RoomSubCategotyID');*/
	var DwellingRs=DBFeaso.execute('SELECT dd.DwellingID,rsc.RoomCategoryID,rsc.RoomSubCategotyID,rsc.name,dd.DwellingQuantity,rsc.Width,rsc.Depth FROM DwellingDetails dd, RoomSubsCategory rsc WHERE DwellingID =  '
									+dwellingID+' AND  dd.RoomSubCategotyID = rsc.RoomSubCategotyID');								
	while(DwellingRs.isValidRow())
	{
		List.push({
			dwellingId:DwellingRs.fieldByName('DwellingID'),
			roomSubCatId:DwellingRs.fieldByName('RoomSubCategotyID'),
			roomCatId:DwellingRs.fieldByName('RoomCategoryID'),
			Name:DwellingRs.fieldByName('Name'),
			qty:DwellingRs.fieldByName('DwellingQuantity'),
			width:DwellingRs.fieldByName('Width'),
			depth:DwellingRs.fieldByName('Depth'),
		});
		
		DwellingRs.next();
	}
	DwellingRs.close();
	 DBFeaso.close();
	
	return List;
}


/*
 * @return list of elements needed for adding new dwelling
 * 
 */
function GetNewDetailedDwellingList (dwellingID) {
  var List=[];
	var DBFeaso = Ti.Database.open('QwikFeaso');
	/*var DwellingRs=DBFeaso.execute('SELECT dd.DwellingID,rsc.RoomCategoryID,rsc.RoomSubCategotyID,rsc.name,dd.DwellingQuantity FROM DwellingDetails dd, RoomSubsCategory rsc WHERE DwellingID = '
									+dwellingID+' AND  dd.RoomSubCategotyID = rsc.RoomSubCategotyID');*/
	var DwellingRs=DBFeaso.execute('SELECT dd.DwellingID,rsc.RoomCategoryID,rsc.RoomSubCategotyID,rsc.name,dd.DwellingQuantity,rsc.Width,rsc.Depth FROM DwellingDetails dd, RoomSubsCategory rsc WHERE DwellingID = '
									+dwellingID+' AND  dd.RoomSubCategotyID = rsc.RoomSubCategotyID');								
	while(DwellingRs.isValidRow())
	{
		List.push({
			dwellingId:DwellingRs.fieldByName('DwellingID'),
			roomSubCatId:DwellingRs.fieldByName('RoomSubCategotyID'),
			roomCatId:DwellingRs.fieldByName('RoomCategoryID'),
			Name:DwellingRs.fieldByName('Name'),
			qty:DwellingRs.fieldByName('DwellingQuantity'),
			width:DwellingRs.fieldByName('Width'),
			depth:DwellingRs.fieldByName('Depth'),
		});
		
		DwellingRs.next();
	}
	DwellingRs.close();
	 DBFeaso.close();
	
	return List;
}


/**
 * 
 * Function create Scenario Details page for accepting user values depends on track selected by user(Qwik or Detailed) 
 * 
 */
function CreateScenarioDetailsPage (listOfCostElement) {
 	var DBFeaso = Ti.Database.open('QwikFeaso');  
 DBFeaso.execute('DROP TABLE IF EXISTS ScenarioDetailsPageTable');	
   DBFeaso.execute('create table if not exists ScenarioDetailsPageTable(RowID INTEGER primary Key AUTOINCREMENT,CostElementID INT,Name TEXT,DefaultValue TEXT,CostGroupingID INT,IsDeleted Int,CrossImage INT,HasUnitSign INT,HasButton INT,Validation INT);');
 GetResultSet=DBFeaso.execute('select * from ScenarioDetailsPageTable');
 
	 if(!GetResultSet.isValidRow())
	 {
	 	 for(var i=0;i<listOfCostElement.length;i++)
	   	{
		DBFeaso.execute('insert into ScenarioDetailsPageTable(CostElementID,Name,DefaultValue,CostGroupingID,IsDeleted,CrossImage,HasUnitSign,HasButton,Validation) values(?,?,?,?,?,?,?,?,?)',
						listOfCostElement[i].CostElementID,listOfCostElement[i].Name,listOfCostElement[i].DefaultValue,
						listOfCostElement[i].CostGroupingID,listOfCostElement[i].IsDeleted,listOfCostElement[i].CrossImage,listOfCostElement[i].HasUnitSign,listOfCostElement[i].HasButton,listOfCostElement[i].Validation);
	    }
	 	
	 }
	  GetResultSet.close();
   DBFeaso.close();
}

/**
 * Function returns list cost element for scenario for specified feasibility track
 * 
 */
function getScenarioDetailePage () {
	var ScenarioDetailePageCostElementList=[];
	var DBFeaso = Ti.Database.open('QwikFeaso');  
		GetResultSet=DBFeaso.execute('select * from ScenarioDetailsPageTable');
	while(GetResultSet.isValidRow())
	{
		//Ti.API.info('getting vaues rowid : ceid  '+GetResultSet.fieldByName('RowID') + ' : '+GetResultSet.fieldByName('CostElementID'));
		ScenarioDetailePageCostElementList.push({
			Rowid:GetResultSet.fieldByName('RowID'),
			CostElementID:GetResultSet.fieldByName('CostElementID'),
			Name:''+GetResultSet.fieldByName('Name'),
			DefaultValue:''+GetResultSet.fieldByName('DefaultValue'),
			CostGroupingID:GetResultSet.fieldByName('CostGroupingID'),
			IsDeleted:GetResultSet.fieldByName('IsDeleted'),
			CrossImage:GetResultSet.fieldByName('CrossImage'),
			HasUnitSign:GetResultSet.fieldByName('HasUnitSign'),
			HasButton:GetResultSet.fieldByName('HasButton'),
			Validation:GetResultSet.fieldByName('Validation')
		});
		GetResultSet.next();
	}
	 GetResultSet.close();
	 DBFeaso.close();
  return ScenarioDetailePageCostElementList;
}

function getDwellings () {
	var ScenarioDetailePageCostElementList=[];
	var DBFeaso = Ti.Database.open('QwikFeaso');  
		GetResultSet=DBFeaso.execute('select * from ScenarioDetailsPageTable where CostGroupingID = 16');
	while(GetResultSet.isValidRow())
	{
		ScenarioDetailePageCostElementList.push({CostElementID:GetResultSet.fieldByName('CostElementID'),Name:''+GetResultSet.fieldByName('Name'),DefaultValue:''+GetResultSet.fieldByName('DefaultValue'),
		CostGroupingID:GetResultSet.fieldByName('CostGroupingID'),IsDeleted:GetResultSet.fieldByName('IsDeleted'),
		CrossImage:GetResultSet.fieldByName('CrossImage'),HasUnitSign:GetResultSet.fieldByName('HasUnitSign'),HasButton:GetResultSet.fieldByName('HasButton')});
		
		GetResultSet.next();
	}
	 GetResultSet.close();
	 DBFeaso.close();
  return ScenarioDetailePageCostElementList;

}

/**
 * Function used to deleted dwelling added in scenario details page
 */
function DeleteAddedDwelling (dwellingID) {
	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	DBFeaso.execute('delete from ScenarioDetailsPageTable where RowID='+dwellingID);
   DBFeaso.close();
}

/**
 * Function used to clear dwelling data from ScenarioDetailsPageTable table 
 */
function ClearUserAddedDwelling () {
	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	DBFeaso.execute('delete from ScenarioDetailsPageTable where CostGroupingID=16 and CostElementID !=30 and CostElementID !=31');
   DBFeaso.close();
 }
 
 
/**
 * Function deletes scenario page after using it
 * 
 */
function DeleteScenarioDetailePage () {
	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	//DBFeaso.execute('delete from ScenarioDetailsPageTable');
	DBFeaso.execute('DROP TABLE IF EXISTS ScenarioDetailsPageTable');
   DBFeaso.close();
}
///======Summmary.js===== related======
/*Called From Summary.js
 * 
 * @return List Of Cost Group presents in Summary
 */

function GetSummaryCostGroups () {
	var ResultCostGroup=[];
	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	GetResultSet=DBFeaso.execute('select * from CostGroupings where HasExpense=1 or HasRevenue=1');
		while(GetResultSet.isValidRow())
		{
		ResultCostGroup.push({CostGroupID:GetResultSet.fieldByName('CostGroupingID'),Name:GetResultSet.fieldByName('Name'),HasExpense:GetResultSet.fieldByName('HasExpense'),HasRevenue:GetResultSet.fieldByName('HasRevenue')});
		GetResultSet.next();	
		}
 	GetResultSet.close(); 

	DBFeaso.close();
 return ResultCostGroup;
 }
 /*Called From Summary.js
 * 
 * @return List Of Cost Elements presents in Summary
 */
function GetSummaryCostElement () {
	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	GetResultSet=DBFeaso.execute('SELECT trs.CostGroupID,trs.CostElementID,ce.name,trs.Value FROM TempResultSummary trs,CostElements ce where trs.CostElementID=ce.CostElementID and trs.CostGroupID=ce.CostGroupingID union select trs.CostGroupID,trs.CostElementID,fc.name,trs.Value	from TempResultSummary trs,FundingCostresult fc where trs.CostElementID=fc.CostElementID and trs.CostGroupID=13');
	while(GetResultSet.isValidRow())
	{
		ResultCostElement.push({CostElementID:GetResultSet.fieldByName('trs.CostElementID'),CostGrpID:GetResultSet.fieldByName('trs.CostGroupID'),Name:GetResultSet.fieldByName('ce.name'),value:GetResultSet.fieldByName('trs.Value')});
		GetResultSet.next();
	}
	 GetResultSet.close(); 
	DBFeaso.close();
  return ResultCostElement;
}


function CalculateResults (unSelectedOptionalConstCosts) {
	
	var DBFeaso = Ti.Database.open('QwikFeaso');
	
	/////////////////////Purchasing Cost ///////////////////////
	var PurcahsePriceRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID=1');
	var PurcahsePrice;
	while(PurcahsePriceRS.isValidRow())
	{
		PurcahsePrice=parseInt(PurcahsePriceRS.fieldByName('Value'),10);
		PurcahsePriceRS.next();
	}
	PurcahsePriceRS.close();
	
	var ClosingCostsRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID=3');
	var ClosingCosts;
	while(ClosingCostsRS.isValidRow())
	{
		ClosingCosts=(parseInt(ClosingCostsRS.fieldByName('Value'),10)/100)*PurcahsePrice;
		ClosingCostsRS.next();
	}
	ClosingCostsRS.close();
	
	var HoldingCostRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID=4');
  	var HoldingCostValue=0;
  	while(HoldingCostRS.isValidRow())
  	{
  		HoldingCostValue=parseInt(HoldingCostRS.fieldByName('Value'),10);
  		HoldingCostRS.next();
  	}
  	HoldingCostRS.close();
  	
  	var projectTimelinesRS = DBFeaso.execute('select Value from ValuesUsingForCalculation where CostGroupId=12 and CostElementID != 53');
  	var projecttimelines = 0;
  	while(projectTimelinesRS.isValidRow())
  	{
  		projecttimelines = projecttimelines + parseInt(projectTimelinesRS.fieldByName('Value'),10);
  		projectTimelinesRS.next();
  	}
  	projectTimelinesRS.close();
  	
  	var HoldingCost=HoldingCostValue*projecttimelines;
  	
  	DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=1 and CostGroupID=1',PurcahsePrice);
  	DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=3 and CostGroupID=1',ClosingCosts);
	DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=4 and CostGroupID=1',HoldingCost);
	
	////////////////////////////////////
	
	//////////////////// Value of Dwellings to be retained /////////////////////
	var VAlueOfDwellingRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID=7');
	var ValueOfDwellingToRatained;  
	  while(VAlueOfDwellingRS.isValidRow()){
		 ValueOfDwellingToRatained=parseInt(VAlueOfDwellingRS.fieldByName('Value'),10);
		 VAlueOfDwellingRS.next();
	}
	VAlueOfDwellingRS.close();	
  	

  	var RentalIncomeRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID=8');
	var RentalIncome;
	while(RentalIncomeRS.isValidRow()){
		RentalIncome=(parseInt(RentalIncomeRS.fieldByName('Value'),10))*projecttimelines;
		RentalIncomeRS.next();
	}
	RentalIncomeRS.close();	 
	
  	DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=7',ValueOfDwellingToRatained);
  	DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=8',RentalIncome);
  	///////////////////////////////////////
  	
	/////////////////// Summing up Development Phase CEs //////////////////////  	
  	//var developmentPhaseRS = DBFeaso.execute('select sum(Value) sum from ValuesUsingForCalculation where CostGroupId between 4 and 5');
  	var developmentPhaseRS = DBFeaso.execute('select Value,CostElementID from ValuesUsingForCalculation where CostGroupId between 4 and 5');
  	var sum10_30 = 0;
  	while(developmentPhaseRS.isValidRow()){
  		sum10_30 = sum10_30 + parseInt(developmentPhaseRS.fieldByName('Value'),10);
  		DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=?',developmentPhaseRS.fieldByName('Value'),developmentPhaseRS.fieldByName('CostElementID'));
  		developmentPhaseRS.next();
  	}
  	developmentPhaseRS.close();
  	/////////////////////////////////////////
  	
  	///////////////// Council Contribution Fees ///////////////////
  	
  	var developmentPhaseRS = DBFeaso.execute('select Value,CostElementID from ValuesUsingForCalculation where CostGroupId = 6 and CostElementID != 32');
  	while(developmentPhaseRS.isValidRow()){
  		DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=?',developmentPhaseRS.fieldByName('Value'),developmentPhaseRS.fieldByName('CostElementID'));
  		developmentPhaseRS.next();
  	}
  	developmentPhaseRS.close();
  	
  	
  	var CouncilContributionFeesRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID=32');
  	var TempCCF;
  	 while(CouncilContributionFeesRS.isValidRow())
		  	{
		  			TempCCF=CouncilContributionFeesRS.fieldByName('Value');
			  		CouncilContributionFeesRS.next();
		  	}
		  	CouncilContributionFeesRS.close();	
  	
  	var UserAddedDwellingRS=DBFeaso.execute('select * from UserAddedDwelling');
  	var rowId;
  	var newDwellings = [];
  	while(UserAddedDwellingRS.isValidRow())
  	{
  		newDwellings.push({
  			rowId:UserAddedDwellingRS.fieldByName('RowID'),
  			dwelId:UserAddedDwellingRS.fieldByName('DwellingID'),
  			qty:UserAddedDwellingRS.fieldByName('Quantity'),
  			sp:UserAddedDwellingRS.fieldByName('SalesPriceEach'),
  			bc:UserAddedDwellingRS.fieldByName('BuildCost'),
  			
  		});
  		
	  	UserAddedDwellingRS.next();
  	}
  	UserAddedDwellingRS.close();
  	
  	///////////////////////////
  	var UserAddedVLRS=DBFeaso.execute('select * from UserAddedVacantLand');
  	var rowId;
  	var newVL = [];
  	while(UserAddedVLRS.isValidRow())
  	{
  		newVL.push({
  			rowId:UserAddedVLRS.fieldByName('RowID'),
  			dwelId:UserAddedVLRS.fieldByName('VacantLandID'),
  			quantity:UserAddedVLRS.fieldByName('Quantity'),
  			salesprice:UserAddedVLRS.fieldByName('SalesPriceEach'),
  			ls:UserAddedVLRS.fieldByName('LotSize'),
  			name:UserAddedVLRS.fieldByName('Name'),
  		});
	  	UserAddedVLRS.next();
  	}
  	UserAddedVLRS.close();
  	
  	var totalSPVL = 0;
  	for(var i=0;i<newVL.length;i++){
  		totalSPVL = totalSPVL + (parseInt(newVL[i].quantity) * parseInt(newVL[i].salesprice));
  		var revenue = (parseInt(newVL[i].quantity) * parseInt(newVL[i].salesprice));
  		var name = 'Lot Size: '+newVL[i].ls;
  		DBFeaso.execute('update UserAddedVacantLand set Name=?,Expense=?,Revenue=? where RowID=?',name,0,revenue,newVL[i].rowId);
  	}
  		
  	///////////////////////////
  	
  	var totalSalesPrice = 0;
  	var totalDwellings = 0;
  	
  	var TotalOfDwellingBaseConstructionCost = 0;
  	for(var i=0;i<newDwellings.length;i++){
  		totalSalesPrice = totalSalesPrice + (parseInt(newDwellings[i].qty) * parseInt(newDwellings[i].sp));
  		totalDwellings = totalDwellings + parseInt(newDwellings[i].qty);
  		var expense = 0;
  		var buildCost = parseInt(newDwellings[i].bc);
  		if(buildCost == 0){
  			var BaseCostRS=DBFeaso.execute('select * from DwellingDetailsSummary where DwellingID='+DwellinID);
  			var BaseConstructionCost = 0;
			while(BaseCostRS.isValidRow())
			{
				BaseConstructionCost=parseFloat(BaseCostRS.fieldByName('TotalConstructionCostM2'));
				BaseCostRS.next();
			}
			BaseCostRS.close();
			expense = parseInt(newDwellings[i].qty)*BaseConstructionCost;
  		}
  		else{
  			expense = parseInt(newDwellings[i].qty)*buildCost;
  		}
  		TotalOfDwellingBaseConstructionCost = TotalOfDwellingBaseConstructionCost + expense;
  		var revenue = parseInt(newDwellings[i].qty)*parseInt(newDwellings[i].sp);
  		DBFeaso.execute('update UserAddedDwelling set Expense=?,Revenue=? where RowID=?',expense,revenue,newDwellings[i].rowId);
  		
  	}// end of calculating dwelling expenses and revenue
  	
  	var CouncilContributionFeesRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID=70');
  	var howManyNewDwellings = 0;
  	while(CouncilContributionFeesRS.isValidRow())
	{
		howManyNewDwellings=CouncilContributionFeesRS.fieldByName('Value');
		CouncilContributionFeesRS.next();
	}
	CouncilContributionFeesRS.close();
	
	
	if(howManyNewDwellings == 0){
		
		if((totalDwellings - 1) < 0){
  			totalDwellings = 0;
	  	}
	  	else{
	  		totalDwellings = totalDwellings - 1;
	  	}
		
	}
	else{
		totalDwellings = howManyNewDwellings;
	}
  	
  	
  	var ResultCCf=totalDwellings*TempCCF;
  	
  	DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=32',ResultCCf);
  
  /////////////////////////////////////////
  
	/////////////////// sum 33 to 50   /////////////////////////  	
  	var sum33_50;
  	var isIncludede=true;
  	var excludedCEs = '('+unSelectedOptionalConstCosts.join(',')+')';
  	var ccOccRS = DBFeaso.execute('select sum(Value) sum from ValuesUsingForCalculation where (CostGroupId between 7 and 9) and (CostElementID not in' +excludedCEs+')');
  	
  	while(ccOccRS.isValidRow()){
		sum33_50=parseInt(ccOccRS.fieldByName('sum'),10);
		ccOccRS.next();	
  	}
  	ccOccRS.close();
  	////////////////////////////////////////////////
  	
  	var PContingencyRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+51);
	var TempPContingency;
	while(PContingencyRS.isValidRow()){
		TempPContingency=parseInt(PContingencyRS.fieldByName('Value'),10);	
		PContingencyRS.next();
	}
	PContingencyRS.close();
	
	/////////////////// sum 33 to 46   /////////////////////////  	
  	var sum33_46;
  	var isIncludede=true;
  	var excludedCEs = '('+unSelectedOptionalConstCosts.join(',')+')';
  	var ccOccRS = DBFeaso.execute('select sum(Value) sum from ValuesUsingForCalculation where (CostGroupId between 7 and 9) and (CostElementID not in' +excludedCEs+')');
  	
  	while(ccOccRS.isValidRow()){
		sum33_46=parseInt(ccOccRS.fieldByName('sum'),10);
		ccOccRS.next();	
  	}
  	ccOccRS.close();
  	
  	var intTotal_Ten_Thirty=parseInt(sum10_30,10);
  	var IntResultCCf=parseInt(ResultCCf,10);
  	var IntTemp_33_46_value=parseInt(sum33_46,10);
  	var ResultConti=(TempPContingency/100)*(intTotal_Ten_Thirty+TotalOfDwellingBaseConstructionCost+IntResultCCf+IntTemp_33_46_value);
  	DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=?',ResultConti,51);
  	
  	////////////////////////////////////////////////
  	
  	var AgentNMarketinFeeRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+52);
	  var TempAMfee;
	  while(AgentNMarketinFeeRS.isValidRow())
	  {
	  	TempAMfee=parseInt(AgentNMarketinFeeRS.fieldByName('Value'),10);
	  	AgentNMarketinFeeRS.next();
	  }
	  AgentNMarketinFeeRS.close();
	  var ResultAgentNMarketingFee=(TempAMfee/100)*(totalSalesPrice+ValueOfDwellingToRatained);
	  DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=?',ResultAgentNMarketingFee,52);

		var DepositReqRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+2);  
		var DepositReq;
		while(DepositReqRS.isValidRow())
		{
			DepositReq=parseInt(DepositReqRS.fieldByName('Value'),10);
			DepositReqRS.next();
		}
		DepositReqRS.close();
		var PfundedRs=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+59);
		var DepositToBeFunded;
		while(PfundedRs.isValidRow())
		{
			DepositToBeFunded=parseInt(PfundedRs.fieldByName('Value'),10);
			PfundedRs.next();
		}
		PfundedRs.close();
		  
		 var PPurchaceFundedRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+60);
		var PPurchaceToBeFunded; 
		 while(PPurchaceFundedRS.isValidRow())
			{
			 	PPurchaceToBeFunded=parseInt(PPurchaceFundedRS.fieldByName('Value'),10);//M110
				PPurchaceFundedRS.next();
			}
			PPurchaceFundedRS.close();
	
	var P98;//=SUM(M100:M104)
	
 	P98=projecttimelines;
	
	var P99;//=P98-M99

	var BalanceOfPurchaseRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+53);
	var  BalanceOfPurchase;
	while(BalanceOfPurchaseRS.isValidRow())
	{
		BalanceOfPurchase=BalanceOfPurchaseRS.fieldByName('Value');//M99
		BalanceOfPurchaseRS.next();
	}
	BalanceOfPurchaseRS.close();
	var BalanceOfPurchaseInt=parseInt(BalanceOfPurchase,10);
	P99=P98-BalanceOfPurchaseInt; 
	
	var P101;
	var Sum_55_58=0;//ID 55-58
	var projectTimelinesRS = DBFeaso.execute('select sum(Value) sum from ValuesUsingForCalculation where CostGroupId=12 and CostElementID not in (53,54)');
  	while(projectTimelinesRS.isValidRow())
  	{
  		Sum_55_58 = parseInt(projectTimelinesRS.fieldByName('sum'),10);
  		projectTimelinesRS.next();
  	}
  	projectTimelinesRS.close();
 	P101=Sum_55_58;
 	
	 var P132;//=>O22==SUM(M23:M35)
	 var Sum_10_22=0;
	 var developmentPhaseRS = DBFeaso.execute('select Value,CostElementID from ValuesUsingForCalculation where CostGroupId = 4');
  	while(developmentPhaseRS.isValidRow()){
  		Sum_10_22 = Sum_10_22 + parseInt(developmentPhaseRS.fieldByName('Value'),10);
  		DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=?',developmentPhaseRS.fieldByName('Value'),developmentPhaseRS.fieldByName('CostElementID'));
  		developmentPhaseRS.next();
  	}
  	developmentPhaseRS.close();
	P132=Sum_10_22;
 	
	 var P138;
	 var Temp_23_29_Sum=0;
	 var developmentPhaseRS = DBFeaso.execute('select Value,CostElementID from ValuesUsingForCalculation where CostGroupId = 5');
  	while(developmentPhaseRS.isValidRow()){
  		Temp_23_29_Sum = Temp_23_29_Sum + parseInt(developmentPhaseRS.fieldByName('Value'),10);
  		DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=?',developmentPhaseRS.fieldByName('Value'),developmentPhaseRS.fieldByName('CostElementID'));
  		developmentPhaseRS.next();
  	}
  	developmentPhaseRS.close();
	P138=Temp_23_29_Sum;
	
 	var P141;///=P102==M102+M103+M104
	  var M101RS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+55);
	 var M101Value;
	   var IntM101;
	  while(M101RS.isValidRow())
		{
		    M101Value=M101RS.fieldByName('Value');
		    IntM101=parseInt(M101RS.fieldByName('Value'),10);
			M101RS.next();
		}
		M101RS.close();
	 P141=P101-IntM101;
	 
	 var P144;//=P63+O86+SUM(T50:T55)+O66+O79
 //P63==SUM(O64:O65)  /- O64=M64*TotalDwellinCreated 
 //M64=ResultCCf
 var P63=ResultCCf; 
 //O86=SUM(M87:M90)
 var O86;
 var Sum_47_50=0;
	var developmentPhaseRS = DBFeaso.execute('select Value,CostElementID from ValuesUsingForCalculation where CostGroupId = 9');
  	while(developmentPhaseRS.isValidRow()){
  		Sum_47_50 = Sum_47_50 + parseInt(developmentPhaseRS.fieldByName('Value'),10);
  		DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=?',developmentPhaseRS.fieldByName('Value'),developmentPhaseRS.fieldByName('CostElementID'));
  		developmentPhaseRS.next();
  	}
  	developmentPhaseRS.close();
 O86=Sum_47_50;
 //SUM(T50:T55)
 var SumT50_T55=TotalOfDwellingBaseConstructionCost;
 //===Sum of BaseConstCost Value
 //O66==SUM(M67:M77)
 var O66;
 var Sum_33_42=0;
 var developmentPhaseRS = DBFeaso.execute('select Value,CostElementID from ValuesUsingForCalculation where CostGroupId = 7');
  	while(developmentPhaseRS.isValidRow()){
  		Sum_33_42 = Sum_33_42 + parseInt(developmentPhaseRS.fieldByName('Value'),10);
  		DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=?',developmentPhaseRS.fieldByName('Value'),developmentPhaseRS.fieldByName('CostElementID'));
  		developmentPhaseRS.next();
  	}
  developmentPhaseRS.close();
  O66=Sum_33_42;	
 //O79=SUM(M80:M84)
 var O79;
 var Sum_43_46=0;
 var ccOccRS = DBFeaso.execute('select Value,CostElementID from ValuesUsingForCalculation where CostGroupId = 8 and (CostElementID not in' +excludedCEs+')');
  	
  	while(ccOccRS.isValidRow()){
		Sum_43_46= Sum_43_46 + parseInt(ccOccRS.fieldByName('Value'),10);
		DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=?',ccOccRS.fieldByName('Value'),ccOccRS.fieldByName('CostElementID'));
		ccOccRS.next();	
  	}
  	ccOccRS.close();
 O79=Sum_43_46;
 
 P144=P63+O86+SumT50_T55+O66+O79;
 
 
 var P103;
 var Sum57_58=0;
	for(var i=57;i<59;i++)
	{
		var TempRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+i);
	  	var TempInt;
	  	while(TempRS.isValidRow())
				  	 {
				  	 	TempInt=parseInt(TempRS.fieldByName('Value'),10);
				  		TempRS.next();
				  	 }
		  	 		TempRS.close();
	  	 Sum57_58=Sum57_58+TempInt;
	} 
	P103=Sum57_58;  
	
	//Values Needed For PMT function
var InterestRateRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+67);
	var InterestRate;
	while(InterestRateRS.isValidRow())
	{
		InterestRate=parseFloat(InterestRateRS.fieldByName('Value'));//7.5%
		InterestRateRS.next();
	}
	InterestRateRS.close();
	
	var RePaymentsOptionRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+66);
	var RePaymentsOption;
	while(RePaymentsOptionRS.isValidRow())
	{
		RePaymentsOption=RePaymentsOptionRS.fieldByName('Value');
		RePaymentsOptionRS.next();
	}
	RePaymentsOptionRS.close();
	var  RePaymentsOptionValue=GetRepayMentValue(RePaymentsOption);
	 Ti.API.info('RePaymentsOption :'+RePaymentsOption+':Value:'+RePaymentsOptionValue);//:Month:Value:12
	 Ti.API.info('InterestRate :'+InterestRate);
	var IntrestValue=(InterestRate/(100*RePaymentsOptionValue));

	var TermsInYearsRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+65);
	var TermsInYearsIntValue;
	while(TermsInYearsRS.isValidRow())
	{
		 TermsInYearsIntValue=parseInt(TermsInYearsRS.fieldByName('Value'),10);
		TermsInYearsRS.next();
	}
	TermsInYearsRS.close();
	var NoOfPayment=TermsInYearsIntValue*RePaymentsOptionValue;
	
	var When1StPaymentMadeRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+68);
	 var When1StPaymentMadeOption;
		while(When1StPaymentMadeRS.isValidRow())
		{
			 When1StPaymentMadeOption=When1StPaymentMadeRS.fieldByName('Value');
			When1StPaymentMadeRS.next();
		}
		When1StPaymentMadeRS.close();
	//Beginning/End
	var When1StPaymentMadeValue=When1StPaymentMadeOption=='Beginning'?1:0;
	var FundingCostList=[];
//==========================  
var Deposite;//T120
var P120=PurcahsePrice*(DepositReq/100);
var OwnCash1;//P120*(1-M109)->   M109=% of Deposit to be funded (i.e. Loan not Cash)
OwnCash1=P120*(1-(DepositToBeFunded/100));

var Funded1;
Funded1=P120*(DepositToBeFunded/100);

var DurationOfLoanInMonth1;//=p98=Term In Years
var projectTimelinesRS = DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID = 53');
  	var balance = 0;
  	while(projectTimelinesRS.isValidRow())
  	{
  		balance = parseInt(projectTimelinesRS.fieldByName('Value'),10);
  		projectTimelinesRS.next();
  	}
  	projectTimelinesRS.close();
  	
//DurationOfLoanInMonth1=P98;
DurationOfLoanInMonth1=balance;


var PeriodicRepayment1;	//Remaining

var TypeOfLoanRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+64);
var TypeOfLoan;
while(TypeOfLoanRS.isValidRow())
{
	TypeOfLoan=TypeOfLoanRS.fieldByName('Value');
	TypeOfLoanRS.next();
}
TypeOfLoanRS.close();
	if(TypeOfLoan == 'Interest Only')
	{
		//call Normal Function
		PeriodicRepayment1=Funded1*((InterestRate/(100*RePaymentsOptionValue)));
	}
	else
	{ // TypeOfLoan == 'P&L' 
		// call PMT function
		PeriodicRepayment1=CaluculatePMT(IntrestValue,NoOfPayment,Funded1,0,When1StPaymentMadeValue);
	}
	
Deposite=PeriodicRepayment1*DurationOfLoanInMonth1;

DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=1 and CostGroupID=13',Deposite);
DBFeaso.execute("update FundingCostresult set Expense='"+Deposite+"',Revenue='"+0+"',ProfitLoss='"+0+"' where CostElementID=1");
//==========================
var PurchaseNOnCosts;//T126==P130*P129
var P126;//=SUM(T8:T11)-P9
var SumT8_T11=PurcahsePrice+ClosingCosts+HoldingCost;
//P126=SumT8_T11-P120;
P126 = SumT8_T11-((DepositReq/100)*PurcahsePrice);


var OwnCash2;//=P126*(1-M110)
OwnCash2=P126*(1-(PPurchaceToBeFunded/100));
var Funded2;//=P126*M110
Funded2=P126*(PPurchaceToBeFunded/100);

var DurationOfLoanInMonth2;//=P99

//DurationOfLoanInMonth2=P99;
DurationOfLoanInMonth2=P98;
//Ti.API.info('DurationOfLoanInMonth2 :'+DurationOfLoanInMonth2);

var PeriodicRepayment2;//Remaining
	if(TypeOfLoan == 'Interest Only')
	{
		//call Normal Function
		PeriodicRepayment2=Funded2*((InterestRate/(100*RePaymentsOptionValue)));
	}
	else
	{ // TypeOfLoan == 'P&L' 
		// call PMT function
		PeriodicRepayment2=CaluculatePMT(IntrestValue,NoOfPayment,Funded2,0,When1StPaymentMadeValue);
	}
PurchaseNOnCosts=PeriodicRepayment2*DurationOfLoanInMonth2;

//Ti.API.info('PurchaseNOnCosts :'+PurchaseNOnCosts);
DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=2 and CostGroupID=13',PurchaseNOnCosts);
DBFeaso.execute("update FundingCostresult set Expense='"+PurchaseNOnCosts+"',Revenue='"+0+"',ProfitLoss='"+0+"' where CostElementID=2");


//==========================
var DevelopmentApplicationCosts;//T132=P136*P135
var OwnCash3;//P133=P132*(1-M111)  //M111=Development Application Stage -55ID
var DevelopMentAppStageRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+61);
var DevelopMentAppStage;
while(DevelopMentAppStageRS.isValidRow())
{
	DevelopMentAppStage=DevelopMentAppStageRS.fieldByName('Value');
	DevelopMentAppStageRS.next();
}
DevelopMentAppStageRS.close();
	
var IntDevelopMentAppStage=parseInt(DevelopMentAppStage,10);

OwnCash3=P132*(1-(IntDevelopMentAppStage/100));
var Funded3;//P134===P132*M111
Funded3=P132*(IntDevelopMentAppStage/100);

var DurationOfLoanInMonth3;//P135==P101(Sum of M101-M104)
DurationOfLoanInMonth3=P101;

var PeriodicRepayment3;//Remaining
	if(TypeOfLoan == 'Interest Only')
	{
		//call Normal Function
		PeriodicRepayment3=Funded3*((InterestRate/(100*RePaymentsOptionValue)));
	}
	else
	{ 
		// call PMT function
		PeriodicRepayment3=CaluculatePMT(IntrestValue,NoOfPayment,Funded3,0,When1StPaymentMadeValue);
	}

DevelopmentApplicationCosts=DurationOfLoanInMonth3*PeriodicRepayment3;

DBFeaso.execute("update FundingCostresult set Expense='"+DevelopmentApplicationCosts+"',Revenue='"+0+"',ProfitLoss='"+0+"' where CostElementID=3");
DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=3 and CostGroupID=13',DevelopmentApplicationCosts);
//==========================
var PreConstructionCosts;//T138=P142*P141
var OwnCash4;//P139==P138*(1-M112)
var M112RR=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+62);
/**
 * Need to look in depth as DevelopMentAppStage and M112Value nothing but the same as M112Valueßßßß
 */ 
var M112Value;
while(M112RR.isValidRow())
{
	M112Value=M112RR.fieldByName('Value');
	M112RR.next();
}
M112RR.close();
 
var PercentOfBATobeFunded=parseInt(M112Value,10);
OwnCash4=P138*(1-(PercentOfBATobeFunded/100));

var Funded4;//P140==P138*M112
Funded4=P138*(PercentOfBATobeFunded/100);

var DurationOfLoanInMonth4;//P141=P102
DurationOfLoanInMonth4=P141;

var PeriodicRepayment4;//P142
if(TypeOfLoan == 'Interest Only')
{
	//call Normal Function
	PeriodicRepayment4=Funded4*((InterestRate/(100*RePaymentsOptionValue)));
}
else
{	
	// call PMT function
	PeriodicRepayment4=CaluculatePMT(IntrestValue,NoOfPayment,Funded4,0,When1StPaymentMadeValue);
	
}
PreConstructionCosts=PeriodicRepayment4*DurationOfLoanInMonth4;
DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=4 and CostGroupID=13',PreConstructionCosts);

DBFeaso.execute("update FundingCostresult set Expense='"+PreConstructionCosts+"',Revenue='"+0+"',ProfitLoss='"+0+"' where CostElementID=4");
//==========================



var ConstructionNPostConstructionCosts;//T144=p148*P147
var OwnCash5;//P145=P144*(1-M113)
var M113RS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+63);
var M113Value;
while(M113RS.isValidRow())
{
	M113Value=M113RS.fieldByName('Value'); 
	M113RS.next();
}
M113RS.close();


var PercentOfConstructionTobeFunded=parseInt(M113Value,10);
 OwnCash5=P144*(1-(PercentOfConstructionTobeFunded/100));


var Funded5;//P146=P144*M113
Funded5=P144*(PercentOfConstructionTobeFunded/100);

var DurationOfLoanInMonth5;//P147==P103==M103+M104
DurationOfLoanInMonth5=P103;


var PeriodicRepayment5;//P148 Remaining
if(TypeOfLoan == 'Interest Only')
{
	//call Normal Function
	PeriodicRepayment5=Funded5*((InterestRate/(100*RePaymentsOptionValue)));
}
else
{
	// call PMT function
	PeriodicRepayment5=CaluculatePMT(IntrestValue,NoOfPayment,Funded5,0,When1StPaymentMadeValue);
}
ConstructionNPostConstructionCosts=PeriodicRepayment5*DurationOfLoanInMonth5;

DBFeaso.execute("update FundingCostresult set Expense='"+ConstructionNPostConstructionCosts+"',Revenue='"+0+"',ProfitLoss='"+0+"' where CostElementID=5");
DBFeaso.execute('update TempResultSummary set Value=? where CostElementID=5 and CostGroupID=13',ConstructionNPostConstructionCosts);

//==========================
var Profitability_without_Funding_implicationsExpense;//=SUM(T7:T105)
var Profitability_without_Funding_implicationsRenenue;//=SUM(U7:U105)
var Profitability_without_Funding_implicationsProfitLoss;

Profitability_without_Funding_implicationsExpense=parseInt(PurcahsePrice,10)+parseInt(ClosingCosts,10)+parseInt(HoldingCost,10)+
													parseInt(sum10_30,10)+TotalOfDwellingBaseConstructionCost+parseInt(ResultCCf,10)+
													parseInt(sum33_50,10)+parseInt(ResultConti,10)+parseInt(ResultAgentNMarketingFee,10);
			
Profitability_without_Funding_implicationsRenenue=parseInt(ValueOfDwellingToRatained,10)+parseInt(RentalIncome,10)+parseInt(totalSalesPrice,10);

Profitability_without_Funding_implicationsProfitLoss=Profitability_without_Funding_implicationsRenenue
  														-Profitability_without_Funding_implicationsExpense;
  
  
 
  DBFeaso.execute("update SummaryStaticData set Expense='"+Profitability_without_Funding_implicationsExpense+"',Revenue='"+Profitability_without_Funding_implicationsRenenue+"',ProfitLoss='"+Profitability_without_Funding_implicationsProfitLoss+"' where SummaryStaticDataID=3");

 ///Done upto this Nov 8 final
 var fundingCostExpense=0;//=SUM(T107:T149)
 fundingCostExpense=parseFloat(Deposite)+parseFloat(PurchaseNOnCosts)+parseFloat(DevelopmentApplicationCosts)+parseFloat(PreConstructionCosts)+parseFloat(ConstructionNPostConstructionCosts);

var fundingCostRevenue=0;
 
 var fundingCostProfitLoss=fundingCostExpense;
  
  DBFeaso.execute("update SummaryStaticData set Expense='"+fundingCostExpense+"',Revenue='"+fundingCostRevenue+"',ProfitLoss='"+fundingCostProfitLoss+"' where SummaryStaticDataID=4");
  
/* Changes made according to QwikFeaso_Calculation_V18*/ 

  var TotalProfitabilityOfDealExpense=parseInt(Profitability_without_Funding_implicationsExpense,10)+parseInt(fundingCostExpense,10);
 
 ///////////////////// 
  var TotalProfitabilityOfDealRevenue=ValueOfDwellingToRatained+RentalIncome+totalSalesPrice+totalSPVL;
  /////////////////////
  
  var TotalProfitabilityOfDealProfitLoss=TotalProfitabilityOfDealRevenue-TotalProfitabilityOfDealExpense;
  
   DBFeaso.execute("update SummaryStaticData set Expense='"+TotalProfitabilityOfDealExpense+"',Revenue='"+TotalProfitabilityOfDealRevenue+"',ProfitLoss='"+TotalProfitabilityOfDealProfitLoss+"' where SummaryStaticDataID=5");
/*******/ 
  var ProfitLoss;//=(U152/T152)-1
  ProfitLoss=((parseInt(TotalProfitabilityOfDealRevenue,10)/parseInt(TotalProfitabilityOfDealExpense,10))-1)*100;//%
   
    //Ti.API.info('ProfitLoss :'+ProfitLoss);
   DBFeaso.execute("update SummaryStaticData set ProfitLoss='"+ProfitLoss+"' where SummaryStaticDataID=1");

   
   var ProfitTargetRS=DBFeaso.execute('select Value from ValuesUsingForCalculation where CostElementID='+69);
   var ProfitTargetValue;
   while(ProfitTargetRS.isValidRow())
   {
    ProfitTargetValue=parseInt(ProfitTargetRS.fieldByName('Value'),10);
   	ProfitTargetRS.next();
   }
   ProfitTargetRS.close();
   var DealNoDeal= ProfitLoss > ProfitTargetValue?'Potential Deal':'No Deal';
    DBFeaso.execute("update SummaryStaticData set ProfitLoss='"+DealNoDeal+"' where SummaryStaticDataID=2");
    
   
	
   DBFeaso.close();

}








 


/**
 * Gets the repayment value
 */
function GetRepayMentValue (RepayMentType) {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var repaymentType=RepayMentType;
	var RepayMentValueRS=DBFeaso.execute("select * from PaymentPerYear where Name='"+repaymentType+"'");
	var RepayMentValueInt;
	while(RepayMentValueRS.isValidRow())
	{
		RepayMentValueInt=parseInt(RepayMentValueRS.fieldByName('Value'),10);
		RepayMentValueRS.next();
	}
	RepayMentValueRS.close();
  	DBFeaso.close();
  	
  return RepayMentValueInt;
  
}

/**
     * Emulates Excel/Calc's PMT(interest_rate, number_payments, PV, FV, Type)
     * function, which calculates the mortgage or annuity payment / yield per
     * period.
     * 
     * @param interestRate(r)
     *            - periodic interest rate represented as a decimal.
     * @param NumberOfPayment(nper)
     *            - number of total payments / periods.
     * @param PrincipleValue(pv)
     *            - present value -- borrowed or invested principal.
     * @param FutureValue(fv)
     *            - future value of loan or annuity.
     * @param TypePaymentDue(type)
     *            - when payment is made: beginning of period is 1; end, 0.
     * @return <code>double</code> representing periodic payment amount.
     */
function CaluculatePMT (interestRate,NumberOfPayment,PrincipleValue,FutureValue,TypePaymentDue) {
	
  
       var pmt = interestRate / (Math.pow(1 + interestRate, NumberOfPayment) - 1)
                * -(PrincipleValue * Math.pow(1 + interestRate, NumberOfPayment) + FutureValue);
        // account for payments at beginning of period versus end.
        if (TypePaymentDue == 1)
            pmt /= (1 + interestRate);
        // return results to caller.
        return (-(pmt));
 
}


/**
 * Clear summary if not saved
 */
function ClearInCompletObtainedScenario () {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute('delete from ObtainedSceanrio where IsCompleted=0');
 	 DBFeaso.close();
}

/**
 * @return list of dwelling for summary
 */
function getDwellingResult() {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var DwellingresultList=[];
	var UserAddedDwellingRS=DBFeaso.execute('select * from UserAddedDwelling d, Dwellings dw where d.DwellingID = dw.DwellingID');
  	while (UserAddedDwellingRS.isValidRow()) {
	DwellingresultList.push({DwellingID:UserAddedDwellingRS.fieldByName('DwellingID'),Name:UserAddedDwellingRS.fieldByName('Name'),Expense:UserAddedDwellingRS.fieldByName('Expense'),Revenue:UserAddedDwellingRS.fieldByName('Revenue')});
  	UserAddedDwellingRS.next();
  	}
	UserAddedDwellingRS.close();
	DBFeaso.close();
	return DwellingresultList;
}

/**
 * @return list of dwelling for summary
 */
function getVacantLandResult() {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var DwellingresultList=[];
	var UserAddedDwellingRS=DBFeaso.execute('select * from UserAddedVacantLand');
  	while (UserAddedDwellingRS.isValidRow()) {
		DwellingresultList.push({
			DwellingID:UserAddedDwellingRS.fieldByName('VacantLandID'),
			Name:UserAddedDwellingRS.fieldByName('Name'),
			Expense:UserAddedDwellingRS.fieldByName('Expense'),
			Revenue:UserAddedDwellingRS.fieldByName('Revenue'),
			LotSize:UserAddedDwellingRS.fieldByName('LotSize'),
		});
		Ti.API.info('vacant land values while showing : '+UserAddedDwellingRS.fieldByName('Revenue'));
	  	UserAddedDwellingRS.next();
  	}
	UserAddedDwellingRS.close();
	DBFeaso.close();
	return DwellingresultList;
}

/**
 * function save summary with name
 * @param {Object} ScenarioName
 */
function CompleteObtainedScenario(ScenarioName) {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	
	var rowIDRS=DBFeaso.execute('select max(ObtainedSceanrioID) ObtainedSceanrioID from ObtainedSceanrio where IsCompleted=?',0);
	var ObtScenID;
	while(rowIDRS.isValidRow())
	{
		ObtScenID=rowIDRS.fieldByName('ObtainedSceanrioID');
		rowIDRS.next();	
	}
	rowIDRS.close();
	DBFeaso.execute('update ObtainedSceanrio set Name=?,IsCompleted=? where ObtainedSceanrioID=?',ScenarioName,1,ObtScenID);
	
  DBFeaso.close();
}

/**
 * Function determines in which feaso the current Cost group has visibility
 * @param {Integer} cgId	Holds the Cost group Id
 */
function inWhichFeasibility (cgId) {
	var allowInQwik;
	var allowInDet;
  	var DBFeaso = Ti.Database.open('QwikFeaso');
	GetResultSet=DBFeaso.execute('select * from CostGroupings where CostGroupingID = '+cgId);
	while(GetResultSet.isValidRow())
	{
		allowInQwik = GetResultSet.fieldByName('AllowInQwikFeaso');
		allowInDet =  GetResultSet.fieldByName('AllowInDetailedFeaso');
		GetResultSet.next();	
	}
	GetResultSet.close();
	DBFeaso.close();
	if(allowInQwik == 1 && allowInDet == 1)
	{
		return 'both';
	}
	else
	{
		if(allowInQwik == 1)
		{
			return 'q';
		}
		else
		{
			return 'd';
		}
	}
}


/**
 * Function inserts selected image by the user into the temporary list while adding a new property  
 * @param {String} imgName Holds name of the currently selected image
 */
function setTempPropPhotosLst (imgName) {
	
	var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute("insert into TempPropertyPhotos(Photo) values(?)",imgName);
	DBFeaso.close();
 	
}

/**
 * Function gets the temporary list of property photos selected by the user while adding a 
 * new property  
 * @return	Returns temporary list of property photos selected by the user
 */
function getTempPropPhotosLst () {
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
	DBFeaso.close();
 	return PropertyList;
}


/**
 * Function gets the details of the property selected by the user to edit it
 * @param {Integer} PropertyId	Holds the Property Id
 * @return	Returns details of the property selected by the user
 */
function getPropDetails (PropertyId) {
	var PropertyList=[];
	var DBFeaso = Ti.Database.open('QwikFeaso');
	GetResultSet=DBFeaso.execute("select * from Properties pr,PropertyPhotos ph where pr.PropertyID="+PropertyId+" and pr.PropertyID = ph.PropertyID and ph.isdefault =1");
	while(GetResultSet.isValidRow())
  	{
  		PropertyList.push({
  			PropertyID:''+GetResultSet.fieldByName('PropertyPhotoID'),
  			imgName:''+GetResultSet.fieldByName('Photo'),
  			isDef:GetResultSet.fieldByName('IsDefault'),
  			addr:GetResultSet.fieldByName('Address'),
  			name:GetResultSet.fieldByName('Name'),
  		});
  		GetResultSet.next();
  	}
  	GetResultSet.close();
	DBFeaso.close();
 	return PropertyList;
}

/**
 * Function get list of property photos for setting another image as the default image of 
 * selected property
 * @param {String} PropertyId	Holds Property Id
 * @return Returns list of property photos of selected property
 */
function getPropPhotosLst (PropertyId) {
	var PropertyList=[];
	var DBFeaso = Ti.Database.open('QwikFeaso');
	GetResultSet=DBFeaso.execute('select * from PropertyPhotos where PropertyID='+PropertyId);
	while(GetResultSet.isValidRow())
  	{
  		PropertyList.push({
  			photoId:''+GetResultSet.fieldByName('PropertyPhotoID'),
  			imgName:''+GetResultSet.fieldByName('Photo'),
  			isDef:GetResultSet.fieldByName('IsDefault')
  		});
  		GetResultSet.next();
  	}
  	GetResultSet.close();
	DBFeaso.close();
 	return PropertyList;
}

/**
 * function provide list of feasibility assigned to specified property
 * @param {Integer} propertyID	Holds Property Id
 * @return Returns list of feasibility of selected property
 */
function getPropertyFeasibilityList(propertyID)
{
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var feasibilityListData=[];
	GetResultSet=DBFeaso.execute('select OS.Name,SP.* from ScenarioToProperty SP,ObtainedSceanrio OS where SP.ScenarioID=OS.ObtainedSceanrioID and PropertyID=?',propertyID);
	while(GetResultSet.isValidRow())
	{
		feasibilityListData.push({feasibilityID:GetResultSet.fieldByName('ScenarioID'),feasibilityname:GetResultSet.fieldByName('Name')});
		GetResultSet.next();
	}
	GetResultSet.close();	
	DBFeaso.close();
	return feasibilityListData;
	
}



/**
 * function displays list of feasibility assigned to specified property in Property details window
 * 
 * @return Returns list of feasibility of selected property
 */

function GetFeasibilityListForProperty () {
	
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var feasibilityData=[];
	
	GetResultSet=DBFeaso.execute('select * from ObtainedSceanrio');
	while(GetResultSet.isValidRow())
  	{
  		feasibilityData.push({FeasibilityID:GetResultSet.fieldByName('ObtainedSceanrioID'),Name:GetResultSet.fieldByName('Name'),});
  		GetResultSet.next();
  	}
  	GetResultSet.close();
	DBFeaso.close();
	
	return feasibilityData;
}

/**
 * @return static list of summary
 * 
 */
function getSummary () {
	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	GetResultSet=DBFeaso.execute('SELECT * FROM SummaryStaticData');
	while(GetResultSet.isValidRow())
	{
		ResultCostElement.push({
			Name:GetResultSet.fieldByName('Name'),
			Expense:GetResultSet.fieldByName('Expense'),
			Revenue:GetResultSet.fieldByName('Revenue'),
			ProfitLoss:GetResultSet.fieldByName('ProfitLoss'),
			CEID:'',
			CDID:'',
		});
		GetResultSet.next();
	}
	 GetResultSet.close(); 
	DBFeaso.close();
  return ResultCostElement;
}



function FeasibilityListToCompare () {
	
	var PropertyID=Ti.Platform.osname == 'android'?Ti.App.QwikFeasoGlobalVars.SelectedPropertyID:QwikFeasoGlobalVars.SelectedPropertyID;
  	var DBFeaso = Ti.Database.open('QwikFeaso');
	var feasibilityData=[];
	var rowHt=(Ti.Platform.displayCaps.platformHeight*10)/100;
	GetResultSet=DBFeaso.execute('select OS.Name,SP.* from ScenarioToProperty SP,ObtainedSceanrio OS where SP.ScenarioID=OS.ObtainedSceanrioID and PropertyID=?',PropertyID);
	while(GetResultSet.isValidRow())
  	{
  		feasibilityData.push({FeasibilityID:GetResultSet.fieldByName('ScenarioID'),Name:GetResultSet.fieldByName('Name')});	
  		GetResultSet.next();
  	}
  	GetResultSet.close();
	DBFeaso.close();
	return feasibilityData;
}

/**
 * @return static list of summary
 * 
 */
function getTempSummaryResult () {

	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	GetResultSet=DBFeaso.execute('select c.name,c.CostElementID,t.CostGroupID,t.value,cg.HasExpense,cg.HasRevenue from TempResultSummary t, CostElements c , CostGroupings cg'+
' where t.CostElementID=c.CostElementID and c.CostGroupingID=cg.CostGroupingID and t.CostGroupID != 13 and ObtainedScenarioID = (select max(ObtainedScenarioID) from TempResultSummary)');
	
	var ce_name = '';
	var ce_id = '';
	var cg_id = '';
	var value = '';
	var hasExpense = '';
	var hasRevenue = '';	
	
	while(GetResultSet.isValidRow())
	{
		hasExpense = GetResultSet.fieldByName('HasExpense');
		hasRevenue = GetResultSet.fieldByName('HasRevenue');
		value = GetResultSet.fieldByName('Value');
		if(hasExpense == 1)
		{
				ResultCostElement.push({
				Name:GetResultSet.fieldByName('Name'),
				CEID:GetResultSet.fieldByName('CostElementID'),
				CDID:GetResultSet.fieldByName('CostGroupID'),
				Expense:value,
				Revenue:'',
				ProfitLoss:''
			});
		}
		else if(hasRevenue == 1)
		{
			ResultCostElement.push({
				Name:GetResultSet.fieldByName('Name'),
				CEID:GetResultSet.fieldByName('CostElementID'),
				CDID:GetResultSet.fieldByName('CostGroupID'),
				Expense:'',
				Revenue:value,
				ProfitLoss:''
			});
		}
		
		GetResultSet.next();
	}
	 GetResultSet.close(); 
	//Ti.API.info('ResultCostElement DB :'+ResultCostElement.length);
	DBFeaso.close();
  return ResultCostElement;
}

/**
 * @return static list of summary
 * 
 */
function getFundingCostResult () {
	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	GetResultSet=DBFeaso.execute('SELECT * FROM FundingCostresult');
	while(GetResultSet.isValidRow())
	{
		ResultCostElement.push({
			Name:GetResultSet.fieldByName('Name'),
			Expense:GetResultSet.fieldByName('Expense'),
			Revenue:GetResultSet.fieldByName('Revenue'),
			ProfitLoss:GetResultSet.fieldByName('ProfitLoss'),
			CEID:GetResultSet.fieldByName('CostElementID'),
			CDID:13,
		});
		GetResultSet.next();
	}
	 GetResultSet.close(); 
	DBFeaso.close();
  return ResultCostElement;
}

/**
 * @return static list of summary
 * 
 */
function getUserAddedDwelling () {
	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	GetResultSet=DBFeaso.execute('select d.name,u.Expense,u.Revenue '+
								' from UserAddedDwelling u, Dwellings d'+
								' where u.DwellingID = d.DwellingID');
	while(GetResultSet.isValidRow())
	{
		
		ResultCostElement.push({
			Name:GetResultSet.fieldByName('Name'),
			Expense:GetResultSet.fieldByName('Expense'),
			Revenue:GetResultSet.fieldByName('Revenue'),
			ProfitLoss:'',
			CEID:'',
			CDID:'',
		});
		GetResultSet.next();
	}
	 GetResultSet.close(); 
	DBFeaso.close();
  return ResultCostElement;
}

/**
 * @return static list of summary
 * 
 */
function getUserAddedVacantLand () {
	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	GetResultSet=DBFeaso.execute('select Name,Expense,Revenue from UserAddedVacantLand');
	while(GetResultSet.isValidRow())
	{
		
		ResultCostElement.push({
			Name:GetResultSet.fieldByName('Name'),
			Expense:GetResultSet.fieldByName('Expense'),
			Revenue:GetResultSet.fieldByName('Revenue'),
			ProfitLoss:'',
			CEID:'',
			CDID:'',
		});
		GetResultSet.next();
	}
	 GetResultSet.close(); 
	DBFeaso.close();
  return ResultCostElement;
}


/**
 * @return static list of summary
 * 
 */
function getFinalSummary (sceneId) {
	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	GetResultSet=DBFeaso.execute('SELECT * FROM FinalSummary WHERE ObtainedSceanrioID = '+sceneId);
	while(GetResultSet.isValidRow())
	{
		ResultCostElement.push({
			feasId:GetResultSet.fieldByName('ObtainedSceanrioID'),
			PL:GetResultSet.fieldByName('PL'),
			DND:GetResultSet.fieldByName('DND'),
			Name:GetResultSet.fieldByName('Name'),
			Expense:GetResultSet.fieldByName('Expense'),
			Revenue:GetResultSet.fieldByName('Revenue'),
			ProfitLoss:GetResultSet.fieldByName('ProfitLoss'),
			CEID:GetResultSet.fieldByName('CEID'),
			CGID:GetResultSet.fieldByName('CGID'),
		});
		GetResultSet.next();
	}
	 GetResultSet.close(); 
	DBFeaso.close();
  return ResultCostElement;
}

function getOpnConstCostFinalSummary (sceneId) {
	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	GetResultSet=DBFeaso.execute('SELECT * FROM FinalSummary WHERE ObtainedSceanrioID = '+sceneId+' AND CGID = 8');
	while(GetResultSet.isValidRow())
	{
		ResultCostElement.push({
			feasId:GetResultSet.fieldByName('ObtainedSceanrioID'),
			PL:GetResultSet.fieldByName('PL'),
			DND:GetResultSet.fieldByName('DND'),
			Name:GetResultSet.fieldByName('Name'),
			Expense:GetResultSet.fieldByName('Expense'),
			Revenue:GetResultSet.fieldByName('Revenue'),
			ProfitLoss:GetResultSet.fieldByName('ProfitLoss'),
			CEID:GetResultSet.fieldByName('CEID'),
			CGID:GetResultSet.fieldByName('CGID'),
		});
		GetResultSet.next();
	}
	 GetResultSet.close(); 
	DBFeaso.close();
  return ResultCostElement;
}

/**
 * return max property ID
 * 
 */
function getCurrentPropId () {
  	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	var propId;
	GetResultSet=DBFeaso.execute('SELECT max(PropertyID) PropertyID FROM Properties');
	while(GetResultSet.isValidRow())
	{
		propId = GetResultSet.fieldByName('PropertyID');
		GetResultSet.next();
	}
	 GetResultSet.close(); 
	 DBFeaso.close();
	 return propId;
}

/*
 * @param {Integer} feasId	Summary/Feasibility Id of which name is to be returned
 * @return	Returns name of the summary
 */

function getSummaryName (feasId) {
  var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	var name;
	GetResultSet=DBFeaso.execute('SELECT name FROM ObtainedSceanrio WHERE ObtainedSceanrioID = '+feasId);
	while(GetResultSet.isValidRow())
	{
		name = GetResultSet.fieldByName('Name');
		GetResultSet.next();
	}
	 GetResultSet.close(); 
	 DBFeaso.close();
	 return name;
}

function IsDwellingAdded () {
   var DBFeaso = Ti.Database.open('QwikFeaso'); 
   var DwellingAdded=false;
   GetResultSet=DBFeaso.execute('SELECT CostElementID FROM ScenarioDetailsPageTable WHERE CostGroupingID = '+16);
	if(GetResultSet.isValidRow())
	{
		DwellingAdded=true;
	}
	 GetResultSet.close(); 
   DBFeaso.close();
   return DwellingAdded;
}

function IsVacantLandAdded () {
   var DBFeaso = Ti.Database.open('QwikFeaso'); 
   var DwellingAdded=false;
   GetResultSet=DBFeaso.execute('SELECT CostElementID FROM ScenarioDetailsPageTable WHERE CostGroupingID = '+17);
	if(GetResultSet.isValidRow())
	{
		DwellingAdded=true;
	}
	 GetResultSet.close(); 
   DBFeaso.close();
   return DwellingAdded;
}

function GetCostElementLength () {
	var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	GetResultSet=DBFeaso.execute('SELECT * FROM CostElements where HasResult = 1');
	while(GetResultSet.isValidRow())
	{
		ResultCostElement.push({
			CostElementID:GetResultSet.fieldByName('CostElementID'),
			CostGrpID:GetResultSet.fieldByName('CostGroupingID'),
			Name:GetResultSet.fieldByName('name'),
		});
		GetResultSet.next();
	}
	 GetResultSet.close(); 
	DBFeaso.close();
  return ResultCostElement;
}

function GetCEComparedValues (feasId,ceId) {
  var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	GetResultSet=DBFeaso.execute('SELECT Expense,Revenue FROM FinalSummary where ObtainedSceanrioID ='+ feasId+' and CEID ='+ ceId);
	
	if(GetResultSet.isValidRow()){
		while(GetResultSet.isValidRow())
		{
			ResultCostElement.push({
				Expense:GetResultSet.fieldByName('Expense'),
				Revenue:GetResultSet.fieldByName('Revenue'),
			});
			GetResultSet.next();
		}
	}
	else{
		ResultCostElement.push({
				Expense:'',
				Revenue:'',
			});
	}
	
	GetResultSet.close(); 
	DBFeaso.close();
  return ResultCostElement;
}

function GetDwellingsComparedValues (feasId) {
  var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	var ids = '';
	ids = '('+feasId.join(',')+')';
	Ti.API.info('ids :'+ids);
	GetResultSet=DBFeaso.execute('SELECT ObtainedSceanrioID,Name,Expense,Revenue FROM FinalSummary where CGID = 16 and ObtainedSceanrioID in '+ids);
	if(GetResultSet.isValidRow()){
		while(GetResultSet.isValidRow())
		{
			ResultCostElement.push({
				feasId:GetResultSet.fieldByName('ObtainedSceanrioID'),
				Name:GetResultSet.fieldByName('Name'),
				Expense:GetResultSet.fieldByName('Expense'),
				Revenue:GetResultSet.fieldByName('Revenue'),
			});
			GetResultSet.next();
		}
	}
	
	GetResultSet.close(); 
	DBFeaso.close();
  return ResultCostElement;
}

function GetVacantLandComparedValues (feasId) {
  var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	var ids = '';
	ids = '('+feasId.join(',')+')';
	Ti.API.info('ids :'+ids);
	GetResultSet=DBFeaso.execute('SELECT ObtainedSceanrioID,Name,Expense,Revenue FROM FinalSummary where CGID = 17 and ObtainedSceanrioID in '+ids);
	if(GetResultSet.isValidRow()){
		while(GetResultSet.isValidRow())
		{
			ResultCostElement.push({
				feasId:GetResultSet.fieldByName('ObtainedSceanrioID'),
				Name:GetResultSet.fieldByName('Name'),
				Expense:GetResultSet.fieldByName('Expense'),
				Revenue:GetResultSet.fieldByName('Revenue'),
			});
			GetResultSet.next();
		}
	}
	
	GetResultSet.close(); 
	DBFeaso.close();
  return ResultCostElement;
}

function GetFCComparedValues (feasId) {
  var DBFeaso = Ti.Database.open('QwikFeaso'); 
	var ResultCostElement=[];
	GetResultSet=DBFeaso.execute('SELECT ObtainedSceanrioID,Name,Expense,Revenue FROM FinalSummary where ObtainedSceanrioID = '+feasId+' AND CGID = 13');
	if(GetResultSet.isValidRow()){
		while(GetResultSet.isValidRow())
		{
			ResultCostElement.push({
				feasId:GetResultSet.fieldByName('ObtainedSceanrioID'),
				Name:GetResultSet.fieldByName('Name'),
				Expense:GetResultSet.fieldByName('Expense'),
				Revenue:GetResultSet.fieldByName('Revenue'),
			});
			GetResultSet.next();
		}
	}
	else{
		ResultCostElement.push({
				feasId:GetResultSet.fieldByName('ObtainedSceanrioID'),
				Name:'',
				Expense:'',
				Revenue:'',
			});
	}
	
	GetResultSet.close(); 
	DBFeaso.close();
  return ResultCostElement;
}




