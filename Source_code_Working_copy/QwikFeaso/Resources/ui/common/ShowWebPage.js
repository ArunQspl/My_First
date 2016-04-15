/**
 * @projectDescription QwikFeaso
 * 
 * @author Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window for showing webpage
   
   @param {Object} window		Window object
   @return {Object}				Returns current window object
*/


function GetPDFSummary (winTitle,fromWin) {
  var window;
if(Ti.Platform.osname == 'android') // android specific code
  {
  	/*
  	 * Include the files needed for UI Design and Database usage
  	 * Header.js will manage navigation for android
  	 */
  	//Window Created for Android
  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
	
	window=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 	
	 	
	 // Handle back press 
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
			window.close();
	 	});
	 
	 
	window.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;		
 	
  }
  else // iPhone or iPad specific code
  {
		  	//Window Created for iphone to suport navigation Bar
		  	window=Ti.UI.createWindow({
		  	backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			//title:'Summary Report',
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
				navGroup.close(window,{animated: true});
		  });
  
		  lftNavView.add(BackBtn);
		  
		  window.leftNavButton=lftNavView;
		  
	}

	function setHeader () {
			
		headerLabel.text = winTitle;	
		headerLabel.width = '50%';	
		leftBtn.title='Back';
		headerView.add(leftBtn);	
		headerView.add(headerLabel);
		window.add(headerView);
  
	}
	
	window.addEventListener('open', function (e) {
		if(Ti.Platform.osname === 'android'){
			actInd.show();
		}
		
   		var webview = Ti.UI.createWebView({
			width:'100%',
			height:Ti.Platform.osname === 'android'?'90%':'100%',
			enableZoomControls:true,
			scalesPageToFit:true,
			top:Ti.Platform.osname === 'android'?'10%':'',
		});
	
		window.add(webview);
		
		if(fromWin === 'About Us'){
			webview.url = 'http://www.developernetwork.com.au/qwikfeaso-about-us';
		}
		else if(fromWin === 'Terms and Conditions'){
			webview.url = 'http://www.developernetwork.com.au/qwikfeaso-eula/';
		}
		else if(fromWin === 'Help'){
			webview.url = 'http://www.developernetwork.com.au/qwikfeaso-help';
		}
		/*else if(fromWin === 'Build Version'){
			webview.url = 'http://www.developernetwork.com.au';
		}*/
		
		if(Ti.Platform.osname === 'android'){
			webview.addEventListener("load", function(e) {
		    	actInd.hide();
			});
		}	
});
	
	
	
	window.add(actInd);
	return window;
}
module.exports=GetPDFSummary;


