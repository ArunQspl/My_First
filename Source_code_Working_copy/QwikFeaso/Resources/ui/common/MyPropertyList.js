/**
 * @projectDescription QwikFeaso
 * 
 * @author Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window for Property List 
   
   @param {Object} myPropertyWindow		Window object
   @return {Object}						Returns current window object
*/

function OpenPropertyWindow (fromWin) {

var myPropertyWindow;
var MyPropertyRow;
var myPropertyTableView;
var deleteSign = [];
if(Ti.Platform.osname == 'android') // android specific code
  {
  	/*
  	 * Include the files needed for UI Design and Database usage
  	 * Header.js will manage navigation for android
  	 */
  	//Window Created for Android
  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
	Ti.include('/services/DataBaseTransaction.js')	
	Ti.include('/services/GetFromDataBase.js')	
	myPropertyWindow=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 		
	 
	 // Handle back press 
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
	 	/*
	 	 * Logic that handles if the navigation to this window is from Summary Report
	 	 * then redirect the navigation to Dash board 
	 	 * else directly close Property list window
	 	 */
	 	
	 	if (fromWin ==2) {
			//from summary win after saving result
			
			Ti.App.QwikFeasoGlobalVars.DashBoardOpenedFrom=1;
			var createDashBoardWindow= require('ui/common/DashBoard');
				
			new createDashBoardWindow().open();	 
			
			myPropertyWindow.close();
			
		}
		else
			{
			//from dashboard as regular navigation
			myPropertyWindow.close();
			if (Ti.Platform.osname == 'android')
			{
				Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto='default';
			}
			else
			{
				QwikFeasoGlobalVars.NewPropertyPhoto='default';
			}
			}
	 	
	 	});
	 	
	 // Navigates to App Property window	
	 rightBtn.addEventListener('click',function(e)
	  {
	  	btnSelector(rightBtn);
		var OpenAddPropertyWin=require('ui/common/AddProperty');
		new OpenAddPropertyWin().open();
		
			Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto='default';
		
			
		
	 });
	 
	 
	myPropertyWindow.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;		
 	
  }
  else // iPhone or iPad specific code
  {
		  	//Window Created for iphone to suport navigation Bar
		  	myPropertyWindow=Ti.UI.createWindow({
			  	backgroundColor:'#fff',
				navBarHidden:false,
				tabBarHidden: true,
				barImage:'images/GrayNavBar.png',
				barColor:'#6d6e6f',
				title:'My Property',
		 	 });	
	
	 	var BackBtn = Ti.UI.createButton({
			      title : 'Back',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
			  });
		  var lftNavView=Ti.UI.createView(
			{
				width:'auto',
				height:'auto',
				
				backgroundColor:'#0000',
				layout:'horizontal'
				
			});
	
		 BackBtn.addEventListener('click', function() {  
		 	  btnSelector(BackBtn);
		   	/*
		 	 * Logic that handles if the navigation to this window is from Summary Report
		 	 * then redirect the navigation to Dash board 
		 	 * else directly close Property list window
		 	 */
		 	
		   if (fromWin ==2) {
				//from summary win after saving result
				
				QwikFeasoGlobalVars.DashBoardOpenedFrom=1;
				var createDashBoardWindow = require('ui/common/DashBoard');
				navGroup.open(new createDashBoardWindow(),{animated: true});
				
				navGroup.close(myPropertyWindow,{animated: true});
			}
			else
				{
				//from dashboard as regular navigation
				navGroup.close(myPropertyWindow,{animated: true});
			    }

		    
		  });
  
		  lftNavView.add(BackBtn);
		
		  myPropertyWindow.leftNavButton=lftNavView;
		  
		  
		  var rightView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					
					backgroundColor:'#0000',
					layout:'horizontal'
					
				});

		  var RightBtn = Ti.UI.createButton({
			      title : 'Add',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
			  });
			  
		  // Navigates to App Property window		  
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);
		  	var OpenAddPropertyWin=require('ui/common/AddProperty');
			navGroup.open(new OpenAddPropertyWin(),{animated: true});
			QwikFeasoGlobalVars.NewPropertyPhoto='default';
		  });
		  
		  rightView.add(RightBtn);
		  myPropertyWindow.rightNavButton=rightView;
		  
	
	}


 
myPropertyWindow.orientationModes=[	Ti.UI.PORTRAIT];



