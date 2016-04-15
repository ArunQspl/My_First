/**
 * @projectDescription QwikFeaso
 * 
 * @author List- vivek Gidmare(vivek.gidmare@quagnitia.com),Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window for Adding property 
   
   @param {Object} addPropertyWindow	Window object
   @return {Object}						Returns current window object
*/

function OpenAddPropertyWin () 
{
var addPropertyWindow;
var propertyImageView;
var propertyNameTextField;
var propertyAddressTextArea;
var OptionArray = [{srN0:1,Name:'Select your option',option:'Take a picture',optionNo:1},{srN0:2,Name:'Select your option',option:'Pick from Gallery',optionNo:2}
  ];
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
  	 addPropertyWindow=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 		
	 
	 // Handle back press
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
		 
		 	if(propertyNameTextField.value != '' || propertyAddressTextArea.value != '')
		 	{
		 		var alerDialog=Ti.UI.createAlertDialog({
					message:'Are you sure you want to navigate away from this page? ',
					buttonNames: ['Yes','No']
				});
				alerDialog.addEventListener('click', function(ev) {
				    if (ev.index == 0) { 
				    	dropTempPropPhotosLst();
				    	addPropertyWindow.close();
				     // clicked "Yes"
				    } else if (ev.index == 1) { 		    	
				    	alerDialog.hide();
				      // clicked "No"
				    }
				  });
				alerDialog.show();
		 	}
		 	else
		 	{
		 		dropTempPropPhotosLst();
				addPropertyWindow.close();
		 	}
	 	});
	 	
	 // Adds a new property	
	 rightBtn.addEventListener('click',function(e){
	 	btnSelector(rightBtn);
	 		var ISPresent = false;
		  	//RightBtn.opacity='0.8';
		  	
		  		if(Ti.App.QwikFeasoGlobalVars.CalledfromPopUp === 1)
		  		{	
		  			if(insertProperty())//add property
		  			{
		  				ISPresent=AddFeasibilityToLastProperty();
		  			
		  			Ti.App.QwikFeasoGlobalVars.CalledfromPopUp = 0;
		  			addPropertyWindow.close();
		  			if(ISPresent == true)
						{	
							alert('Feasibility Already Added');
						}
						else
						{
							alert('Feasibility Added To Property.');
						}
		  			}
		  			else
		  			{
		  				alert('Please provide some data');
		  			}
		  			
		  		}
		  		else
		  		{
					if(insertProperty())//add property
		  			{
		  			/*
					 * Logic of UI update of Property List after adding a new property
					 */
					addPropertyWindow.close();
					Ti.App.QwikFeasoGlobalVars.SummaryUpdated = 1;
					
					}
					else
					{
						alert('Please provide some data');
					}
					
					
					
		  		}
		});
	//addPropertyWindow.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;		
	addPropertyWindow.windowSoftInputMode=Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
 	
  }
  else // iPhone or iPad specific code
  {
  	  	//Window Created for iphone to suport navigation Bar
		  	addPropertyWindow=Ti.UI.createWindow({
		  	backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			title:'Add Property',
			
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
		 	if(propertyNameTextField.value != '' || propertyAddressTextArea.value != '')
		 	{
		 		var alerDialog=Ti.UI.createAlertDialog({
					message:'Are you sure you want to navigate away from this page? ',
					buttonNames: ['Yes','No']
				});
				alerDialog.addEventListener('click', function(ev) {
				    if (ev.index == 0) { 
				    	dropTempPropPhotosLst();
				    	navGroup.close(addPropertyWindow,{animated: true});
				     // clicked "Yes"
				    } else if (ev.index == 1) { 		    	
				    	alerDialog.hide();
				      // clicked "No"
				    }
				  });
				alerDialog.show();
		 	}
		 	else
		 	{
		 		dropTempPropPhotosLst();
				navGroup.close(addPropertyWindow,{animated: true});
		 	}
		    
		  });
  
		  lftNavView.add(BackBtn);
		
		  addPropertyWindow.leftNavButton=lftNavView;
		  
		  var rightView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					
					backgroundColor:'#0000',
					layout:'horizontal'
					
				});

		  var RightBtn = Ti.UI.createButton({
			      title : 'Save',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
			  });
		  //Adds a new property	  
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn); 
		  	var ISPresent = false;
		  
		  		if(QwikFeasoGlobalVars.CalledfromPopUp === 1)
		  		{
		  			if(insertProperty())//add property
		  			{
			  				ISPresent=AddFeasibilityToLastProperty();
			  			
			  			QwikFeasoGlobalVars.CalledfromPopUp = 0;
			  			navGroup.close(addPropertyWindow,{animated: true});
			  			if(ISPresent == true)
							{	
								alert('Feasibility Already Added');
							}
							else
							{
								alert('Feasibility Added To Property.');
							}
		  			}
		  			else
		  			{
		  				alert('Please provide some data');
		  			}
		  		}
		  		else
		  		{
		  			if(insertProperty())//add property
		  			{
		  			navGroup.close(addPropertyWindow,{animated: true});
					QwikFeasoGlobalVars.SummaryUpdated = 1;
					}
					else
					{
						alert('Please provide some data');
					}
					
		  		}
		  });
		  
		  rightView.add(RightBtn);
		  addPropertyWindow.rightNavButton=rightView;
		  
	var subHeaderView=Ti.UI.createView(
		{
		width:'100%',
		height:'6%',
		top:'0%',
		backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
		});

	var subHeaderTextLabel = Ti.UI.createLabel({
		text : 'New Property',
		color : '#fff',
		font:{fontSize:'15%',fontWeight:'bold'},
		left : '5%',
		textAlign : 'left'
		});	

	subHeaderView.add(subHeaderTextLabel);
	addPropertyWindow.add(subHeaderView);

	
	}
	
		


