/**
 * @projectDescription QwikFeaso
 * 
 * @author List- vivek Gidmare(vivek.gidmare@quagnitia.com),Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */


/*
   Function: Window for editing or deleting the selected dwelling 
   
   @param {Object} DwellingDescWin	Window object
   @return {Object}						Returns current window object
*/


function WinOpen (dwellingID,DwellingName,constructioArray,calledfrom) {


	/*called from 1 = called after add btn clicked in AddDwelling.js for adding new dwelling (New Dwelling )
	 *called from 2 = called after Dwelling list clicked in AddDwelling.js for editing (Existing Dwelling )
	 * 
	 * */
	
  var DwellingDescWin;
  var rowValueTextField = [];
  var constructionCostItem=[
						
							{srN0:1,Name:'Build Difficulty'},
							{srN0:2,Name:'Build Quality'},
							{srN0:3,Name:'Bathroom Finishings'},
							{srN0:4,Name:'Kitchen Finishings'},
							{srN0:5,Name:'Landscape Finishings'},
							];
  
var  viewBtn=[];	
	
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
  	 DwellingDescWin=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 		
	 
	 // Handle back press
	 leftBtn.addEventListener('click',function(e){
	btnSelector(leftBtn);
	if(calledfrom == 2)//after clicking list of dwellings 
	{
		DwellingDescWin.close();
	}
	else{
		var navigate = getData();
		if(navigate == false)
				 	{
				 		var alerDialog=Ti.UI.createAlertDialog({
							message:'Are you sure you want to navigate away from this page? ',
							buttonNames: ['Yes','No']
						});
						alerDialog.addEventListener('click', function(ev) {
						    if (ev.index == 0) { 
						    	DwellingDescWin.close();
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
				 		DwellingDescWin.close();
				 	}	
	}
	
	 	});
	 
	 	
	 // Navigates back to dwelling list
	 rightBtn.addEventListener('click',function(e){
	 	btnSelector(rightBtn);
	 	/**
	 	 * Logic to change the title of top right corner button to Save if user navigates through add dwelling
	 	 * else set it to Delete if user navigates through edit dwelling
	 	 */
	 	DwellingDescWin.add(actvityIndicatorView);
	 	actInd.show();
	 	
	 	Ti.App.QwikFeasoGlobalVars.SummaryUpdated=1;
	 	if(calledfrom == 2)//after clicking list of dwellings 
			{
				var alerDialog=Ti.UI.createAlertDialog({
					message:'Are you sure you want to permanantly delete this Dwelling? ',
					buttonNames: ['Yes','No']
				});
				alerDialog.addEventListener('click', function(ev) {
					
				    if (ev.index == 0) { 
					   	removeDwelling();	
						DwellingDescWin.close();
				     // clicked "Yes"
				    } else if (ev.index == 1) { 
				    	
				    	alerDialog.hide();
				      // clicked "No"
				    }
				   
				  });
				alerDialog.show();
				
				
			}
			else// after clicking on add btn
			{
				if(DwellingNameTextField.value != '')
				{
				var constructionCostValues=[];
				for(var k=0;k<constructionCostItem.length;k++)
				{
					var selectedOption=viewBtn[k].title;
					//Ti.API.info('selectedOption : '+selectedOption)
					constructionCostValues.push(selectedOption);
				}	

					newDwellingDetails(constructionCostValues);
					DwellingDescWin.close();
				}
				else
				{
					alert('Please provide name of the Dwelling');
				}
			}
			//DropTempDwelling();
			
			actInd.hide();
			DwellingDescWin.remove(actvityIndicatorView);
		  	
	 	});
	 
	 //DwellingDescWin.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	 DwellingDescWin.windowSoftInputMode=Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;	
  }
  else // iPhone or iPad secific code
  {
  	//Window Created for iphone to suport navigation Bar
  	DwellingDescWin=Ti.UI.createWindow({
  	backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			title:'Dwellings',
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
		 //	DropTempDwelling();
		 if(calledfrom == 2)//after clicking list of dwellings 
		{
			navGroup.close(DwellingDescWin,{animated: true});
		}
		else{
			var navigate = getData();
		if(navigate == false)
				 	{
				 		var alerDialog=Ti.UI.createAlertDialog({
							message:'Are you sure you want to navigate away from this page? ',
							buttonNames: ['Yes','No']
						});
						alerDialog.addEventListener('click', function(ev) {
						    if (ev.index == 0) { 
						    	navGroup.close(DwellingDescWin,{animated: true});
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
				 		navGroup.close(DwellingDescWin,{animated: true});
				 	}
		}
		 
		    
		    
		  });
  
		  lftNavView.add(BackBtn);
		
		  DwellingDescWin.leftNavButton=lftNavView;  
		
		  var rightView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					
					backgroundColor:'#0000',
					layout:'horizontal'
					
				});

		  var RightBtn = Ti.UI.createButton({
			      //title : 'Save',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
			  });
			  
			  /**
	 	 		* Logic to change the title of top right corner button to Save if user navigates through add dwelling
	 	 		* else set it to Delete if user navigates through edit dwelling
	 	 		*/
			if(calledfrom == 2)//after clicking list of dwellings 
			{
				RightBtn.title = 'Delete';
			}
			else
			{
				RightBtn.title = 'Save';
			}  
			
		  // Navigates back to dwelling list	
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);
		  	DwellingDescWin.add(actvityIndicatorView);
	 	actInd.show();
		  	
		  	
		  	QwikFeasoGlobalVars.SummaryUpdated=1;
		  	if(calledfrom == 2)//after clicking list of dwellings 
			{
				var alerDialog=Ti.UI.createAlertDialog({
					message:'Are you sure you want to permanantly delete this Dwelling? ',
					buttonNames: ['Yes','No']
				});
				alerDialog.addEventListener('click', function(ev) {
					
				    if (ev.index == 0) { 
					   	removeDwelling();
						navGroup.close(DwellingDescWin,{animated: true});
				     // clicked "Yes"
				    } else if (ev.index == 1) { 
				    	
				    	alerDialog.hide();
				      // clicked "No"
				    }
				   
				  });
				alerDialog.show();
				//DropTempDwelling();
				
			}
			else// after clicking on add btn
			{
				if(DwellingNameTextField.value != '')
				{
					var constructionCostValues=[];
				for(var k=0;k<constructionCostItem.length;k++)
				{
					var selectedOption=viewBtn[k].title;
					//Ti.API.info('selectedOption : '+selectedOption)
					constructionCostValues.push(selectedOption);
				}	
					
					newDwellingDetails(constructionCostValues);
					navGroup.close(DwellingDescWin,{animated: true});
				}
				else
				{
					alert('Please provide name of the Dwelling');
				}
			}
		  	actInd.hide();
			DwellingDescWin.remove(actvityIndicatorView);
		  	
		  });
		  
		  rightView.add(RightBtn);
		  DwellingDescWin.rightNavButton=rightView;
		   
  }
DwellingDescWin.orientationModes=[Ti.UI.PORTRAIT];



/*DwellingDescWin.addEventListener('click',function(e){
	
		if(Ti.Platform.osname == 'android'){
			//DwellingDescWin.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
			DwellingDescWin.windowSoftInputMode=Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
		}
});*/




function proceedToSave () {
	
	var constructionCostValues=[];
	for(var k=0;k<constructionCostItem.length;k++)
	{
		var selectedOption=viewBtn[k].title;
		//Ti.API.info('selectedOption : '+selectedOption)
		constructionCostValues.push(selectedOption);
	}	
	
	saveDwellingConstructionCost(dwellingID,constructionCostValues[0],constructionCostValues[1],constructionCostValues[2],constructionCostValues[3],constructionCostValues[4]);
	
	for(var i=0;i<DwellingItemDetails.length;i++){
		var qty;
		qty = rowValueTextField[i].value;
		updateDwellingDetails(DwellingNameTextField.value,DwellingItemDetails[i].dwellingId,DwellingItemDetails[i].roomCatId,DwellingItemDetails[i].roomSubCatId,qty);
	}
	
	DwellingDetailsSummary();
  
}



/**
 * Function updates the selected dwelling with new values entered by user
 * @memberOf updateDwellingDetails	Is a member of DatabaseTransaction.js file
 */
function saveDwellingDetails () {
	
	//var emptyTxt = [];
	var isEmpty = false;
	
  for(var i=0;i<DwellingItemDetails.length;i++)
	{
		var qty;
		//Ti.API.info('qty vals: '+rowValueTextField[i].value);
		qty = rowValueTextField[i].value;
		if(rowValueTextField[i].value === '')
		{
			alert('Some Required data is missing, please update and try again');
			rowValueTextField[i].backgroundColor='#f00';
			rowValueTextField[i].focus();
			isEmpty = true;
			break;
			//updateDwellingDetails(DwellingNameTextField.value,DwellingItemDetails[i].dwellingId,DwellingItemDetails[i].roomCatId,DwellingItemDetails[i].roomSubCatId,qty);
		}
		
		
	}
	
	/*if(isEmpty == true)
	{
		alert('Some Required data is missing, please update and try again');
		rowValueTextField[emptyTxt[0]].backgroundColor='#f00';
		rowValueTextField[emptyTxt[0]].focus();
	}*/
		
	return isEmpty;
}

function getData () {
  var navigate = true;
	
	if(DwellingNameTextField.value !== '')
	{
		navigate = false;
		return navigate;
	}
	
	for(var i=0;i<DwellingItemDetails.length;i++)
	{
		if(rowValueTextField[i].value !== '')
		{
			navigate = false;
			return navigate;
		}
		
	}
	
}

/**
 * Function adds a new dwelling with new values entered by user
 * @memberOf addNewDwelling		Is a member of DatabaseTransaction.js file
 * @memberOf addDwellingDetails	Is a member of DatabaseTransaction.js file
 */
function newDwellingDetails (constructionCostValues) {
	
	
	addNewDwelling(DwellingNameTextField.value,constructionCostValues);
	for(var i=0;i<DwellingItemDetails.length;i++)
	{
		var qty;
		qty = rowValueTextField[i].value;
		if(rowValueTextField[i].value == '')
		{
			qty = 0;
		}
  addDwellingDetails(DwellingNameTextField.value,DwellingItemDetails[i].roomCatId,DwellingItemDetails[i].roomSubCatId,qty);
 
 }
  DwellingDetailsSummary();
 
}

/**
 * Function deletes the currently selected dwelling
 * @memberOf deleteDwelling		Is a member of DatabaseTransaction.js file
 */
function removeDwelling(){
	deleteDwelling(DwellingItemDetails[0].dwellingId);
}

 var scrollView = Ti.UI.createScrollView({
	top:Ti.Platform.osname =='android'?'140dp':'90dp',
    contentHeight: 'auto',
    layout: 'vertical',
});

/*var parentView=Ti.UI.createView({
	height:'100%',
	width:'100%',
	top:Ti.Platform.osname == 'android'?'50dp':'',
	layout:'vertical',
}); */

var topview=Ti.UI.createView({
	//height:(Ti.Platform.displayCaps.platformHeight*15)/100,
	height:Ti.Platform.osname == 'android'?'80dp':'80dp',
	width:'100%',
	top:Ti.Platform.osname == 'android'?'50dp':'',
	//backgroundColor:'#00ff00',
});

//parentView.add(topview);

var DwellingNameTextField = Ti.UI.createTextField({
             left: '10%',
             right:'10%',
             height:'70%',//8
             color:glblDarkGrayFont,
             top:Ti.Platform.osname == 'android'?'16dp':'16dp',
             value:DwellingName,
             backgroundColor:'#fff',
             hintText:'Name for Dwelling',
             keyboardType: Ti.UI.KEYBOARD_EMAIL,
			 borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
             textAlign:Ti.Platform.osname == 'android'?'left':'center',
       });
       
DwellingNameTextField.addEventListener('focus', function (e){
	DwellingNameTextField.borderWidth = 3;
		
});   

DwellingNameTextField.addEventListener('blur', function (e){
	DwellingNameTextField.borderWidth = 1;
		
});  
         
topview.add(DwellingNameTextField);


// Create a Button.
var saveBtn = Ti.UI.createButton({
	title : 'Save',
	height : '50%',
	width : '20%',
	style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
	top :Ti.Platform.osname == 'android'?'24dp':'24dp',
	right : Ti.Platform.osname == 'android'?'3%':'2%',
	font:Ti.Platform.osname =='android'
								 ?{fontSize:'17dp'}
								 :{fontSize:'17%'},
	backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
	borderRadius:5,
	color:'white',
			
});

if(calledfrom == 2)
{			
	DwellingNameTextField.left = '5%';
	DwellingNameTextField.width = '70%';
	topview.add(saveBtn);
}

DwellingDescWin.add(topview);


saveBtn.addEventListener('click',function(e){
	btnSelector(saveBtn);
	/**
	 * Logic that differentiates the Save button.
	 * Save button while editing dwelling will update dwelling with new values
	 * Save button while adding dwelling will add dwelling with new values
	 */
	DwellingDescWin.add(actvityIndicatorView);
	actInd.show();
		  	if(Ti.Platform.osname == 'android')
			  {
			  	if(DwellingNameTextField.value != '')
				{
					
					var isEmpty = false;
					isEmpty = saveDwellingDetails();
					
					if(isEmpty == false){
						proceedToSave();
						DwellingDescWin.close();
					}
					
				}
				else{
					alert('Please provide name of the Dwelling');
				}  	
				Ti.App.QwikFeasoGlobalVars.SummaryUpdated=1;
			}
			  else
			  {
			  	if(DwellingNameTextField.value != '')
				{
					var isEmpty = false;
					isEmpty = saveDwellingDetails();
					
					if(isEmpty == false){
						proceedToSave();
						navGroup.close(DwellingDescWin,{animated: true});
					}
						
				}
				else
				{
					alert('Please provide name of the Dwelling');
				}
				QwikFeasoGlobalVars.SummaryUpdated=1;
			  } 	
			  
			actInd.hide();  
			DwellingDescWin.remove(actvityIndicatorView);
});

var rowHt=(Ti.Platform.displayCaps.platformHeight*13)/100; 
 var sectionRowHt=(Ti.Platform.displayCaps.platformHeight*7)/100;
  var rowData=[];

var DwellingItemList=[
					{ID:0,Name:'Construction Cost'},
					{ID:1,Name:'Bedrooms'},
					{ID:2,Name:'Other Rooms & Spaces'},
					{ID:3,Name:'Kitchens'},
					{ID:4,Name:'Bathrooms'},
					{ID:5,Name:'Decks'},
					{ID:6,Name:'Garages'},
					];

var DwellingItemDetails = [];

/**
 * Logic to generate screen, to Add a new dwelling or, to edit an existing dwelling
 * If adding a new dwelling just get the structure of Dwellings table without populating its values 
 */
if(calledfrom == 2)//after clicking list of dwellings 
{
	
	DwellingItemDetails = GetDetailedDwellingList(dwellingID);
}
else// after clicking on add btn
{
	DwellingItemDetails = GetNewDetailedDwellingList(1);
}

//DwellingDescWin.add(topview);
//DwellingDescWin.add(parentView);

var constructionCostItemOptions=[
							{srN0:1,option:'Easy',optionNo:1},
							{srN0:1,option:'Medium',optionNo:2},
							{srN0:1,option:'Hard',optionNo:3},
							
							{srN0:2,option:'Basic',optionNo:1},
							{srN0:2,option:'Standard',optionNo:2},
							{srN0:2,option:'High',optionNo:3},
							
							{srN0:3,option:'Basic',optionNo:1},
							{srN0:3,option:'Standard',optionNo:2},
							{srN0:3,option:'High',optionNo:3},
							{srN0:3,option:'Premium',optionNo:4},
							
							{srN0:4,option:'Basic',optionNo:1},
							{srN0:4,option:'Standard',optionNo:2},
							{srN0:4,option:'High',optionNo:3},
							{srN0:4,option:'Premium',optionNo:4},
							
							{srN0:5,option:'None',optionNo:1},
							{srN0:5,option:'Basic',optionNo:2},
							{srN0:5,option:'Standard',optionNo:3},
							{srN0:5,option:'High',optionNo:4},
							{srN0:5,option:'Premium',optionNo:5},
						
						];

function costructionStandardsView (i) {
			var rowView=Ti.UI.createView({
			 	backgroundColor:'white',
			 	width:'100%',
			 	height:rowHt,
			 	borderColor: '#bbb',
			    borderWidth: 1,
			   });
			 var viewLabel=Ti.UI.createLabel({
			 	width:'60%',
			 	height:'100%',
			 	font:Ti.Platform.osname =='android' 
											 ?{fontSize:'18dp'}
											 :{fontSize:'17%'},
			    left:'3%',
			    color:glblDarkGrayFont,
			 	text:constructionCostItem[i].Name,
			 	textAlign:'left',
			 	touchEnabled:false
			 	
			 }); 
			 viewBtn[i] = Ti.UI.createButton({
				title :constructioArray[i],
				id:constructionCostItem[i].srN0,
				name:constructionCostItem[i].Name,
				height : '60%',
				width : '27%',
				right : '3%',
				font:Ti.Platform.osname =='android' 
											 ?{fontSize:'16dp'}
											 :{fontSize:'14%'},
				style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
				backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
				borderRadius:5,
				color:'#fff'
			});
  			
  			viewBtn[i].addEventListener('click',function(e)
				{
					btnSelector(viewBtn[i]);
					//	var costGpId=e.source.BtnCostGroupID;
					var costItemID=e.source.id;
					var costItemName=e.source.name;
					var costItemoption=e.source.title;
						var option=[];
						var Title;
						for(var j=0;j<constructionCostItemOptions.length;j++)
						{
							if(costItemID === constructionCostItemOptions[j].srN0)
							{
								
								option.push(constructionCostItemOptions[j].option);
							}
						}
						OptDialog=CreateOptionDialog(costItemName,option);
						OptDialog.show();
						
						OptDialog.addEventListener('click',function(opt){
						try {
							    e.source.title=opt.source.options[opt.index].toString();
								//Ti.App.Properties.setString(dataId,opt.source.options[opt.index].toString());
							}
							 catch (ex) {
						    		var exp = ex.javaException;
						   			e.source.title=costItemoption;
									//Ti.App.Properties.setString(dataId,'');
										}
						});	
					
					
					
				});
  			
  			
  			rowView.add(viewLabel);
  			rowView.add(viewBtn[i]);
  
  return rowView;
}

for(var j=0;j<DwellingItemList.length;j++)
{
	var HeaderRow=createHeaderRow(j);
	scrollView.add(HeaderRow);
	
	if (DwellingItemList[j].ID === 0) {
		for(var i=0;i<constructionCostItem.length;i++)
		  {
						var roww = costructionStandardsView(i);
						scrollView.add(roww);
		  }
	}
	else
	{
		for(var i=0;i<DwellingItemDetails.length;i++)
			{
				if(DwellingItemList[j].ID == DwellingItemDetails[i].roomCatId)
				{
					var roww = createRow(i);
					scrollView.add(roww);
				}
			 
			}
	}
	
}
//parentView.add(scrollView);
DwellingDescWin.add(scrollView);
//DwellingDescWin.add(parentView);


      //Only for Android
/*
   Function: Set the header for Android devices
   
   @param {Object) headerView			View object that holds the container to the headerLabel  
   @param {Object} headerLabel			Label object that holds the name of header
   @param {Object) leftBtn				Left button object for going back 
   @param {Object) rightBtn				Right button object for saving the settings or delete dwelling
   @param {Object) DwellingDescWin		Window object that holds all the above objects
   @memberOf headerLabel				View that is a member of Header.js file
   @memberOf leftBtn					View that is a member of Header.js file
   @memberOf rightBtn					View that is a member of Header.js file
   @memberOf headerView					View that is a member of Header.js file
*/
  function setHeader () {
			  	headerLabel.text='Dwellings';
				headerView.add(headerLabel);
				
				
				
				leftBtn.title='Back';
				headerView.add(leftBtn);
				
				
				if(calledfrom == 2)//after clicking list of dwellings 
				{
					rightBtn.title='Delete';
				}
				else
				{
					rightBtn.title='Save';
				}
				headerView.add(rightBtn);
				
				//headerView.height = '50dp';
				DwellingDescWin.add(headerView);
				
				}
				
/*
   Function: Create a header for the list of Cost Groups and their corresponding Cost Elements
   
   @param {View) rowHeader				Holds rowHeaderLabel 
   @param {Label} rowHeaderLabel		Holds the name of the Room category 
   @param {Label} HeaderNumberLabel		Holds the quantity of Room subcategory
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
           	{ 	text:''+DwellingItemList[i].Name,
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'14dp',fontWeight:'bold'}
								 :{fontSize:'12%',fontWeight:'bold'},
				color:'white',
				left:'3%',
           		touchEnabled:false
           	});
          
          	/*
           	 * Quantity of each room subcategory
           	 */
           	var HeaderNumberLabel=Ti.UI.createLabel(
           	{ 	text:(DwellingItemList[i].ID === 0)?'':'Qty',
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
				color:'white',
				right:'7%',
           		touchEnabled:false
           	});
           
             rowHeader.add(rowHeaderLabel);
     		 rowHeader.add(HeaderNumberLabel);
       
            return rowHeader;
         }			
         
