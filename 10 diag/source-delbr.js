//検査内容ダイアログ改行除去
javascript:(function(){
	/* Dialog Class Start */var Diag = {get_comment: function(){return document.getElementById("comments").value;},set_comment: function(str){document.getElementById("comments").value = str;},get_description: function(){return document.getElementById("description").value;},set_description: function(str){document.getElementById("description").value = str;},get_srccode: function(){return document.getElementById("srccode").value;},set_srccode: function(str){document.getElementById("srccode").value = str;},click_for: function(flag) {var form=document.forms["diag_form"];for(var i=0;i<form.elements.length;i++){var obj=form.elements[i].value;if(obj==flag){form.elements[i].click();break;}}},click_for_submit: function(){var form=document.forms["diag_form"];for(var i=0;i<form.elements.length;i++){var obj=form.elements[i].type;if(obj=="submit"){form.elements[i].click();break;}}},};	/* Dialog Class End */
	var dg = Object(Diag);
	var txt = dg.get_comment();
	txt = txt.replace(/(\r\n|\r|\n)/g," ");
	dg.set_comment(txt);
})();