createTempPropPhotosLst();

/*
   Function: Inserts a new property
 
   @memberOf insertNewProperty				Function is member of DatabaseTransaction.js file
  
*/


function insertProperty () {
	if(propertyNameTextField.value == '' || propertyAddressTextArea.value == '')
	{
		//alert('Please provide some data');
		return false;
	}
	else
	{
		/*
		 * Logic of inserting property with default img if no photo is selected 
		 */
		if(propertyImageView.image == 'images/def.png' || propertyImageView.image == '/images/default_property1.png')
	  		insertNewProperty(propertyNameTextField.value,propertyAddressTextArea.value,'');
		else
			insertNewProperty(propertyNameTextField.value,propertyAddressTextArea.value,propertyImageView.image);
		
		return true;
	}
	
}
addPropertyWindow.orientationModes=[Ti.UI.PORTRAIT];

var propertyNameTextFieldView=Ti.UI.createView({
	backgroundColor:'white',
	width:'100%',
	height:'15%',//SetCustomHeight(15),
	top:Ti.Platform.osname == 'android'?'16%':'6%',
	borderColor:glblLightGrayFont,
	borderWidth:1,
	borderRadius:0
	
})



propertyNameTextField=Ti.UI.createTextField(
	{
		id:'name',
		width:'90%',
		height:Ti.Platform.osname == 'android'?'60%':'60%',
		font:Ti.Platform.osname =='android'?{fontSize:'18dp'}:{fontSize:'15%'},
		hintText:'Property Name',
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color:glblDarkGrayFont,
		backgroundColor:'#fff',
	    borderColor:glblLightGrayFont,
	    borderRadius:5,
	    borderWidth:1,
		paddingLeft:Ti.Platform.osname =='android'?'':'3dp',
	});
	
	propertyNameTextField.addEventListener('focus', function (e){
			propertyNameTextField.borderWidth = 3;
	}); 
		
	propertyNameTextField.addEventListener('blur', function (e){
			propertyNameTextField.borderWidth = 1;
	}); 	
