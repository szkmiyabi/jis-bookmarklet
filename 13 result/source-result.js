/* 検査証明書を表示 */
javascript:(function(){
	var url = location.href;
	var pat = new RegExp(/projID\/([0-9]+)/);
	var arr = url.match(pat);
	var new_url = "https://jis.infocreate.co.jp/diagnose/result/index/projID/" + arr[1].toString();
	window.open(new_url, "_blank");
})();