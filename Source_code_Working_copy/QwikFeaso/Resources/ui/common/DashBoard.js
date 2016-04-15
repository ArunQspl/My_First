
/**
 * @projectDescription QwikFeaso
 * 
 * @author vivek Gidmare vivek.gidmare@quagnitia.com
 * @version 1.0
 */

function createDashBoardWindow () {
	
	
	
var  Window;
if(Ti.Platform.osname == 'android') // Android specific code
{
	/*
  	 * Include the files needed for UI Design and Database usage
  	 * Header.js will manage navigation for android
  	 * 
  	 */
	Ti.include('/ui/common/Header.js');
	Ti.include('/services/DataBaseTransaction.js');
	Ti.include('/services/GetFromDataBase.js');
	Ti.include('/services/CachingData.js');
	Ti.include('/services/DatabaseAlterations.js');
	Window=Ti.UI.createWindow({
			backgroundColor : "#fff",
			navBarHidden:true,
			exitOnClose:true,
	});	

	setHeader();
}else
if(Ti.Platform.osname =='iphone' || Ti.Platform.osname == 'ipad') // iOS specific code
{
	Window=Ti.UI.createWindow({
				backgroundColor : "#fff",
				navBarHidden:false,
				tabBarHidden:true,
				exitOnClose:true,
				barImage:'images/GrayNavBar.png',
				barColor:'#6d6e6f',
				title:'QwikFeaso',
			});	

	var lftNavView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					backgroundColor:'#0000',
					layout:'horizontal'
				});
	Window.leftNavButton=lftNavView;

}
Window.orientationModes=[Ti.UI.PORTRAIT];	

var grayViewHt=(Ti.Platform.displayCaps.platformHeight*14)/100;

var gridViewContainer = Ti.UI.createScrollableView({
	showPagingControl : false,
	width : '100%',
	height :'70%',
	backgroundColor:'#fff',
	top:Ti.Platform.osname == 'android'?'15%':'5%'
	
});

Window.add(gridViewContainer);

getDashBoardView();

var width = 480,
        height = 60;


var adView = Ti.UI.createView({
    width:   'auto',
    height:  Ti.Platform.osname==='android'?'10%':'12%',
    bottom:0,
    backgroundColor:'#ffffff',
});


Window.add(adView);
function setHeader () {
		headerLabel.text='QwikFeaso';
		headerView.add(headerLabel);
	 	Window.add(headerView);
		}
/*
 * will create dashboard view with proper positioning of views
 */
