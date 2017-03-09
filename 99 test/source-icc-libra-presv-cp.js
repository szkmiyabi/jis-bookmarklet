/*---------------------------------------
  ICC-Libra 事前検査テキストコピー
---------------------------------------*/
javascript:(function(){
  trgr();
  function trgr() {
    var d = window.open().document;
    d.writeln('<html lang="ja"><head><meta charset="utf-8"><title>pre_svc</title>');
    d.writeln('<style>textarea{font-size:99%; width:15em; height:20em}</style>');
    d.writeln('</head><body></body></html>');
    var ta = d.createElement("textarea");
    ta.textContent = pre_sv_copy();
    var tg = d.getElementsByTagName("body").item(0);
    tg.appendChild(ta);
  }
  function pre_sv_copy() {
    var div = document.getElementsByClassName("scrollTable").item(0);
    var tbl = div.getElementsByTagName("table").item(0);
    var tr = tbl.rows;
    var sv_str = "";
    for(var i=0; i<tr.length; i++) {
      var row = tr.item(i);
      var nm_cell = row.cells.item(0);
      var nm_str = nm_cell.innerHTML;
      var str_cell = row.cells.item(1);
      var sv_cell = row.cells.item(2);
      var sv_radios = sv_cell.getElementsByTagName("input");
      var sv = (sv_radios.item(0).checked == true) ? "はい":"いいえ";
      sv_str += nm_str + "\t" + sv + "\r\n";
    }
    return sv_str;
  }
})();

/*---------------------------------------
  本番Libra 事前検査テキストコピー
---------------------------------------*/
javascript:(function(){
  trgr();
  function trgr() {
    var d = window.open().document;
    d.writeln('<html lang="ja"><head><meta charset="utf-8"><title>pre_svc</title>');
    d.writeln('<style>textarea{font-size:99%; width:15em; height:20em}</style>');
    d.writeln('</head><body></body></html>');
    var ta = d.createElement("textarea");
    ta.textContent = pre_sv_copy();
    var tg = d.getElementsByTagName("body").item(0);
    tg.appendChild(ta);
  }
  function pre_sv_copy() {
    var tbl = document.getElementsByTagName("table").item(0);
    var tr = tbl.rows;
    var sv_str = "";
    for(var i=0; i<tr.length; i++) {
      if(i==0) continue;
      var row = tr.item(i);
      var nm_cell = row.cells.item(0);
      var nm_str = nm_cell.innerHTML;
      var str_cell = row.cells.item(1);
      var sv_cell = row.cells.item(2);
      var sv_yes_label = sv_cell.getElementsByTagName("label").item(0);
      var sv_yes_radio = sv_yes_label.getElementsByTagName("input").item(0);
      var sv = (sv_yes_radio.checked == true) ? "はい":"いいえ";
      sv_str += nm_str + "\t" + sv + "\r\n";
    }
    return sv_str;
  }
})();

javascript:(function(){trgr();function trgr() {var d = window.open().document;d.writeln('<html lang="ja"><head><meta charset="utf-8"><title>pre_svc</title>');d.writeln('<style>textarea{font-size:99%; width:15em; height:20em}</style>');d.writeln('</head><body></body></html>');var ta = d.createElement("textarea");ta.textContent = pre_sv_copy();var tg = d.getElementsByTagName("body").item(0);tg.appendChild(ta);}function pre_sv_copy() {var tbl = document.getElementsByTagName("table").item(0);var tr = tbl.rows;var sv_str = "";for(var i=0; i<tr.length; i++) {if(i==0) continue;var row = tr.item(i);var nm_cell = row.cells.item(0);var nm_str = nm_cell.innerHTML;var str_cell = row.cells.item(1);var sv_cell = row.cells.item(2);var sv_yes_label = sv_cell.getElementsByTagName("label").item(0);var sv_yes_radio = sv_yes_label.getElementsByTagName("input").item(0);var sv = (sv_yes_radio.checked == true) ? "はい":"いいえ";sv_str += nm_str + "\t" + sv + "\r\n";}return sv_str;}})();



