
/**
 * @projectDescription QwikFeaso
 * 
 * @author Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */



/*
   Function: Window for Adding property photos
   
   @param {Object} myPropertyPhotosWindow	Window object
   @return {Object}							Returns current window object
*/



function OpenMyPropertyPhotosWin (fromWin,PropertyId) {
  var propPhoto;
  var myPropertyPhotosWindow;
  var checkbox = [];
  var Properties = [];
  var propertyPhotoList = [];
  var deleteSign = [];
  var OptionArray = [{srN0:1,Name:'Select your option',option:'Take a picture',optionNo:1},{srN0:2,Name:'Select your option',option:'Pick from Gallery',optionNo:2}
  ];
  var myPropertyPhotosTableView;
  var selectedPhotos = [];
  var pId = 0;
  /*
   * Variable to handle the Checkbox selection events
   */
  var maxCheck = 1;  
  var numChecked = 0;
  var filename = '';
  
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
  	 myPropertyPhotosWindow=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 		
	 
	 // Handle back press
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
	 	Ti.App.QwikFeasoGlobalVars.propId = '';
	 	if(Ti.Platform.osname == 'android')
  		{
			Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto = 'default';
		}
		else
		{
			QwikFeasoGlobalVars.NewPropertyPhoto = 'default';
		}
		if(fromWin == 'Property details')
		  {
		  		dropTempPropPhotosLst();
		  }
	 	myPropertyPhotosWindow.close();
	 });
	 
	 // Save property photo
	 rightBtn.addEventListener('click',function(e){
	 	btnSelector(rightBtn);
	 	selectPicture ();
	 });
	myPropertyPhotosWindow.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;		
 	
  }
  else // iPhone or iPad specific code
  {	  	//Window Created for iphone to suport navigation Bar
		  	myPropertyPhotosWindow=Ti.UI.createWindow({
			  	backgroundColor:'#fff',
				navBarHidden:false,
				tabBarHidden: true,
				barImage:'images/GrayNavBar.png',
				barColor:'#6d6e6f',
				title:'Photos',
			
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
		 	QwikFeasoGlobalVars.propId = '';
		 	if(Ti.Platform.osname == 'android')
  			{
				Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto = 'default';
			}
			else
			{
				QwikFeasoGlobalVars.NewPropertyPhoto = 'default';
			}
			if(fromWin == 'Property details')
		  	{
		  		dropTempPropPhotosLst();
		  	}
		     navGroup.close(myPropertyPhotosWindow,{animated: true});
		  });
  
		  lftNavView.add(BackBtn);
		
		  myPropertyPhotosWindow.leftNavButton=lftNavView;
		  
		  
		  var rightView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					
					backgroundColor:'#0000',
					layout:'horizontal'
					
				});

		  var RightBtn = Ti.UI.createButton({
			      title : fromWin == 'Property details'?'Add Photos ':'Select Photo',
			      height : '30dp',
			      width:'90dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
			  });
			  
		  // Save property photo
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);
		  	selectPicture();
		  	
		  });
		  
		  rightView.add(RightBtn);
		 myPropertyPhotosWindow.rightNavButton=rightView;
		  
	
	}
	
/*
   Function: Creates a list photos selected by user through Camera or Gallery. 
   			 User can select only one photo at a time to make it as default image for that property. 
   @param {List} Properties		Holds the list of Imgs selected by the user			 
  
*/
	
function setPropertyPhoto () {
	var sel = false;
	var checkBoxId;
	var photoPath;
	var photoId;
  for(var i=0;i<Properties.length;i++)
  {
  	/*
  	 * Get the selected img path and id from the list
  	 */
  	if(checkbox[i].selected == true)
  	{
  		photoPath = propertyPhotoList[i].image;
  		sel = true;
  		checkBoxId = i;
  		photoId = Properties[i].photoId;
  		if(fromWin == 'Property details')
  			updatePropertyPhoto(PropertyId,photoId);
  	}
  	
  }
  
  /*
   * Logic of generating alert if no img is selected and user clicks on Save
   */
  
  if(sel == false)
  {
  	alert("Please select atleast one photo");
  }
  else
  {
  	 if(Ti.Platform.osname == 'android')
  	 {
		Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto = photoPath;
		
		if(fromWin == 'Property details')
			Ti.App.QwikFeasoGlobalVars.PropPhotoId =photoId;
			
		myPropertyPhotosWindow.close();
	 }
	 else
	 {
		QwikFeasoGlobalVars.NewPropertyPhoto = photoPath;
		
		if(fromWin == 'Property details')
			QwikFeasoGlobalVars.PropPhotoId =photoId;
			
		navGroup.close(myPropertyPhotosWindow,{animated: true});
	}
	
  }
}
	
