//判定結果複写
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
	var txt = prompt("判定結果～修正ソースコードまでコピーして貼り付けてください");
	var arr = new Array();
	if(ua.indexOf('firefox') != -1) {
		var arr10 = txt.split("判定コメント:");
		var arr11 = arr10[0].toString().split("判定結果:");
		var arr20 = txt.split("対象ソースコード:");
		var arr21 = arr20[0].toString().split("判定コメント:");
		var arr30 = txt.split("修正ソースコード:");
		var arr31 = arr30[0].toString().split("対象ソースコード:");
		var arr40 = txt.split("修正ソースコード:");
		arr.push("判定結果:");
		arr.push(arr11[1].toString());
		arr.push("判定コメント:");
		arr.push(arr21[1].toString());
		arr.push("対象ソースコード:");
		arr.push(arr31[1].toString());
		arr.push("修正ソースコード");
		arr.push(arr40[1].toString());
	} else {
		arr = txt.split("\n");
	}

	var str_sv = "";
	var str_flg = "";
	var str_comment = "";
	var str_description = "";
	var str_srccode = "";
	if(arr != null){
		str_sv = arr[1].toString();
		str_sv = str_sv.trim();
		for(var key in hash){
			if(str_sv == hash[key]){
				str_flg = key;
			}
		}
		str_comment = arr[3].toString().trim();
		str_description = arr[5].toString().trim();
		str_srccode = arr[7].toString().trim();
		dg.click_for(str_flg);
		dg.set_comment(str_comment);
		if(str_description!="なし"){dg.set_description(str_description);}
		if(str_srccode!="なし"){dg.set_srccode(str_srccode);}
		dg.click_for_submit();
	}
})();