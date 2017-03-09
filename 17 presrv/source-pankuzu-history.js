javascript:(function(){
	/* サイトマップページへの相対パス */
	var sitemap_path = "/sitemap/index.html";
	/* パンくずリストがある親要素のID属性 */
	var base_id = "maincontentswrap2011";
	/* パンくずリストを囲んでいる要素のCLASS属性 */
	var in_base_cls = "bread2011";
	var base = null;
	var in_base = null;
	if(base_id !== "") {
		base = document.getElementById(base_id);
	}
	if(in_base_cls !== "" && base !== null) {
		in_base = base.getElementsByClassName(in_base_cls).item(0);
	}
	var brd_list = null;
	if(in_base !== null) {
		brd_list = in_base.getElementsByTagName("a");
	} else {
		brd_list = base.getElementsByTagName("a");
	}
	var data = new Array();
	for(var i=0; i<brd_list.length; i++) {
		data[i] = new Array();
		var a = brd_list.item(i);
		if(a == null) continue;
		var text = a.innerHTML;
		var href = a.getAttribute("href");
		if(!is_fullpath(href) && href !== "") href = get_home() + href;
		data[i][0] = text;
		data[i][1] = href;
	}
	/* サイトマップリンク存在確認を行なわないならコメントアウト */
	/* open_sitemap(sitemap_path); */
	data.reverse();
	for(var i=0; i<data.length; i++) {
		if(data[i].length == 0) continue;
		var url = data[i][1];
		var str = data[i][0];
		if(url === "") {
			var d = window.open().document;
			d.write("空リンク: " + str);
		} else {
			window.open(url);
		}
	}
	function is_fullpath(path) {
		var pat = new RegExp(/(^http.*)/);
		if(pat.test(path)) return true;
		else return false;
	}
	function get_home() {
		var home_url = "";
		var href = location.href;
		var pat = new RegExp(/(http.*\/\/.+?\/)/);
		if(pat.test(href)) {
			var arr = href.match(pat);
			home_url = arr[1];
		}
		return home_url;
	}
	function open_sitemap(sitemap_path) {
		var atags = document.getElementsByTagName("a");
		for(var i=0; i<atags.length; i++) {
			var a = atags.item(i);
			if(a===null) continue;
			var href = a.getAttribute("href");
			var pat = new RegExp(sitemap_path);
			if(pat.test(href)) {
				var burl = "";
				if(is_fullpath(sitemap_path)) {
					burl = sitemap_path;
				} else {
					burl = get_home() + sitemap_path;
				}
				window.open(burl);
				break;
			}
		}
	}

})();