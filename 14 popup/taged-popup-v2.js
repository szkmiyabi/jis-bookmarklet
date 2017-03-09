javascript:(function() {
	/*comments*/var cmt_str = "対象ソースコードに示した文字列は、段落の体裁を取っているが、p要素でマークアップされていない|リストの視覚表現を含んだコンテンツが、箇条書き要素としてマークアップされていない|対象ソースコードに示した文字列は、見出しの体裁を取っているが、見出し要素としてマークアップされていない|強調を意図しているなら、セマンティックなマークアップが必要";
	/*tag*/var tag_str = "<strong></strong>|<span></span>|<p></p>|<ul><li></li></ul>|<ol><li></li></ol>|<li></li>|<dl><dt></dt><dd></dd></dl>|<dt></dt>|<dd></dd>|<em></em>|<h ></h >";
	/*attr*/var attr_str = "style|alt|title|for|id|class|lang|xml:lang|summary";
	/*cssproperty*/var prop_str = "color: red;|text-decoration: underline;|list-style-type: none;|display: inline;|float: ;";
	var trg_hash = {
	    "comments": "判定コメント",
	    "description": "対象ソースコード",
	    "srccode":"修正ソースコード"
	};
	function position_research() {
		var divs = document.getElementsByTagName("div");
		for(var i=0; i<divs.length; i++) {
		  var div = divs.item(i);
		  var pat = new RegExp(/ui\-dialog/);
		  var divclass = div.getAttribute("class");
		  if(pat.test(divclass)) {
		    var rect = div.getBoundingClientRect();
		    var positionY = rect.top;
	       var dElm = document.documentElement , dBody = document.body ;
	       var scrollY = dElm.scrollTop || dBody.scrollTop ;
	       var y = positionY + scrollY ;
		    return y;
		  }
		}
	}
	function create_comment_ctrl_select(){
	  var keyarr = cmt_str.split("|");
	  var target = document.getElementById("comment_ctrl");
	  for(var i=0; i<keyarr.length; i++){
	    var opt = document.createElement("option");
	    opt.setAttribute("id", i);
	    opt.textContent = keyarr[i].toString();
	    target.appendChild(opt);
	  }
	}
	function create_tag_ctrl_select(){
	  var keyarr = tag_str.split("|");
	  var target = document.getElementById("tag_ctrl");
	  for(var i=0; i<keyarr.length; i++){
	    var opt = document.createElement("option");
	    opt.setAttribute("id", i);
	    opt.textContent = keyarr[i].toString();
	    target.appendChild(opt);
	  }
	}
	function create_attr_ctrl_select(){
	  var keyarr = attr_str.split("|");
	  var target = document.getElementById("attr_ctrl");
	  for(var i=0; i<keyarr.length; i++){
	    var opt = document.createElement("option");
	    opt.setAttribute("id", i);
	    opt.textContent = keyarr[i].toString();
	    target.appendChild(opt);
	  }
	}
	function create_target_ctrl_select() {
	  var target = document.getElementById("target_ctrl");
	  for(var key in trg_hash) {
	    var opt = document.createElement("option");
	    opt.setAttribute("value", key);
	    opt.textContent = trg_hash[key].toString();
	    target.appendChild(opt);
	  }
	}
	function create_prop_ctrl_select() {
	  var keyarr = prop_str.split("|");
	  var target = document.getElementById("prop_ctrl");
	  for(var i=0; i<keyarr.length; i++){
	    var opt = document.createElement("option");
	    opt.setAttribute("id", i);
	    opt.textContent = keyarr[i].toString();
	    target.appendChild(opt);
	  }
	}
	function trgr() {
		var wrap_id = 'Editor_diag';
		if(document.getElementById(wrap_id)) {
			return;
		}
		var wrap = document.createElement('div');
		var btnfunc = 'erase_diag(this); erase_script(); erase_style();';
		wrap.id = wrap_id;
		var my_html = '<div style="padding:3px;background:#eee;height:19px;">';
		my_html += '<span style="float:left;""<strong>検査内容エディタ</strong></span>';
		my_html += '<a style="float:right;" onclick="' + btnfunc + '">閉じる</a></div>';
		my_html += '<label>処理対象</label><select id="target_ctrl"></select>';
		my_html += '<button onclick="clean()">Clean</button>';
		my_html += '<button onclick="br_insert()">Br</button>';
		my_html += '<button onclick="delete_text()">Del</button>';
		my_html += '<button onclick="delete_all_text()">AllDel</button>';
		my_html += '<button onclick="cp_code()">Cp</button>';
		my_html += '<br>';
		my_html += '<label>コメント</label><select id="comment_ctrl"></select>';
		my_html += '<button onclick="this_ctrl_insert(\'comment_ctrl\')">挿入</button><br>';
		my_html += '<label>検索文字列</label><input type="text" id="my_search_text"><label>置換文字列</label><input type="text" id="my_replace_text">';
		my_html += '<button onclick="do_replace()">置換</button><br>';
		my_html += '<label>タグ</label><select id="tag_ctrl"></select><button onclick="this_ctrl_insert(\'tag_ctrl\')">挿入</button>';
		my_html += '<label>属性</label><select id="attr_ctrl"></select><button onclick="this_ctrl_insert(\'attr_ctrl\')">挿入</button>';
		my_html += '<br>';
		my_html += '<label>CSSプロパティ</label><select id="prop_ctrl"></select><button onclick="this_ctrl_insert(\'prop_ctrl\')">挿入</button>';
		my_html += '<br>';
		my_html += '<label>メモ</label><br>';
		my_html += '<textarea id="memo_ctrl"></textarea><br>';
		my_html += '<button onclick="w3c_formatter()">W3C_RP</button>';
		my_html += '<button onclick="clear_memo_ctrl()">Clear</button>';
		wrap.innerHTML = my_html;
		document.getElementsByTagName('body')[0].appendChild(wrap);
		create_target_ctrl_select();
		create_comment_ctrl_select();
		create_tag_ctrl_select();
		create_attr_ctrl_select();
		create_prop_ctrl_select();
		if(document.getElementById("hdjs") == null) {
			var hdjs = document.createElement('script');
			hdjs.id = 'hdjs';
			hdjs.type = 'text/javascript';
			var hdjs_str = '';
			hdjs_str += 'var e = document.getElementById("Editor_diag");';
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
			var top_positon = position_research() || 0;
			var mycss = document.createElement('style');
			mycss.id = 'mycss';
			mycss.type = 'text/css';
			var mycss_str = '';
			mycss_str += '#Editor_diag {';
			mycss_str += 'font-family:"メイリオ",sans-serif;font-size:90%;';
			mycss_str += 'padding:5px;position:absolute;';
			mycss_str += 'top:' + top_positon + 'px;left:0;';
			mycss_str += 'background:#fff;border:solid #ccc 1px;';
			mycss_str += 'z-index:2999;width:430px;height:282px;';
			mycss_str += '}';
			mycss_str += '#Editor_diag textarea {';
			mycss_str += 'font-family:"メイリオ",sans-serif;font-size:90%;width:416px;height:7em;';
			mycss_str += '}';
			mycss_str += '#Editor_diag label {font-size: 90%;}';
			mycss_str += '#my_search_text, #my_replace_text {width: 90px;}';
			mycss_str += '#comment_ctrl { width: 300px; }';
			mycss.textContent = mycss_str;
			document.getElementsByTagName("head").item(0).appendChild(mycss);
		}
		if(document.getElementById("myjs") == null) {
			var myjs = document.createElement('script');
			myjs.type = 'text/javascript';
			myjs.id = 'myjs';
			var myjs_str = '';
			myjs_str += 'function get_text(){';
			myjs_str += 'var target = get_select_val();';
			myjs_str += 'return document.getElementById(target).value;';
			myjs_str += '}';
			myjs_str += 'function set_text(str){';
			myjs_str += 'var target = get_select_val();';
			myjs_str += 'document.getElementById(target).value = str;';
			myjs_str += '}';
			myjs_str += 'function delete_text(){';
			myjs_str += 'var target = get_select_val();';
			myjs_str += 'document.getElementById(target).value = "";';
			myjs_str += '}';
			myjs_str += 'function clean(){';
			myjs_str += 'var src = get_text();';
			myjs_str += 'src=src.replace(/\\n\\n/g, "\\n");';
			myjs_str += 'set_text(src);';
			myjs_str += '}';
			myjs_str += 'function get_select_val() {';
			myjs_str += 'var target = document.getElementById("target_ctrl");';
			myjs_str += 'return target.options[target.selectedIndex].value;';
			myjs_str += '}';
			myjs_str += 'function get_caret(){';
			myjs_str += 'var target = get_select_val();';
			myjs_str += 'var ta = document.getElementById(target);';
			myjs_str += 'var start = ta.selectionStart;';
			myjs_str += 'return start;';
			myjs_str += '}';
			myjs_str += 'function text_insert(str){';
			myjs_str += 'var target = get_select_val();';
			myjs_str += 'var ta = document.getElementById(target);';
			myjs_str += 'var taval = ta.value;';
			myjs_str += 'var caret = get_caret();';
			myjs_str += 'var first2caret = taval.substring(0, caret);';
			myjs_str += 'var caret2end = taval.substring(caret, taval.length);';
			myjs_str += 'var rdmstr = first2caret + str + caret2end;';
			myjs_str += 'ta.value = rdmstr;';
			myjs_str += '}';
			myjs_str += 'function this_ctrl_insert(src) {';
			myjs_str += 'var target = get_select_val();';
			myjs_str += 'var from = document.getElementById(src);';
			myjs_str += 'var ret = from.options[from.selectedIndex].text;';
			myjs_str += 'if(src == "attr_ctrl") {';
			myjs_str += 'text_insert(ret + \'=""\');';
			myjs_str += '} else {';
			myjs_str += 'text_insert(ret);';
			myjs_str += '}';
			myjs_str += '}';
			myjs_str += 'function br_insert(){';
			myjs_str += 'var target = get_select_val();';
			myjs_str += 'text_insert("\\n");';
			myjs_str += '}';
			myjs_str += 'function do_replace() {';
			myjs_str += 'var target = get_select_val();';
			myjs_str += 'var sh = document.getElementById("my_search_text").value;';
			myjs_str += 'var rp = document.getElementById("my_replace_text").value;';
			myjs_str += 'var src = document.getElementById(target).value;';
			myjs_str += 'var pt = new RegExp(sh, "mg");';
			myjs_str += 'src = src.replace(pt, rp);';
			myjs_str += 'document.getElementById(target).value = src;';
			myjs_str += '}';
			myjs_str += 'function cp_code() {';
			myjs_str += 'var from_val = document.getElementById("description").value;';
			myjs_str += 'document.getElementById("srccode").value = from_val;';
			myjs_str += '}';
			myjs_str += 'function delete_all_text() {';
			myjs_str += 'var tx = document.getElementsByTagName("textarea");';
			myjs_str += 'for(var i=0; i<tx.length; i++) {';
			myjs_str += 'var obj = tx.item(i);';
			myjs_str += 'var id = obj.getAttribute("id");';
			myjs_str += 'if(id == "comments" || id == "description" || id == "srccode") {';
			myjs_str += 'obj.value = "";';
			myjs_str += '}';
			myjs_str += '}';
			myjs_str += '}';
			myjs_str += 'function w3c_formatter(){';
			myjs_str += 'var src = document.getElementById("memo_ctrl").value;';
			myjs_str += 'src = rowhead_clean(src);';
			myjs_str += 'var pat = new RegExp(/, .+/g);';
			myjs_str += 'var arr = src.match(pat);';
			myjs_str += 'if(arr!==null){';
			myjs_str += 'src = src.replace(pat, "");';
			myjs_str += 'text_insert(src);';
			myjs_str += '}else{';
			myjs_str += 'alert("W3Cバリデータの結果が貼り付けられていません！");';
			myjs_str += '}';
			myjs_str += '}';
			myjs_str += 'function rowhead_clean(str){';
			myjs_str += 'str=str.replace(/^ +/mg,"");';
			myjs_str += 'str=str.replace(/^\\t+/mg,"");';
			myjs_str += 'return str;';
			myjs_str += '}';
			myjs_str += 'function clear_memo_ctrl() {';
			myjs_str += 'document.getElementById("memo_ctrl").value = "";';
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
	}
	trgr();
})();