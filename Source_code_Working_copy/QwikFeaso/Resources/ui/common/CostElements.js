/**
 * @projectDescription QwikFeaso
 * 
 * @author List- vivek Gidmare(vivek.gidmare@quagnitia.com),Shreyas Bhondve (shreyas.bhondve@quagnitia.com)
 * @version 1.0
 */

/*
   Function: Window showing list of Cost Groups along with their corresponding Cost elements
   @param {Object} CostElementWin		Window object
   @return {Object}						Returns current window object
*/

function winOpen (winTitle,fromWin) {

var CostElementWin;
var rowSubHeader = [];
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
  	
  	 CostElementWin=Ti.UI.createWindow({
  				backgroundColor:'#fff',
  				navBarHidden:true,
	  			});
	  			
	 setHeader(); 		
	 
	 // Handle back press 
	 leftBtn.addEventListener('click',function(e){
	 	btnSelector(leftBtn);
	 	CostElementWin.close();});
	 
	 // Navigates to add cost element window
	 rightBtn.addEventListener('singletap',function(e){
	 	btnSelector(rightBtn);
	 	var winOpen=require('ui/common/NewCostElement');
		new winOpen('xyz',1).open(); 
	 	});
	 
	 
	 
	 CostElementWin.windowSoftInputMode=Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;	

  }
  else // iPhone or iPad specific code
  {
		  	//Window Created for iphone to suport navigation Bar
		  	CostElementWin=Ti.UI.createWindow({
			  	backgroundColor:'#fff',
				navBarHidden:false,
				tabBarHidden: true,
				barImage:'images/GrayNavBar.png',
				barColor:'#6d6e6f',
				title:'Cost Elements',
		 	 });	
	
	 			var BackBtn = Ti.UI.createButton({
			      title : 'Back',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      
			      font:{fontSize:'17%'},
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
		    navGroup.close(CostElementWin,{animated: true});
		    
		  });
  
		  lftNavView.add(BackBtn);
		
		  CostElementWin.leftNavButton=lftNavView;
		  
		   var rightView=Ti.UI.createView(
				{
					width:'auto',
					height:'auto',
					
					backgroundColor:'#0000',
					layout:'horizontal'
					
				});

		  var RightBtn = Ti.UI.createButton({
			      title : 'Add',
			      height : '30dp',
			      width : '60dp',
			      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			      borderRadius:3,
			      
			      font:{fontSize:'15%'},
			      backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
			
			  });
			  
		  // Navigates to add cost element window	  
		  RightBtn.addEventListener('click',function(e){
		  	btnSelector(RightBtn);
			 	var winOpen=require('ui/common/NewCostElement');
				navGroup.open(new winOpen('xyz',1),{animated: true});
			 	
		  });
		  
		  rightView.add(RightBtn);
		  CostElementWin.rightNavButton=rightView;
		  
		  
	
	}
CostElementWin.orientationModes=[Ti.UI.PORTRAIT];

var scrollView = Ti.UI.createScrollView({
	top:Ti.Platform.osname =='android'?'10%':'0%',
    contentHeight: 'auto',
    layout: 'vertical',
    
});


CostElementWin.addEventListener('focus', function (e) {
	
	if (Ti.Platform.osname == 'android')
	{
		if(Ti.App.QwikFeasoGlobalVars.SummaryUpdated==1)
		{
			/*
	 		 * Logic to update the list of Cost Elements after user navigates from Adding a new Cost element 
	 		 * or editing an existing Cost element 
	 		 */
	 		CostElementWin.add(actvityIndicatorView);
				actInd.show();
				setTimeout(function(){
					cleanWindow(scrollView);
			  				CostElementWin.remove(scrollView);
						    getCostElemetList();
 	 					actInd.hide();
 	 					CostElementWin.remove(actvityIndicatorView);
  						}, 500);
		}
		
	Ti.App.QwikFeasoGlobalVars.SummaryUpdated=0;
	}
	else
	{
		if(QwikFeasoGlobalVars.SummaryUpdated==1)
		{
			/*
	 		 * Logic to update the list of Cost Elements after user navigates from Adding a new Cost element 
	 		 * or editing an existing Cost element 
	 		 */
	 		CostElementWin.add(actvityIndicatorView);
				actInd.show();
				setTimeout(function(){
					cleanWindow(scrollView);
			  				CostElementWin.remove(scrollView);
						    getCostElemetList();
						//Ti.App.fireEvent('RefreshCESettings',function(){});
 	 					actInd.hide();
 	 					CostElementWin.remove(actvityIndicatorView);
  						}, 100);
		}
		
	QwikFeasoGlobalVars.SummaryUpdated=0;
	} 
	
	
	
});

