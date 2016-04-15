/**
 * @projectDescription QwikFeaso
 * 
 * @author Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window showing current user details
   
   @param {Object} window		Window object
   @return {Object}				Returns current window object
*/

function licensedUserDetails (winTitle) {
	
	var window;
	
	if(Ti.Platform.osname == 'android')
  	{
	  	//Window Created for Android
	  	Ti.include('/ui/common/Header.js');
  		Ti.include('/lib/Common.js');
  		Ti.include('/lib/CityState.js');	
		Ti.include('/services/DataBaseTransaction.js')	
		Ti.include('/services/ACSTransactions.js')//include header as android do not have navigation controll
		Ti.include('/services/CachingData.js')
	  	window=Ti.UI.createWindow({
	  				backgroundColor:'#fff',
	  				navBarHidden:true,
		  			});
		  			
		setHeader(); 		
		 
		leftBtn.addEventListener('singletap',function(e){
			btnSelector(leftBtn);
			var isRegistered = validateUser();
			if(isRegistered)
				window.close();
			else
				alert('Please click on QwikFeaso to start using it');	
		});
	 	
	 	//window.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	 	window.windowSoftInputMode=Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
  	}
  	else
  	{
	  	//Window Created for iphone to suport navigation Bar
	  	window=Ti.UI.createWindow({
		  	backgroundColor:'#fff',
			navBarHidden:false,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			//title:'Licensed User Registration',
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
	 	 var lftView=Ti.UI.createView({
			width:'auto',
			height:'auto',
			backgroundColor:'#0000',
			layout:'horizontal'
		});
		
		BackBtn.addEventListener('click', function() {   
			btnSelector(BackBtn);
			var isRegistered = validateUser();
			if(isRegistered)
				navGroup.close(window,{animated: true});
			else
				alert('Please click on QwikFeaso to start using it');	 
	    	
		});
	  
	  	lftView.add(BackBtn);
	
	  	window.leftNavButton=lftView;
  		
	}
	
	window.orientationModes=[Ti.UI.PORTRAIT];
	
	window.addEventListener('open', function (e) {
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
	});
	
	subHeaderLabel.text='Please complete the details below to Register & Activate QwikFeaso';
	viewSubHeader.add(subHeaderLabel);
	viewSubHeader.height = '10%';
	
	if (Ti.Platform.osname == 'android') 
		viewSubHeader.top='10%';//below header
	else
		viewSubHeader.top='0%';//below navigation controller as navigation don't take space in window
	
	window.add(viewSubHeader);
	
	//Caching variables

	var FIRST_NAME = '';
	var LAST_NAME = '';
	var COUNTRY = '';
	var REGION = '';
	var EMAIL = '';
	var PROMOCODE = '';
	
	
	FIRST_NAME = getFirstName();
	LAST_NAME = getLastName();
	COUNTRY = getCountry();
	REGION = getRegion();
	EMAIL = getUserName();
	PROMOCODE = getPromoCode();
	
	var parentView=Ti.UI.createView({
		height:'85%',
		width:Ti.Platform.osname === 'android'?'95%':'90%',
		layout:'vertical',
		top : Ti.Platform.osname === 'android'?'22%':'15%',
	});
	
	var usrnameView=Ti.UI.createView({
		height:'10%',
		width:'100%',
	});
	
	// Create a TextField.
	var fName = Ti.UI.createTextField({
		width :'45%',
		hintText : 'First Name',
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DONE,
		//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color:glblDarkGrayFont,
		backgroundColor:'#fff',
        borderColor:glblLightGrayFont,
        borderRadius:5,
        borderWidth:1,
		left:'0%',
		paddingLeft:Ti.Platform.osname !== 'android'?'4dp':'',
		height:Ti.UI.FILL,
	});
	
	fName.addEventListener('change',function(e){
		fName.setBackgroundColor('#fff');
	});
	
	fName.addEventListener('focus', function (e){
			fName.borderWidth = 3;
	});  
			
	fName.addEventListener('blur', function (e){
			fName.borderWidth = 1;
	});  
	usrnameView.add(fName);
	
	// Create a TextField.
	var lName = Ti.UI.createTextField({
		width :'45%',
		hintText : 'Last Name',
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DONE,
		//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color:glblDarkGrayFont,
		backgroundColor:'#fff',
        borderColor:glblLightGrayFont,
        borderRadius:5,
        borderWidth:1,
		right:'0%',
		paddingLeft:Ti.Platform.osname !== 'android'?'4dp':'',
		height:Ti.UI.FILL,
	});
	
	lName.addEventListener('change',function(e){
		lName.setBackgroundColor('#fff');
	});
	
	lName.addEventListener('focus', function (e){
			lName.borderWidth = 3;
	});  
			
	lName.addEventListener('blur', function (e){
			lName.borderWidth = 1;
	});
	usrnameView.add(lName);
	
	// Create a TextField.
	var emailId = Ti.UI.createTextField({
		width :'100%',
		hintText : 'Email',
		keyboardType : Ti.UI.KEYBOARD_EMAIL,
		returnKeyType : Ti.UI.RETURNKEY_DONE,
		//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color:glblDarkGrayFont,
		backgroundColor:'#fff',
        borderColor:glblLightGrayFont,
        borderRadius:5,
        borderWidth:1,
		top:Ti.Platform.osname === 'android'?'3%':'5%',
		paddingLeft:Ti.Platform.osname !== 'android'?'4dp':'',
		height:'10%',
	});
	
	emailId.addEventListener('change',function(e){
		emailId.setBackgroundColor('#fff');
	});
	
	emailId.addEventListener('focus', function (e){
			emailId.borderWidth = 3;
	});  
			
	emailId.addEventListener('blur', function (e){
			emailId.borderWidth = 1;
	});
	
	var promocodeView=Ti.UI.createView({
		height:'10%',
		top : Ti.Platform.osname === 'android'?'3%':'5%',
	});
	
	// Create a Label.
	var promoCodeLabel = Ti.UI.createLabel({
		text : 'Promo Code',
		color :glblDarkGrayFont,
		font : Ti.Platform.osname=='android'
						?{fontSize:'18dp'}//25%//20sp
						:{fontSize:'15%'},
		left:'0%',
		textAlign : 'left'
	});
	
	// Add to the parent view.
	promocodeView.add(promoCodeLabel);
	
	
	// Create a TextField.
	var promocodeTF = Ti.UI.createTextField({
		width :Ti.Platform.osname=='android'?'45%':'40%',
		right : '0%',
		hintText : 'Promo code',
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DONE,
		//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color:glblDarkGrayFont,
		backgroundColor:'#fff',
        borderColor:glblLightGrayFont,
        borderRadius:5,
        borderWidth:1,
        paddingLeft:Ti.Platform.osname !== 'android'?'4dp':'',
        height:Ti.UI.FILL,
	});
	
	promocodeTF.addEventListener('focus', function (e){
			promocodeTF.borderWidth = 3;
	});  
			
	promocodeTF.addEventListener('blur', function (e){
			promocodeTF.borderWidth = 1;
	});
	
	// Add to the parent view.
	promocodeView.add(promocodeTF);
	
	var countryView=Ti.UI.createView({
			height:'10%',
			top:Ti.Platform.osname === 'android'?'3%':'5%',
	});

		// Create a Button.
		var countryButton = Ti.UI.createButton({
			title:'Country',//Country
			style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			height : '100%',
			width :'45%',
			left : '0%',
			backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			borderRadius:5,
			color:'#fff',
		});
		countryView.add(countryButton);

		// Listen for click events.
		countryButton.addEventListener('singletap', function(e) {
		lastSelectedOption=e.source.title;
		
		var option=set_country('Australia/Oceania');
		
		var  COptDialog=CreateOptionDialog('Select Country',option);
			COptDialog.show();
			StateButton.title='Region';			
			COptDialog.addEventListener('click',function(opt){
						try {
							    e.source.title=opt.source.options[opt.index].toString();
							    Ti.API.info('source title : '+opt.source.options[opt.index].toString());
							}
							 catch (ex) {
						    		var exp = ex.javaException;
						   			e.source.title=lastSelectedOption;
										}
						});
			
		});
	
	// Create a Button.
		var StateButton = Ti.UI.createButton({
			title:'Region',
			height : '100%',
			width :'45%',
			right:'0%',
			style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			borderRadius:5,
			color:'#fff',
		});
		countryView.add(StateButton);
		
		// Listen for click events.
		StateButton.addEventListener('singletap', function(e) {
			if(countryButton.title !== 'Country'){
				lastSelectedOption=e.source.title;
				var option=set_city_state(countryButton.getTitle());
			 	var SOptDialog=CreateOptionDialog('Select Region',option);
				SOptDialog.show();
							
				SOptDialog.addEventListener('click',function(opt){
							try {
								    e.source.title=opt.source.options[opt.index].toString();
								}
								 catch (ex) {
							    		var exp = ex.javaException;
							   			e.source.title=lastSelectedOption;
											}
							});		
			}
			else{
				alert('Please select a Country before attempting to enter a Region');
			}
				
			
		});
		
	var activationCodeView=Ti.UI.createView({
		height:'10%',
		top : Ti.Platform.osname === 'android'?'3%':'5%',
	});
	
	// Create a Label.
	var activationCodeLbl = Ti.UI.createLabel({
		text : 'Email me my Activation Code',
		color :glblDarkGrayFont,
		font : Ti.Platform.osname=='android'
						?{fontSize:'18dp'}//25%//20sp
						:{fontSize:'15%'},
		left:'0%',
		width:'50%',
	});
	
	// Add to the parent view.
	activationCodeView.add(activationCodeLbl);
	
	
	// Create a TextField.
	var activationCodeBtn = Ti.UI.createButton({
		width :'45%',
		right : '0%',
		title:'Activation Code',
		height:'100%',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
		borderRadius:5,
		color:'#fff',
	});
	
	
	// Add to the parent view.
	activationCodeView.add(activationCodeBtn);
	
	var qwikfeasoView=Ti.UI.createView({
		height:'10%',
		top : Ti.Platform.osname === 'android'?'3%':'5%',
	});
	
	// Create a Label.
	var qwikfeasoLbl = Ti.UI.createLabel({
		text : 'Start using QwikFeaso',
		color :glblDarkGrayFont,
		font : Ti.Platform.osname=='android'
						?{fontSize:'16dp'}//25%//20sp
						:{fontSize:'15%'},
		left:'0%',
	});
	
	// Add to the parent view.
	qwikfeasoView.add(qwikfeasoLbl);
	
	
	// Create a TextField.
	var qwikfeasoBtn = Ti.UI.createButton({
		width :'45%',
		right : '0%',
		title:'QwikFeaso',
		height:'100%',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
		borderRadius:5,
		color:'#fff',
	});
	
	
	// Add to the parent view.
	qwikfeasoView.add(qwikfeasoBtn);
	
	parentView.add(usrnameView);
	parentView.add(emailId);
	parentView.add(promocodeView);
	parentView.add(countryView);
	parentView.add(activationCodeView);
	parentView.add(qwikfeasoView);
	window.add(parentView);
	
	if(FIRST_NAME != null || LAST_NAME != null || COUNTRY != null || REGION != null || EMAIL != null || PROMOCODE != null){
	
		//Ti.API.info('Cached data : \nFirst Name: '+FIRST_NAME+'\nLast name: '+LAST_NAME+'\nCountry : '+COUNTRY+'\nRegion : '+REGION+'\nEmail : '+EMAIL+'\nPromo Code : '+PROMOCODE);
		fName.value = FIRST_NAME;
		lName.value = LAST_NAME;
		emailId.value = EMAIL;
		countryButton.title = COUNTRY;
		StateButton.title = REGION;
		promocodeTF.value = PROMOCODE;
	}
	
	activationCodeBtn.addEventListener('singletap', function() {
		btnSelector(activationCodeBtn);
		var isValid = true;
		isValid = isValidData();
		
			
			if(isValid){
				if(!validateEmail(emailId.value))
				{
					alert('Please enter a Valid Email address');
					emailId.focus();
				}
				else
				if(countryButton.title === 'Country')
				{
					alert('Please select the Country, then Region where you live');
					
				}
				else
				if(StateButton.title ==='Region')
				{
					alert('Please select the Country, then Region where you live');
					
				}
				else{
					
					
						
								var isNW_AVAILABLE = isNetworkAvailable();
								if(isNW_AVAILABLE)
								{
									window.add(actvityIndicatorView);
									actInd.show();
									
									setTimeout(function(e){
										
									var usrName = emailId.value;
									var firstName = fName.value;
									var lastName = lName.value;
									var promocode = promocodeTF.value;
									var country = countryButton.title;
									var state = StateButton.title;
									showSpecificUser('Settings',usrName,firstName,lastName,promocode,country,state);
									wait(3000);
										actInd.hide();
										 window.remove(actvityIndicatorView);	
										
									},100);
										 
								}
								else{
									alert('There is presently no Internet Access which QwikFeaso needs in order to work.');
								}
								
							
				
				}
				
			}
			else{
				alert('Woops we seem to be missing some information. Please ensure that you have completed all fields and have accepted the Terms & Contitions before proceeding');
			}
		
	});
	
	qwikfeasoBtn.addEventListener('singletap', function() {
		btnSelector(qwikfeasoBtn);
		var isValid = true;
		isValid = isValidData();
		
			if(isValid){
				if(!validateEmail(emailId.value))
				{
					alert('Please enter a Valid Email address');
					emailId.focus();
				}
				else
				if(countryButton.title === 'Country')
				{
					alert('It seems that you did not provided your location');
					
				}
				else
				if(StateButton.title ==='Region')
				{
					alert('It seems that you did not provided your location');
					
				}
				else{
					
								var isNW_AVAILABLE = isNetworkAvailable();
								if(isNW_AVAILABLE)
								{
									window.add(actvityIndicatorView);
									actInd.show();
									setTimeout(function(e){
									loginToConfirm('Settings',emailId.value,fName.value,lName.value,countryButton.title,StateButton.title,promocodeTF.value,window);
									wait(3000);
										actInd.hide();
										 window.remove(actvityIndicatorView);	
										
									},100);
										 
								}
								else{
									alert('There is presently no Internet Access which QwikFeaso needs in order to work.');
								}
					
				}
				
			}
			else{
				alert('Woops we seem to be missing some information. Please ensure that you have completed all fields and have accepted the Terms & Contitions before proceeding');
			}
		
	});
	
	function isValidData () {
		
		if(fName.value == '')
		{
			fName.backgroundColor='#f00';
			fName.focus();
			isValid = false;
			return isValid;
		}
		else
		if(lName.value == '')
		{
			lName.backgroundColor='#f00';
			lName.focus();
			isValid = false;
			return isValid;
		}
		else
		if(emailId.value =='')
		{
			emailId.backgroundColor='#f00';
			emailId.focus();
			isValid = false;
			return isValid;
		}
		else{
			return true;
		}
	  
	}
	
	function validateUser () {
		var registered = getRegistration();
		return registered;
	}
	
	function setHeader () {
			
		headerLabel.text = winTitle;
		headerLabel.width = '50%';	
		headerView.add(headerLabel);
		leftBtn.title='Back';
		headerView.add(leftBtn);
		window.add(headerView);
  
	}
	
	window.add(actInd);
	return window;
  
}
module.exports = licensedUserDetails;