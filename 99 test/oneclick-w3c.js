//一発バリデート
javascript:(function() {
	var select = document.getElementById("urlList");
	var idx = select.selectedIndex;
	var option_text = select.options[idx].text;
	var pat = new RegExp(/http.+/);
	var arr = option_text.match(pat);
	var url_text = "";
	if(arr != null) {
		url_text = arr[0].toString();
		window.open('http://validator.w3.org/check?verbose=1&uri=' + url_text, "_blank");
	}
})();