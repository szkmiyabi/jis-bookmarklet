//リンク画像か判定
javascript:(function(){
	var br=true;
	var msg = (br == true) ? "[" + get_url_val() + "]" + "\n" + get_guideline_val() + "\n" + get_tech_val() : "[" + get_url_val() + "]" + " " + get_guideline_val() + " " + get_tech_val();
	alert(msg);
	function get_url_val() {
		var url = document.getElementById("urlList");
		var idx = url.options.selectedIndex;
		var text = url.options[idx].value;
		return text;
	}
	function get_guideline_val() {
		var gl = document.getElementById("guideline");
		var idx = gl.options.selectedIndex;
		var text = gl.options[idx].value;
		return text;
	}
	function get_tech_val() {
		var tc = document.getElementById("techList");
		var idx = tc.options.selectedIndex;
		var text = tc.options[idx].value;
		return text;
	}
})();