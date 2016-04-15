function generateHTMLDoc(){
	/*
  	 * Include the files needed for UI Design and Database usage
  	 * Header.js will manage navigation for android
  	 */
	var accounting;
	if(Ti.Platform.osname == 'android') // android specific code
  	{
	  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
		Ti.include('/services/DataBaseTransaction.js')	
		Ti.include('/services/GetFromDataBase.js')	
	}
	accounting=require('/lib/accounting');
	var count = 0;
	
		
	/******************* Generate a compact Summary/Result using all four tables used for Calculations***********************/
	
	var summaryStaticData = [];
	summaryStaticData = getSummary();
	  	
	var tempResultSummary = [];
	tempResultSummary = getTempSummaryResult();
	
	var fundingCostResult = [];
	fundingCostResult = getFundingCostResult();
	
	var userAddedDwelling = [];
	userAddedDwelling = getUserAddedDwelling();
	
	////////////////////
	var userAddedVacantLand = [];
	userAddedVacantLand = getUserAddedVacantLand();
	///////////////////
	var compactSummary = [];
	
	var profit_lossTxt = summaryStaticData[0].Name;
	var profit_Loss = summaryStaticData[0].ProfitLoss;
	profit_Loss = (parseFloat(profit_Loss)).toFixed(2);
	
	var deal_nodealTxt = summaryStaticData[1].Name;
	var deal_nodealVal = summaryStaticData[1].ProfitLoss;
	
		
	for(var i=2;i<summaryStaticData.length;i++)
	{
		var name = summaryStaticData[i].Name;
		var expense = summaryStaticData[i].Expense;
		if(expense != '')
			expense = (parseFloat(summaryStaticData[i].Expense)).toFixed(2);
		var revenue = summaryStaticData[i].Revenue;
		if(revenue != '')
			revenue = (parseFloat(summaryStaticData[i].Revenue)).toFixed(2);
		var profitLoss = summaryStaticData[i].ProfitLoss;
		if(profitLoss != '')
			profitLoss = (parseFloat(summaryStaticData[i].ProfitLoss)).toFixed(2);
		compactSummary.push({
					Name:name,
					Expense:expense,
					Revenue:revenue,
					ProfitLoss:profitLoss,
					CEID:'',
					CGID:'',
				});
	}		
	
	for(var i=0;i<tempResultSummary.length;i++)
	{
		var name = tempResultSummary[i].Name;
		var expense = tempResultSummary[i].Expense;
		if(expense != '')
			expense = (parseFloat(tempResultSummary[i].Expense)).toFixed(2);
		var revenue = tempResultSummary[i].Revenue;
		if(revenue != '')
			revenue = (parseFloat(tempResultSummary[i].Revenue)).toFixed(2);
		var profitLoss = tempResultSummary[i].ProfitLoss;
		if(profitLoss != '')
			profitLoss = (parseFloat(tempResultSummary[i].ProfitLoss)).toFixed(2);
		compactSummary.push({
					Name:name,
					Expense:expense,
					Revenue:revenue,
					ProfitLoss:profitLoss,
					CEID:tempResultSummary[i].CEID,
					CGID:tempResultSummary[i].CDID,
				});
	}
	
	for(var i=0;i<fundingCostResult.length;i++)
	{
		var name = fundingCostResult[i].Name;
		var expense = fundingCostResult[i].Expense;
		if(expense != '')
			expense = (parseFloat(fundingCostResult[i].Expense)).toFixed(2);
		var revenue = fundingCostResult[i].Revenue;
		if(revenue != '')
			revenue = (parseFloat(fundingCostResult[i].Revenue)).toFixed(2);
		var profitLoss = fundingCostResult[i].ProfitLoss;
		if(profitLoss != '')
			profitLoss = (parseFloat(fundingCostResult[i].ProfitLoss)).toFixed(2);
		compactSummary.push({
					Name:name,
					Expense:expense,
					Revenue:revenue,
					ProfitLoss:profitLoss,
					CEID:fundingCostResult[i].CEID,
					CGID:fundingCostResult[i].CDID,
				});
	}
	
	for(var i=0;i<userAddedDwelling.length;i++)
	{
		var name = userAddedDwelling[i].Name;
		var expense = userAddedDwelling[i].Expense;
		if(expense != '')
			expense = (parseFloat(userAddedDwelling[i].Expense)).toFixed(2);
		var revenue = userAddedDwelling[i].Revenue;
		if(revenue != '')
			revenue = (parseFloat(userAddedDwelling[i].Revenue)).toFixed(2);
		var profitLoss = userAddedDwelling[i].ProfitLoss;
		if(profitLoss != '')
			profitLoss = (parseFloat(userAddedDwelling[i].ProfitLoss)).toFixed(2);
		compactSummary.push({
					Name:name,
					Expense:expense,
					Revenue:revenue,
					ProfitLoss:profitLoss,
					CEID:'',
					CGID:'16',
				});
	}
	
	for(var i=0;i<userAddedVacantLand.length;i++)
	{
		var name = userAddedVacantLand[i].Name;
		var expense = userAddedVacantLand[i].Expense;
		if(expense != '')
			expense = (parseFloat(userAddedVacantLand[i].Expense)).toFixed(2);
		var revenue = userAddedVacantLand[i].Revenue;
		if(revenue != '')
			revenue = (parseFloat(userAddedVacantLand[i].Revenue)).toFixed(2);
		var profitLoss = userAddedVacantLand[i].ProfitLoss;
		if(profitLoss != '')
			profitLoss = (parseFloat(userAddedVacantLand[i].ProfitLoss)).toFixed(2);
		compactSummary.push({
					Name:name,
					Expense:expense,
					Revenue:revenue,
					ProfitLoss:profitLoss,
					CEID:'',
					CGID:'17',
				});
	}
	
	storeCompactSummary(compactSummary,profit_Loss,deal_nodealVal);
	var sb = new StringBuilder();
	sb.append("<div class='tab'>");
	sb.append("<table border='1' cellspacing='0' cellpadding='4' align = 'center' style='font:normal 14px arial;'>");
			
			sb.append("<tr class='summary'>");
	    	sb.append("<td colspan='3' class='summary' bgcolor = '#6d6e6f' align = 'center'><font face='Arial' color='white'><b>Feasibility Results</b></font>");
 			sb.append("</td>");
	  		sb.append("</tr>");
	  		
	  		
	  		
			/******************** Static Data *******************/
			sb.append("<tr >");
				sb.append("<td>Deal / No Deal</td>");
				sb.append("<td colspan='2' align = 'center'>"+deal_nodealVal+"</td>");
			sb.append("</tr>");
			
			
			sb.append("<tr >");
				sb.append("<td>Profit / Loss - Percentage</td>");
				if(profit_Loss<0)
					sb.append("<td align='right' colspan='2'><font face='Arial' color='red' >"+profit_Loss+" %"+"</font></td>");
				else	
					sb.append("<td align='right' colspan='2'><font face='Arial' color='black' >"+profit_Loss+" %"+"</font></td>");
				//sb.append("<td align='right'>"+"<font face='Arial' color='red' >($"+accounting.formatMoney(totalProfit)+")"+"</font>"+"</td>");
			sb.append("</tr>");
			/****************************************************/
			
			
			/********************* Sub Header for table****************/
			sb.append("<tr class = 'parameter' bgcolor = '#82b939' align = 'center'>");
				sb.append("<td class = 'parameter' ><font face='Arial' color='white' ><b>Parameter</b></font></td>");
				sb.append("<td class = 'parameter' colspan='2'><font face='Arial' color='white' ><b>Expense/Revenue</b></font></td>");
			sb.append("</tr>");
			/****************************************************/
			
			
			
			/********************* Feasibility Summary for Cost Groups 1 to 6 **************************/
			sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
			sb.append("<td class = 'parameter' >");
			sb.append("<font face='Arial' color='white' ><b>Profitability</b></font></td>");
			sb.append("</td>");
			var totalProfitability = compactSummary[2].ProfitLoss;
			totalProfitability = accounting.formatMoney(totalProfitability);
			if(expense === '0')
				sb.append("<td align='right'><font face='Arial' color='black' >$0</font></td>");
			else	
				sb.append("<td align='right'>"+"<font face='Arial' color='white' ><b>"+"$"+totalProfitability+"</b></font>"+"</td>");
			sb.append("</tr>");
			
			for(var i=0;i<2;i++){
					sb.append("<tr class = 'parameter'>");
					sb.append("<td>"+compactSummary[i].Name+"</td>");
					var exp = compactSummary[i].Expense;
					exp = accounting.formatMoney(exp);
					if(exp === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' >"+"($"+exp+")"+"</font>"+"</td>");
					sb.append("</tr>");
					
			}
			
			sb.append("<tr class = 'parameter'>");
			sb.append("<td>"+compactSummary[2].Name+"</td>");
			var rev = compactSummary[2].Revenue;
			rev = accounting.formatMoney(rev);
			if(rev === '0')
				sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
			else	
				sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black' >"+"$"+rev+"</font>"+"</td>");
			sb.append("</tr>");
			
			var CostGropsList = [];
			
			//Headers
			CostGropsList=[{CostGroupID:1,Name:'Purchasing Costs'},
						{CostGroupID:3,Name:'Existing Dwelling (If Any)'},
						//{CostGroupID:4,Name:'Development Phase'},
						{CostGroupID:4,Name:'Design Phase'},
						{CostGroupID:5,Name:'Pre Construction Phase'},
						{CostGroupID:6,Name:'Construction Cost Per Dwelling'},
						{CostGroupID:7,Name:'Construction Phase'},
						{CostGroupID:8,Name:'Optional Construction Costs'},
						{CostGroupID:9,Name:'Post Construction Phase'},
						{CostGroupID:10,Name:'Contingency'},
						{CostGroupID:11,Name:'Sales Costs'},
			];
			
			var ceForSummary = [];
			ceForSummary = GetCostElementLength();
			
			for(var i=0;i<5;i++)
			{
				var CostGrpName = CostGropsList[i].Name;
				var expense = 0;
				var revenue = 0;
				for(var p=0;p<ceForSummary.length;p++){
					for(q=0;q<compactSummary.length;q++){
						if((compactSummary[q].CGID === CostGropsList[i].CostGroupID) && (compactSummary[q].CEID === ceForSummary[p].CostElementID)){
							if(compactSummary[q].Expense !== '')
								expense = expense + parseInt(compactSummary[q].Expense);
								
							if(compactSummary[q].Revenue !== '')	
								revenue = revenue + parseInt(compactSummary[q].Revenue);
						}
					}
				}
				expense = accounting.formatMoney(expense);
				revenue = accounting.formatMoney(revenue);
				if(CostGropsList[i].CostGroupID == 3){
					sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
					sb.append("<td class = 'parameter' >");
					sb.append("<font face='Arial' color='white' ><b>"+CostGrpName+"</b></font></td>");
					sb.append("</td>");
					if(revenue === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='white' ><b>$0</b></font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white' ><b>"+"$"+revenue+"<b></font>"+"</td>");
				}
				else{
					sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
					sb.append("<td class = 'parameter' >");
					sb.append("<font face='Arial' color='white' ><b>"+CostGrpName+"</b></font></td>");
					sb.append("</td>");
					if(expense === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='white' ><b>$0</b></font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' ><b>"+"($"+expense+")"+"</b></font>"+"</td>");
				}
				sb.append("</tr>");
					
						for(var j=0;j<ceForSummary.length;j++)
						{
							if(CostGropsList[i].CostGroupID == ceForSummary[j].CostGrpID){
								sb.append("<tr>");
								sb.append("<td>"+ceForSummary[j].Name+"</td>");
								for(k=0;k<compactSummary.length;k++){
									
									if(ceForSummary[j].CostElementID == compactSummary[k].CEID){
										var exp = compactSummary[k].Expense;
										var rev = compactSummary[k].Revenue;
										
										if(rev === '')
										{
											exp = accounting.formatMoney(exp);
											if(exp === '0')
												sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
											else	
												sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' >"+"($"+exp+")"+"</font>"+"</td>");
										}
										else if(exp === '')
										{
												
											rev = accounting.formatMoney(rev);
											if(rev === '0')
												sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
											else	
												sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black' >"+"$"+rev+"</font>"+"</td>");
										}
									}
										
								}	
								sb.append("</tr>");
							}
							
					 }
			
			}


			/******************* User added Dwellings - expenses************************/			
			var dwellingsAdded = false;
			
			var expense = 0;
			var revenue = 0;
			for(var i=0;i<compactSummary.length;i++){
				if(compactSummary[i].CGID == 16){
					dwellingsAdded = true;
					expense = expense + parseInt(compactSummary[i].Expense);
					revenue = revenue + parseInt(compactSummary[i].Revenue);
				}
			}
			
			if(dwellingsAdded){
				
				sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
				sb.append("<td class = 'parameter' >");
				sb.append("<font face='Arial' color='white' ><b>Dwellings - Cost to construct</b></font></td>");
				sb.append("</td>");
				expense = accounting.formatMoney(expense);
				if(expense === '0')
					sb.append("<td colspan='2' align='right'><font face='Arial' color='white' ><b>$0</b></font></td>");
				else	
					sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' ><b>"+"($"+expense+")"+"</b></font>"+"</td>");
				sb.append("</tr>");
			
			}
			
			
			for(k=0;k<compactSummary.length;k++){
										
				if(compactSummary[k].CGID == 16){
							
					sb.append("<tr>");
					sb.append("<td>"+compactSummary[k].Name+"</td>");
					var exp = compactSummary[k].Expense;
					exp = accounting.formatMoney(exp);
					if(exp === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' >"+"($"+exp+")"+"</font>"+"</td>");
					
				}
				sb.append("</tr>");					
			}
			/****************************************************/
			
			
			/****************** User added Dwellings - Revenue ****************************/
			if(dwellingsAdded){
				sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
				sb.append("<td class = 'parameter' >");
				sb.append("<font face='Arial' color='white' ><b>Dwellings - Income from Sales</b></font></td>");
				sb.append("</td>");
				revenue = accounting.formatMoney(revenue);
				if(revenue === '0')
					sb.append("<td colspan='2' align='right'><font face='Arial' color='white' ><b>$0</b></font></td>");
				else	
					sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white' ><b>"+"$"+revenue+"</b></font>"+"</td>");
				sb.append("</tr>");
			
			}
			
			
			for(k=0;k<compactSummary.length;k++){
										
				if(compactSummary[k].CGID == 16){
							
					sb.append("<tr>");
					sb.append("<td>"+compactSummary[k].Name+"</td>");
					var rev = compactSummary[k].Revenue;
					rev = accounting.formatMoney(rev);
					if(rev === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black' >"+"$"+rev+"</font>"+"</td>");
					
				}
				sb.append("</tr>");					
			}	
			/****************************************************/	
			
			/****************** User added Vacant Land - Revenue ****************************/
			var vacantLandAdded = false;
			
			var expense = 0;
			var revenue = 0;
			for(var i=0;i<compactSummary.length;i++){
				if(compactSummary[i].CGID == 17){
					vacantLandAdded = true;
					expense = expense + parseInt(compactSummary[i].Expense);
					revenue = revenue + parseInt(compactSummary[i].Revenue);
				}
			}
			
			if(vacantLandAdded){
				sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
				sb.append("<td class = 'parameter' >");
				sb.append("<font face='Arial' color='white' ><b>Vacant Land - Income from Sales</b></font></td>");
				sb.append("</td>");
				revenue = accounting.formatMoney(revenue);
				if(revenue === '0')
					sb.append("<td colspan='2' align='right'><font face='Arial' color='white' ><b>$0</b></font></td>");
				else	
					sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white' ><b>"+"$"+revenue+"</b></font>"+"</td>");
				sb.append("</tr>");
			
			}
			
			
			for(k=0;k<compactSummary.length;k++){
										
				if(compactSummary[k].CGID == 17){
							
					sb.append("<tr>");
					sb.append("<td>"+compactSummary[k].Name+"</td>");
					var rev = compactSummary[k].Revenue;
					rev = accounting.formatMoney(rev);
					if(rev === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black' >"+"$"+rev+"</font>"+"</td>");
					
				}
				sb.append("</tr>");					
			}	
			/****************************************************/	
			
			
			/*************** Feasibility Summary for Cost Groups 7 onwards************************/
			for(var i=5;i<CostGropsList.length;i++){
				var CostGrpName = CostGropsList[i].Name;
				var dwellingAdded = false;
				var expense = 0;
				var revenue = 0;
				for(var p=0;p<ceForSummary.length;p++){
					for(q=0;q<compactSummary.length;q++){
						if((compactSummary[q].CGID === CostGropsList[i].CostGroupID) && (compactSummary[q].CEID === ceForSummary[p].CostElementID)){
							if(compactSummary[q].CGID == 8)
								dwellingAdded = true;
							
							if(compactSummary[q].Expense !== '')
								expense = expense + parseInt(compactSummary[q].Expense);
								
							if(compactSummary[q].Revenue !== '')	
								revenue = revenue + parseInt(compactSummary[q].Revenue);
						}
					}
				}
				
				expense = accounting.formatMoney(expense);
				revenue = accounting.formatMoney(revenue);
				if(CostGropsList[i].CostGroupID != 8 || dwellingAdded == true){
					sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
					sb.append("<td class = 'parameter' >");
					sb.append("<font face='Arial' color='white' ><b>"+CostGrpName+"</b></font></td>");
					sb.append("</td>");
					if(expense === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='white' ><b>$0</b></font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' ><b>"+"($"+expense+")"+"</b></font>"+"</td>");
					sb.append("</tr>");
				}
				
				for(var j=0;j<ceForSummary.length;j++){
					
					for(k=0;k<compactSummary.length;k++){
						
						if((compactSummary[k].CGID == CostGropsList[i].CostGroupID) && compactSummary[k].CEID == ceForSummary[j].CostElementID){
							sb.append("<tr>");
							sb.append("<td>"+compactSummary[k].Name+"</td>");
							var exp = compactSummary[k].Expense;
							exp = accounting.formatMoney(exp);
							if(exp === '0')
								sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
							else	
								sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' >"+"($"+exp+")"+"</font>"+"</td>");
							sb.append("</tr>");	
						}
						
					}	
					
				}	
				
			}
			
			
			/***************** Feasibility Summary for Funding Cost Cost Group***************************/
			var expense = 0;
			
			for(k=0;k<compactSummary.length;k++){
									
					if(compactSummary[k].CGID == 13){
						expense = expense + parseInt(compactSummary[k].Expense);
					}
			}
			expense = accounting.formatMoney(expense);
			sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
			sb.append("<td class = 'parameter' >");
			sb.append("<font face='Arial' color='white' ><b>Funding Costs</b></font></td>");
			sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' ><b>"+"($"+expense+")"+"</b></font>"+"</td>");
			sb.append("</td>");
			
			for(k=0;k<compactSummary.length;k++){
									
					if(compactSummary[k].CGID == 13){
						sb.append("<tr>");
						sb.append("<td>"+compactSummary[k].Name+"</td>");
						var exp = compactSummary[k].Expense;
						
						exp = accounting.formatMoney(exp);
						if(exp === '0')
							sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
						else	
							sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' >"+"($"+exp+")"+"</font>"+"</td>");
						
					}
					sb.append("</tr>");					
			}
			/****************************************************/
			
			sb.append("</table>");
			sb.append("</div>");
			
	return sb.toString();
}

function generateFinalSummary () {
	
	/*
  	 * Include the files needed for UI Design and Database usage
  	 * Header.js will manage navigation for android
  	 */
	var accounting;
	if(Ti.Platform.osname == 'android') // android specific code
  	{
	  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
		Ti.include('/services/DataBaseTransaction.js')	
		Ti.include('/services/GetFromDataBase.js')	
		Ti.include('/lib/jspdf.js');
	}
	accounting=require('/lib/accounting');
	var count = 0;
	
		
	/******************* Generate a compact Summary/Result using all four tables used for Calculations***********************/
	
	var summaryStaticData = [];
	summaryStaticData = getSummary();
	  	
	var tempResultSummary = [];
	tempResultSummary = getTempSummaryResult();
	
	var fundingCostResult = [];
	fundingCostResult = getFundingCostResult();
	
	var userAddedDwelling = [];
	userAddedDwelling = getUserAddedDwelling();
	
	////////////////////
	var userAddedVacantLand = [];
	userAddedVacantLand = getUserAddedVacantLand();
	///////////////////
	
	var compactSummary = [];
	var profit_lossTxt = summaryStaticData[0].Name;
	var profit_Loss = summaryStaticData[0].ProfitLoss;
	profit_Loss = (parseFloat(profit_Loss)).toFixed(2);
	
	var deal_nodealTxt = summaryStaticData[1].Name;
	var deal_nodealVal = summaryStaticData[1].ProfitLoss;
	
		
	for(var i=2;i<summaryStaticData.length;i++)
	{
		var name = summaryStaticData[i].Name;
		var expense = summaryStaticData[i].Expense;
		if(expense != '')
			expense = (parseFloat(summaryStaticData[i].Expense)).toFixed(2);
		var revenue = summaryStaticData[i].Revenue;
		if(revenue != '')
			revenue = (parseFloat(summaryStaticData[i].Revenue)).toFixed(2);
		var profitLoss = summaryStaticData[i].ProfitLoss;
		if(profitLoss != '')
			profitLoss = (parseFloat(summaryStaticData[i].ProfitLoss)).toFixed(2);
		compactSummary.push({
					Name:name,
					Expense:expense,
					Revenue:revenue,
					ProfitLoss:profitLoss,
					CEID:'',
					CGID:'',
				});
	}		
	
	for(var i=0;i<tempResultSummary.length;i++)
	{
		var name = tempResultSummary[i].Name;
		var expense = tempResultSummary[i].Expense;
		if(expense != '')
			expense = (parseFloat(tempResultSummary[i].Expense)).toFixed(2);
		var revenue = tempResultSummary[i].Revenue;
		if(revenue != '')
			revenue = (parseFloat(tempResultSummary[i].Revenue)).toFixed(2);
		var profitLoss = tempResultSummary[i].ProfitLoss;
		if(profitLoss != '')
			profitLoss = (parseFloat(tempResultSummary[i].ProfitLoss)).toFixed(2);
		compactSummary.push({
					Name:name,
					Expense:expense,
					Revenue:revenue,
					ProfitLoss:profitLoss,
					CEID:tempResultSummary[i].CEID,
					CGID:tempResultSummary[i].CDID,
				});
	}
	
	for(var i=0;i<fundingCostResult.length;i++)
	{
		var name = fundingCostResult[i].Name;
		var expense = fundingCostResult[i].Expense;
		if(expense != '')
			expense = (parseFloat(fundingCostResult[i].Expense)).toFixed(2);
		var revenue = fundingCostResult[i].Revenue;
		if(revenue != '')
			revenue = (parseFloat(fundingCostResult[i].Revenue)).toFixed(2);
		var profitLoss = fundingCostResult[i].ProfitLoss;
		if(profitLoss != '')
			profitLoss = (parseFloat(fundingCostResult[i].ProfitLoss)).toFixed(2);
		compactSummary.push({
					Name:name,
					Expense:expense,
					Revenue:revenue,
					ProfitLoss:profitLoss,
					CEID:fundingCostResult[i].CEID,
					CGID:fundingCostResult[i].CDID,
				});
	}
	
	for(var i=0;i<userAddedDwelling.length;i++)
	{
		var name = userAddedDwelling[i].Name;
		var expense = userAddedDwelling[i].Expense;
		if(expense != '')
			expense = (parseFloat(userAddedDwelling[i].Expense)).toFixed(2);
		var revenue = userAddedDwelling[i].Revenue;
		if(revenue != '')
			revenue = (parseFloat(userAddedDwelling[i].Revenue)).toFixed(2);
		var profitLoss = userAddedDwelling[i].ProfitLoss;
		if(profitLoss != '')
			profitLoss = (parseFloat(userAddedDwelling[i].ProfitLoss)).toFixed(2);
		compactSummary.push({
					Name:name,
					Expense:expense,
					Revenue:revenue,
					ProfitLoss:profitLoss,
					CEID:'',
					CGID:'16',
				});
	}
	
	for(var i=0;i<userAddedVacantLand.length;i++)
	{
		var name = userAddedVacantLand[i].Name;
		var expense = userAddedVacantLand[i].Expense;
		if(expense != '')
			expense = (parseFloat(userAddedVacantLand[i].Expense)).toFixed(2);
		var revenue = userAddedVacantLand[i].Revenue;
		if(revenue != '')
			revenue = (parseFloat(userAddedVacantLand[i].Revenue)).toFixed(2);
		var profitLoss = userAddedVacantLand[i].ProfitLoss;
		if(profitLoss != '')
			profitLoss = (parseFloat(userAddedVacantLand[i].ProfitLoss)).toFixed(2);
		compactSummary.push({
					Name:name,
					Expense:expense,
					Revenue:revenue,
					ProfitLoss:profitLoss,
					CEID:'',
					CGID:'17',
				});
	}
	storeCompactSummary(compactSummary,profit_Loss,deal_nodealVal);
  
}

function generateFeasibilityDetailsHTMLDoc (feasId) {
	
	var accounting;
	if(Ti.Platform.osname == 'android') // android specific code
  	{
	  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
		Ti.include('/services/DataBaseTransaction.js')	
		Ti.include('/services/GetFromDataBase.js')	
		Ti.include('/lib/jspdf.js');
	}
	accounting=require('/lib/accounting');
	
	var summaryStaticData = [];
	summaryStaticData = getFinalSummary(feasId);
	
	var summaryName = getSummaryName(feasId);
	
	var profit_Loss = summaryStaticData[0].PL;
	profit_Loss = (parseFloat(profit_Loss)).toFixed(2);
	
	var deal_nodealVal = summaryStaticData[0].DND;
	
	var sb = new StringBuilder();
	
			sb.append("<div class='tab'>");
			sb.append("<table border='1' cellspacing='0' cellpadding='4' align = 'center' style='font:normal 14px arial;'>");
			
			/********************* Header ***********************/
			sb.append("<tr class='summary'>");
	    	sb.append("<td colspan='3' class='summary' bgcolor = '#6d6e6f' align = 'center'><font face='Arial' color='white'><b>Feasibility Results</b></font>");
 			sb.append("</td>");
	  		sb.append("</tr>");
	  		sb.append("<tr class='summary'>");
	    	sb.append("<td class='summary' bgcolor = '#c3c3c3' align = 'center'><font face='Arial' color='white'><b>Summary</b></font>");
 			sb.append("</td>");
 			sb.append("<td colspan='2' class='summary' bgcolor = '#c3c3c3' align = 'center'><font face='Arial' color='white'><b>"+summaryName+"</b></font>");
 			sb.append("</td>");
	  		sb.append("</tr>");
	  		/****************************************************/
	  		
	  		
			/******************** Static Data *******************/
			sb.append("<tr >");
				sb.append("<td>Deal / No Deal</td>");
				sb.append("<td colspan='2' align = 'center'>"+deal_nodealVal+"</td>");
			sb.append("</tr>");
			
			
			sb.append("<tr >");
				sb.append("<td>Profit / Loss - Percentage</td>");
				if(profit_Loss<0)
					sb.append("<td align='right' colspan='2'><font face='Arial' color='red' >"+profit_Loss+" %"+"</font></td>");
				else	
					sb.append("<td align='right' colspan='2'><font face='Arial' color='black' >"+profit_Loss+" %"+"</font></td>");
				//sb.append("<td align='right' colspan='2'><font face='Arial' color='red' >"+profit_Loss+" %"+"</font></td>");
			sb.append("</tr>");
			/****************************************************/
			
			
			/********************* Sub Header for table****************/
			sb.append("<tr class = 'parameter' bgcolor = '#82b939' align = 'center'>");
				sb.append("<td class = 'parameter' ><font face='Arial' color='white' ><b>Parameter</b></font></td>");
				sb.append("<td class = 'parameter' colspan='2'><font face='Arial' color='white' ><b>Expense/Revenue</b></font></td>");
			sb.append("</tr>");
			/****************************************************/
			
			
			
			/********************* Feasibility Summary for Cost Groups 1 to 6 **************************/
			sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
			sb.append("<td class = 'parameter' >");
			sb.append("<font face='Arial' color='white' ><b>Profitability</b></font></td>");
			sb.append("</td>");
			var totalProfitability = summaryStaticData[3].ProfitLoss;
			totalProfitability = accounting.formatMoney(totalProfitability);
			if(totalProfitability === '0')
				sb.append("<td align='right'><font face='Arial' color='black' ><b>$0</b></font></td>");
			else	
				sb.append("<td align='right'>"+"<font face='Arial' color='white' ><b>"+"$"+totalProfitability+"</b></font>"+"</td>");
			sb.append("</tr>");
			
			for(var i=1;i<3;i++){
					sb.append("<tr class = 'parameter'>");
					sb.append("<td>"+summaryStaticData[i].Name+"</td>");
					var exp = summaryStaticData[i].Expense;
					exp = accounting.formatMoney(exp);
					if(exp === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' >"+"($"+exp+")"+"</font>"+"</td>");
					sb.append("</tr>");
			}
			
			sb.append("<tr class = 'parameter'>");
			sb.append("<td>"+summaryStaticData[3].Name+"</td>");
			var rev = summaryStaticData[3].Revenue;
			rev = accounting.formatMoney(rev);
			if(rev === '0')
				sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
			else	
				sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black' >"+"$"+rev+"</font>"+"</td>");
			sb.append("</tr>");
			
			var CostGropsList = [];
			CostGropsList=[{CostGroupID:1,Name:'Purchasing Costs'},
						{CostGroupID:3,Name:'Existing Dwelling (If Any)'},
						//{CostGroupID:4,Name:'Development Phase'},
						{CostGroupID:4,Name:'Design Phase'},
						{CostGroupID:5,Name:'Pre Construction Phase'},
						{CostGroupID:6,Name:'Construction Cost Per Dwelling'},
						{CostGroupID:7,Name:'Construction Phase'},
						{CostGroupID:8,Name:'Optional Construction Costs'},
						{CostGroupID:9,Name:'Post Construction Phase'},
						{CostGroupID:10,Name:'Contingency'},
						{CostGroupID:11,Name:'Sales Costs'},
			];
			
			var ceForSummary = [];
			ceForSummary = GetCostElementLength();
			
			for(var i=0;i<5;i++)
			{
				var CostGrpName = CostGropsList[i].Name;
				var expense = 0;
				var revenue = 0;
				for(var p=0;p<ceForSummary.length;p++){
					for(q=0;q<summaryStaticData.length;q++){
						if((summaryStaticData[q].CGID === CostGropsList[i].CostGroupID) && (summaryStaticData[q].CEID === ceForSummary[p].CostElementID)){
							if(summaryStaticData[q].Expense !== '')
								expense = expense + parseInt(summaryStaticData[q].Expense);
								
							if(summaryStaticData[q].Revenue !== '')	
								revenue = revenue + parseInt(summaryStaticData[q].Revenue);
						}
					}
				}
				expense = accounting.formatMoney(expense);
				revenue = accounting.formatMoney(revenue);
				if(CostGropsList[i].CostGroupID == 3){
					sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
					sb.append("<td class = 'parameter' >");
					sb.append("<font face='Arial' color='white' ><b>"+CostGrpName+"</b></font></td>");
					sb.append("</td>");
					if(revenue === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='white' ><b>$0</b></font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white' ><b>"+"$"+revenue+"</b></font>"+"</td>");
				}
				else{
					sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
					sb.append("<td class = 'parameter' >");
					sb.append("<font face='Arial' color='white' ><b>"+CostGrpName+"</b></font></td>");
					sb.append("</td>");
					if(expense === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='white' ><b>$0</b></font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' ><b>"+"($"+expense+")"+"</b></font>"+"</td>");
				}
				sb.append("</tr>");
					
						for(var j=0;j<ceForSummary.length;j++)
						{
							if(CostGropsList[i].CostGroupID == ceForSummary[j].CostGrpID){
								sb.append("<tr>");
								sb.append("<td>"+ceForSummary[j].Name+"</td>");
								for(k=0;k<summaryStaticData.length;k++){
									
									if(ceForSummary[j].CostElementID == summaryStaticData[k].CEID){
										var exp = summaryStaticData[k].Expense;
										var rev = summaryStaticData[k].Revenue;
										
										if(rev === '')
										{
											exp = accounting.formatMoney(exp);
											if(exp === '0')
												sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
											else	
												sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' >"+"($"+exp+")"+"</font>"+"</td>");
										}
										else if(exp === '')
										{
												
											rev = accounting.formatMoney(rev);
											if(rev === '0')
												sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
											else	
												sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black' >"+"($"+rev+")"+"</font>"+"</td>");
										}
									}
										
								}	
								sb.append("</tr>");
							}
							
					 }
			
			}


			/******************* User added Dwellings - expenses************************/	
			var dwellingsAdded = false;		
			var expense = 0;
			var revenue = 0;
			for(var i=0;i<summaryStaticData.length;i++){
				if(summaryStaticData[i].CGID == 16){
					dwellingsAdded = true;
					expense = expense + parseInt(summaryStaticData[i].Expense);
					revenue = revenue + parseInt(summaryStaticData[i].Revenue);
				}
			}

			if(dwellingsAdded){
				sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
				sb.append("<td class = 'parameter' >");
				sb.append("<font face='Arial' color='white' ><b>Dwellings - Cost to construct</b></font></td>");
				sb.append("</td>");
				expense = accounting.formatMoney(expense);
				if(expense === '0')
					sb.append("<td colspan='2' align='right'><font face='Arial' color='white' ><b>$0</b></font></td>");
				else	
					sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' ><b>"+"($"+expense+")"+"</b></font>"+"</td>");
				sb.append("</tr>");
			}			
			
			
			for(k=0;k<summaryStaticData.length;k++){
										
				if(summaryStaticData[k].CGID == 16){
							
					sb.append("<tr>");
					sb.append("<td>"+summaryStaticData[k].Name+"</td>");
					var exp = summaryStaticData[k].Expense;
					exp = accounting.formatMoney(exp);
					if(exp === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' >"+"($"+exp+")"+"</font>"+"</td>");
					
				}
				sb.append("</tr>");					
			}
			/****************************************************/
			
			
			/****************** User added Dwellings - Revenue ****************************/
			if(dwellingsAdded){
				sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
				sb.append("<td class = 'parameter' >");
				sb.append("<font face='Arial' color='white' ><b>Dwellings - Income from Sales</b></font></td>");
				sb.append("</td>");
				revenue = accounting.formatMoney(revenue);
				if(revenue === '0')
					sb.append("<td colspan='2' align='right'><font face='Arial' color='white' >$0</font></td>");
				else	
					sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white' ><b>"+"$"+revenue+"</font>"+"</b></td>");
				sb.append("</tr>");
			}	
			
			
			for(k=0;k<summaryStaticData.length;k++){
										
				if(summaryStaticData[k].CGID == 16){
							
					sb.append("<tr>");
					sb.append("<td>"+summaryStaticData[k].Name+"</td>");
					var rev = summaryStaticData[k].Revenue;
					rev = accounting.formatMoney(rev);
					if(rev === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black' >"+"$"+rev+"</font>"+"</td>");
					
				}
				sb.append("</tr>");					
			}	
			/****************************************************/	
			
			/****************** User added Vacant Land - Revenue ****************************/
			var vacantLandAdded = false;
			
			var expense = 0;
			var revenue = 0;
			for(var i=0;i<summaryStaticData.length;i++){
				if(summaryStaticData[i].CGID == 17){
					vacantLandAdded = true;
					expense = expense + parseInt(summaryStaticData[i].Expense);
					revenue = revenue + parseInt(summaryStaticData[i].Revenue);
				}
			}
			
			if(vacantLandAdded){
				sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
				sb.append("<td class = 'parameter' >");
				sb.append("<font face='Arial' color='white' ><b>Vacant Land - Income from Sales</b></font></td>");
				sb.append("</td>");
				revenue = accounting.formatMoney(revenue);
				if(revenue === '0')
					sb.append("<td colspan='2' align='right'><font face='Arial' color='white' ><b>$0</b></font></td>");
				else	
					sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white' ><b>"+"$"+revenue+"</b></font>"+"</td>");
				sb.append("</tr>");
			
			}
			
			
			for(k=0;k<summaryStaticData.length;k++){
										
				if(summaryStaticData[k].CGID == 17){
							
					sb.append("<tr>");
					sb.append("<td>"+summaryStaticData[k].Name+"</td>");
					var rev = summaryStaticData[k].Revenue;
					rev = accounting.formatMoney(rev);
					if(rev === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black' >"+"$"+rev+"</font>"+"</td>");
					
				}
				sb.append("</tr>");					
			}	
			/****************************************************/	
			
			
			/*************** Feasibility Summary for Cost Groups 7 onwards************************/
			
			for(var i=5;i<CostGropsList.length;i++){
				var CostGrpName = CostGropsList[i].Name;
				var dwellingAdded = false;
				var expense = 0;
				var revenue = 0;
				for(var p=0;p<ceForSummary.length;p++){
					for(q=0;q<summaryStaticData.length;q++){
						if((summaryStaticData[q].CGID === CostGropsList[i].CostGroupID) && (summaryStaticData[q].CEID === ceForSummary[p].CostElementID)){
							if(summaryStaticData[q].CGID == 8)
								dwellingAdded = true;
							
							if(summaryStaticData[q].Expense !== '')
								expense = expense + parseInt(summaryStaticData[q].Expense);
								
							if(summaryStaticData[q].Revenue !== '')	
								revenue = revenue + parseInt(summaryStaticData[q].Revenue);
						}
					}
				}
				
				expense = accounting.formatMoney(expense);
				revenue = accounting.formatMoney(revenue);
				if(CostGropsList[i].CostGroupID != 8 || dwellingAdded == true){
					sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
					sb.append("<td class = 'parameter' >");
					sb.append("<font face='Arial' color='white' ><b>"+CostGrpName+"</b></font></td>");
					sb.append("</td>");
					if(expense === '0')
						sb.append("<td colspan='2' align='right'><font face='Arial' color='white' ><b>$0</b></font></td>");
					else	
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' ><b>"+"($"+expense+")"+"</b></font>"+"</td>");
					sb.append("</tr>");
				}
				
				for(var j=0;j<ceForSummary.length;j++){
					
					for(k=0;k<summaryStaticData.length;k++){
						
						if((summaryStaticData[k].CGID == CostGropsList[i].CostGroupID) && summaryStaticData[k].CEID == ceForSummary[j].CostElementID){
							sb.append("<tr>");
							sb.append("<td>"+summaryStaticData[k].Name+"</td>");
							var exp = summaryStaticData[k].Expense;
							exp = accounting.formatMoney(exp);
							if(exp === '0')
								sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
							else	
								sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' >"+"($"+exp+")"+"</font>"+"</td>");
							sb.append("</tr>");	
						}
						
					}	
					
				}	
				
			}
			
			/***************** Feasibility Summary for Funding Cost Cost Group***************************/
			var expense = 0;
			
			for(k=0;k<summaryStaticData.length;k++){
									
					if(summaryStaticData[k].CGID == 13){
						expense = expense + parseInt(summaryStaticData[k].Expense);
					}
			}
			expense = accounting.formatMoney(expense);
			sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
			sb.append("<td class = 'parameter' >");
			sb.append("<font face='Arial' color='white' ><b>Funding Costs</b></font></td>");
			sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' ><b>"+"($"+expense+")"+"<b></font>"+"</td>");
			sb.append("</td>");
			
			for(k=0;k<summaryStaticData.length;k++){
									
					if(summaryStaticData[k].CGID == 13){
						sb.append("<tr>");
						sb.append("<td>"+summaryStaticData[k].Name+"</td>");
						var exp = summaryStaticData[k].Expense;
						
						exp = accounting.formatMoney(exp);
						if(exp === '0')
							sb.append("<td colspan='2' align='right'><font face='Arial' color='black' >$0</font></td>");
						else	
							sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red' >"+"($"+exp+")"+"</font>"+"</td>");
						
					}
					sb.append("</tr>");					
			}
			/****************************************************/
	
	
	sb.append("</table>");
	sb.append("</div>");
	
	return sb.toString();
}

function generateComparisonSummaryHTMLDoc (feasId) {
	
	/*
  	 * Include the files needed for UI Design and Database usage
  	 * Header.js will manage navigation for android
  	 */
	var accounting;
	if(Ti.Platform.osname == 'android') // android specific code
  	{
	  	Ti.include('/ui/common/Header.js');//include header as android do not have navigation controll
		Ti.include('/services/DataBaseTransaction.js')	
		Ti.include('/services/GetFromDataBase.js')	
		Ti.include('/lib/jspdf.js');
		
	}
	accounting=require('/lib/accounting');
	var colspan = ((feasId.length*2)+1);
	
	var CostGropsList = [];
	CostGropsList=[{CostGroupID:1,Name:'Purchasing Costs'},
				{CostGroupID:3,Name:'Existing Dwelling (If Any)'},
				//{CostGroupID:4,Name:'Development Phase'},
				{CostGroupID:4,Name:'Design Phase'},
				{CostGroupID:5,Name:'Pre Construction Phase'},
				{CostGroupID:6,Name:'Construction Cost Per Dwelling'},
				{CostGroupID:7,Name:'Construction Phase'},
				{CostGroupID:8,Name:'Optional Construction Costs'},
				{CostGroupID:9,Name:'Post Construction Phase'},
				{CostGroupID:10,Name:'Contingency'},
				{CostGroupID:11,Name:'Sales Costs'},
	];
	
	var ceForSummary = [];
	ceForSummary = GetCostElementLength();
	
	var sb = new StringBuilder();
	sb.append("<div class='tab'>");
	sb.append("<table border='1' cellspacing='0' cellpadding='4' align = 'center' style='font:normal 14px arial;'>");
	
		
	sb.append("<tr class='summary'>");
	sb.append("<td colspan='");sb.append(colspan);sb.append("' class='summary' bgcolor = '#6d6e6f' align = 'center' >");
	sb.append("<font face='Arial' color='white' ><b>Comparison of Feasibility Results</b></font></td>");
	sb.append("</tr>");
	
	sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'center'>");
		sb.append("<td class = 'parameter' ><font face='Arial' color='white' ><b>Summary Name</b></font></td>");
		for(var i=0;i<feasId.length;i++)
		{
			var name_Summary = getSummaryName(feasId[i]);
			sb.append("<td class = 'parameter' colspan='2'><font face='Arial' color='white' ><b>"+name_Summary+"</b></font></td>");
		}
	sb.append("</tr>");
		
		sb.append("<tr >");
		sb.append("<td>Deal / No Deal</td>");
		for(var i=0;i<feasId.length;i++)
		{
			var summaryStaticData = [];
			summaryStaticData = getFinalSummary(feasId[i]);
			var deal_nodealVal = summaryStaticData[0].DND;
			sb.append("<td colspan='2' align='center'>");
			sb.append(deal_nodealVal);
			sb.append("</td>");
		}			
		sb.append("</tr>");
		
		sb.append("<tr >");
		sb.append("<td>Profit / Loss - Percentage</td>");
		for(var i=0;i<feasId.length;i++)
		{
			var summaryStaticData = [];
			summaryStaticData = getFinalSummary(feasId[i]);
			var profit_Loss = summaryStaticData[0].PL;	
			if(profit_Loss<0)
				sb.append("<td align='right' colspan='2'><font face='Arial' color='red' >"+profit_Loss+" %"+"</font></td>");
			else	
				sb.append("<td align='right' colspan='2'><font face='Arial' color='black' >"+profit_Loss+" %"+"</font></td>");
			/*sb.append("<td colspan='2' align='right'>");
			sb.append("<font face='Arial' color='red' >");
			sb.append(profit_Loss+"%");
			sb.append("</font>");
			sb.append("</td>");*/
		}				
		sb.append("</tr>");
		
		sb.append("<tr class = 'parameter' bgcolor = '#82b939' align = 'center'>");
		sb.append("<td class = 'parameter' ><font face='Arial' color='white' ><b>Parameter</b></font></td>");
		for(var i=0;i<feasId.length;i++)
		{
			sb.append("<td class = 'parameter' colspan='2'><font face='Arial' color='white' ><b>Expense/Revenue</b></font></td>");
		}
		sb.append("</tr>");
		
		var summaryStaticData = [];
		summaryStaticData = getFinalSummary(feasId[0]);
		
		
	
	sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'center'>");
	sb.append("<td class = 'parameter' align='left'><font face='Arial' color='white' ><b>Profitability</b></font></td>");
	for(var i=0;i<feasId.length;i++)
	{
		var summaryStaticData = [];
		summaryStaticData = getFinalSummary(feasId[i]);
		var totalProfitability = summaryStaticData[3].ProfitLoss;
		totalProfitability = accounting.formatMoney(totalProfitability);		
		if(totalProfitability === '0'){
			sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black'><b>$0</b></font>"+"</td>");
		}
		else{
			sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white'><b>"+"$"+totalProfitability+"</b></font>"+"</td>");
		}
	}	
	
	sb.append("</tr>");
	
	
	for(var j=1;j<3;j++)
	{
		sb.append("<tr >");
				var name = summaryStaticData[j].Name;
				sb.append("<td >"+name+"</td>");
				
				for(var i=0;i<feasId.length;i++)
				{
					var summaryStaticData = [];
					summaryStaticData = getFinalSummary(feasId[i]);
					var exp1 =summaryStaticData[j].Expense;
					exp1 = accounting.formatMoney(exp1);
					if(exp1 === '0'){
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black'>$0</font>"+"</td>");
					}
					else{
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red'>"+"($"+exp1+")"+"</font>"+"</td>");
					}
				}
			 	sb.append("</tr>");
	}
	
	sb.append("<tr >");
	var name = summaryStaticData[3].Name;
	sb.append("<td >"+name+"</td>");
				
	for(var i=0;i<feasId.length;i++)
	{
		var summaryStaticData = [];
		summaryStaticData = getFinalSummary(feasId[i]);
		var rev =summaryStaticData[3].Revenue;
		rev = accounting.formatMoney(rev);
		if(rev === '0'){
			sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black'>$0</font>"+"</td>");
		}
		else{
			sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black'>"+"$"+rev+"</font>"+"</td>");
		}
					
	}
	sb.append("</tr>");
	
	for(k=0;k<5;k++)
	{
		var CostGrpName=CostGropsList[k].Name;
		
		
		sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
		sb.append("<td class = 'parameter' >");
		sb.append("<font face='Arial' color='white' ><b>"+CostGrpName+"</b></font></td>");
		sb.append("</td>");
		for(var l=0;l<feasId.length;l++)
		{
			var exp = 0;
			var rev = 0;
			for(var i=0;i<ceForSummary.length;i++)
			{
				if(CostGropsList[k].CostGroupID == ceForSummary[i].CostGrpID)
				{
					var array = [];
					array = GetCEComparedValues(feasId[l],ceForSummary[i].CostElementID);
					exp = exp + array[0].Expense;
					rev = rev + array[0].Revenue;
				}	
			}
			if(CostGropsList[k].CostGroupID === 3){
				
				rev = accounting.formatMoney(rev);
					if(rev === '0'){
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white'><b>$0</b></font>"+"</td>");
					}
					else{
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white'><b>"+"$"+rev+"</b></font>"+"</td>");
					}
			}
			else{
				
				exp = accounting.formatMoney(exp);
					if(exp === '0'){
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white'><b>$0</b></font>"+"</td>");
					}
					else{
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red'><b>"+"($"+exp+")"+"</b></font>"+"</td>");
					}
				
			}
		}	
		
		
		for(var i=0;i<ceForSummary.length;i++)
		{
				if(CostGropsList[k].CostGroupID == ceForSummary[i].CostGrpID)
				{
					sb.append("<tr >");
					var name = ceForSummary[i].Name;
					sb.append("<td >"+name+"</td>");
							
						for(var j=0;j<feasId.length;j++)
						{
							
							var array = [];
							array = GetCEComparedValues(feasId[j],ceForSummary[i].CostElementID);
							var exp1 = array[0].Expense;
							var rev1 =array[0].Revenue;
							if(exp1 !== ''){
								exp1 = accounting.formatMoney(exp1);
								if(exp1 === '0'){
									sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black'>$0</font>"+"</td>");
								}
								else{
									sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red'>"+"($"+exp1+")"+"</font>"+"</td>");
								}
							}
							else if(rev1 !== ''){
								rev1 = accounting.formatMoney(rev1);
								if(rev1 === '0'){
									sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black'>$0</font>"+"</td>");
								}
								else{
									sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black' >"+"$"+rev1+"</font>"+"</td>");
								}
								
							}
							else
								sb.append("<td colspan='2'>&nbsp;</td>");
							
						}
					 	sb.append("</tr>");
				}
		}
	}
	
	/////////////////////////////
			var userAddedDwellings = [];
			userAddedDwellings = GetDwellingsComparedValues(feasId);
			
			if(userAddedDwellings.length != 0)
			{
				
				sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
				sb.append("<td class = 'parameter' >");
				sb.append("<font face='Arial' color='white' ><b>Dwellings - Cost to Construct</b></font>");
				sb.append("</td>");
				
				
					for(var j=0;j<feasId.length;j++)
					{
						var exp1 = 0;
						for(var k=0;k<userAddedDwellings.length;k++)
						{
							if(userAddedDwellings[k].feasId == feasId[j])   
							{
								exp1 = exp1 + userAddedDwellings[k].Expense;
							}	
						}	
						
						exp1 = accounting.formatMoney(exp1);
						if(exp1 === '0'){
							sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white'><b>$0</b></font>"+"</td>");
						}
						else{
							sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red'><b>"+"($"+exp1+")"+"</b></font>"+"</td>");
						}
						
					}	
					
				sb.append("</tr>");
			}
			
			for(var i=0;i<userAddedDwellings.length;i++)
			{
				sb.append("<tr >");
				var name = userAddedDwellings[i].Name;
				sb.append("<td >"+name+"</td>");
				
				for(var j=0;j<feasId.length;j++)
				{
					if(userAddedDwellings[i].feasId == feasId[j])   
					{
						var exp1 = userAddedDwellings[i].Expense;
						exp1 = accounting.formatMoney(exp1);
						if(exp1 === '0'){
							sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black'>$0</font>"+"</td>");
						}
						else{
							sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red'>"+"($"+exp1+")"+"</font>"+"</td>");
						}
					}
					else
					{
						sb.append("<td colspan='2'>&nbsp;</td>");
					}
					
				}
				
				sb.append("</tr>");
			}
			
			
			if(userAddedDwellings.length != 0)
			{
				
				sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
				sb.append("<td class = 'parameter' >");
				sb.append("<font face='Arial' color='white' ><b>Dwellings - Income from Sales</b></font>");
				sb.append("</td>");
				
				
					for(var j=0;j<feasId.length;j++)
					{
						var rev1 = 0;
						for(var k=0;k<userAddedDwellings.length;k++)
						{
							if(userAddedDwellings[k].feasId == feasId[j])   
							{
								rev1 = rev1 + userAddedDwellings[k].Revenue;
							}	
						}	
						
						rev1 = accounting.formatMoney(rev1);
						if(rev1 === '0'){
							sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white'><b>$0</b></font>"+"</td>");
						}
						else{
							sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white'><b>"+"$"+rev1+"</b></font>"+"</td>");
						}
					}	
					
				sb.append("</tr>");
				
			}
			
			for(var i=0;i<userAddedDwellings.length;i++)
			{
				sb.append("<tr >");
				var name = userAddedDwellings[i].Name;
				sb.append("<td >"+name+"</td>");
				
				for(var j=0;j<feasId.length;j++)
				{
					if(userAddedDwellings[i].feasId == feasId[j])   
					{
						var rev1 =userAddedDwellings[i].Revenue;
						rev1 = accounting.formatMoney(rev1);
						if(rev1 === '0'){
							sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black'>$0</font>"+"</td>");
						}
						else{
							sb.append("<td colspan='2' align='right'>"+"$"+rev1+"</td>");
						}
						
					}
					else
					{
						sb.append("<td colspan='2'>&nbsp;</td>");
					}
					
				}
				
				sb.append("</tr>");
			}
///////////////////////////////////////	

/////////////////////////////User added Vacant Land ///////////////////////////////////////////
			var userAddedVacantLand = [];
			userAddedVacantLand = GetVacantLandComparedValues(feasId);
			
			if(userAddedVacantLand.length != 0)
			{
				
				sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
				sb.append("<td class = 'parameter' >");
				sb.append("<font face='Arial' color='white' ><b>Vacant Land - Income from Sales</b></font>");
				sb.append("</td>");
				
				
					for(var j=0;j<feasId.length;j++)
					{
						var revenue = 0;
						for(var k=0;k<userAddedVacantLand.length;k++)
						{
							if(userAddedVacantLand[k].feasId == feasId[j])   
							{
								revenue = revenue + userAddedVacantLand[k].Revenue;
							}	
						}	
						
						revenue = accounting.formatMoney(revenue);
						if(revenue === '0'){
							sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white'><b>$0</b></font>"+"</td>");
						}
						else{
							sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white'><b>"+"$"+revenue+"</b></font>"+"</td>");
						}
					}	
					
				sb.append("</tr>");
				
			}
			
			for(var i=0;i<userAddedVacantLand.length;i++)
			{
				sb.append("<tr >");
				var name = userAddedVacantLand[i].Name;
				
				sb.append("<td >"+name+"</td>");
				
				for(var j=0;j<feasId.length;j++)
				{
					if(userAddedVacantLand[i].feasId == feasId[j])   
					{
						var revenue =userAddedVacantLand[i].Revenue;
						revenue = accounting.formatMoney(revenue);
						if(revenue === '0'){
							sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black'>$0</font>"+"</td>");
						}
						else{
							sb.append("<td colspan='2' align='right'>"+"$"+revenue+"</td>");
						}
						
					}
					else
					{
						sb.append("<td colspan='2'>&nbsp;</td>");
					}
					
				}
				
				sb.append("</tr>");
				
				Ti.API.info('Name : Revenue '+name+' : '+revenue);
			}
///////////////////////////////////////	

	for(k=5;k<CostGropsList.length;k++)
	{
		var CostGrpName=CostGropsList[k].Name;
		
		sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
		sb.append("<td class = 'parameter' >");
		sb.append("<font face='Arial' color='white' ><b>"+CostGrpName+"</b></font></td>");
		sb.append("</td>");
		for(var l=0;l<feasId.length;l++)
		{
			var exp = 0;
			var exp1;
			for(var i=0;i<ceForSummary.length;i++)
			{
				if(CostGropsList[k].CostGroupID == ceForSummary[i].CostGrpID)
				{
					var array = [];
					array = GetCEComparedValues(feasId[l],ceForSummary[i].CostElementID);
					if(array[0].Expense !== '')
						exp = exp + array[0].Expense;
						
					exp1 = array[0].Expense;
				}	
			}
			
			
				
				exp = accounting.formatMoney(exp);
				if(exp === '0'){
					sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white'><b>$0</b></font>"+"</td>");
				}
				else{
					sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red'><b>"+"($"+exp+")"+"</b></font>"+"</td>");
				}
				
			
		}
		
		for(var i=0;i<ceForSummary.length;i++)
		{
				if(CostGropsList[k].CostGroupID == ceForSummary[i].CostGrpID)
				{
					sb.append("<tr >");
					var name = ceForSummary[i].Name;
					sb.append("<td >"+name+"</td>");
							
						for(var j=0;j<feasId.length;j++)
						{
							
							var array = [];
							array = GetCEComparedValues(feasId[j],ceForSummary[i].CostElementID);
							var exp1 = array[0].Expense;
							
							if(exp1 !== ''){
								exp1 = accounting.formatMoney(exp1);
								if(exp1 === '0'){
									sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black'>$0</font>"+"</td>");
								}
								else{
									sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red'>"+"($"+exp1+")"+"</font>"+"</td>");
								}
							}
							else
								sb.append("<td colspan='2'>&nbsp;</td>");
						}
					 	sb.append("</tr>");
				}
		}
	}
	
	var fundingCost = [];
	fundingCost = GetFCComparedValues(feasId[0]);
			
			
			sb.append("<tr class = 'parameter' bgcolor = '#c3c3c3' align = 'left'>");
			sb.append("<td class = 'parameter' >");
			sb.append("<font face='Arial' color='white' ><b>Funding Costs</b></font></td>");
			sb.append("</td>");
			
			for(var i=0;i<feasId.length;i++)
			{
				var fundingCost = [];
				fundingCost = GetFCComparedValues(feasId[i]);
				var exp1 = 0;
				for(var j=0;j<fundingCost.length;j++){
					exp1 = exp1 + fundingCost[j].Expense;
				}
				
				exp1 = accounting.formatMoney(exp1);
				if(exp1 === '0'){
					sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='white'><b>$0</b></font>"+"</td>");
				}
				else{
					sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red'><b>"+"($"+exp1+")"+"</b></font>"+"</td>");
				}
			}	
			sb.append("</tr>");
		
			for(var i=0;i<fundingCost.length;i++)
			{
				sb.append("<tr >");
				var name = fundingCost[i].Name;
				sb.append("<td >"+name+"</td>");
				
				for(var j=0;j<feasId.length;j++)
				{
					var fundingCost = [];
					fundingCost = GetFCComparedValues(feasId[j]);
					var exp1 = fundingCost[i].Expense;
					exp1 = accounting.formatMoney(exp1);
					if(exp1 === '0'){
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='black'>$0</font>"+"</td>");
					}
					else{
						sb.append("<td colspan='2' align='right'>"+"<font face='Arial' color='red'>"+"($"+exp1+")"+"</font>"+"</td>");
					}
						
				}
				
				sb.append("</tr>");
			}
			
		
		
	sb.append("</table>");
	sb.append("</div>");
	return sb.toString();
	
}


// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied
function StringBuilder(value)
{
    this.strings = new Array("");
    this.append(value);
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value)
{
    if (value)
    {
        this.strings.push(value);
    }
}

// Clears the string buffer
StringBuilder.prototype.clear = function ()
{
    this.strings.length = 1;
}

// Converts this instance to a String.
StringBuilder.prototype.toString = function ()
{
    return this.strings.join("");
}