/*
   Function: Create a row for the list of Room categories and their corresponding Build Quality rates
   
   @param {View) row										Holds rowLabel 
   @param {Label} rowLabel									Holds the name of the row (Room Subcategory)
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
           		//width:'60%',
           		//height:'100%',
           		width:Ti.UI.Fill,
           		height:Ti.UI.Fill,
           		text:''+DwellingItemDetails[i].Name,
           		font:{fontSize:'14dp'},
           		//left:'3%',
           		left:0,
           		color:glblDarkGrayFont,
           		touchEnabled:false
           	});
           	
           	//Ti.API.info('Room details : '+DwellingItemDetails[i].roomSubCatId+' '+DwellingItemDetails[i].Name+' '+DwellingItemDetails[i].width+'  x '+DwellingItemDetails[i].depth);
           	var view = Ti.UI.createView({
           	//backgroundColor:'red',
               width:'160dp', 
               height: '32dp',
               layout:'vertical',
               left:'7dp',
           });
           
           var width = DwellingItemDetails[i].width;
           var depth = DwellingItemDetails[i].depth;
           var dimens = "( "+width.toFixed(2)+" x "+depth.toFixed(2)+" )";
           var roomDimens =Ti.UI.createLabel(
           	{
           		width:Ti.UI.Fill,
           		height:Ti.UI.Fill,
           		text:dimens,
           		font:{fontSize:'10dp'},
           		left:0,
           		color:glblDarkGrayFont,
           		touchEnabled:false
           	});
           	
           	view.add(rowLabel);
           	view.add(roomDimens);
           	
           
           
       var dwellingsQty = DwellingItemDetails[i].qty;
       
       //Ti.API.info('dwellingsQty : '+dwellingsQty);
       
       if(dwellingsQty == 0)
       	dwellingsQty = '';
           
       rowValueTextField[i] = Ti.UI.createTextField({
       	
             right: '7%',
             width: '20%', 
             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			 color:glblDarkGrayFont,
             height: '55%', 
			 backgroundColor:'#fff',
			 paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
             borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
             textAlign:Ti.Platform.osname == 'android'?'right':'right',
          	 value:calledfrom == 2?dwellingsQty:'',   // populate with qty if while edititng existing dwelling
             
             });
             
             //rowValueTextField[i].blur();
             
             rowValueTextField[i].addEventListener('change',function(e){
          		rowValueTextField[i].backgroundColor='#fff';
           	});
           	
           	rowValueTextField[i].addEventListener('focus', function (e){
				rowValueTextField[i].borderWidth = 3;
			});  
			
			rowValueTextField[i].addEventListener('blur', function (e){
				rowValueTextField[i].borderWidth = 1;
			}); 
            
		        /*if(Ti.Platform.osname == 'android')
		        {
		        	rowValueTextField[i].softKeyboardOnFocus= Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;	
					
		        }*/
            //row.add(rowLabel);
            row.add(view);
            row.add(rowValueTextField[i]);
          
             
            return row;
         }
	DwellingDescWin.add(actInd);			
	
  return DwellingDescWin;
}
module.exports=WinOpen;