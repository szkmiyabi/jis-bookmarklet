javascript:(function(){
	var tar = document.getElementById("pup_urls");
	var idx = tar.options.selectedIndex;
	var all_txt = tar.options[idx].text;
	var pat = new RegExp(/\[([a-zA-Z0-9]+?)\]/);
	var arr = all_txt.match(pat);
	alert(arr[1].toString());
})();