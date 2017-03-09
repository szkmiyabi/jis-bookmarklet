javascript:(function(){

	var mode = "diag";
	var data = new Array();

	data.push("[" + get_url_val() + "]");
	data.push(get_guideline_val());
	data.push(get_tech_val() );

	var hash = {"PASS":"適合","PASS2":"適合(注記)","FAIL":"不適合","FAIL2":"不適合(要再判定)","NA":"非適用"};
	var techList = document.getElementById("techList");
	var tech = techList.options[techList.selectedIndex].value;
	tech = tech.replace(/【完】/,"");
	var survey = "";
	var inps = document.getElementsByTagName("input");
	for(var i=0; i<inps.length; i++) {
		var inp = inps.item(i);
		if(inp.name=="result" && inp.checked==true) {
			var key = inp.value;
			survey = hash[key].toString();
			break;
		}
	}
	var comment = document.getElementById("comments").value;
	if(comment == "" || comment.length<1) comment = " ";
	var description = document.getElementById("description").value;
	if(description == "" || description.length<1) description = "なし";
	var srccode = document.getElementById("srccode").value;
	if(srccode == "" || srccode.length<1) srccode = "なし";
	data.push(survey);
	data.push(comment);
	data.push(description);
	data.push(srccode);

	switch(mode) {
		case "tab":
			var d = window.open("","_blank").document;
			d.writeln('<pre>' + my_html_encode(each_arr(data, true)) + '</pre>');
			break;
		case "diag":
			alert(each_arr(data, true));
			break;
	}

	function each_arr(arr, br_flg) {
		var str = "";
		for(var i=0; i<arr.length; i++) {
			if(br_flg) str += arr[i] + "\n";
			else str += arr[i] + "\t";
		}
		return str;
	}
	function get_url_val() {
		var url = document.getElementById("urlList");
		var idx = url.options.selectedIndex;
		var text = url.options[idx].value;
		return text;
	}
	function get_guideline_val() {
		var gl = document.getElementById("guideline");
		var idx = gl.options.selectedIndex;
		var text = gl.options[idx].value;
		return text;
	}
	function get_tech_val() {
		var tc = document.getElementById("techList");
		var idx = tc.options.selectedIndex;
		var text = tc.options[idx].value;
		return text;
	}
	function my_html_encode(str) {
		str = str.replace(/</g, "&lt;");
		str = str.replace(/>/g, "&gt;");
		return str;
	}
})();