propertyNameTextFieldView.add(propertyNameTextField);
addPropertyWindow.add(propertyNameTextFieldView);	
	

//createTextArea
var  propertyAddressView=Ti.UI.createView({
	backgroundColor:'white',
	width:'100%',
	height:'20%',//SetCustomHeight(20),
	top:Ti.Platform.osname == 'android'?'30%':'20%',
	borderColor:glblLightGrayFont,
	borderWidth:1,
	borderRadius:0
})


propertyAddressTextArea=Ti.UI.createTextArea(
	{
		width:'90%',
		height:'80%',
		id:'address',
		hintText:'Address',
			
		font:Ti.Platform.osname =='android'?{fontSize:'18dp'}:{fontSize:'20%'},
		textAlign:'top',
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DONE,
		/*borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderWidth:Ti.Platform.osname=='android'?0:1,
		borderColor:Ti.Platform.osname=='android'?'#fff':glblLightGrayFont,
		borderRadius:Ti.Platform.osname=='android'?0:5*/
		color:glblDarkGrayFont,
		backgroundColor:'#fff',
	    borderColor:glblLightGrayFont,
	    borderRadius:5,
	    borderWidth:1,
	    paddingLeft:Ti.Platform.osname =='android'?'':'3dp',
	});	

	propertyAddressTextArea.addEventListener('focus', function (e){
			propertyAddressTextArea.borderWidth = 3;
	}); 
		
	propertyAddressTextArea.addEventListener('blur', function (e){
			propertyAddressTextArea.borderWidth = 1;
	});

propertyAddressView.add(propertyAddressTextArea);
var propertyAddressTextFieldLabel;

propertyNameTextField.addEventListener('change',dataChanged);
propertyAddressTextArea.addEventListener('change',dataChanged);


function dataChanged (e) {
  if(Ti.Platform.osname != 'android')
	{
		if(e.source.id == 'address')
		{
			propertyAddressTextFieldLabel.hide();
		}
	}
}


if(Ti.Platform.osname == 'iphone')
{
	propertyAddressTextFieldLabel=Ti.UI.createLabel(
		{
			text:'Address',
			width:'auto',
			height:'auto',
			font:Ti.Platform.osname =='android'?{fontSize:'18dp'}:{fontSize:'18%'},
			color:glblLightGrayFont,
			top:'12%',
			left:'6%'		
		});
	propertyAddressView.add(propertyAddressTextFieldLabel);
	
	propertyAddressTextArea.addEventListener('blur',function(e)
			{
				if(propertyAddressTextArea.value == '')
				propertyAddressTextFieldLabel.show();
			});

}


addPropertyWindow.add(propertyAddressView);



var  propertyPhotoView=Ti.UI.createView({
	backgroundColor:'white',
	width:'100%',
	height:'50%',
	top:Ti.Platform.osname == 'android'?'50%':'40%',
	borderColor:glblLightGrayFont,
	borderWidth:1,
	borderRadius:0
})

propertyImageView=Ti.UI.createImageView(
	{
		//width:Ti.Platform.osname == 'android'?Ti.UI.Size:'50%',
		//height:Ti.Platform.osname == 'android'?Ti.UI.Size:'30%',
		width:Ti.UI.Size,
		height:Ti.UI.Size,
		top:Ti.Platform.osname == 'android'?'55%':'45%',
		image:Ti.Platform.osname == 'android'?'/images/default_property2.png':'images/default_property2.png',
		left:Ti.Platform.osname == 'android'?'7%':'1%',
		
	});

addPropertyWindow.add(propertyImageView);


var phbtn=Ti.UI.createButton(
	{
		width:Ti.Platform.osname=='android'?'24%':'62dp',
		height:Ti.Platform.osname=='android'?'10%':'32dp',
		top:Ti.Platform.osname =='android'?'66%':'53%',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		right:Ti.Platform.osname=='android'?'15%':'15%',
		title:'Photos',
		color:'#fff',
		font:Ti.Platform.osname =='android'?{fontSize:'18dp'}:{fontSize:'15%'},
		borderRadius:5,
		backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
	});

