/**
 * @projectDescription QwikFeaso
 * 
 * @author Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window for Editing property details
   
   @param {Object} myPropertyDetailsWindow	Window object
   @return {Object}							Returns current window object
*/


function OpenPropertyDetailWin (PropertyId,PropertyName) 
{
	var myPropertyDetailsWindow;
	var propertyNameTextField;
	var propertyAddrTextField;
	var RightBtn;
	
	var propertyFeasibilityRow=[];
	var feasibilityNameLabel=[];
	var deleteSign=[];
	var feasibilityTableView;
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
	Ti.include('/services/TempDBTransaction.js')
  	 myPropertyDetailsWindow=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 		
	 
	 // Handle back press
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
	 	if(rightBtn.title == 'Save')
	 	{
	 		var alerDialog=Ti.UI.createAlertDialog({
					message:'Do you want to Save the changes you made? ',
					buttonNames: ['Yes','No']
				});
				alerDialog.addEventListener('click', function(ev) {
				    if (ev.index == 0) { 
				    	Ti.App.QwikFeasoGlobalVars.SummaryUpdated = 1;
				    	updatePropertyDetails(PropertyId,propertyNameTextField.value,propertyAddrTextField.value);
				    	myPropertyDetailsWindow.close();	
				     // clicked "Yes"
				    } else if (ev.index == 1) { 
				    	alerDialog.hide();
				    	myPropertyDetailsWindow.close();
				      // clicked "No"
				    }
				  });
				alerDialog.show();
		 	
	 	}
	 	else
	 		myPropertyDetailsWindow.close();
	 	});
	 
	 // Saving property details
	 rightBtn.addEventListener('click',editProperty)
	
	 
	myPropertyDetailsWindow.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;	
 	
  }
  else // iPhone or iPad specific code
  {
		  	//Window Created for iphone to suport navigation Bar
		  	myPropertyDetailsWindow=Ti.UI.createWindow({   
		  	backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			title:'Property Detail',
			
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
	
		 // Handle back press
		 BackBtn.addEventListener('click', function() {    
		 	btnSelector(BackBtn);
		    if(RightBtn.title == 'Save')
		 	{
		 		var alerDialog=Ti.UI.createAlertDialog({
						message:'Do you want to Save the changes you made? ',
						buttonNames: ['Yes','No']
					});
					alerDialog.addEventListener('click', function(ev) {
					    if (ev.index == 0) { 
					    	QwikFeasoGlobalVars.SummaryUpdated = 1;
					    	updatePropertyDetails(PropertyId,propertyNameTextField.value,propertyAddrTextField.value);
					    	navGroup.close(myPropertyDetailsWindow,{animated: true});	
					     // clicked "Yes"
					    } else if (ev.index == 1) { 
					    	alerDialog.hide();
					    	navGroup.close(myPropertyDetailsWindow,{animated: true});
					      // clicked "No"
					    }
					  });
					alerDialog.show();
			 	
		 	}
		 	else
		 		navGroup.close(myPropertyDetailsWindow,{animated: true});
		    
		    
		  });
  
		  lftNavView.add(BackBtn);
		
		  myPropertyDetailsWindow.leftNavButton=lftNavView;
		  
		  var rightView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					
					backgroundColor:'#0000',
					layout:'horizontal'
					
				});

		  RightBtn = Ti.UI.createButton({
			      title : 'Edit',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      id:'button',
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
			  });
			  
		  // Save changes done to property details	  
		  RightBtn.addEventListener('click',editProperty)
		
		  
		  rightView.add(RightBtn);
		  myPropertyDetailsWindow.rightNavButton=rightView;
		 
	}
myPropertyDetailsWindow.orientationModes=[
									Ti.UI.PORTRAIT
									];
								

	
 feasibilityTableView=Ti.UI.createTableView(
		{
			top:Ti.Platform.osname =='android'?'50%':'40%',
			width:'auto',
			height:'auto',
			data:getPropertyFeasibilityList(PropertyId),
			//moving:false,
			scrollable:true,
			backgroundColor:'#fff'
			
		});
		if (Ti.Platform.osname != 'android') {
				   		feasibilityTableView.footerTitle='';
				   	};									
									
	
  myPropertyDetailsWindow.add(feasibilityTableView);	
  								
									
