function appBuildVersion(winTitle){
	
	var window;
	
	if(Ti.Platform.osname == 'android')
  	{
	  	//Window Created for Android
	  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
	  	window=Ti.UI.createWindow({
	  				backgroundColor:'#fff',
	  				navBarHidden:true,
		  			});
		  			
		setHeader(); 		
		 
		leftBtn.addEventListener('singletap',function(e){
			btnSelector(leftBtn);
			window.close();});
	 	
  	}
  	else
  	{
	  	//Window Created for iphone to suport navigation Bar
	  	window=Ti.UI.createWindow({
		  	backgroundColor:'#fff',
			navBarHidden:false,
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
	  	var lftView=Ti.UI.createView(
		{
			width:'auto',
			height:'auto',
			
			backgroundColor:'#0000',
			layout:'horizontal'
			
		});
	
	 	BackBtn.addEventListener('click', function() {  
	 		btnSelector(BackBtn);  
    		navGroup.close(window,{animated: true});
  		});
  
  		lftView.add(BackBtn);

  		window.leftNavButton=lftView;
  		
	}
	
	function setHeader () {
	  	headerLabel.text=winTitle;
	
		headerView.add(headerLabel);
		leftBtn.title='Back';
		
		headerView.add(leftBtn);
		window.add(headerView);
	}
	window.orientationModes=[Ti.UI.PORTRAIT];
	
	var parentView=Ti.UI.createView({
			height:'200dp',
			width:'300dp',
			//backgroundColor:'#00ff00',
			layout:'vertical',
		});
		
		
		
	/*var appIcon=Ti.UI.createView({
			height:'100dp',
			width:'100dp',
			backgroundImage:Ti.Platform.osname == 'android'?'/appicon.png':'appicon.png',
			top:'30dp',
		});	*/
		
	var appName = Ti.UI.createLabel({
		text : 'QwikFeaso',
		color : '#000000',
		font : {fontSize:'24dp'},
		width : 'auto',
		//left:'1dp',
		center:'true',
		top:'10dp'
	});
	
	var buildVersion = Ti.UI.createLabel({
		text : 'Build Version : 1.04',
		color : '#000000',
		font : {fontSize:'18dp'},
		width : 'auto',
		top:'2dp',
		//left:'1dp'
		center:'true',
	});
	
	var host = Ti.UI.createLabel({
		text : 'Developer Network',
		color : '#000000',
		font : {fontSize:'24dp'},
		width : 'auto',
		top:'35dp',
		//left:'1dp',
		center:'true',
	});
	
	var hostSite = Ti.UI.createLabel({
		text : 'www.developernetwork.com.au',
		color : '#000000',
		font : {fontSize:'18dp'},
		width : 'auto',
		top:'2dp',
		//left:'1dp'
		center:'true',
	});
	
	/*hostSite.addEventListener('singletap',function(e){
		
		var alerDialog=Ti.UI.createAlertDialog({
					message:'Do want to visit the host site? ',
					buttonNames: ['Yes','No']
				});
				alerDialog.addEventListener('click', function(ev) {
				    if (ev.index == 0) { 
				    	
				    	var winUrl = 'ui/common/ShowWebPage';
						var winTitle = '';
							if(Ti.Platform.osname == 'android'){
								
								var fromWin='Build Version';	
											actInd.show();
											var winOpen=require(winUrl);
											new winOpen(winTitle,fromWin).open(); 
											actInd.hide();
								
							}
							else if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
								
								var fromWin='Build Version';	
											var winOpen=require(winUrl);
											navGroup.open(new winOpen(winTitle,fromWin),{animated: true});
								
							}
				    	//window.close();
				     // clicked "Yes"
				    } else if (ev.index == 1) { 		    	
				    	alerDialog.hide();
				      // clicked "No"
				    }
				  });
				alerDialog.show();
		
	});*/
	
	//parentView.add(appIcon);
	parentView.add(appName);
	parentView.add(buildVersion);
	parentView.add(host);
	parentView.add(hostSite);
		
	window.add(parentView);	
  		
  	return window;
	
}
module.exports = appBuildVersion;