phbtn.addEventListener('click',function(e)
	{
		btnSelector(phbtn);
		selectPicture();
	});
addPropertyWindow.add(phbtn);


  
function selectPicture () {
		
					var option=[];
					var Title;
					var path='';
					for(var i=0;i<OptionArray.length;i++)
					{
						Title=OptionArray[i].Name;
						option.push(OptionArray[i].option);
						
					}
					
					OptDialog=CreateOptionDialog(Title,option);
					OptDialog.show();
					OptDialog.addEventListener('click',function(opt){
					try {
					    var opt = opt.source.options[opt.index];
						if(opt == 'Take a picture')
						{
							
							Titanium.Media.showCamera({
 
									success:function(event)
									{
										
											var image = event.media;
											if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
												
												var filename = new Date().getTime() + "-ea.jpg";
												setImageList(filename,image);
											}	
										},
									cancel:function()
									{
								               alert('You canceled the action.');
									},
									error:function(error)
									{
										// create alert
										var a = Titanium.UI.createAlertDialog({title:'Camera'});
								 
										// set message
										if (error.code == Titanium.Media.NO_CAMERA)
										{
											a.setMessage('Please run this test on device');
										}
										else
										{
											a.setMessage('Unexpected error: ' + error.code);
										}
								 
										// show alert
										a.show();
									},
									saveToPhotoGallery:true,
									allowEditing:true,
									mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO],
								});
						}
						else if(opt == 'Pick from Gallery')
						{
							
						Titanium.Media.openPhotoGallery({
									    success : function(event) {
									    	var image = event.media;
									    	if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
										    	
										    	var filename = new Date().getTime() + "-ea.jpg";
												setImageList(filename,image);
											}	
														
												
									    },
									    cancel : function() {
									 
									    },
									    error : function(error) {
									    	// create alert
											var a = Titanium.UI.createAlertDialog({title:'Gallery'});
									 
											// set message
											if (error.code == Titanium.Media.NO_CAMERA)
											{
												a.setMessage('Please run this test on device');
											}
											else
											{
												a.setMessage('Unexpected error: ' + error.code);
											}
									 
											// show alert
											a.show();
									    },
									    mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
									});
						}
					} 
					catch (ex) {
					    var exp = ex.javaException;
					    }
					
					
					});
					
}

function setImageList (val,image) {
	var path = '';
  if(Ti.Platform.osname === 'android')
	{
		if(Titanium.Filesystem.isExternalStoragePresent())
			path=Ti.Filesystem.externalStorageDirectory;
		else
			path=Ti.Filesystem.applicationDataDirectory;
													
	}
	else
	{
		 path =   Ti.Filesystem.applicationDataDirectory;
	}
	var bgImage = Titanium.Filesystem.getFile(path, val);
								
	// Write the image to the new file (image created from camera)
	bgImage.write(image);
	
	addPropertyWindow.add(actvityIndicatorView);
	actInd.show();
	setTimeout(function(){
			  	propertyImageView.image = bgImage.getNativePath();
			  	propertyImageView.height = '30%';
			  	propertyImageView.width = '50%';
 	 					actInd.hide();
 	 					addPropertyWindow.remove(actvityIndicatorView);
  						}, 500);
  
}

function setHeader () {
	
		headerLabel.text='Add Property';
		
		leftBtn.title='Back';
		rightBtn.title='Save';
		
		headerView.add(leftBtn);						
		headerView.add(headerLabel);
		headerView.add(rightBtn);
		
		subHeaderLabel.text='New Property';
		viewSubHeader.add(subHeaderLabel);
		
		addPropertyWindow.add(headerView);
		addPropertyWindow.add(viewSubHeader);
  
			}
			
return addPropertyWindow;

}

module.exports=OpenAddPropertyWin;