//リンク画像か判定
javascript:(function(){
	var a = document.getElementsByTagName("a");
	for(var i=0; i<a.length; i++) {
	  var atag = a.item(i);
	  var img = atag.getElementsByTagName("img");
	  for(var j=0; j<img.length; j++) {
	    var imgtag = img.item(j);
	    imgtag.setAttribute("style", "border:2px dotted red;");
	  }
	}
})();