myPropertyPhotosWindow.orientationModes=[
									Ti.UI.PORTRAIT
									];
									

if(PropertyId != '')
{
	var property = [];
	property = getPropDetails(PropertyId);
	var propertyName = property[0].name;
	
	subHeaderLabel.text=propertyName;
}
else{
	subHeaderLabel.text='New property';
}
viewSubHeader.add(subHeaderLabel);

if (Ti.Platform.osname == 'android') 
	{
		viewSubHeader.top='10%';
	};

myPropertyPhotosWindow.add(viewSubHeader);
	
function f() {
  f.count = ++f.count || 1 // f.count is undefined at first 
}
	
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
	
  selectedPhotos.push({
		photoId:pId,
		imgName:val
	});
	pId++;
	if(PropertyId !== '')
	{
		insertPropPhotosIntoDef(PropertyId,val);
	}
	
	myPropertyPhotosWindow.add(actvityIndicatorView);
	actInd.show();
	
	setTimeout(function(){
			  	myPropertyPhotosWindow.remove(myPropertyPhotosTableView);
				myPropertyPhotosTableView=null;
						getPhotosList();	
 	 					actInd.hide();
 	 					myPropertyPhotosWindow.remove(actvityIndicatorView);
  	}, 500);
}

//myPropertyPhotosWindow.add(addPhotosBtn);	

if(Ti.Platform.osname == 'iphone')
{
	viewSubHeader.top='0%';
	
}


var selectDefaultImgLabel=Ti.UI.createLabel(
	{
		left:'2%',
		text:'Select Default Image for Property',
		top:Ti.Platform.osname== 'android'?'19%':'10%',
		font:{fontSize:'12dp'},
		color:glblLightGrayFont,
	});
	
myPropertyPhotosWindow.add(selectDefaultImgLabel);	
	
   
    	
var rowHt=Ti.Platform.osname=='android'
							?(Ti.Platform.displayCaps.platformHeight*35)/100
							:(Ti.Platform.displayCaps.platformHeight*30)/100;
							
function clearSelectedPhotos () {
  for(var i=0;i<selectedPhotos.length;i++)
  {
  	selectedPhotos.splice(i,1);
  }
}
							
getPhotosList();

/*
   Function: Set the header for Android devices
   
   @param {Object) headerView				View object that holds the container to the headerLabel  
   @param {Object} headerLabel				Label object that holds the name of header
   @param {Object) leftBtn					Left button object for going back 
   @param {Object) rightBtn					Right button object for saving the selected photo as default for the property
   @param {Object) myPropertyPhotosWindow	Window object that holds all the above objects
   @memberOf headerLabel					View that is a member of Header.js file
   @memberOf leftBtn						View that is a member of Header.js file
   @memberOf rightBtn						View that is a member of Header.js file
   @memberOf headerView						View that is a member of Header.js file
*/
function setHeader () {
	
		headerLabel.text='Photos';
		
		leftBtn.title='Back';
		if(fromWin == 'Property details')
			rightBtn.title='Add Photos';
		else
			rightBtn.title='Select Photo';	
			
		rightBtn.width = '35%',
		headerView.add(leftBtn);						
		headerView.add(headerLabel);
		headerView.add(rightBtn);
		
		myPropertyPhotosWindow.add(headerView);
  
 }
 
/*
   Function: Get property photo list
   
   @param {List) Properties					Holds the Property details  
   @memberOf getTempPropPhotosLst			Function is member of DatabaseTransaction.js file
   @memberOf getPropPhotosLst				Function is member of DatabaseTransaction.js file
*/ 

