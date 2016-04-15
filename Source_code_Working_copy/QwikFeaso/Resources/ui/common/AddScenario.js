/**
 * @projectDescription QwikFeaso
 * 
 * @author List- vivek Gidmare(vivek.gidmare@quagnitia.com),Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window for Adding new scenario
   
   @param {Object} addScenarioWin		Window object
   @param {Object) accounting			Holds the instance of accounting.js file. 
   @return {Object}						Returns current window object
*/


function winOpen (winTitle,fromWin) {
  var addScenarioWin;
  var accounting;
  var rowValueTextField = [];
  var ScenarioNameTextField;
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
  	accounting=require('/lib/accounting');
  	 addScenarioWin=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 		
	 
	 // Handle back press 
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
	 	/*
	 	 * Logic to navigate away from current page
	 	 * If any changes has been made and User clicks 'Back' then a confirmation dialog will be shown, asking whether to navigate or not 
	 	 */
	 	var navigate = getData();
	 	if(navigate == false)
		 	{
		 		var alerDialog=Ti.UI.createAlertDialog({
					message:'Are you sure you want to navigate away from this page? ',
					buttonNames: ['Yes','No']
				});
				alerDialog.addEventListener('click', function(ev) {
				    if (ev.index == 0) { 
				    	addScenarioWin.close();
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
		 		addScenarioWin.close();
		 	}
	 	
	 	});
	 
	 // Adds a new scenario
	 rightBtn.addEventListener('click',function(e){
	 	btnSelector(rightBtn);
	 	addScenarioWin.add(actvityIndicatorView);
 		actInd.show();
			if(ScenarioNameTextField.value != '')
		  	{
				Ti.App.QwikFeasoGlobalVars.SummaryUpdated = 1;
			  	addScenario();
			  	addScenarioWin.close();
		  	}
		  	else
		  	{
		  		alert('Please provide name of the Development Strategy');
		  	}
		  	
		 actInd.hide();
   		addScenarioWin.remove(actvityIndicatorView); 	
	 });
	
	 addScenarioWin.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	 //addScenarioWin.windowSoftInputMode=Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
	
  }
  else // iPhone or iPad specific code
  {
  	accounting=require('lib/accounting');
  	//Window Created for iphone to suport navigation Bar
  	addScenarioWin=Ti.UI.createWindow({
  	backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			//title:'New Development Strategy',
			titleControl:Ti.UI.createLabel({text:'New Development Strategy',
			width:'60%',
			color:'white',
			wordWrap:'off',
			textAlign:'center',
			font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'18dp',fontWeight:'bold'}
								 :{fontSize:'30%',fontWeight:'bold'},
			}),
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
		 /*
	 	  * Logic to navigate away from current page
	 	  * If any changes has been made and User clicks 'Back' then a confirmation dialog will be shown, asking whether to navigate or not 
	 	  */
		 	var navigate = getData();
		 	if(navigate == false)
			 	{
			 		var alerDialog=Ti.UI.createAlertDialog({
						message:'Are you sure you want to navigate away from this page? ',
						buttonNames: ['Yes','No']
					});
					alerDialog.addEventListener('click', function(ev) {
					    if (ev.index == 0) { 
					    	navGroup.close(addScenarioWin,{animated: true});
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
			 		navGroup.close(addScenarioWin,{animated: true});
			 	}
		    
		    
		  });
  
		  lftNavView.add(BackBtn);
		
		addScenarioWin.leftNavButton=lftNavView;
		
		
		var rightView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					
					backgroundColor:'#0000',
					layout:'horizontal'
					
				});

		  var RightBtn = Ti.UI.createButton({
			      title : 'Save',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
			  });
			  
		  // Adds a new scenario	  
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);  
		  	addScenarioWin.add(actvityIndicatorView);
 			actInd.show();
		  	if(ScenarioNameTextField.value != '')
		  	{
		  		QwikFeasoGlobalVars.SummaryUpdated = 1;
			  	addScenario();
			  	navGroup.close(addScenarioWin,{animated: true});
		  	}
		  	else
		  	{
		  		alert('Please provide name of the Development Strategy');
		  	}
		  	
		 actInd.hide();
   	addScenarioWin.remove(actvityIndicatorView); 	
		  });
		  
		  rightView.add(RightBtn);
		  addScenarioWin.rightNavButton=rightView;
   
  }
  addScenarioWin.orientationModes=[Ti.UI.PORTRAIT ];
  
  
 // Name of scenario 
 ScenarioNameTextField = Ti.UI.createTextField({
             left: '10%',
             right:'10%',
             top:Ti.Platform.osname=='android'?'12%':'2%',
             backgroundColor:'#fff',
             hintText:'Name for Development Strategy',
             keyboardType: Ti.UI.KEYBOARD_DEFAULT,
			 borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'17%'},
             textAlign:Ti.Platform.osname == 'android'?'left':'center',
       });
       
       ScenarioNameTextField.addEventListener('focus', function (e){
				ScenarioNameTextField.borderWidth = 3;
			});  
			
		ScenarioNameTextField.addEventListener('blur', function (e){
				ScenarioNameTextField.borderWidth = 1;
		}); 
         
        if(Ti.Platform.osname == 'android')
        {
        	//ScenarioNameTextField.softKeyboardOnFocus= Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;	
			
        }
        else
        {
        	ScenarioNameTextField.height= '10%'; // SetCustomHeight(10)
        }

