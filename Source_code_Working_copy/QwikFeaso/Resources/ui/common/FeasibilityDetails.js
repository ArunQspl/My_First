/**
 * @projectDescription QwikFeaso
 * 
 * @author Shreyas Bhondve(shreyas.bhondve@quagnitia.com)
 * 
 * @version 1.0
 */

/**
 *Function will create Summary Window to display generated summary
 * 
 */
function OpenSummaryWin (feasID) {
var userName = Titanium.App.Properties.getString("username");  
var summaryWindow;
var CostGropsList=[];
var CostElementList=[];
var DwellingList=[];
var accounting;
var scrollView;
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
  	accounting=require('/lib/accounting');
  	Ti.include('/ui/common/GenerateHTML.js');
  	Ti.include('/services/ACSTransactions.js')
  	//Window Created for Android
  	 summaryWindow=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
  				
	 setHeader(); 		
	 leftBtn.addEventListener('click',function(e){
	 		btnSelector(leftBtn);
	 	summaryWindow.close();
	 	});
	 	
	 	rightBtn.addEventListener('singletap',function(e)
		{
			btnSelector(rightBtn);
			sendFeasibilityDetailsEmail();
		
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
		 	btnSelector(BackBtn);
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
		  var RightBtn = Ti.UI.createButton({
			      title : 'Email',
			      height : '30dp',
			      width : '80dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			  });
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);
		  	sendFeasibilityDetailsEmail();
		  });
		  rightView.add(RightBtn);
		  summaryWindow.rightNavButton=rightView;
		  
 }
	summaryWindow.orientationModes=[Ti.UI.PORTRAIT];
	
var rowHt=(Ti.Platform.displayCaps.platformHeight*13)/100;
var sectionRowHt=(Ti.Platform.displayCaps.platformHeight*7)/100;	
var summary = [];
summary = getFinalSummary(feasID);


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
				CreateStaticView();
				CostGropsList=GetSummaryCostGroups();
		var isDwellingAdded=0;	
		var isVacantLandAdded=0;	
		var isOptionalConstructionCostIncluded=0;				
		for(var j=0;j< CostGropsList.length;j++)
		{
			var CostGrpName=CostGropsList[j].Name;
			var headerRow=createHeaderRow(j);
			//scrollView.add(headerRow);
			
			if(CostGropsList[j].CostGroupID == 16){
				scrollView.add(headerRow);
				for(var i = 0; i <summary.length; i++)
					{
						if(CostGropsList[j].CostGroupID == summary[i].CGID && CostGropsList[j].CostGroupID == 16)
						{
									var exp = '';
						       		exp = summary[i].Expense;
						       		if(exp != '')
						       			exp = accounting.formatMoney(exp);
									var rev = '';
						       		rev = summary[i].Revenue;
						       		if(rev != '')
						       			rev = accounting.formatMoney(rev);
						       			
						       		
						       		isDwellingAdded++;
						       	
									var roww = createDwellingRow(i,summary[i].Name,exp,rev);
						    		scrollView.add(roww);
						}
					}
					
				if(isDwellingAdded == 0){
					scrollView.remove(headerRow);///Will remove header of dwelling if no dwellings are added under it
				}
				
			}
			else if(CostGropsList[j].CostGroupID == 17){
				
				scrollView.add(headerRow);
				for(var i = 0; i <summary.length; i++)
					{
						if(CostGropsList[j].CostGroupID == summary[i].CGID && CostGropsList[j].CostGroupID == 17)
						{
									var exp = '';
						       		exp = summary[i].Expense;
						       		if(exp != '')
						       			exp = accounting.formatMoney(exp);
									var rev = '';
						       		rev = summary[i].Revenue;
						       		if(rev != '')
						       			rev = accounting.formatMoney(rev);
						       			
						       		
						       		isVacantLandAdded++;
						       	
									var roww = createVacantLandRow(i,summary[i].Name,exp,rev);
						    		scrollView.add(roww);
						}
					}
					
				if(isVacantLandAdded == 0){
					scrollView.remove(headerRow);///Will remove header of dwelling if no dwellings are added under it
				}
				
			}
			else{
				scrollView.add(headerRow);
				if(CostGropsList[j].CostGroupID === 8)
						{
							for(var i = 0; i <summary.length; i++)
								 {
										if(CostGropsList[j].CostGroupID == summary[i].CGID && (CostGropsList[j].CostGroupID != 17 || CostGropsList[j].CostGroupID != 16))
											{		
												if(CostGropsList[j].HasExpense == 1 )
											       	{
											       		var exp = '';
											       		exp = summary[i].Expense;
											       		if(exp != '')
											       			exp = accounting.formatMoney(exp);
											       		var roww = createRow(i,accounting.formatMoney(exp));
											       		scrollView.add(roww);
											       	}
											       	else if(CostGropsList[j].HasRevenue == 1 )
											       	{
											       		var rev = '';
											       		rev = summary[i].Revenue;
											       		if(rev != '')
											       			rev = accounting.formatMoney(rev);
											       		var roww = createRow(i,accounting.formatMoney(rev));
											       		scrollView.add(roww);
											       	}	
											isOptionalConstructionCostIncluded+=1;
										}
									}
								if(isOptionalConstructionCostIncluded === 0)
											scrollView.remove(headerRow);///Will remove header of Optional construction cost  if no cost element are added under it
						}
						else
						{
							for(var i = 0; i <summary.length; i++)
								{	
									if(CostGropsList[j].CostGroupID == summary[i].CGID && (CostGropsList[j].CostGroupID != 17 || CostGropsList[j].CostGroupID != 16))
									{
										if(CostGropsList[j].HasExpense == 1 )
									       	{
									       		var exp = '';
									       		exp = summary[i].Expense;
									       		if(exp != '')
									       			exp = accounting.formatMoney(exp);
									       		var roww = createRow(i,accounting.formatMoney(exp));
									       		scrollView.add(roww);
									       	}
									       	else if(CostGropsList[j].HasRevenue == 1 )
									       	{
									       		var rev = '';
									       		rev = summary[i].Revenue;
									       		if(rev != '')
									       			rev = accounting.formatMoney(rev);
									       		var roww = createRow(i,accounting.formatMoney(rev));
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
							for(var i = 0; i <summary.length; i++)
								 {
										if(CostGropsList[j].CostGroupID == summary[i].CGID)
											{		
												if(CostGropsList[j].HasExpense == 1 )
											       	{
											       		var exp = '';
											       		exp = summary[i].Expense;
											       		if(exp != '')
											       			exp = accounting.formatMoney(exp);
											       		var roww = createRow(i,accounting.formatMoney(exp));
											       		scrollView.add(roww);
											       	}
											       	else if(CostGropsList[j].HasRevenue == 1 )
											       	{
											       		var rev = '';
											       		rev = summary[i].Revenue;
											       		if(rev != '')
											       			rev = accounting.formatMoney(rev);
											       		var roww = createRow(i,accounting.formatMoney(rev));
											       		scrollView.add(roww);
											       	}	
											isOptionalConstructionCostIncluded+=1;
										}
									}
								if(isOptionalConstructionCostIncluded === 0)
											scrollView.remove(headerRow);///Will remove header of Optional construction cost  if no cost element are added under it
						}
						else
						{
							for(var i = 0; i <summary.length; i++)
								{	
									if(CostGropsList[j].CostGroupID == summary[i].CGID)
									{
										if(CostGropsList[j].HasExpense == 1 )
									       	{
									       		var exp = '';
									       		exp = summary[i].Expense;
									       		if(exp != '')
									       			exp = accounting.formatMoney(exp);
									       		var roww = createRow(i,accounting.formatMoney(exp));
									       		scrollView.add(roww);
									       	}
									       	else if(CostGropsList[j].HasRevenue == 1 )
									       	{
									       		var rev = '';
									       		rev = summary[i].Revenue;
									       		if(rev != '')
									       			rev = accounting.formatMoney(rev);
									       		var roww = createRow(i,accounting.formatMoney(rev));
									       		scrollView.add(roww);
									       	}
									       	
									}
								}
								
								
											
						}
			}
			else
			{
				for(var i = 0; i <summary.length; i++)
					{
						if(CostGropsList[j].CostGroupID == summary[i].CGID)
						{
									var exp = '';
						       		exp = summary[i].Expense;
						       		if(exp != '')
						       			exp = accounting.formatMoney(exp);
									var rev = '';
						       		rev = summary[i].Revenue;
						       		if(rev != '')
						       			rev = accounting.formatMoney(rev);
						       			
						       		if(CostGropsList[j].CostGroupID == 16){
						       			isDwellingAdded++;
						       		}	
						       		
									var roww = createDwellingRow(i,summary[i].Name,exp,rev);
						    		scrollView.add(roww);
						}
					}
					
				if(isDwellingAdded == 0){
					Ti.API.info('removing header');
					scrollView.remove(headerRow);///Will remove header of dwelling if no dwellings are added under it
				}
				
			}*/

			
		}
					 
		summaryWindow.add(scrollView);		
		
		actInd.hide();
		summaryWindow.remove(actvityIndicatorView);
	},100);
	
});	

