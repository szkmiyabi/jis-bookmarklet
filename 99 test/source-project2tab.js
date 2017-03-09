javascript:(function(){
  var url = 'http://jis.infocreate.co.jp/diagnose/indexv2/index/projID/';
  var prj = prompt('プロジェクト番号を入力');
  if(prj != "") {
    url += prj;
    window.open(url, "_blank");
  }
})();

javascript:(function(){var url = 'http://jis.infocreate.co.jp/diagnose/indexv2/index/projID/';var prj = prompt('プロジェクト番号を入力');if(prj != "") {url += prj;window.open(url, "_blank");}})();