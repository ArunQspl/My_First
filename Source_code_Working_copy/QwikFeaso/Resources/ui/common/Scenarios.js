/**
 * @projectDescription QwikFeaso
 * 
 * @author vivek Gidmare vivek.gidmare@quagnitia.com
 * @version 1.0
 */

/**
 *Function will create Scenario Window
 * this window is accessible form Dashboard.js and Setting.js
 *
 * fromWin = 1 when scenarios called for QwikFeaso
 * fromWin = 2 when Scenarios called form Setting page   
 */
function winOpen (winTitle,fromWin) {
	
var scenarioWindow;
var scenarioListTableView;
var scenarioListRow;
var scenarioList=[];
if(Ti.Platform.osname == 'android')
  {/*
  	 * Include the files needed for UI Design and Database usage
  	 * Header.js will manage navigation for android
  	 * 
  	 */
  	Ti.include('/ui/common/Header.js');
	Ti.include('/services/DataBaseTransaction.js')	
	Ti.include('/services/GetFromDataBase.js')	
	globalName=Ti.App.QwikFeasoGlobalVars; //include header as android do not have navigation controll
//Window Created for Android
  	scenarioWindow=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	 
	 leftBtn.addEventListener('click',function(e)
	 {//back Btn
	 	btnSelector(leftBtn);
	 	scenarioWindow.close();
	 	if(fromWin == 1) // from dashboard
		 	DeleteScenarioDetailePage();
	});
	
	 scenarioWindow.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	 if(fromWin == 2) // from settings
		{
			
			rightBtn.addEventListener('click',function(e)
			 {
				 	btnSelector(rightBtn);
					scenarioWindow.add(actvityIndicatorView);
			 		actInd.show();
			 		var winOpen=require('ui/common/AddScenario');
					new winOpen(winTitle,fromWin).open();	
			 		actInd.hide();
			 		scenarioWindow.remove(actvityIndicatorView);  
			 	
			 
			  });
		}
  }
  else
  {
  	
						
  	globalName=QwikFeasoGlobalVars;
  	//Window Created for iOS to support navigation Bar
  	scenarioWindow=Ti.UI.createWindow({
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
		 BackBtn.addEventListener('click', function(e) {    
		 	btnSelector(BackBtn);
		 		navGroup.close(scenarioWindow,{animated: true});
		 		
			 	if(fromWin == 1) // from dashboard
					DeleteScenarioDetailePage();
		  });
  
		  lftNavView.add(BackBtn);
		  
		  scenarioWindow.leftNavButton=lftNavView; //Navigation controllers left view
		  
		  if(fromWin == 2) // from settings
		  {
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
			 RightBtn.addEventListener('click',function(e){
			 	btnSelector(RightBtn);
			 	scenarioWindow.add(actvityIndicatorView);
			 		actInd.show();
			 	
					var winOpen=require('ui/common/AddScenario');
					navGroup.open(new winOpen(winTitle,fromWin),{animated: true});
							
					actInd.hide();
					scenarioWindow.remove(actvityIndicatorView);
		 	});
		  	rightView.add(RightBtn);
		  	scenarioWindow.rightNavButton=rightView;//Navigation controllers right view
		  }
		  
		  //////////////////////
		  
		 /* if(fromWin == 1) {	  // from dashboard
			var subHeaderView=Ti.UI.createView({
					width:'100%',
					height:'6%',
					top:'0%',
					backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			});
			
			var subHeaderTextLabel = Ti.UI.createLabel({
					text : 'Select a Development Strategy',
					color : '#fff',
					font:{fontSize:'16dp',fontWeight:'bold'},
					left : '5%',
					textAlign : 'left'
			});	
			subHeaderView.add(subHeaderTextLabel);
			scenarioWindow.add(subHeaderView);
		} */
		
		////////////////////////
		   
  }

scenarioWindow.orientationModes=[Ti.UI.PORTRAIT];

	var rowHt=(Ti.Platform.displayCaps.platformHeight*15)/100;
	
	/////////////////////

	/*subHeaderLabel.text='Select your Development Strategy';
	viewSubHeader.add(subHeaderLabel);
	
	if(Ti.Platform.osname == 'iphone')
			viewSubHeader.top='0%';	*/
			
	///////////////////
	
	
	/////////////////
	
	var parentView = Ti.UI.createView({
		width:'100%',
		height:'100%',
		layout:'vertical',
	});
	
	if(Ti.Platform.osname == 'android')
		setHeader(); 
	
	if(fromWin == 1){
		addSubHeader();
	}			
	
	function addSubHeader () {
		
		if(Ti.Platform.osname == 'android'){
					
			subHeaderLabel.text='Select your Development Strategy';
			viewSubHeader.add(subHeaderLabel);
			parentView.add(viewSubHeader);
			viewSubHeader.top = '0%'
		}
		else{
			
			var subHeaderView=Ti.UI.createView({
					width:'100%',
					height:'6%',
					top:'0%',
					backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			});
			
			var subHeaderTextLabel = Ti.UI.createLabel({
					text : 'Select a Development Strategy',
					color : '#fff',
					font:{fontSize:'16dp',fontWeight:'bold'},
					left : '5%',
					textAlign : 'left'
			});	
			subHeaderView.add(subHeaderTextLabel);
			parentView.add(subHeaderView);
		}
	  
	}
	
	///////////////
	
	
scenarioWindow.addEventListener('open',function(e)
	{
		scenarioWindow.add(actvityIndicatorView);
	actInd.show();
		setTimeout(function()
		{
		//get the list of scenarios	
		getScenarios();
			
		actInd.hide();
		scenarioWindow.remove(actvityIndicatorView);
		},100);
	});
scenarioWindow.addEventListener('focus', function (e) {
	//Logic behind Updating UI after adding new scenario or editing existing one 
	
	if (Ti.Platform.osname == 'android')
	{
		if(Ti.App.QwikFeasoGlobalVars.SummaryUpdated==1)
		{	
			scenarioWindow.add(actvityIndicatorView);
			actInd.show();
				setTimeout(function(){
						getScenarios();	
 	 					actInd.hide();
 	 					scenarioWindow.remove(actvityIndicatorView);
  				}, 500);
		}
	Ti.App.QwikFeasoGlobalVars.SummaryUpdated=0;
	}
	else
	{
		if(QwikFeasoGlobalVars.SummaryUpdated==1)
		{
			scenarioWindow.add(actvityIndicatorView);
				actInd.show();
				setTimeout(function(){
						getScenarios();	
 	 					actInd.hide();
 	 					scenarioWindow.remove(actvityIndicatorView);
  						}, 100);
		}
	QwikFeasoGlobalVars.SummaryUpdated=0;
	} 
});


/**
 * Function will design Header(Navigation Bar) used for navigation in android
 */
function setHeader () {
		headerLabel.text=winTitle;
		headerLabel.width = '60%';
		//headerLabel.left='30%';
		leftBtn.title='Back';
		headerView.add(headerLabel);
		headerView.add(leftBtn);
		
		//UI gets updated depends on navigation
			if(fromWin == 2) // from settings
			{
				rightBtn.title='Add';
				headerView.add(rightBtn);	
			}
			
			///////////////	
			
			/*if(fromWin == 1) // from dashboard
			{
				subHeaderLabel.text='Select a Development Strategy';
				viewSubHeader.add(subHeaderLabel);
				scenarioWindow.add(viewSubHeader);
			}*/
			
			///////////////
			
		parentView.add(headerView);	
			
		///////////////
			
		//scenarioWindow.add(headerView);
		
		//////////////
}

scenarioListTableView=Ti.UI.createTableView(
	  	{
	  		width:'100%',
	  		height:'auto',
	  		scrollable:true,
	  		//top:'17%',
	  		backgroundColor:'#fff'
	  	});
	  	
	  	
//////////////////	  	
	  
 //scenarioWindow.add(scenarioListTableView); 	  	
 parentView.add(scenarioListTableView);
 scenarioWindow.add(parentView);
 //////////////////
	  	
 scenarioListTableView.addEventListener('click',function(e)
			{
				
				var fromWin=e.source.fromWin;
				var rowName=e.source.rowName;
				var FeasibilityID=e.source.scenarioID;
				
				if(Ti.Platform.osname == 'android')
				{
					scenarioWindow.add(actvityIndicatorView);
					actInd.show();
					if(fromWin == 1) // from dasboard
					{
						var OpenScenarioDetailsWin=require('ui/common/ScenarioDetails');
						new OpenScenarioDetailsWin(rowName,FeasibilityID).open();
						scenarioWindow.close();
					}
					else
					if(fromWin == 2) // from settings
					{
						var rowName=e.source.rowName;
						var rowId = e.source.fromWin;
						var winOpen=require('ui/common/EditScenario');
						new winOpen(winTitle,fromWin,rowName,FeasibilityID).open();	
					}
					actInd.hide();
					scenarioWindow.remove(actvityIndicatorView);
				}
				else
				{
					if(fromWin == 1)// from dasboard
					{
						var OpenScenarioDetailsWin=require('ui/common/ScenarioDetails');
						navGroup.open(new OpenScenarioDetailsWin(rowName,FeasibilityID),{animated: true});
						navGroup.close(scenarioWindow,{animated: false});
					}
					else
					if(fromWin == 2)// from settings
					{
					var rowName=e.source.rowName;
					var rowId = e.source.fromWin;
					var winOpen=require('ui/common/EditScenario');
						navGroup.open(new winOpen(winTitle,fromWin,rowName,FeasibilityID),{animated: true});	
					}
					
				}
				
				
				
			});

/**
 * Function will design list of scenarios 
 * create tableview holding this list
 */
function getScenarios () 
	{
		var rowData=[];
		 scenarioList=GetFeasibilityList();
		 
		for(var i=0;i<scenarioList.length;i++)
		{
		   scenarioListRow=Ti.UI.createTableViewRow(
				{
				height:rowHt,
				backgroundColor:'#fff',
				selectedBackgroundColor:'#fff',
				backgroundSelectedColor:'#fff',
				clickName:'scenarioRow',
				fromWin:fromWin,
				scenarioID:scenarioList[i].MenuID,
				rowName:scenarioList[i].Name,
				editable:false//put this property false otherwise btn on row will not work
				});
			var scenarioName=Ti.UI.createLabel({
					left:'5%',
					right:10,
					text:scenarioList[i].Name,
					row:i,
					font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
									 ?{fontSize:'20%',fontWeight:'bold'}
									 :{fontSize:'18dp',fontWeight:'bold'},
					color:glblDarkGrayFont,
					clickName:'scenarioName',
					textAlign:'left',
					touchEnabled:false
				});	
		
			scenarioListRow.add(scenarioName);
			rowData.push(scenarioListRow);
		}//end of for loop	
					 
	  scenarioListTableView.data=rowData;
			 /*if(Ti.Platform.osname == 'android')
				{
					if(fromWin == 2) 
						scenarioListTableView.top='10%';
					else
						scenarioListTableView.top='17%';	
				}
				else
				{
					scenarioListTableView.footerTitle='';
					if(fromWin == 2)
						scenarioListTableView.top='0%';	
					else
						scenarioListTableView.top='7%';	
				}*/
	
	
      }
scenarioWindow.add(actInd);	      
return scenarioWindow;
}
module.exports=winOpen;