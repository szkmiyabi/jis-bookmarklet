javascript:(function() {
	var autoflg = "no";
	function trgr() {
		var wrap_id = 'SCode_diag';
		if(document.getElementById(wrap_id)) {
			return;
		}
		var wrap = document.createElement('div');
		var btnfunc = 'erase_diag(this); erase_script(); erase_style();';
		wrap.id = wrap_id;
		var my_html = '<div style="padding:3px;background:#eee;height:19px;">';
		my_html += '<span style="float:left;""<strong>ソースコード参照ツール</strong></span>';
		my_html += '<a style="float:right;" onclick="' + btnfunc + '">閉じる</a></div>';
		my_html += '<button onclick="do_reporting()">読込</button>';
		my_html += '<button onclick="text_all_select()">全選択</button>';
		my_html += '<button onclick="clear_reporting()">クリア</button>';
		my_html += '<button onclick="error_hanting()">エラー抽出</button>';
		my_html += '<textarea id="reportArea"></textarea>';
		wrap.innerHTML = my_html;
		document.getElementsByTagName('body')[0].appendChild(wrap);
		if(document.getElementById("hdjs") == null) {
			var hdjs = document.createElement('script');
			hdjs.id = 'hdjs';
			hdjs.type = 'text/javascript';
			var hdjs_str = '';
			hdjs_str += 'var e = document.getElementById("SCode_diag");';
			hdjs_str += 'var flag;';
			hdjs_str += 'var clickOffsetTop;';
			hdjs_str += 'var clickOffsetLeft;';
			hdjs_str += 'e.onmousedown = function(evt) {';
			hdjs_str += 'flag = "on";';
			hdjs_str += 'evt = (evt) || window.event;';
			hdjs_str += 'clickOffsetTop = evt.clientY - e.offsetTop;';
			hdjs_str += 'clickOffsetLeft = evt.clientX - e.offsetLeft;';
			hdjs_str += 'if(!document.all) {';
			hdjs_str += 'window.getSelection().removeAllRanges();';
			hdjs_str += '}';
			hdjs_str += '};';
			hdjs_str += 'document.onmouseup = function() {';
			hdjs_str += 'flag = "off";';
			hdjs_str += '};';
			hdjs_str += 'document.onmousemove = function(evt) {';
			hdjs_str += 'evt = (evt) || window.event;';
			hdjs_str += 'if(flag == "on") {';
			hdjs_str += 'e.style.top = evt.clientY - clickOffsetTop + "px";';
			hdjs_str += 'e.style.left = evt.clientX - clickOffsetLeft + "px";';
			hdjs_str += '}';
			hdjs_str += '};';
			hdjs.textContent = hdjs_str;
			document.getElementsByTagName("head").item(0).appendChild(hdjs);
		}
		if(document.getElementById("mycss") == null) {
			var mycss = document.createElement('style');
			mycss.id = 'mycss';
			mycss.type = 'text/css';
			var mycss_str = '';
			mycss_str += '#SCode_diag {';
			mycss_str += 'font-family:"メイリオ",sans-serif;font-size:90%;';
			mycss_str += 'padding:5px;position:absolute;top:0;left:0;background:#fff;border:solid #ccc 1px;';
			mycss_str += 'z-index:2999;width:620px;height:250px;';
			mycss_str += '}';
			mycss_str += '#SCode_diag button { font-size: 99%; }';
			mycss_str += '#reportArea { font-size:102%;boder:1px solid #ccc; width: 620px; height: 200px; overflow: scroll;}';
			mycss_str += '#reportTable { width: 620px; border-collapse:collapse; }';
			mycss_str += '#reportTable th,#reportTable td { border:1px solid #ccc; }';
			mycss_str += '#pup_survey_flag { width: 80px; }';
			mycss.textContent = mycss_str;
			document.getElementsByTagName("head").item(0).appendChild(mycss);
		}
		if(document.getElementById("myjs") == null) {
			var myjs = document.createElement('script');
			myjs.type = 'text/javascript';
			myjs.id = 'myjs';
			var myjs_str = '';
			myjs_str += 'function do_reporting() {';
			myjs_str += 'var url = location.href;';
			myjs_str += 'var xmlHttp;';
			myjs_str += 'xmlHttp = new XMLHttpRequest();';
			myjs_str += 'xmlHttp.open("GET", url, false);';
			myjs_str += 'xmlHttp.send(null);';
			myjs_str += 'var result = xmlHttp.responseText;';
			myjs_str += 'document.getElementById("reportArea").value = result;';
			myjs_str += '}';
			myjs_str += 'function tx_clean(str) {';
			myjs_str += 'var pat = new RegExp(/\\t+/g);';
			myjs_str += 'str = str.replace(pat, "");';
			myjs_str += 'return str;';
			myjs_str += '}';
			myjs_str += 'function clear_reporting() {';
			myjs_str += 'document.getElementById("reportArea").value = "";';
			myjs_str += '}';
			myjs_str += 'function text_all_select() {';
			myjs_str += 'var target = document.getElementById("reportArea");';
			myjs_str += 'target.focus();';
			myjs_str += 'target.select();';
			myjs_str += '}';
			myjs_str += 'function error_hanting() {';
			myjs_str += 'var pat = new RegExp(/Error:.*\\n\\n.+\\n\\n.+/mg);';
			myjs_str += 'var pasted = document.getElementById("reportArea").value;';
			myjs_str += 'var arr = pasted.match(pat);';
			myjs_str += 'var str = "";';
			myjs_str += 'for(var i=0; i<arr.length; i++) {';
			myjs_str += 'var t = arr[i].toString();';
			myjs_str += 'str += t + "\\n\\n";';
			myjs_str += '}';
			myjs_str += 'str = str.replace(/^ +/mg, "");';
			myjs_str += 'str = str.replace(/, column.+/mg, "");';
			myjs_str += 'str = str.replace(/From /mg, "");';
			myjs_str += 'str = str.replace(/↩/mg, "");';
			myjs_str += 'document.getElementById("reportArea").value = str;';
			myjs_str += '}';
			myjs_str += 'function erase_diag(obj) {obj.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode);}';
			myjs_str += 'function erase_script() {';
			myjs_str += 'var obj = document.getElementById("myjs");';
			myjs_str += 'obj.parentNode.removeChild(obj);';
			myjs_str += 'var obj = document.getElementById("hdjs");';
			myjs_str += 'obj.parentNode.removeChild(obj);';
			myjs_str += '}';
			myjs_str += 'function erase_style() {';
			myjs_str += 'var obj = document.getElementById("mycss");';
			myjs_str += 'obj.parentNode.removeChild(obj);';
			myjs_str += '}';
			myjs.textContent = myjs_str;
			document.body.appendChild(myjs);
		}
		window.scrollTo(0, 0);
	}
	function _do_reporting() {
		var url = location.href;
		var xmlHttp;
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", url, false);
		xmlHttp.send(null);
		var result = xmlHttp.responseText;
		document.getElementById("reportArea").value = result;
	}
	function _text_all_select() {
		var target = document.getElementById("reportArea");
		target.focus();
		target.select();
	}
	trgr();
	if(autoflg == "yes") {
		_do_reporting();
		_text_all_select();
	}
})();