/**
 * @projectDescription QwikFeaso
 * 
 * @author List- vivek Gidmare(vivek.gidmare@quagnitia.com),Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window for Build Quality and Build Difficulty
   
   @param {Object} constructionCostWindow		Window object
   @param {Object) accounting		Holds the instance of accounting.js file.  
   @return {Object}					Returns current window object
*/


function winOpen (winTitle,fromWin) {
  
  var constructionCostWindow;
  var accounting;
  var noneTextField = [];
  var basicTextField = [];
  var standardTextField = [];
  var highTextField = [];
  var premiumTextField = [];
   var notPossibleIds = [];
   
  var fieldVals = [];
 var fieldValMap = [];
 var cnt = 0;
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
	Ti.include('/services/TempDBTransaction.js')
  	 constructionCostWindow=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 		
	 
	 // Handle back press 
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
	 	constructionCostWindow.close();});
	 
	 // Saves the Build quality / Build difficulty values
	 rightBtn.addEventListener('click',function(e){
	 	btnSelector(rightBtn);
	 	constructionCostWindow.add(actvityIndicatorView);
 	actInd.show();
		  	
		  	/*
		  	 * Logic to check whether User has left any field blank
		  	 */
		  	var isEmpty = saveConstructionCostSettings();
		 	if(isEmpty == false)
		 		constructionCostWindow.close();
		actInd.hide();
   	constructionCostWindow.remove(actvityIndicatorView); 		
		  	
	  	});
	  	
	constructionCostWindow.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;	
	//constructionCostWindow.windowSoftInputMode=Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
  }
  else // iPhone or iPad specific code
  {
		  
		  accounting=require('lib/accounting');
		  	
		  	constructionCostWindow=Ti.UI.createWindow({
			  	backgroundColor:'#fff',
				navBarHidden:false,
				tabBarHidden: true,
				barImage:'images/GrayNavBar.png',
				barColor:'#6d6e6f',
				//title:winTitle,
				titleControl:Ti.UI.createLabel({text:winTitle,
				width:'50%',
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
		    //FirstWin.close();
		    navGroup.close(constructionCostWindow,{animated: true});
		    
		  });
  
		  lftNavView.add(BackBtn);
		
		  constructionCostWindow.leftNavButton=lftNavView;
		  
		  
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
			  
		  // Saves the Build quality / Build difficulty values	  
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);
		  	constructionCostWindow.add(actvityIndicatorView);
 	actInd.show();
		  	
		  	/*
		  	 * Logic to check whether User has left any field blank
		  	 */
		  	var isEmpty = saveConstructionCostSettings();
		 	if(isEmpty == false)
		 		navGroup.close(constructionCostWindow,{animated: true});
		  	actInd.hide();
   	constructionCostWindow.remove(actvityIndicatorView);
		  });
		  
		  rightView.add(RightBtn);
		  constructionCostWindow.rightNavButton=rightView;
		  
		  
		  
	
	}
constructionCostWindow.orientationModes=[Ti.UI.PORTRAIT];



var HeaderName=null;
var BuildTypeDetailList=[];


/*
 * Function to save changes made by User to Construction Costs
 */

