/**
 * @projectDescription QwikFeaso
 * 
 * @author List- vivek Gidmare(vivek.gidmare@quagnitia.com),Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */
/*
   Function: Window showing list of current dwellings 
   
   @param {Object} addDwellingWindow	Window object
   @return {Object}						Returns current window object
*/

function winOpen (winTitle,fromWin) {
var DetailedDwellingList=[];
var addDwellingWindow;
 var dwellingTableView=null;
 var DefaultconstructionArray=[];
		
			DefaultconstructionArray.push("Easy");
			DefaultconstructionArray.push("Standard");
			DefaultconstructionArray.push("Standard");
			DefaultconstructionArray.push("Standard");
			DefaultconstructionArray.push("None");

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
  
  	 addDwellingWindow=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 		
	 
	 // Handle back press
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
	 	addDwellingWindow.close();});
	 addDwellingWindow.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	 
	 /**
	  * Logic to show the right navigation button (Add) 
	  * When user enters this window while going through Qwik or Detail Feaso and adding dwelling,
	  * the Save button won't be shown, but when he navigates through Dwelling in Settings page 
	  * the Save button would become visible to him.
	  */
	 if(fromWin == 2)
		{
			// Navigates to add dwelling window
			 rightBtn.addEventListener('click',function(e)
			 {
			 	btnSelector(rightBtn);
			 	var WinOpen=require('ui/common/DwellingDescription');
				new WinOpen('','',DefaultconstructionArray,1).open();
			 	
			 });
	 	}
	 	
  }
  else // iPhone or iPad secific code
  {
  	accounting=require('lib/accounting');
  	//Window Created for iphone to suport navigation Bar
  	addDwellingWindow=Ti.UI.createWindow({
  			backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			//title:winTitle,
			titleControl:Ti.UI.createLabel({text:winTitle,
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
		    navGroup.close(addDwellingWindow,{animated: true});
		    
		  });
  
		  lftNavView.add(BackBtn);
		
		  addDwellingWindow.leftNavButton=lftNavView;
   		
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
			  
		    
	  		// Navigates to add dwelling window
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);
		  		var WinOpen=require('ui/common/DwellingDescription');
		  		navGroup.open(new WinOpen('','',DefaultconstructionArray,1),{animated: true});
			 	
		  });
		  
		  rightView.add(RightBtn);
		  
		  /**
	  		* Logic to show the right navigation button (Add) 
	  		* When user enters this window while going through Qwik or Detail Feaso and adding dwelling,
	  		* the Save button won't be shown, but when he navigates through Dwelling in Settings page 
	  		* the Save button would become visible to him.
	  		*/ 
		  if(fromWin ==2)
		  {
		  	
		  	 addDwellingWindow.rightNavButton=rightView;
		  }
		 
   
   
   
  }
  
	
  
	if(fromWin == 2)
		{
			//subHeaderLabel.text='Construction Cost Calculator';
		}
		else
		{
			subHeaderLabel.text='Dwellings Description';
			addDwellingWindow.add(viewSubHeader);
			
			viewSubHeader.add(subHeaderLabel);
			if(Ti.Platform.osname == 'iphone')
			{
			viewSubHeader.top='0%';	
			}	
			
		}

	
addDwellingWindow.orientationModes=[Ti.UI.PORTRAIT ];
dwellingTableView=Ti.UI.createTableView(
  	{
  		width:'100%',
  		top:Ti.Platform.osname === 'android'?'10%':'0%',
  		backgroundColor:'#fff',
  		
  	});
  	
	
	if (fromWin === 2) 
	{
		//from setting
		dwellingTableView.top=Ti.Platform.osname == 'android'?'10%':'0%';
		
	}
	else
	{//from scenarioDetails*/
		
		dwellingTableView.top=Ti.Platform.osname == 'android'?'16%':'6%';
		
	}
	
	
 addDwellingWindow.add(dwellingTableView);


addDwellingWindow.addEventListener('open', function (e) {
	
	/**
	 * Logic to populate dwelling list from temporary dwelling list or from current default dwelling list
	 * If user navigates through Qwik or Details feaso, app displays the dwelling list from temporary table
	 * depending upon his selection for Build Quality and Build Difficulty
	 * else if he navigates through Dwellings in Settings window then, app will display the dwelling list from 
	 * current default dwelling details   
	 */
	
	dwellingTableView.data=getDwellingList();
});


