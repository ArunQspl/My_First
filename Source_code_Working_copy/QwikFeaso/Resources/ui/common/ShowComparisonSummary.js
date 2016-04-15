/**
 * @projectDescription QwikFeaso
 * 
 * @author Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window for showing comparison of feasibility results
   
   @param {Object} SummaryWindow		Window object
   @return {Object}					Returns current window object
*/


function GetPDFSummary (html) {
  var SummaryWindow;
var userName = Titanium.App.Properties.getString("username");
if(Ti.Platform.osname == 'android') // android specific code
  {
  	/*
  	 * Include the files needed for UI Design and Database usage
  	 * Header.js will manage navigation for android
  	 */
  	//Window Created for Android
  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
	Ti.include('/services/DataBaseTransaction.js')	
	Ti.include('/services/ACSTransactions.js')
	Ti.include('/services/GetFromDataBase.js')	
	Ti.include('/ui/common/GenerateHTML.js');
	SummaryWindow=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 	
	 	
	 // Handle back press 
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
		var file;
		var path =  (Ti.Platform.osname == 'android' ? Ti.Filesystem.externalStorageDirectory : Ti.Filesystem.applicationDataDirectory );
		file = Ti.Filesystem.getFile(path, 'DemoHTML.html');
	 	if(file.exists()){
	 		file.deleteFile();
	 	}
	 	
		SummaryWindow.close();
	 });
	 	
	rightBtn.addEventListener('click',function(e){
		btnSelector(rightBtn);
		sendComparisonSummaryMail();
	});
	 
	SummaryWindow.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;		
 	
  }
  else // iPhone or iPad specific code
  {
		  	//Window Created for iphone to suport navigation Bar
		  	SummaryWindow=Ti.UI.createWindow({
		  	backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			title:'Summary Report',
			
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
		 	var file;
	var path =  (Ti.Platform.osname == 'android' ? Ti.Filesystem.externalStorageDirectory : Ti.Filesystem.applicationDataDirectory );
	file = Ti.Filesystem.getFile(path, 'DemoHTML.html');
	 	if(file.exists()){
	 		file.deleteFile();
	 	}    
				navGroup.close(SummaryWindow,{animated: true});
		  });
  
		  lftNavView.add(BackBtn);
		  
		  var rightView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					
					backgroundColor:'#0000',
					layout:'horizontal'
					
				});

		  var RightBtn = Ti.UI.createButton({
			      title : 'Email',
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
			 	sendComparisonSummaryMail();
		  });
		  
		  rightView.add(RightBtn);
		
		  SummaryWindow.leftNavButton=lftNavView;
		  SummaryWindow.rightNavButton=rightView;
		  
	}
	
	
	

/**
 * Logic to open PDF in another application (PDF reader) if using android device 
 * else directly show it as a PDF document in the window
 * @exception	App handles exception if no any PDF reader application is found on the device
 */

var file;
var path =  (Ti.Platform.osname == 'android' ? Ti.Filesystem.externalStorageDirectory : Ti.Filesystem.applicationDataDirectory );
file = Ti.Filesystem.getFile(path, 'DemoHTML.html');

SummaryWindow.addEventListener('open',function(){
		
	var isNWA = true;
	if(Ti.Platform.osname == 'android')
	 isNWA = Ti.App.QwikFeasoGlobalVars.isNWAvailable;
	if(isNWA == false)//firstRun
	{
		alert('There is presently no Internet Access which QwikFeaso needs in order to work.');
		
	}
		if(file.exists()){
			var pdfview;
		pdfview = Ti.UI.createWebView({
		width:'100%',
		height:Ti.Platform.osname === 'android'?'90%':'100%',
		url:file.getNativePath(),
		enableZoomControls:true,
		scalesPageToFit:true,
		top:Ti.Platform.osname === 'android'?'10%':'',
		});
		SummaryWindow.add(pdfview);
		
	}
		
	
	});

/*
   Function: Set the header for Android devices
   
   @param {Object) headerView			View object that holds the container to the headerLabel  
   @param {Object} headerLabel			Label object that holds the name of header
   @param {Object) leftBtn				Left button object for going back 
   @param {Object) SummaryWindow		Window object that holds all the above objects
   @memberOf headerLabel				View that is a member of Header.js file
   @memberOf leftBtn					View that is a member of Header.js file
   @memberOf headerView					View that is a member of Header.js file
*/
	function setHeader () {
		headerLabel.text='Summary Report';
		leftBtn.title='Back';
		rightBtn.title='Email';						
		headerView.add(leftBtn);	
		headerView.add(rightBtn);					
		headerView.add(headerLabel);
		SummaryWindow.add(headerView);
  
	}
	
	
	function sendComparisonSummaryMail () {
		var isNW_AVAILABLE = isNetworkAvailable();
		if(Ti.Platform.osname == 'android')
			Ti.App.QwikFeasoGlobalVars.isNWAvailable = isNW_AVAILABLE;
			
		if(isNW_AVAILABLE){
			sendFeasibilityComparisonResult(userName,html);
				
		}
		else
		{
			if(Ti.Platform.osname === 'iPad' || Ti.Platform.osname === 'iPhone')
				alert('There is presently no Internet Access which QwikFeaso needs in order to work.');
		}
		
		/**
		 * check network
		 */
		/*if(Titanium.Network.networkType !== Titanium.Network.NETWORK_NONE){
			sendFeasibilityComparisonResult(userName,html);
				
		}
		else{
			if(Ti.Platform.osname === 'iPad' || Ti.Platform.osname === 'iPhone')
				alert('There is presently no Internet Access which QwikFeaso needs in order to work.');
		}*/
		
	}
			
	return SummaryWindow;
}
module.exports=GetPDFSummary;


