String.prototype.contains = function(str){
	return this.indexOf(str) != -1;	
};

String.prototype.startWith = function(str){
	if(str == null || str == undefined ) return false;
	if(str.length>this.length) return false;
	return this.indexOf(str) == 0;
}


String.prototype.endWith = function(str){
	if(str == null || str == undefined ) return false;
	if(str.length>this.length) return false;
	var lastStr = this.substring(this.length - str.length);
	return lastStr === str;
}

String.prototype.getHost = function(format){
	var urls = this.split("/");
	if(urls.length < 3) return "";
	return urls[0]+"//"+urls[2];
}

Url = {
	isSameParentDomain : function(url1,url2){
		if(typeof url1 != "string" || typeof url2 != "string" ) return false;
		url1 = url1.replace("https://","").replace("http://","");
		url2 = url2.replace("https://","").replace("http://","");
		var index = url1.indexOf("/");
		if(index != -1){
			url1 = url1.substring(0,index);
		}
		index = url2.indexOf("/");
		if(index != -1){
			url2 = url2.substring(0,index);
		}
		var ua1 = url1.split(".").reverse();
		var ua2 = url2.split(".").reverse();
		return ua1[0] == ua2[0] && ua1[1] == ua2[1];
	}
	
}