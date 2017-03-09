//上下の未検査実装番号へ移動
javascript:(function(){
	var type="up";
	var tech = document.getElementById("techList");
	var min = 0;
	var max = tech.options.length;
	var idx = tech.selectedIndex;
	if(type == "up") {
		select_prev();
	} else if(type == "down") {
		select_next();
	}
	function select_next(){
		idx++;
		if(!is_max_ov(idx)){
			tech.selectedIndex = idx;
			var event = document.createEvent("HTMLEvents");
			event.initEvent("change", true, false);
			tech.dispatchEvent(event);
		}else{
			alert("これ以上進めません！");
		}
	}
	function select_prev() {
		idx--;
		if(!is_min_ov(idx)) {
			tech.selectedIndex = idx;
			var event = document.createEvent("HTMLEvents");
			event.initEvent("change", true, false);
			tech.dispatchEvent(event);
		}else{
			alert("これ以上戻れません！");
		}
	}
	function is_max_ov(num){
		if(num >= max){
			return true;
		}else{
			return false;
		}
	}
	function is_min_ov(num){
		if(num <= min){
			return true;
		}else{
			return false;
		}
	}
})();