//検査箇所を別タブで一覧表示する
javascript:(function(){
	function trgr(){
		var d=window.open().document;
		d.writeln('<!DOCTYPE html>');
		d.writeln('<html lang="ja">');
		d.writeln('<head>');
		d.writeln('<meta charset="utf-8">');
		d.writeln('<title>診断箇所一覧</title>');
		d.writeln('<style>');
		d.writeln('h1{font-size:160%;font-family:"メイリオ",Meiryo;}');
		d.writeln('textarea{font-size:80%;font-family:"メイリオ",Meiryo;width:100%;height:35em;}');
		d.writeln('</style>');
		d.writeln('</head>');
		d.writeln('<body>');
		d.writeln('<script>');
		d.writeln('function win_close(){');
		d.writeln('window.close();');
		d.writeln('return false;');
		d.writeln('}');
		d.writeln('function export_data(){');
		d.writeln('var src = document.getElementById("ta").value;');
		d.writeln('var d = window.open().document;');
		d.writeln('d.writeln(\'<!DOCTYPE html>\');');
		d.writeln('d.writeln(\'<html lang="ja"><head><meta charset="utf-8">\');');
		d.writeln('d.writeln(\'<title>Export</title>\');');
		d.writeln('d.writeln(\'<style>h1{font-size:160%;font-family:"メイリオ",Meiryo;}\');');
		d.writeln('d.writeln(\'pre{font-size:80%;font-family:"メイリオ",Meiryo;width:100%;height:20em;}\');');
		d.writeln('d.writeln(\'</style></head>\');');
		d.writeln('d.writeln(\'<body>\');');
		d.writeln('d.writeln(\'<h1>Export</h1>\');');
		d.writeln('d.writeln(\'</body>\');');
		d.writeln('d.writeln(\'</html>\');');
		d.writeln('var pr = d.createElement("pre");');
		d.writeln('pr.textContent = src;');
		d.writeln('var bd = d.getElementsByTagName("body").item(0);');
		d.writeln('bd.appendChild(pr);');
		d.writeln('}');
		d.writeln('</script>');
		d.writeln('<h1>診断箇所一覧</h1>');
		d.writeln('<button onclick="export_data()">Export</button>');
		d.writeln('<button onclick="win_close()">Close</button><br>');
		d.writeln('</body></html>');
		var bd = d.getElementsByTagName("body").item(0);
		var ta = d.createElement("textarea");
		ta.setAttribute("id", "ta");
		ta.textContent = str;
		bd.appendChild(ta);
	}
	var d=document.getElementById("source");
	var dch=d.childNodes;
	var str="";
	for(var i=0;i<dch.length;i++){
	  if(dch.item(i).id){
	    var j=i+1;
	    if(dch.item(j).nodeValue!=null){
	      str+="▼"+"\r\n";
	      str+=dch.item(j).nodeValue+"\r\n";
	    }
	  }
	}
	trgr();
})();