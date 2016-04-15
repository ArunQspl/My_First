/**
 * @projectDescription QwikFeaso
 * 
 * @author -List vivek Gidmare(vivek.gidmare@quagnitia.com),Shreyas Bhondve(shreyas.bhondve@quagnitia.com)
 * 
 * @version 1.0
 */

/**
 *Function will create Summary Window to display generated summary
 * 
 */
function OpenSummaryWin (unSelectedOptionalConstCosts) {
  
var summaryWindow;
var CostGropsList=[];
var CostElementList=[];
var DwellingList=[];
var VacantLandList = [];
var accounting;
var OptionArray=[
				{srN0:1,Name:'Select your option',option:'View Document',optionNo:1},{srN0:2,Name:'Select your option',option:'Email Document',optionNo:2}
				];
var scrollView;
var userName = Titanium.App.Properties.getString("username");
if(Ti.Platform.osname == 'android')
  {
  	/*
  	 * Include the files needed for UI Design and Database usage
  	 * Header.js will manage navigation for android
  	 * 
  	 */
  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
  	Ti.include('/ui/common/GenerateHTML.js');
  	Ti.include('/services/DataBaseTransaction.js')
  	Ti.include('/services/ACSTransactions.js')
  	Ti.include('/services/GetFromDataBase.js')
  	Ti.include('/services/TempDBTransaction.js')
  	accounting=require('/lib/accounting');
  	//Window Created for Android
  	 summaryWindow=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
  	var emailBtn;			
	 setHeader(); 		
	 leftBtn.addEventListener('click',function(e){
	 		
	 	summaryWindow.close();
	 	});
	 rightBtn.addEventListener('click',function(e){
	 	btnSelector(rightBtn);
			//Save Btn clicked
			/**
			 * open Dialog to accept name for summary 
			 */		
					var viewName='SaveAs';
					var popupwin = require("ui/common/popup");
					new popupwin(viewName,'').open();
					summaryWindow.close();
	 			});
	 emailBtn.addEventListener('click',function(e){
		 btnSelector(emailBtn);
		 generateAutomatedMail();
	 });
	 summaryWindow.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;		
 	}
  	else
  	{
		  	//Window Created for iphone to suport navigation Bar
		  	accounting=require('lib/accounting');
		  	summaryWindow=Ti.UI.createWindow({
		  	backgroundColor:'#fff',
			navBarHidden:false,
			tabBarHidden: true,
			barImage:'images/GrayNavBar.png',
			barColor:'#6d6e6f',
			title:'Summary',
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
		    navGroup.close(summaryWindow,{animated: true});
		  });
		  
         lftNavView.add(BackBtn);
		  summaryWindow.leftNavButton=lftNavView;
		
		  var rightView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					backgroundColor:'#0000',
					layout:'horizontal'
				});
		   var EmailBtn = Ti.UI.createButton({
			      title : 'Email',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			  });
			EmailBtn.addEventListener('click',function(e){
				btnSelector(EmailBtn);
				generateAutomatedMail();
		  });  
		  var SaveBtn = Ti.UI.createButton({
			      title : 'Save',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      left:'5dp',
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			  });
			SaveBtn.addEventListener('click',function(e){
				btnSelector(SaveBtn);
				//Save Btn clicked
					/**
					 * open Dialog to accept name for summary 
					 */	
					var viewName='SaveAs';
					var popupwin = require("ui/common/popup");
					new popupwin(viewName,'').open();
					navGroup.close(summaryWindow,{animated: false});
				  });
		  
		  rightView.add(EmailBtn);
		  rightView.add(SaveBtn);
		  summaryWindow.rightNavButton=rightView;
 }
	summaryWindow.orientationModes=[Ti.UI.PORTRAIT];
var rowHt=(Ti.Platform.displayCaps.platformHeight*13)/100;
var sectionRowHt=(Ti.Platform.displayCaps.platformHeight*7)/100;	

	
/**
 * Generates Automated Mail with recipient as current registered user 
 *  
 */	
