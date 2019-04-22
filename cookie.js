//JavaScript Document
function setCookie(cname, cvalue){
	document.cookie = cname + "=" + cvalue + ";expires=" + expiration(365);
	}
	
function expiration(days) {
	var currentDate = new Date();
	currentDate.setTime(currentDate.getTime() + (1000*60*60*24* days ));
	return currentDate.toUTCString();
	}
	
function getCookie(cname){
	var valueStart;
	var valueEnd;
	var valueString;
	valueStart = document.cookie.indexOf(cname);
		if(valueStart > -1) {
			valueStart+= cname.length +1;
			valueEnd = document.cookie.indexOf(";",valueStart);
				if(valueEnd < valueStart) {
					valueEnd = document.cookie.length;
					}
				valueString = document.cookie.substring(valueStart,valueEnd);
				return valueString;
				
			}
		else {
			return null;
			}
	}