addScenarioWin.add(ScenarioNameTextField);

var scenarioCostElement = [];
scenarioCostElement = GetDefaultsForCostElementList();	
var scenarioCostGroup = [];
scenarioCostGroup = GetDefaultsForCostGroupList();

var rowHt=(Ti.Platform.displayCaps.platformHeight*13)/100; 
var sectionRowHt=(Ti.Platform.displayCaps.platformHeight*7)/100;
var rowData=[];
  
var scrollView = Ti.UI.createScrollView({
	top:'25%',
    contentHeight: 'auto',
    layout: 'vertical'
});

if(Ti.Platform.osname =='iphone')
{
	scrollView.top='15%';
}

// Creates scrolling view
for(var j=0;j<scenarioCostGroup.length;j++)
{
	var HeaderRow=createHeaderRow(j);
	scrollView.add(HeaderRow);
	
	for(var i=0;i<scenarioCostElement.length;i++)
	{
		if(scenarioCostGroup[j].CostGroupingID == scenarioCostElement[i].CostGroupingID)
		{
			var roww = createRow(i);
			scrollView.add(roww);
		}
	 
	}
}


addScenarioWin.add(scrollView);  

/*
 * Function indicating whether User has changed or given any values (Used for navigation decision on Back button press)
 */

function getData () {
	var navigate = true;
	
	if(ScenarioNameTextField.value !== '')
	{
		navigate = false;
		return navigate;
	}
	
	for(var j=0;j<scenarioCostGroup.length;j++)
		{
			for(var i = 0; i <scenarioCostElement.length; i++)
					{
						if(scenarioCostGroup[j].CostGroupingID == scenarioCostElement[i].CostGroupingID)
						{
							if(rowValueTextField[i].value !== '')
							{
								navigate = false;
								return navigate; 
							}
						}
					}
		}				
  
}

/*
   Function: Adds a new scenario
   
   @param {List} scenarioCostElement		Holds the structure for adding a new scenario
   @param {List) rowValueTextField			Get user values from Edit Text
   @memberOf addScenarioDetails				Function is member of DatabaseTransaction.js file
   @memberOf setDefaultsForScenario				Function is member of DatabaseTransaction.js file
   
*/
function  addScenario () {
	/*
	 * Adds a new scenario
	 */
	addScenarioDetails(ScenarioNameTextField.value);
	
	/*
	 * Sets default values to the new scenario
	 * @memberOf setDefaultsForScenario	Is a member of DatabaseTransaction.js file
	 */
  	for(var j=0;j<scenarioCostGroup.length;j++)
		{
			for(var i = 0; i <scenarioCostElement.length; i++)
					{
						if(scenarioCostGroup[j].CostGroupingID == scenarioCostElement[i].CostGroupingID)
						{
							
							if(scenarioCostElement[i].HasUnitSign == '$')
							{
								if(rowValueTextField[i].value == '')
									rowValueTextField[i].value = '0';
								else
									rowValueTextField[i].value=rowValueTextField[i].value.replace(/[^a-zA-Z 0-9]+/g,'');	
							}
							else
							{
								if(rowValueTextField[i].value == '')
									rowValueTextField[i].value = '0';
							}
									
							Ti.API.info('user values : '+scenarioCostElement[i].Name+' : '+rowValueTextField[i].value);
							setDefaultsForScenario(scenarioCostGroup[j].CostGroupingID,scenarioCostElement[i].CostElementID,rowValueTextField[i].value);
						}
					}	
		}	
		
  }
 
  