function generateAutomatedMail () {
	
	var html = generateHTMLDoc(/*SummaryName.value*/);
	var isNW_AVAILABLE = isNetworkAvailable();
	var userName = Titanium.App.Properties.getString("username");
	if(isNW_AVAILABLE)
	{
		sendFeasibilityResult(userName,html);
	}
	else{
		alert('There is presently no Internet Access which QwikFeaso needs in order to work.');
	}
	
	/**
	 * check network
	 */
	/*if(Titanium.Network.networkType !== Titanium.Network.NETWORK_NONE)
	{
		sendFeasibilityResult(userName,html);
	}
	else{
		alert('There is presently no Internet Access which QwikFeaso needs in order to work.');
	}*/
}

/**
 * This event will retrieve summary from Database and will create UI accordingly 
 */	
summaryWindow.addEventListener('open',function()
{
	summaryWindow.add(actvityIndicatorView);
	actInd.show();
	setTimeout(function(){
		 scrollView=Ti.UI.createScrollView(
			{
			top:Ti.Platform.osname =='android'?'10%':'0%',
			contentHeight: 'auto',
			layout:'vertical'
			});
				CalculateResults(unSelectedOptionalConstCosts);
				CreateStaticView();
				CostGropsList=GetSummaryCostGroups();
				CostElementList=GetSummaryCostElement();
		
				DwellingList=getDwellingResult();
				VacantLandList=getVacantLandResult();
	var isOptionalConstructionCostIncluded=0;					
		for(var j=0;j< CostGropsList.length;j++)
		{
			var CostGrpName=CostGropsList[j].Name;
			var headerRow=createHeaderRow(j);
			scrollView.add(headerRow);
			
			if(CostGropsList[j].CostGroupID == 16){
				
				if(DwellingList.length == 0)
					{
						//remove Dwelling to be constructed header if no dwellings added under that header
						scrollView.remove(headerRow);
					}
					else
					{
						for(var i = 0; i <DwellingList.length; i++)
							{	
								if(CostGropsList[j].CostGroupID == 16)
								{	
									var roww = createDwellingRow(i);
								       	scrollView.add(roww);
								}
							}
					}
				
			}
			else if(CostGropsList[j].CostGroupID == 17){
				
				Ti.API.info('inserting vacant land');
					if(VacantLandList.length == 0){
						scrollView.remove(headerRow);
					}
					else{
						for(var i = 0; i <VacantLandList.length; i++)
							{	
								var roww = createVacantLandRow(i);
								scrollView.add(roww);
							
							}
					}
			}
			else{
				
				if(CostGropsList[j].CostGroupID === 8)
						{
							for(var i = 0; i <CostElementList.length; i++)
								{	
										if(CostGropsList[j].CostGroupID == CostElementList[i].CostGrpID)
										{		
											isOptionalConstructionCostIncluded+=1;
											var roww = createRow(i);
										       	scrollView.add(roww);
										}
									}
								if(isOptionalConstructionCostIncluded === 0)
											scrollView.remove(headerRow);
						}
						else
						{
							for(var i = 0; i <CostElementList.length; i++)
								{	
									if(CostGropsList[j].CostGroupID == CostElementList[i].CostGrpID)
											{		var roww = createRow(i);
											       	scrollView.add(roww);
											}
								}
							
						}
				
			}
		}
			
			
			
			
			
			/*if(CostGropsList[j].CostGroupID != 16)
				{
					if(CostGropsList[j].CostGroupID === 8)
						{
							for(var i = 0; i <CostElementList.length; i++)
								{	
										if(CostGropsList[j].CostGroupID == CostElementList[i].CostGrpID)
										{		
											isOptionalConstructionCostIncluded+=1;
											var roww = createRow(i);
										       	scrollView.add(roww);
										}
									}
								if(isOptionalConstructionCostIncluded === 0)
											scrollView.remove(headerRow);
						}
						else
						{
							for(var i = 0; i <CostElementList.length; i++)
								{	
									if(CostGropsList[j].CostGroupID == CostElementList[i].CostGrpID)
											{		var roww = createRow(i);
											       	scrollView.add(roww);
											}
								}
							
						}
				}
				else if(CostGropsList[j].CostGroupID == 17){
					
					Ti.API.info('inserting vacant land');
					if(VacantLandList.length == 0){
						scrollView.remove(headerRow);
					}
					else{
						for(var i = 0; i <VacantLandList.length; i++)
							{	
								var roww = createVacantLandRow(i);
								scrollView.add(roww);
							
							}
					}
					
				}
			else
				{
					if(DwellingList.length == 0)
					{
						//remove Dwelling to be constructed header if no dwellings added under that header
						scrollView.remove(headerRow);
					}
					else
					{
						for(var i = 0; i <DwellingList.length; i++)
							{	
								if(CostGropsList[j].CostGroupID == 16)
								{	
									var roww = createDwellingRow(i);
								       	scrollView.add(roww);
								}
							}
					}
				}
		}*/
					 
		summaryWindow.add(scrollView);		
		actInd.hide();
		summaryWindow.remove(actvityIndicatorView);
	},100);
	
});	