addDwellingWindow.addEventListener('focus', function (e) {
	
	if (Ti.Platform.osname == 'android')
	{
		if(Ti.App.QwikFeasoGlobalVars.SummaryUpdated==1)
		{
			/**
			 * Logic for updating the list of dwellings when user navigates from Adding a new dwelling
			 * App will load the corresponding dwelling list
			 */
				addDwellingWindow.add(actvityIndicatorView);
				actInd.show();
				setTimeout(function(){
							dwellingTableView.data=getDwellingList();
 	 					actInd.hide();
 	 					addDwellingWindow.remove(actvityIndicatorView);
  						}, 500);
		}
		else
		{
			/**
			 * Logic for updating the list of dwellings when user navigates from Adding a new dwelling
			 * App will load the corresponding dwelling list
			 */
							dwellingTableView.data=getDwellingList();
		}
	Ti.App.QwikFeasoGlobalVars.SummaryUpdated=0;
	}
	else
	{
		if(QwikFeasoGlobalVars.SummaryUpdated == 1)
		{
			/**
			 * Logic for updating the list of dwellings when user navigates from Adding a new dwelling
			 * App will load the corresponding dwelling list
			 */
			    addDwellingWindow.add(actvityIndicatorView);
				actInd.show();
				setTimeout(function(){
						dwellingTableView.data=getDwellingList();	
 	 					actInd.hide();
 	 					addDwellingWindow.remove(actvityIndicatorView);
  						}, 500);
		}
		else
		{
			/**
			 * Logic for updating the list of dwellings when user navigates from Adding a new dwelling
			 * App will load the corresponding dwelling list
			 */
							
			dwellingTableView.data=getDwellingList();				
		}
	QwikFeasoGlobalVars.SummaryUpdated=0;
	} 
	
});





var rowHt=(Ti.Platform.displayCaps.platformHeight*35)/100;
/*
   Function: Set the header for Android devices
   
   @param {Object) headerView			View object that holds the container to the headerLabel  
   @param {Object} headerLabel			Label object that holds the name of header
   @param {Object) leftBtn				Left button object for going back 
   @param {Object) rightBtn				Right button object for adding a new dwelling
   @param {Object) addDwellingWindow	Window object that holds all the above objects
   @memberOf headerLabel				View that is a member of Header.js file
   @memberOf leftBtn					View that is a member of Header.js file
   @memberOf rightBtn					View that is a member of Header.js file
   @memberOf headerView					View that is a member of Header.js file
*/

function setHeader () {
	
		headerLabel.text=winTitle;
		headerLabel.width='60%';
		
		leftBtn.title='Back';
		
		
		headerView.add(leftBtn);						
		headerView.add(headerLabel);
		
		if(fromWin == 2)
		{
			rightBtn.title='Add';
			headerView.add(rightBtn);	
		}
		
		addDwellingWindow.add(headerView);
		}							

/**
 * Function generates the list of dwellings corresponding to the navigation of the user
 * @param {Object} fromTable	Holds the list of dwellings 
 */