function saveConstructionCostSettings () {
	var isEmpty = false;
	var emptyTxt = [];
	for (var i=0; i < constructionCostHeader.length; i++) {
 
		for (var j=0; j < constructionCostsRow.length; j++) {
			
				if(constructionCostHeader[i].HeaderID === constructionCostsRow[j].Hid)
				{
				 	
				 	if(constructionCostHeader[i].HeaderID == 0)
				 	{
				 		var val = "";
						val = premiumTextField[j].value;
						if(val != '')
						{
							val=val.replace(/[^a-zA-Z 0-9]+/g,'');
							updateBuildDifficultyDetails((constructionCostsRow[j].dbID+1),val);
						}
						else
						{
							premiumTextField[j].backgroundColor='#f00';
							isEmpty = true;
						}
				 	}
				 	else if(constructionCostHeader[i].HeaderID == 1)
				 	{
				 		var basic = "";
						basic = basicTextField[j].value;
						
						var std = "";
						std = standardTextField[j].value;
						
						var high = ""; 
						high = highTextField[j].value;
						
						
						if(basic == '' || std == '' || high == '')
						{
							isEmpty = true;
							if(basic == '')
							{
								basicTextField[j].backgroundColor='#f00';
							}
							
							if(std == '')
							{
								standardTextField[j].backgroundColor='#f00';
							}
							
							if(high == '')
							{
								highTextField[j].backgroundColor='#f00';
							}
						}
						else
						{
							basic=basic.replace(/[^a-zA-Z 0-9]+/g,'');
							std=std.replace(/[^a-zA-Z 0-9]+/g,'');
							high=high.replace(/[^a-zA-Z 0-9]+/g,'');
							updateBuildQualityDetails((constructionCostsRow[j].dbID+1),basic,std,high);
						}
						
				 	}
				 	else
				 	{
				 		var basic = "";
						basic = basicTextField[j].value;
						
						var std = "";
						std = standardTextField[j].value;
						
						var high = ""; 
						high = highTextField[j].value;
						
						var prem = ""; 
						prem = premiumTextField[j].value;
						
						/*Ti.API.info('BQ values : '+j+' '+constructionCostHeader[i].Name+' '+
				 							constructionCostsRow[j].dbID+' '+basic+' '+std+' '+high+' '+prem);	*/
						
						if(basic == '' || std == '' || high == '' || prem == '')
						{
							isEmpty = true;
							if(basic == '')
							{
								basicTextField[j].backgroundColor='#f00';
							}
							
							if(std == '')
							{
								standardTextField[j].backgroundColor='#f00';
							}
							
							if(high == '')
							{
								highTextField[j].backgroundColor='#f00';
							}
							
							if(prem == '')
							{
								premiumTextField[j].backgroundColor='#f00';
							}
							
						}
						else
						{
							
							basic=basic.replace(/[^a-zA-Z 0-9]+/g,'');
							std=std.replace(/[^a-zA-Z 0-9]+/g,'');
							high=high.replace(/[^a-zA-Z 0-9]+/g,'');
							prem=prem.replace(/[^a-zA-Z 0-9]+/g,'');
							updateFitoutCostDetails((constructionCostsRow[j].dbID+1),/*none,*/basic,std,high,prem);
						}
				 	}
				
				}
			}; 	
 
	};
	
	if(isEmpty == true)
	{
		alert('Some Required data is missing, please update and try again');
	}
	
  return isEmpty;
}

var buildDifficultyView=Ti.UI.createView({
	layout:'vertical',
	height:'auto',
	width:'100%'
});




var buildDiff=[];
buildDiff=GetBuildDifficultyDetails();

var buildQuality=[];
buildQuality=GetBuildQualityDetails();

var fitoutCost=[];
fitoutCost=GetFitoutCosts();


 var rowHt=(Ti.Platform.displayCaps.platformHeight*13)/100; 
 var sectionRowHt=(Ti.Platform.displayCaps.platformHeight*7)/100;
  var rowData=[];
     
 var scrollView = Ti.UI.createScrollView({
	top:Ti.Platform.osname == 'android'?'10%':'0%',
    contentHeight: 'auto',
    layout: 'vertical'
});


var BuildType=winTitle == 'Build Quality'?1:2;

var constructionCostHeader=[
							{HeaderID:0,Name:'Build Difficulty'},							
							{HeaderID:1,Name:'Build Quality'},							
							{HeaderID:2,Name:'Finishings Costs'},						
							];
	
var constructionCostsRow=[
						 
						 {Rid:1,Hid:0,dbID:0,Name:'Easy'},
						 {Rid:3,Hid:0,dbID:2,Name:'Medium'},
						 {Rid:2,Hid:0,dbID:1,Name:'Hard'},

						 {Rid:4,Hid:1,dbID:0,Name:'Bathrooms'},
						 {Rid:5,Hid:1,dbID:1,Name:'Decks'},
						 {Rid:6,Hid:1,dbID:2,Name:'Garages'},
						 {Rid:7,Hid:1,dbID:3,Name:'Internal Rooms'},
						 {Rid:8,Hid:1,dbID:4,Name:'Kitchens'},
						 
						 {Rid:9,Hid:2,dbID:0,Name:'Bathroom (Vanity, Sink, Taps, Shower, Bath, etc)'},
						 {Rid:10,Hid:2,dbID:1,Name:'Kitchen (Benches, Splashback, Appliances, etc)'},
						 {Rid:11,Hid:2,dbID:2,Name:'Landscaping & Driveways & Fencing'},
						 
						
						 ];							
		