/**
 * View for result and profitability is static 
 * and it will be designed using this function
 * 
 */
function CreateStaticView () {
 
 function SetCustomHeight(heightInPercentage){
	var customHeight = 
		Ti.Platform.osname == 'ipad'
		? Math.round((Ti.Platform.displayCaps.platformHeight * heightInPercentage)/100)
		: (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight
		? Math.round((Ti.Platform.displayCaps.platformWidth * heightInPercentage)/100)
		: Math.round((Ti.Platform.displayCaps.platformHeight * heightInPercentage)/100));
	return customHeight;
}
var staticView=Ti.UI.createView(
	{
		width:'100%',
		height:SetCustomHeight(79),//59%//'85%'SetCustomHeight(79)
		backgroundColor:'#fff',
		layout:'vertical'
	});
//Gray Header for result start
	var resultGrayHeader=Ti.UI.createView(
		{
			width:'100%',
			height:sectionRowHt,
			top: '0%', 
            left: 0,
            backgroundGradient:{type:'linear',colors:['#b4b4b4','#969696'],startPoint:{x:0,y:0},endPoint:{x:2,y:100},backFillStart:false},
		});	
	var resultGrayHeaderLabel=Ti.UI.createLabel(
           	{
           		text:'Result',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp',fontWeight:'bold'}
								 :{fontSize:'12%',fontWeight:'bold'},
				color:'white',
				left:'3%',
           		touchEnabled:false
           	});
	
	resultGrayHeader.add(resultGrayHeaderLabel);
 staticView.add(resultGrayHeader);	
	
///profit Row
	var profitRow=Ti.UI.createView(
		{
			backgroundColor: 'white',
            width:'100%', 
            height: rowHt,
            left: 0,
            backgroundColor:'#fff',
               borderColor: glblLightGrayFont,
               borderWidth: 1,    
		});		
	
	var profitRowLabel=Ti.UI.createLabel(
           	{
           		width:'50%',
           		text:'Profit / Loss',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
           		left:'3%',
           		color:glblDarkGrayFont,//'#6E7B8B',
           		touchEnabled:false
           	});
	var profitRowUnitLabel=Ti.UI.createLabel(
           	{
           		width:'10%',
           		text:'%',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'15%'},
           		right:'3%',
           		textAlign:'right',
           		color:glblLightGrayFont,//'#6E7B8B',
           		touchEnabled:false
           	});
    var DBFeaso = Ti.Database.open('QwikFeaso');
    var profitRowRS=DBFeaso.execute('select * from SummaryStaticData where SummaryStaticDataID=1');      	
	var profitRowLabelValue=Ti.UI.createLabel(
           	{
           		width:'auto',
           		text:''+parseFloat(profitRowRS.fieldByName('ProfitLoss')).toFixed(2),
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
           		right:'10%',
           		color:glblLightGrayFont,//'#6E7B8B',
           		touchEnabled:false
           	});
	 DBFeaso.close();   
		profitRow.add(profitRowLabel);
		profitRow.add(profitRowUnitLabel);
		profitRow.add(profitRowLabelValue);
	staticView.add(profitRow);
