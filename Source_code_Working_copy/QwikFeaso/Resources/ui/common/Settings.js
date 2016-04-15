/**
 * @projectDescription QwikFeaso
 * 
 * @author List- vivek Gidmare(vivek.gidmare@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window shows a list of settings
   
   @param {Object} SettingsWin		Window object
   @return {Object}					Returns current window object
*/

function Settings(){
   var SettingsWin;
   var  row = [];
  if(Ti.Platform.osname == 'android')
  {
  	//Window Created for Android
  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
  	 SettingsWin=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 		
	 
	 leftBtn.addEventListener('singletap',function(e){
	 	btnSelector(leftBtn);
	 	SettingsWin.close();
	 	});
	 	
  }
  else
  {
  	//Window Created for iphone to suport navigation Bar
  	SettingsWin=Ti.UI.createWindow({
  	backgroundColor:'#fff',
	navBarHidden:false,
	
	barImage:'images/GrayNavBar.png',
	barColor:'#6d6e6f',
	title:'Settings',
	
  });
    // Create a Button.
  var BackBtn = Ti.UI.createButton({
      title : 'Back',
      height : '30dp',
      width : '60dp',
      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
      borderRadius:3,
      
      font:{fontSize:'15%'},
     backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},

  });
  var lftView=Ti.UI.createView(
	{
		width:'auto',
		height:'auto',
		
		backgroundColor:'#0000',
		layout:'horizontal'
		
	});
	
	 BackBtn.addEventListener('click', function() {    
  btnSelector(BackBtn);
    navGroup.close(SettingsWin,{animated: true});
    
  });
  
  lftView.add(BackBtn);

  SettingsWin.leftNavButton=lftView;
  
  
  
  
  
  }
  
  
  SettingsWin.orientationModes=[Ti.UI.PORTRAIT];
  
  //Only for Android
  /*
   Function: Set the header for Android devices
   
   @param {Object) headerView			View object that holds the container to the headerLabel  
   @param {Object} headerLabel			Label object that holds the name of header
   @param {Object) leftBtn				Left button object for going back 
   @param {Object) buildWindow			Window object that holds all the above objects
   @memberOf headerLabel				View that is a member of Header.js file
   @memberOf leftBtn					View that is a member of Header.js file
   @memberOf headerView					View that is a member of Header.js file
*/
  function setHeader () {
  	headerLabel.text='Settings';

	headerView.add(headerLabel);
	leftBtn.title='Back';
	
	headerView.add(leftBtn);
	SettingsWin.add(headerView);
}


 var rowHt=(Ti.Platform.displayCaps.platformHeight*15)/100; 
 var sectionRowHt=(Ti.Platform.displayCaps.platformHeight*7)/100;
  var rowData=[];
  
  var settingGroupList=[
  						{SGPID:1,Name:'Construction Cost Calculator'},
  						{SGPID:2,Name:'QwikFeaso'},
  						{SGPID:3,Name:'Application Details'},
  						];
  
   var SettingsList=[
   					 {MenuID:1,SGPID:1,Name:'Construction Costs',winURL:'ui/common/ConstructionCost'},
					 {MenuID:2,SGPID:1,Name:'Room Dimensions',winURL:'ui/common/RoomDimensions'},
   
					 {MenuID:3,SGPID:2,Name:'Common Settings',winURL:'ui/common/CommonSettings'},
					 {MenuID:4,SGPID:2,Name:'Development Strategies',winURL:'ui/common/Scenarios'},
					 {MenuID:5,SGPID:2,Name:'Cost Elements',winURL:'ui/common/CostElements'},
					
					 {MenuID:6,SGPID:3,Name:'Licensed User Details',winURL:'ui/common/LicensedUserDetails'},
					 {MenuID:7,SGPID:3,Name:'About Us',winURL:'ui/common/ShowWebPage'},
					 {MenuID:8,SGPID:3,Name:'Terms and Conditions',winURL:'ui/common/ShowWebPage'},
					 {MenuID:9,SGPID:3,Name:'Help',winURL:'ui/common/ShowWebPage'},
					 {MenuID:10,SGPID:3,Name:'Build Version',winURL:'ui/common/BuildVersion'},

					 ];
 
  var scrollView = Ti.UI.createScrollView({
	top:Ti.Platform.osname =='android'?'10%':'0%',
    contentHeight: 'auto',
    layout: 'vertical',
});



for(var j=0;j<settingGroupList.length;j++)
{
	var SettingHeaderRow=createSettingGroups(j);
	scrollView.add(SettingHeaderRow);
	
	for(var i=0;i<SettingsList.length;i++)
	{
		if(settingGroupList[j].SGPID === SettingsList[i].SGPID)
		{
			var settingElementrow = createSettingElementRows(i);
			scrollView.add(settingElementrow);
		}
	 
	}
}


SettingsWin.add(scrollView);
 
