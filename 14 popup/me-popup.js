javascript:(function() {
	function trgr() {
			var wrap_id = 'Memo_diag';
			if(document.getElementById(wrap_id)) {
				return;
			}
			var wrap = document.createElement('div');
			var btnfunc = 'erase_diag(this); erase_script(); erase_style();';
			wrap.id = wrap_id;
			var my_html = '<div style="padding:3px;background:#eee;height:19px;">';
			my_html += '<span style="float:left;""<strong>メモエディタ</strong></span>';
			my_html += '<a style="float:right;" onclick="' + btnfunc + '">閉じる</a></div>';
			my_html += '<textarea id="ta"></textarea>';
			wrap.innerHTML = my_html;
			document.getElementsByTagName('body')[0].appendChild(wrap);
			if(document.getElementById("hdjs") == null) {
				var hdjs = document.createElement('script');
				hdjs.id = 'hdjs';
				hdjs.type = 'text/javascript';
				var hdjs_str = '';
				hdjs_str += 'var e = document.getElementById("Memo_diag");';
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
				mycss_str += '#Memo_diag {';
				mycss_str += 'font-family:"メイリオ",sans-serif;font-size:90%;';
				mycss_str += 'padding:5px;position:absolute;top:0;left:0;background:#fff;border:solid #ccc 1px;';
				mycss_str += 'z-index:2999;width:390px;height:240px;';
				mycss_str += '}';
				mycss_str += '#Memo_diag textarea {';
				mycss_str += 'font-family:"メイリオ",sans-serif;font-size:90%;width:380px;height:200px;';
				mycss_str += '}';
				mycss.textContent = mycss_str;
				document.getElementsByTagName("head").item(0).appendChild(mycss);
			}
			if(document.getElementById("myjs") == null) {
				var myjs = document.createElement('script');
				myjs.type = 'text/javascript';
				myjs.id = 'myjs';
				var myjs_str = '';
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
	trgr();
})();