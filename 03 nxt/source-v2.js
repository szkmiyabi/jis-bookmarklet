//次のURLに進む
javascript:(function(){
	if(is_main_page()) main_routin();
	if(is_repo_page()) repo_routin();
	function main_routin() {
		var response=true;
		var element=document.getElementById("urlList");
		for(var i=0;i<element.options.length;i++){
			var idx=i+1;
			if(idx==element.options.length){
				alert("これ以上進めません！");
				response=false;
				break;
			}
			if(element.options[i].selected){
				element.options[idx].selected = true;
				break;
			}
		}
		if(response) document.getElementById("submitURL").click();
	}
	function repo_routin() {
		var hr = location.href;
		var pat = new RegExp(/jis.infocreate.co.jp\/diagnose\/indexv2\/report2\/projID\/(.+?)\/controlID\/(.+?)\/guideline\/(.+?)\//);
		var arr = hr.match(pat);
		var projID = arr[1].toString();
		var pageID = arr[2].toString();
		var guidelineID = arr[3].toString();
		var spat = new RegExp(/([a-zA-Z]+)([0-9]+)/);
		var sarr = pageID.match(spat);
		var pageStr = sarr[1].toString();
		var pageNo = Number(sarr[2].toString());
		pageNo++;
		var newPageID = pageStr + ("000" + pageNo).slice(-4);
		var newHr = "http://jis.infocreate.co.jp/diagnose/indexv2/report2/projID/" + projID + "/controlID/" + newPageID + "/guideline/" + guidelineID + "/";
		location.href = newHr;
	}
	function is_main_page() {
		var str = location.href;
		var pat = new RegExp(/jis.infocreate.co.jp\/diagnose\/indexv2\/index\//);
		if(pat.test(str)) return true;
		else return false;
	}
	function is_repo_page() {
		var str = location.href;
		var pat = new RegExp(/jis.infocreate.co.jp\/diagnose\/indexv2\/report2\//);
		if(pat.test(str)) return true;
		else return false;
	}
})();