function createSettingGroups(i) {
 	 var rowHeader = Ti.UI.createView({
	           width:'100%', 
               height: sectionRowHt,
               top: 0, 
               left: 0,
               backgroundGradient:{type:'linear',colors:['#b4b4b4','#969696'],startPoint:{x:0,y:0},endPoint:{x:2,y:100},backFillStart:false},

           });
           
           var rowHeaderLabel=Ti.UI.createLabel(
           	{ 	text:''+settingGroupList[i].Name,
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'14dp',fontWeight:'bold'}
								 :{fontSize:'12%',fontWeight:'bold'},
				color:'white',
				left:'3%',
           		touchEnabled:false
           	});
          
           
             rowHeader.add(rowHeaderLabel);
            return rowHeader;
   
 }
 
 
 function createSettingElementRows (j) {
 		  row[j] = Ti.UI.createView({
               backgroundColor: 'white',
               borderColor: '#bbb',
               borderWidth: 1,
               width:'100%', 
               height: rowHt,
               top: 0, 
               left: 0,
               id:'i'+j,
               winUrl:SettingsList[j].winURL,
			   winTitle:SettingsList[j].Name,
              
           });
          var rowLabel=Ti.UI.createLabel(
           	{
           		width:'60%',
           		height:'100%',
           		text:''+SettingsList[j].Name,
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'17%'},
           		left:'3%',
           		color:glblDarkGrayFont,
           		touchEnabled:false
           	});
           
           
          	row[j].addEventListener('click',function(e)
			 {
		       		var winUrl=e.source.winUrl;
					var winTitle=e.source.winTitle;
				
					
					if(Ti.Platform.osname == 'android')
					{
						if(winTitle=='Development Strategies')//winTitle == 'Dwellings' ||
						{
							var fromWin=2;	//to recognoze win called from either Setting or ScenarioDetails
							actInd.show();
							var winOpen=require(winUrl);
							new winOpen(winTitle,fromWin).open(); 
							actInd.hide();
						}
						else if(winTitle=='About Us'){
							var fromWin='About Us';	//to recognoze win called from either Setting or ScenarioDetails
							actInd.show();
							var winOpen=require(winUrl);
							new winOpen(winTitle,fromWin).open(); 
							actInd.hide();
						}
						else if(winTitle=='Terms and Conditions'){
							var fromWin='Terms and Conditions';	//to recognoze win called from either Setting or ScenarioDetails
							actInd.show();
							var winOpen=require(winUrl);
							new winOpen(winTitle,fromWin).open(); 
							actInd.hide();
						}
						else if(winTitle=='Help'){
							var fromWin='Help';	//to recognoze win called from either Setting or ScenarioDetails
							actInd.show();
							var winOpen=require(winUrl);
							new winOpen(winTitle,fromWin).open(); 
							actInd.hide();
						}
						else
						{
							actInd.show();
							var winOpen=require(winUrl);
							new winOpen(winTitle).open();
							actInd.hide();
						}
					}
					else
					{
						if(winTitle=='Development Strategies')//winTitle == 'Dwellings' || 
						{
							var fromWin=2;	//to recognoze win called from either Setting or ScenarioDetails
							var winOpen=require(winUrl);
							navGroup.open(new winOpen(winTitle,fromWin),{animated: true});
							
						}
						else if(winTitle=='About Us'){
							var fromWin='About Us';	//to recognoze win called from either Setting or ScenarioDetails
							var winOpen=require(winUrl);
							navGroup.open(new winOpen(winTitle,fromWin),{animated: true});
						}
						else if(winTitle=='Terms and Conditions'){
							var fromWin='Terms and Conditions';	//to recognoze win called from either Setting or ScenarioDetails
							var winOpen=require(winUrl);
							navGroup.open(new winOpen(winTitle,fromWin),{animated: true});
						}
						else if(winTitle=='Help'){
							Ti.API.info('clicked on help');
							var fromWin='Help';	//to recognoze win called from either Setting or ScenarioDetails
							var winOpen=require(winUrl);
							navGroup.open(new winOpen(winTitle,fromWin),{animated: true});
						}
						else
						{
							var winOpen=require(winUrl);
							navGroup.open(new winOpen(winTitle),{animated: true});
						}
					}
       		
       		
       		
       		
       		});
           
           row[j].add(rowLabel);
           return row[j];
}
 
  
function getSettingElementList () {
 
  for(var i=0;i<SettingsList.length;i++)
	{
		var SettingsListRow=Ti.UI.createTableViewRow(
			{
			height:rowHt,
			backgroundColor:'#fff',
			selectedBackgroundColor:'#fff',
			backgroundSelectedColor:'#fff',
			winUrl:SettingsList[i].winURL,
			winTitle:SettingsList[i].name,
			
			clickName:'SettingsListRow',
			editable:false//put this property false otherwise btn on row will not work
			});
			
		var SettingsName=Ti.UI.createLabel({
				left:'5%',
				right:10,
				text:SettingsList[i].name,
				row:i,
				font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'20%',fontWeight:'bold'}
								 :{fontSize:'35%',fontWeight:'bold'},
				color:glblDarkGrayFont,
				clickName:'SettingsName',
				textAlign:'left',
				touchEnabled:false
			});	
		
		SettingsListRow.add(SettingsName);
		
		
		rowData.push(SettingsListRow);
			
	}//end of for loop	
  
}  
  
 
  SettingsWin.add(actInd);	
  return SettingsWin;
  
}
module.exports=Settings;