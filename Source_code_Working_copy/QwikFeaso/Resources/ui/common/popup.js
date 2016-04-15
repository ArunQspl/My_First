/**
 * @projectDescription QwikFeaso
 * 
 * @author vivek Gidmare(vivek.gidmare@quagnitia.com)
 * @version 1.0
 */


/*
   Function: Window for generating a popup while assigning the property with a summary
   
   @param {Object} win		Window object
   @return {Object}			Returns current window object
*/
function popup(createView,FeasibilityID){
	/*
  	 * Include the files needed for UI Design and Database usage
  	 * Header.js will manage navigation for android
  	 */
		Ti.include('/ui/common/Header.js');
		Ti.include('/services/GetFromDataBase.js')
		Ti.include('/ui/common/GenerateHTML.js');
		Ti.include('/services/ACSTransactions.js')
	
    var win = Ti.UI.createWindow({
        backgroundColor:Ti.Platform.osname =='android'?'#fff':'#0000',//gray
       
       navBarHidden:true,
        opacity : Ti.Platform.osname =='android'?0.7:0.9,
        id : "popup"
    });
    win.orientationModes = [Ti.UI.PORTRAIT];
 var rowHt=(Ti.Platform.displayCaps.platformHeight*15)/100;

var checkbox=[];
var check;
var maxCheck = 3;  
  var numChecked = 0;

 var AlertView=Ti.UI.createView({
 		width:'80%',
		height:'30%',
		backgroundGradient:{type:'linear',colors:['#6d6e6f','#595a5c'],startPoint:{x:0,y:0},endPoint:{x:0,y:500},backFillStart:false},
		
		borderRadius:5,
 		});
 		
 	
 
 var ListAlertView=Ti.UI.createView({
	 		width:'100%',
			height:'100%',
			backgroundGradient:{type:'linear',colors:['#6d6e6f','#595a5c'],startPoint:{x:0,y:0},endPoint:{x:0,y:500},backFillStart:false},
			visible:false,
 		});	
 
 
 		
var DialogLabel = Ti.UI.createLabel({
       text : '',
       color : '#fff',
       font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp',fontWeight:'bold'}
								 :{fontSize:'15%',fontWeight:'bold'},
       height : 'auto',
       width : '100%',
       top : '2%',
       textAlign:'center'
       
   }); 		
 		
 		
var CancelBtn=Ti.UI.createButton({
	style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
	height:'7%',
	width:'20%',
	font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'12%'}
								 :{fontSize:'17dp'},//
	left :Ti.Platform.osname == 'android'? '2%':'2%',
	backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
	borderRadius:5,
	title:'Cancel',
	color:'#fff',
	top:'1%'
	
});   

	var AddBtn = Ti.UI.createButton({
		height:'7%',
		width:'20%',
		font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
									 ?{fontSize:'12%'}
									 :{fontSize:'17dp'},
		right :Ti.Platform.osname == 'android'? '2%':'2%',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
		borderRadius:5,
		title:'Add',
		color:'#fff',
		top:'1%'
	}); 

  var whiteView=Ti.UI.createView({
   	backgroundColor:'white',
   	width:'100%',
   	height:'90%',
   	bottom:'0%'
   });
   
   ListAlertView.add(whiteView); 
 
 	var tableView=Ti.UI.createTableView({
   		width:'100%',
   		top:'0%',
  		scrollable:true,
  		backgroundColor:'#0000',
   	});
  	var EmptyListLabel = Ti.UI.createLabel({
       color : '#000',
       font:Ti.Platform.osname =='android' 
								 ?{fontSize:'25%',fontWeight:'normal'}
								 :{fontSize:'15%',fontWeight:'normal'},
       height : 'auto',
       width : '100%',
       textAlign:'center'	
       
   });
   whiteView.add(EmptyListLabel); 	
   	
   CancelBtn.addEventListener('click',function(e){
 		win.close();
 	});
 
 	
   if (createView == 'SaveAs') {
   		GetSaveSummaryView(); // For saving feasibility
   	}
   else
   if(createView == 'AddFeasibility')
   {
   		AlertView.setVisible(false);
		win.remove(AlertView);
		ListAlertView.setVisible(true);
	   	getFeasibilityListView(1);//for adding feasibility
   }
   else
   if(createView == 'CompareFeasibility')
   {
   		AlertView.setVisible(false);
		win.remove(AlertView);
		ListAlertView.setVisible(true);
	   	getFeasibilityListView(2);//for comparing feasibility
   	
   }
   
   		
   	function GetSaveSummaryView () {

	//view to accept name for summary
   		var label = Ti.UI.createLabel({
		text:'Save summary as?',
		width:'90%',
		height:'auto',
		textAlign:'center',
		top:'3%',
		color:'#fff',
		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp',fontWeight:'bold'}
								 :{fontSize:'18%',fontWeight:'bold'},
	});
	
	AlertView.add(label);
// Create a TextField.
	var SummaryName = Ti.UI.createTextField({
		height : '30%',
		top : '30%',
		width : '90%',
		hintText : 'Enter Name for Summary',
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		color:glblDarkGrayFont,
		backgroundColor:'#fff',
	    borderColor:glblLightGrayFont,
	    borderRadius:5,
	    borderWidth:1,
	    paddingLeft:Ti.Platform.osname !== 'android'?'5dp':'',
	});
	// Add to the parent view.
	AlertView.add(SummaryName);
	var cancel = Ti.UI.createButton({
		width:'30%',
		height:'20%',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		bottom:10,
		left:'55%',
		title:'Cancel',
		color:'white',
		backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
		borderRadius:5,	
	});
	cancel.addEventListener('click', function(e) {
		// simple reset animation
		
		win.close();
	});
	

	var ok = Ti.UI.createButton({
		width:'30%',
		height:'20%',
		 style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		  bottom:10,
		right:'55%',
		title:'OK',
		color:'white',
		backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
		borderRadius:5,	
	});
	ok.addEventListener('click', function(e) {
			if(SummaryName.value !='')
			{
				CompleteObtainedScenario(SummaryName.value);
				generateFinalSummary();
				Ti.Platform.osname == 'android'?Ti.App.QwikFeasoGlobalVars.summaryHasName =1:QwikFeasoGlobalVars.summaryHasName =1;
			    var calling = (Ti.Platform.osname == 'android' ? Ti.App.QwikFeasoGlobalVars.CalledFromPropDetails : QwikFeasoGlobalVars.CalledFromPropDetails );
			   
			   if(calling == 'true')
			   {
			   		win.close();
			   		var propId = Ti.Platform.osname== 'android'?Ti.App.QwikFeasoGlobalVars.SelectedPropertyID:QwikFeasoGlobalVars.SelectedPropertyID;
			   		var DBFeaso = Ti.Database.open('QwikFeaso');
					GetResultSet=DBFeaso.execute('SELECT max(ObtainedSceanrioID) ObtainedSceanrioID FROM ObtainedSceanrio where IsCompleted=?',1);
					while(GetResultSet.isValidRow())
					{
						var FeasibilityID =GetResultSet.fieldByName('ObtainedSceanrioID');
						GetResultSet.next();
					}
					GetResultSet.close();
					DBFeaso.close();
					
					var ISPresent = false;
					  ISPresent=AddScenarioToProperty(propId,FeasibilityID);		
						if(ISPresent == true)
						{	win.close();
							alert('Feasibility Already Added');
						}
						else
						{
							win.close();
							alert('Current Feasibility Added To Property.');
							Ti.App.fireEvent('RefreshView', {});
							
							if(Ti.Platform.osname == 'android')
  							{
								Ti.App.QwikFeasoGlobalVars.CalledFromPropDetails ='false';
								Ti.App.QwikFeasoGlobalVars.SelectedPropertyID = '';
							}
							else{
								QwikFeasoGlobalVars.CalledFromPropDetails ='false';
								QwikFeasoGlobalVars.SelectedPropertyID = '';
							}
						}
			   }
			   else
			   {
				   	AlertView.setVisible(false);
					win.remove(AlertView);
					ListAlertView.setVisible(true);
			   		getPropertView();
			   }
			   	
			
			}
			else
			{
				alert('Please Enter Name of Feasibility');
			}
	});
	
	AlertView.add(ok);
	AlertView.add(cancel);
	win.add(AlertView);
   }


   /**
    * Function will Display list of properties with name and address ,
    * after clicking particular property,latest created summary(Feasibility) will get added to that property 
    */
   function getPropertView () {
     //view to show list if Property;
   
   win.backgroundColor='white';

   DialogLabel.text='Select Property';
   
    	var tableView=Ti.UI.createTableView({
   		width:'100%',
   		top:'0%',
  		scrollable:true,
  		backgroundColor:'#0000',
   	});
   	
   // Add to the parent view.
   ListAlertView.add(DialogLabel);
   ListAlertView.add(CancelBtn);
   ListAlertView.add(AddBtn);
   
   
    AddBtn.addEventListener('click',function(e){
  	var OpenAddPropertyWin=require('ui/common/AddProperty');
		
		ListAlertView.setVisible(false);
		if (Ti.Platform.osname == 'android')
		{	
			Ti.App.QwikFeasoGlobalVars.CalledfromPopUp=1
			new OpenAddPropertyWin().open();
			Ti.App.QwikFeasoGlobalVars.NewPropertyPhoto='default';
			
		}
		else
		{
			
			QwikFeasoGlobalVars.CalledfromPopUp=1;
			navGroup.open(new OpenAddPropertyWin(),{animated: true});
			QwikFeasoGlobalVars.NewPropertyPhoto='default';
			
			
		}
		win.close();
	});	
   
   
   
   
   var TableDataList=[];
   	var Properties=[];
  Properties=getPropertiesList();
   
  
  if(Properties.length > 0)
   	{
   		for(var i=0;i<Properties.length;i++)
		   {
		   	var PropertyRow=Ti.UI.createTableViewRow(
					{
						width:'100%',
						height:rowHt,
						backgroundColor:'#fff',
						selectedBackgroundColor:'#fff',
						className:'dwellingRow',
						PropertyId:Properties[i].PropertyID,//DetailedDwellingList[i].DwellingID
						editable:false
					}); 
				var PropNamelabel=Ti.UI.createLabel(
					{
						left:'3%',
						text:Properties[i].Name,//DetailedDwellingList[i].DwellingName
						font:Ti.Platform.osname =='android' 
										 ?{fontSize:'16dp',fontWeight:'bold'}
										 :{fontSize:'15%',fontWeight:'bold'},
						color:glblGreenFont,
						touchEnabled:false,
						top:'5%',
				
					});
				var propertyAddrLabel=Ti.UI.createLabel(
					{
						left:'3%',
						width:'auto',
						
						text:Properties[i].Address,
						font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
										 ?{fontSize:'15%'}
										 :{fontSize:'16dp'},
						color:glblDarkGrayFont,
						touchEnabled:false,
						textAlign:'left',
						});
						
				PropertyRow.add(PropNamelabel);	
				PropertyRow.add(propertyAddrLabel);	
				TableDataList.push(PropertyRow);
		   	
		   }
		   tableView.data=TableDataList;
 
   	if (Ti.Platform.osname != 'android') {
   		tableView.footerTitle='';
   	};
		   
   		whiteView.add(tableView);
   	}
   	else
   	{
   		
   	EmptyListLabel.text='No Property has been created yet';
   	
   	}
   
   
    
   
   	
   	tableView.addEventListener('click',function(e)
	{
		var PropertyID=e.source.PropertyId;
		var DBFeaso = Ti.Database.open('QwikFeaso');
		GetResultSet=DBFeaso.execute('SELECT max(ObtainedSceanrioID) ObtainedSceanrioID FROM ObtainedSceanrio');
		while(GetResultSet.isValidRow())
		{
		var FeasibilityID =GetResultSet.fieldByName('ObtainedSceanrioID');
		GetResultSet.next();
		}
		GetResultSet.close();
		DBFeaso.close();
		
		var ISPresent = false;
		  ISPresent=AddScenarioToProperty(PropertyID,FeasibilityID);		
			if(ISPresent == true)
			{	win.close();
				alert('Feasibility Already Added');
			}
			else
			{
				win.close();
				alert('Current Feasibility Added To Property.');
			}
		
	 
	});	
   	
   	
   	
   	ListAlertView.add(whiteView);
   	win.add(ListAlertView);
   
   }
  
 //************************FeasibIlity List View to add feasibility in property********//
 
 /**
  * @param compareOrAdd{Integer} 1=Display Feasibility list only 
  * 							2=Display Feasibility list with checkbox 
  */
 function getFeasibilityListView (compareOrAdd) {
  	//view to show list if Property;
   win.backgroundColor='white';
      var TableDataList=[];
	var rowData=[];
	
	var lbl = Ti.UI.createLabel({
       text : '',
       color : '#fff',
       font:Ti.Platform.osname =='android' 
								 ?{fontSize:'20dp',fontWeight:'bold'}
								 :{fontSize:'15%',fontWeight:'bold'},
       height : 'auto',
       width : '60%',
       top : '2%',
       textAlign:'center'
       
   }); 
  
  var testBtn = Ti.UI.createButton({
      title : 'Compare',
      height:'7%',
	  width:'22%',
	  font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'12%'}
								 :{fontSize:'14dp'},
		right :'2%',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
		borderRadius:5,
		color:'#fff',
		top:'1%'
  });
  
  testBtn.addEventListener('click', function() {
  	var feasId = [];
			for (var i=0; i < TableDataList.length; i++) {
			 if(checkbox[i].selected)
			 {
			 	feasId.push(TableDataList[i].FeasibilityID);
			 }
			};
  	var html = '';
	
	if(feasId.length < 2)
		alert('Atleast two feasibilities must be selected');
	else
	{
		win.add(actvityIndicatorView);
		actInd.show();
		
		html = generateComparisonSummaryHTMLDoc(feasId);
		
		
		if(html !== '')
		{
			
			var path =  (Ti.Platform.osname == 'android' ? Ti.Filesystem.externalStorageDirectory : Ti.Filesystem.applicationDataDirectory );
				var textFile = Titanium.Filesystem.getFile(path, 'SampleText.txt');
				textFile.write(html);	
				textFile.rename('DemoHTML.html');
				var GetPDFSummary=require('ui/common/ShowComparisonSummary');
				if(Ti.Platform.osname == 'android')
			  	{
			  		new GetPDFSummary(html).open();
			  	}
			  	else
			  	{
			  		navGroup.open(new GetPDFSummary(html),{animated: true});
			  	}
			 win.close();
			
		}
		
	}	
	
	actInd.hide();
	win.remove(actvityIndicatorView);
	
	
  });
  
   
    if (compareOrAdd === 1)
    {
    	DialogLabel.text='Select Feasibility';
    	TableDataList=GetFeasibilityListForProperty();//
    	ListAlertView.add(DialogLabel);
  	}		
   else
   {
   	tableView.top = '10%';
   	var rowHt=(Ti.Platform.displayCaps.platformHeight*10)/100;
   	var selView = Ti.UI.createView({
   		width:'100%',
   		height:rowHt,
   		backgroundColor:'#fff',
   		top:'0%'
   	});
   	
   	var selAll = Ti.UI.createLabel({
   		left:'55%',
   		width:'auto',
   		height:'auto',
   		text:'Select All',
   	});
   	
   	check = Ti.UI.createView({  
            width:Ti.Platform.osname=='android'?'40dp':'30dp',  
            height:Ti.Platform.osname=='android'?'40dp':'30dp',  
            backgroundImage:globalImgPath+'uncheck.png',//check.png
            selected:false,          
            right:'5%',
        });
    check.addEventListener('singletap',selectAll);    
   	selView.add(selAll);
   	selView.add(check);
   	whiteView.add(selView);
   	
	   	lbl.text='Compare Results';
	   	ListAlertView.add(lbl);
	   	// Add to the parent view.
	   	ListAlertView.add(testBtn);
	 	TableDataList=FeasibilityListToCompare();
   }
   			
   	// Add to the parent view.
   
   ListAlertView.add(CancelBtn);
   
  var rowHt=(Ti.Platform.displayCaps.platformHeight*10)/100;
    for(var i=0;i < TableDataList.length;i++)
    {
    	var propertyFeasibilityRow=Ti.UI.createTableViewRow({
			backgroundColor:'#fff',
			height:rowHt,
			className:'Feasibility',
			rowID:TableDataList[i].FeasibilityID,
			selectedBackgroundColor:'#fff',
			editable:false
		});
				
	var feasibilityNameLabel=Ti.UI.createLabel(
			{
				left:'15dp',touchEnabled:false,
				right:Ti.Platform.osname=='android'?'40dp':'30dp', 
				text:TableDataList[i].Name,
				font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'20%',fontWeight:'bold'}
								 :{fontSize:'20dp',fontWeight:'bold'},
				color:glblDarkGrayFont,
				textAlign:'left',
			});
	propertyFeasibilityRow.add(feasibilityNameLabel);
    	
    if (compareOrAdd === 2) {
    	 var isDef=0;
    	
    	if(isDef == 1)
  	 		numChecked = numChecked+1;
    	
			//Add checkBox to select feasibility for comparison
			checkbox[i] = Ti.UI.createView({  
            width:Ti.Platform.osname=='android'?'40dp':'30dp',  
            height:Ti.Platform.osname=='android'?'40dp':'30dp',  
            backgroundImage:isDef == 1?globalImgPath+'check.png':globalImgPath+'uncheck.png',//check.png
            selected:isDef == 1?true:false,          
            right:'15dp'
            
        });  
		checkbox[i].addEventListener('singletap',feasibilityListClicked);
		propertyFeasibilityRow.add(checkbox[i]);
		}	
    	
      	
    rowData.push(propertyFeasibilityRow)		
    }
    
   tableView.data=rowData;
 
   	if (Ti.Platform.osname != 'android') {
   		tableView.footerTitle='';
   	};
   tableView.addEventListener('click',function(e)
	{
	 var FeasibilityID= e.source.rowID;

		 if (createView == 'AddFeasibility') 
		 {
			var ISPresent = false;
			ISPresent=AddScenarioToProperty(Ti.Platform.osname== 'android'?Ti.App.QwikFeasoGlobalVars.SelectedPropertyID:QwikFeasoGlobalVars.SelectedPropertyID,FeasibilityID);		
			if(ISPresent == true)
			{
				win.close();
				alert('Feasibility Already Added');
			}
			else
			{
				Ti.App.fireEvent('RefreshView', {
									  myCustomEventValue: 'someValue'
									});
				win.close();
			}
		
		}
		else
		{
			//win.close();
		}
	
	});	
	
	if(TableDataList.length > 0)
   	{
   		whiteView.add(tableView);
   	}
   	else
   	{
   		
   	EmptyListLabel.text='No Feasibility has been created yet';
   	
   	}
   	
   	ListAlertView.add(whiteView);
   	win.add(ListAlertView);
   }
   
   function selectAll (e) {
   	
   	if(e.source.selected)
   	{
   		e.source.selected =false;
		e.source.backgroundImage=globalImgPath+'uncheck.png';
		
		for(var i=0;i<checkbox.length;i++)
		{
			Ti.API.info('status of checkboxes : '+checkbox[i].selected);
			checkbox[i].selected = false;
			checkbox[i].backgroundImage = globalImgPath+'uncheck.png';
		}
   	}
   	else
   	{
   		
   		e.source.selected =true;
		e.source.backgroundImage=globalImgPath+'check.png';
		
   		for(var i=0;i<checkbox.length;i++)
		{
			Ti.API.info('status of checkboxes : '+checkbox[i].selected);
			checkbox[i].selected = true;
			checkbox[i].backgroundImage = globalImgPath+'check.png';
		}	
   	}
    
   }
 
			 
function feasibilityListClicked (e) {
	/*
	 * Logic of generating alert if more than two feasibility selected for comparison, and resetting checkbox to the 
	 * selected img
	 */
				if(e.source.selected)
				{
					
					e.source.selected =false;
					e.source.backgroundImage=globalImgPath+'uncheck.png';
					numChecked -=1;
					check.selected = false;
					check.backgroundImage=globalImgPath+'uncheck.png';
				}
				else
				{
					e.source.selected = true;
					e.source.backgroundImage =globalImgPath+'check.png';
					numChecked +=1;
					Ti.API.info('numChecked1:'+numChecked);
					Ti.API.info('check len:'+checkbox.length);
					if(numChecked == checkbox.length)
					{
						check.selected = true;
						check.backgroundImage=globalImgPath+'check.png';
					}
				}
			  
			}
 
	win.add(actInd);
   return win;
}

module.exports = popup;