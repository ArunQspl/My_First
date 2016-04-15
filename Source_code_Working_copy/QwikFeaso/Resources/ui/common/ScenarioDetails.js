
/**
 * @projectDescription QwikFeaso
 * 
 * @author vivek Gidmare vivek.gidmare@quagnitia.com
 * @version 1.0
 */

/**
 *Function will create ScenarioDetails Window for 
 *accepting values for different cost elements from user
 * 
 * ScenarioName  name of scenarios which is last clicked by user
 * 
 * FeasibilityID keep track for generating summary which starts after clicking one of he scenario
 */
function OpenScenarioDetailsWin (ScenarioName,FeasibilityID) 
{
var scenarioDetailsWindow;
var globalName=null;
var accounting;
var CostGroupsList=[];
var CostElementList=[];
var OptDialog;
var rowInputTextField=[];
var dwellingQuantityTextField=[];
var buildCostTextField=[];
var inputBtn=[];
var scrollView=null;
var addDwellingBtn=null;
var MyCostElementsList=[];
var checkbox = [];
var unSelectedOptionalConstCost=[];
var dwellingsCnt = 0;
var cnt = 0;
var dwellingsRowCnt = 0;
var rowHt=(Ti.Platform.displayCaps.platformHeight*13)/100;
var sectionRowHt=(Ti.Platform.displayCaps.platformHeight*7)/100;
var lotSizeTxt = [];
var quantityTxt = [];
var spTxt = [];
var rowCntDwel = 0;
var rowCntVL = 0;
var UserValue=[];
var DwellingDArray=[];
var VacantLandArray=[];
if(Ti.Platform.osname == 'android')
  {
  	/*
  	 * Include the files needed for UI Design and Database usage
  	 * Header.js will manage navigation for android
  	 * 
  	 */
  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
  	accounting=require('/lib/accounting');//include this .js for formating cost into dollar format
  	Ti.include('/services/DataBaseTransaction.js')
  	Ti.include('/services/GetFromDataBase.js')
  	Ti.include('/services/TempDBTransaction.js')	
  	Ti.include('/services/CachingData.js');
  	globalName=Ti.App.QwikFeasoGlobalVars;
  	
  	//Window Created for Android
  	scenarioDetailsWindow=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	 setHeader(); 		
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
	 	//clear scenario track obtained in  ObtainScenarios(FeasoTrack,FeasibilityID);
	 	//where IsCompleted==0 
	 	//ClearUserAddedDwelling();
		ClearInCompletObtainedScenario();//as summary is on generated and not saved
	 	scenarioDetailsWindow.close();
	 	clearProperties();
	 	//DeleteScenarioDetailePage();
	 });
	 	
	 rightBtn.addEventListener('singletap',function(e){
		btnSelector(rightBtn);
		clearProperties();
		scenarioDetailsWindow.add(actvityIndicatorView);
		actInd.show();
		var FeasoTrack=Ti.App.QwikFeasoGlobalVars.feasoTrack;			
		ObtainScenarios(FeasoTrack,FeasibilityID);
		//getUserData();
		var isEmpty =getUserInputValues();
		if(isEmpty){
			alert('Some Required data is missing, please update and try again');
			actInd.hide();
			scenarioDetailsWindow.remove(actvityIndicatorView);
			return;
		}
		else{
			proceedToCalculate();
			actInd.hide();
			scenarioDetailsWindow.remove(actvityIndicatorView);
		}
		
		
	});
	//scenarioDetailsWindow.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;		
	scenarioDetailsWindow.windowSoftInputMode=Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
 }
  else
  {
  	accounting=require('lib/accounting');//include this .js for formating cost into dollar format
  	globalName=QwikFeasoGlobalVars;
		  	//Window Created for iphone to suport navigation Bar
		  	scenarioDetailsWindow=Ti.UI.createWindow({
		  	backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			title:'QwikFeaso',//globalName.feasoName
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
		 	clearProperties();  
		 	//DeleteScenarioDetailePage();
		   //ClearUserAddedDwelling();
		    ClearInCompletObtainedScenario();
		    navGroup.close(scenarioDetailsWindow,{animated: true});
		  });
  	  lftNavView.add(BackBtn);
	  scenarioDetailsWindow.leftNavButton=lftNavView;
	  var rightView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					backgroundColor:'#0000',
					layout:'horizontal'
				});
		  var RightBtn = Ti.UI.createButton({
			      title : 'Summary',
			      height : '30dp',
			      width : '80dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			  });
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);
		  	clearProperties();
		  	scenarioDetailsWindow.add(actvityIndicatorView);
		  	actInd.show();
		  	var FeasoTrack=QwikFeasoGlobalVars.feasoTrack;			
		   ObtainScenarios(FeasoTrack,FeasibilityID);
			//getUserData();
			var isEmpty = getUserInputValues();
			if(isEmpty){
				alert('Some Required data is missing, please update and try again');
				actInd.hide();
				scenarioDetailsWindow.remove(actvityIndicatorView);
				return;
			}
			else{
				
				proceedToCalculate();
				scenarioDetailsWindow.remove(actvityIndicatorView);
				actInd.hide();
			}
			
		  });
		  rightView.add(RightBtn);
		  scenarioDetailsWindow.rightNavButton=rightView;
		  var subHeaderView=Ti.UI.createView(
				{
				width:'100%',
				height:'14%',
				top:'0%',
				backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
				});
			var subHeaderTextLabel = Ti.UI.createLabel({
				text : 'Development  Strategy: '+ScenarioName,
				color : '#fff',
				font:{fontSize:'15%',fontWeight:'bold'},
				left : '5%',
				textAlign : 'left',
				height:Ti.UI.Fill,
				});	
			subHeaderView.add(subHeaderTextLabel);
			scenarioDetailsWindow.add(subHeaderView);
	}
	
	
	var indicator = Titanium.UI.createActivityIndicator(
	{
	  color: glblGreenFont,
	  //style:(Ti.Platform.osname === 'android' ? Ti.UI.ActivityIndicatorStyle.BIG_DARK : Ti.UI.iPhone.ActivityIndicatorStyle.DARK),
	  style:Ti.Platform.osname === 'android'?'':Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
	 
	  top:Ti.Platform.osname ==='android'?'36%':'40%',
	  left:'38%',
	  height:'auto',
	  width:'auto',
	  message:' Loading...',
	  zIndex : 10,
	  //font: {fontFamily:'Helvetica Neue', fontSize:23, fontWeight:'bold'},
	  font:Ti.Platform.osname ==='android' 
	  							 ?{fontSize:23,fontWeight:'bold'}
								 :{fontSize:13,fontWeight:'bold'},
	 });
	
	
function clearProperties () {
	
	for(var j=0;j< CostGroupsList.length;j++){
		
		for(var i=0;i<MyCostElementsList.length;i++){
			
			if(CostGroupsList[j].CostGroupingID == MyCostElementsList[i].CostGroupingID){
				if(MyCostElementsList[i].CostGroupingID === 16 || MyCostElementsList[i].CostGroupingID === 17){
					Ti.App.Properties.removeProperty('DWELBC'+MyCostElementsList[i].Rowid);
					Ti.App.Properties.removeProperty('DWELQTY'+MyCostElementsList[i].Rowid);
					Ti.App.Properties.removeProperty('DWELSP'+MyCostElementsList[i].Rowid);
				}
				else if(MyCostElementsList[i].CostGroupingID === 8){
					Ti.App.Properties.removeProperty('CECHECK'+checkbox[i].checkboxCostRowid);
				}
				else{
					Ti.App.Properties.removeProperty('CEEDT'+MyCostElementsList[i].CostElementID);
				}
			}	
		}
		
	}
	
	
}	
	
