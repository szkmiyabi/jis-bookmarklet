javascript:(function(){
	var ovr = true;
	var src = prompt("dcpでコピーしたコードを貼り付けて下さい");
	var hash = {
		"適合":"0",
		"適合(注記)":"1",
		"不適合":"2",
		"不適合(要判定)":"3",
		"非適用":"4"
	};
	var d = document;
	var srcarr = src.split("\t");
	var survey = hash[srcarr[1]];
	var comment = srcarr[3];
	var description = srcarr[4];
	var srccode = srcarr[5];
	var funcs = [
		function(){
			var t = d.getElementsByName("bkm_result");
			for(var i=0; i<t.length; i++) {
				var rd = t[i];
		        if(rd.value === survey) {
		          rd.checked = true;
		          break;
		        }
			}
		},
		function(){
			if(comment !== "なし"){
				d.getElementsByName("bkm_comment_status")[0].checked = true;
			}else{
				d.getElementsByName("bkm_comment_status")[1].checked = true;
			}
			if(ovr){
				d.getElementsByName("bkm_comment_overwrite")[0].checked = true;
			}
			var t = d.getElementById("bkm_comments");
			if(comment !== "なし") {
				t.value = comment;
			}
		},
		function(){
			if(description !== "なし"){
				d.getElementsByName("bkm_descript_status")[0].checked = true;
			}else{
				d.getElementsByName("bkm_descript_status")[1].checked = true;
			}
			if(ovr){
				d.getElementsByName("bkm_descript_overwrite")[0].checked = true;
			}
			var t = d.getElementById("bkm_descript");
			if(description !== "なし") {
				t.value = description;
			}
		},
		function(){
			if(srccode !== "なし"){
				d.getElementsByName("bkm_srccode_status")[0].checked = true;
			}else{
				d.getElementsByName("bkm_srccode_status")[1].checked = true;
			}
			if(ovr){
				d.getElementsByName("bkm_srccode_overwrite")[0].checked = true;
			}
			var t = d.getElementById("bkm_srccode");
			if(srccode !== "なし") {
				t.value = srccode;
			}
		}
	];
	var ix = 0;
	while(true) {
		if(ix < funcs.length) funcs[ix]();
		else break;
		ix++;
	}
})();

