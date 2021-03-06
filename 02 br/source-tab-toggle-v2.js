//3つのタブを切り替えユーティリティ
javascript:(function(){
	var opt="rdo-next";/*--src-tgl,pg-tgl,next,prev,rdo-next,rdo-prev--*/
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
		get_detail_current: function(n) {
			var rdos = this.get_rdos(n);
			for(var i=0; i<rdos.length; i++) {
				var ip = rdos.item(i);
				if(ip.checked == true) {
					return i;
				}
			}
		},
		get_rdos: function(n) {
			if(n == 0) {
				return document.getElementById("tabs-1").getElementsByTagName("input");
			} else if(n == 1) {
				return document.getElementById("tabs-2").getElementsByTagName("input");
			} else if(n == 2) {
				return document.getElementById("tabs-3").getElementsByTagName("input");
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
		radio_next: function() {
			var pn = this.get_current();
			var n = this.get_detail_current(pn);
			n++;
			if(n > 1) n = 0;
			var rdos = this.get_rdos(pn);
			rdos.item(n).checked = true;
			rdos.item(n).click();
			var event = document.createEvent("HTMLEvents");
			event.initEvent("click", true, false);
			rdos.item(n).dispatchEvent(event);
		},
		radio_prev: function() {
			var pn = this.get_current();
			var n = this.get_detail_current(pn);
			n--;
			if(n < 0) n = 1;
			var rdos = this.get_rdos(pn);
			rdos.item(n).checked = true;
			rdos.item(n).click();
			var event = document.createEvent("HTMLEvents");
			event.initEvent("click", true, false);
			rdos.item(n).dispatchEvent(event);
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
		case "rdo-next":
			util.radio_next();
			break;
		case "rdo-prev":
			util.radio_prev();
			break;
	}
})();
