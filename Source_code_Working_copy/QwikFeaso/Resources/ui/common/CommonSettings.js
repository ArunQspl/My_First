/**
 * @projectDescription QwikFeaso
 * 
 * @author List- vivek Gidmare(vivek.gidmare@quagnitia.com),Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window for Common Settings
   Displays the current common setting values and alloes user to update it.
   
   
   @param {Object} commonSettingWin		Window object
   @param {Object) accounting			Holds the instance of accounting.js file. 
   @return {Object}						Returns current window object
*/


function winOpen (winTitle,fromWin) {
	
	var commonSettingWin;
	var accounting;
	var rowBtn = [];
	var rowValueTextField = [];
	
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
  	
  	commonSettingWin=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,//It Will hide title bar in android
	  			});
	  			
	setHeader(); 		
	 
	// Handle back press 
	leftBtn.addEventListener('click',function(e){
		btnSelector(leftBtn);
		commonSettingWin.close();});
	
	// Saves the current setting values
	rightBtn.addEventListener('click', function(e){
		btnSelector(rightBtn);
		commonSettingWin.add(actvityIndicatorView);
 	actInd.show();
	//getSettingsData();
	var isEmpty = getSettingsData();
	if(isEmpty == false)
		commonSettingWin.close();
	actInd.hide();
   	commonSettingWin.remove(actvityIndicatorView);	
	
	});	
	
 	//commonSettingWin.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
 	commonSettingWin.windowSoftInputMode=Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
  }
  else // iPhone or iPad specific code
  {
  	//Window Created for iPhone or iPad
	accounting=require('lib/accounting');
	
		commonSettingWin=Ti.UI.createWindow({
			backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			title:winTitle,	
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
		    navGroup.close(commonSettingWin,{animated: true});
		    
		  });
  
		  lftNavView.add(BackBtn);
		
		  commonSettingWin.leftNavButton=lftNavView;
		  
		  
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
			  
		  // Saves current setting values
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);
		  	commonSettingWin.add(actvityIndicatorView);
 	actInd.show();
		  	
		  	var isEmpty = getSettingsData();
			if(isEmpty == false)
				navGroup.close(commonSettingWin,{animated: true});
				
			actInd.hide();
   	commonSettingWin.remove(actvityIndicatorView);	
		  });
		  
		  rightView.add(RightBtn);
		  commonSettingWin.rightNavButton=rightView;
		  
	
	}
	
commonSettingWin.orientationModes=[Ti.UI.PORTRAIT];

	
	
	
	
/*
   Function: Set the header for Android devices
   
   @param {Object) headerView			View object that holds the container to the headerLabel  
   @param {Object} headerLabel			Label object that holds the name of header
   @param {Object) leftBtn				Left button object for going back 
   @param {Object) rightBtn				Right button object for saving the settings
   @param {Object) commonSettingWin		Window object that holds all the above objects
   @memberOf headerLabel				View that is a member of Header.js file
   @memberOf leftBtn					View that is a member of Header.js file
   @memberOf rightBtn					View that is a member of Header.js file
   @memberOf headerView					View that is a member of Header.js file
*/	
	
	
	
  function setHeader () {
			  	headerLabel.text=winTitle;
			
				headerView.add(headerLabel);
				leftBtn.title='Back';
				headerView.add(leftBtn);
				
				rightBtn.title='Save';
				headerView.add(rightBtn);
				
				commonSettingWin.add(headerView);
	}
	
	var CostGroupList=[];
	CostGroupList=getCommonSettingCostGroup(); // gets the current cost group details from database
	var CostElementList=[];
	CostElementList=getCommonSettingCostElement(); // gets the current cost element details from database
	
/*
   Function: Get user entered values
   
   @param {List) CostGroupList				Holds the current Cost Group details  
   @param {List} CostElementList			Holds the current Cost Element details 
   @param {List) rowBtn						Get user values from Options  
   @param {List) rowValueTextField			Get user values from Edit Text
   @memberOf updateCostElement				Function is member of DatabaseTransaction.js file
   @example									The function runs two loops for getting the current user 
   											entered values. The inner loop differentiates between a 
   											value coming from Edit Text and that from Options selected by user
*/
	