function getPhotosList () {
var PhotoData=[];
Properties = [];

/*
 * Logic of loading Properties list with TempPropertyPhotos table if coming from Add Property window
 * else loading it with DefaultPropertyPhotos table
 */
if(fromWin == 'Add property')
{
	Properties = selectedPhotos;
}
else if(fromWin == 'Property details')
{
	Properties = getPropPhotosLst(PropertyId);
}

  for(var i=0;i<Properties.length;i++)
  {
  		
		var propertyPhotosRow=Ti.UI.createTableViewRow();
			propertyPhotosRow.backgroundColor='#fff';
			propertyPhotosRow.height=rowHt;
			propertyPhotosRow.backgroundSelectedColor='#fff';
			propertyPhotosRow.selectedBackgroundColor='#fff';		
		
	/*
 	 * Logic of getting img from the path 'externalStorageDirectory' else
 	 * getting it from 'applicationDataDirectory'
 	 */	
 	 
	 var path = Ti.Platform.osname == 'android' ? Ti.Filesystem.externalStorageDirectory : Ti.Filesystem.applicationDataDirectory;
	 propertyPhotoList[i]=Ti.UI.createImageView(
	 	{
	 		image:fromWin == 'Add property'?path + Ti.Filesystem.separator + Properties[i].imgName:Properties[i].imgName,
	 		clickName:'PropertyPhoto',
	 		width:'160dp',
	 		height:Ti.Platform.osname == 'android'?'160dp':rowHt-20,
	 		left:Ti.Platform.osname == 'android'?'3%':-5,//SetCustomLeftPosition(-2),
	 	});		
  	 propertyPhotosRow.add(propertyPhotoList[i]);
  	 
  	 /*
 	  * Logic of setting img checkbox true if it is default img for that property
 	  */
 	
  	 var isDef;
  	 if(fromWin == 'Property details')
  	 {
  	 	isDef = Properties[i].isDef;
  	 	if(isDef == 1)
  	 		numChecked = numChecked+1;
  	 }
  	 	
  	checkbox[i] = Ti.UI.createView({  
  		id:Properties[i].photoId,
            width:Ti.Platform.osname=='android'?'40dp':'30dp',  
            height:Ti.Platform.osname=='android'?'40dp':'30dp',  
            backgroundImage:isDef == 1?globalImgPath+'check.png':globalImgPath+'uncheck.png',//check.png
            selected:isDef == 1?true:false,          
            right:'25%',
            cnt:i,
        });  
        
    deleteSign[i]=Ti.UI.createImageView(
	 	{
	 		id:Properties[i].photoId,
	 		backgroundImage:globalImgPath+'cross_btn.png',
	 		width:Ti.Platform.osname == 'android'?'30dp':'20dp',
	 		height:Ti.Platform.osname == 'android'?'30dp':'20dp',
	 		right:'3%',//SetCustomLeftPosition(-2),
	 	});	
	 	
	 	deleteSign[i].addEventListener('singletap', imgTappingClick);
  	
          
        //-- We use the singletap event rather than the click since its in a scroll view  
        checkbox[i].addEventListener('singletap',toppingListClick);  
      
  	 propertyPhotosRow.add(checkbox[i]);
  	 propertyPhotosRow.add(deleteSign[i]);
  	 PhotoData.push(propertyPhotosRow);
  }
  
  myPropertyPhotosTableView=Ti.UI.createTableView(
		{
			top:Ti.Platform.osname=='android'?'27%':'19%',
			data:PhotoData,
			separatorColor:'white',
			scrollable:true,
			backgroundColor:'#fff'
			
		});
	
  myPropertyPhotosWindow.add(myPropertyPhotosTableView);
  
  
	}
	
