javascript:(function(){
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
	var comptext = tech + "\t" + survey + "\t" + "prg" + "\t" + comment + "\t" + description + "\t" + srccode + "\t";
	prompt("Ctrl+Cでコピーしてください。", comptext);
})();