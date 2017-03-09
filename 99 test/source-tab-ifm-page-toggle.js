//タブ切替え & iframeリロード & ページ戻る
javascript:(function(){
	if(is_libra_report_page()) {
		iframe_reload();
	} else {
		if(is_libra_main_page()) {
			tab_toggle();
		} else {
			page_back();
		}
	}
	function is_libra_report_page() {
		var pat = new RegExp(/jis\.infocreate\.co\.jp\/diagnose\/indexv2\/report\//);
		var place = location.href;
		if(pat.test(place)) {
			return true;
		} else {
			return false;
		}
	}
	function is_libra_main_page() {
		var pat = new RegExp(/jis\.infocreate\.co\.jp\/diagnose\/indexv2\/index\//);
		var place = location.href;
		if(pat.test(place)) {
			return true;
		} else {
			return false;
		}
	}
	function page_back() {
		history.back();
	}
	function iframe_reload() {
		var target_src = document.getElementById("pup_urls");
		var target_text_all = target_src.options[target_src.selectedIndex].text;
		var pat = new RegExp(/(\[.+?\])(.+)/);
		var arr = target_text_all.match(pat);
		var target_text = arr[2].toString();
		var target_frame = document.getElementById("pup_display");
		target_frame.setAttribute("src", target_text);
	}
	function tab_toggle() {
		var parent = document.getElementById("tabsA");
		var ul = parent.getElementsByTagName("ul").item(0);
		for(var i=0; i<2; i++) {
			var li = ul.getElementsByTagName("li").item(i);
			var cname = li.getAttribute("class");
			var cpat = new RegExp(/ui-tabs-selected/);
		  if(!cpat.test(cname)) {
		    li.getElementsByTagName("a").item(0).click();
		    break;
		  }
		}
	}
})();