//Delete sign listener
function imgTappingClick (e) {
	btnSelector(e.source);
	/*
	 * Logic of deleting the selected img from Temp table if coming from Add property
	 * else deleting it from Default property photos table
	 */
	
  if(fromWin == 'Add property')
	{   
		for(var i=0;i<selectedPhotos.length;i++)
		{
			if(selectedPhotos[i].photoId == e.source.id)
			{
				selectedPhotos.splice(i,1);
			}
		}
		
	}
	else if(fromWin == 'Property details')
	{
		deletePropertyPhoto(PropertyId,e.source.id);
	}
  myPropertyPhotosWindow.add(actvityIndicatorView);
  actInd.show();
  myPropertyPhotosWindow.remove(myPropertyPhotosTableView);
  myPropertyPhotosTableView=null;
  getPhotosList();
  actInd.hide();
  myPropertyPhotosWindow.remove(actvityIndicatorView);
}


function toppingListClick (e) {
	
	/*
	 * Logic of generating alert if more than one img selected as default, and resetting checkbox to the 
	 * selected img
	 */
	if(e.source.selected)
	{
		e.source.selected =false;
		e.source.backgroundImage=globalImgPath+'uncheck.png';
		numChecked -=1;
	}
	else
	{
		
		if(numChecked < maxCheck)
		{
			e.source.selected = true;
			
			e.source.backgroundImage =globalImgPath+'check.png';
								
			numChecked +=1;	
			
			///////////////
			if(fromWin == 'Property details')
			  {
			  		dropTempPropPhotosLst();
			  }
			var photoPath = propertyPhotoList[e.source.cnt].image;
	  		var photoId = e.source.id;
	  		if(fromWin == 'Property details')
	  			updatePropertyPhoto(PropertyId,photoId);
	  		if(Ti.Platform.osname == 'android')
		  	 {
		  	 	Ti.App.QwikFeasoGlobalVars.propId = '';
				Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto = photoPath;
				
				if(fromWin == 'Property details')
					Ti.App.QwikFeasoGlobalVars.PropPhotoId =photoId;
					
				myPropertyPhotosWindow.close();
			 }
			 else
			 {
			 	QwikFeasoGlobalVars.propId = '';
				QwikFeasoGlobalVars.NewPropertyPhoto = photoPath;
				
				if(fromWin == 'Property details')
					QwikFeasoGlobalVars.PropPhotoId =photoId;
					
				navGroup.close(myPropertyPhotosWindow,{animated: true});
			}
		}
		else 
		{
			var alerDialog=Ti.UI.createAlertDialog({
				message:'You can only set one default image. Would you like to set this image as the default? ',
				buttonNames: ['Yes','No']
			});
			alerDialog.addEventListener('click', function(ev) {
				
				// If user selects Yes
			    if (ev.index == 0) { 
			    	
			    	for(var i=0;i<checkbox.length;i++)
			    	{
			    		checkbox[i].selected = false;
			    		checkbox[i].backgroundImage = globalImgPath+'uncheck.png';
			    	}
			    	
			    	e.source.selected = true;
			    	e.source.backgroundImage = globalImgPath+'check.png';
			    	/////////////////////
			    	if(fromWin == 'Property details')
					  {
					  		dropTempPropPhotosLst();
					  }
			    	var photoPath = propertyPhotoList[e.source.cnt].image;
			  		var photoId = e.source.id;
			  		if(fromWin == 'Property details')
			  			updatePropertyPhoto(PropertyId,photoId);
			  		if(Ti.Platform.osname == 'android')
				  	 {
				  	 	Ti.App.QwikFeasoGlobalVars.propId = '';
						Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto = photoPath;
						
						if(fromWin == 'Property details')
							Ti.App.QwikFeasoGlobalVars.PropPhotoId =photoId;
							
						myPropertyPhotosWindow.close();
					 }
					 else
					 {
					 	QwikFeasoGlobalVars.propId = '';
						QwikFeasoGlobalVars.NewPropertyPhoto = photoPath;
						
						if(fromWin == 'Property details')
							QwikFeasoGlobalVars.PropPhotoId =photoId;
							
						navGroup.close(myPropertyPhotosWindow,{animated: true});
					}
			    } 
			    // If user selects No
			    else if (ev.index == 1) { 
			    	alerDialog.hide();
			    }
			  });
			  if(fromWin == 'Property details')
				alerDialog.show();
			
		}
		
		
		
							
	}
  
}

myPropertyPhotosWindow.add(actInd);

return myPropertyPhotosWindow;

}
module.exports=OpenMyPropertyPhotosWin;
