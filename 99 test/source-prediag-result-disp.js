javascript:(function() {
	var q_text_enable = false;
	var tbl = document.getElementsByTagName("table").item(2);
	var tr = tbl.rows;
	var str = "";
	for(var i=0; i<tr.length; i++) {
	  var row = tr.item(i);
	  var id_text=row.cells.item(0).innerHTML;
	  var q_text=row.cells.item(1).innerHTML;
	  var ip_obj=row.cells.item(2).getElementsByTagName("input");
	  var f_text = "";
	  f_text = (ip_obj.item(0).checked==true) ? "はい":"いいえ";
	  str += id_text ;
	  if(q_text_enable) str += "\t" + clean(q_text);
	  str += "\t" + f_text + "\r\n";
	}
	var d = window.open().document;
	d.writeln('<DOCTYPE html><html><head><meta charset="utf-8"><style>textarea{font-size:90%; width:100%; height:33em}</style></head><body></body></html>');
	var tg = d.getElementsByTagName("body").item(0);
	var ta = d.createElement("textarea");
	ta.textContent = str;
	tg.appendChild(ta);
	function clean(str) {
	  str = str.replace(/(<br>|\r\n|\n)/mg, "");
	  return str;
	}
})();
