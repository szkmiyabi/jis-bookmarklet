javascript:(function(){
  var mode="gd";/*gd or tch*/
  var data = (mode == "gd") ? pick_comp_guideline():pick_comp_tech();
  tab_to_textarea(data);
  function pick_comp_guideline() {
    var gd = document.getElementById("guideline");
    var ret = "";
    for(var i=0; i<gd.options.length; i++) {
      if(regx_complex(gd.options[i].text)) {
        ret += regx_text_spliter(gd.options[i].text, "([0-9]\.[0-9]\.[0-9]\.[0-9])") + "\n";
      }
    }
    return ret;
  }
  function pick_comp_tech() {
    var tch = document.getElementById("techList");
    var ret = "";
    for(var i=0; i<tch.options.length; i++) {
      if(regx_complex(tch.options[i].text)) {
        ret += regx_text_spliter(tch.options[i].text, "([A-Z]+[0-9]+)") + "\n";
      }
    }
    return ret;
  }
  function regx_text_spliter(str, pattern) {
    var pat = new RegExp(pattern);
    var mt = str.match(pat);
    return mt[1].toString();
  }
  function regx_complex(str) {
    if(new RegExp(/【完】/).test(str)) return true;
    else return false;
  }
  function tab_to_textarea(content) {
    var d = window.open().document;
    d.writeln('<DOCTYPE html><html><head><meta charset="utf-8"><style>textarea{font-size:90%; width:100%; height:33em}</style></head><body></body></html>');
    var tg = d.getElementsByTagName("body").item(0);
    var ta = d.createElement("textarea");
    ta.textContent = content;
    tg.appendChild(ta);
  }
})();
