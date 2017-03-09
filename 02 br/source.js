/*-----------------------------------------------------
 *
 	別タブで診断対象ページを表示する
 *
------------------------------------------------------*/
javascript:(function(){
	var urlval="";
	var url="";
	var element1=document.getElementById("urlList");
	var element2=document.getElementById("url2");
	if(element1!=null){
		for(var i=0;i<element1.options.length;i++){
			if(element1.options[i].selected){
				urlval=element1.options[i].text;
				break;
			}
		}
	}
	if(element2!=null){
		urlval=element2.value;
	}
	var a1=urlval.match(/http.*\/\/.*/);
	url=a1[0].toString();
	window.open(url,"_blank");
})();