/*
 * Function creates a new user 
 * Sends a Welcome mail to the user on success
 */
function createUser (usrName,fName,lName,promocode,country,state) {
	Ti.include('/services/DataBaseTransaction.js')
	Ti.include('/services/CachingData.js')
	Ti.include('/ui/common/Header.js');
	Ti.include('/ui/common/WriteEmail.js');
	var userId = '';
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	
	
		
		//Create user
			       Cloud.Users.create({
			         username: usrName,
			         password: '1234567',
			         password_confirmation: '1234567',
			         first_name: fName,
			         last_name: lName,
			         email:usrName,
			         confirmation_template:'Verify_Account',
			         custom_fields: {
			         	Country:country,
			         	State:state,
	          			PromoCode:promocode,
	          			}
	       			}
	
			     , function (e) {
			         if (e.success) {
			            var user = e.users[0];
			            
			            var userName = '';
						var userid = '';
						var firstname = '';
						var lastname = '';
						var country = '';
						var region = '';
						var promoCode = '';
						
						userid = user.id;
						userName = user.username;
						firstname = user.first_name;
						lastname = user.last_name;
						country = user.custom_fields.Country;
						region = user.custom_fields.State;
						promoCode = user.custom_fields.PromoCode;
						
						//Sets registration flag
						setRegistration(false);
						
						//Cache user data
						setUserData(userid,userName,firstname,lastname,country,region,promoCode);
						
						alert('Please check your email (including SPAM) for your Activation Code. Once you have Activated your account you can start to use QwikFeaso straight away');
			             
			         }
			         else {
			          if (e.error && e.message) {
			             //alert('Error :' + e.message);  
			             
			             //Error handling
							/*if(e.code == 401 && e.message === 'Invalid email/username and password') /// Invalid email/username and password error code
								alert('You have not yet Activated your account. Please complete all fields, then send and acknowledge your Email Activation Code  before proceeding');
							else if(e.code == 401 && e.message === 'You have to confirm your account before continuing.') /// You have to confirm your account before continuing
								alert('You have not yet Activated your account. An email has already been sent to your registed email address with your activation code. Please acknowledge this Email before proceeding. You can always send another Email Activation Code if you cannot find this email');	*/
						
			              
			          }
			         }
			          
			     });
		
			     
}



/*
 * Function to re-login if application instance finishes (as there is no login page)  
 */
function login (usrName) {
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
  Cloud.Users.login({
			login	: usrName,
			password: '1234567',
		}, function(e) {
			
			if (e.success)	 {
				
				//if user exists over cloud
				
				var user = e.users[0];
				var userName = '';
				var userid = '';
				var firstname = '';
				var lastname = '';
				var country = '';
				var region = '';
				var promoCode = '';		
						
				userid = user.id;
				userName = user.username;
				firstname = user.first_name;
				lastname = user.last_name;
				country = user.custom_fields.Country;
				region = user.custom_fields.State;
				promoCode = user.custom_fields.PromoCode;
				
				//Set registration flag
				setRegistration(true);
				
				//Cache user data
				setUserData(userid,userName,firstname,lastname,country,region,promoCode);
								
				//Redirects to landing page (dashboard)
				if(Ti.Platform.osname == 'android'){
					
					var createDashBoardWindow= require('ui/common/DashBoard');
					new createDashBoardWindow().open();
				}
				else{
					
					var win = Titanium.UI.createWindow({
					});
					var createDashBoardWindow = require('ui/common/LandingPage');
					navGroup = Titanium.UI.iPhone.createNavigationGroup({
					  		window: new createDashBoardWindow(),
					});
					win.add(navGroup);
					win.open();
				}
				
			}
			else
			{
				//if user is deleted from cloud
            	var fromWin = 'Register';
            	
            	//Redirects to first run wizard
            	if(Ti.Platform.osname == 'android')
				{
					Window= require('ui/common/FirstRunWizard');
					new Window(fromWin).open();
				}
				else
				{
					var win = Titanium.UI.createWindow({});
					Window= require('ui/common/FirstRunWizard');
					  navGroup = Titanium.UI.iPhone.createNavigationGroup({
					  window: new Window(fromWin),
					});
					win.add(navGroup);
					win.open();
				}
            		
			}
	}); 
}

/*
 * Function to check if user already exist over cloud while Signing in
 */
