javascript:(function(){
	if(is_start_btn()) {
		if(is_disp_start_diag()) {
			var obj = get_done_btn();
			obj.click();
		}else{
			var obj = get_start_btn();
			obj.click();
		}
	}
	function is_start_btn() {
		var obj = get_start_btn();
		if(obj==="undefined" || obj===null || obj===false) {
			return false;
		} else {
			return true;
		}
	}
	function get_start_btn(){
		return document.getElementById("start").getElementsByTagName("button").item(0);
	}
	function is_disp_start_diag(){
		var ret = false;
		var pat = new RegExp(/display.+block/);
		var cn = document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all  ui-draggable ui-resizable");
		for(var i=0;i<cn.length; i++) {
			var obj = cn.item(i);
			var attr = obj.getAttribute("style");
			if(pat.test(attr)) ret = true;
		}
		return ret;
	}
	function get_done_btn(){
		return document.getElementsByClassName("btnB").item(0);
	}
})();