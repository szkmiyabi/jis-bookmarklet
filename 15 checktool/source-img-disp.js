/* ### 確認用検査結果画面でimg要素参照 ### */
javascript:(function(){
	var pattern = "(http:\/\/|https:\/\/)(.+?)\/(.+)";
	var cell_data = "";
	var fullurl = "";
	var imgurl = "";
	var baseurl = "";
	var tbl = document.getElementsByTagName("table").item(1);
	var tr = tbl.rows;
	for(var i=0; i<tr.length; i++) {
		var row = tr.item(i);
		if(i==1) {
			cell_data = row.cells.item(1).innerHTML;
			break;
		} 
	}
	cell_data = cell_data.replace(/&nbsp;/mg, "");
	var pat = new RegExp(/(\[[a-zA-Z0-9]+\])(.+)/);
	var arr = cell_data.match(pat);
	fullurl = arr[2].toString();
	var basepat = new RegExp(pattern);
	if(basepat.test(fullurl)) {
		var barr = fullurl.match(basepat);
		baseurl = barr[1].toString() + barr[2].toString();
	} else {
		baseurl = fullurl;
	}
	var select_text = window.getSelection().toString();
	var imgurl = baseurl + get_src_val(select_text);
	window.open(imgurl);
	function get_src_val(str) {
		var pat = new RegExp(/src="(.+?)"/);
		var arr = str.match(pat);
		return arr[1].toString();
	}
})();