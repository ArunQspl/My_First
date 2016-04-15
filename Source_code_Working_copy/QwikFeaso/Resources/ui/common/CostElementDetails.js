/**
 * @projectDescription QwikFeaso
 * 
 * @author List- vivek Gidmare(vivek.gidmare@quagnitia.com),Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window for Current Cost Element default values for each Scenarios
   
   
   @param {Object} DetailCostElementWin		Window object
   @param {Object) accounting				Holds the instance of accounting.js file. 
   @return {Object}							Returns current window object
*/


function winOpen (winSubTitle,CostGroupID,CostElemetID) {
	var DetailCostElementWin;
	var accounting;
	var rowValueTextField = [];
	var CostElementNameTextField;
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
	  	
	  	 DetailCostElementWin=Ti.UI.createWindow({
	  				backgroundColor:'#fff',
	  				navBarHidden:true,
		  			});
		  			
		 setHeader(); 		
		 
		 // Handle back press 
		 leftBtn.addEventListener('click',function(e){
		 	btnSelector(leftBtn);
		 	DetailCostElementWin.close();});
		 
		 // Deletes the current Cost Element
		 rightBtn.addEventListener('click',function(e){
		 	btnSelector(rightBtn);
		 	/*
		 	 * Confirmation whether to delete selected Cost Element 
		 	 */
		 	var alerDialog=Ti.UI.createAlertDialog({
				message:'Are you sure you want to permanantly delete this Cost Element? ',
				buttonNames: ['Yes','No']
			});
			alerDialog.addEventListener('click', function(ev) {
			    if (ev.index == 0) { 
			   		Ti.App.QwikFeasoGlobalVars.SummaryUpdated=1;  	
			    	deleteCE();
		  			DetailCostElementWin.close();
			     // clicked "Yes"
			    } else if (ev.index == 1) { 
			    	
			    	alerDialog.hide();
			      // clicked "No"
			    }
			  });
			alerDialog.show();
		 	
		 	});
		 	
		 //DetailCostElementWin.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;	
		 DetailCostElementWin.windowSoftInputMode=Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;

  }
  else // iPhone or iPad specific code
  {
		  	accounting=require('lib/accounting');
		  	//Window Created for iphone to suport navigation Bar
		  	DetailCostElementWin=Ti.UI.createWindow({
		  	backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			//title:'Cost Element Details',
			titleControl:Ti.UI.createLabel({text:'Cost Element Details',
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
		    navGroup.close(DetailCostElementWin,{animated: true});
		    
		  });
  
		  lftNavView.add(BackBtn);
		
		  DetailCostElementWin.leftNavButton=lftNavView;
		  
		  
		  var rightView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					backgroundColor:'#0000',
					layout:'horizontal'
					
				});

		  var RightBtn = Ti.UI.createButton({
			      title : 'Delete',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
			  });
			  
		  // Deletes the current Cost Element
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);
		  	/*
		 	 * Confirmation whether to delete selected Cost Element 
		 	 */
		  	var alerDialog=Ti.UI.createAlertDialog({
				message:'Are you sure you want to permanantly delete this Cost Element? ',
				buttonNames: ['Yes','No']
			});
			alerDialog.addEventListener('click', function(ev) {
			    if (ev.index == 0) { 
			   		QwikFeasoGlobalVars.SummaryUpdated=1;  	
			    	deleteCE();
		  			navGroup.close(DetailCostElementWin,{animated: true});
			     // clicked "Yes"
			    } else if (ev.index == 1) { 
			    	
			    	alerDialog.hide();
			      // clicked "No"
			    }
			  });
			alerDialog.show();
		  	
		  });
		  
		  rightView.add(RightBtn);
		  DetailCostElementWin.rightNavButton=rightView;
		  
	
	}
	DetailCostElementWin.orientationModes=[Ti.UI.PORTRAIT];
	
	if (Ti.Platform.osname == 'android'){
		DetailCostElementWin.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}	
	
	
/*
   Function: Deletes specific Cost Element
   
   @param {Integer) CostElemetID		Cost Elements Id that needs to be deleted  
   @memberOf deleteCostElement			Function that is a member of DataBaseTransaction.js file
   
*/
	
function deleteCE(){
	deleteCostElement(CostElemetID);
}

var ScenarioList=[];
ScenarioList=GetFeasibilityList();
	
