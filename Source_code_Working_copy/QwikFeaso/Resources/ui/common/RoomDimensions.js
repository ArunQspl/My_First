/**
 * @projectDescription QwikFeaso
 * 
 * @author List- vivek Gidmare(vivek.gidmare@quagnitia.com),Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*

   Function: Window showing list Room categories with the value for % Allowance for Hallways and Open space
   
   
   @param {Object} RoomDimensionWin		Window object
   @return {Object}						Returns current window object
*/


function winOpen (winTitle,fromWin) {
  
  var RoomDimensionWin;
  var f2checkbox;
  var m2checkbox;
  var CentAllowanceRowValueTextField;
  var CentAllowanceRowLabel;
  var rowWidthTextField = [];
  var rowDepthTextField = [];
  var rowAreaLabel = [];
  var unit;
  var scrollView;
  var roomDimens = [];
  if(Ti.Platform.osname == 'android')
  {
  	
  	/*
  	 * Include the files needed for UI Design and Database usage
  	 * Header.js will manage navigation for android
  	 * 
  	 */
  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
  	Ti.include('/services/DataBaseTransaction.js')	
	Ti.include('/services/GetFromDataBase.js')	
	Ti.include('/services/TempDBTransaction.js')
  	 //Window Created for Android
  	 RoomDimensionWin=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 		
	 
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
			 	Ti.App.QwikFeasoGlobalVars.unitOfMeasure='M2';
			 	RoomDimensionWin.close();
	 	});
	 rightBtn.addEventListener('click',function(e){
	 	btnSelector(rightBtn);
	 	 RoomDimensionWin.add(actvityIndicatorView);
 	actInd.show();
		 	Ti.App.QwikFeasoGlobalVars.unitOfMeasure='M2';
		 	var isEmpty = saveRoomDimensionSettings();
		 	if(isEmpty == false)
		 		RoomDimensionWin.close();
		 		
	actInd.hide();
   	RoomDimensionWin.remove(actvityIndicatorView);	 		
		 	});
	 	
	  RoomDimensionWin.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;	
	  //RoomDimensionWin.windowSoftInputMode=Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
	unit = Ti.App.QwikFeasoGlobalVars.unitOfMeasure;		
  }
  else
  {
		  	//Window Created for iphone to suport navigation Bar
		  	unit = QwikFeasoGlobalVars.unitOfMeasure;
		  	RoomDimensionWin=Ti.UI.createWindow({
		    backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			//title:winTitle,
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
	
		 BackBtn.addEventListener('click', function() {    
		   btnSelector(BackBtn);
			QwikFeasoGlobalVars.unitOfMeasure='M2';
		    navGroup.close(RoomDimensionWin,{animated: true});
		    
		  });
  
		  lftNavView.add(BackBtn);
		  RoomDimensionWin.leftNavButton=lftNavView;
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

			 	RightBtn.addEventListener('click',function(e){
			 		btnSelector(RightBtn);
			 		RoomDimensionWin.add(actvityIndicatorView);
 	actInd.show();
			 							QwikFeasoGlobalVars.unitOfMeasure='M2';
			 							var isEmpty = saveRoomDimensionSettings();
									 	if(isEmpty == false)
									 		navGroup.close(RoomDimensionWin,{animated: true});
									 		
									 	actInd.hide();
   	RoomDimensionWin.remove(actvityIndicatorView);	
								  			
		 							 });
		  
		  rightView.add(RightBtn);
		  RoomDimensionWin.rightNavButton=rightView;
	
	}
RoomDimensionWin.orientationModes=[Ti.UI.PORTRAIT];



var roomDimensionSettingsList = [];
roomDimensionSettingsList = GetRoomDimensionSettings();

function changeRoomDimensions () {
	
	var unit = '';
	if(m2checkbox.selected)
	     unit = 'M2';
	else if(f2checkbox.selected)
	     unit = 'F2';
	     
	for(var i=0;i<RoomDimensionElementDetails.length;i++)
	{
		var width = parseFloat(rowWidthTextField[i].value);
  		var depth = parseFloat(rowDepthTextField[i].value);
  		var area = 0.0;
		if(unit == 'M2')
		{
			
				width = width*3.28084;
				depth = depth*3.28084;
		
			area = width*depth;
		}
		else if(unit == 'F2')
		{
		
				width = width/3.28084;
				depth = depth/3.28084;
		
			area = width*depth;
		}
		rowWidthTextField[i].value = width.toFixed(2);
		rowDepthTextField[i].value = depth.toFixed(2);
		rowAreaLabel[i].value = area.toFixed(2);
		
	}	   
  
}

function saveRoomDimensionSettings(){
	var emptyTxt = [];
	var isEmpty = false;
	if(CentAllowanceRowValueTextField.value == '')
	{
		CentAllowanceRowValueTextField.backgroundColor='#f00';
		isEmpty = true;
		CentAllowanceRowValueTextField.addEventListener('change',function(e){
			CentAllowanceRowValueTextField.backgroundColor='#fff';
		});
	}
		
	
	var unit = '';
	if(m2checkbox.selected)
	     unit = 'M2';
	else if(f2checkbox.selected)
	     unit = 'F2';
	  
	  
	     
	for(var i=0;i<RoomDimensionElementDetails.length;i++)
	{
		
			var width = rowWidthTextField[i].value;
			var depth = rowDepthTextField[i].value;
			
			if(width == '' || depth == '')
			{
				if(width == '')
				{
					rowWidthTextField[i].backgroundColor='#f00';
					rowWidthTextField[i].focus();
					isEmpty = true;
					emptyTxt.push(i);
					
				}
				
				if(depth == '')
				{
					rowDepthTextField[i].backgroundColor='#f00';
					rowDepthTextField[i].focus();
					isEmpty = true;
					emptyTxt.push(i);
					
				}
				
				if(width == '' && depth == '')
					rowWidthTextField[i].focus();
			}
			else{
				proceedToSave(width,depth,i);
			}
			
	}
	
	if(isEmpty == false)
	{
		//Ti.API.info('cent allowance value : '+CentAllowanceRowValueTextField.value);
		CentAllowanceRowValueTextField.focus();
		updateRoomDimensionSettings(CentAllowanceRowLabel.text,CentAllowanceRowValueTextField.value);
	}
	else{
		alert('Some Required data is missing, please update and try again');
		
	}
	
	return isEmpty;
	
}

function proceedToSave (width,depth,i) {
	var areaM2;
	var areaF2;
	var unit = '';
	/*if(m2checkbox.selected)
	     unit = 'M2';
	else if(f2checkbox.selected)
	     unit = 'F2';
	if(unit == 'F2')
	{
		areaM2 = (width/3.28084)*(depth/3.28084);
		areaF2 = (width)*(depth);
		Ti.API.info('values to be updated : '+RoomDimensionElementDetails[i].roomSubcatId+' '+width+' '+depth+' '+areaM2+' '+areaF2+' '+'f2'+' '+unit);
		updateRoomDimensions(RoomDimensionElementDetails[i].roomSubcatId,width,depth,areaM2,areaF2,'f2');
	}
	else if(unit == 'M2'){
		areaM2 = width*depth;
		areaF2 = (width*3.28084)*(depth*3.28084);
		Ti.API.info('values to be updated : '+RoomDimensionElementDetails[i].roomSubcatId+' '+width+' '+depth+' '+areaM2+' '+areaF2+' '+'m2'+' '+unit)
		updateRoomDimensions(RoomDimensionElementDetails[i].roomSubcatId,width,depth,areaM2,areaF2,'m2');
	}*/
	
	areaM2 = width*depth;
	areaF2 = (width*3.28084)*(depth*3.28084);
	//Ti.API.info('values to be updated : '+RoomDimensionElementDetails[i].roomSubcatId+' '+width+' '+depth+' '+areaM2+' '+areaF2+' '+'m2'+' '+unit)
	updateRoomDimensions(RoomDimensionElementDetails[i].roomSubcatId,width,depth,areaM2,areaF2,'m2');
}

var outerScrollview=Ti.UI.createScrollView({
	 contentHeight: 'auto',
     layout: 'vertical',
     top:Ti.Platform.osname == 'android'?'10%':'0%',
});


var rowHt=(Ti.Platform.displayCaps.platformHeight*15)/100; 


var RoomDimensionList=[
					{ID:1,Name:'Bedrooms'},
					{ID:2,Name:'Other Rooms & Spaces'},
					{ID:3,Name:'Kitchens'},
					{ID:4,Name:'Bathrooms'},
					{ID:5,Name:'Decks'},
					{ID:6,Name:'Garages'},
					];

var RoomDimensionElementDetails = [];
RoomDimensionElementDetails = GetRoomDimensionDetails();
					
var rowData=[];
getRoomDimensionListRow();					


function getRoomDimensionListRow () {
 	
 	scrollView = Ti.UI.createScrollView({
	    contentHeight: 'auto',
	    layout: 'vertical',
	});

	if(Ti.Platform.osname == 'android')
			scrollView.top='10%';
			
 	var unit = '';
 	if(Ti.Platform.osname == 'android')
		unit = Ti.App.QwikFeasoGlobalVars.unitOfMeasure;
	else
		unit = QwikFeasoGlobalVars.unitOfMeasure;
 	
 	var unitConverionRow=getUinitOfMeasureRow(unit);
 	var CentAllowanceRow=getCentAllowanceRow();
 	
 	 var view=Ti.UI.createView(
			{
				width:'100%',
				//height:(rowHt+rowHt),
				height:rowHt,
				layout:'vertical'
			});
	//view.add(unitConverionRow);
	view.add(CentAllowanceRow);
   setTimeout(function(){
   		scrollView.add(view);
   	for(var i=0;i<RoomDimensionList.length;i++)
		{
			var headerRow=createHeaderRow(i);
			scrollView.add(headerRow);
			for(var j=0;j<RoomDimensionElementDetails.length;j++)
			{
				if(RoomDimensionElementDetails[j].roomCatId == RoomDimensionList[i].ID)
				{
					var roww = createRow(j);
					scrollView.add(roww);
				}
			}
		}
   	

   	RoomDimensionWin.add(scrollView);
   },100);
} 
 
function createHeaderRow(i) {
             var rowHeader = Ti.UI.createView({
	           width:'100%', 
               height: '30dp',
               top: 0, 
               left: 0,
               backgroundGradient:{type:'linear',colors:['#b4b4b4','#969696'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},

           });
           
         
           
           var rowHeaderLabel=Ti.UI.createLabel(
           	{ 	text:''+RoomDimensionList[i].Name,
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'14dp',fontWeight:'bold'}
								 :{fontSize:'12%',fontWeight:'bold'},
				color:'white',
				left:'3%',
           		touchEnabled:false
           	});
           	
           	var HeaderWidthLabel=Ti.UI.createLabel(
           	{ 	text:'Width',
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'12dp'}
								 :{fontSize:'12%'},
				color:'white',
				left:'50%',
           		touchEnabled:false
           	});
           	var HeaderDepthLabel=Ti.UI.createLabel(
           	{ 	text:'Depth',
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'12dp'}
								 :{fontSize:'12%'},
				color:'white',
				left:'66%',
           		touchEnabled:false
           	});
           	var HeaderAreaLabel=Ti.UI.createLabel(
           	{ 	text:'Area (m2)',
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'12dp'}
								 :{fontSize:'12%'},
				color:'white',
				right:'5%',
           		touchEnabled:false
           	});
           
             rowHeader.add(rowHeaderLabel);
             rowHeader.add(HeaderWidthLabel);
             rowHeader.add(HeaderDepthLabel);
             rowHeader.add(HeaderAreaLabel);
       
            return rowHeader;
}