//profit row end===========================================	
//Deal row end===========================================	
var dealNoDealRow=Ti.UI.createView(
		{
			backgroundColor: 'white',
            width:'100%', 
            height: rowHt,
             left: 0,
             backgroundColor:'#fff',
               borderColor: glblLightGrayFont,
               borderWidth: 1,    
		});		
	var dealNoDealRowLabel=Ti.UI.createLabel(
           	{
           		width:'40%',
           		text:'Deal / No Deal',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
           		left:'3%',
           		color:glblDarkGrayFont,//'#6E7B8B',
           		touchEnabled:false
           	});
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var dealNoDealRowRS=DBFeaso.execute('select * from SummaryStaticData where SummaryStaticDataID=2');      	
	var thumbImageView=Ti.UI.createImageView(
			{
				width:'10%',
				height:'60%',
				image:globalImgPath+'thumbsdown.png',
				right:'35%'		
			});
	thumbImageView.image=dealNoDealRowRS.fieldByName('ProfitLoss')=='No Deal'?globalImgPath+'thumbsdown.png':globalImgPath+'thumbsup.png'; 
	var dealNoDealRowLabelValue=Ti.UI.createLabel(
           	{
           		width:'auto',
           		text:''+dealNoDealRowRS.fieldByName('ProfitLoss'),
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'16dp'}
								 :{fontSize:'15%'},
           		right:'3%',
           		color:glblLightGrayFont,
           		touchEnabled:false
           	});
		dealNoDealRow.add(dealNoDealRowLabel);
		dealNoDealRow.add(thumbImageView);
		dealNoDealRow.add(dealNoDealRowLabelValue);
	staticView.add(dealNoDealRow);
	 DBFeaso.close(); 
//Deal row end===========================================	
//Gray Header for result end==============================
//==============================Gray Header for Profitability start==============================
	var profitabilityGrayHeader=Ti.UI.createView(
		{
			width:'100%',
			height:sectionRowHt,
		            left: 0,
            backgroundGradient:{type:'linear',colors:['#b4b4b4','#969696'],startPoint:{x:0,y:0},endPoint:{x:2,y:100},backFillStart:false},
		});	
	var profitabilityGrayHeaderLabel=Ti.UI.createLabel(
           	{
           		text:'Profitability',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp',fontWeight:'bold'}
								 :{fontSize:'12%',fontWeight:'bold'},
				color:'white',
				textAlign:'center',
				left:'3%',
				top:'3%',
           		touchEnabled:false
           	});
           	
     var IncomeGrayHeaderLabel=Ti.UI.createLabel(
           	{
           		text:'Expense',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
				color:'white',
				right:'72%',
				top:'50%',
				textAlign:'right',
           		touchEnabled:false
           	});
      var ExpenditureGrayHeaderLabel=Ti.UI.createLabel(
           	{
           		width:'33%',
           		text:'Revenue',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
				color:'white',
				top:'50%',
				right:'36%',
				textAlign:'right',
           		touchEnabled:false
           	}); 
       var profitLossGrayHeaderLabel=Ti.UI.createLabel(
           	{
           		text:'Profit/Loss',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
				color:'white',
				right:'3%',
				textAlign:'right',
				top:'50%',
           		touchEnabled:false
           	});    	    	      	
	
	profitabilityGrayHeader.add(profitabilityGrayHeaderLabel);
	profitabilityGrayHeader.add(IncomeGrayHeaderLabel);
	profitabilityGrayHeader.add(ExpenditureGrayHeaderLabel);
	profitabilityGrayHeader.add(profitLossGrayHeaderLabel);

	staticView.add(profitabilityGrayHeader)
