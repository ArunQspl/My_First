/*
   Function: Window for Editing existing scenario
   
   @param {Object} EditScenarioWin		Window object
   @param {Object) accounting			Holds the instance of accounting.js file. 
   @return {Object}						Returns current window object
*/

function winOpen (winTitle,fromWin,rowName,rowId) {
  var EditScenarioWin;
  var accounting;
  var ScenarioNameTextField = [];
  var rowValueTextField = [];
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
  	 EditScenarioWin=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
  				windowSoftInputMode:Ti.UI.Android.SOFT_INPUT_ADJUST_PAN,
	  			});
	  			
	 setHeader(); 	
	 	
	 // Handle back press 
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
	 	EditScenarioWin.close();});
	 
	 // Save changes to the selected scenario  
	  rightBtn.addEventListener('click',function(e){
	  	btnSelector(rightBtn);
	  	var alerDialog=Ti.UI.createAlertDialog({
					message:'Are you sure you want to permanantly delete this Development Strategy? ',
					buttonNames: ['Yes','No']
				});
				alerDialog.addEventListener('click', function(ev) {
					
				    if (ev.index == 0) { 
				   	Ti.App.QwikFeasoGlobalVars.SummaryUpdated=1;  	
				    	deleteScenario();
			  			EditScenarioWin.close();
				     // clicked "Yes"
				    } else if (ev.index == 1) { 
				    	
				    	alerDialog.hide();
				      // clicked "No"
				    }
				   
				  });
				alerDialog.show();
		  	
	  });
	
	 EditScenarioWin.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	 //EditScenarioWin.windowSoftInputMode=Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
	
  }
  else
  {
  	accounting=require('lib/accounting');
  	//Window Created for iphone to suport navigation Bar
  	EditScenarioWin=Ti.UI.createWindow({
 			 backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			//title:'Development Strategy',
			titleControl:Ti.UI.createLabel({text:'Development Strategy',
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
		    navGroup.close(EditScenarioWin,{animated: true});
		    
		  });
  
		  lftNavView.add(BackBtn);
		
		  EditScenarioWin.leftNavButton=lftNavView;
		  
		  
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
			  
		  // Save changes to the selected scenario	  
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);
		  	var alerDialog=Ti.UI.createAlertDialog({
					message:'Are you sure you want to permanantly delete this Development Strategy? ',
					buttonNames: ['Yes','No']
				});
				alerDialog.addEventListener('click', function(ev) {
					
				    if (ev.index == 0) { 
				   	QwikFeasoGlobalVars.SummaryUpdated=1;
			    	deleteScenario();
			    	navGroup.close(EditScenarioWin,{animated: true});
				     // clicked "Yes"
				    } else if (ev.index == 1) { 
				    	
				    	alerDialog.hide();
				      // clicked "No"
				    }
				   
				  });
				alerDialog.show();
		  	
		  });
		  
		  rightView.add(RightBtn);
		  EditScenarioWin.rightNavButton=rightView;
		  
   
  }
  EditScenarioWin.orientationModes=[Ti.UI.PORTRAIT ];
  
