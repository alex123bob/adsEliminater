status('enabled');

var selectedDomEle;
var tmpSelectedDomEle;
var selectedDomElePath;
var tmpOverDomEle,tmpOverDomElePath;
var _status = 'enabled';


var panel = new info_pannel();
panel.btnCancel.addEventListener('click',function(){
	status('enabled');
},true);
panel.btnOk.addEventListener('click',function(){
	console.log('btnOk');
},true);

document.addEventListener('keydown',function(e){
	if(e.keyCode != 70 || !e.shiftKey)
		return;
	console.log("selected");
	rightClick();
},true);

function rightClick(e) {
	status('selected');
	selectedDomEle = e ? e.target : tmpOverDomEle;
	selectedDomElePath = e ? e.path : tmpOverDomElePath;
	var idPath = [];
	var tagPath= [];
	var classPath= [];
	
	for(var i = selectedDomElePath.length-5;i > -1;i--){
		tagPath.push("<span data-index="+i+" data-type='nodeName'>"+selectedDomElePath[i].nodeName+"</span>");
		idPath.push("<span data-index="+i+" data-type='id'>"+(selectedDomElePath[i].id ? selectedDomElePath[i].id : "NULL")+"</span>");
		classPath.push("<span data-index="+i+" data-type='className'>"+(selectedDomElePath[i].className ? selectedDomElePath[i].className : "NULL")+"</span>");
	}
	panel.info('tagPath',tagPath.join('->'));
	panel.info('idPath',idPath.join('->'));
	panel.info('classPath',classPath.join('->'));
	panel.showCancel(true);
	panel.showOk(true);
	if(e)
		e.preventDefault();
}


function mouseOverListener(e){
	var dom = e.target;
	tmpOverDomEle = dom;
	tmpOverDomElePath = e.path;
	var idPath = getPath(dom,'id');
	if(dom.nodeName == "BODY" || idPath.contains("adsEliminater_info_pannel"))
		return;
	panel.info('tagPath',getPath(dom,'nodeName'));
	panel.info('classPath',getPath(dom,'className'));
	panel.info('idPath',idPath);
	
	dom.classList.add('adEliminater_hover');
}

function mouseOutListener(e){
	var dom = e.target;
	var idPath = getPath(dom,'id');
	if(dom.nodeName == "BODY" || idPath.contains("adsEliminater_info_pannel"))
		return;
	dom.classList.remove('adEliminater_hover');
}

function overPath(e){
	var dom = e.target;
	if(dom.nodeName != 'SPAN')
		return;
	var d = selectedDomElePath[dom.dataset['index']];
	selectedDomEle.classList.remove('adEliminater_hover');
	d.classList.add('adEliminater_hover');
}
function outPath(e){
	var dom = e.target;
	if(dom.nodeName != 'SPAN')
		return;
	var d = selectedDomElePath[dom.dataset['index']];
	d.classList.remove('adEliminater_hover');
	selectedDomEle.classList.add('adEliminater_hover');
}

function clickPath(e){
	var dom = e.target;
	if(dom.nodeName != 'SPAN')
		return;
	var d = selectedDomElePath[dom.dataset['index']];
	selectedDomEle.classList.remove('adEliminater_hover');
	d.classList.add('adEliminater_hover');
	selectedDomEle = d;
}
function status(st){
	//clean up
	switch(_status){
		case 'selected':
			panel.dom.removeEventListener("mouseover",overPath,true);
			panel.dom.removeEventListener("mouseout",outPath,true);
			selectedDomEle.classList.remove('adEliminater_hover');
			selectedDomEle.classList.remove('adEliminater_hover');
			panel.showCancel(false);
			panel.showOk(false);
			break;
		case 'disabled':
			break;
		case 'enabled':
		default:
			document.body.removeEventListener("mouseover",mouseOverListener,true);
			document.body.removeEventListener("mouseout",mouseOutListener,true);
			document.body.removeEventListener('contextmenu',rightClick, true);
			break;
	}
	
	_status = st;
	switch(st){
		case 'selected':
			panel.dom.addEventListener("mouseover",overPath,true);
			panel.dom.addEventListener("click",clickPath,true);
			panel.dom.addEventListener("mouseout",outPath,true);
			break;
		case 'disabled':
			break;
		case 'enabled':
		default:
			document.body.addEventListener("mouseover",mouseOverListener,true);
			document.body.addEventListener("mouseout",mouseOutListener,true);
			document.body.addEventListener('contextmenu',rightClick, true);
			break;
	}
}