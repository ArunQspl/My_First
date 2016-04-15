/**
 * @projectDescription QwikFeaso
 * 
 * @author vivek Gidmare vivek.gidmare@quagnitia.com
 * @version 1.0
 * 
 */
var globalImgPath=null;
var glblGreenFont=null;
var glblDarkGrayFont=null;
var glblLightGrayFont=null;
var glblFeasoName;

/**
 * Make a note that there is difference in accessing the global variables for Android and iPhone or iPad
 */
if(Ti.Platform.osname == 'android') // android specific code
{
	// Global variables
	globalImgPath=Ti.App.QwikFeasoGlobalVars.imagePath;
	glblGreenFont=Ti.App.QwikFeasoGlobalVars.greenFontColor;
	glblDarkGrayFont=Ti.App.QwikFeasoGlobalVars.darkGrayFontColor;
	glblLightGrayFont=Ti.App.QwikFeasoGlobalVars.lightGrayFontColor;
}
else // iPhone or iPad specific code
{
	// Global variables
	globalImgPath=QwikFeasoGlobalVars.imagePath;
	glblGreenFont=QwikFeasoGlobalVars.greenFontColor;
	glblDarkGrayFont=QwikFeasoGlobalVars.darkGrayFontColor;
	glblLightGrayFont=QwikFeasoGlobalVars.lightGrayFontColor;
}

// Creates a header view for all screen (Android devices)
var headerView=Ti.UI.createView({
	width:'100%',
	height:'10%',
	backgroundGradient:{type:'linear',
						colors:['#6d6e6f','#595a5c'],
						startPoint:{x:0,y:0},
						endPoint:{x:0,y:100},
						backFillStart:false
						},
	top:0
	});

	var w,h;
	var fontSize;
	var _screenW = parseInt(Titanium.Platform.displayCaps.platformWidth);
	var _screenH = parseInt(Titanium.Platform.displayCaps.platformHeight);
	
	if(_screenW>_screenH)
	{	w='5%';
		h='70%';
		fontSize=(_screenH*5)/100;
	}
	else
	{
		w=Ti.Platform.osname == 'android'?'20%':'17%';
		h='70%';
		fontSize=(_screenH*4)/100;
	}
	
// Creates a left navigation button for all screen (Android devices)	
var leftBtn=Ti.UI.createButton({
	style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
	height:h,
	width:w,
	font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'17%'}
								 :{fontSize:'17dp'},//
	left :Ti.Platform.osname == 'android'? '3%':'2%',
	backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
	borderRadius:5,
	color:'#fff'
	});
	
// Creates a header label for all screen (Android devices)
var headerLabel=Ti.UI.createLabel({
	text:'',
	width:'auto',
	height:'auto',
	textAlign:'center',
	/*font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'18dp',fontWeight:'bold'}
								 :{fontSize:'30%',fontWeight:'bold'},*/
	font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'18dp',fontWeight:'bold'}
								 :{fontSize:'20dp',fontWeight:'bold'},							
	color:'#fff',
	});
	
// Creates a right navigation button for all screen (Android devices)	
var rightBtn = Ti.UI.createButton({
	height:h,
	width:w,
	font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'17%'}
								 :{fontSize:'17dp'},
	right : '3%',
	style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
	backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
	borderRadius:5,
	color:'#fff'
	});
// Creates a sub header view for all screen (Android devices)
var viewSubHeader=Ti.UI.createView({
	width:'100%',
	height:'6%',
	top:'10%',
	backgroundGradient:{type:'linear',colors:['#8cc63f','#79ae33'],startPoint:{x:0,y:0},endPoint:{x:0,y:100},backFillStart:false},
	});
	
// Creates a sub header label for all screen (Android devices)	
var subHeaderLabel = Ti.UI.createLabel({
		text : '',
		color : '#fff',
		font:Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'
								 ?{fontSize:'15%',fontWeight:'bold'}
								 :{fontSize:'16dp',fontWeight:'bold'},
		left : '5%',
		textAlign : 'left',
		height:Ti.UI.Fill,
	});
var actInd = Titanium.UI.createActivityIndicator(
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
	 
var actvityIndicatorView=Ti.UI.createView({
	width:'100%',
	height:'100%',
	//visible:false,
	backgroundColor:'#0000'
});	 

//actvityIndicatorView.add(actInd);	 
	 
	 
/**
 * Function will create option dialog with provided Title and options
 * 
 * @param {Object} Title
 * @param {Object} Options
 * @return OptionDialog object
 */	 
function CreateOptionDialog (Title,Options) {
	var OptionDialog = Ti.UI.createOptionDialog({
					title:Title,
					options:Options,
					destructive:-1,
				});
	  	return OptionDialog;
		}
		
		
var createImageToast = function (time,msg)
{
    Ti.UI.backgroundColor = 'white';
    var win = Ti.UI.createWindow();
   /* var image = Ti.UI.createImageView({
      image: img,
    });*/
    var iAgreeLabel = Ti.UI.createLabel({
		text : msg,
		color : '#ff0000',
		font : Ti.Platform.osname=='android'
						?{fontSize:'30%'}
						:{fontSize:'25%'},
		height : 'auto',
		width : 'auto',
		backgroundColor: '#ffffff'
	});
    win.add(iAgreeLabel);
    win.open();
    setTimeout(function(){
        decreaseImageOpacity(win,iAgreeLabel,1,parseInt(time/10));
    },parseInt(time*9/10));
}	

var decreaseImageOpacity = function (win,iAgreeLabel,opacity, time)
{
    if(opacity<=0)
    {
        win.close();
    }
    else
    {
        setTimeout(function(){
            iAgreeLabel.setOpacity(''+opacity);
            decreaseImageOpacity(win,iAgreeLabel,opacity-0.1, time);
        },parseInt(time/10));
    }   
}	

function isNumeric(val){
	var isNumber = true;
	
	try {
		var fixed = val.toFixed(2);
		Ti.API.info('is a number');
	}
	catch (ex) {
		isNumber = false;		
		Ti.API.info('not a number');	    		
	}
	return isNumber;
}

function wait (millis) {
    var date = new Date();
    var curDate = null;
 
    do { 
        curDate = new Date(); 
    } while(curDate-date < millis);
}

var lodingView = Ti.UI.createWebView({
	top : '0%',
	width : '100%',
	height : '100%',
	backgroundColor : '#ffffff',
	url : 'Data/Loding.html',
	enabled : false
});


function isNetworkAvailable () {
	
  if(Titanium.Network.online)
	{
	    return true;
	}
	else
	{
	    return false;
	}
}

function btnSelector (btn) {
	btn.opacity = 0.8;
	wait(500);
	btn.opacity = 1;
}

function rowSelector (row) {
	row.backgroundColor = '#b4b4b4';
			 	wait(500);
			 	row.backgroundColor = 'white';
	
}

function getStatusBarHeight () {
	
	var height = Math.round((25 * Titanium.Platform.displayCaps.dpi)/160);
  	return height;
}

function dpToPx(dp) {
    var px = Math.round(dp * (Titanium.Platform.displayCaps.dpi / 160));       
    return px;
}

function pxToDp(px) {
    var dp = Math.round(px / (Titanium.Platform.displayCaps.dpi / 160));       
    return dp;
}