function createRow(i) {
	
	
		var area;
		var width = RoomDimensionElementDetails[i].Width;
		var depth = RoomDimensionElementDetails[i].Depth;
		var unitFromDB = RoomDimensionElementDetails[i].Unit;
		/*if(unitFromDB == 'm2'){
			
			area = RoomDimensionElementDetails[i].AreaF2;
		}
		else if(unitFromDB == 'f2'){
			
			area = RoomDimensionElementDetails[i].AreaM2;
		}*/
		
		area = RoomDimensionElementDetails[i].AreaM2;
		
		    var row = Ti.UI.createView({
               backgroundColor: 'white',
               borderColor: '#bbb',
               borderWidth: 1,
               width:'100%', 
               height: rowHt,
               top: 0, left: 0,
               id:'i'+i,
              
           });
           
           
          var rowLabel=Ti.UI.createLabel(
           	{
           		width:'45%',
           		height:'100%',
           		text:''+RoomDimensionElementDetails[i].Name,
           		font:{fontSize:'14dp'},
           		color:glblDarkGrayFont,
           		touchEnabled:false,
           		left:'2%',
           	});
           	
           	
           	
       rowWidthTextField[i] = Ti.UI.createTextField({
             left: '48%',
             width: '15%', 
             value:width.toFixed(2),
             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			
             height: '55%', 
			 backgroundColor:'#fff',
             borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
			 paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
             textAlign:Ti.Platform.osname == 'android'?'right':'right',
          	 
             });
          rowDepthTextField[i] = Ti.UI.createTextField({
             left: '64%',
             width: '15%', 
             value:depth.toFixed(2),
             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			 paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
             
             height: '55%', 
			 backgroundColor:'#fff',
             borderColor:glblLightGrayFont,
             borderRadius:5,
             borderWidth:1,
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
             textAlign:Ti.Platform.osname == 'android'?'right':'right',
          	 
             });    
        /*if(Ti.Platform.osname == 'android')
        {
        	rowWidthTextField[i].softKeyboardOnFocus= Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;	
			rowDepthTextField[i].softKeyboardOnFocus= Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;	

        }*/
        
     var a = area.toFixed(2);
     rowAreaLabel[i]=Ti.UI.createLabel(
           	{
           		width:'auto',
           		height:'100%',
           		text:a,
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
           		left:'82%',
           		color:glblLightGrayFont,
           		touchEnabled:false
           	});
		    row.add(rowLabel);
            row.add(rowWidthTextField[i]);
            row.add(rowDepthTextField[i]);
            row.add(rowAreaLabel[i]);
            
            rowWidthTextField[i].addEventListener('focus', function (e){
				rowWidthTextField[i].borderWidth = 3;
			}); 
				
			rowWidthTextField[i].addEventListener('blur', function (e){
				rowWidthTextField[i].borderWidth = 1;
			});
			
			rowDepthTextField[i].addEventListener('focus', function (e){
				rowDepthTextField[i].borderWidth = 3;
			}); 
				
			rowDepthTextField[i].addEventListener('blur', function (e){
				rowDepthTextField[i].borderWidth = 1;
			});
            
            /*
             * Logic to change the area at runtime when user changes the values of width or depth
             * 
             */
            
           rowWidthTextField[i].addEventListener('change',function(e)
           {
           		
	          	width = rowWidthTextField[i].value;
	          	depth = rowDepthTextField[i].value;
	          	rowAreaLabel[i].text = (width * depth).toFixed(2);
	          	rowWidthTextField[i].backgroundColor='#fff';
	       });
           
           rowDepthTextField[i].addEventListener('change',function(e)
           {
           		
	          	width = rowWidthTextField[i].value;
	          	depth = rowDepthTextField[i].value;
	          	rowAreaLabel[i].text = (width * depth).toFixed(2);
	          	rowDepthTextField[i].backgroundColor='#fff';
	       });
	       
           return row;
}

