//dcpと統合する予定!!!!!!!!!!!!!!!!!!!!!!!!!
//tcp
javascript:(function(){
	if(is_selected()) {
		var src = window.getSelection().toString();
		var arr = src.split("\t");
		var tech = arr[0];
		var survey = arr[2];
		var who = arr[3];
		var comment = arr[4];
		var description = arr[5];
		var srccode = arr[6];
		var str = tech + "\t" + survey + "\t" + who + "\t" + comment + "\t" + description + "\t" + srccode;
		prompt("Ctrl+Cでコピーして下さい。", str);
	}

	function is_selected() {
	  if(window.getSelection().toString()==="") return false;
	  else return true;
	}
})();
