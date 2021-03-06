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
	var surveyarr = {
	  "all":"全て",
	  "uc":"未",
	  "ok":"適合",
	  "ok2":"適合(注記)",
	  "fail":"不適合",
	  "fail2":"不適合(要再判定)",
	  "na":"非適用"
	};
	function trgr(guidelines, surveyarr) {
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
		my_html += '<select id="pup_guideline_id"></select>';
		my_html += '<button onclick="do_marking()">色付実行</button>';
		my_html += '<button onclick="do_unmarking()">色付解除</button>';
		my_html += '<button onclick="do_marking_uncomp()">未完色付</button>';
		my_html += '<button onclick="do_unmarking_uncomp()">未完色無</button>';
		my_html += '<select id="pup_page_id"></select>';
		my_html += '<select id="pup_survey_flag"></select>';
		my_html += '<button onclick="do_reporting()">参照</button>';
		my_html += '<button onclick="clear_reporting()">クリア</button>';
		my_html += '<div id="reportArea"></div>';
		wrap.innerHTML = my_html;
		document.getElementsByTagName('body')[0].appendChild(wrap);
		var select = document.getElementById("pup_guideline_id");
		for(var i=0; i<guidelines.length; i++) {
			var elm = document.createElement("option");
			elm.setAttribute("value", guidelines[i].toString());
			elm.textContent = guidelines[i].toString();
			select.appendChild(elm);
		}
		var select2 = document.getElementById("pup_page_id");
		var pgarr = new Array();
		var tbl = document.getElementsByTagName("table").item(2);
		var tr = tbl.rows;
		for(var i=0; i<tr.length; i++) {
			if(i < 2) continue;
			var row = tr.item(i);
			var pgid = row.cells.item(0).innerHTML;
			pgarr.push(pgid);
		}
		for(var i=0; i<pgarr.length; i++) {
			var elm2 = document.createElement("option");
			elm2.setAttribute("value", pgarr[i].toString());
			elm2.textContent = pgarr[i].toString();
			select2.appendChild(elm2);
		}
		var select3 = document.getElementById("pup_survey_flag");
		for(var key in surveyarr) {
			var elm3 = document.createElement("option");
			elm3.setAttribute("value", key);
			elm3.textContent = surveyarr[key].toString();
			select3.appendChild(elm3);
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
			mycss_str += 'z-index:2999;width:620px;height:250px;';
			mycss_str += '}';
			mycss_str += '#CheckTool_diag button { font-size: 99%; }';
			mycss_str += '#reportArea { boder:1px solid #ccc; width: 620px; height: 200px; overflow: scroll;}';
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
			myjs_str += 'function get_target_page_url(pgid, target) {';
			myjs_str += 'var ret = "";';
			myjs_str += 'var tbl = document.getElementsByTagName("table").item(2);';
			myjs_str += 'var tr = tbl.rows;';
			myjs_str += 'for(var i=0; i<tr.length; i++) {';
			myjs_str += 'if(i < 2) continue;';
			myjs_str += 'var row = tr.item(i);';
			myjs_str += 'var qpgid = row.cells.item(0).innerHTML;';
			myjs_str += 'if(qpgid == pgid) {';
			myjs_str += 'for(var j=0; j<row.cells.length; j++) {';
			myjs_str += 'if(j < 2) continue;';
			myjs_str += 'var col = row.cells.item(j);';
			myjs_str += 'var href = col.getElementsByTagName("a").item(0);';
			myjs_str += 'var pat = new RegExp(target);';
			myjs_str += 'if(pat.test(href)) {';
			myjs_str += 'ret = href;';
			myjs_str += 'break;';
			myjs_str += '}';
			myjs_str += '}';
			myjs_str += '}';
			myjs_str += '}';
			myjs_str += 'return ret;';
			myjs_str += '}';
			myjs_str += 'function do_reporting() {';
			myjs_str += 'var select1 = document.getElementById("pup_guideline_id");';
			myjs_str += 'var target = select1.options[select1.selectedIndex].text;';
			myjs_str += 'var select2 = document.getElementById("pup_page_id");';
			myjs_str += 'var pgid = select2.options[select2.selectedIndex].text;';
			myjs_str += 'var select3 = document.getElementById("pup_survey_flag");';
			myjs_str += 'var svflg = select3.options[select3.selectedIndex].value;';
			myjs_str += 'var url = get_target_page_url(pgid, target);';
			myjs_str += 'var xmlHttp;';
			myjs_str += 'xmlHttp = new XMLHttpRequest();';
			myjs_str += 'xmlHttp.open("GET", url, false);';
			myjs_str += 'xmlHttp.send(null);';
			myjs_str += 'var result = xmlHttp.responseText;';
			myjs_str += 'result = result.replace(/(\\r\\n|\\r|\\n)/g,"");';
			myjs_str += 'var pat = new RegExp(/(<div class="list">)(.+?)(<\\/div>)/);';
			myjs_str += 'var arr = result.match(pat);';
			myjs_str += 'var html = arr[2].toString();';
			myjs_str += 'var domps = new DOMParser();';
			myjs_str += 'var domhtml = domps.parseFromString(html, "text/html");';
			myjs_str += 'var domtbl = domhtml.getElementsByTagName("table").item(0);';
			myjs_str += 'var tr = domtbl.rows;';
			myjs_str += 'var htmlstr = \'<table id="reportTable">\';';
			myjs_str += 'for(var i=0; i<tr.length; i++) {';
			myjs_str += 'var row = tr.item(i);';
			myjs_str += 'var svtbl = tx_clean(row.cells.item(2).innerHTML);';
			myjs_str += 'if(svflg == "all") {';
			myjs_str += 'htmlstr += tr_create(row);';
			myjs_str += '} else {';
			myjs_str += 'if(i == 0) htmlstr += tr_create(row);';
			myjs_str += 'if(svflg == "uc" && svtbl == "未") {';
			myjs_str += 'htmlstr += tr_create(row);';
			myjs_str += '}else if(svflg == "ok" && svtbl == "適合") {';
			myjs_str += 'htmlstr += tr_create(row);';
			myjs_str += '}else if(svflg == "ok2" && svtbl == "適合(注記)") {';
			myjs_str += 'htmlstr += tr_create(row);';
			myjs_str += '}else if(svflg == "fail" && svtbl == "不適合") {';
			myjs_str += 'htmlstr += tr_create(row);';
			myjs_str += '}else if(svflg == "fail2" && svtbl == "不適合(要再判定)") {';
			myjs_str += 'htmlstr += tr_create(row);';
			myjs_str += '}else if(svflg == "na" && svtbl == "非適用") {';
			myjs_str += 'htmlstr += tr_create(row);';
			myjs_str += '}';
			myjs_str += '}';
			myjs_str += '}';
			myjs_str += 'var ckpat = new RegExp(/(<tr>.+?<\\/tr>)/mg);';
			myjs_str += 'if(htmlstr.match(ckpat).length < 2) htmlstr += \'<tr><td colspan="6">結果はありません</td></tr>\';';
			myjs_str += 'htmlstr += "</table>";';
			myjs_str += 'document.getElementById("reportArea").innerHTML = htmlstr;';
			myjs_str += '}';
			myjs_str += 'function tr_create(row) {';
			myjs_str += 'var html = "<tr>";';
			myjs_str += 'for(var j=0; j<row.cells.length; j++) {';
			myjs_str += 'if(j == 0) continue;';
			myjs_str += 'var cellstr = row.cells.item(j).innerHTML;';
			myjs_str += 'if(cellstr == "") cellstr = "なし";';
			myjs_str += 'html += "<td>" + cellstr + "</td>";';
			myjs_str += '}';
			myjs_str += 'html += "</tr>";';
			myjs_str += 'return html;';
			myjs_str += '}';
			myjs_str += 'function tx_clean(str) {';
			myjs_str += 'var pat = new RegExp(/\\t+/g);';
			myjs_str += 'str = str.replace(pat, "");';
			myjs_str += 'return str;';
			myjs_str += '}';
			myjs_str += 'function clear_reporting() {';
			myjs_str += 'document.getElementById("reportArea").innerHTML = "";';
			myjs_str += '}';
			myjs_str += 'function do_marking_uncomp() {';
			myjs_str += 'var tbl = document.getElementsByTagName("table").item(2);';
			myjs_str += 'var tr = tbl.rows;';
			myjs_str += 'for(var i=0; i<tr.length; i++) {';
			myjs_str += 'if(i < 2) continue;';
			myjs_str += 'var row = tr.item(i);';
			myjs_str += 'var first_cell = row.cells.item(0);';
			myjs_str += 'for(var j=0; j<row.cells.length; j++) {';
			myjs_str += 'if(j < 2) continue;';
			myjs_str += 'var cell = row.cells.item(j);';
			myjs_str += 'var cell_data = cell.getElementsByTagName("a").item(0).innerHTML;';
			myjs_str += 'if(cell_data == "－") {';
			myjs_str += 'first_cell.setAttribute("style", "background:yellow");';
			myjs_str += '}';
			myjs_str += '}';
			myjs_str += '}';
			myjs_str += '}';
			myjs_str += 'function do_unmarking_uncomp() {';
			myjs_str += 'var tbl = document.getElementsByTagName("table").item(2);';
			myjs_str += 'var tr = tbl.rows;';
			myjs_str += 'for(var i=0; i<tr.length; i++) {';
			myjs_str += 'if(i < 2) continue;';
			myjs_str += 'var row = tr.item(i);';
			myjs_str += 'row.cells.item(0).removeAttribute("style");';
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
	trgr(guidelines, surveyarr);
})();