function editProperty (e) {
	btnSelector(e.source);
	var btnTitle ='';
	if(e.source.id == 'button')
	{
		/*
	 	 * Logic of allowing user to edit Name, Address, Default photo of the selected property
	 	 * Title of Button gets changed to Save and user can then save his changes
	 	 */
		btnTitle =e.source.title;
		
		  	if(btnTitle == 'Edit')
		  	{
				propertyNameTextField.enabled = true;
				propertyAddrTextField.enabled = true;
		  		e.source.title='Save';
		  	}
		  	else
		  	{
		  		
		  		var photoId;
		 		if (Ti.Platform.osname == 'android')
				{
					photoId = Ti.App.QwikFeasoGlobalVars.PropPhotoId;
					Ti.App.QwikFeasoGlobalVars.SummaryUpdated = 1;
				}
				else
				{
					photoId = QwikFeasoGlobalVars.PropPhotoId;
					QwikFeasoGlobalVars.SummaryUpdated = 1;
					
				}
		 		updatePropertyDetails(PropertyId,propertyNameTextField.value,propertyAddrTextField.value);
		 		propertyNameTextField.enabled = false;
				propertyAddrTextField.enabled = false;
		  		e.source.title='Edit';
		  		
		  		
		  	}
	}
	
}			
					
var PropertyAddr;
var PropertyPhoto;
var property = [];
property = getPropDetails(PropertyId);
PropertyAddr = property[0].addr;
PropertyPhoto = property[0].imgName;


Ti.App.addEventListener('RefreshView', function(event) {
  setDataToFeasibilityTable();
});

myPropertyDetailsWindow.addEventListener('focus', function (e) {
	
	if (Ti.Platform.osname == 'android')
	{
		if(Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto != 'default')
		{
			/*
		 	 * Logic of UI update of My property details window after selecting a photo for property
		 	 */
				setTimeout(function(){
			  		propImgView.image = Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto;
  				}, 500);
		}
		
	}
	else
	{
		if(QwikFeasoGlobalVars.NewPropertyPhoto != 'default')
		{
			/*
		 	 * Logic of UI update of My property details window after selecting a photo for property
		 	 */
				setTimeout(function(){
			  		propImgView.image = QwikFeasoGlobalVars.NewPropertyPhoto;
  				}, 500);
		}
		
	} 
	setDataToFeasibilityTable();
});

setDataToFeasibilityTable();


var propImgView=Ti.UI.createImageView(
	{
		 width: '30%',
        height: '18%',
		image:PropertyPhoto,
		touchEnabled:false,
		top:Ti.Platform.osname=='android'?'15%':'5%',
		left:'5%',
		
	});  
	
myPropertyDetailsWindow.add(propImgView);


// Create a Button.
var changeImgBtn = Ti.UI.createButton({
	title : 'Photos',
	  	width:Ti.Platform.osname=='android'?'30%':'24%',
       	height:'5%',
        top:Ti.Platform.osname=='android'?'31%':'22%',
		left:Ti.Platform.osname=='android'?'5%':'8%',
		
	style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
	borderRadius:3,
	color:'white',
  	font:Ti.Platform.osname=='android'?{fontSize:'12dp'}:{fontSize:'12%'},
	backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
});


// Add to the parent view.
myPropertyDetailsWindow.add(changeImgBtn);


/**
 * Listener to the Change Image label and Image itself.
 * User can tap on label or on image to change the default image of the property
 */
propImgView.addEventListener('click',chngImgFn);	
changeImgBtn.addEventListener('click',chngImgFn);


function chngImgFn (e) {
	btnSelector(e.source);
	
  var fromWin = 'Property details';
		if(Ti.Platform.osname == 'android')
		{
			var OpenMyPropertyPhotosWin=require('ui/common/SelectPropertyPhotos');
			new OpenMyPropertyPhotosWin(fromWin,PropertyId).open();
		}
		else
		{
			var OpenMyPropertyPhotosWin=require('ui/common/SelectPropertyPhotos');
			navGroup.open(new OpenMyPropertyPhotosWin(fromWin,PropertyId),{animated: true});
		}
	
		
}


propertyNameTextField=Ti.UI.createTextField(
	{
		left:'40%',
		width:'55%',
		value:PropertyName,
		enabled:false,
		
		font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'16dp',fontWeight:'bold'}
								 :{fontSize:'16dp',fontWeight:'bold'},
		textAlign:'left',
		top:Ti.Platform.osname=='android'?'15%':'5%',
		color:glblGreenFont,
		backgroundColor:'#fff',
        textAlign:Ti.Platform.osname == 'android'?'left':'left',
		
	});
	
          