function getUinitOfMeasureRow (unit) {
	
  var uintOfMeasureRow =Ti.UI.createView({
						width:'100%',
						height:rowHt,
						backgroundColor: 'white',
					    borderColor: glblLightGrayFont,
					    borderWidth: 1,
						layout:'horizontal'
					}); 
  
	var uintOfMeasureRowLabel=Ti.UI.createLabel({
		           		width:'45%',
		           		height:'100%',
		           		text:'Unit of Measure',
		           		font:Ti.Platform.osname =='android' 
										 ?{fontSize:'18dp'}
										 :{fontSize:'17%'},
		           		left:'3%',
		           		color:glblDarkGrayFont,
		           		touchEnabled:false,
           			});  
           	
		var m2View=Ti.UI.createView(
		     	{
		     		width:'25%',
		     		height:'100%',
		     		layout:'horizontal',
		     	});      	
  
  		m2checkbox = Ti.UI.createView({  
		            width:Ti.Platform.osname=='android'?'35dp':'20dp',  
		            height:Ti.Platform.osname=='android'?'35dp':'20dp',  
		           }); 
     m2checkbox.addEventListener('click',function(e)
     {
		     	
		     	if(Ti.Platform.osname == 'android')
			     	Ti.App.QwikFeasoGlobalVars.unitOfMeasure='M2';
			     else
			     	QwikFeasoGlobalVars.unitOfMeasure='M2';
			     	
			     	
		     	if(e.source.selected)
		     	{
		     	}
		     	else
		     	{
		     		e.source.selected =true;
		     		e.source.backgroundImage=globalImgPath+'radiobtnactive.png';
		     		f2checkbox.backgroundImage=globalImgPath+'radiobtninactive.png';
		     		f2checkbox.selected = false;
		     		changeRoomDimensions();
		     	}
		     	
      });   
        
 	var m2Label=Ti.UI.createLabel({
           		width:'auto',
           		height:'100%',
           		text:'m2',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'17%'},
           		left:'10%',
           		color:glblDarkGrayFont,
           		touchEnabled:false
           	});        
		m2View.add(m2checkbox);	
		m2View.add(m2Label);	
	
	    var f2View=Ti.UI.createView(
     	{
     		width:'25%',
     		height:'100%',
     		layout:'horizontal',
     	});      	
  
   f2checkbox = Ti.UI.createView({  
            width:Ti.Platform.osname=='android'?'35dp':'20dp',  
            height:Ti.Platform.osname=='android'?'35dp':'20dp',  
        }); 
        
        var unit = RoomDimensionElementDetails[0].Unit;
        if(unit == 'm2')
        {
        	m2checkbox.backgroundImage = globalImgPath+'radiobtnactive.png';
            m2checkbox.selected = true;
            f2checkbox.backgroundImage = globalImgPath+'radiobtninactive.png';
            f2checkbox.selected = false;
        }
        else if(unit == 'f2')
        {
        	f2checkbox.backgroundImage = globalImgPath+'radiobtnactive.png';
            f2checkbox.selected = true;
            m2checkbox.backgroundImage = globalImgPath+'radiobtninactive.png';
            m2checkbox.selected = false;
        }
  f2checkbox.addEventListener('click',function(e)
     {
     	if(Ti.Platform.osname == 'android')
	    	Ti.App.QwikFeasoGlobalVars.unitOfMeasure='F2';
	    else
	     	QwikFeasoGlobalVars.unitOfMeasure='F2';
	   
	   	if(e.source.selected)
     	{
     		
     	}else
     	{
     		e.source.selected =true;
     		e.source.backgroundImage=globalImgPath+'radiobtnactive.png';
     		
     		m2checkbox.backgroundImage=globalImgPath+'radiobtninactive.png';
     		m2checkbox.selected = false;
     		changeRoomDimensions();
     	}
     		
     });   
  var f2Label=Ti.UI.createLabel(
           	{
           		width:'auto',
           		height:'100%',
           		text:'f2',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'17%'},
           		left:'10%',
           		color:glblDarkGrayFont,
           		touchEnabled:false
           	}); 
  	f2View.add(f2checkbox);	
	f2View.add(f2Label);
	
  	uintOfMeasureRow.add(uintOfMeasureRowLabel);
  	uintOfMeasureRow.add(m2View);
    uintOfMeasureRow.add(f2View);
    
    return uintOfMeasureRow;
   }

