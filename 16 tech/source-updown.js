//上下の未検査実装番号へ移動
javascript:(function(){
	var gds = document.getElementById("techList");
	var idx = gds.selectedIndex;
	for(var i=0; i<gds.options.length; i++) {
		if(i == 0) continue;
		if(i == idx) continue;
		var row = gds.options[i].text;
		var pat = new RegExp(/【完】.+/);
		if(!pat.test(row)) {
			gds.selectedIndex = i;
			var event = document.createEvent("HTMLEvents");
			event.initEvent("change", true, false);
			gds.dispatchEvent(event);
			break;
		}
	}
})();