myPropertyDetailsWindow.add(propertyNameTextField);

propertyAddrTextField=Ti.UI.createTextArea(
	{
		left:'40%',
		width:'55%',
		value:PropertyAddr,
		enabled:false,
		horizontalWrap:true,
		height:'15%',
		
		font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'16dp'}
								 :{fontSize:'16dp'},
		color:glblDarkGrayFont,
		textAlign:'left',
		top:Ti.Platform.osname=='android'?'23%':'12%',
	
		backgroundColor:'#fff',
      
        textAlign:Ti.Platform.osname == 'android'?'left':'left',
		
	});
	  
myPropertyDetailsWindow.add(propertyAddrTextField);


var compareResultButton=Ti.UI.createButton(
	{
		width:Ti.Platform.osname=='android'?'43%':'130dp',
		height:Ti.Platform.osname=='android'?'90%':'40dp',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		right:Ti.Platform.osname=='android'?'53%':'53%',
		title:'Compare Results',
		color:'#fff',
		font:Ti.Platform.osname =='android'?{fontSize:'17dp'}:{fontSize:'15%'},
		borderRadius:3,
		backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
	});
var addFeasibilityButton=Ti.UI.createButton(
	{
		width:Ti.Platform.osname=='android'?'43%':'130dp',
		height:Ti.Platform.osname=='android'?'90%':'40dp',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		left:Ti.Platform.osname=='android'?'53%':'53%',
		title:'Add Feasibility',
		color:'#fff',
		font:Ti.Platform.osname =='android'?{fontSize:'17dp'}:{fontSize:'15%'},
		borderRadius:3,
		backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
	});	
	
var btnView=Ti.UI.createView(
	{
		width:'100%',
		height:'10%',
		
		top:Ti.Platform.osname=='android'?'40%':'30%',
	});	
	
btnView.add(compareResultButton);
btnView.add(addFeasibilityButton);
myPropertyDetailsWindow.add(btnView);

compareResultButton.addEventListener('click',function(e){
	btnSelector(compareResultButton);
	if(Ti.Platform.osname == 'android')
	{
		Ti.App.QwikFeasoGlobalVars.SelectedPropertyID = PropertyId;
	}
	else{
		QwikFeasoGlobalVars.SelectedPropertyID = PropertyId;
	}
	
	 var FeasibilityList=[];
	 FeasibilityList=FeasibilityListToCompare();
	if(FeasibilityList.length >= 2)
	{
		var viewName='CompareFeasibility';
		var popupwin = require("ui/common/popup");
		new popupwin(viewName,'').open();
	}
	else
	{
		alert('Atleast two feasibilities must be added for comparison.');
	}
	
	
		
});


addFeasibilityButton.addEventListener('click',function(e){
	btnSelector(addFeasibilityButton);
	
	if(Ti.Platform.osname == 'android')
  	{
		Ti.App.QwikFeasoGlobalVars.feasoName ='Detailed Feasibility';
		Ti.App.QwikFeasoGlobalVars.feasoTrack='d';
		Ti.App.QwikFeasoGlobalVars.CalledFromPropDetails ='true';
		Ti.App.QwikFeasoGlobalVars.SelectedPropertyID = PropertyId;
		DeleteScenarioDetailePage();
		var fromWin=1;	//to recognize win called from either Setting or ScenarioDetails
		var winTitle='QwikFeaso';
		var winOpen=require('ui/common/Scenarios');
		new winOpen(winTitle,fromWin).open();
	}
	else
	{
		QwikFeasoGlobalVars.feasoName ='Detailed Feasibility';
		QwikFeasoGlobalVars.feasoTrack='d';
		QwikFeasoGlobalVars.CalledFromPropDetails ='true';
		QwikFeasoGlobalVars.SelectedPropertyID = PropertyId;
		DeleteScenarioDetailePage();
		var fromWin=1;	//to recognoze win called from either Setting or ScenarioDetails
		var winTitle='QwikFeaso';
		var winOpen=require('ui/common/Scenarios');
		navGroup.open(new winOpen(winTitle,fromWin),{animated: true});
	}	
	
});