function showSpecificUser (fromWin,usrName,fName,lName,promocode,country,state) {
	
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
 	Cloud.Users.query({
	    page: 1,
	    per_page: 10,
	    where: {
	        username:usrName,
	    }
	}, function (e) {
		
	    if (e.success) {
	    	var user = e.users[0];
	    	var lenOfUsers = e.users.length;
	       if(lenOfUsers == 0)
	        {
	        	if(fromWin === 'Register')
	        		createUser (usrName,fName,lName,promocode,country,state);
	        	else{
	        		logout(usrName,fName,lName,promocode,country,state);
	        		
	        	}	
	        }    
	        else
	        {
	        	//alert('Your account is already Activated');
	        	Cloud.Users.login({
	        		login	: usrName,
					password: '1234567',
	        	},function(e){
	        		
	        		if(e.success){
	        			
	        			alert('Your account is already Activated');
	        			
	        		}
	        		else{
	        			
	        			//alert(((e.error && e.message) || JSON.stringify(e)));
	        			if(e.code == 401 && e.message === 'Invalid email/username and password') /// Invalid email/username and password error code
								alert('You have not yet Activated your account. Please complete all fields, then send and acknowledge your Email Activation Code  before proceeding');
							else if(e.code == 401 && e.message === 'You have to confirm your account before continuing.') /// You have to confirm your account before continuing
								alert('You have not yet Activated your account. An email has already been sent to your registed email address with your activation code. Please acknowledge this Email before proceeding. You can always send another Email Activation Code if you cannot find this email');
	        			
	        		}
	        		
	        	});
	        }
	    	
	    } else {
	        alert(((e.error && e.message) || JSON.stringify(e)));
	        
	    }
	});
}


/*
 * Function to login from 'First Run wizard'
 * internally checks whether user has activated his account or not
 */
function loginToConfirm (fromWin,emailId,fName,lName,counTRY,regION,promo_Code,window) {
	Ti.include('/services/CachingData.js');
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	
	
		Cloud.Users.login({
					login	: emailId,
					password: '1234567',
				}, function(e) {
						
						if (e.success)	 {
							var user = e.users[0];
							var userName = '';
							var userid = '';
							var firstname = '';
							var lastname = '';
							var country = '';
							var region = '';
							var promoCode = '';
							
							userid = user.id;
							userName = user.username;
							firstname = user.first_name;
							lastname = user.last_name;
							country = user.custom_fields.Country;
							region = user.custom_fields.State;
							promoCode = user.custom_fields.PromoCode;
							
							
							if(firstname != fName || lastname != lName || country != counTRY || region != regION || promoCode != promo_Code){
								//if user is already registered and activated, app will automatically replace the previous user details with current details
								updateUserDetails(fromWin,emailId,fName,lName,counTRY,regION,promo_Code,window);
								
							}
							else{
								
								//registered and activated user automatically logs with current details
								
							    if(fromWin === 'Register'){
							    	//if the navigation is from 'First run wizard' 
							    	
							    	//set first run
							    	setFirstRun(true);
							    	
							    	//set registration flag
							    	setRegistration(true);
							    	
							    	//cache user data
							    	setUserData(userid,userName,firstname,lastname,country,region,promoCode);
							    	
							    	//send welcome mail to user
							    	Cloud.Emails.send({
											template: 'Welcome',
											recipients: user.email,
											first_name:firstname,    
										}, function (e) {
											if (e.success) {
												
											} else {
												alert(((e.error && e.message) || JSON.stringify(e)));
											}
									});
								
							    	if(Ti.Platform.osname == 'ipad' || Ti.Platform.osname == 'iphone')
									{
										//QwikFeasoGlobalVars.firstRun=true;
										//var createDashBoardWindow = require('ui/common/DashBoard');
										var createDashBoardWindow = require('ui/common/LandingPage');
										navGroup.open(new createDashBoardWindow(),{animated: true});
									}
									else if(Ti.Platform.osname == 'android')
									{
										//Ti.App.QwikFeasoGlobalVars.firstRun=true;
										var createDashBoardWindow= require('ui/common/DashBoard');
										new createDashBoardWindow().open(); 		
									}
							    }
							    else
							    if(fromWin === 'Settings'){
							    	//if the navigation is from 'Licensed user details screen'
							    	
							    	//reset registration flag
							    	setRegistration(true);
							    	
							    	//recache user data
							    	setUserData(userid,userName,firstname,lastname,country,region,promoCode);
							    	
							    	//close 'Licensed user details screen'
							    	if(Ti.Platform.osname == 'ipad' || Ti.Platform.osname == 'iphone')
									{
										navGroup.close(window,{animated: true});
									}
									else if(Ti.Platform.osname == 'android')
									{
										window.close();	
									}
									
							    }	
								
							}
							
						}
						else
						{
							//Error handling
							if(e.code == 401 && e.message === 'Invalid email/username and password') /// Invalid email/username and password error code
								alert('You have not yet Activated your account. Please complete all fields, then send and acknowledge your Email Activation Code  before proceeding');
							else if(e.code == 401 && e.message === 'You have to confirm your account before continuing.') /// You have to confirm your account before continuing
								alert('You have not yet Activated your account. An email has already been sent to your registed email address with your activation code. Please acknowledge this Email before proceeding. You can always send another Email Activation Code if you cannot find this email');	
						}
				});
	
}

/*
 * Function to send Feasibilty Result/Summary email
 */