/*
 * send feasibility/summary by mail 
 */

function sendFeasibilityDetailsEmail () {
	
	var html = generateFeasibilityDetailsHTMLDoc(feasID);
	var isNW_AVAILABLE = isNetworkAvailable();
	if(Ti.Platform.osname == 'android')
		Ti.App.QwikFeasoGlobalVars.isNWAvailable = isNW_AVAILABLE;
			
	if(isNW_AVAILABLE){
		sendFeasibilityResult(userName,html);
	}
	else{
		if(Ti.Platform.osname === 'iPad' || Ti.Platform.osname === 'iPhone')
			alert('There is presently no Internet Access which QwikFeaso needs in order to work.');
	}
	
	/**
	 * check network
	 */
	/*if(Titanium.Network.networkType !== Titanium.Network.NETWORK_NONE){
		sendFeasibilityResult(userName,html);
	}
	else{
		if(Ti.Platform.osname === 'iPad' || Ti.Platform.osname === 'iPhone')
			alert('There is presently no Internet Access which QwikFeaso needs in order to work.');
	}*/
}

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
           		text:'Profit/ Loss',
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

	var profitRowLabelValue=Ti.UI.createLabel(
           	{
           		width:'auto',
           		text:''+parseFloat(summary[0].PL).toFixed(2),
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
           		right:'10%',
           		color:glblLightGrayFont,//'#6E7B8B',
           		touchEnabled:false
           	});
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
           		text:'Deal/ No Deal',
           		font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
           		left:'3%',
           		color:glblDarkGrayFont,//'#6E7B8B',
           		touchEnabled:false
           	});
           	
	var thumbImageView=Ti.UI.createImageView(
			{
				width:'10%',
				height:'60%',
				image:globalImgPath+'thumbsdown.png',
				right:'35%'		
			});
	thumbImageView.image=summary[0].DND == 'No Deal'?globalImgPath+'thumbsdown.png':globalImgPath+'thumbsup.png'; 
	var dealNoDealRowLabelValue=Ti.UI.createLabel(
           	{
           		width:'auto',
           		text:''+summary[0].DND,
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
	
	var PwithoutFundingIncome=addIncomeValueLabel(''+accounting.formatMoney(parseInt(summary[1].Expense,10).toFixed(0)))
	
	var PwithoutFundingExpenditure=addExpenditureValueLabel(''+accounting.formatMoney(parseInt(summary[1].Revenue,10).toFixed(0)));
           	
	var PwithoutFundingProfitLoss=addProfitLossValueLabel(''+accounting.formatMoney(parseInt(summary[1].ProfitLoss,10).toFixed(0)));
   

		PwithoutFundingRow.add(PwithoutFundingRowLabel);
		PwithoutFundingRow.add(PwithoutFundingIncome);
		PwithoutFundingRow.add(PwithoutFundingExpenditure);
		PwithoutFundingRow.add(PwithoutFundingProfitLoss);
	
staticView.add(PwithoutFundingRow);
//====================PwithoutFundingRow end  ==========

///=============total funding cost

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
	
	var TotalFundingCostIncome=addIncomeValueLabel(''+accounting.formatMoney(parseInt(summary[2].Expense,10).toFixed(0)));
	
    var TotalFundingCostExpenditure=addExpenditureValueLabel(''+accounting.formatMoney(parseInt(summary[2].Revenue,10).toFixed(0)));  
           	
    var TotalFundingCostProfitLoss=addProfitLossValueLabel(''+accounting.formatMoney(parseInt(summary[2].ProfitLoss,10).toFixed(0))); 
	
		TotalFundingCostRow.add(TotalFundingCostRowLabel);
		TotalFundingCostRow.add(TotalFundingCostIncome);
		TotalFundingCostRow.add(TotalFundingCostExpenditure);
		TotalFundingCostRow.add(TotalFundingCostProfitLoss);

	staticView.add(TotalFundingCostRow);
	
///=============total funding cost end=========================
//=====================TotalProfitOfDealRow start==============
	
    
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
	
	var TotalProfitOfDealRowIncome=addIncomeValueLabel(''+accounting.formatMoney(parseInt(summary[3].Expense,10).toFixed(0))); 
	
    var TotalProfitOfDealRowExpenditure=addExpenditureValueLabel(''+accounting.formatMoney(parseInt(summary[3].Revenue,10).toFixed(0))); 
           	
    var TotalProfitOfDealRowProfitLoss=addProfitLossValueLabel(''+accounting.formatMoney(parseInt(summary[3].ProfitLoss,10).toFixed(0))); 
	
		TotalProfitOfDealRow.add(TotalProfitOfDealRowRowLabel);
		TotalProfitOfDealRow.add(TotalProfitOfDealRowIncome);
		TotalProfitOfDealRow.add(TotalProfitOfDealRowExpenditure);
		TotalProfitOfDealRow.add(TotalProfitOfDealRowProfitLoss);
	
	staticView.add(TotalProfitOfDealRow);
	
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
		leftBtn.title='Back';
		rightBtn.title='Email';
		rightBtn.width=Ti.Platform.osname =='android'?'27%':'23%',
		rightBtn.font=Ti.Platform.osname =='android'?{fontSize:'17dp'}:{fontSize:'15%'};
		headerView.add(leftBtn);	
		headerView.add(rightBtn);					
		headerView.add(headerLabel);
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
									 ?{fontSize:'16dp'}
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
				width:'70%',				
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
function createRow(i,val) {
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
           		text:''+summary[i].Name,
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
						text:'$ '+val,
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
function createVacantLandRow(i,name,exp,rev) {
	var revenue = accounting.formatMoney(rev);
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
		    		text:name,
		    		font:Ti.Platform.osname =='android' 
									 ?{fontSize:'18dp'}
									 :{fontSize:'15%'},
		    		left:'3%',
		    		color:glblDarkGrayFont,//'#6E7B8B',
		    		touchEnabled:false
		    	});
		     
      row.add(rowLabel);
   /*	var ExpenseLabel=Ti.UI.createLabel(
				{
					width:'30%',
					text:'$ '+exp,
					textAlign:'right',
					font:Ti.Platform.osname =='android' 
							 ?{fontSize:'18dp'}
							 :{fontSize:'15%'},
					right:'33%',
					color:glblLightGrayFont,
					top:'60%',
				});
				
		row.add(ExpenseLabel);*/
	var RevenueLabel=Ti.UI.createLabel(
					{
						width:'30%',
						textAlign:'right',
						font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
						right:'2%',
						//text:'$ '+rev,
						text:'$ '+revenue,
						color:glblLightGrayFont,
					});
					
	    row.add(RevenueLabel);			
	
     return row;
   }
   
   function createDwellingRow(i,name,exp,rev) {
   	
   	var expense = accounting.formatMoney(exp);
   	var revenue = accounting.formatMoney(rev);
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
		    		text:name,
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
					//text:'$ '+exp,
					text:'$ '+expense,
					textAlign:'right',
					font:Ti.Platform.osname =='android' 
							 ?{fontSize:'18dp'}
							 :{fontSize:'15%'},
					right:'33%',
					color:glblLightGrayFont,
					top:'60%',
				});
				
		row.add(ExpenseLabel);
	var RevenueLabel=Ti.UI.createLabel(
					{
						width:'30%',
						textAlign:'right',
						font:Ti.Platform.osname =='android' 
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
						right:'2%',
						//text:'$ '+rev,
						text:'$ '+revenue,
						color:glblLightGrayFont,
						top:'60%',
					});
					
	    row.add(RevenueLabel);			
	
     return row;
   }



	
summaryWindow.add(actInd);
 return summaryWindow;   
}        
module.exports=OpenSummaryWin;