//判定結果複写（確認用検査画面対応)
javascript:(function(){
	/* Dialog Class Start */var Diag = {get_comment: function(){return document.getElementById("comments").value;},set_comment: function(str){document.getElementById("comments").value = str;},get_description: function(){return document.getElementById("description").value;},set_description: function(str){document.getElementById("description").value = str;},get_srccode: function(){return document.getElementById("srccode").value;},set_srccode: function(str){document.getElementById("srccode").value = str;},click_for: function(flag) {var form=document.forms["diag_form"];for(var i=0;i<form.elements.length;i++){var obj=form.elements[i].value;if(obj==flag){form.elements[i].click();break;}}},click_for_submit: function(){var form=document.forms["diag_form"];for(var i=0;i<form.elements.length;i++){var obj=form.elements[i].type;if(obj=="submit"){form.elements[i].click();break;}}},};	/* Dialog Class End */
	var ua = window.navigator.userAgent.toLowerCase();
	var hash = {
		PASS: "適合",
		PASS2: "適合(注記)",
		FAIL: "不適合",
		NA: "非適用"
	};
	var dg = Object(Diag);
	var txt = prompt("コピーしたい検査内容表の行を選択コピーして貼り付けてください");
	var arr = new Array();
	arr = txt.split("\t");
	var str_sv = "";
	var str_flg = "";
	var str_comment = "";
	var str_description = "";
	var str_srccode = "";
	if(arr != null){
		var cnt = arr.length;
		str_sv = arr[1].toString();
		str_sv = str_sv.trim();
		for(var key in hash){
			if(str_sv == hash[key]){
				str_flg = key;
			}
		}
		if(arr[3] != undefined) {
			str_comment = arr[3].toString().trim();
		}
		if(arr[4] != undefined) {
			str_description = arr[4].toString().trim();
		}
		if(arr[5] != undefined) {
			str_srccode = arr[5].toString().trim();
		}
		dg.click_for(str_flg);
		if(str_comment!="なし"){dg.set_comment(str_comment)};
		if(str_description!="なし"){dg.set_description(str_description);}
		if(str_srccode!="なし"){dg.set_srccode(str_srccode);}
		/*dg.click_for_submit();*/
	}
})();