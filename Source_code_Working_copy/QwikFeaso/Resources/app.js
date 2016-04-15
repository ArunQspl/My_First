/**
 * @projectDescription QwikFeaso
 * 
 * @author vivek Gidmare vivek.gidmare@quagnitia.com
 * @version 1.0
 * 
 */
/**
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */
var navGroup;
//var devHeight;
//var devWidth;
if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad')
	{
	QwikFeasoGlobalVars={
		imagePath:'images/', 	//path for images used in android
		greenFontColor:'#7aaf33', 	//color code for green colored font
		darkGrayFontColor:'#4a4a4a',//color code for Dark Gray colored font
		lightGrayFontColor:'#a8a8a8',//color code for light Gray colored font
		feasoTrack:'',//qwik=q or detailed=d to differentiate UI for QwikFeaso and DetailedFeaso
		feasoName:'', //Name for feasibility track
		AddDwelling:'', 
		unitOfMeasure:'M2', //Unit of measure will be ByDefault  m2
		SummaryUpdated:'',  
		DashBoardOpenedFrom:'',
		NewPropertyPhoto:'default', 
		PropPhotoId:'',
		summaryHasName:'',//set to 1 when summary get saved with name
		SelectedPropertyID:'',
		propId:'',
		navigate:'true',
		CalledfromPopUp:'',
		CalledFromPropDetails:'false',
		firstRun:false,
		isNWAvailable:true,
		userid:'',
		firstname:'',
		lastname:'',
		//admobPublisherId:'a150d58d9416c6d',
	    };
	}
	else
		if(Ti.Platform.osname == 'android')
		{
		Ti.App.QwikFeasoGlobalVars={
			imagePath:'/images/',		//path for images used in iOS
			greenFontColor:'#7aaf33',		//color code for green colored font
			darkGrayFontColor:'#4a4a4a',	//color code for Dark Gray colored font
			lightGrayFontColor:'#a8a8a8',	//color code for light Gray colored font
			feasoTrack:'',	//qwik=q or detailed=d to differentiate UI for QwikFeaso and DetailedFeaso
			feasoName:'',	//Name for feasibility track
			AddDwelling:'',
			unitOfMeasure:'M2',  //Unit of measure will be ByDefault  m2
			SummaryUpdated:'',
			DashBoardOpenedFrom:'',//1 opened from Myproperty
			SelectedPropertyID:'',
			NewPropertyPhoto:'default',
			PropPhotoId:'',
			summaryHasName:'',//set to 1 when summary get saved with name
			propId:'',
			navigate:'true',
			CalledfromPopUp:'',
			CalledFromPropDetails:'false',
			firstRun:false,
			userid:'',
			firstname:'',
			lastname:'',
			//admobPublisherId:'a150d58d9416c6d',
			};
		}

/**
 * for iOS you need to include .js file only once at entry point
 */
if(Ti.Platform.osname == 'ipad' || Ti.Platform.osname =='iphone')
{
	Ti.include('lib/Common.js');
	Ti.include('ui/common/Header.js');
	Ti.include('services/DataBaseTransaction.js');	
	Ti.include('services/GetFromDataBase.js');
	Ti.include('services/TempDBTransaction.js');	
	Ti.include('/services/ACSTransactions.js');
	Ti.include('/services/CachingData.js');
	Ti.include('lib/CityState.js');
	Ti.include('ui/common/GenerateHTML.js');
	Ti.include('services/DatabaseAlterations.js');
}
//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}
// This is a single context application with mutliple windows in a stack
(function() {
	
	var userName = Titanium.App.Properties.getString("username");
	
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
		
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
		if (osname === 'android') {
			Ti.include('/services/DataBaseTransaction.js');	
			Ti.include('/services/ACSTransactions.js');
			Ti.include('/services/CachingData.js');
			Ti.include('/ui/common/Header.js');
			
			
			var isNW_AVAILABLE = isNetworkAvailable();
			
			var isUserRegistered = getRegistration();
			/**
			 * isUserRegistered =true Navigate the user for signin and this will happen only once
			 * isUserRegistered =false Navigate the user directly to dashboard screen
			 */
			
			if(isUserRegistered){
				
				if(isNW_AVAILABLE){
					login(userName);	
				}
				else{
					Window= require('ui/common/DashBoard');
					new Window().open();
				}
				
				/*if(Titanium.Network.networkType !== Titanium.Network.NETWORK_NONE){
					login(userName);
				}
				else{
					Window= require('ui/common/DashBoard');
					new Window().open();
				}*/
				
				
				
			}
			else{
				
				Window= require('ui/common/FirstRunWizard');
				new Window().open();
				
			}
			
			
			
		}
		else {
			var isUserRegistered = getRegistration();
			/**
			 * isUserRegistered =true Navigate the user for signin and this will happen only once
			 * isUserRegistered =false Navigate the user directly to dashboard screen
			 */
			
			if(isUserRegistered){
				
				if(isNW_AVAILABLE){
					login(userName);
				}
				else{
					var win = Titanium.UI.createWindow({});
					Window= require('ui/common/LandingPage');
					//we are using native navigation Group in iOS for navigation through out the app
					 navGroup = Titanium.UI.iPhone.createNavigationGroup({
					  window: new Window(),
					});
					win.add(navGroup);
					win.open();
				}
				
				/*if(Titanium.Network.networkType !== Titanium.Network.NETWORK_NONE){
					login(userName);
				}
				else{
					var win = Titanium.UI.createWindow({});
					Window= require('ui/common/LandingPage');
					//we are using native navigation Group in iOS for navigation through out the app
					 navGroup = Titanium.UI.iPhone.createNavigationGroup({
					  window: new Window(),
					});
					win.add(navGroup);
					win.open();
				}*/				
				
				
			}
			else{
				
				var win = Titanium.UI.createWindow({});
				Window= require('ui/common/FirstRunWizard');
				//we are using native navigation Group in iOS for navigation through out the app
				 navGroup = Titanium.UI.iPhone.createNavigationGroup({
				  window: new Window(),
				});
				win.add(navGroup);
				win.open();
				
			}
			
		}
		
		
		
		
	
})();