for (var i=0; i < constructionCostHeader.length; i++) {
	//var resetView = createResetView(i);
 	var header=createHeaderRow(i);
	//scrollView.add(resetView);
	scrollView.add(header);
	for (var j=0; j < constructionCostsRow.length; j++) {
			if(constructionCostHeader[i].HeaderID === constructionCostsRow[j].Hid)
			{
				var row=createRow(j);
				scrollView.add(row);
			}
		}; 	
 
	};							


  constructionCostWindow.add(scrollView);
  
/*
   Function: Set the header for Android devices
   
   @param {Object) headerView			View object that holds the container to the headerLabel  
   @param {Object} headerLabel			Label object that holds the name of header
   @param {Object) leftBtn				Left button object for going back 
   @param {Object) rightBtn				Right button object for saving the settings
   @param {Object) constructionCostWindow			Window object that holds all the above objects
   @memberOf headerLabel				View that is a member of Header.js file
   @memberOf leftBtn					View that is a member of Header.js file
   @memberOf rightBtn					View that is a member of Header.js file
   @memberOf headerView					View that is a member of Header.js file
*/

  function setHeader () {
			  	headerLabel.text=winTitle;
			  	headerLabel.width='40%';
				headerView.add(headerLabel);
				
				leftBtn.title='Back';
				headerView.add(leftBtn);
				
				rightBtn.title='Save';
				headerView.add(rightBtn);
				
				//headerView.height = '50dp';

				constructionCostWindow.add(headerView);
				
 }
 
 /*function createResetView (position) {
 	
 	var rowHeader = Ti.UI.createView({
               width:'100%', 
               height: sectionRowHt/2,
               top: 0, 
               left: 0,
               backgroundGradient:{type:'linear',colors:['#b4b4b4','#969696'],startPoint:{x:0,y:0},endPoint:{x:2,y:100},backFillStart:false},

           });
           
    // Creates a left navigation button for all screen (Android devices)	
	var reset=Ti.UI.createButton({
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		height:'20dp',
		width:'30dp',
		font:{fontSize:'10dp'},//
		right :'5dp',
		backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
		borderRadius:5,
		color:'#fff',
		title:'Reset',
	});    
	
	rowHeader.add(reset);
 	
   return rowHeader;
 }*/
 
		
/*
   Function: Create a header for the list of Cost Groups and their corresponding Cost Elements
   
   @param {View) rowHeader				Holds rowHeaderLabel 
   @param {Label} rowHeaderLabel		Holds the name of the Room category 
   @param {Label} HeaderRatesLabel		Holds the title 'Rates'
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
           	{ 	text:''+constructionCostHeader[i].Name,
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'14dp',fontWeight:'bold'}
								 :{fontSize:'12%',fontWeight:'bold'},
				color:'white',
				left:'3%',
				top:'2%',
           		touchEnabled:false
           	});
           	
           	if(constructionCostHeader[i].HeaderID == 0)
           	{
           		rowHeaderLabel.top = '23%';
           	}
           	
           	/*
           	 * Set title of Header to 'Rates' if current window is 'Build Quality'
           	 */
   
           	
           	var HeaderBasicLabel=Ti.UI.createLabel(
           	{ 	text:'Basic',
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'12dp'}
								 :{fontSize:'12%'},
				color:'white',
				left:'25%',
				bottom:'3%',
           		touchEnabled:false
           	});
           	
           
           var HeaderStandardLabel=Ti.UI.createLabel(
           	{ 	text:'Standard',
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'12dp'}
								 :{fontSize:'12%'},
				color:'white',
				left:'43%',
				bottom:'3%',
           		touchEnabled:false
           	});
           	 
           	 var HeaderHighLabel=Ti.UI.createLabel(
           	{ 	text:'High',
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'12dp'}
								 :{fontSize:'12%'},
				color:'white',
				left:'68%',
				bottom:'3%',
           		touchEnabled:false
           	});
           	
           	var HeaderPremiumLabel=Ti.UI.createLabel(
           	{ 	text:'Premium',
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'12dp'}
								 :{fontSize:'12%'},
				color:'white',
				right:'1%',
				bottom:'3%',
           		touchEnabled:false
           	});
           	
             rowHeader.add(rowHeaderLabel);
     		if(constructionCostHeader[i].HeaderID == 0)
     		{
     			
     		HeaderPremiumLabel.left = '75%';
     		HeaderPremiumLabel.text='% Multiplier';	
     		rowHeader.add(HeaderPremiumLabel);
     			
     		}
     		else if(constructionCostHeader[i].HeaderID == 1)
     		{
     			//header for build quality
     			HeaderBasicLabel.left='15%'
     			
     			HeaderStandardLabel.left='45%';
     			HeaderHighLabel.left='77%';
     			
     			
     			rowHeader.add(HeaderBasicLabel);
     		 	rowHeader.add(HeaderStandardLabel);
       		 	rowHeader.add(HeaderHighLabel);
     			
     			
     		}
     		else if(constructionCostHeader[i].HeaderID == 2)
     		{
     			HeaderBasicLabel.left = '10%';
     			HeaderStandardLabel.left = '33%';
     			HeaderHighLabel.left = '60%';
     			HeaderPremiumLabel.left = '80%';
     			rowHeader.add(HeaderBasicLabel);
     			rowHeader.add(HeaderStandardLabel);
       		 	rowHeader.add(HeaderHighLabel);
       		 	rowHeader.add(HeaderPremiumLabel);
     		}
     		else
     		{
     			//rowHeader.add(HeaderNoneLabel);	
     		 	rowHeader.add(HeaderBasicLabel);
     			rowHeader.add(HeaderStandardLabel);
       		 	rowHeader.add(HeaderHighLabel);
       		 	rowHeader.add(HeaderPremiumLabel);	
     		}
     		 
       		 
            return rowHeader;
         }		
         