/*
   Function: Set the header for Android devices
   
   @param {Object) headerView			View object that holds the container to the headerLabel  
   @param {Object} headerLabel			Label object that holds the name of header
   @param {Object) leftBtn				Left button object for going back 
   @param {Object) rightBtn				Right button object for adding a new scenario
   @param {Object) addScenarioWin		Window object that holds all the above objects
   @memberOf headerLabel				View that is a member of Header.js file
   @memberOf leftBtn					View that is a member of Header.js file
   @memberOf rightBtn					View that is a member of Header.js file
   @memberOf headerView					View that is a member of Header.js file
*/
  function setHeader () {
			  	headerLabel.text='New Development Strategy';
			  	headerLabel.width = '60%';
				headerView.add(headerLabel);
				
				leftBtn.title='Back';
				headerView.add(leftBtn);
				
				rightBtn.title='Save';
				headerView.add(rightBtn);
				
				//headerView.height = '50dp';
				addScenarioWin.add(headerView);
				
				}
				
/*
   Function: Create a header for the list of cost group along with their corresponding cost element 
   
   @param {View) rowHeader				Holds rowHeaderLabel 
   @param {Label} rowHeaderLabel		Holds the name of the Room category 
   @return 								Returns the reference to the rowHeader 
   
*/				
function createHeaderRow(i) {
             var rowHeader = Ti.UI.createView({
	           width:'100%', 
               height: sectionRowHt,
               top: 0, 
               left: 0,
               backgroundGradient:{type:'linear',colors:['#b4b4b4','#969696'],startPoint:{x:0,y:0},endPoint:{x:2,y:100},backFillStart:false},

           });
             var rowHeaderLabel=Ti.UI.createLabel(
           	{ 	text:''+scenarioCostGroup[i].Name,
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
         
 /*
   Function: Create a row for the list of cost groups and their corresponding cost element
   
   @param {View) row										Holds rowLabel 
   @param {Label} rowLabel									Holds the name of the row (cost element)
   @param {Label} unitLabel									Holds the unit ($)
   @param {List of Edit Texts} rowValueTextField			Holds the list of Edit Text
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
              
           });
          var rowLabel=Ti.UI.createLabel(
           	{
           		width:'60%',
           		height:'100%',
           		text:''+scenarioCostElement[i].Name,
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
             });
            
		        /*if(Ti.Platform.osname == 'android')
		        {
		        	rowValueTextField[i].softKeyboardOnFocus= Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;	
					
		        }*/
		        
		      rowValueTextField[i].addEventListener('focus', function (e){
				rowValueTextField[i].borderWidth = 3;
			});  
			
		  
		      rowValueTextField[i].addEventListener('blur',function(e){
		      	rowValueTextField[i].borderWidth = 1;
          			if(scenarioCostElement[i].HasUnitSign == '$')
	          			{
	          			rowValueTextField[i].value=accounting.formatMoney(rowValueTextField[i].value);
	          			}
           		});   
		        
		    if(scenarioCostElement[i].HasUnitSign != '')
			{
				var unitLabel=Ti.UI.createLabel(
					{
						width:'10%',
						right:'32%',
						textAlign:'right',
						font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
						text:''+scenarioCostElement[i].HasUnitSign,
						color:glblDarkGrayFont
					});
									
				row.add(unitLabel);	
			}    
		        
            row.add(rowLabel);
            row.add(rowValueTextField[i]);
          
             
            return row;
         }        
         
         
         			
				
  return addScenarioWin;
}
module.exports=winOpen;