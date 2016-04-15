
/**
 * @projectDescription QwikFeaso
 * 
 * @author Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window for Adding a new Cost Element with default values for each Scenarios
   
   
   @param {Object} NewCostElementWin		Window object
   @param {Object) accounting				Holds the instance of accounting.js file. 
   @return {Object}							Returns current window object
*/


function winOpen (winSubTitle,CostGroupID) {
	var NewCostElementWin;
	var accounting;
	var rowValueTextField = [];
	var CostElementNameTextField;
	var selectedCGId = '';
	var selectedCGName = '';
	var RightBtn;
	var subHeaderTextLabel;
	if(Ti.Platform.osname == 'android') // android specific code
  	{
  		/*
  	 	 * Include the files needed for UI Design and Database usage
  	 	 * Header.js will manage navigation for android
  	 	 */
  	//Window Created for Android
  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
  	accounting=require('/lib/accounting'); 
  		Ti.include('/services/DataBaseTransaction.js')
  	Ti.include('/services/GetFromDataBase.js')	
  	
  	 NewCostElementWin=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 //setHeader(); 		
	 
	 // Handle back press
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
	 	var navigate = getData();
	 	if(navigate == false)
		 	{
		 		var alerDialog=Ti.UI.createAlertDialog({
					message:'Are you sure you want to navigate away from this page? ',
					buttonNames: ['Yes','No']
				});
				alerDialog.addEventListener('click', function(ev) {
				    if (ev.index == 0) { 
				    	NewCostElementWin.close();
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
		 		NewCostElementWin.close();
		 	}
	 	
	 	});
	 
	 // Adds a new Cost element 
	 rightBtn.addEventListener('click',function(e){
	 	btnSelector(rightBtn);
	 	 if(CostElementNameTextField.value != '')
		 {
	 		Ti.App.QwikFeasoGlobalVars.SummaryUpdated=1;
		  	newCostElement();
	 		NewCostElementWin.close();
		 }
		 else
		 {
		 	alert('Please provide name of the Cost Elements');
		 }
	 	
	 	});
	 	
	 	
		 //NewCostElementWin.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;	
		 NewCostElementWin.windowSoftInputMode=Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;

  }
  else // iPhone or iPad specific code
  {
		  	accounting=require('lib/accounting');
			  	NewCostElementWin=Ti.UI.createWindow({
			  	backgroundColor:'#fff',
				navBarHidden:false,
				tabBarHidden: true,
				barImage:'images/GrayNavBar.png',
				barColor:'#6d6e6f',
				title:'Cost Groups',
			
		 	 });	
	
	 		var BackBtn = Ti.UI.createButton({
			      title : 'Back',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
				visible:false,
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
		    var navigate = getData();
		 	if(navigate == false)
			 	{
			 		var alerDialog=Ti.UI.createAlertDialog({
						message:'Are you sure you want to navigate away from this page? ',
						buttonNames: ['Yes','No']
					});
					alerDialog.addEventListener('click', function(ev) {
					    if (ev.index == 0) { 
					    	navGroup.close(NewCostElementWin,{animated: true});
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
			 		navGroup.close(NewCostElementWin,{animated: true});
			 	}
		    
		    
		  });
  
		  lftNavView.add(BackBtn);
		
		  NewCostElementWin.leftNavButton=lftNavView;
		  
		  
		  var rightView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					
					backgroundColor:'#0000',
					layout:'horizontal'
					
				});

		  RightBtn = Ti.UI.createButton({
			      title : 'Save',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
				visible:false,
			  });
			  
		  // Adds a new Cost element 	  
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);
		  	if(CostElementNameTextField.value != '')
		  	{
		  		QwikFeasoGlobalVars.SummaryUpdated=1;
			  	newCostElement();
			  	navGroup.close(NewCostElementWin,{animated: true});
		  	}
		  	else
		  	{
		  		alert('Please provide name of the Cost Element');
		  	}
		  	
		  });
		  
		  rightView.add(RightBtn);
		  NewCostElementWin.rightNavButton=rightView;
		  
	
	}
	NewCostElementWin.orientationModes=[Ti.UI.PORTRAIT];
	
	
		
	/////////////////////
	
	var parentView = Ti.UI.createView({
		width:'100%',
		height:'100%',
		layout:'vertical',
		top:Ti.Platform.osname == 'android'?'50dp':0,
	});
	
	if(Ti.Platform.osname == 'android')
		setHeader();
	else{
		var subHeaderView=Ti.UI.createView({
					width:'100%',
					height:'6%',
					top:'0%',
					backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			});
			
			subHeaderTextLabel = Ti.UI.createLabel({
					text : 'Select a Cost group',
					color : '#fff',
					font:{fontSize:'16dp',fontWeight:'bold'},
					left : '5%',
					textAlign : 'left'
			});	
			subHeaderView.add(subHeaderTextLabel);
			parentView.add(subHeaderView);
	}	
		
	/////////////////////
	