/*
   Function: Updates the default values of current Cost Element for each Scenario
   
   @param {List) ScenarioList						Holds the default values of current Cost Element for each Scenario  
   @param {List of Edit Text} rowValueTextField		Holds the user entered edit text values for current Cost Element
   @memberOf updateUserDefaultValuesForScenario		Function that is a member of DataBaseTransaction.js file
   
*/
function updateDefaults(){
	var emptyTxt = [];
	var isEmpty = false;
	for(var i=0;i<ScenarioList.length;i++)
	{
		Ti.API.info('user values'+rowValueTextField[i].value+'for feasibility : '+ScenarioList[i].MenuID);
		if(rowValueTextField[i].value != '')
		{
			rowValueTextField[i].value=rowValueTextField[i].value.replace(/[^a-zA-Z 0-9]+/g,'');
			updateUserDefaultValuesForScenario(CostElementNameTextField.value,ScenarioList[i].Name,CostElemetID,ScenarioList[i].MenuID,rowValueTextField[i].value);
		}	
		else
		{
			isEmpty = true;
			emptyTxt.push(i);
			rowValueTextField[i].backgroundColor='#f00';
		}
	}
	
	if(isEmpty == true)
		{
			alert('Some Required data is missing, please update and try again');
			rowValueTextField[emptyTxt[0]].focus();
		}
	
	return isEmpty;
} 	
			
				
var rowHt=(Ti.Platform.displayCaps.platformHeight*13)/100;
var sectionRowHt=(Ti.Platform.displayCaps.platformHeight*7)/100;


subHeaderLabel.text=winSubTitle;
subHeaderLabel.textAlign='left';
subHeaderLabel.font=Ti.Platform.osname =='android'?{fontSize:'23%',fontWeight:'bold'}:{fontSize:'15%',fontWeight:'bold'};
viewSubHeader.add(subHeaderLabel);
//DetailCostElementWin.add(viewSubHeader);


// Cost Element name
CostElementNameTextField = Ti.UI.createTextField({
			 value:winSubTitle,
             left: '5%',
             right:'10%',
             width:'70%',
             height:'10%',
             top:Ti.Platform.osname=='android'?'12%':'4%',
             backgroundColor:'#fff',
             hintText:'Name for Cost Element',
             keyboardType: Ti.UI.KEYBOARD_DEFAULT,
			 borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'17%'},
             textAlign:Ti.Platform.osname == 'android'?'left':'center',
       });
         
        CostElementNameTextField.addEventListener('focus', function (e){
				CostElementNameTextField.borderWidth = 3;
			});  
			
		CostElementNameTextField.addEventListener('blur', function (e){
				CostElementNameTextField.borderWidth = 1;
		}); 
		 
        /*if(Ti.Platform.osname == 'android')
        {
        	CostElementNameTextField.softKeyboardOnFocus= Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;	
			
        }*/
        
   
DetailCostElementWin.add(CostElementNameTextField);


// Create Save Button.
var saveBtn = Ti.UI.createButton({
	title : 'Save',
	height : '8%',
	width : '20%',
	style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
	top :Ti.Platform.osname == 'android'?'13%':'5%',
	right : Ti.Platform.osname == 'android'?'3%':'2%',
	font:Ti.Platform.osname =='android'
								 ?{fontSize:'17dp'}
								 :{fontSize:'17%'},
	backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
	borderRadius:5,
	color:'white',		
});


/*
   Function: Listener to Save button
   
   @param {String) CostElementNameTextField		Holds the name of current Cost Element 
   @param {String} SummaryUpdated				Global variable that decides whether to update current screen 
   @example										Button click first check whether user has provided with the
   												Cost element name, if no then alerts user to give the same else
   												updates the current default values and navigates back to 
   												list of Cost elements. Sets the SummaryUpdated variable to 1. 									
*/

saveBtn.addEventListener('click',function(e){
	btnSelector(saveBtn);
	DetailCostElementWin.add(actvityIndicatorView);
 	actInd.show();
		  	if(Ti.Platform.osname == 'android')
			  {
			  	if(CostElementNameTextField.value != '')
			  	{
			  		Ti.App.QwikFeasoGlobalVars.SummaryUpdated=1;
				 	var isEmpty = updateDefaults();
					if(isEmpty == false)
						DetailCostElementWin.close();
				 	
			  	}
			  	else
			  	{
			  		alert('Please provide name of the Cost Element');
			  	}
			  	
			}
			  else
			  {
			  	if(CostElementNameTextField.value != '')
			  	{
				  	QwikFeasoGlobalVars.SummaryUpdated=1;
				  	var isEmpty = updateDefaults();
					if(isEmpty == false)
						navGroup.close(DetailCostElementWin,{animated: true});
				  	
			  	}
			  	else
			  	{
			  		alert('Please provide name of the Cost Element');
			  	}
			  }
  
		 actInd.hide();
   	DetailCostElementWin.remove(actvityIndicatorView); 	
		  	//navGroup.close(EditScenarioWin,{animated: true});
		  });

