/* 確認用検査結果のExcelダウンロード */
javascript:(function(){
	var url = location.href;
	var pat = new RegExp(/projID\/([0-9]+)/);
	var arr = url.match(pat);
	var new_url = "http://jis.infocreate.co.jp/diagnose/indexv2/xlsxdownload/projID/" + arr[1].toString() + "/download/true";
	window.open(new_url, "_blank");
})();

