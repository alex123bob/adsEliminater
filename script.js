var $ckbEnable,$blockedDomain,$ckbEnableSubDomain;

$(function(){		
	$ckbEnable = $("#ckbEnable").on("click",function(){
		var enable = $ckbEnable.prop("checked");
		chrome.runtime.sendMessage({"command":"enable_blocking","value":enable}, function(response) {
			//console.log(response.farewell);
		});
	});
	
	$ckbEnableSubDomain = $("#ckbEnableSubDomain").on("click",function(){
		var enable = $ckbEnableSubDomain.prop("checked");
		chrome.runtime.sendMessage({"command":"set","key":  "value":enable}, function(response) {
			//console.log(response.farewell);
		});
	});

	$blockedDomain = $("#blockedDomain");
	
	Config(function(){
		
		
		
	},);
	
	chrome.runtime.sendMessage({"command":"isEnable_blocking"}, function(response) {
		$ckbEnable.prop("checked",response.isEnable_blocking == true );
	});
	
	chrome.runtime.sendMessage({"command":"getBlockedHosts"}, function(response) {
		debugger
		var blockedHosts = response.getBlockedHosts;
		var global_blocking = response.global_blocking;
		var str = "<font class='blockingTitle'>global:</font><br />";
		// global
		for(var host in global_blocking){
			str += global_blocking[host]+":"+host+"<br />";
		}
		// current page
		str += "<br /><font class='blockingTitle'>currentPage:</font><br />";
		for(var host in blockedHosts){
			str += host;
			for(url in blockedHosts[host]){
				str +="<br />"+blockedHosts[host][url]+":"+url;
			}
			str +="<br /><br />";
		}
		
		
		
		
		$blockedDomain.html(str);
	});	
});

function Config(){
	
	var request = {};
	if(arguments.length == 1 || arguments.length == 2){
		request.command = "get"
	}
	
	chrome.runtime.sendMessage({"command": command ,"key": key },func);
}