DetailCostElementWin.add(saveBtn);

var scrollView = Ti.UI.createScrollView({
	top:'29%',
    contentHeight: 'auto',
    layout: 'vertical'
});

if(Ti.Platform.osname == 'android')
{
	//viewSubHeader.top='10%'
	scrollView.top='25%';
}
else
{
	viewSubHeader.top='0%'
	scrollView.top='19%';
}

var headerRow=createHeaderRow();
scrollView.add(headerRow);
for(var i=0;i<ScenarioList.length;i++)
{
	 var roww = createRow(i);
		       	scrollView.add(roww);
}

DetailCostElementWin.add(scrollView);

 
/*
   Function: Set the header for Android devices
   
   @param {Object) headerView				View object that holds the container to the headerLabel  
   @param {Object} headerLabel				Label object that holds the name of header
   @param {Object) leftBtn					Left button object for going back 
   @param {Object) rightBtn					Right button object for deleting Cost Element
   @param {Object) DetailCostElementWin		Window object that holds all the above objects
   @memberOf headerLabel					View that is a member of Header.js file
   @memberOf leftBtn						View that is a member of Header.js file
   @memberOf rightBtn						View that is a member of Header.js file
   @memberOf headerView						View that is a member of Header.js file
*/

  function setHeader () {
			  	headerLabel.text='Cost Element Details';
				headerLabel.width='50%';
				headerView.add(headerLabel);
				
				leftBtn.title='Back';
				headerView.add(leftBtn);
				
				rightBtn.title='Delete';
				headerView.add(rightBtn);
				
				
				DetailCostElementWin.add(headerView);
			
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
	          // id:'i'+i,
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
   Function: Gets the default value of Cost Element for each scenario
   
   @param {List) ScenarioDetails		Holds default value of Cost Element for each scenario 
   @param {String} ceId					Holds Cost Element Id of which default values has to be fetched 
   @param {String } feasId				Holds Scenario Id against which default values has to be fetched
   @return 								Returns default value of Cost Element for specified scenario
   
   
*/
     
function getDefaultVal(ceId,feasId){
	
	var ScenarioDetails = [];
	ScenarioDetails = getDefaultsForScenario(feasId);
	for(var i=0;i<ScenarioDetails.length;i++)
	{
		
		if(ScenarioDetails[i].CEId == ceId)
		{
			
			return ScenarioDetails[i].DefaultValue;
		}
	}
}   

/*
   Function: Create a row for the list of Cost Groups and their corresponding Cost Elements
   
   @param {View) row										Holds rowLabel 
   @param {Label} rowLabel									Holds the name of the row 
   @param {List of Edit Texts} rowValueTextField			Holds the user entered edit text values of current Cost Element for each scenario
   @param {List} ScenarioList								Holds the current default values of Cost Element for each scenario 
   @return 													Returns the reference to the row 
   
*/      

function createRow(i) {
	//Ti.API.info('values : '+ScenarioList[i].Name+' '+ScenarioList[i].)
		     var row = Ti.UI.createView({
               backgroundColor: 'white',
               borderColor: '#bbb',
               borderWidth: 1,
               width:'100%', 
               height: rowHt,
               top: 0, left: 0,
               id:'i'+i,
               RowCostGroupID:CostGroupID,
               RowCostElementID:CostElemetID,
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
       
       
      var defVal = getDefaultVal(CostElemetID,ScenarioList[i].MenuID);
      
      if(defVal == 0){
      	//defVal = '';
      }
      else{
      	defVal=accounting.formatMoney(defVal);
      }
      
      //Ti.API.info(' default values for scenarios : '+defVal+' '+ScenarioList[i].Name);
       rowValueTextField[i] = Ti.UI.createTextField({
             right: '7%',
             width: '25%', 
             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			 //value:,//ConvertedValueInDollor
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
               RowTFCostElementID:CostElemetID,
               RowTFFeasibilityID:ScenarioList[i].MenuID,
            
             value:''+defVal,
             });
        /*if(Ti.Platform.osname == 'android')    rowValueTextField[i].softKeyboardOnFocus= Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;	*/
        
        rowValueTextField[i].addEventListener('focus', function (e){
				rowValueTextField[i].borderWidth = 3;
		});  
			
		
		rowValueTextField[i].addEventListener('blur',function(e){
			rowValueTextField[i].borderWidth = 1;
        	rowValueTextField[i].value=accounting.formatMoney(rowValueTextField[i].value);
        });
           		
           		rowValueTextField[i].addEventListener('change',function(e)
          		{
          			rowValueTextField[i].backgroundColor='#fff';
          			
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
  
  return DetailCostElementWin;
}
module.exports=winOpen;