/*
   Function: Getting default values of Cost elements for selected scenario 
   
   @param {String} ceId					Holds the Cost Element Id
   @memberOf getDefaultsForScenario		Function is member of GetFromDatabase.js file
   
   
*/
  
  function getDefaultValue (ceId) {
  var fieldVal=[] 
  fieldVal = getDefaultsForScenario(rowId); // rowId = Scenario Id
  
    for(var i=0;i<fieldVal.length;i++)
    {
    	Ti.API.info('cost element values : '+' : '+fieldVal[i].CEId+' : '+ceId+' : '+fieldVal[i].DefaultValue);
    	if(fieldVal[i].CEId == ceId)
    	{
    		return fieldVal[i].DefaultValue;
    	}
    }
  }
  
  
 ScenarioNameTextField = Ti.UI.createTextField({
             left: '5%',
             right:'30%',
             //height:'10'
             top:Ti.Platform.osname == 'android'?'12%':'2%',
             value:rowName,
             backgroundColor:'#fff',
             hintText:'Name for Dwelling',
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
        	ScenarioNameTextField.height='10%';
        }

EditScenarioWin.add(ScenarioNameTextField);


// Create a Button.
var saveBtn = Ti.UI.createButton({
	title : 'Save',
	height : '8%',
	width : '20%',
	style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
	top :Ti.Platform.osname == 'android'?'12%':'3%',
	right : Ti.Platform.osname == 'android'?'3%':'2%',
	font:Ti.Platform.osname =='android'
								 ?{fontSize:'17dp'}
								 :{fontSize:'17%'},
	backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
	borderRadius:5,
	color:'white',
			
});

 saveBtn.addEventListener('click',function(e){
 	btnSelector(saveBtn);
 	EditScenarioWin.add(actvityIndicatorView);
 		actInd.show();
		  	if(Ti.Platform.osname == 'android')
			  {
			  	if(ScenarioNameTextField.value != '')
			  	{
			  		//getUserDefaultValuesForScenario();
				  	Ti.App.QwikFeasoGlobalVars.SummaryUpdated=1;
				  	var isEmpty = getUserDefaultValuesForScenario();
					if(isEmpty == false)
						EditScenarioWin.close();
					
			  	}
			  	else{
			  		alert('Please provide name of the Development Strategy');
			  	}
			  	
			}
			  else
			  {
			  	if(ScenarioNameTextField.value != '')
			  	{
				  	//getUserDefaultValuesForScenario();
				  	QwikFeasoGlobalVars.SummaryUpdated=1;
				  	var isEmpty = getUserDefaultValuesForScenario();
					if(isEmpty == false)
						navGroup.close(EditScenarioWin,{animated: true});
			  		
		  		}
		  		else{
		  			alert('Please provide name of the Development Strategy');
		  		}
			  }
			actInd.hide();
   		EditScenarioWin.remove(actvityIndicatorView);
 	
 	 
  
		  });
		  
/*
   Function: Get user entered values of Cost Elements for selected scenario
   
   @param {List} scenarioCostGroup					Holds the current Cost Group details
   @param {List} scenarioCostElement				Holds the current Cost element details
   @param {List) rowValueTextField					Get user values from Edit Text
   @memberOf updateUserDefaultValuesForScenario		Function is member of DatabaseTransaction.js file
   
*/
function getUserDefaultValuesForScenario(){
	var emptyTxt = [];
	var isEmpty = false;
		  	for(var j=0;j<scenarioCostGroup.length;j++)
			{
							
				for(var i=0;i<scenarioCostElement.length;i++)
				{
					if(scenarioCostGroup[j].CostGroupingID == scenarioCostElement[i].CostGroupingID)
					{
						//Ti.API.info('values for saving '+rowValueTextField[i].value+' feasibilty : '+rowId);
						if(rowValueTextField[i].value != '')
						{
							if(scenarioCostElement[i].HasUnitSign == '$')
					     			rowValueTextField[i].value=rowValueTextField[i].value.replace(/[^a-zA-Z 0-9]+/g,'');
					     			
					     	updateUserDefaultValuesForScenario('',ScenarioNameTextField.value,scenarioCostElement[i].CostElementID,rowId,rowValueTextField[i].value);		
						}
						else
						{
							isEmpty = true;
							emptyTxt.push(i);
							rowValueTextField[i].backgroundColor='#f00';
						}
					}
				 
				}
			}
			
	if(isEmpty == true)
		{
			alert('Some Required data is missing, please update and try again');
			rowValueTextField[emptyTxt[0]].focus();
		}
	
	return isEmpty;		
}		

/*
   Function: Deletes the selected scenario
   
   @param {String} rowId					Scenario Id to be deleted
   @memberOf deleteScenarioDetails		Function is member of DatabaseTransaction.js file
   
*/

function  deleteScenario () {
  deleteScenarioDetails(rowId);
  
}  
		  


EditScenarioWin.add(saveBtn);

					
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


if(Ti.Platform.osname == 'iphone')
{
	scrollView.top='15%';
}

EditScenarioWin.add(actvityIndicatorView);
actInd.show();
setTimeout(function(){
	
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


EditScenarioWin.add(scrollView); 
	
	actInd.hide();
	EditScenarioWin.remove(actvityIndicatorView);
	
},100);





  
     //Only for Android
  function setHeader () {
			  	headerLabel.text='Development Strategy';
			  	headerLabel.width = '60%';
				headerView.add(headerLabel);
				
				leftBtn.title='Back';
				headerView.add(leftBtn);
				
				rightBtn.title='Delete';
				headerView.add(rightBtn);
				
				//headerView.height = '50dp';
				EditScenarioWin.add(headerView);
				
				}
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
           	
            var Val = 0;
           	Val = getDefaultValue(scenarioCostElement[i].CostElementID);
           	
          		
          	if(scenarioCostElement[i].HasUnitSign == '$'){
          		Val=accounting.formatMoney(Val);
          	}
          		
          		
       rowValueTextField[i] = Ti.UI.createTextField({
             right: '7%',
             width: '25%', 
             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			
             height: '55%', 
			 backgroundColor:'#fff',
             borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             color:glblDarkGrayFont,
			 paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
             textAlign:Ti.Platform.osname == 'android'?'right':'right',
          	 value:''+Val,
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
           
           rowValueTextField[i].addEventListener('change',function(e)
          	{
          		rowValueTextField[i].backgroundColor='#fff';
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
        
         
   EditScenarioWin.add(actInd);      			
				
  return EditScenarioWin;
}
module.exports=winOpen;