function sendFeasibilityResult (emailId,results) {
	
	Ti.include('/ui/common/Header.js');
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	
	actInd.show();
	
	setTimeout(function(e){
		Cloud.Emails.send({
			template:'QwikFeaso_Results',
			recipients: emailId,
			QwikFeaso_Results:results,    
			}, function (e) {
				if (e.success) {
				alert('Email sent to your registered email address');
			} else {
				alert('Error:\n' +
				((e.error && e.message) || JSON.stringify(e)));
			}
		});
		actInd.hide();
	},2000);
	
	
  
}

/*
 * Function to send feasibility comaprion email
 */

function sendFeasibilityComparisonResult (emailId,results) {
	Ti.include('/ui/common/Header.js');
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	actInd.show();
	
	setTimeout(function(e){
		
		Cloud.Emails.send({
							    template:'QwikFeaso_Results_Comparison',
							    recipients: emailId,
							    QwikFeaso_Results_Comparison:results,    
							}, function (e) {
							    if (e.success) {
							         alert('Email sent to your registered email address');
							    } else {
							        alert('Error:\n' +
							            ((e.error && e.message) || JSON.stringify(e)));
							    }
							});
							
		actInd.hide();					
		
	},2000);
	
  
}

/*
 * this is required when user changes email id from 'Licensed user details' screen, if that email id doest not exist over cloud
 */

function logout (usrName,fName,lName,promocode,country,state) {
	
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	Cloud.Users.logout(function(response){
					    if (response.success){
					    	
					    	//creates new user with currently provided email id
					    	createUser (usrName,fName,lName,promocode,country,state);
					    } else {
					        alert(response.message);
					    }
					    });
  
}

/*
 * Function to update current user details
 */

function updateUserDetails (fromWin,emailId,fName,lName,country,state,promoCode,window) {
	Ti.include('/services/CachingData.js')
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	Cloud.Users.update({
						    email: emailId,
						    first_name: fName,
						    last_name: lName,
						    custom_fields: {
						    	PromoCode:promoCode,
			         			Country:country,
			         			State:state,
	          				}
						    
						}, function (e) {
						    if (e.success) {
						        var user = e.users[0];
						        var userName = '';
								var userid = '';
								var firstname = '';
								var lastname = '';
								var country = '';
								var region = '';
								var promoCode = '';
								
								userid = user.id;
								userName = user.username;
								firstname = user.first_name;
								lastname = user.last_name;
								country = user.custom_fields.Country;
								region = user.custom_fields.State;
								promoCode = user.custom_fields.PromoCode;
								
								//reset registration flag
								setRegistration(true);
								
								//recache user data
							    setUserData(userid,userName,firstname,lastname,country,region,promoCode);
										
								
								if(fromWin === 'Register'){
									//if navigation is from 'First run wizard' screen 
									
									//set first run
									setFirstRun(true);
									
									//redirect to landing screen (dashborad)
									if(Ti.Platform.osname == 'ipad' || Ti.Platform.osname == 'iphone')
									{
										//QwikFeasoGlobalVars.firstRun=true;
										//var createDashBoardWindow = require('ui/common/DashBoard');
										var createDashBoardWindow = require('ui/common/LandingPage');
										navGroup.open(new createDashBoardWindow(),{animated: true});
									}
									else if(Ti.Platform.osname == 'android')
									{
										//Ti.App.QwikFeasoGlobalVars.firstRun=true;
										var createDashBoardWindow= require('ui/common/DashBoard');
										new createDashBoardWindow().open(); 		
									}
								}
								else{
									//if navigation is from 'Licensed user details' screen
									
									var couNTRY = country;
									var regION = region;
									
									//send update user details email
									Cloud.Emails.send({
												    template:'Updated_User_Details',
												    recipients: userName,
												    first_name:firstname,    
												    last_name:lastname,
												    country:couNTRY,
												    region:regION,
												    email:userName,
												}, function (e) {
												    if (e.success) {
												         alert('Thank You, we have updated our records with your new details');
												    } else {
												        alert('Error:\n' +
												            ((e.error && e.message) || JSON.stringify(e)));
												    }
												});
												
									//close 'Licensed user details screen'
							    	if(Ti.Platform.osname == 'ipad' || Ti.Platform.osname == 'iphone')
									{
										navGroup.close(window,{animated: true});
									}
									else if(Ti.Platform.osname == 'android')
									{
										window.close();	
									}			
									
								}
								 
						        
						    } else {
						        alert(((e.error && e.message) || JSON.stringify(e)));
						    }
						});
  
}

/*
 * Fuction to resend activation mail to user (presently not working)
 */

function resendConfirmation () {
	
	   
}

function removeUser () {
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	Cloud.Users.remove(function (e) {
	    if (e.success) {
	        alert('Success: Removed');
	    } else {
	        alert('Error:\\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
  
}


