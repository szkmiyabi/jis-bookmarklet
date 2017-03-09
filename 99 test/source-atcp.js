//alt属性値とtitle属性値を揃える（alt属性値優先）
javascript:(function(){
	/* Dialog Class Start */
	var Diag = {
		get_comment: function(){
			return document.getElementById("comments").value;
		},
		set_comment: function(str){
			document.getElementById("comments").value = str;
		},
		get_description: function(){
			return document.getElementById("description").value;
		},
		set_description: function(str){
			document.getElementById("description").value = str;
		},
		get_srccode: function(){
			return document.getElementById("srccode").value;
		},
		set_srccode: function(str){
			document.getElementById("srccode").value = str;
		},
		click_for: function(flag) {
			var form=document.forms["diag_form"];
			for(var i=0;i<form.elements.length;i++){
				var obj=form.elements[i].value;
				if(obj==flag){
					form.elements[i].click();
					break;
				}
			}
		},
		click_for_submit: function(){
			var form=document.forms["diag_form"];
			for(var i=0;i<form.elements.length;i++){
				var obj=form.elements[i].type;
				if(obj=="submit"){
					form.elements[i].click();
					break;
				}
			}
		},
		text_clean: function(str){
		    str=str.replace(/^ +/m,"");
		    str=str.replace(/\t+/m,"");
		    str=str.replace(/(\r\n|\r|\n)/g,""); 
		    return str;
		},
		set_height: function(tg, ht){
			var src = document.getElementById(tg);
			src.setAttribute("style", "height:"+ht+"em;");
		}
	};
	/* Dialog Class End */
	var MyDiag = Object(Diag);
	var srccode = MyDiag.get_srccode();
	var imgtag = "";
	var tattr = "";
	var tval = "";
	var aattr = "";
	var aval = "";
	var ipad = new RegExp(/<img.+? *\/*>/);
	var tpad = new RegExp(/title="(.*?)"/);
	var apad = new RegExp(/alt="(.*?)"/);
	if(ipad.test(srccode)) imgtag = srccode.match(ipad)[0].toString();
	if(tpad.test(imgtag)) {
		tattr = imgtag.match(tpad)[0].toString();
		tval = imgtag.match(tpad)[1].toString();
	}
	if(apad.test(imgtag)) {
		aattr = imgtag.match(apad)[0].toString();
		aval = imgtag.match(apad)[1].toString();
	}
	var new_tattr = tattr.replace(tval, aval);
	srccode = srccode.replace(tattr, new_tattr);
	MyDiag.set_srccode(srccode);
})();