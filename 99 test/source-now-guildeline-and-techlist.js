javascript:(function(){
  var sep="\t"; /*\n or \t*/
  var url_flg=true;
  var txt = "";
  if(url_flg) txt += get_now_url() + "\n";
  txt += get_now_guideline() + sep + get_now_tech();
  alert(txt);
  function get_now_guideline() {
    var gd = document.getElementById("guideline");
    var idx = gd.options.selectedIndex;
    return regx_text_spliter(gd.options[idx].text, "([0-9]\.[0-9]\.[0-9]\.[0-9])");
  }
  function get_now_tech() {
    var tch = document.getElementById("techList");
    var idx = tch.options.selectedIndex;
    return regx_text_spliter(tch.options[idx].text, "([A-Z]+[0-9]+)");
  }
  function get_now_url() {
    var url = document.getElementById("urlList");
    var idx = url.options.selectedIndex;
    return regx_text_spliter(url.options[idx].text, "(http.+)");
  }
  function regx_text_spliter(str, pattern) {
    var pat = new RegExp(pattern);
    var mt = str.match(pat);
    return mt[1].toString();
  }
})();

javascript:(function(){var sep="\t"; /*\n or \t*/var url_flg=true;var txt = "";if(url_flg) txt += get_now_url() + "\n";txt += get_now_guideline() + sep + get_now_tech();alert(txt);function get_now_guideline() {var gd = document.getElementById("guideline");var idx = gd.options.selectedIndex;return regx_text_spliter(gd.options[idx].text, "([0-9]\.[0-9]\.[0-9]\.[0-9])");}function get_now_tech() {var tch = document.getElementById("techList");var idx = tch.options.selectedIndex;return regx_text_spliter(tch.options[idx].text, "([A-Z]+[0-9]+)");}function get_now_url() {var url = document.getElementById("urlList");var idx = url.options.selectedIndex;return regx_text_spliter(url.options[idx].text, "(http.+)");}function regx_text_spliter(str, pattern) {var pat = new RegExp(pattern);var mt = str.match(pat);return mt[1].toString();}})();