/*
   Function: Create a row for the list of Room categories and their corresponding Build Quality rates
   
   @param {View) row										Holds rowLabel 
   @param {Label} rowLabel									Holds the name of the row 
   @param {Label} rowUnitSignLabel							Holds the unit ($)
   @param {List of Edit Texts} rowValueTextField			Holds the list of Edit Text
   @return 													Returns the reference to the row 
   
*/


     		
function createRow(j) {
	
		   if(constructionCostsRow[j].Hid == 2)
		   {
		   	rowHt=(Ti.Platform.displayCaps.platformHeight*18)/100; 
		   }
		   else
		   if(constructionCostsRow[j].Hid == 1)
		   {
		   rowHt=(Ti.Platform.displayCaps.platformHeight*15)/100; 
		   }
		     
		     
		     var row = Ti.UI.createView({
               backgroundColor: 'white',
               borderColor: '#bbb',
               borderWidth:1,
               width:'100%', 
               height: rowHt,
               top: 0, left: 0,
               id:'i'+i,
              
           });
		     
		     var rowLabel=Ti.UI.createLabel(
	           	{
	           		width:'100%',
	           		height:'auto',
	           		top:'2%',
	           		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'18dp'}
									 :{fontSize:'17%'},
	           		left:'5%',
	           		color:glblDarkGrayFont,
	           		touchEnabled:false
	           	});
		     
		    if(constructionCostsRow[j].Rid == 9 || constructionCostsRow[j].Rid == 10)
		    {
				var rowName =  constructionCostsRow[j].Name;
		        var subStr1 = '';
		        var subStr2 = '';
		        subStr1 = rowName.substr(rowName.indexOf('(',0),rowName.length);
		        subStr2 = rowName.substr(0,(rowName.indexOf('(',0)-1));
		        //Ti.API.info('subStr2:subStr1'+subStr2+' : '+subStr1);
		        
		        var rowLabel2=Ti.UI.createLabel(
	           	{
	           		width:'100%',
	           		height:'auto',
	           		top:'18%',
	           		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'18dp'}
									 :{fontSize:'17%'},
	           		left:'5%',
	           		color:glblDarkGrayFont,
	           		touchEnabled:false
	           	});
	           	
	           	rowLabel.text = subStr2;
	           	row.add(rowLabel);
	           	rowLabel2.text = subStr1;
	           	row.add(rowLabel2);
		    }
		    else{
		    	Ti.API.info('setting row name : '+constructionCostsRow[j].Name);
				rowLabel.text = constructionCostsRow[j].Name;
	           	row.add(rowLabel);
		    }

		    
           	
       basicTextField[j] = Ti.UI.createTextField({
             left: '23%',
             width: '16%', 
             bottom:'5%',
             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			 paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
             color:glblDarkGrayFont,
             height: '55%', 
			 backgroundColor:'#fff',
             borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
             textAlign:Ti.Platform.osname == 'android'?'right':'right',
       //      value:quality,
       });
       
        basicTextField[j].addEventListener('focus', function (e){
				basicTextField[j].borderWidth = 3;
		});  
			
		basicTextField[j].addEventListener('blur', function (e){
				basicTextField[j].borderWidth = 1;
		}); 
		
       standardTextField[j] = Ti.UI.createTextField({
             left: '43%',
             width: '16%', 
             bottom:'5%',
             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			 paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
             color:glblDarkGrayFont,
             height: '55%', 
			 backgroundColor:'#fff',
             borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
             textAlign:Ti.Platform.osname == 'android'?'right':'right',
        //     value:quality,
       });
       
       standardTextField[j].addEventListener('focus', function (e){
				standardTextField[j].borderWidth = 3;
		});  
			
		standardTextField[j].addEventListener('blur', function (e){
				standardTextField[j].borderWidth = 1;
		}); 
		
       highTextField[j] = Ti.UI.createTextField({
             left:'63%',
             width: '16%', 
             bottom:'5%',
             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			 paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
             color:glblDarkGrayFont,
             height: '55%', 
			 backgroundColor:'#fff',
             borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
             textAlign:Ti.Platform.osname == 'android'?'right':'right',
         //    value:quality,
       });
       
       highTextField[j].addEventListener('focus', function (e){
				highTextField[j].borderWidth = 3;
		});  
			
		highTextField[j].addEventListener('blur', function (e){
				highTextField[j].borderWidth = 1;
		}); 
       premiumTextField[j] = Ti.UI.createTextField({
             left: '83%',
             width: '16%', 
             bottom:'5%',
             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			 paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
             color:glblDarkGrayFont,
             height: '55%', 
			 backgroundColor:'#fff',
             borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
             textAlign:Ti.Platform.osname == 'android'?'right':'right',
           //  value:quality,
       });
       
       premiumTextField[j].addEventListener('focus', function (e){
				premiumTextField[j].borderWidth = 3;
		});  
			
		premiumTextField[j].addEventListener('blur', function (e){
				premiumTextField[j].borderWidth = 1;
		}); 
		
		
        if(constructionCostsRow[j].Hid == 2)
        {
		    //noneTextField[j].height='40%';
          basicTextField[j].height='40%';
          standardTextField[j].height='40%';
          highTextField[j].height='40%';
          premiumTextField[j].height='40%';
       	}
           	
			
            
          //  row.add(rowUnitSignLabel);
       	  
      if(constructionCostsRow[j].Hid == 0)
     		{
     			var rowUnitBD=Ti.UI.createLabel(
	           	{
	           		width:'5%',
	           		height:'100%',
	           		text:'%',
	           		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'14dp'}
									 :{fontSize:'12%'},
	           		right:'5%',
	           		color:glblDarkGrayFont,
	           		touchEnabled:false,
	           		textAlign:'right',
	           		//backgroundColor:'#ff0'
	           	});
     			
     			rowLabel.top = '25%';
     			 premiumTextField[j].top = '25%';
     			 premiumTextField[j].left = '75%'
     			 var premium = buildDiff[constructionCostsRow[j].dbID].DefaultValue;
     			 if(premium == 0){
     			 	//premium = '';
     			 }
     			 else{
     			 	premium = accounting.formatMoney(buildDiff[constructionCostsRow[j].dbID].DefaultValue);
     			 }
     			  premiumTextField[j].value=premium;
     			  row.add(rowUnitBD);
     			 row.add(premiumTextField[j]);
     			 
     			 
     			 
     		}       	  
      else if(constructionCostsRow[j].Hid == 1)	
       	  {
       	  	
       	  	var rowUnitBQ1=Ti.UI.createLabel(
	           	{
	           		width:'50%',
	           		//height:'',
	           		text:'$',
	           		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'14dp'}
									 :{fontSize:'12%'},
	           		color:glblDarkGrayFont,
	           		touchEnabled:false,
	           		textAlign:'left',
	           		top:'60%'
	           		//backgroundColor:'#ff0'
	           	});
	           	
	       var rowUnitBQ2=Ti.UI.createLabel(
	           	{
	           		width:'50%',
	           		//height:'100%',
	           		text:'$',
	           		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'14dp'}
									 :{fontSize:'12%'},
	           		color:glblDarkGrayFont,
	           		touchEnabled:false,
	           		textAlign:'left',
	           		top:'60%'
	           		//backgroundColor:'#ff0'
	           	});
	           
	       var rowUnitBQ3=Ti.UI.createLabel(
	           	{
	           		width:'50%',
	           		//height:'100%',
	           		text:'$',
	           		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'14dp'}
									 :{fontSize:'12%'},
	           		color:glblDarkGrayFont,
	           		touchEnabled:false,
	           		textAlign:'left',
	           		top:'60%'
	           		//backgroundColor:'#ff0'
	           	});    	
       	   basicTextField[j].left='10%';
       	   basicTextField[j].width='25%';
       	     basicTextField[j].height='45%';  
       	  
       	   standardTextField[j].left='40%';
       	   standardTextField[j].width='25%'
       	     standardTextField[j].height='45%'
       	    
       	    
       	    highTextField[j].left='70%';
       	    highTextField[j].width='25%';
       	     highTextField[j].height='45%';
       	     
       	     var basic = buildQuality[constructionCostsRow[j].dbID].Basic;
     			 if(basic == 0){
     			 	//basic = '';
     			 }
     			 else{
     			 	basic = accounting.formatMoney(buildQuality[constructionCostsRow[j].dbID].Basic);
     			 }

			var std = buildQuality[constructionCostsRow[j].dbID].Standard;
     			 if(std == 0){
     			 	//std = '';
     			 }
     			 else{
     			 	std = accounting.formatMoney(buildQuality[constructionCostsRow[j].dbID].Standard);
     			 }
     			 
     			 var high = buildQuality[constructionCostsRow[j].dbID].High;
     			 if(high == 0){
     			 	//high = '';
     			 }
     			 else{
     			 	high = accounting.formatMoney(buildQuality[constructionCostsRow[j].dbID].High);
     			 }

       	    
       	   
       	  basicTextField[j].value=basic;
       	  standardTextField[j].value=std;  
       	  highTextField[j].value=high;
       	   
       	   rowUnitBQ1.left = '7%'
       	   row.add(rowUnitBQ1);
       	   row.add(basicTextField[j]);
       	   
       	   rowUnitBQ2.left = '37%'
       	   row.add(rowUnitBQ2);
           row.add(standardTextField[j]);
           
           rowUnitBQ3.left = '67%'
       	   row.add(rowUnitBQ3);
           row.add(highTextField[j]);
       	  } 
          else
          {
          	var rowUnitBQ1=Ti.UI.createLabel(
	           	{
	           		width:'50%',
	           		//height:'',
	           		text:'$',
	           		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'14dp'}
									 :{fontSize:'12%'},
	           		color:glblDarkGrayFont,
	           		touchEnabled:false,
	           		textAlign:'left',
	           		top:'64%'
	           		//backgroundColor:'#ff0'
	           	});
	           	
	       var rowUnitBQ2=Ti.UI.createLabel(
	           	{
	           		width:'50%',
	           		//height:'100%',
	           		text:'$',
	           		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'14dp'}
									 :{fontSize:'12%'},
	           		color:glblDarkGrayFont,
	           		touchEnabled:false,
	           		textAlign:'left',
	           		top:'64%'
	           		//backgroundColor:'#ff0'
	           	});
	           
	       var rowUnitBQ3=Ti.UI.createLabel(
	           	{
	           		width:'50%',
	           		//height:'100%',
	           		text:'$',
	           		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'14dp'}
									 :{fontSize:'12%'},
	           		color:glblDarkGrayFont,
	           		touchEnabled:false,
	           		textAlign:'left',
	           		top:'64%'
	           		//backgroundColor:'#ff0'
	           	});
	           	
	       var rowUnitBQ4=Ti.UI.createLabel(
	           	{
	           		width:'50%',
	           		//height:'100%',
	           		text:'$',
	           		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'14dp'}
									 :{fontSize:'12%'},
	           		color:glblDarkGrayFont,
	           		touchEnabled:false,
	           		textAlign:'left',
	           		top:'64%'
	           		//backgroundColor:'#ff0'
	           	});
	           	
	       rowUnitBQ1.left = '3%'
       	   row.add(rowUnitBQ1);
       	   
       	   rowUnitBQ2.left = '28%'
       	   row.add(rowUnitBQ2);
           
           rowUnitBQ3.left = '53%'
       	   row.add(rowUnitBQ3);
       	   
       	   rowUnitBQ4.left = '77%'
       	   row.add(rowUnitBQ4);
           		
           	//noneTextField[j].value=isNumeric(fitoutCost[constructionCostsRow[j].dbID].None) == true?accounting.formatMoney(fitoutCost[constructionCostsRow[j].dbID].None):fitoutCost[constructionCostsRow[j].dbID].None;
           basicTextField[j].left = '6%';
     	   standardTextField[j].left = '31%';
     	   highTextField[j].left = '56%';
     	   premiumTextField[j].left = '80%';
     	   
     	   basicTextField[j].width = '20%';
     	   standardTextField[j].width = '20%';
     	   highTextField[j].width = '20%';
     	   premiumTextField[j].width = '19%';
     	   
     	   var basic = fitoutCost[constructionCostsRow[j].dbID].Basic;
     			 if(basic == 0){
     			 	//basic = '';
     			 }
     			 else{
     			 	basic = accounting.formatMoney(fitoutCost[constructionCostsRow[j].dbID].Basic);
     			 }

			var std = fitoutCost[constructionCostsRow[j].dbID].Standard;
     			 if(std == 0){
     			 	//std = '';
     			 }
     			 else{
     			 	std = accounting.formatMoney(fitoutCost[constructionCostsRow[j].dbID].Standard);
     			 }
     			 
     			 var high = fitoutCost[constructionCostsRow[j].dbID].High;
     			 if(high == 0){
     			 	//high = '';
     			 }
     			 else{
     			 	high = accounting.formatMoney(fitoutCost[constructionCostsRow[j].dbID].High);
     			 }
     			 
     			 var premium = fitoutCost[constructionCostsRow[j].dbID].Premium;
     			 
     			 if(premium == 0){
     			 	//premium = '';
     			 }
     			 else{
     			 	premium = accounting.formatMoney(fitoutCost[constructionCostsRow[j].dbID].Premium);
     			 }
     			 
     			 
     	   
           basicTextField[j].value=basic;
           standardTextField[j].value=std;
           highTextField[j].value=high;
           
           if(constructionCostsRow[j].Hid != 0){
           		premiumTextField[j].value=premium;
           }
           	
           
           	
           row.add(basicTextField[j]);
           row.add(standardTextField[j]);
           row.add(highTextField[j]);
           row.add(premiumTextField[j]);
          	
          }
          
          
          basicTextField[j].addEventListener('blur',function(e)
          {
          	basicTextField[j].value=accounting.formatMoney(basicTextField[j].value);
          });
          
          standardTextField[j].addEventListener('blur',function(e)
          {
          	standardTextField[j].value=accounting.formatMoney(standardTextField[j].value);
          });
          
          highTextField[j].addEventListener('blur',function(e)
          {
          	highTextField[j].value=accounting.formatMoney(highTextField[j].value);
          });
          
          if(constructionCostsRow[j].Hid != 0)
          {
          	premiumTextField[j].addEventListener('blur',function(e)
	          {
	          	premiumTextField[j].value=accounting.formatMoney(premiumTextField[j].value);
	          });
          }
          
          
          //////
          
          basicTextField[j].addEventListener('change',function(e)
           {
           		basicTextField[j].backgroundColor='#fff';
	       });
	       
	       standardTextField[j].addEventListener('change',function(e)
           {
           		standardTextField[j].backgroundColor='#fff';
	       });
	       
	       highTextField[j].addEventListener('change',function(e)
           {
           		highTextField[j].backgroundColor='#fff';
	       });
	       
	       premiumTextField[j].addEventListener('change',function(e)
           {
           		premiumTextField[j].backgroundColor='#fff';
	       });
          
          
      	   
             
            return row;
}			
			
				
  return constructionCostWindow;
}
module.exports=winOpen;