Ti.App.addEventListener('RefreshRoomSettings', function(event) {
	
	cleanWindow(scrollView);
	getRoomDimensionListRow();
	
});

function cleanWindow(winObj)
{
   RoomDimensionWin.add(actvityIndicatorView);
	    actInd.show();
	    setTimeout(function(){
	    actInd.hide();
	    RoomDimensionWin.remove(actvityIndicatorView);
    	
   },100);
    
}			



			
function getCentAllowanceRow () {
	var CentAllowanceRow=Ti.UI.createView({
		width:'100%',
		height:rowHt,
		backgroundColor: 'white',
	    borderColor: glblLightGrayFont,
	   	borderWidth: 1,
		layout:'horizontal'
	}); 
	CentAllowanceRowLabel=Ti.UI.createLabel(
	           	{
	           		width:'70%',
	           		height:'100%',
	           		text:'% Allowances for Hallways & Open Space',
	           		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'18dp'}
									 :{fontSize:'17%'},
	           		left:'3%',
	           		color:glblDarkGrayFont,
	           		touchEnabled:false,
	           	}); 
	 var allowance = roomDimensionSettingsList[1].Value;
	 
	 /*if(allowance == 0){
	 	allowance = '';
	 }     */     	
	 
	CentAllowanceRowValueTextField=Ti.UI.createTextField(
			{
				width:'25%',
				height:'55%',
				color:glblDarkGrayFont,
				value:allowance,					 
				backgroundColor:'white',
	    		borderColor:glblLightGrayFont,
	            borderRadius:5,
	            borderWidth:1,
	            paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
	            textAlign:Ti.Platform.osname == 'android'?'right':'right',
	          	keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,	
	          	font:Ti.Platform.osname =='android' 
									 ?{fontSize:'18dp'}
									 :{fontSize:'12%'},			 
			
			});
			
	CentAllowanceRowValueTextField.addEventListener('focus', function (e){
			CentAllowanceRowValueTextField.borderWidth = 3;
	}); 
		
	CentAllowanceRowValueTextField.addEventListener('blur', function (e){
			CentAllowanceRowValueTextField.borderWidth = 1;
	});		
			CentAllowanceRow.add(CentAllowanceRowLabel);
			CentAllowanceRow.add(CentAllowanceRowValueTextField);

		return CentAllowanceRow;
} 

    
    
  //Only for Android

  /*
   Function: Set the header for Android devices
   
   @param {Object) headerView			View object that holds the container to the headerLabel  
   @param {Object} headerLabel			Label object that holds the name of header
   @param {Object) leftBtn				Left button object for going back 
   @param {Object) rightBtn				Right button object for saving the room dimension settings
   @param {Object) RoomDimensionWin		Window object that holds all the above objects
   @memberOf headerLabel				View that is a member of Header.js file
   @memberOf leftBtn					View that is a member of Header.js file
   @memberOf rightBtn					View that is a member of Header.js file
   @memberOf headerView					View that is a member of Header.js file
*/

  function setHeader () {
			  	headerLabel.text=winTitle;
				headerView.add(headerLabel);
				leftBtn.title='Back';
				headerView.add(leftBtn);
				rightBtn.title='Save';
				headerView.add(rightBtn);
				//headerView.height = '50dp';
				RoomDimensionWin.add(headerView);
				}
	RoomDimensionWin.add(outerScrollview);			
	RoomDimensionWin.add(actInd);			
  return RoomDimensionWin;
}
module.exports=winOpen;