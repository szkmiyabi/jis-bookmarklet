javascript:(function() {
	var guidelines = [
	  "7.1.1.1",
	  "7.1.2.1",
	  "7.1.2.2",
	  "7.1.2.3",
	  "7.1.2.4",
	  "7.1.2.5",
	  "7.1.3.1",
	  "7.1.3.2",
	  "7.1.3.3",
	  "7.1.4.1",
	  "7.1.4.2",
	  "7.1.4.3",
	  "7.1.4.4",
	  "7.1.4.5",
	  "7.2.1.1",
	  "7.2.1.2",
	  "7.2.2.1",
	  "7.2.2.2",
	  "7.2.3.1",
	  "7.2.4.1",
	  "7.2.4.2",
	  "7.2.4.3",
	  "7.2.4.4",
	  "7.2.4.5",
	  "7.2.4.6",
	  "7.2.4.7",
	  "7.3.1.1",
	  "7.3.1.2",
	  "7.3.2.1",
	  "7.3.2.2",
	  "7.3.2.3",
	  "7.3.2.4",
	  "7.3.3.1",
	  "7.3.3.2",
	  "7.3.3.3",
	  "7.3.3.4",
	  "7.4.1.1",
	  "7.4.1.2"
	];
	function trgr(guidelines) {
			var wrap_id = 'CheckTool_diag';
			if(document.getElementById(wrap_id)) {
				return;
			}
			var wrap = document.createElement('div');
			var btnfunc = 'erase_diag(this); erase_script(); erase_style();';
			wrap.id = wrap_id;
			var my_html = '<div style="padding:3px;background:#eee;height:19px;">';
			my_html += '<span style="float:left;""<strong>検査結果確認ツール</strong></span>';
			my_html += '<a style="float:right;" onclick="' + btnfunc + '">閉じる</a></div>';
			my_html += '<label>【達成基準マーキング】</label><br>';
			my_html += '<select id="pup_guideline_id"></select>';
			my_html += '<button onclick="do_marking()">実行</button>';
			my_html += '<button onclick="do_unmarking()">解除</button>';
			wrap.innerHTML = my_html;
			document.getElementsByTagName('body')[0].appendChild(wrap);
			var select = document.getElementById("pup_guideline_id");
			for(var i=0; i<guidelines.length; i++) {
				var elm = document.createElement("option");
				elm.setAttribute("value", guidelines[i].toString());
				elm.textContent = guidelines[i].toString();
				select.appendChild(elm);
			}

			if(document.getElementById("hdjs") == null) {
				var hdjs = document.createElement('script');
				hdjs.id = 'hdjs';
				hdjs.type = 'text/javascript';
				var hdjs_str = '';
				hdjs_str += 'var e = document.getElementById("CheckTool_diag");';
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
				mycss_str += '#CheckTool_diag {';
				mycss_str += 'font-family:"メイリオ",sans-serif;font-size:90%;';
				mycss_str += 'padding:5px;position:absolute;top:0;left:0;background:#fff;border:solid #ccc 1px;';
				mycss_str += 'z-index:2999;width:290px;height:90px;';
				mycss_str += '}';
				mycss.textContent = mycss_str;
				document.getElementsByTagName("head").item(0).appendChild(mycss);
			}
			if(document.getElementById("myjs") == null) {
				var myjs = document.createElement('script');
				myjs.type = 'text/javascript';
				myjs.id = 'myjs';
				var myjs_str = '';
				myjs_str += 'function do_marking() {';
				myjs_str += 'var target_src = document.getElementById("pup_guideline_id");';
				myjs_str += 'var target = target_src.options[target_src.selectedIndex].text;';
				myjs_str += 'target += "/";';
				myjs_str += 'var tbl = document.getElementsByTagName("table").item(2);';
				myjs_str += 'var tr = tbl.rows;';
				myjs_str += 'for(var i=0; i<tr.length; i++) {';
				myjs_str += 'var row = tr.item(i);';
				myjs_str += 'if(i < 2) continue;';
				myjs_str += 'for(var j=0; j<row.cells.length; j++) {';
				myjs_str += 'if(j < 2) continue;';
				myjs_str += 'var col = row.cells.item(j);';
				myjs_str += 'var href = col.getElementsByTagName("a").item(0);';
				myjs_str += 'var pat = new RegExp(target);';
				myjs_str += 'if(pat.test(href)) {';
				myjs_str += 'col.setAttribute("style", "background:yellow");';
				myjs_str += '}';
				myjs_str += '}';
				myjs_str += '}';
				myjs_str += '}';
				myjs_str += 'function do_unmarking() {';
				myjs_str += 'var target_src = document.getElementById("pup_guideline_id");';
				myjs_str += 'var target = target_src.options[target_src.selectedIndex].text;';
				myjs_str += 'target += "/";';
				myjs_str += 'var tbl = document.getElementsByTagName("table").item(2);';
				myjs_str += 'var tr = tbl.rows;';
				myjs_str += 'for(var i=0; i<tr.length; i++) {';
				myjs_str += 'var row = tr.item(i);';
				myjs_str += 'if(i < 2) continue;';
				myjs_str += 'for(var j=0; j<row.cells.length; j++) {';
				myjs_str += 'if(j < 2) continue;';
				myjs_str += 'var col = row.cells.item(j);';
				myjs_str += 'var href = col.getElementsByTagName("a").item(0);';
				myjs_str += 'var pat = new RegExp(target);';
				myjs_str += 'if(pat.test(href)) {';
				myjs_str += 'col.setAttribute("style", "");';
				myjs_str += '}';
				myjs_str += '}';
				myjs_str += '}';
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
	trgr(guidelines);
})();