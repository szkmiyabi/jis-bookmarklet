//CSSを別タブで
javascript:(function(){
	var urlval="";
	var url="";
	var tag="";
	var href="";
	var element=document.getElementById("urlList");
	/*別タブの場合*/
	if(element==null){
		urlval=window.location.href;
		var a1=urlval.match(/http.*\/\/.*\//);
		url=a1[0].toString();
		filename=window.getSelection().toString();
		var a2=filename.match(/\.+.*/);
		if(a2==null) filename += ".css";
		window.open(url+filename,"_blank");
	/*Libra画面の場合*/	
	}else{
		for(var i=0;i<element.options.length;i++){
			if(element.options[i].selected){
				urlval=element.options[i].text;
				break;
			}
		}
		var a1=urlval.match(/http.*\/\/.*?\//);
		/*TOPページの場合*/
		if(a1==null){
			var a1x = urlval.match(/http.*/);
			url = a1x[0].toString();
		/*そうでない場合*/
		}else{
			url=a1[0].toString();
		}
		tag=window.getSelection().toString();
		var a2=tag.match(/href=\"*(.*?)\"/);
		href=a2[1].toString();
		/*絶対urlの場合*/
		if(href.match(/http.*/)){
			window.open(href,"_blank");
		/*そうでない場合*/
		}else{
			window.open(url+href,"_blank");
		}
	}
})();