function getDwellingList (/*fromTable*/) {
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var DwellingRowData=[];
	//Permanant
	var GetResultSet;
	GetResultSet=DBFeaso.execute('SELECT D.Name,D.BuildQuality,D.BuildDifficulty,D.BathroomFitout,D.KitchenFitout,D.LandsapingFitout,DD.* FROM DwellingDetailsSummary DD,Dwellings D where DD.DwellingID=D.DwellingID ORDER BY DD.DwellingID DESC');
  	
  		while(GetResultSet.isValidRow())
  		{
  			
  			Ti.API.info('dwellings : '+GetResultSet.fieldByName('DwellingID'));
  		
	  		var dwellingRow=Ti.UI.createTableViewRow(
				{
					width:'100%',
					selectedBackgroundColor:'#fff',
					className:'dwellingRow',
					rowName:GetResultSet.fieldByName('Name'),
					rowID:GetResultSet.fieldByName('DwellingID'),
					rowBQ:GetResultSet.fieldByName('BuildQuality'),
					rowBD:GetResultSet.fieldByName('BuildDifficulty'),
					rowBFC:GetResultSet.fieldByName('BathroomFitout'),
					rowKFC:GetResultSet.fieldByName('KitchenFitout'),
					rowLFC:GetResultSet.fieldByName('LandsapingFitout'),
					editable:false
				}); 
				
				
				
					
			var dwellingNamelabel=Ti.UI.createLabel(
				{
					left:'3%',
					text:''+GetResultSet.fieldByName('Name'),
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'23dp',fontWeight:'bold'}
									 :{fontSize:'22%',fontWeight:'bold'},
					color:glblGreenFont,
					touchEnabled:false,
			
					
				});	
			var livingAreaView=Ti.UI.createView(
				{
					width:'100%',
					height:'auto',
					touchEnabled:false
				});	
				
				
			var livingAreaLabel=Ti.UI.createLabel({
					left:'3%',
					text:'Living Area:',
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp',fontWeight:'bold'}
									 :{fontSize:'15%',fontWeight:'bold'},
					color:glblDarkGrayFont,
					touchEnabled:false,
				
				});	
		
			var livingAreaValue=Ti.UI.createLabel({
					right:'1%',
					text:''+GetResultSet.fieldByName('TotalLivingAreaM2').toFixed(2)+' m2',
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp'}
									 :{fontSize:'15%'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	
		
				livingAreaView.add(livingAreaLabel);
				livingAreaView.add(livingAreaValue);
					
				
			var constructionAreaView=Ti.UI.createView(
				{
					width:'100%',
					touchEnabled:false
				});	
				
			var constructionAreaLabel=Ti.UI.createLabel({
					left:'3%',
					text:'Construction Area:',
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp',fontWeight:'bold'}
									 :{fontSize:'15%',fontWeight:'bold'},
					color:glblDarkGrayFont,
					touchEnabled:false,
				
				});	
			
			
			var constructionAreaValue=Ti.UI.createLabel({
					right:'1%',
					text:''+GetResultSet.fieldByName('TotalConstructionAreaM2').toFixed(2)+' m2',
			
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp'}
									 :{fontSize:'15%'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	
			
			constructionAreaView.add(constructionAreaLabel);
			constructionAreaView.add(constructionAreaValue);
				
			var baseConstructionCostView=Ti.UI.createView(
				{
					width:'100%',
					touchEnabled:false,
				});	
					
			var baseConstructionCostLabel=Ti.UI.createLabel({
					left:'3%',
					text:'Construction Cost:',
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp',fontWeight:'bold'}
									 :{fontSize:'15%',fontWeight:'bold'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
		
			
			
			var baseConstructionCostValue=Ti.UI.createLabel({
					right:'1%',
					//text:'$'+GetResultSet.fieldByName('TotalConstructionCostM2').toFixed(0),
					text:'$'+accounting.formatMoney(GetResultSet.fieldByName('TotalConstructionCostM2')),
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp'}
									 :{fontSize:'15%'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
				
			
			baseConstructionCostView.add(baseConstructionCostLabel);
			baseConstructionCostView.add(baseConstructionCostValue);
					
			var buildQualityView=Ti.UI.createView(
				{
					width:'100%',
					touchEnabled:false,
				});	
			var buildQualityLabel=Ti.UI.createLabel({
					left:'3%',
					text:'Build Quality:',
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp',fontWeight:'bold'}
									 :{fontSize:'15%',fontWeight:'bold'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 
			
			var buildQualityValue=Ti.UI.createLabel({
					right:'1%',
					text:GetResultSet.fieldByName('BuildQuality'),
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp'}
									 :{fontSize:'15%'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
				
			
			buildQualityView.add(buildQualityLabel);
			buildQualityView.add(buildQualityValue);
		
			var buildDifficultyView=Ti.UI.createView(
				{
					width:'100%',
					touchEnabled:false,
				});	
			var buildDifficultyLabel=Ti.UI.createLabel({
					left:'3%',
					text:'Build Difficulty:',
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp',fontWeight:'bold'}
									 :{fontSize:'15%',fontWeight:'bold'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
			var buildDifficultyValue=Ti.UI.createLabel({
					right:'1%',
					text:GetResultSet.fieldByName('BuildDifficulty'),
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp'}
									 :{fontSize:'15%'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
				
			
			buildDifficultyView.add(buildDifficultyLabel);
			buildDifficultyView.add(buildDifficultyValue);
		
		/**********/
			
		var bathroomFCView=Ti.UI.createView(
				{
					width:'100%',
					touchEnabled:false,
				});	
			var bathroomFCLabel=Ti.UI.createLabel({
					left:'3%',
					text:'Bathroom Finishings:',
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp',fontWeight:'bold'}
									 :{fontSize:'15%',fontWeight:'bold'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
			var bathroomFCValue=Ti.UI.createLabel({
					right:'1%',
					text:GetResultSet.fieldByName('BathroomFitout'),
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp'}
									 :{fontSize:'15%'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
			
			bathroomFCView.add(bathroomFCLabel);
			bathroomFCView.add(bathroomFCValue);
			
			/*****/
			
			var kitchenFCView=Ti.UI.createView(
				{
					width:'100%',
					touchEnabled:false,
				});	
			var kitchenFCLabel=Ti.UI.createLabel({
					left:'3%',
					text:'Kitchen Finishings:',
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp',fontWeight:'bold'}
									 :{fontSize:'15%',fontWeight:'bold'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
			var kitchenFCValue=Ti.UI.createLabel({
					right:'1%',
					text:GetResultSet.fieldByName('KitchenFitout'),
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp'}
									 :{fontSize:'15%'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
				
			
			kitchenFCView.add(kitchenFCLabel);
			kitchenFCView.add(kitchenFCValue);
			
			/******/
			
			var landscapingFCView=Ti.UI.createView(
				{
					width:'100%',
					touchEnabled:false,
				});	
			var landscapingFCLabel=Ti.UI.createLabel({
					left:'3%',
					text:'Landscaping Finishings:',
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp',fontWeight:'bold'}
									 :{fontSize:'15%',fontWeight:'bold'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
			var landscapingFCValue=Ti.UI.createLabel({
					right:'1%',
					text:GetResultSet.fieldByName('LandsapingFitout'),
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp'}
									 :{fontSize:'15%'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
			landscapingFCView.add(landscapingFCLabel);
			landscapingFCView.add(landscapingFCValue);
			
			/*****/
			/******/
			
			var FCView=Ti.UI.createView(
				{
					width:'100%',
					touchEnabled:false,
				});	
			var FCLabel=Ti.UI.createLabel({
					left:'3%',
					text:'Total Finishings Cost:',
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp',fontWeight:'bold'}
									 :{fontSize:'15%',fontWeight:'bold'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
			var FCValue=Ti.UI.createLabel({
					right:'1%',
					text:'$'+accounting.formatMoney(GetResultSet.fieldByName('TotalFitoutCosts')),
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp'}
									 :{fontSize:'15%'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
			FCView.add(FCLabel);
			FCView.add(FCValue);
			
			/*****/
			/******/
			
			var TotalCView=Ti.UI.createView(
				{
					width:'100%',
					touchEnabled:false,
				});	
			var TotalCLabel=Ti.UI.createLabel({
					left:'3%',
					text:'Total Cost:',
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp',fontWeight:'bold'}
									 :{fontSize:'15%',fontWeight:'bold'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
			var TotalCValue=Ti.UI.createLabel({
					right:'1%',
					text:'$'+accounting.formatMoney(GetResultSet.fieldByName('TotalCost')),
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp'}
									 :{fontSize:'15%'},
					color:glblDarkGrayFont,
					touchEnabled:false,
					
				});	 	
			TotalCView.add(TotalCLabel);
			TotalCView.add(TotalCValue);
			
			/*****/
			
			
			var dwellingSummaryValue=Ti.UI.createLabel(
				{
					left:'3%',
					text:''+GetResultSet.fieldByName('Summary'),
					wordWrap:true,
					font:Ti.Platform.osname =='android' 
									 ?{fontSize:'17dp'}
									 :{fontSize:'15%'},
					color:glblDarkGrayFont,
					touchEnabled:false,
				
				});	
			
			//dwellingSummaryView.add(dwellingSummaryValue);
			
			
			
			if(Ti.Platform.osname == 'android')
			{
				dwellingRow.layout='vertical';
			dwellingRow.add(dwellingNamelabel);	
			dwellingRow.add(livingAreaView);
			dwellingRow.add(constructionAreaView);
			dwellingRow.add(buildDifficultyView);
			dwellingRow.add(buildQualityView);
			dwellingRow.add(bathroomFCView);
			dwellingRow.add(kitchenFCView);
			dwellingRow.add(landscapingFCView);
			
			dwellingRow.add(baseConstructionCostView);
			dwellingRow.add(FCView);
			dwellingRow.add(TotalCView);
				
			dwellingRow.add(dwellingSummaryValue);
			//dwellingRow.add(dwellingSummaryView);
				
			}
			else
			{
				var viewRow=Ti.UI.createView(
					{
						width:'100%',
						height:Ti.UI.SIZE,
						layout:'vertical',
						touchEnabled:false,
					});
					viewRow.add(dwellingNamelabel);
					
					livingAreaView.height='20dp'
					viewRow.add(livingAreaView);
					
					constructionAreaView.height='20dp';
					viewRow.add(constructionAreaView);
				
					buildDifficultyView.height='20dp';
					viewRow.add(buildDifficultyView);
					
					buildQualityView.height='20dp';
					viewRow.add(buildQualityView);
					
					bathroomFCView.height='20dp';
					viewRow.add(bathroomFCView);
				
					kitchenFCView.height='20dp';
					viewRow.add(kitchenFCView);
					
					landscapingFCView.height='20dp';
					viewRow.add(landscapingFCView);
					
					baseConstructionCostView.height='20dp';
					viewRow.add(baseConstructionCostView);
					
					FCView.height='20dp';
					viewRow.add(FCView);
					TotalCView.height='20dp';
					viewRow.add(TotalCView);
					
					
					dwellingSummaryValue.top='5dp';
					dwellingSummaryValue.height=Ti.UI.SIZE;
					viewRow.add(dwellingSummaryValue);
				
				dwellingRow.add(viewRow);
				
			}
			DwellingRowData.push(dwellingRow);
	  		
	  		GetResultSet.next();
  		}
		GetResultSet.close();
	DBFeaso.close();
	return DwellingRowData;
	
 
 
}

//***
dwellingTableView.addEventListener('click',function(e)
		{
			
			
			/**
			 * Logic to open the edit dwelling window.
			 * If user clicks on any dwelling from the list he would edit the details of the dwelling (name, quantity) or
			 * delete the selected dwelling 
			 * else if clicks the Add button on top right corner he would be adding a new dwelling
			 */
			
			addDwellingWindow.add(actvityIndicatorView);
			actInd.show();
			
			var rowName=e.source.rowName;
			var RowID=e.source.rowID;

			var rowDifficulty=e.source.rowBD;
			var rowQuality=e.source.rowBQ;	
			var rowBathroomFC=e.source.rowBFC;	
			var rowKitchenFC=e.source.rowKFC;	
			var rowLandscapingFC=e.source.rowLFC;	
		
		var constructionArray=[];
		
			constructionArray.push(rowDifficulty);
			constructionArray.push(rowQuality);
			constructionArray.push(rowBathroomFC);
			constructionArray.push(rowKitchenFC);
			constructionArray.push(rowLandscapingFC);
			
		
		
			if(Ti.Platform.osname == 'android')
			{	
				if(fromWin==2)//called from Setting module
				{
				var WinOpen=require('ui/common/DwellingDescription');
			 
				new WinOpen(RowID,rowName,constructionArray,2).open();

				}
				else
				if(fromWin==1)
				{//called from scenarioDetails to add dwellings
					
					Ti.App.QwikFeasoGlobalVars.AddDwelling=1;
					
					AddDwellingForScenario(RowID,rowName);
					addDwellingWindow.close();
					
				}
				
			}
			else
			{
				if(fromWin==2)//called from Setting module
				{
					//Ti.API.info('sending dwelling id : '+RowID);
					var WinOpen=require('ui/common/DwellingDescription');
					navGroup.open(new WinOpen(RowID,rowName,constructionArray,2),{animated: true});
				}
				else
				if(fromWin==1)
				{//called from scenarioDetails to add dwellings
					//Ti.API.info('sending dwelling id : '+RowID);
					QwikFeasoGlobalVars.AddDwelling=1;
					
					AddDwellingForScenario(RowID,rowName);
					navGroup.close(addDwellingWindow,{animated: true});
					
				}
							
			}
			
		actInd.hide();
		addDwellingWindow.remove(actvityIndicatorView);
		
		});

addDwellingWindow.add(actInd);	
return addDwellingWindow;

}
module.exports=winOpen;