var viewProfitRow=Ti.UI.createView({
			width:'100%',
            left: 0,
		   layout:'vertical'         
		});
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var RawCostRowRS=DBFeaso.execute('select * from SummaryStaticData where SummaryStaticDataID=3');      	
    
    ////===============PwithoutFundingRow start==========
	var PwithoutFundingRow=Ti.UI.createView(
		{
			backgroundColor: 'white',
            width:'100%', 
            height: rowHt+1,
            left: 0,
            backgroundColor:'#fff',
            borderColor: glblLightGrayFont,
            borderWidth: 1, 
            id:'i'+1,   
		});		
	
	var PwithoutFundingRowLabel=addRowLabel('Raw Costs');
	
	var PwithoutFundingIncome=addIncomeValueLabel(''+accounting.formatMoney(parseInt(RawCostRowRS.fieldByName('Expense'),10).toFixed(0)))
	
	var PwithoutFundingExpenditure=addExpenditureValueLabel(''+accounting.formatMoney(parseInt(RawCostRowRS.fieldByName('Revenue'),10).toFixed(0)));
           	
	var PwithoutFundingProfitLoss=addProfitLossValueLabel(''+accounting.formatMoney(parseInt(RawCostRowRS.fieldByName('ProfitLoss'),10).toFixed(0)));
   
   RawCostRowRS.close();  
DBFeaso.close();

		PwithoutFundingRow.add(PwithoutFundingRowLabel);
		PwithoutFundingRow.add(PwithoutFundingIncome);
		PwithoutFundingRow.add(PwithoutFundingExpenditure);
		PwithoutFundingRow.add(PwithoutFundingProfitLoss);
	
staticView.add(PwithoutFundingRow);
//====================PwithoutFundingRow end  ==========

///=============total funding cost

	var DBFeaso = Ti.Database.open('QwikFeaso');
	var TotalFundingCostRowRS=DBFeaso.execute('select * from SummaryStaticData where SummaryStaticDataID=4');      	
	var TotalFundingCostRow=Ti.UI.createView(
		{
			backgroundColor: 'white',
            width:'100%', 
            height: rowHt+1,
            left: 0,
            backgroundColor:'#fff',
            borderColor: glblLightGrayFont,
            borderWidth: 1,
            id:'i'+22,      
		});		
	
	var TotalFundingCostRowLabel=addRowLabel('Funding Costs');
	
	var TotalFundingCostIncome=addIncomeValueLabel(''+accounting.formatMoney(parseInt(TotalFundingCostRowRS.fieldByName('Expense'),10).toFixed(0)));
	
	var TotalFundingCostExpenditure=addExpenditureValueLabel(''+accounting.formatMoney(parseInt(TotalFundingCostRowRS.fieldByName('Revenue'),10).toFixed(0)));
           	
	var TotalFundingCostProfitLoss=addProfitLossValueLabel(''+accounting.formatMoney(parseInt(TotalFundingCostRowRS.fieldByName('ProfitLoss'),10).toFixed(0)));
     
	
		TotalFundingCostRow.add(TotalFundingCostRowLabel);
		TotalFundingCostRow.add(TotalFundingCostIncome);
		TotalFundingCostRow.add(TotalFundingCostExpenditure);
		TotalFundingCostRow.add(TotalFundingCostProfitLoss);

	staticView.add(TotalFundingCostRow);
	 TotalFundingCostRowRS.close();  
	DBFeaso.close();
	