function proceedToCalculate () {
	
	/*Ti.API.info('user vals : '+UserValue.length);
	Ti.API.info('dwelling vals : '+DwellingDArray.length);
	Ti.API.info('vacant land vals : '+VacantLandArray.length);*/
	
	CreateResultDB(unSelectedOptionalConstCost);
	InsertDwellingDetails(DwellingDArray);
	InsertVacantLandDetails(VacantLandArray);
	InsertFeasoInputValue(UserValue);
	ValuesUsingForCalculation(unSelectedOptionalConstCost);
	SetFundingCostresult();
	//DeleteScenarioDetailePage();							
	/**
	* after doing all calculation and database entries open summary screen 
	* to show summary generated using entered values
	* 
	*/
	if (Ti.Platform.osname == 'android') 
	{
		var OpenSummaryWin=require('ui/common/summary');
		new OpenSummaryWin(unSelectedOptionalConstCost).open();
		scenarioDetailsWindow.close();
	}
	else
	{
		var OpenSummaryWin=require('ui/common/summary');
		navGroup.open(new OpenSummaryWin(unSelectedOptionalConstCost),{animated: true});
		navGroup.close(scenarioDetailsWindow,{animated: false});
	}
  
}

function getUserInputValues () {
	
	var usrVal;
	for(var j=0;j< CostGroupsList.length;j++){
		for(var i = 0; i <MyCostElementsList.length; i++){
			
			if(CostGroupsList[j].CostGroupingID == MyCostElementsList[i].CostGroupingID){
				if(MyCostElementsList[i].HasButton == 1)
				{ // label of button
					//Ti.API.info('getting values on buttons : '+MyCostElementsList[i].Name,inputBtn[i].title);
					usrVal = inputBtn[i].title;
					
					if(usrVal === 'click'){
						return true;
					}
					else{
						UserValue.push({
							cgId:CostGroupsList[j].CostGroupingID,
							ceID:MyCostElementsList[i].CostElementID,
							value:usrVal					     					
						});
					}
				}
				else if(MyCostElementsList[i].CostGroupingID == 16){ //values for dwelling like quantity ,sales price etc
					//Ti.API.info('getting dwelling values : '+lotSizeTxt[i].value+' '+quantityTxt[i].value+' '+spTxt[i].value);
					var bc = lotSizeTxt[i].value;
					var qty = quantityTxt[i].value;
					var sp = spTxt[i].value;
					
					if(bc === '' || qty === '' || sp === ''){
						if(bc === ''){
							lotSizeTxt[i].backgroundColor = 'red';
							lotSizeTxt[i].focus();
						}
						else
						if(qty === ''){
							quantityTxt[i].backgroundColor = 'red';
							quantityTxt[i].focus();
						}
						else
						if(sp === ''){
							spTxt[i].backgroundColor = 'red';
							spTxt[i].focus();
						}
						return true;
					}
					else{
						
						bc = bc.replace(/[^a-zA-Z 0-9]+/g,'');
						sp = sp.replace(/[^a-zA-Z 0-9]+/g,'');
					
						DwellingDArray.push({
							DwellingID:MyCostElementsList[i].CostElementID,
							Quantity:qty,	
							SalesPrice:sp,
							BuildCost:bc
						});
					}
				}
				else if(MyCostElementsList[i].CostGroupingID == 17){
					//Ti.API.info('getting vacant land values : '+lotSizeTxt[i].value+' '+quantityTxt[i].value+' '+spTxt[i].value);
					var ls = lotSizeTxt[i].value;
					var qty = quantityTxt[i].value;
					var sp = spTxt[i].value;
					if(ls === '' || qty === '' || sp === ''){
						if(ls === ''){
							lotSizeTxt[i].backgroundColor = 'red';
							lotSizeTxt[i].focus();
						}
						else
						if(qty === ''){
							quantityTxt[i].backgroundColor = 'red';
							quantityTxt[i].focus();
						}
						else
						if(sp === ''){
							spTxt[i].backgroundColor = 'red';
							spTxt[i].focus();
						}
						return true;
					}
					else{
						
						ls = ls.replace(/[^a-zA-Z 0-9]+/g,'');
						sp = sp.replace(/[^a-zA-Z 0-9]+/g,'');
					
						VacantLandArray.push({
							VacantLandID:MyCostElementsList[i].CostElementID,
							Quantity:qty,	
							SalesPrice:sp,
							LotSize:ls
						});
					}
				}
				else{
					//Ti.API.info('ceid : validation : value  '+MyCostElementsList[i].CostElementID+' : '+MyCostElementsList[i].Validation+' : '+rowInputTextField[i].value);
					if(MyCostElementsList[i].HasUnitSign == '$')
							usrVal=rowInputTextField[i].value.replace(/[^a-zA-Z 0-9]+/g,'');//will remove special character from String like ,
					else
							usrVal=rowInputTextField[i].value;
					/*
					 * check whether the field requires validation
					 * if validation = 1 then do validate
					 */
					if(MyCostElementsList[i].Validation == 1 && usrVal === ''){
						rowInputTextField[i].backgroundColor = 'red';
						rowInputTextField[i].focus();
						return true;
					}
					else{
						
						if(usrVal === ''){
							usrVal = 0;
						}
						if(CostGroupsList[j].CostGroupingID === 8 && checkbox[i].selected)
							{
								UserValue.push({
									
									cgId:CostGroupsList[j].CostGroupingID,
									ceID:MyCostElementsList[i].CostElementID,
									value:usrVal					     					
								});
							}
							else
							{
								if(CostGroupsList[j].CostGroupingID === 8)
								{
									unSelectedOptionalConstCost.push(MyCostElementsList[i].CostElementID);
								}
													
								if(CostGroupsList[j].CostGroupingID !== 8)
									UserValue.push({
										cgId:CostGroupsList[j].CostGroupingID,
										ceID:MyCostElementsList[i].CostElementID,
										value:usrVal					     					
									});
							}
						
					}
					
					
				}
				
			}
		}
	}		
  
}
	
scenarioDetailsWindow.orientationModes=[Ti.UI.PORTRAIT];
scenarioDetailsWindow.addEventListener('open', function (e) {
	scenarioDetailsWindow.add(actvityIndicatorView);
	actInd.show();
   		setTimeout(function(){
   						
 						if(globalName.feasoTrack == 'q')
							{
								CostGroupsList=getCostGroupsList(10);
								CostElementList=getCostElemetsList(10);
							}
							else
							{
								CostGroupsList=getCostGroupsList(01);
								CostElementList=getCostElemetsList(01);
							}		
							CreateScenarioDetailsPage(CostElementList);
							MyCostElementsList=getScenarioDetailePage();
 							PopulateScrollView();
 							actInd.hide();
 							scenarioDetailsWindow.remove(actvityIndicatorView);
  						}, 100);
});

scenarioDetailsWindow.addEventListener('focus',function(e){
			
	if (Ti.Platform.osname == 'android') 
	{
		if(Ti.App.QwikFeasoGlobalVars.AddDwelling==1)
		{
			scenarioDetailsWindow.add(actvityIndicatorView);
			actInd.show();
			
			setTimeout(function(){
				MyCostElementsList=getScenarioDetailePage();
				scenarioDetailsWindow.remove(scrollView);
				scrollView=null;
				//addDwellingBtn=null;
				PopulateScrollView();
				//Ti.App.QwikFeasoGlobalVars.feasoTrack == 'q'?scrollView.setContentOffset({x:0,y:300}):scrollView.setContentOffset({x:0,y:100*28});
				scroll('dwellings');
				actInd.hide();
 				scenarioDetailsWindow.remove(actvityIndicatorView);
			},1000);
			
		}
		Ti.App.QwikFeasoGlobalVars.AddDwelling=0;
	}
	else
	{
		if(QwikFeasoGlobalVars.AddDwelling==1)
		{
			scenarioDetailsWindow.add(actvityIndicatorView);
			actInd.show();
			
			setTimeout(function(){
				MyCostElementsList=getScenarioDetailePage();
				scenarioDetailsWindow.remove(scrollView);
				scrollView=null;
				//addDwellingBtn=null;
				PopulateScrollView();
				//QwikFeasoGlobalVars.feasoTrack == 'q'?scrollView.scrollTo(0,100*2):scrollView.scrollTo(0,100*17);	
				scroll('dwellings');
				actInd.hide();
 				scenarioDetailsWindow.remove(actvityIndicatorView);
			},1000);
			
		}
		QwikFeasoGlobalVars.AddDwelling=0;
	}
	
});

