function createLandingPage () {
	
	var window;
	var adMob = require ('ti.admob');
	
	//window Created for iphone to suport navigation Bar
	window=Ti.UI.createWindow({
		backgroundColor:'#fff',
		navBarHidden:'false',
		barImage:'images/GrayNavBar.png',
		barColor:'#6d6e6f',
		title:'QwikFeaso',
		exitOnClose:true,
		//height:'100%',
  	});
  	
  	var lftNavView=Ti.UI.createView(
	{
		width:'auto',
		height:'auto',
		backgroundColor:'#0000',
		layout:'horizontal'
	});
	window.leftNavButton=lftNavView;
  	
  	var thisView1 = Ti.UI.createView({     
            objName:"grid-view",
            //objIndex:cellIndex.toString(),
            backgroundImage: 'images/constructioncostcalicon.png' ,
            //backgroundColor:'red',
            left: '3%',
            top:'8%',
            height: '30%',
            width: '44%',
            
        });
        
   thisView1.addEventListener('singletap',function(e){
   	
   		window.add(actvityIndicatorView);
		actInd.show();
		var fromWin=2;	//to recognoze win called from either Setting or ScenarioDetails
		var winOpen=require('ui/common/AddDwelling');
		navGroup.open(new winOpen('Construction Cost Calculator',fromWin),{animated: true});
						
		actInd.hide();		
		window.remove(actvityIndicatorView);
   	
   });     
        
    var thisView2 = Ti.UI.createView({
            objName:"grid-view",
            //objIndex:cellIndex.toString(),
            backgroundImage: 'images/qwikfeasodashboard.png',
            //backgroundColor:'red',
            right: '3%',
            top:'8%',
            height: '30%',
            width: '44%'
        });
        
    thisView2.addEventListener('singletap',function(e){
    	
    	window.add(actvityIndicatorView);
		actInd.show();
		QwikFeasoGlobalVars.feasoName ='QwikFeaso';//'Detailed Feasibility';
		QwikFeasoGlobalVars.feasoTrack='d';
		//DeleteScenarioDetailePage();
		var fromWin=1;	//to recognoze win called from either Setting or ScenarioDetails
		var winTitle='QwikFeaso';
		var winOpen=require('ui/common/Scenarios');
		navGroup.open(new winOpen(winTitle,fromWin),{animated: true});
		actInd.hide();		
		window.remove(actvityIndicatorView);
    	
    });
        
    var thisView3 = Ti.UI.createView({
            objName:"grid-view",
            //objIndex:cellIndex.toString(),
            backgroundImage: 'images/myproperties.png' ,
            //backgroundColor:'red',
            left: '3%',
            bottom:'27%',
            height: '30%',
            width: '44%',
            
        });
        
    thisView3.addEventListener('singletap',function(e){
    	
    	window.add(actvityIndicatorView);
		actInd.show();
		var OpenPropertywindow=require('ui/common/MyPropertyList');
		navGroup.open(new OpenPropertywindow(1),{animated: true});
		actInd.hide();		
		window.remove(actvityIndicatorView);
    	
    });    
        
    var thisView4 = Ti.UI.createView({
            objName:"grid-view",
            //objIndex:cellIndex.toString(),
            backgroundImage: 'images/settings.png' ,
            //backgroundColor:'red',
            right: '3%',
            bottom:'27%',
            height: '30%',
            width: '44%'
        });    
	
	thisView4.addEventListener('singletap',function(e){
    	
    	window.add(actvityIndicatorView);
		actInd.show();
		var Settings=require('ui/common/Settings');
		navGroup.open(new Settings(),{animated: true});
		actInd.hide();		
		window.remove(actvityIndicatorView);
    });
    
    
	window.add(thisView1);
	window.add(thisView2);
	window.add(thisView3);
	window.add(thisView4);
	
	var ad;
	
	ad = adMob.createView({
			width : 320,
			height : 50,
			publisherId : 'a1515a9cc69efa8',
			testing : false,
			bottom:0,
		});
		
	
	window.add(ad);
	
	var firstRun = getFirstRun();
		
		
		if(firstRun){
			
			window.add(actvityIndicatorView);
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
			window.remove(actvityIndicatorView);
			
			alert('A Welcome email has been sent to your registered email address');
			setFirstRun(false);
			
			
				
		
	  }, 5000);
	  
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
	  
	}
	window.add(actInd);
  	return window;
}
module.exports = createLandingPage;
