/* 検査証明書のExcelダウンロード */
javascript:(function(){
	var url = location.href;
	var pat = new RegExp(/projID\/([0-9]+)/);
	var arr = url.match(pat);
	var new_url = "https://jis.infocreate.co.jp/diagnose/indexv2/xlsxdownload3/projID/" + arr[1].toString() + "/download/true";
	window.open(new_url, "_blank");
})();