function scroll (For) {
	
	if (Ti.Platform.osname == 'android'){
		var difference = Math.round((75 * Titanium.Platform.displayCaps.dpi)/160);
		//var addition = pxToDp(10);
		//addition = 0;
		var offset;
		if(For === 'dwellings'){
			offset = (rowCntDwel*rowHt)+(4*sectionRowHt)+(viewSubHeader.rect.height-difference);
			
		}
		else if(For === 'vacant land'){
			offset = ((rowCntDwel+rowCntVL)*rowHt)+(4*sectionRowHt)+(viewSubHeader.rect.height-difference);
			
		}
		scrollView.setContentOffset({x:0,y:offset});
		//Ti.API.info('offset : '+offset);
	}
	else{
		var offset;
		//var addition = pxToDp(10);
		//addition = 0;
		if(For === 'dwellings'){
			offset = (rowCntDwel*rowHt)+(4*sectionRowHt)+viewSubHeader.rect.height;
			//Ti.API.info('rowCntDwel : '+rowCntDwel);
		}
		else if(For === 'vacant land'){
			offset = ((rowCntDwel+rowCntVL)*rowHt)+(4*sectionRowHt)+viewSubHeader.rect.height;
			//Ti.API.info('rowCntDwel+rowCntVL : '+rowCntDwel+' '+rowCntVL);
		}
		scrollView.scrollTo(0,offset);
		//Ti.API.info('offset : '+offset);
	}
  
}

var rowData=[];
var tableData=[];
var data=[];
var row;
var rowLabel;
var OptionArray=[
				{srN0:1,cgID:16,ceID:30,Name:'Build Quality',option:'Basic',optionNo:1},{srN0:2,cgID:16,ceID:30,Name:'Build Quality',option:'Standard',optionNo:2},{srN0:3,cgID:16,ceID:30,Name:'Build Quality',option:'High',optionNo:3},
				{srN0:4,cgID:16,ceID:31,Name:'Build Difficulty',option:'Easy',optionNo:1},{srN0:5,cgID:16,ceID:31,Name:'Build Difficulty',option:'Hard',optionNo:2},{srN0:6,cgID:16,ceID:31,Name:'Build Difficulty',option:'Medium',optionNo:3},
				
				{srN0:7,cgID:16,ceID:70,Name:'Fitout Quality',option:'None',optionNo:1},{srN0:8,cgID:16,ceID:70,Name:'Fitout Quality',option:'Basic',optionNo:2},{srN0:9,cgID:16,ceID:70,Name:'Fitout Quality',option:'Standard',optionNo:3},
				{srN0:10,cgID:16,ceID:70,Name:'Fitout Quality',option:'High',optionNo:4},{srN0:11,cgID:16,ceID:70,Name:'Fitout Quality',option:'Premiun',optionNo:5},
				
				{srN0:12,cgID:13,ceID:64,Name:'Type of Loan',option:'Interest Only',optionNo:2},{srN0:13,cgID:13,ceID:64,Name:'Type of Loan',option:'P&I',optionNo:3},
				
				{srN0:14,cgID:13,ceID:66,Name:'Repayments (Every?)',option:'Year',optionNo:2},{srN0:15,cgID:13,ceID:66,Name:'Repayments (Every?)',option:'Month',optionNo:3},
				{srN0:16,cgID:13,ceID:66,Name:'Repayments (Every?)',option:'Fortnight',optionNo:4},
				{srN0:17,cgID:13,ceID:66,Name:'Repayments (Every?)',option:'Week',optionNo:5},
				
				{srN0:18,cgID:13,ceID:68,Name:'When is First Payment made?',option:'Start of period',optionNo:2},{srN0:19,cgID:13,ceID:68,Name:'When is First Payment made?',option:'End of period',optionNo:1}
				
				];
/*
 * @param i = Count of cost element
 * @param j = Cost group id
 */				
