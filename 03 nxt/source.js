//次のURLに進む
javascript:(function(){
	var%20response=true;
	var%20element=document.getElementById("urlList");
	for(var%20i=0;i<element.options.length;i++){
		var%20idx=i+1;
		if(idx==element.options.length){
			alert("これ以上進めません！");
			response=false;
			break;
		}
		if(element.options[i].selected){
			element.options[idx].selected = true;
			break;
		}
	}
	if(response)%20document.getElementById("submitURL").click();
})();