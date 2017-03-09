/*-----------------------------------------------------
 *
 	ページ番号を指定して対象URLを切替える
 *
------------------------------------------------------*/
javascript:(function(){
	var prmt=prompt("URL番号を入力");
	var tar=prmt.toString();
	var flg = false;
	var element = document.getElementById("urlList");
	for(var i=0;i<element.options.length;i++){
			var url=element.options[i].text;
			var url_nm = get_pageid(url);
			var pat=new RegExp("[a-zA-Z]*?"+tar);
			var arr = url_nm.match(pat);
			if(arr!==null){
				element.options[i].selected=true;
				flg = true;
				break;
			}
	}
	if(flg){
		document.getElementById("submitURL").click();
	}else{
		alert("存在しないURL番号です！");
	}
	function get_pageid(str){
		var new_str = "";
		var pat = new RegExp(/\[(.+?)\]/);
		var arr = str.match(pat);
		if(arr!=null){
			new_str += arr[1].toString();
		}
		return new_str;
	}
})();