///=============total funding cost end=========================
//=====================TotalProfitOfDealRow start==============
	
	var DBFeaso = Ti.Database.open('QwikFeaso');
	var TotalProfitOfDealRowRS=DBFeaso.execute('select * from SummaryStaticData where SummaryStaticDataID=5');      	
    
	var TotalProfitOfDealRow=Ti.UI.createView(
		{
			backgroundColor: 'white',
            width:'100%', 
            height: rowHt+1,
            left: 0,
            backgroundColor:'#fff',
            borderColor: glblLightGrayFont,
            borderWidth: 1, 
            id:'i'+13,     
		});		
	
	var TotalProfitOfDealRowRowLabel=addRowLabel('Total');
	
	var TotalProfitOfDealRowIncome=addIncomeValueLabel(''+accounting.formatMoney(parseInt(TotalProfitOfDealRowRS.fieldByName('Expense'),10).toFixed(0)));
	
	var TotalProfitOfDealRowExpenditure=addExpenditureValueLabel(''+accounting.formatMoney(parseInt(TotalProfitOfDealRowRS.fieldByName('Revenue'),10).toFixed(0)));
           	
	var TotalProfitOfDealRowProfitLoss=addProfitLossValueLabel(''+accounting.formatMoney(parseInt(TotalProfitOfDealRowRS.fieldByName('ProfitLoss'),10).toFixed(0)));
     
	
		TotalProfitOfDealRow.add(TotalProfitOfDealRowRowLabel);
		TotalProfitOfDealRow.add(TotalProfitOfDealRowIncome);
		TotalProfitOfDealRow.add(TotalProfitOfDealRowExpenditure);
		TotalProfitOfDealRow.add(TotalProfitOfDealRowProfitLoss);
	
	staticView.add(TotalProfitOfDealRow);
    TotalProfitOfDealRowRS.close();  
	DBFeaso.close();
	
//=====================TotalProfitOfDealRow end==============
//==============================Gray Header for Profitability end==============================
scrollView.add(staticView);
///==========================static view end==========================

}


/**
 * Function will design Header(Navigation Bar) used for navigation in android 
 *  header will provide option for saving summary,email latest generated summary to user in PDF format
 * or go back to previous screen
 */
function setHeader () {
		headerLabel.text='Summary';
		headerLabel.left='25%';						
		leftBtn.title='Back';
		/*leftBtn.font=Ti.Platform.osname =='android' 
								 ?{fontSize:'25%',}
								 :{fontSize:'15%',};*/
		rightBtn.title='Save';
		rightBtn.width='16%'
		/*rightBtn.font=Ti.Platform.osname =='android' 
								 ?{fontSize:'25%',}
								 :{fontSize:'15%',};*/
		 emailBtn=Ti.UI.createButton(
			{
				style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
				width:Ti.Platform.osname=='android'?'20%':'18%',
				height:'70%',
				title:'Email',
				font:Ti.Platform.osname =='android'
								 ?{fontSize:'17dp'}
								 :{fontSize:'15%'},//
				right : '23%',
				backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
				borderRadius:5,
				color:'#fff'
			});
		headerView.add(leftBtn);						
		headerView.add(headerLabel);
		headerView.add(emailBtn)
		headerView.add(rightBtn);
		
		summaryWindow.add(headerView);
}
/**
 * Function will create label used for row denoting name  of summary element
 * @param {Object} labelText
 * @return {Object} of label
 */
function addRowLabel (labelText) {
		  var RowLabel=Ti.UI.createLabel(
	           	{
	           		width:'auto',
	           		text:labelText,
	           		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'18dp'}
									 :{fontSize:'15%'},
	           		left:'3%',
	           		color:glblDarkGrayFont,//'#6E7B8B',
	           		top:'3%',
	           		touchEnabled:false
	           	});
     return RowLabel;      	
	}

/**
 * Function will create label used for row denoting expense value of summary element
 * @param {Object}   labelValue
 * @return {Object}  label with value
 */
function addIncomeValueLabel (labelValue) {
	
	var labelValueWithUnit='$'+labelValue;
	
	var incomeLabelValue=Ti.UI.createLabel(
           	{
           		width:'33%',
           		text:labelValueWithUnit,
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
           		right:'72%',
           		color:glblLightGrayFont,//'#6E7B8B',
           		top:'50%',
           		textAlign:'right',
           		touchEnabled:false
           	});
      return incomeLabelValue;     	
 }
 /**
  *Function will create label used for row denoting revenue value of summary element 
  * @param {Object} labelValue
  *  @return {Object}  label with value
  */
