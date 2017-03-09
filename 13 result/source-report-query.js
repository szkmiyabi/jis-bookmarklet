javascript:(function(){
  /*--ID#START--*/var csv="meti0010,meti0011,meti0015,meti0038,meti0039,meti0040,meti0041,meti0042,meti0043,meti0044,meti0045,meti0046,meti0047,meti0048,meti0049,meti0050,meti0062,meti0063,meti0069,meti0070,meti0074,meti0077,meti0078,meti0079,meti0080,meti0081,meti0082,meti0091,meti0102,meti0103,meti0112,meti0113,meti0114,meti0115,meti0116,meti0117,meti0118,meti0119,meti0120,meti0121,meti0122,meti0123,meti0124,meti0125,meti0126,meti0127,meti0128,meti0129";/*--ID#END---*/
  var chkarr = csv.split(",");
  var delarr = new Array();
  function array_checker(arr, val) {
    for(var i=0; i<arr.length; i++) {
      var v = arr[i].toString();
      if(val == v) return true;
    }
    return false;
  }

  var tbl = document.getElementsByTagName("table").item(2);
  var tr = tbl.rows;
  for(var i=0; i<tr.length; i++){
    if(i < 2) continue;
    var row = tr.item(i);
    var celldata = row.cells.item(0).innerText;
    if(!array_checker(chkarr, celldata)) {
      delarr.push(celldata);
    }
  }

  for(var i=0; i<delarr.length; i++) {
    var idx = 0;
    var line = delarr[i].toString();
    idx = getDeleteTableRowNum(line);
    if(idx != 0) deleteTableRow(idx);
  }

  function getDeleteTableRowNum(key) {
    var idx = 0;
    var tbl = document.getElementsByTagName("table").item(2);
    var tr =tbl.rows;
    for(var j=0; j<tr.length; j++) {
      if(j < 2) continue;
      var row = tr.item(j);
      var celldata = row.cells.item(0).innerText;
      if(key == celldata) {
        idx = j;
        break;
      }
    }
    return idx;
  }

  function deleteTableRow(idx) {
    var tbl = document.getElementsByTagName("table").item(2);
    tbl.deleteRow(idx);
  }
})();


