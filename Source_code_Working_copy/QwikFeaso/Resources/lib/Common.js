/**
 * @projectDescription QwikFeaso
 * 
 * @author vivek Gidmare vivek.gidmare@quagnitia.com
 * @version 1.0
 * 
 */

/**
 * validate email address
 * 
 * @param {Object} emailAddress
 * @return true if email is in valid format
 * 		   false if email isn't in valid format
 */
function validateEmail(emailAddress) {
 	var filter= /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   		
   return filter.test(emailAddress)?true:false;
 };