myPropertyWindow.addEventListener('focus', function (e) {
	
	/*
	 * Logic of updating UI after adding a new property or doing some changes
	 * to existing property.
	 */
	
	if (Ti.Platform.osname == 'android')
	{
		if(Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto !='default' || Ti.App.QwikFeasoGlobalVars.SummaryUpdated == 1)
		{
			//myPropertyWindow.add(actvityIndicatorView);
				//actInd.show();
				setTimeout(function(){
			  	myPropertyWindow.remove(myPropertyTableView);
				myPropertyTableView=null;
						getPropertyList();
 	 					//actInd.hide();
 	 					//myPropertyWindow.remove(actvityIndicatorView);
  						}, 500);
		}
		
	Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto='default';
	Ti.App.QwikFeasoGlobalVars.SummaryUpdated = 0;
	}
	else
	{
		if(QwikFeasoGlobalVars.NewPropertyPhoto !='default' || QwikFeasoGlobalVars.SummaryUpdated == 1)
		{
				setTimeout(function(){
			  		myPropertyWindow.remove(myPropertyTableView);
					myPropertyTableView=null;
					getPropertyList();
  				}, 500);
		}
		
	QwikFeasoGlobalVars.NewPropertyPhoto='default';
	QwikFeasoGlobalVars.SummaryUpdated = 0;
	} 
	
	
	
});

var rowHt=(Ti.Platform.displayCaps.platformHeight*15)/100;
getPropertyList();
 
/*
   Function: Set the header for Android devices
   
   @param {Object) headerView			View object that holds the container to the headerLabel  
   @param {Object} headerLabel			Label object that holds the name of header
   @param {Object) leftBtn				Left button object for going back 
   @param {Object) rightBtn				Right button that navigates to Add property window
   @param {Object) myPropertyWindow		Window object that holds all the above objects
   @memberOf headerLabel				View that is a member of Header.js file
   @memberOf leftBtn					View that is a member of Header.js file
   @memberOf rightBtn					View that is a member of Header.js file
   @memberOf headerView					View that is a member of Header.js file
*/
function setHeader () {
	
		
		headerLabel.text='My Property';
	
	
		leftBtn.title='Back';						
		rightBtn.title='Add';
		
		headerView.add(leftBtn);						
		headerView.add(headerLabel);
		headerView.add(rightBtn);
		
		myPropertyWindow.add(headerView);
  
			}
			
/*
   Function: Get property list
   
   @param {List) Properties					Holds the Property details  
   @memberOf getPropertiesList				Function is member of DatabaseTransaction.js file
  
*/
		
function getPropertyList()  {
	var propertyData=[];
	var Properties=getPropertiesList();

	for(var i=0;i< Properties.length ; i++ )
	{
		 	MyPropertyRow=Ti.UI.createTableViewRow();
		 	MyPropertyRow.selectedBackgroundColor = '#fff';
		    MyPropertyRow.height = rowHt;
		    MyPropertyRow.className = 'datarow';
		    MyPropertyRow.clickName = 'row';
		    MyPropertyRow.PropertyId=Properties[i].PropertyID;
		    MyPropertyRow.PropertyName=Properties[i].Name;
		 	
			var propertyNameLabel = Ti.UI.createLabel({
				        color:glblGreenFont,
				        font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'15%',fontWeight:'bold'}
								 :{fontSize:'16dp',fontWeight:'bold'},
				      //  font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
				        left:'25%',//70
				        top:2,
				        height:rowHt/2,
				        width:'65%',
				        clickName:'user',
				        text:Properties[i].Name,
				        PropertyId:Properties[i].PropertyID,
		 				PropertyName:Properties[i].Name,
				    });
				
		MyPropertyRow.add(propertyNameLabel);
		
		var propertyAddrLabel = Ti.UI.createLabel({
			        color:glblDarkGrayFont,
			        //font:{fontSize:fontSize,fontWeight:'normal', fontFamily:'Arial'},
			        font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'15%'}
								 :{fontSize:'16dp'},
			        left:'25%',//70
			      	top:Ti.Platform.osname =='android'?'52%':'48%',//21
			        height:rowHt/2,
			        width:'65%',
			        clickName:'comment',
			        text:Properties[i].Address,
			        PropertyId:Properties[i].PropertyID,
		 			PropertyName:Properties[i].Name,
		 			textAlign:'top',
			    });
		MyPropertyRow.add(propertyAddrLabel);
			
		var propertyImage =Titanium.UI.createImageView(
			{
				image:Properties[i].PrpertyPhotoID,
				clickName:'rowImage',
				PropertyId:Properties[i].PropertyID,
		 		PropertyName:Properties[i].Name,
				width:Ti.Platform.osname =='android'?'23%':'23%',
				height:rowHt,
				left:Ti.Platform.osname =='android'?0:-3,
				touchEnabled:true
				
			});
			
  			MyPropertyRow.add(propertyImage);
			
		 deleteSign[i] = Ti.UI.createButton({
				        backgroundImage:globalImgPath+'cross_btn.png',
				        //top:35,
				        right:5,
				        width:'25dp',
				        clickName:'button',
				        height:'25dp',
				        PropertyId:Properties[i].PropertyID,
		 				PropertyName:Properties[i].Name,
				    });
		MyPropertyRow.add( deleteSign[i]);
		propertyData.push(MyPropertyRow);
	}
	


	myPropertyTableView=Ti.UI.createTableView(
		{
			top:Ti.Platform.osname == 'android'?'10%':'0%',
			width:'auto',
			height:'auto',
			data:propertyData,
			
			scrollable:true,
			backgroundColor:'#fff'
			
		});
		if(Ti.Platform.osname != 'android')
		{
			myPropertyTableView.footerTitle='';
		}
		
	