NewCostElementWin.addEventListener('open', function (e) {
	getCostGroups();
	
});
	
var ScenarioList=[];
ScenarioList=GetFeasibilityList();


function getData () {
  var navigate = true;
	
	if(CostElementNameTextField.value !== '')
	{
		navigate = false;
		return navigate;
	}
	
	for(var i=0;i<ScenarioList.length;i++)
	{
		if(rowValueTextField[i].value != '')
		{
			navigate = false;
			return navigate;
		}
	}
	
	
} 
	
/*
   Function: Adds a new Cost Element
   
   @param {String) inWhichFeaso						Holds a string to identify that to which Feaso (Qwik/Detail), current Cost Group comes under  
   @param {List of Edit Text} rowValueTextField		Holds the user entered data Edit text values
   @param {List) ScenarioList						Holds the structure for adding a new Cost element 
   @param {String) CostGroupID						Holds the Cost Group Id for current Cost Element Id
   
   @memberOf inWhichFeasibility						Function that is a member of DataBaseTransaction.js file
   @memberOf addNewCostElement						Function that is a member of DataBaseTransaction.js file
   @memberOf insertIntoDefValForScenarios			Function that is a member of DataBaseTransaction.js file
  
*/

function newCostElement(){
	addNewCostElement(CostElementNameTextField.value,1,1,selectedCGId);
	for(var i=0;i<ScenarioList.length;i++)
	{
		 rowValueTextField[i].value=rowValueTextField[i].value.replace(/[^a-zA-Z 0-9]+/g,'');
		 insertIntoDefValForScenarios(selectedCGId,ScenarioList[i].MenuID,rowValueTextField[i].value);
	}
}

var scrollView = Ti.UI.createScrollView({
	top:'5dp',
    contentHeight: 'auto',
    layout: 'vertical'
});

var CGscrollView = Ti.UI.createScrollView({
		//top:Ti.Platform.osname == 'android'?'15%':'6%',
	    contentHeight: 'auto',
	    layout: 'vertical'
	});

/*if(Ti.Platform.osname == 'android')
{
	//viewSubHeader.top='0%'
	//scrollView.top='10%';
}
else
{
	viewSubHeader.top='0%'
	scrollView.top='19%';
}*/
	
var rowHt=(Ti.Platform.displayCaps.platformHeight*13)/100;
var sectionRowHt=(Ti.Platform.displayCaps.platformHeight*7)/100;		

/*
   Function: Set the header for Android devices
   
   @param {Object) headerView				View object that holds the container to the headerLabel  
   @param {Object} headerLabel				Label object that holds the name of header
   @param {Object) leftBtn					Left button object for going back 
   @param {Object) rightBtn					Right button object for deleting Cost Element
   @param {Object) NewCostElementWin		Window object that holds all the above objects
   @memberOf headerLabel					View that is a member of Header.js file
   @memberOf leftBtn						View that is a member of Header.js file
   @memberOf rightBtn						View that is a member of Header.js file
   @memberOf headerView						View that is a member of Header.js file
*/

  function setHeader () {
			headerLabel.text='Cost Groups';
			headerView.add(headerLabel);
				
			leftBtn.title='Back';
				
			headerView.add(leftBtn);
				
			rightBtn.title='Save'; 
			headerView.add(rightBtn);
			rightBtn.visible = false;
			leftBtn.visible = false;
			NewCostElementWin.add(headerView);
				
			subHeaderLabel.text='Select a Cost group';
			viewSubHeader.add(subHeaderLabel);
			parentView.add(viewSubHeader);
			viewSubHeader.top = '0%'
			
	}
				