Ti.App.addEventListener('RefreshCESettings', function(event) {
	CostElementWin.add(actvityIndicatorView);
							actInd.show();
							cleanWindow(scrollView)
						    CostElementWin.remove(scrollView);
						    getCostElemetList();
							actInd.hide();	
							CostElementWin.remove(actvityIndicatorView);	  
									});

function cleanWindow(winObj)
{
    if (winObj.children) {
        for (var i = winObj.children.length; i > 0; i--){
            cleanWindow(winObj.children[i-1])
            //Ti.API.info( (i-1) + ") " + winObj.children[i-1]);
            winObj.remove(winObj.children[i-1]);
            winObj.children[i-1] = null;
 
        }
    }
}

/**
 * @memberOf GetSettingCostElements	Is a member of GetFromDatabase.js file
 */
var CostElemetsList=[];
var CostElementDetailList=[];

var rowHt=(Ti.Platform.displayCaps.platformHeight*13)/100; 
var rowData=[];
  
getCostElemetList();



//Only for Android
/*
   Function: Set the header for Android devices
   
   @param {Object) headerView			View object that holds the container to the headerLabel  
   @param {Object} headerLabel			Label object that holds the name of header
   @param {Object) leftBtn				Left button object for going back 
   @param {Object) CostElementWin			Window object that holds all the above objects
   @memberOf headerLabel				View that is a member of Header.js file
   @memberOf leftBtn					View that is a member of Header.js file
   @memberOf headerView					View that is a member of Header.js file
*/
  function setHeader () {
			  	headerLabel.text='Cost Elements';
				headerView.add(headerLabel);
				
				leftBtn.title='Back';
				headerView.add(leftBtn);
				
				rightBtn.title='Add';
				headerView.add(rightBtn);
				
				CostElementWin.add(headerView);
 }
 
 
/**
 * Function: Create a list of Cost Groups 
 */	
 
 function getCostElemetList () {
 	
	CostElemetsList=GetSettingCostElements();
	CostElementDetailList=getCostElementDetailList();
 	for(var i=0;i<CostElemetsList.length;i++)
	{
		//Ti.API.info('Cost Group : '+CostElemetsList[i].Name);
		var headerRow=createHeaderRow(i);
		scrollView.add(headerRow);
		for(var j=0;j<CostElementDetailList.length;j++)
		{
			if(CostElementDetailList[j].CostGroupId == CostElemetsList[i].CostGroupID)
			{
				Ti.API.info('Cost Elements : '+CostElementDetailList[j].CostElementName);
				var roww = createSubRow(j);
				scrollView.add(roww);
			}
		}
	}
   CostElementWin.add(scrollView);
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
           	{ 	text:''+CostElemetsList[i].Name,
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'14dp',fontWeight:'bold'}
								 :{fontSize:'12%',fontWeight:'bold'},
				color:'white',
				left:'3%',
           		touchEnabled:false
           	});
           
             rowHeader.add(rowHeaderLabel);
             
       
            return rowHeader;
}

function createSubRow(j) {
	
             rowSubHeader[j] = Ti.UI.createView({
             	id:CostElementDetailList[j].CostElementID,
           		grpId:CostElementDetailList[j].CostGroupId,
           		ceName:''+CostElementDetailList[j].CostElementName,
               backgroundColor: 'white',
               borderColor: '#bbb',
               borderWidth: 1,
               width:'100%', 
               height: rowHt,
               top: 0, left: 0,
              
           });
           
         
           
           var rowHeaderLabel=Ti.UI.createLabel(
           	{ 	
           		text:''+CostElementDetailList[j].CostElementName,
           		font:Ti.Platform.osname =='android'
								 ?{fontSize:'18dp'}
								 :{fontSize:'15%'},
				color:glblDarkGrayFont,
				left:'3%',
				touchEnabled:false
           	});
           	
           	rowSubHeader[j].addEventListener('click',function(e)
			 {
			 	//rowSelector(rowSubHeader[j]);
			 	var winSubTitle=e.source.ceName;
				var CostElemetID=e.source.id;	
				var CostGroupID =e.source.grpId; 	
						if(Ti.Platform.osname =='android')
						{
							CostElementWin.add(actvityIndicatorView);
							actInd.show();
							
							var winOpen=require('ui/common/CostElementDetails');
							new winOpen(winSubTitle,CostGroupID,CostElemetID).open();
							
							actInd.hide();
							CostElementWin.remove(actvityIndicatorView);
						}
						else
						{
							var winOpen=require('ui/common/CostElementDetails');
							navGroup.open(new winOpen(winSubTitle,CostGroupID,CostElemetID),{animated: true});
						}
			 	
			 });
           
             rowSubHeader[j].add(rowHeaderLabel);
             
       
            return rowSubHeader[j];
}
	

return CostElementWin;

}
module.exports=winOpen;