console.log("add listener");

var C = {
	global_blocking : {
						"http://tup.66vod.net:888":true
						,"http://www.baidu.com":true
						,"http://img.twcczhu.com":true
						,"http://p.v3sm.com":true
						}
	,tabs : {}
	,currentTab : {}
	,currentTab = {url:""}
	,enable : true
	,enableSubDomain : true
	
}

chrome.webRequest.onBeforeSendHeaders.addListener(function(request){
	if(!isEnableBlocking || request.type != "script" || currentTab.url == request.url) return;
	if(enable_ckbEnableSubDomain && Url.isSameParentDomain(currentTab.url,requestHost)) return;
	
	var requestHost = request.url.getHost();
	// global blocking
	if(global_blocking[requestHost]){
		return {"cancel":true};
	}

	if(currentTab.url.getHost() != requestHost){
		if(currentTabBlocking[requestHost] == undefined){
			currentTabBlocking[requestHost] = {};
		}
		if(currentTab.url != requestHost){
			console.log("add");
			currentTabBlocking[requestHost][request.url] = true;
		}
		
		console.log(currentTabBlocking);
		return {"cancel":true};
	}
},
{urls: [ "<all_urls>" ]},['requestHeaders','blocking']);

chrome.tabs.onActivated.addListener(function(activeInfo){
	C.currentTab = C.tabs[activeInfo.tabId];
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
	switch(request.command){
		case "set":
			var args = request.key.split(".");
			var param = C;
			var paramName = args.pop();
			for(var i in args){
				param = param[args[i]];
			}
			param[paramName] = request.value;
			break;	
		case "get":
			var args = request.key.split(".");
			var value = C;
			for(var i in args){
				value = value[args[i]];
			}
			sendResponse(value);
			break;
	}
});