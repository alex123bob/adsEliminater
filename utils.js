function getPath(el,pathFiled){
	var path = [];
	do {
		path.unshift(el[pathFiled] ? el[pathFiled] : " ");
	} while ((el.nodeName != 'BODY') && (el = el.parentNode));
	return path.join(" > ");	
}

function info_pannel(){
	var height = 150;
	this.id = "adsEliminater_info_pannel"+parseInt(Math.random()*100000);
	this.dom = document.createElement("div");
	this.dom.id = this.id;
	document.body.appendChild(this.dom);
	this.dom.style.top = (window.innerHeight+window.scrollY - height)+"px";
	this.dom.classList.add('adsEliminater_info_pannel');
	
	var leftDiv = document.createElement("div");
	var rightDiv = document.createElement("div");
	
	this.tagPath = document.createElement("div");
	this.tagPath.classList.add('tagPath');
	leftDiv.appendChild(this.tagPath);
	
	this.classPath = document.createElement("div");
	this.classPath.classList.add('classPath');
	leftDiv.appendChild(this.classPath);
	
	this.idPath = document.createElement("div");
	this.idPath.classList.add('idPath');
	leftDiv.appendChild(this.idPath);
	
	this.btnCancel = document.createElement("input");
	this.btnCancel.classList.add('btnCancel');
	this.btnCancel.type = 'button';
	this.btnCancel.value = 'Cancel';
	rightDiv.appendChild(this.btnCancel);
	
	this.btnOk = document.createElement("input");
	this.btnOk.classList.add('btnOk');
	this.btnOk.type = 'button';
	this.btnOk.value = 'OK';	
	rightDiv.appendChild(this.btnOk);
	
	this.dom.appendChild(leftDiv);
	this.dom.appendChild(rightDiv);
	leftDiv.classList.add('leftDiv');
	rightDiv.classList.add('rightDiv');
	
	var lastHeight = window.innerHeight+window.scrollY,newHeight,timer;
	 
	var self = this;
	(function run(){
        newHeight = window.innerHeight+window.scrollY;
        if( lastHeight != newHeight )
			self.dom.style.top = (newHeight - height)+"px";
			
        lastHeight = newHeight;
        timer = setTimeout(run, 200);
    })();
	this.showCancel(false);
	this.showOk(false);
}

info_pannel.prototype.info = function(className,str,isAppend){
	if(isAppend){
		this[className].innerHTML += str;
	}else{
		this[className].innerHTML = str;
	}
}

info_pannel.prototype.showCancel = function(isShow){
	this.btnCancel.style.visibility = isShow ? 'visible' :'hidden';
}

info_pannel.prototype.showOk = function(isShow){
	this.btnOk.style.visibility = isShow ? 'visible' :'hidden';
}