function getSettingsData(){
	var emptyTxt = [];
	var isEmpty = false;
		var newValue = 0;
		for(var j=0;j<CostGroupList.length;j++)
		{
			for(var i = 0; i <CostElementList.length; i++)
					{	if(CostGroupList[j].CostGroupID == CostElementList[i].costGroupID)
						{
							if(CostElementList[i].HasBtn == 1)
							{
								newValue=rowBtn[i].title;
					     		updateCostElement(CostElementList[i].costElementID,CostElementList[i].costGroupID,newValue);
					     	}
					     	else
					     	{
					     		if(CostElementList[i].HasUnit == '$') 
					     			newValue=rowValueTextField[i].value.replace(/[^a-zA-Z 0-9]+/g,'');//will remove special character from String like ,
								else
									newValue=rowValueTextField[i].value;
								if(newValue == '')
								{
									emptyTxt.push(i);
									isEmpty = true;
									rowValueTextField[i].backgroundColor='#f00';
								}
								else
								{
									updateCostElement(CostElementList[i].costElementID,CostElementList[i].costGroupID,newValue);
								}
									//newValue = '0';	
				     			
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
	
var rowHt=(Ti.Platform.displayCaps.platformHeight*13)/100;
var sectionRowHt=(Ti.Platform.displayCaps.platformHeight*7)/100;	
	
	
var scrollView = Ti.UI.createScrollView({
	top:'10%',
    contentHeight: 'auto',
    layout: 'vertical'
});
if(Ti.Platform.osname == 'android')
{
scrollView.top='10%';	
}
else
{
	scrollView.top='0%';	
}


/*
   Function: Create a list of Cost Groups along with their corresponding Cost Elements
   
   @param {List) CostGroupList				Holds the current Cost Group details  
   @param {List} CostElementList			Holds the current Cost Element details 
   @param {Object) headerRow				Sets the current Cost Group name as header  
   @param {Object) roww						Sets the current Cost Element name as row to corresponding header (Cost Group)  	 
   @param {Scroll View) scrollView			Holds the current Cost Group and their corresponding Cost Elements
   @example									The function runs two loops the outer loop creates the header for the list
   											and the inner loop creates rows corresponding to that group/header
*/

commonSettingWin.addEventListener('open',function(){
	commonSettingWin.add(actvityIndicatorView);
	actInd.show();
	setTimeout(function(){
		for(var j=0;j< CostGroupList.length;j++)
		{
			
			var headerRow=createHeaderRow(j);
			 	headerRow.addEventListener('click',function(e)
		             {
		             	var headerNum=e.source.id;
		            	
		             });
		             
			 scrollView.add(headerRow);
			
			for(var i = 0; i <CostElementList.length; i++)
			{	
				if(CostGroupList[j].CostGroupID == CostElementList[i].costGroupID)
				{
					//Ti.API.info('CE:'+CostElementList[i].Name);
					 var roww = createRow(i);
				       	scrollView.add(roww);
		            
		     	}
				
			}
		}	
	
commonSettingWin.add(scrollView);
		
		actInd.hide();
		commonSettingWin.remove(actvityIndicatorView);
	},100);
		


});
	
function createHeaderRow(i) {
             var rowHeader = Ti.UI.createView({
	           id:'i'+i,
               width:'100%', 
               height: sectionRowHt,
               top: 0, 
               left: 0,
               backgroundGradient:{type:'linear',colors:['#b4b4b4','#969696'],startPoint:{x:0,y:0},endPoint:{x:2,y:100},backFillStart:false},

           });
           
         
           
           var rowHeaderLabel=Ti.UI.createLabel(
           	{ 	text:''+CostGroupList[i].Name,
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
   Function: Create a row for the list of Cost Groups and their corresponding Cost Elements
   
   @param {View) row										Holds rowLabel 
   @param {Label} rowLabel									Holds the name of the row 
   @param {List of Edit Texts} rowValueTextField			Holds the list of Edit Text
   @param {List} CostElementList							Holds the current Cost Element details 
   @param {List} rowBtn										Holds the current Option elements
   @param {Dialog} OptDialog								Create options for current Cost Element
   @exceptions {Class cast exception}						Handles the exception when user clicks on area other than the options provided
   @param {List} OptionArray								List options for respective Cost Elements			
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
           		text:''+CostElementList[i].Name,
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'17%'},
           		left:'3%',
           		color:glblDarkGrayFont,
           		touchEnabled:false
           	});
           	
       var defVal = CostElementList[i].DefaultValue;
       
       if(defVal == 0){
       	//defVal = '';
       }
       else{
       	defVal = accounting.formatMoney(CostElementList[i].DefaultValue);
       }     	
           
       rowValueTextField[i] = Ti.UI.createTextField({
             right: '7%',
             width: '25%', 
             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			 value:defVal,
             height: '55%', 
			 backgroundColor:'#fff',
             borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             color:glblDarkGrayFont,
             paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
             textAlign:Ti.Platform.osname == 'android'?'right':'right',
          	 font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
             });
             
             
        /*if(Ti.Platform.osname == 'android')    rowValueTextField[i].softKeyboardOnFocus= Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;	*/
        
        rowValueTextField[i].addEventListener('focus', function (e){
				rowValueTextField[i].borderWidth = 3;
		});  
			
			
		rowValueTextField[i].addEventListener('blur',function(e){
          	rowValueTextField[i].borderWidth = 1;
          	if(CostElementList[i].HasUnit == '$')
          	{
          			rowValueTextField[i].value=accounting.formatMoney(rowValueTextField[i].value);
          	}
         });
          
          rowValueTextField[i].addEventListener('change',function(e)
          {
          	rowValueTextField[i].backgroundColor='#fff';
          });
          
			if(CostElementList[i].HasUnit != '')
			{
				var unitLabel=Ti.UI.createLabel(
					{
						width:'10%',
						right:'1%',
						textAlign:'right',
						font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
						text:''+CostElementList[i].HasUnit,
						color:glblDarkGrayFont
					});
				if(CostElementList[i].HasUnit == '$')
				{
					
					unitLabel.right='32%';
				}	
					
				row.add(unitLabel);	
			}
			
			
			
			Ti.API.info(CostElementList[i].HasBtn);
			
			if(CostElementList[i].HasBtn == 1)
			{
				
				rowBtn[i]=Ti.UI.createButton(
					{
						right: '7%',
             			width: '25%', 
             			height: '55%', 
             			title:''+CostElementList[i].DefaultValue,
             			style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
             			backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
						borderColor:Ti.Platform.osname =='android'?glblLightGrayFont:'white',
             			borderRadius:Ti.Platform.osname =='android'?5:5,
             			borderWidth:Ti.Platform.osname =='android'?1:1,
             			font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
						textAlign:'center',
						color:'#fff',
						BtnCostElementId:''+CostElementList[i].costElementID,
             			BtnCostGroupID:''+CostElementList[i].costGroupID,	
					});
					
				row.add(rowBtn[i]);	
				
				rowBtn[i].addEventListener('click',function(e)
				{
					Ti.API.info('Clicked Grp:'+e.source.BtnCostGroupID+': Element:'+e.source.BtnCostElementId);
					var costGpId=e.source.BtnCostGroupID;
					var costElementID=e.source.BtnCostElementId;
					var option=[];
					var Title;
					for(var i=0;i<OptionArray.length;i++)
					{
						
						if(OptionArray[i].cgID ==costGpId && OptionArray[i].ceID== costElementID)
						{
							Title=OptionArray[i].Name;
							option.push(OptionArray[i].option);
						}
					}	
					
					OptDialog=CreateOptionDialog(Title,option);
					OptDialog.show();
					
					OptDialog.addEventListener('click',function(opt){
						try {
					    e.source.title=opt.source.options[opt.index].toString();
						
					} catch (ex) {
					    var exp = ex.javaException;
					    
					}
					
					});	
				});
				
			}
			else
			{
				 row.add(rowValueTextField[i]);
			}
			row.add(rowLabel);
            
            return row;
         }	
	
	var OptionArray=[
				{srN0:1,cgID:16,ceID:30,Name:'Build Quality',option:'Basic',optionNo:1},{srN0:2,cgID:16,ceID:30,Name:'Build Quality',option:'Standard',optionNo:2},{srN0:3,cgID:16,ceID:30,Name:'Build Quality',option:'High',optionNo:3},
				{srN0:4,cgID:16,ceID:31,Name:'Build Difficulty',option:'Easy',optionNo:1},{srN0:5,cgID:16,ceID:31,Name:'Build Difficulty',option:'Hard',optionNo:2},{srN0:6,cgID:16,ceID:31,Name:'Build Difficulty',option:'Medium',optionNo:3},
				{srN0:8,cgID:13,ceID:64,Name:'Type of Loan',option:'Interest Only',optionNo:2},{srN0:9,cgID:13,ceID:64,Name:'Type of Loan',option:'P&I',optionNo:3},
				
				{srN0:11,cgID:13,ceID:66,Name:'Repayments (Every?)',option:'Year',optionNo:2},{srN0:12,cgID:13,ceID:66,Name:'Repayments (Every?)',option:'Month',optionNo:3},
				{srN0:13,cgID:13,ceID:66,Name:'Repayments (Every?)',option:'Fortnight',optionNo:4},
				{srN0:14,cgID:13,ceID:66,Name:'Repayments (Every?)',option:'Week',optionNo:5},
				
				{srN0:16,cgID:13,ceID:68,Name:'When is First Payment made?',option:'Start of period',optionNo:2},{srN0:17,cgID:13,ceID:68,Name:'When is First Payment made?',option:'End of period',optionNo:1}
				
				];

	
	
//=========	
commonSettingWin.add(actInd);
  return commonSettingWin;
}
module.exports=winOpen;