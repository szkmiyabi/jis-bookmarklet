javascript:(function() {
	function trgr() {
        (function($) {
			var wrap_id = 'Replacer_diag';
			if(document.getElementById(wrap_id)) {
				return;
			}
			function e(t) {
				return document.getElementsByTagName(t);
			}
			var wrap = document.createElement('div');
			var divcss = 'font-family:\'メイリオ\',sans-serif;font-size:90%;';
			divcss += 'padding:5px;position:absolute;top:0;left:0;background:#fff;border:solid #ccc 1px;';
			divcss += 'z-index:2999;width:550px;height:120px;';
			var btnfunc = 'erase_diag(this); erase_script();';
			wrap.id = wrap_id;
			wrap.style.cssText = divcss;
			var my_html = '<div style="padding:3px;background:#eee;height:19px;">';
			my_html += '<span style="float:left;""<strong>テキスト置換</strong></span>';
			my_html += '<a style="float:right;" onclick="' + btnfunc + '">閉じる</a></div>';
			my_html += '検索文字列<input type="text" id="my_search_text">置換文字列<input type="text" id="my_replace_text">';
			my_html += '<button onclick="do_replace()">実行</button>';
			wrap.innerHTML = my_html;
			e('body')[0].appendChild(wrap);
			$('#Replacer_diag').draggable();
			if(document.getElementById("myjs") == null) {
				var myjs = document.createElement('script');
				myjs.type = 'text/javascript';
				myjs.id = 'myjs';
				var myjs_str = 'function do_replace() {';
				myjs_str += 'var sh = document.getElementById("my_search_text").value;';
				myjs_str += 'var rp = document.getElementById("my_replace_text").value;';
				myjs_str += 'var src = document.getElementById("srccode").value;';
				myjs_str += 'var pt = new RegExp(sh, "mg");';
				myjs_str += 'src = src.replace(pt, rp);';
				myjs_str += 'document.getElementById("srccode").value = src;';
				myjs_str += '}';
				myjs_str += 'function erase_diag(obj) {obj.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode);}';
				myjs_str += 'function erase_script() {';
				myjs_str += 'var obj = document.getElementById("myjs");';
				myjs_str += 'obj.parentNode.removeChild(obj);';
				myjs_str += '}';
				myjs.textContent = myjs_str;
			}
			document.body.appendChild(myjs);
            window.scrollTo(0, 0);
        })(jQuery)
	}
	if(typeof jQuery == 'undefined') {
		var j = document.createElement('script');
		j.type = 'text/javascript';
		j.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js';
		document.body.appendChild(j);
		j.onload = trgr;
	} else {
		trgr();
	}
})();