//3つのタブを切り替えユーティリティ
javascript:(function(){
	var opt="next";/*--src-tgl,pg-tgl,next,prev--*/
	function tabUtility() {
		d = document.getElementById("tabsA");
		ul = d.getElementsByTagName("ul").item(0);
	}
	tabUtility.prototype = {
		get_current: function() {
			var pat = new RegExp(/ui-tabs-selected/);
			for(var i=0; i<3; i++) {
				var li = ul.getElementsByTagName("li").item(i);
				var cls = li.getAttribute("class");
				if(pat.test(cls)) return i;
			}
		},
		tab_next: function() {
			var n = this.get_current();
			n++;
			if(n > 2) n = 0;
			var li = ul.getElementsByTagName("li").item(n);
			li.getElementsByTagName("a").item(0).click();
		},
		tab_prev: function() {
			var n = this.get_current();
			n--;
			if(n < 0) n = 2;
			var li = ul.getElementsByTagName("li").item(n);
			li.getElementsByTagName("a").item(0).click();
		},
		src_detail_toggle: function() {
			var n = this.get_current();
			if(n != 1) {
				var li = ul.getElementsByTagName("li").item(1);
				li.getElementsByTagName("a").item(0).click();
			} else {
				var li = ul.getElementsByTagName("li").item(2);
				li.getElementsByTagName("a").item(0).click();
			}
		},
		pg_detail_toggle: function() {
			var n = this.get_current();
			if(n != 0) {
				var li = ul.getElementsByTagName("li").item(0);
				li.getElementsByTagName("a").item(0).click();
			} else {
				var li = ul.getElementsByTagName("li").item(2);
				li.getElementsByTagName("a").item(0).click();
			}
		}
	};
	var util = new tabUtility();
	switch(opt) {
		case "src-tgl":
			util.src_detail_toggle();
			break;
		case "pg-tgl":
			util.pg_detail_toggle();
			break;
		case "next":
			util.tab_next();
			break;
		case "prev":
			util.tab_prev();
			break;
	}
})();