function addExpenditureValueLabel (labelValue) {
	
	var labelValueWithUnit='$'+labelValue;
  var expenditureLabelValue=Ti.UI.createLabel(
           	{
           		width:'34%',
           		text:labelValueWithUnit,
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
           		right:'36%',
           		color:glblLightGrayFont,//'#6E7B8B',
           		top:'50%',
           		textAlign:'right',
           		touchEnabled:false
           	});
    return expenditureLabelValue;       	
	}
/**
  *Function will create label used for row denoting Profit or Loss value of summary element 
  * @param {Object} labelValue
  *  @return {Object}  label with value
  */
function addProfitLossValueLabel (labelValue) {
	
      	var labelValueWithUnit='$'+labelValue;
      var profitLossLabelValue=Ti.UI.createLabel(
           	{
           		width:'33%',
           		top:'50%',
           		text:labelValueWithUnit,
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
           		right:'2%',
           		color:glblLightGrayFont,//'#6E7B8B',
           		textAlign:'right',
           		touchEnabled:false
           	});     	
	return profitLossLabelValue;
}

/**
 * Function will create (design)  Cost Groups row(Gray colored row) for i with name of Cost Group  
 * 
 * @param {Object} i will created header row for ith item
 * @return  designed Header row
 * 
 */
function createHeaderRow(i) {
			var rowHeaderExpenseLabel;
			var rowHeaderRevenueLabel;
		     var rowHeader = Ti.UI.createView({
					           id:'i'+i,
				               width:'100%', 
				               height: sectionRowHt,
				               left: 0,
				               backgroundGradient:{type:'linear',colors:['#b4b4b4','#969696'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
				           });
           var rowHeaderLabel=Ti.UI.createLabel(
           	{	text:''+CostGropsList[i].Name,
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp',fontWeight:'bold'}
								 :{fontSize:'15%',fontWeight:'bold'},
				top:'1%',
				color:'white',
				left:'3%',
				width:'90%',				
           		touchEnabled:false
           	});
            rowHeader.add(rowHeaderLabel);
     		if(CostGropsList[i].HasExpense == 1)
     		{
     	 	rowHeaderExpenseLabel=Ti.UI.createLabel(
           		{
           		text:'Expense',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
				color:'white',
				top:'50%',
				right:'2%',
           		touchEnabled:false,
           		textAlign:'right',
           		});
           
           rowHeader.add(rowHeaderExpenseLabel);
           		 
     		}
     		if(CostGropsList[i].HasRevenue == 1 )
     		{
     	rowHeaderRevenueLabel=Ti.UI.createLabel(
           		{
           		text:'Revenue',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'14dp'}
								 :{fontSize:'12%'},
				color:'white',
				top:'50%',
				right:'2%',
				textAlign:'right',
           		touchEnabled:false
           		});
           	 rowHeader.add(rowHeaderRevenueLabel);
     		}
     		if(CostGropsList[i].HasExpense == 1 && CostGropsList[i].HasRevenue == 1)
     		{
     			rowHeaderExpenseLabel.right='35%';
     			rowHeaderRevenueLabel.right='2%';
     		}
     		 return rowHeader;
         }
         
/**
 * Function will create (design)  Cost element row(white colored row) for i with name of Cost element and corresponding values
 * @param {Object} i
 * @return cost element row
 */
function createRow(i) {
		   var row = Ti.UI.createView({
                backgroundColor:'#fff',
               borderColor: glblLightGrayFont,
               borderWidth: 1,     
               width:'100%', 
               height: rowHt,
               left: 0,
               id:'i'+i,
           });
            var rowLabel=Ti.UI.createLabel(
           	{
           		width:'70%',
           		height:'100%',
           		text:''+CostElementList[i].Name,
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
           		left:'3%',
           		color:glblDarkGrayFont,//'#6E7B8B',
           		touchEnabled:false
           	});
            
             row.add(rowLabel);
          	var valueLabel=Ti.UI.createLabel(
					{
						width:'30%',
						text:'$ '+accounting.formatMoney(parseFloat(CostElementList[i].value).toFixed(2)),
						textAlign:'right',
						font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
						right:'2%',
						color:glblLightGrayFont
					});
					
			row.add(valueLabel);	
			
            return row;
         }
         
 /**
  * Function will create (design)  Dwelling row(white colored row) for i with name of Dwellings and corresponding values
  * @param {Object} i
  * @return dwelling row
  */        
function createDwellingRow(i) {
	
	var expense = accounting.formatMoney(DwellingList[i].Expense);
   	var revenue = accounting.formatMoney(DwellingList[i].Revenue);
	   var row = Ti.UI.createView({
			        backgroundColor:'#fff',
			        borderColor: glblLightGrayFont,
			        borderWidth: 1,     
			        width:'100%', 
			        height: rowHt,
			        left: 0,
			        id:'i'+i,
       			});
    var rowLabel=Ti.UI.createLabel(
    	{
		    		width:'60%',
		    		height:'100%',
		    		text:''+DwellingList[i].Name,
		    		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'18dp'}
									 :{fontSize:'15%'},
		    		left:'3%',
		    		color:glblDarkGrayFont,//'#6E7B8B',
		    		touchEnabled:false
		    	});
		     
      row.add(rowLabel);
   	var ExpenseLabel=Ti.UI.createLabel(
				{
					width:'30%',
					//text:'$'+parseFloat(DwellingList[i].Expense).toFixed(2),
					text:'$'+expense,
					textAlign:'right',
					font:Ti.Platform.osname =='android' 
							 ?{fontSize:'18dp'}
							 :{fontSize:'15%'},
					right:'33%',
					top:'60%',
					color:glblLightGrayFont
				});
				
		row.add(ExpenseLabel);
	var RevenueLabel=Ti.UI.createLabel(
					{
						width:'30%',
						top:'60%',
						textAlign:'right',
						font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
						right:'2%',
						//text:'$'+DwellingList[i].Revenue.toFixed(2),
						text:'$'+revenue,
						color:glblLightGrayFont
					});
					
	    row.add(RevenueLabel);			
	
     return row;
   }
   
   /**
  * Function will create (design)  Dwelling row(white colored row) for i with name of Dwellings and corresponding values
  * @param {Object} i
  * @return dwelling row
  */        