function buildRow (i,j) {
	
	row = Ti.UI.createView({
               backgroundColor: 'white',
               borderColor: '#bbb',
               borderWidth: 1,
               width:'100%', 
               height: rowHt,
               top: 0, left: 0,
               id:'i'+i,
               rowID:''+MyCostElementsList[i].CostElementID
              
   	});
   	
   	// if j = 16 then its a dwelling
   	// if j = 17 then its a vacant land
   	
   	if(j == 16){
   		drawDwellingRow(row,i);
   		return row;
   	}
   	else if(j == 17){
   		drawVacantLandRow(row,i);
   		return row;
   	}
   	else{
   		
   		//Ti.API.info('Cost elements : '+MyCostElementsList[i].CostElementID+' '+MyCostElementsList[i].Name+' '+MyCostElementsList[i].HasButton+' '+MyCostElementsList[i].Validation);
   		
   		if(j<6){
   			rowCntDwel++;
   		}
   		
   		var label = MyCostElementsList[i].Name;
   		
   		//Ti.API.info('CostElementID : '+MyCostElementsList[i].CostElementID);
   		/*
   		 * Change label if current cost element is 'Holding Cost' or 'Rental income during construction'
   		 */
   		if(MyCostElementsList[i].CostElementID == 4){
   			label = label + ' (per month)';
   		} 
   		else if(MyCostElementsList[i].CostElementID == 8){
   			label = label + ' (per month)';
   		} 
   		
   			
   		
   		//Ti.API.info('no of rows : '+rowCntDwel);
   		rowLabel=Ti.UI.createLabel({
           		width:'60%',
           		//text:''+MyCostElementsList[i].Name,
           		text:label,
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'17%'},
           		left:'3%',
           		color:glblDarkGrayFont,//'#6E7B8B',
           		
           		touchEnabled:false
           	});
		
		var defVal = '';
       	defVal =	getDefaultValue(MyCostElementsList[i].CostElementID);
          		
        var userVal = 0;
        userVal = Ti.App.Properties.getString('CEEDT'+MyCostElementsList[i].CostElementID);	
        
        //Ti.API.info('getting user vals1 : '+userVal);
        
         if(MyCostElementsList[i].HasUnitSign == '$'){
         	if(userVal != null){
        		userVal=accounting.formatMoney(userVal);
       		} 
        	else{
        		defVal=accounting.formatMoney(defVal);
        		if(defVal == 0){
        			defVal = '';
				}
       		 }
         	
         }
         
         //Ti.API.info('getting user vals2 : '+userVal);
        	
        rowInputTextField[i] = Ti.UI.createTextField({
             keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
             right: '7%',
             width: '25%', 
             TfCostElementId:''+MyCostElementsList[i].CostElementID,
             TfCostGroupID:''+MyCostElementsList[i].CostGroupingID,		
             height: '55%', 
             paddingRight:Ti.Platform.osname =='android'?'0%':'5%',
             color:glblDarkGrayFont,
             font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
			 backgroundColor:'#fff',
             			borderColor:glblLightGrayFont,
             			borderRadius:5,
             			borderWidth:1,
             			textAlign:Ti.Platform.osname == 'android'?'right':'right',
        	 value:userVal === null?defVal:userVal,
        	 //value:defVal,
             });
             
       /* if(Ti.Platform.osname == 'android')    
        	rowInputTextField.softKeyboardOnFocus= Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;	*/
          
          rowInputTextField[i].addEventListener('change',function(e){
          	rowInputTextField[i].backgroundColor='#fff';
          	//Ti.API.info('setting user val : '+rowInputTextField[i].value);
          	Ti.App.Properties.setString('CEEDT'+MyCostElementsList[i].CostElementID, rowInputTextField[i].value);
          });
          
        rowInputTextField[i].addEventListener('focus', function (e){
			rowInputTextField[i].borderWidth = 3;
		});  
				
	    
          rowInputTextField[i].addEventListener('blur',function(e){
          	rowInputTextField[i].borderWidth = 1;
          	if(MyCostElementsList[i].HasUnitSign == '$')
          	{
          			rowInputTextField[i].value=accounting.formatMoney(rowInputTextField[i].value);
          	}
          });
          
          if(MyCostElementsList[i].CostElementID == 70){
        	
        	rowInputTextField[i].value = dwellingsCnt;
        	dwellingsCnt = 0;
        }
        /******/	
				
			if(MyCostElementsList[i].HasUnitSign != '')
			{
				var unitLabel=Ti.UI.createLabel(
					{
						width:'10%',
						right:'32%',
						textAlign:'right',
						font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
						text:''+MyCostElementsList[i].HasUnitSign,
						color:glblDarkGrayFont
					});
					
				if(MyCostElementsList[i].CostGroupingID == 8)	
				{
					if(Ti.Platform.osname == 'android')
	  				{
	  					unitLabel.right = '42%';
	  				}
	  				else
	  				{
	  					unitLabel.right = '47%';
	  				}
				}	
						
					
				if(MyCostElementsList[i].HasUnitSign == '%'||MyCostElementsList[i].HasUnitSign == 'm2')
					unitLabel.right='1%';
				else
					if(MyCostElementsList[i].CrossImage == 1)	
					{
						unitLabel.right='30%';
						unitLabel.bottom='15%';
						
						var unitLabel2=Ti.UI.createLabel(
							{
							width:'10%',
							left:'10%',
							bottom:'15%',
							textAlign:'right',
							font:Ti.Platform.osname =='android' 
									 ?{fontSize:'14dp'}
									 :{fontSize:'12%'},
							text:'$',
							color:glblDarkGrayFont
							});
						
						if(globalName.feasoTrack == 'd')
								row.add(unitLabel2);
						
					}
						
					
				row.add(unitLabel);	
			}
			if(MyCostElementsList[i].HasButton == 1)
			{
				inputBtn[i]=Ti.UI.createButton(
					{
						right: '6%',//7
             			width: '25%', 
             			height: '55%', 
             			title:defVal,
             			style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
             			backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
						borderColor:Ti.Platform.osname =='android'?glblLightGrayFont:'white',
             			borderRadius:Ti.Platform.osname =='android'?5:5,
             			borderWidth:Ti.Platform.osname =='android'?1:1,
             			font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
						textAlign:'center',
						color:'#fff',
						BtnCostElementId:''+MyCostElementsList[i].CostElementID,
             			BtnCostGroupID:''+MyCostElementsList[i].CostGroupingID,	
             		});
					
				row.add(inputBtn[i]);
				
//============Option Dialog=============
				inputBtn[i].addEventListener('click',function(e)
				{
					var costGpId=e.source.BtnCostGroupID;
					var costElementID=e.source.BtnCostElementId;
					var option=[];
					var lastSelectedTitle=e.source.title;
					var Title;
					for(var i=0;i<OptionArray.length;i++)
					{
						if(OptionArray[i].cgID ==costGpId && OptionArray[i].ceID== costElementID)
						{
							Title=OptionArray[i].Name;
							option.push(OptionArray[i].option);
						}
					}
					OptDialog=CreateOptionDialog(Title,option);
					OptDialog.show();
					
					OptDialog.addEventListener('click',function(opt){
					try {
						    e.source.title=opt.source.options[opt.index].toString();
						}
						 catch (ex) {
					    		var exp = ex.javaException;
					   			e.source.title=lastSelectedTitle;
					   			
						}
					});
				});
			}
			else
			{
				if(MyCostElementsList[i].CostElementID != 0)
		     		row.add(rowInputTextField[i]);	
			}
			
			if(MyCostElementsList[i].CostGroupingID == 8)
			{
				checkbox[i] = Ti.UI.createView({  
					  			checkboxCostElementId:''+MyCostElementsList[i].CostElementID,
             					checkboxCostGroupID:''+MyCostElementsList[i].CostGroupingID,
             					checkboxCostRowid:''+MyCostElementsList[i].Rowid,	
					            width:Ti.Platform.osname=='android'?'40dp':'30dp',  
					            height:Ti.Platform.osname=='android'?'40dp':'30dp',  
					            backgroundImage:globalImgPath+'uncheck.png',//check.png
					            selected:false,          
            				    left:Ti.Platform.osname == 'android'?'80%':'85%',

					        });  
				row.add(checkbox[i]);
				setCheckboxStatus(i);
				checkbox[i].addEventListener('singletap',optionalConstructionCostClicked);  
				if(Ti.Platform.osname == 'android')
  				{
					rowInputTextField[i].width = '20%';
					rowInputTextField[i].height = '58%';
					rowInputTextField[i].left = '58%';
				}
				else
				{
					rowInputTextField[i].width = '20%';
					rowInputTextField[i].height = '58%';
					rowInputTextField[i].left = '53%';
				}
			}
			
			row.add(rowLabel);
            
            return row;

   		
   	}
	
  
}				