function setDataToFeasibilityTable () {
	var tableData=[];
	var feasiblityData=[];
	var rowHt=(Ti.Platform.displayCaps.platformHeight*10)/100;
	feasiblityData=getPropertyFeasibilityList(PropertyId);
	
	for(var cnt=0;cnt<feasiblityData.length;cnt++)
	{
		propertyFeasibilityRow[cnt] = Ti.UI.createTableViewRow({
			backgroundColor:'#fff',
			height:rowHt,
			editable:false,
			className:'Feasibility',
			rowID:feasiblityData[cnt].feasibilityID,
			rowName:feasiblityData[cnt].feasibilityname,
			selectedBackgroundColor:'#fff'
		});
		feasibilityNameLabel[cnt]=Ti.UI.createLabel(
				{
					left:'15dp',
					width:'85%',
					rowID:feasiblityData[cnt].feasibilityID,
					rowName:feasiblityData[cnt].feasibilityname,
					text:feasiblityData[cnt].feasibilityname,
					font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
									 ?{fontSize:'20%',fontWeight:'bold'}
									 :{fontSize:'20dp',fontWeight:'bold'},
					color:glblDarkGrayFont,
					textAlign:'left',
				});
				
		deleteSign[cnt] =Ti.UI.createButton(
		 	{
		 		id:feasiblityData[cnt].feasibilityID,
		 		rowID:feasiblityData[cnt].feasibilityID,
				rowName:feasiblityData[cnt].feasibilityname,
		 		backgroundImage:globalImgPath+'cross_btn.png',
		 		width:Ti.Platform.osname == 'android'?'30dp':'20dp',
		 		height:Ti.Platform.osname == 'android'?'30dp':'20dp',
		 		right:'3%',//SetCustomLeftPosition(-2),
		 	});
	 	
		
		propertyFeasibilityRow[cnt].add(feasibilityNameLabel[cnt]);
		propertyFeasibilityRow[cnt].add(deleteSign[cnt]);
		
		
		tableData.push(propertyFeasibilityRow[cnt])	
	}
	feasibilityTableView.data=tableData;
	
	
  
}



feasibilityTableView.addEventListener('click',function(e)
{
	
	/*myPropertyDetailsWindow.add(actvityIndicatorView);
				actInd.show();*/
	
	
	var FeasibilityID= e.source.rowID;
	var FeasibilityName= e.source.rowName;
	
	Ti.API.info(' Source:'+e.source.toString());
	
	
	
 if(e.source.toString() == '[object TiUIButton]' || e.source.toString() == '[object Button]')
	{
		btnSelector(e.source);
		var alerDialog=Ti.UI.createAlertDialog({
				message:'Are you sure you want to permanantly delete this Feasibility? ',
				buttonNames: ['Yes','No']
			});
			alerDialog.addEventListener('click', function(ev) {
			    if (ev.index == 0) { 
			   		Ti.API.info('deleting feasibility : '+e.source.id+' for property id : '+PropertyId)
			    	deleteScenarioToProperty(e.source.id,PropertyId);
					Ti.App.fireEvent('RefreshView', {});
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
		if (Ti.Platform.osname == 'android')
		{
			var OpenSummaryWin=require('ui/common/FeasibilityDetails');
			new OpenSummaryWin(FeasibilityID).open();
		}
		else
		{
			var OpenSummaryWin=require('ui/common/FeasibilityDetails');
			navGroup.open(new OpenSummaryWin(FeasibilityID),{animated: true});
		}
		
	}
	
	/*actInd.hide();
 	 myPropertyDetailsWindow.remove(actvityIndicatorView);*/
		
});	

/*
   Function: Set the header for Android devices
   
   @param {Object) headerView					View object that holds the container to the headerLabel  
   @param {Object} headerLabel					Label object that holds the name of header
   @param {Object) leftBtn						Left button object for going back 
   @param {Object) rightBtn						Right button object for saving the settings (name,address,photo) for property
   @param {Object) myPropertyDetailsWindow		Window object that holds all the above objects
   @memberOf headerLabel						View that is a member of Header.js file
   @memberOf leftBtn							View that is a member of Header.js file
   @memberOf rightBtn							View that is a member of Header.js file
   @memberOf headerView							View that is a member of Header.js file
*/
function setHeader () {
	
		headerLabel.text='Property Detail';
		
		leftBtn.title='Back';
		rightBtn.title='Edit';
		rightBtn.id='button';
		headerView.add(leftBtn);						
		headerView.add(headerLabel);
		headerView.add(rightBtn);
		
		myPropertyDetailsWindow.add(headerView);
  
}
			
		//myPropertyDetailsWindow.add(actInd);		
	
return myPropertyDetailsWindow;

}

module.exports=OpenPropertyDetailWin;