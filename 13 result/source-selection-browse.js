javascript:(function(){
	function repoUtilClass() {
		this.tbl = document.getElementsByTagName("table").item(1);
		this.pt0 = new RegExp(/<.+?>/);
		this.pt1 = new RegExp(/(http.*:\/\/.+?\/)/);
		this.pt2 = new RegExp(/(src|href)="(.+?)"/);
		this.pt3 = new RegExp(/(http.*:\/\/.+)/);

		this.get_this_url = function() {
			var rows = this.tbl.rows;
			var rowdata = rows.item(1);
			return rowdata.cells.item(1).innerText;
		};
		this.get_this_home_url = function(url) {
			var mt = url.match(this.pt1);
			if(mt!==null) return mt[1];
			else return null;
		};
		this.is_text_select = function() {
			if(window.getSelection().toString() !== "") return true;
			else return false;
		};
		this.is_valid_select = function(str) {
			var tt = this.get_select_text();
			if(this.pt0.test(tt)) return true;
			else return false;
		};
		this.get_select_text = function() {
			return window.getSelection().toString();
		};
		this.get_srcattr_text = function(str) {
			var mt = str.match(this.pt2);
			if(mt!==null) return mt[2];
			else return null;
		};
		this.browse_image = function() {
			if(!this.is_valid_select()) {
				alert("選択範囲が正しくありません");
				return;
			}
			var baseurl = this.get_this_home_url(this.get_this_url());
			var subdir = this.get_srcattr_text(this.get_select_text());
			var finalurl = baseurl + subdir;
			window.open(finalurl, "_blank");
		};
		this.browse_page = function() {
			var url = this.get_this_url();
			if(this.pt3.test(url)) {
				var burl = url.match(this.pt3)[1];
				window.open(burl, "_blank");
			}else{
				alert("エラーです。");
			}
		};
	}

	var util = new repoUtilClass();
	if(util.is_text_select()) util.browse_image();
	else util.browse_page();

})();