function setCheckboxStatus (i) {
	
	var checked = Ti.App.Properties.getBool('CECHECK'+checkbox[i].checkboxCostRowid);
	
	if(checked == true){
		checkbox[i].selected =true;
		checkbox[i].backgroundImage=globalImgPath+'check.png';
	}
	else if(checked == false){
		checkbox[i].selected =false;
		checkbox[i].backgroundImage=globalImgPath+'uncheck.png';
	}
  
}
 
 function drawVacantLandRow (view,i) {
 	
 	var cachedBC = Ti.App.Properties.getString('DWELBC'+MyCostElementsList[i].Rowid);
 	var cachedQTY = Ti.App.Properties.getString('DWELQTY'+MyCostElementsList[i].Rowid);
 	var cachedSP = Ti.App.Properties.getString('DWELSP'+MyCostElementsList[i].Rowid);
 	var bc,qty,sp;
 	
 	if(cachedBC != null){
 		bc = accounting.formatMoney(cachedBC);
 		
 	}
 	else{
 		//bc = accounting.formatMoney(MyCostElementsList[i].DefaultValue);
 		bc = '';
 	}
 	
 	if(cachedQTY != null){
 		qty = cachedQTY;
 		
 	}
 	else{
 		qty = '';
 	}
 	
 	if(cachedSP != null){
 		sp = accounting.formatMoney(cachedSP);
 		
 	}
 	else{
 		sp = '';
 	}
 	
 	
 	
 	//Ti.API.info('Vacant land values *********************** i : cachedBC : cachedSP : cachedQTY     '+ i+' '+cachedBC+' : '+cachedSP+' : '+cachedQTY+' for rowid : '+MyCostElementsList[i].Rowid);
 	
 	var row = Ti.UI.createView({
 		width:'100%',
 		height:Ti.UI.Fill,
 		layout:'horizontal',
 		top:'5dp',
 		bottom:'5dp',
 		
 	});
 	
 	var crossImageBtn=Ti.UI.createButton({
		width:'30dp',
		height:'30dp',
		backgroundImage:globalImgPath+'cross_btn.png',
		Btnid:''+MyCostElementsList[i].Rowid,
		left:'5dp',
		id:'vacant land'
	});	
	
	crossImageBtn.addEventListener('singletap',deleteRow);
	
	
	row.add(crossImageBtn);
	
	var lotSizeView = Ti.UI.createView({
 		width:'100dp',
 		height:'50dp',
 		layout:'vertical',
 		left:'5dp',
 		
 	});
 	
 	var lotSizeLabel=Ti.UI.createLabel({
 		text:'Lot Size',
		font:{fontSize:'10dp'},
		color:glblDarkGrayFont,
		touchEnabled:false,
		width:Ti.UI.Fill,
        height:Ti.UI.Fill,
	});
	
 	lotSizeTxt[i] = Ti.UI.createTextField({
 		keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		TfCostElementId:''+MyCostElementsList[i].CostElementID,
		TfCostGroupID:''+MyCostElementsList[i].CostGroupingID,		
		color:glblDarkGrayFont,
		font:{fontSize:'14dp'},
		backgroundColor:'#fff',
		borderColor:glblLightGrayFont,
		borderRadius:5,
		borderWidth:1,
		width:'80dp',
        height:'35dp',
        textAlign:'right',
        paddingRight:'5dp',
        value:bc,
	});
	
	lotSizeTxt[i].addEventListener('change',function(e){
          	lotSizeTxt[i].backgroundColor='#fff';
          	//Ti.API.info('setting user val : '+lotSizeTxt[i].value);
          	Ti.App.Properties.setString('DWELBC'+MyCostElementsList[i].Rowid, lotSizeTxt[i].value);
    });
    
    lotSizeTxt[i].addEventListener('focus', function (e){
			lotSizeTxt[i].borderWidth = 3;
	});  
			
	lotSizeTxt[i].addEventListener('blur', function (e){
			lotSizeTxt[i].borderWidth = 1;
	}); 
          
          
    /*lotSizeTxt[i].addEventListener('blur',function(e){
    	lotSizeTxt[i].value=accounting.formatMoney(lotSizeTxt[i].value);
    });*/
	
	lotSizeView.add(lotSizeLabel);
	//lotSizeFieldView.add(unitLabel);
	//lotSizeFieldView.add(lotSizeTxt[i]);
	lotSizeView.add(lotSizeTxt[i]);		
	//lotSizeView.add(lotSizeFieldView);		             
 	row.add(lotSizeView);
 	
 	var quantityView = Ti.UI.createView({
 		width:'70dp',
 		height:'50dp',
 		layout:'vertical',
 	});
 	
 	var quantityLabel=Ti.UI.createLabel({
 		text:'Quantity',
		font:{fontSize:'10dp'},
		color:glblDarkGrayFont,
		touchEnabled:false,
		width:Ti.UI.Fill,
        height:Ti.UI.Fill,
	});
 	
 	quantityTxt[i] = Ti.UI.createTextField({
 		keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		TfCostElementId:''+MyCostElementsList[i].CostElementID,
		TfCostGroupID:''+MyCostElementsList[i].CostGroupingID,		
		color:glblDarkGrayFont,
		font:{fontSize:'14dp'},
		backgroundColor:'#fff',
		borderColor:glblLightGrayFont,
		borderRadius:5,
		borderWidth:1,
		width:'40dp',
        height:'35dp',
        textAlign:'right',
        paddingRight:'5dp',
        value:qty,
	});
	
	quantityTxt[i].addEventListener('change',function(e){
          	quantityTxt[i].backgroundColor='#fff';
          	//Ti.API.info('setting user val : '+quantityTxt[i].value);
          	Ti.App.Properties.setString('DWELQTY'+MyCostElementsList[i].Rowid, quantityTxt[i].value);
    });
    
    quantityTxt[i].addEventListener('focus', function (e){
			quantityTxt[i].borderWidth = 3;
	});  
			
	quantityTxt[i].addEventListener('blur', function (e){
			quantityTxt[i].borderWidth = 1;
	}); 
	
	quantityView.add(quantityLabel);
	quantityView.add(quantityTxt[i]);
 	
 	row.add(quantityView);
 	
 	var spView = Ti.UI.createView({
 		width:'100dp',
 		height:'50dp',
 		layout:'vertical',
 		//left:'5dp',
 		//backgroundColor:'red',
 	});
 	
 	var spLabel=Ti.UI.createLabel({
 		text:'Sales price',
		font:{fontSize:'10dp'},
		color:glblDarkGrayFont,
		touchEnabled:false,
		width:Ti.UI.Fill,
        height:Ti.UI.Fill,
	});
	
	var spFieldView = Ti.UI.createView({
 		width:'100dp',
 		height:'50dp',
 		layout:'horizontal',
 	});
 	
 	var unitLabel2=Ti.UI.createLabel({
 		text:'$',
		font:{fontSize:'14dp'},
		color:glblDarkGrayFont,
		touchEnabled:false,
		width:'10dp',
        height:'30dp',
	});
 	
 	spTxt[i] = Ti.UI.createTextField({
 		keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		TfCostElementId:''+MyCostElementsList[i].CostElementID,
		TfCostGroupID:''+MyCostElementsList[i].CostGroupingID,		
		color:glblDarkGrayFont,
		font:{fontSize:'14dp'},
		backgroundColor:'#fff',
		borderColor:glblLightGrayFont,
		borderRadius:5,
		borderWidth:1,
		width:'80dp',
        height:'35dp',
        textAlign:'right',
        paddingRight:'5dp',
        value:sp,
	});
	
	spTxt[i].addEventListener('change',function(e){
          	spTxt[i].backgroundColor='#fff';
          	//Ti.API.info('setting user val : '+spTxt[i].value);
          	Ti.App.Properties.setString('DWELSP'+MyCostElementsList[i].Rowid, spTxt[i].value);
    });
    
    spTxt[i].addEventListener('focus', function (e){
			quantityTxt[i].borderWidth = 3;
	});  
			
    spTxt[i].addEventListener('blur',function(e){
    	
    	quantityTxt[i].borderWidth = 1;
    	spTxt[i].value=accounting.formatMoney(spTxt[i].value);
    });
	
	spView.add(spLabel);
	spFieldView.add(unitLabel2);
	spFieldView.add(spTxt[i]);
	//spView.add(spTxt);
	spView.add(spFieldView);
	
 	row.add(spView);
 	
 	if(Ti.Platform.osname === 'ipad'){
		lotSizeView.width = '30%';
		lotSizeView.height = '80%';
		lotSizeView.top = '10%';
		lotSizeView.bottom = '10%';	
		lotSizeView.left = '7%';	
		
		quantityView.width = '10%';
		quantityView.height = '80%';
		quantityView.top = '10%';
		quantityView.bottom = '10%';
		quantityView.left = '5%';
		
		spView.width = '35%';
		spView.height = '80%';
		spView.top = '10%';
		spView.bottom = '10%';
		spView.left = '8%';
		spFieldView.width = '100%';
		spFieldView.height = '100%';
		
		lotSizeLabel.width = '100%';
		lotSizeLabel.height = '20%';
		lotSizeLabel.font = {fontSize:'15%'};
		lotSizeLabel.textAlign = 'center';
		
		quantityLabel.width = '100%';
		quantityLabel.height = '20%';
		quantityLabel.font = {fontSize:'15%'};
		quantityLabel.textAlign = 'center';
		
		spLabel.width = '100%';
		spLabel.height = '20%';
		spLabel.font = {fontSize:'15%'};
		spLabel.textAlign = 'center';
		
		
		
		lotSizeTxt[i].width = '90%';
		lotSizeTxt[i].height = '70%';
		
		quantityTxt[i].width = '100%';
		quantityTxt[i].height = '70%';
		
		spTxt[i].width = '74%';
		spTxt[i].height = '70%';
		
		
	}
 	
 	view.add(row);
   
 }
 
 /*
  * @param view = row object
  * @param i = Count of cost element 
  */
 function drawDwellingRow (view,i) {
 	
 	rowCntVL++;
 	
 	var cachedBC = Ti.App.Properties.getString('DWELBC'+MyCostElementsList[i].Rowid);
 	var cachedQTY = Ti.App.Properties.getString('DWELQTY'+MyCostElementsList[i].Rowid);
 	var cachedSP = Ti.App.Properties.getString('DWELSP'+MyCostElementsList[i].Rowid);
 	var bc,qty,sp;
 	
 	if(cachedBC != null){
 		bc = accounting.formatMoney(cachedBC);
 		
 	}
 	else{
 		bc = accounting.formatMoney(MyCostElementsList[i].DefaultValue);
 	}
 	
 	if(cachedQTY != null){
 		qty = cachedQTY;
 		
 	}
 	else{
 		qty = '';
 	}
 	
 	dwellingsCnt = dwellingsCnt + parseInt(qty);
 	
 	if(cachedSP != null){
 		sp = accounting.formatMoney(cachedSP);
 		
 	}
 	else{
 		sp = '';
 	}
 	
 	
 	
 	//Ti.API.info('Dwelling values ******************** i :  cachedBC : cachedSP : cachedQTY     '+ i +' '+cachedBC+' : '+cachedSP+' : '+cachedQTY+' for rowid : '+MyCostElementsList[i].Rowid);
 	
 	var parent = Ti.UI.createView({
 		width:'100%',
 		height:Ti.UI.Fill,
 		layout:'vertical',
 	});
 	
 	var dwellingName = Ti.UI.createLabel({
 		//text:'Lot Size',
 		text:''+MyCostElementsList[i].Name,
		font:{fontSize:'18dp'},
		color:glblDarkGrayFont,
		touchEnabled:false,
		width:Ti.UI.Fill,
        height:'30dp',
        left:'15dp'
	}); 
	
	parent.add(dwellingName);
 	
 	var row = Ti.UI.createView({
 		width:'100%',
 		height:'80dp',
 		layout:'horizontal',
 		top:'5dp',
 		bottom:'5dp',
 		//backgroundColor:'red',
 	});
 	
 	var crossImageBtn=Ti.UI.createButton({
		width:'30dp',
		height:'30dp',
		backgroundImage:globalImgPath+'cross_btn.png',
		Btnid:''+MyCostElementsList[i].Rowid,
		left:'5dp',
		id:'dwellings',
	});	
	
	crossImageBtn.addEventListener('singletap',deleteRow);
	
	
	row.add(crossImageBtn);
	
	var lotSizeView = Ti.UI.createView({
 		width:'100dp',
 		height:'50dp',
 		layout:'vertical',
 		left:'5dp',
 	});
 	
 	var lotSizeLabel=Ti.UI.createLabel({
 		text:'Build cost',
		font:{fontSize:'10dp'},
		color:glblDarkGrayFont,
		touchEnabled:false,
		width:Ti.UI.Fill,
        height:Ti.UI.Fill,
	});
	
	var lotSizeFieldView = Ti.UI.createView({
 		width:'100dp',
 		height:'50dp',
 		layout:'horizontal',
 	});
 	
 	var unitLabel=Ti.UI.createLabel({
 		text:'$',
		font:{fontSize:'14dp'},
		color:glblDarkGrayFont,
		touchEnabled:false,
		width:'10dp',
        height:'30dp',
	});
 	
 	lotSizeTxt[i] = Ti.UI.createTextField({
 		//value:accounting.formatMoney(MyCostElementsList[i].DefaultValue),
 		value:bc,
 		keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		TfCostElementId:''+MyCostElementsList[i].CostElementID,
		TfCostGroupID:''+MyCostElementsList[i].CostGroupingID,		
		color:glblDarkGrayFont,
		font:{fontSize:'14dp'},
		backgroundColor:'#fff',
		borderColor:glblLightGrayFont,
		borderRadius:5,
		borderWidth:1,
		width:'80dp',
        height:'35dp',
        textAlign:'right',
        paddingRight:'5dp',
        
	});
	
	lotSizeTxt[i].addEventListener('change',function(e){
          	lotSizeTxt[i].backgroundColor='#fff';
          	//Ti.API.info('setting user val : '+lotSizeTxt[i].value);
          	Ti.App.Properties.setString('DWELBC'+MyCostElementsList[i].Rowid, lotSizeTxt[i].value);
    });
    
    lotSizeTxt[i].addEventListener('focus', function (e){
			lotSizeTxt[i].borderWidth = 3;
	});  
			
    lotSizeTxt[i].addEventListener('blur',function(e){
    	lotSizeTxt[i].borderWidth = 1;
    	lotSizeTxt[i].value=accounting.formatMoney(lotSizeTxt[i].value);
    });
	
	
	lotSizeView.add(lotSizeLabel);
	lotSizeFieldView.add(unitLabel);
	lotSizeFieldView.add(lotSizeTxt[i]);
	//lotSizeView.add(lotSizeTxt);		
	lotSizeView.add(lotSizeFieldView);		             
 	row.add(lotSizeView);
 	
 	var quantityView = Ti.UI.createView({
 		width:'70dp',
 		height:'50dp',
 		layout:'vertical',
 		//left:'5dp'
 	});
 	
 	var quantityLabel=Ti.UI.createLabel({
 		text:'Quantity',
		font:{fontSize:'10dp'},
		color:glblDarkGrayFont,
		touchEnabled:false,
		width:Ti.UI.Fill,
        height:Ti.UI.Fill,
	});
 	
 	quantityTxt[i] = Ti.UI.createTextField({
 		keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		TfCostElementId:''+MyCostElementsList[i].CostElementID,
		TfCostGroupID:''+MyCostElementsList[i].CostGroupingID,		
		color:glblDarkGrayFont,
		font:{fontSize:'14dp'},
		backgroundColor:'#fff',
		borderColor:glblLightGrayFont,
		borderRadius:5,
		borderWidth:1,
		width:'40dp',
        height:'35dp',
        textAlign:'right',
        paddingRight:'5dp',
        value:qty,
	});
	
	quantityTxt[i].addEventListener('change',function(e){
          	quantityTxt[i].backgroundColor='#fff';
          	sumUp();
          	Ti.App.Properties.setString('DWELQTY'+MyCostElementsList[i].Rowid, quantityTxt[i].value);
    });
          
    quantityTxt[i].addEventListener('focus', function (e){
			quantityTxt[i].borderWidth = 3;
	});  
			
    quantityTxt[i].addEventListener('blur',function(e){
    	quantityTxt[i].borderWidth = 1;
    });
	
	quantityView.add(quantityLabel);
	quantityView.add(quantityTxt[i]);
 	
 	row.add(quantityView);
 	
 	var spView = Ti.UI.createView({
 		width:'100dp',
 		height:'50dp',
 		layout:'vertical',
 	});
 	
 	var spLabel=Ti.UI.createLabel({
 		text:'Sales price',
		font:{fontSize:'10dp'},
		color:glblDarkGrayFont,
		touchEnabled:false,
		width:Ti.UI.Fill,
        height:Ti.UI.Fill,
	});
	
	var spFieldView = Ti.UI.createView({
 		width:'100dp',
 		height:'50dp',
 		layout:'horizontal',
 	});
 	
 	var unitLabel2=Ti.UI.createLabel({
 		text:'$',
		font:{fontSize:'14dp'},
		color:glblDarkGrayFont,
		touchEnabled:false,
		width:'10dp',
        height:'30dp',
	});
 	
 	spTxt[i] = Ti.UI.createTextField({
 		keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		TfCostElementId:''+MyCostElementsList[i].CostElementID,
		TfCostGroupID:''+MyCostElementsList[i].CostGroupingID,		
		color:glblDarkGrayFont,
		font:{fontSize:'14dp'},
		backgroundColor:'#fff',
		borderColor:glblLightGrayFont,
		borderRadius:5,
		borderWidth:1,
		width:'80dp',
        height:'35dp',
        textAlign:'right',
        paddingRight:'5dp',
        value:sp,
	});
	
	spTxt[i].addEventListener('change',function(e){
          	spTxt[i].backgroundColor='#fff';
          	//Ti.API.info('setting user val : '+spTxt[i].value);
          	Ti.App.Properties.setString('DWELSP'+MyCostElementsList[i].Rowid, spTxt[i].value);
    });
          
    spTxt[i].addEventListener('focus', function (e){
			spTxt[i].borderWidth = 3;
	});  
			
    spTxt[i].addEventListener('blur',function(e){
    	spTxt[i].borderWidth = 1;
    	spTxt[i].value=accounting.formatMoney(spTxt[i].value);
    });
	
	spView.add(spLabel);
	spFieldView.add(unitLabel2);
	spFieldView.add(spTxt[i]);
	spView.add(spFieldView);

 	
 	row.add(spView);
 	parent.add(row);
 	view.add(parent);
    view.height = '100dp'; 
    
    if(Ti.Platform.osname === 'ipad'){
    	
    	view.height = rowHt + (0.1 * rowHt);
    	parent.width = '100%';
    	parent.height = '100%';
    	
    	dwellingName.height = '20%';
    	dwellingName.width = '100%';
    	dwellingName.font = {fontSize:'15%'};
    	
    	row.height = '70%';
    	row.width = '100%';
    	
		lotSizeView.width = '30%';
		lotSizeView.height = '80%';
		lotSizeView.top = '10%';
		lotSizeView.bottom = '10%';	
		lotSizeView.left = '7%';	
		
		lotSizeFieldView.width = '100%';
		lotSizeFieldView.height = '100%';
		
		quantityView.width = '10%';
		quantityView.height = '80%';
		quantityView.top = '10%';
		quantityView.bottom = '10%';
		quantityView.left = '5%';
		
		spView.width = '35%';
		spView.height = '80%';
		spView.top = '10%';
		spView.bottom = '10%';
		spView.left = '8%';
		spFieldView.width = '100%';
		spFieldView.height = '100%';
		
		lotSizeLabel.width = '100%';
		lotSizeLabel.height = '20%';
		lotSizeLabel.font = {fontSize:'15%'};
		lotSizeLabel.textAlign = 'center';
		
		quantityLabel.width = '100%';
		quantityLabel.height = '20%';
		quantityLabel.font = {fontSize:'15%'};
		quantityLabel.textAlign = 'center';
		
		spLabel.width = '100%';
		spLabel.height = '20%';
		spLabel.font = {fontSize:'15%'};
		spLabel.textAlign = 'center';
		
		
		
		lotSizeTxt[i].width = '90%';
		lotSizeTxt[i].height = '70%';
		
		quantityTxt[i].width = '100%';
		quantityTxt[i].height = '70%';
		
		spTxt[i].width = '74%';
		spTxt[i].height = '70%';
		
		
	}
 }
 
 function deleteRow (e) {
 	
 	var BtnId=e.source.Btnid;
 	
 	if(e.source.id === 'dwellings'){
 		var alerDialog=Ti.UI.createAlertDialog({
			message:'Would you like to delete this Dwelling ?',
			buttonNames: ['Yes','No']
		});
		
		alerDialog.addEventListener('click', function(ev) {
			
			// If user selects Yes
			if (ev.index == 0) { 
				scenarioDetailsWindow.add(actvityIndicatorView);
				actInd.show();
				setTimeout(function(){
					scrollView.remove(e.source.parent);
				    DeleteAddedDwelling(e.source.Btnid);
				    MyCostElementsList=getScenarioDetailePage();
					scenarioDetailsWindow.remove(scrollView);
					scrollView=null;
					//addDwellingBtn=null;
					PopulateScrollView();
					scroll('dwellings');
					actInd.hide();
					scenarioDetailsWindow.remove(actvityIndicatorView);
				},1000);
				
			} 
			// If user selects No
			else if (ev.index == 1) { 
				alerDialog.hide();
			}
		});
		alerDialog.show();
		
	}
	else if(e.source.id === 'vacant land'){
		var alerDialog=Ti.UI.createAlertDialog({
			message:'Would you like to delete this Vacant Land ?',
			buttonNames: ['Yes','No']
		});
		
		alerDialog.addEventListener('click', function(ev) {
			
			// If user selects Yes
			if (ev.index == 0) { 
				scenarioDetailsWindow.add(actvityIndicatorView);
				actInd.show();
				setTimeout(function(){
					scrollView.remove(e.source.parent);
				    DeleteAddedDwelling(e.source.Btnid);
				    MyCostElementsList=getScenarioDetailePage();
					scenarioDetailsWindow.remove(scrollView);
					scrollView=null;
					//addDwellingBtn=null;
					PopulateScrollView();
					scroll('vacant land');
					actInd.hide();
					scenarioDetailsWindow.remove(actvityIndicatorView);
				},1000);
				
			} 
			// If user selects No
			else if (ev.index == 1) { 
				alerDialog.hide();
			}
		});
		alerDialog.show();
		
	}
   
 }
 
 
 function sumUp () {
 	
 	var cnt = 0;
 	
 	for(var i=0;i<MyCostElementsList.length;i++){
 		
 		if(MyCostElementsList[i].CostGroupingID == 16){
 			
 			//var qty = dwellingQuantityTextField[i].value;
 			var qty = quantityTxt[i].value;
 			if(qty !== '')
 				cnt = cnt + parseInt(qty);
 			else
 				cnt = cnt + 0;	
 		}
 		
 	}
 	for(var i=0;i<MyCostElementsList.length;i++){
	 	if(MyCostElementsList[i].CostElementID == 70){
	 		rowInputTextField[i].value = ''+cnt;
	 	}
	} 	
 }
 
 
 function getDefaultValue (ceId)
 			 {
				  	var fieldVal=[] 
				  	fieldVal = getDefaultsForScenario(FeasibilityID);
				    for(var i=0;i<fieldVal.length;i++)
				    {
				    	if(fieldVal[i].CEId == ceId )
				    	{
				    	    	if(!fieldVal[i].DefaultValue)
						    		return  0;//''
						    	else
						    	    return fieldVal[i].DefaultValue;
						  }
					 }
  				}
