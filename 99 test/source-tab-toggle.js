//タブを交互切替え
javascript:(function(){
	var parent = document.getElementById("tabsA");
	var ul = parent.getElementsByTagName("ul").item(0);
	for(var i=0; i<2; i++) {
		var li = ul.getElementsByTagName("li").item(i);
		var cname = li.getAttribute("class");
		var cpat = new RegExp(/ui-tabs-selected/);
	  if(!cpat.test(cname)) {
	    li.getElementsByTagName("a").item(0).click();	
	    break;
	  }
	}
})();
