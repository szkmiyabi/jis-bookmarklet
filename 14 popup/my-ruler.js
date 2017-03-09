javascript:(function() {
	var rulersize = 29;
	var rulerheight = rulersize - 2;
	function trgr() {
		var rid = 'MemoTxt';
		if(document.getElementById(rid)) {
			return;
		}
		var r = document.createElement('div');
		var acss = ' style=\'float:right;\'';
		var btnfunc = 'erase_diag(this); erase_script(); erase_style()';
		r.id = rid;
		r.innerHTML = '<span>' + rulersize + 'px</span><a onclick=\"' + btnfunc + '\"' + acss + '>閉じる</a>';
		document.getElementsByTagName('body')[0].appendChild(r);

		if(document.getElementById("hdjs") == null) {
			var hdjs = document.createElement('script');
			hdjs.id = 'hdjs';
			hdjs.type = 'text/javascript';
			var hdjs_str = '';
			hdjs_str += 'var e = document.getElementById("MemoTxt");';
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
			mycss_str += '#MemoTxt {';
			mycss_str += 'font-family:"メイリオ",sans-serif;';
			mycss_str += 'padding:0;';
			mycss_str += 'text-align:left;';
			mycss_str += 'font-size:12px;';
			mycss_str += 'position:absolute;';
			mycss_str += 'top:10px;';
			mycss_str += 'left:10px;';
			mycss_str += 'background:#fff;';
			mycss_str += 'border:solid #ccc 1px;';
			mycss_str += 'width:360px;';
			mycss_str += 'height:' + rulerheight +'px;';
			mycss_str += 'z-index:2999;';
			mycss_str += '}';
			mycss.textContent = mycss_str;
			document.getElementsByTagName("head").item(0).appendChild(mycss);
		}
			if(document.getElementById("myjs") == null) {
				var myjs = document.createElement('script');
				myjs.type = 'text/javascript';
				myjs.id = 'myjs';
				var myjs_str = '';
				myjs_str += 'function erase_diag(obj) {obj.parentNode.parentNode.removeChild(obj.parentNode);}';
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