//var chk_Array = getDwellings();	

function optionalConstructionCostClicked (e) {
	/* Logic selecting checkbox */
	if(e.source.selected)
	{
		e.source.selected =false;
		e.source.backgroundImage=globalImgPath+'uncheck.png';
		Ti.App.Properties.setBool('CECHECK'+e.source.checkboxCostRowid,false);
	}
	else
	{
		e.source.selected = true;
		e.source.backgroundImage =globalImgPath+'check.png';
		Ti.App.Properties.setBool('CECHECK'+e.source.checkboxCostRowid,true);
			
	}
  
}

function createHeaderRow(i) {
             var rowHeader = Ti.UI.createView({
	           id:'i'+i,
               width:'100%', 
               height: sectionRowHt,
               top: 0, 
               left: 0,
               backgroundGradient:{type:'linear',colors:['#b4b4b4','#969696'],startPoint:{x:0,y:0},endPoint:{x:2,y:100},backFillStart:false},

           });
           var rowHeaderLabel=Ti.UI.createLabel(
           	{
           		text:''+CostGroupsList[i].Name,//CostGroupingID
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'14dp',fontWeight:'bold'}
								 :{fontSize:'12%',fontWeight:'bold'},
				color:'white',
				left:'3%',
				width:'75%',
           		touchEnabled:false
           	});
             rowHeader.add(rowHeaderLabel);
             
             
          if(CostGroupsList[i].CostGroupingID == 8)
			{
				    var rowHeaderIncludeLabel=Ti.UI.createLabel(
			           	{
			           		text:'Include?',//CostGroupingID
			           		font:Ti.Platform.osname =='android'
											 ?{fontSize:'14dp',fontWeight:'bold'}
											 :{fontSize:'12%',fontWeight:'bold'},
							color:'white',
							right:'3%',
			           		touchEnabled:false
			           	});
							   
				    rowHeader.add(rowHeaderIncludeLabel);
			}
            
          if(CostGroupsList[i].CostGroupingID === 16)
          {
          	
			  // Create a Button.
			  var AddDwellingButton = Ti.UI.createButton({
				    title:'Add',
					textAlign:'center',
					width:Ti.Platform.osname =='android'?'25%':'25%',//Ti.Platform.osname =='android'?'60dp':'50dp'
					height:'90%',
					right:'3%',
					font:Ti.Platform.osname =='android' 
											 ?{fontSize:'14dp'}
											 :{fontSize:'15%'},
					style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
					backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
					borderRadius:5,
					color:'#fff'
			  });
			  
			   							 // Listen for click events.
			  AddDwellingButton.addEventListener('click', function(e) {
				  /**
					 * For adding dwelling to scenario, user need to make choice of build quality and Build Difficulty using provided options
					 * Depends on Build quality and Build Difficulty Dwelling gets calculated 
					 * 
					 */	
					 btnSelector(AddDwellingButton);
					 var fromWin = 1;
					 scenarioDetailsWindow.add(actvityIndicatorView);
					 actInd.show();
					if(Ti.Platform.osname == 'android')
  					{
  						var winOpen=require('ui/common/AddDwelling');
						new winOpen('Dwellings',fromWin).open();	
  					}
  					else
  					{
  						var winOpen=require('ui/common/AddDwelling');
						navGroup.open(new winOpen('Dwellings',fromWin),{animated: true});
  					}	
					actInd.hide();
					scenarioDetailsWindow.remove(actvityIndicatorView);
				  
				  //*****
			  });
							 // Add to the parent view.
			  rowHeader.add(AddDwellingButton);
			  
          } 
          else
          if(CostGroupsList[i].CostGroupingID === 17){
          	
          	// Create a Button.
			  var AddVacantLandButton = Ti.UI.createButton({
				    title:'Add',
					textAlign:'center',
					width:'25%',//Ti.Platform.osname =='android'?'60dp':'50dp'
					height:'90%',
					right:'3%',
					font:Ti.Platform.osname =='android' 
											 ?{fontSize:'14dp'}
											 :{fontSize:'15%'},
					style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
					backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
					borderRadius:5,
					color:'#fff'
			  });
			  
			  AddVacantLandButton.addEventListener('click', function(e) {
			  	btnSelector(AddVacantLandButton);
			  	//Ti.App.fireEvent('RefreshView', {});
			  	changeView();
			  });
			  
			  rowHeader.add(AddVacantLandButton);
          	
          }
			return rowHeader;
   }
   
   function changeView () {
   	
     scenarioDetailsWindow.add(actvityIndicatorView);
		indicator.show();
		
   		setTimeout(function(){
   			AddVacantlandForScenario();
   			MyCostElementsList=getScenarioDetailePage();
			scenarioDetailsWindow.remove(scrollView);
			scrollView=null;
			//addDwellingBtn=null;
			PopulateScrollView();
			scroll('vacant land');
			rowCntVL = 0;
			indicator.hide();
   			scenarioDetailsWindow.remove(actvityIndicatorView);
   		},5000);
   }
   
   /*Ti.App.addEventListener('RefreshView', function(event) {
   	
   		scenarioDetailsWindow.add(actvityIndicatorView);
		actInd.show();
   		setTimeout(function(){
   			MyCostElementsList=getScenarioDetailePage();
			scenarioDetailsWindow.remove(scrollView);
			scrollView=null;
			addDwellingBtn=null;
			PopulateScrollView();
			scroll('vacant land');
			rowCntVL = 0;
			actInd.hide();
   			scenarioDetailsWindow.remove(actvityIndicatorView);
   		},3000);
   		
	});*/