/*
   Function: Create a header for the list default values of Cost Element for each scenario
   
   @param {View) rowHeader				Holds rowHeaderLabel 
   @param {Label} rowHeaderLabel		Holds the title 'Scenario' 
   @param {Label} rowHeaderValueLabel	Holds the title 'Default Value'
   @return 								Returns the reference to the rowHeader 
   
   
*/
  function createHeaderRow() {
  		 var rowHeader = Ti.UI.createView({
               width:'100%', 
               height: sectionRowHt,
               top: 0, 
               left: 0,
               backgroundGradient:{type:'linear',colors:['#b4b4b4','#969696'],startPoint:{x:0,y:0},endPoint:{x:2,y:100},backFillStart:false},

           });
           
          var rowHeaderLabel=Ti.UI.createLabel(
           	{ 	text:'Scenario',
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'14dp',fontWeight:'bold'}
								 :{fontSize:'12%',fontWeight:'bold'},
				color:'white',
				left:'3%',
           		touchEnabled:false
           	});
           var rowHeaderValueLabel=Ti.UI.createLabel(
           	{ 	text:'Default Value',
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'14dp',fontWeight:'bold'}
								 :{fontSize:'12%',fontWeight:'bold'},
				color:'white',
				right:'3%',
           		touchEnabled:false
           	});
           
           
             rowHeader.add(rowHeaderLabel);
     		 rowHeader.add(rowHeaderValueLabel);
       
            return rowHeader;
         }
         
/*
   Function: Create a row for the list of Cost Groups and their corresponding Cost Elements
   
   @param {View) row										Holds rowLabel 
   @param {Label} rowLabel									Holds the name of the row 
   @param {Label} unitLabel									Holds the sign/unit of the field ($,%)
   @param {List of Edit Texts} rowValueTextField			Holds the user entered edit text values of current Cost Element for each scenario
   @param {List} ScenarioList								Holds the current default values of Cost Element for each scenario 
   @return 													Returns the reference to the row 
   
*/          

function createRow(i) {
		     var row = Ti.UI.createView({
               backgroundColor: 'white',
               borderColor: '#bbb',
               borderWidth: 1,
               width:'100%', 
               height: rowHt,
               top: 0, left: 0,
               id:'i'+i,
               RowCostGroupID:CostGroupID,
               RowFeasibilityID:ScenarioList[i].MenuID,
              
           });
          var rowLabel=Ti.UI.createLabel(
           	{
           		width:'60%',
           		height:'100%',
           		text:''+ScenarioList[i].Name,
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'17%'},
           		left:'3%',
           		color:glblDarkGrayFont,
           		touchEnabled:false
           	});
       
       rowValueTextField[i] = Ti.UI.createTextField({
             right: '7%',
             width: '25%', 
             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
             color:glblDarkGrayFont,
			 paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
             height: '55%', 
			 backgroundColor:'#fff',
             borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
             textAlign:Ti.Platform.osname == 'android'?'right':'right',
          	   RowTFCostGroupID:CostGroupID,
               RowTFFeasibilityID:ScenarioList[i].MenuID,
             });
             
        /*if(Ti.Platform.osname == 'android')    
        	rowValueTextField[i].softKeyboardOnFocus= Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;	*/
        	
       rowValueTextField[i].addEventListener('focus', function (e){
				rowValueTextField[i].borderWidth = 3;
		}); 	
		
		rowValueTextField[i].addEventListener('blur',function(e){
			rowValueTextField[i].borderWidth = 1;
          	rowValueTextField[i].value=accounting.formatMoney(rowValueTextField[i].value);
        });
		
	
				var unitLabel=Ti.UI.createLabel(
					{
						width:'10%',
						right:'32%',
						textAlign:'right',
						font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
						text:'$',
						color:glblDarkGrayFont
					});
				
				row.add(unitLabel);	
			
             row.add(rowLabel);
            row.add(rowValueTextField[i]);
             
			
             
            return row;
         }	
         
var CostGroups = GetSettingCostElements();         
var row = [];  
       
function createCGRow (i) {
  row[i] = Ti.UI.createView({
               backgroundColor: 'white',
               borderColor: '#bbb',
               borderWidth: 1,
               width:'100%', 
               height: rowHt,
               top: 0, left: 0,
               id:'i'+i,
               RowCostGroupID:CostGroups[i].CostGroupID,
               Name:''+CostGroups[i].Name
           });
  var rowLabel=Ti.UI.createLabel(
           	{
           		width:'100%',
           		height:'100%',
           		text:''+CostGroups[i].Name,
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'17%'},
           		left:'3%',
           		color:glblDarkGrayFont,
           		touchEnabled:false
           	});
   row[i].add(rowLabel);
   
   row[i].addEventListener('click',function(e)
   {
   	if(Ti.Platform.osname === 'android'){
   		rightBtn.visible = true;
   		leftBtn.visible = true;
   		headerLabel.text='Cost Elements';
   	}
   	else{
   		NewCostElementWin.title = 'Cost Elements';
   		RightBtn.visible = true;
   		BackBtn.visible = true;
   	}
   			
   	selectedCGId = e.source.RowCostGroupID;
   	selectedCGName = e.source.Name;
   	parentView.remove(CGscrollView);
   	//cleanWindow(CGscrollView);
   	getCEDetails(e.source.RowCostGroupID,e.source.Name);
   });
   
   return row[i];
           	
}         
         