myPropertyTableView.addEventListener('click',function(e)
{
	/*
	 * Logic of getting properties with their default image and showing it in the list
	 */
	Ti.API.info('Source clicked:'+e.source.toString());
	
			var PropertyName=e.source.PropertyName;
			var PropertyId = e.source.PropertyId;
			
			 if(e.source.toString() == '[object TiUIButton]' ||  e.source.toString() == '[object Button]')
			{
				btnSelector(e.source);
					var alerDialog=Ti.UI.createAlertDialog({
					message:'Are you sure you want to permanantly delete this Property? ',
					buttonNames: ['Yes','No']
					});
				alerDialog.addEventListener('click', function(ev) {
				    if (ev.index == 0) { 
				    	myPropertyWindow.add(actvityIndicatorView);
				     actInd.show();	
				    	deleteProperty(PropertyId);
						 
						  myPropertyWindow.remove(myPropertyTableView);
						  myPropertyTableView=null;
						  getPropertyList();
					 actInd.hide();
					 myPropertyWindow.remove(actvityIndicatorView);
				     // clicked "Yes"
				    } else if (ev.index == 1) { 
				    	
				    	alerDialog.hide();
				      // clicked "No"
				    }
				  });
				alerDialog.show();
						
			}
			else
			{
				myPropertyWindow.add(actvityIndicatorView);
				actInd.show();
				if(Ti.Platform.osname == 'android')
					{
						Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto='default';
						var OpenPropertyDetailWin=require('ui/common/MyPropertyDetails');
						new OpenPropertyDetailWin(PropertyId,PropertyName).open();
						
					}
					else
					{
						QwikFeasoGlobalVars.NewPropertyPhoto='default';
						var OpenPropertyDetailWin=require('ui/common/MyPropertyDetails');
					    navGroup.open(new OpenPropertyDetailWin(PropertyId,PropertyName),{animated: true});
					
					}
					
				actInd.hide();	
				myPropertyWindow.remove(actvityIndicatorView);
			}
			
			
			
			
			
			
});	
	
   	if(propertyData.length > 0)
   	{
   		myPropertyWindow.add(myPropertyTableView);
   	}
   	else
   	{
   	   var EmptyListLabel = Ti.UI.createLabel({
       color : '#000',
       text:'No property has been added yet',  
       font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp',fontWeight:'normal'}
								 :{fontSize:'15%',fontWeight:'normal'},
       height : 'auto',
       width : '100%',
       textAlign:'center'	
    });
 		
   	
   	myPropertyWindow.add(EmptyListLabel);
   	
   	}
  
  
	
}
	 
//Delete sign listener
function imgTappingClick (e) {
	var alerDialog=Ti.UI.createAlertDialog({
				message:'Are you sure you want to permanantly delete this Property? ',
				buttonNames: ['Yes','No']
			});
			alerDialog.addEventListener('click', function(ev) {
			    if (ev.index == 0) { 
			    	deleteProperty(e.source.id);
					  actInd.show();
					  myPropertyWindow.remove(myPropertyTableView);
					  myPropertyTableView=null;
					  getPropertyList();
					  actInd.hide();
			     // clicked "Yes"
			    } else if (ev.index == 1) { 
			    	
			    	alerDialog.hide();
			      // clicked "No"
			    }
			  });
			alerDialog.show();
	 
	}
	
	
	// Create a Button.
var HomeButton = Ti.UI.createButton({
	image:Ti.Platform.osname === 'android'?'/images/HomeBtn.png':'images/HomeBtn.png',
	height : '10%',
	width : '12%',
	bottom : 0,
	left:'48%',
	visible:true,
	style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
    backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
	borderRadius:5,
    		
});

// Create a Button.
var Home2Button = Ti.UI.createButton({
	title : 'Home2',
	height : '10%',
	width : 'auto',
	bottom : 0,
	left:'0%',
	//zIndex:10,
	visible:true
});

// Listen for click events.
Home2Button.addEventListener('click', function() {
	var t2 = Ti.UI.create2DMatrix().scale(1.5),
				a = Ti.UI.createAnimation();
				a.duration = 1500;
				HomeButton.animate(a);
	
	
});

// Add to the parent view.
myPropertyWindow.add(actInd);	
	
return myPropertyWindow;
}

module.exports=OpenPropertyWindow;