/**
 * Function will populate scrollview depends on track of feasibility 
 * ie  QWikFeasibility or Detailed Feasibility
 * 
 * and show list of cost element depends on these navigation tracks
 */
function PopulateScrollView () {
	
	rowCntDwel = 0;
	rowCntVL = 0;
	
	scrollView = Ti.UI.createScrollView({
		//top:Ti.Platform.osname=='android'?'24%':'14%',
		contentHeight: 'auto',
		layout: 'vertical',
	});
	
	if(Ti.Platform.osname=='android'){
		scrollView.top = '24%';
	}
	else if(Ti.Platform.osname=='iphone'){
		scrollView.top = '14%';
	}
	else if(Ti.Platform.osname=='ipad'){
		scrollView.top = '10%';
	}
			  
	for(var j=0;j< CostGroupsList.length;j++)
		{
			
			var headerRow=createHeaderRow(j);
			 	headerRow.addEventListener('click',function(e)
		             {
		             	var headerNum=e.source.id;
		             });
		             
			 scrollView.add(headerRow);
	
			for(var i = 0; i <MyCostElementsList.length; i++)
			{	
				
				if (CostGroupsList[j].CostGroupingID == 16) {
						
						if (IsDwellingAdded()) {
							
							if(CostGroupsList[j].CostGroupingID == MyCostElementsList[i].CostGroupingID)
								{
						 			var roww = buildRow(i,CostGroupsList[j].CostGroupingID);
					       			scrollView.add(roww);
								}
						}else
							{
								rowCntVL++;
								var roww =CreateEmptyRow(i,CostGroupsList[j].CostGroupingID);
				       			scrollView.add(roww);
								break;
							}
						
					}
					else
					if(CostGroupsList[j].CostGroupingID == 17){
						
						if (IsVacantLandAdded()) {
							
							if(CostGroupsList[j].CostGroupingID == MyCostElementsList[i].CostGroupingID)
								{
						 			var roww = buildRow(i,CostGroupsList[j].CostGroupingID);
					       			scrollView.add(roww);
								}
						}else
							{
								var roww =CreateEmptyRow(i,CostGroupsList[j].CostGroupingID);
				       			scrollView.add(roww);
								break;
						}
					}
					else
						{
							if(CostGroupsList[j].CostGroupingID == MyCostElementsList[i].CostGroupingID)
								{
									 	var roww = buildRow(i,CostGroupsList[j].CostGroupingID);
								       	scrollView.add(roww);
								}			
						}
		    }
		}
		function CreateEmptyRow (i,j) {
						 row = Ti.UI.createView({
			               backgroundColor: 'white',
			               borderColor: '#bbb',
			               borderWidth: 1,
			               width:'100%', 
			               height: rowHt,
			               top: 0, left: 0,
			               id:'i'+i,
			           });
			           rowLabel=Ti.UI.createLabel({
			           		width:'100%',
			           		font:Ti.Platform.osname =='android' 
											 ?{fontSize:'18dp'}
											 :{fontSize:'17%'},
			           		left:'5%',
			           		color:glblDarkGrayFont,//'#6E7B8B',
			           		top:'20%',
			           		touchEnabled:false
			           	});
			           	
			           	if(j == 16){
			           		rowLabel.text = 'No Dwelling has been added yet';
			           	}
			           	else if(j == 17){
			           		rowLabel.text = 'No Vacant Land has been defined yet';
			           	}
					  row.add(rowLabel);
            
            return row;
		}
	scenarioDetailsWindow.add(scrollView);
	/*actInd.hide();
 	scenarioDetailsWindow.remove(actvityIndicatorView);*/
 	
 	
}



/**
 * Function will design Header(Navigation Bar) used for navigation in android
 * and also design sub-header
 */
function setHeader () 
		{
			headerLabel.text='QwikFeaso';//globalName.feasoName
			leftBtn.title='Back';
			rightBtn.title='Summary';
			rightBtn.width=Ti.Platform.osname =='android'?'27%':'23%',
			rightBtn.font=Ti.Platform.osname =='android'?{fontSize:'17dp'}:{fontSize:'15%'};
	
			headerView.add(leftBtn);						
			headerView.add(headerLabel);
			headerView.add(rightBtn);
			
			scenarioDetailsWindow.add(headerView);
	  
			subHeaderLabel.text='Development Strategy : '+ScenarioName;
			viewSubHeader.add(subHeaderLabel);
			viewSubHeader.height = '14%';
			scenarioDetailsWindow.add(viewSubHeader);
  
		}
		
scenarioDetailsWindow.add(actInd);
scenarioDetailsWindow.add(indicator);			

return scenarioDetailsWindow;
}
module.exports=OpenScenarioDetailsWin;