function getCostGroups () {
	
	/*subHeaderLabel.text='Select Cost Group';
	subHeaderLabel.textAlign='left';
	subHeaderLabel.font=Ti.Platform.osname =='android'?{fontSize:'16dp',fontWeight:'bold'}:{fontSize:'15%',fontWeight:'bold'};
	viewSubHeader.add(subHeaderLabel);
	NewCostElementWin.add(viewSubHeader);*/
	
           	
	for(var i=0;i<CostGroups.length;i++)
	{
		var roww = createCGRow(i);
		CGscrollView.add(roww);
	}
	
	/////////////////
	//NewCostElementWin.add(CGscrollView);
	parentView.add(CGscrollView);
	////////////////

}

function cleanWindow(winObj)
{
   NewCostElementWin.add(actvityIndicatorView);
    actInd.show();
    
    setTimeout(function(){
    	if (winObj.children) {
		        for (var i = winObj.children.length; i > 0; i--){
		            cleanWindow(winObj.children[i-1])
		            Ti.API.info( (i-1) + ") " + winObj.children[i-1]);
		            winObj.remove(winObj.children[i-1]);
		            winObj.children[i-1] = null;
		 
		        }
    		}
    	
    	actInd.hide();
    	NewCostElementWin.remove(actvityIndicatorView);
    	
    },100);
    
}

function getCEDetails (selectedCGId,selectedCGName) {
	/*subHeaderLabel.text=selectedCGName;
	subHeaderLabel.textAlign='left';
	subHeaderLabel.font=Ti.Platform.osname =='android'?{fontSize:'23%',fontWeight:'bold'}:{fontSize:'15%',fontWeight:'bold'};
	viewSubHeader.add(subHeaderLabel);
	NewCostElementWin.add(viewSubHeader);*/
	
	if(Ti.Platform.osname == 'android')
		subHeaderLabel.text=selectedCGName;
	else	
		subHeaderTextLabel.text = selectedCGName;
	
	CostElementNameTextField = Ti.UI.createTextField({
	             left: '10%',
	             right:'10%',
	             //top:Ti.Platform.osname=='android'?'17%':'7%',
	             top:'5dp',
	             backgroundColor:'#fff',
	             hintText:'Name for Cost Element',
	             keyboardType: Ti.UI.KEYBOARD_DEFAULT,
				 borderColor:glblLightGrayFont,
	             borderRadius:5,
	             borderWidth:1,
	             font:Ti.Platform.osname =='android' 
									 ?{fontSize:'27%'}
									 :{fontSize:'17%'},
	             textAlign:Ti.Platform.osname == 'android'?'left':'center',
	       });
	       
	       CostElementNameTextField.addEventListener('focus', function (e){
				CostElementNameTextField.borderWidth = 3;
			});  
			
		CostElementNameTextField.addEventListener('blur', function (e){
				CostElementNameTextField.borderWidth = 1;
		});   
	        if(Ti.Platform.osname == 'android')
	        {
	        	//CostElementNameTextField.softKeyboardOnFocus= Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;	
				
	        }
	        else
	        {
	        	CostElementNameTextField.height='10%';
	        }
	   
	///////////////////   
	//NewCostElementWin.add(CostElementNameTextField);
	//////////////////
	
	var headerRow=createHeaderRow();
	scrollView.add(headerRow);
	for(var i=0;i<ScenarioList.length;i++)
	{
		 var roww = createRow(i);
			       	scrollView.add(roww);
	}
	
	///////////////////
	//NewCostElementWin.add(scrollView);
	parentView.add(CostElementNameTextField);
	parentView.add(scrollView);
   ////////////////////
}
         
         
  NewCostElementWin.add(parentView);       
  
  return NewCostElementWin;
}
module.exports=winOpen;