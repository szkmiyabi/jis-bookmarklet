//JIS番号選択ブックマークレット生成
javascript:(function(){
	trgr();
	function trgr(){
		var d = window.open().document;
		d.writeln('<!DOCTYPE html>');
		d.writeln('<html lang="ja">');
		d.writeln('<head>');
		d.writeln('<meta charset="utf-8">');
		d.writeln('<title>GL-Selecttor</title>');
		d.writeln('<style type="text/css">');
		d.writeln('* {font-family: "メイリオ",Meiryo,sans-serif;}');
		d.writeln('h1 {font-size: 170%; margin-top:0;}');
		d.writeln('label {font-size: 90%; margin-right: 10px;}');
		d.writeln('textarea {width:480px; font-size:80%; height: 8em;}');
		d.writeln('</style>');
		d.writeln('</head>');
		d.writeln('<body>');
		d.writeln('<script type="text/javascript">');
		d.writeln('function create_bkm(){');
		d.writeln('var src = document.getElementById("tar_gd");');
		d.writeln('var idx = src.selectedIndex;');
		d.writeln('var guideline_id = src.options[idx].value;');
		d.writeln('var str = "";');
		d.writeln('str += "javascript:(function(){";');
		d.writeln('str += \'var pat = new RegExp("\' + guideline_id + \'");\';');
		d.writeln('str += \'var gds = document.getElementById("guideline");\';');
		d.writeln('str += \'for(var i=0; i<gds.options.length; i++){\';');
		d.writeln('str += "var row = gds.options[i].text;";');
		d.writeln('str += "if(row.match(pat)!==null){";');
		d.writeln('str += "gds.selectedIndex = i;";');
		d.writeln('str += \'var event = document.createEvent("HTMLEvents");\';');
		d.writeln('str += \'event.initEvent("change", true, false);\';');
		d.writeln('str += "gds.dispatchEvent(event);";');
		d.writeln('str += "break;";');
		d.writeln('str += "}";');
		d.writeln('str += "}";');
		d.writeln('str += "})();";');
		d.writeln('document.getElementById("bkm").value = str;');
		d.writeln('}');
		d.writeln('function delete_text(){');
		d.writeln('document.getElementById("bkm").value = "";');
		d.writeln('}');
		d.writeln('</script>');
		d.writeln('<h1>Guideline Selector</h1>');
		d.writeln('<label for="tar_gd">JIS番号</label>');
		d.writeln('<select id="tar_gd"></select>');
		d.writeln('<button onclick="create_bkm()">Create</button>');
		d.writeln('<button onclick="delete_text()">Delete</button><br>');
		d.writeln('<textarea id="bkm"></textarea>');
		d.writeln('</body>');
		d.writeln('</html>');
		var arr = [
			"7.1.1.1",
			"7.1.2.1",
			"7.1.2.2",
			"7.1.2.3",
			"7.1.2.4",
			"7.1.2.5",
			"7.1.3.1",
			"7.1.3.2",
			"7.1.3.3",
			"7.1.4.1",
			"7.1.4.2",
			"7.1.4.3",
			"7.1.4.4",
			"7.1.4.5",
			"7.2.1.1",
			"7.2.1.2",
			"7.2.2.1",
			"7.2.2.2",
			"7.2.3.1",
			"7.2.4.1",
			"7.2.4.2",
			"7.2.4.3",
			"7.2.4.4",
			"7.2.4.5",
			"7.2.4.6",
			"7.2.4.7",
			"7.3.1.1",
			"7.3.1.2",
			"7.3.2.1",
			"7.3.2.2",
			"7.3.2.3",
			"7.3.2.4",
			"7.3.3.1",
			"7.3.3.2",
			"7.3.3.3",
			"7.3.3.4",
			"7.4.1.1",
			"7.4.1.2"
		];
		var element = d.getElementById("tar_gd");
		for(var i=0; i<arr.length; i++){
			var row = arr[i].toString();
			var opt = d.createElement("option");
			opt.setAttribute("value", row);
			opt.textContent = row;
			element.appendChild(opt);
		}
	}
})();