function createVacantLandRow(i) {
	var revenue = accounting.formatMoney(VacantLandList[i].Revenue);
	   var row = Ti.UI.createView({
			        backgroundColor:'#fff',
			        borderColor: glblLightGrayFont,
			        borderWidth: 1,     
			        width:'100%', 
			        height: rowHt,
			        left: 0,
			        id:'i'+i,
       			});
    var rowLabel=Ti.UI.createLabel(
    	{
		    		width:'60%',
		    		height:'100%',
		    		text:''+VacantLandList[i].Name,
		    		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'18dp'}
									 :{fontSize:'15%'},
		    		left:'3%',
		    		color:glblDarkGrayFont,//'#6E7B8B',
		    		touchEnabled:false
		    	});
		     
      row.add(rowLabel);
   	/*var ExpenseLabel=Ti.UI.createLabel(
				{
					width:'30%',
					text:'$'+parseFloat(DwellingList[i].Expense).toFixed(2),
					textAlign:'right',
					font:Ti.Platform.osname =='android' 
							 ?{fontSize:'18dp'}
							 :{fontSize:'15%'},
					right:'33%',
					top:'60%',
					color:glblLightGrayFont
				});
				
		row.add(ExpenseLabel);*/
	var RevenueLabel=Ti.UI.createLabel(
					{
						width:'30%',
						//top:'60%',
						textAlign:'right',
						font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
						right:'2%',
						//text:'$'+VacantLandList[i].Revenue.toFixed(2),
						text:'$'+revenue,
						color:glblLightGrayFont
					});
					
	    row.add(RevenueLabel);			
	    
	
     return row;
   }

	summaryWindow.add(actInd);		

 return summaryWindow;   
}        
module.exports=OpenSummaryWin;