function getDashBoardView () {
	var _screenW = parseInt(Titanium.Platform.displayCaps.platformWidth);
	var _screenH = parseInt(Titanium.Platform.displayCaps.platformHeight);
	var icons;
	if(Ti.Platform.osname == 'ipad' || Ti.Platform.osname =='iphone')
	{
		 icons = [
	    { image: 'images/constructioncostcalicon.png' },
	    { image: 'images/qwikfeasodashboard.png' },
	    { image: 'images/myproperties.png'},
	    { image: 'images/settings.png' }
	    		];
	}
	else if(Ti.Platform.osname == 'android')
	{
		 icons = [
	    { image: '/images/constructioncostcalicon.png' },//QwikFeaso.png
	    { image: '/images/qwikfeasodashboard.png' },//DetailedFeasibility.png
	    { image: '/images/myproperties.png'},
	    { image: '/images/settings.png' }
	   				];
	}
	var cellIndex = 0;
	var GridView = [];
	gridViewContainer.views = GridView;
	var totalIcons = 4;
	var x, y, iconH, iconW;
	var topH;
	if (_screenW > _screenH) {
		//lanscape mode	
		x = 4;
		y = 2;
		topH='10%';
		iconW = _screenW / x;
		iconH = '70%';
	} else {
		//portrait mode		
		x = 2;
		y = 2;
		topH='1%';
		iconW = _screenW / x;
		iconH = Ti.Platform.osname =='android'?'40%':'48%';
	}
	
	var tmpCnt = Math.ceil(totalIcons / (x * y));
	var totalView = (totalIcons > (x * y)) ? tmpCnt : 1;
	
	var thisView, thisView1, thisView2, thisLabel;
	
	for (var i = 0; i < totalView; i++) {
		var IconContainer = Ti.UI.createView({
			height : 'auto',
			width : 'auto',
			layout : "horizontal",
			id : i,
			backgroundColor:'#fff'

		});
		GridView.push(IconContainer);
		for (var j = 0; j < y; j++) {
			for (var k = 0; k < x; k++) {
				thisView = Ti.UI.createView({
					id:'1'+cellIndex.toString(),
					height : iconH,
					width : iconW,
					textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
					top : topH,
					backgroundColor:'#fff'
				});

				thisView1 = Ti.UI.createView({
					backgroundColor : "#fff",
					height : '90%',
					width : '90%',
					textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
					
				});
				thisView2 = Ti.UI.createView({
					backgroundImage:Ti.Platform.osname=='ipad'||Ti.Platform.osname=='iphone'
									?icons[cellIndex].image
									:icons[cellIndex].image,
					height :'95%', 
					width : '95%',
					id:''+cellIndex.toString(),
					//backgroundColor:'#ff0000',
				});
			thisLabel = Ti.UI.createLabel({
					color : "#000",
					top : '65%',
					height : 22,
					font : {
						fontSize : '14dp',
						fontWeight : 'bold'
					},
				});
 thisView2.addEventListener('singletap',function(el){
 	
 	if(Ti.Platform.osname == 'android')
  	{
  		//Will switch to specific view depends on click of icon
  		switch(el.source.id){
  			
  			case '0': 	//Dwelling List
					var fromWin=2;	//to recognoze win called from either Setting or ScenarioDetails
					var winTitle='Construction Cost Calculator';
					Window.add(actvityIndicatorView);
					actInd.show();
					var winOpen=require('ui/common/AddDwelling');
					new winOpen(winTitle,fromWin).open(); 
					actInd.hide();
					Window.remove(actvityIndicatorView);
		 			break;
  			case '1':
  					Ti.App.QwikFeasoGlobalVars.feasoName ='QwikFeaso';//Detailed Feasibility
				 	Ti.App.QwikFeasoGlobalVars.feasoTrack='d';
				 	//DeleteScenarioDetailePage();
				 	var fromWin=1;	//to recognize win called from either Setting or ScenarioDetails
					var winTitle='QwikFeaso';
					Window.add(actvityIndicatorView);
					actInd.show();
					var winOpen=require('ui/common/Scenarios');
					new winOpen(winTitle,fromWin).open();
				 	actInd.hide();	
				 	Window.remove(actvityIndicatorView);	
  					break;
  			case '2':
  					Window.add(actvityIndicatorView);
  					actInd.show();
				 	var OpenPropertyWindow=require('ui/common/MyPropertyList');
				 	new OpenPropertyWindow(1).open();
				 	actInd.hide();
				 	Window.remove(actvityIndicatorView);
  					break;
  			case '3':
  						Window.add(actvityIndicatorView);
  					actInd.show();
				 	var Settings=require('ui/common/Settings');
				 	new Settings().open();
				 	actInd.hide();
				 	Window.remove(actvityIndicatorView);
  					break;
  		} 
  	}
  	else
  	if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad')
  	{  		
  		//Will switch to specific view depends on click of icon
		 switch(el.source.id)
		 {
		 	
		 	case '0': 	//Dwelling List
		 	Window.add(actvityIndicatorView);
					actInd.show();
						var fromWin=2;	//to recognoze win called from either Setting or ScenarioDetails
						var winOpen=require('ui/common/AddDwelling');
						navGroup.open(new winOpen('Construction Cost Calculator',fromWin),{animated: true});
						
					actInd.hide();		
		 		Window.remove(actvityIndicatorView);		
		 				break;
		 	case '1':
		 	Window.add(actvityIndicatorView);
					actInd.show();
		 				QwikFeasoGlobalVars.feasoName ='QwikFeaso';//'Detailed Feasibility';
					 	QwikFeasoGlobalVars.feasoTrack='d';
					 	//DeleteScenarioDetailePage();
					 	var fromWin=1;	//to recognoze win called from either Setting or ScenarioDetails
						var winTitle='QwikFeaso';
						var winOpen=require('ui/common/Scenarios');
						navGroup.open(new winOpen(winTitle,fromWin),{animated: true});
						actInd.hide();		
		 		Window.remove(actvityIndicatorView);
		 			break;
		 	case '2':
		 	Window.add(actvityIndicatorView);
					actInd.show();
		 				var OpenPropertyWindow=require('ui/common/MyPropertyList');
		 				navGroup.open(new OpenPropertyWindow(1),{animated: true});
		 				actInd.hide();		
		 		Window.remove(actvityIndicatorView);
		 			break;
		 	case '3':
		 	Window.add(actvityIndicatorView);
					actInd.show();
		 				var Settings=require('ui/common/Settings');
		 				navGroup.open(new Settings(),{animated: true});
		 				actInd.hide();		
		 		Window.remove(actvityIndicatorView);
		 			break;
		 }
		 
  	}
  });
  				thisView1.add(thisView2);
				thisView1.add(thisLabel);
				thisView.add(thisView1);
				IconContainer.add(thisView);
				cellIndex++;
				
				if (cellIndex == totalIcons) {
					i = totalView;
					j = y;
					k = x;
				}
			}
		}
	}
	gridViewContainer.views = GridView;	
}

Window.addEventListener('open', function (e) {
	
	var firstRun = getFirstRun();
	
		
	if(firstRun){
			
		Window.add(actvityIndicatorView);
	  	actInd.show();

	  	/**
	  	 * Will populate Database for first time with default values provided in excel sheet
	  	 */
	   setTimeout(function(){
	   	
		   	createQwikFeasoDB();
	        AddCostGroupings();
			AddCostElement();
			AddRoomCategory();
			AddRoomSubCategory();
			AddRoomDimensionSetting();
			AddBuildDifficulty();
			AddBuildQuality();
			addFitoutCosts();
			AddDwellings();
			DwellingDetails();
			AddPropertyPhotos();
			AddProperties();
			DwellingDetailsSummary(); // check
			InsertFeasibility();
			CreateObtainedScenarioTable();
			ScenarioToPropertyTable();
			AddDefaultValusForScenarios();
			CreatePaymentPerYearTable();
			SummaryStaticData();
		
			actInd.hide();
			Window.remove(actvityIndicatorView);
				
			alert('A Welcome email has been sent to your registered email address');
			setFirstRun(false);
			
	  }, 5000);
	}
	
	var isNW_AVAILABLE = isNetworkAvailable();
	if(!isNW_AVAILABLE){
		alert('There is presently no Internet Access which QwikFeaso needs in order to work.');
	}
	
	/**
	 * check network
	 */
	/*if(Titanium.Network.networkType !== Titanium.Network.NETWORK_NONE){
		alert('There is presently no Internet Access which QwikFeaso needs in order to work.');
	}*/
	
	/*
	 * required db version
	 */
	var req_db_version = 'V1.0';
			
	/*
	 * current db version
	 */
	var cur_db_version = getDBVersion();
			
	/*
	 * if there is a change in database
	 */
	if(cur_db_version !== req_db_version){
				
		// do the required changes to the db
		dbAlterations();	
				
		//set current db version with required db version
		setDBVersion(req_db_version);
	}
	
});

/**
 * Code for Google adMob ads
 */
if (Ti.Platform.osname === 'android') {
	
	var adMob = require ('ti.admob');
	var ad = adMob.createView({
		//width : 320,
		//height : 50,
		publisherId : 'a150d58d9416c6d', // You can get your own at http://www.admob.com/
		testing : false,
		bottom: 0, // optional
	});
	//adView.add(ad);
	Window.add(ad);	
	
	
	//listener for adReceived
	ad.addEventListener(adMob.AD_RECEIVED,function(){
	   // alert("ad received");
	   Ti.API.info("ad received");
	});
	
	//listener for adNotReceived
	ad.addEventListener(adMob.AD_NOT_RECEIVED,function(){
	    //alert("ad not received");
	     Ti.API.info("ad not received");
	});
	
		
}
else
{
	
	var adMob = require ('ti.admob');
	var ad = adMob.createView({
		width : 320,
		height : 50,
		publisherId : 'a1515a9cc69efa8',
		testing : false,
		bottom:0,
	});
	//adView.add(ad);
	Window.add(ad);
	
	
}

Window.add(actInd);

return Window;
}
module.exports=createDashBoardWindow;