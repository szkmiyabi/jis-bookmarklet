//検査結果を別タブで参照する
javascript:(function(){
	var projectid = get_projectid();
	var urls = create_pageid_arr();
	var guidelines = [
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
	trgr(projectid, urls, guidelines);
	function trgr(projectid, urls, guidelines){
		var d = window.open().document;
		d.writeln('<!DOCTYPE html>');
		d.writeln('<html lang="ja">');
		d.writeln('<head>');
		d.writeln('<meta charset="utf-8">');
		d.writeln('<title>判定結果参照(V5)</title>');
		d.writeln('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>');
		d.writeln('<style type="text/css">');
		d.writeln('* {font-family: "メイリオ",Meiryo,sans-serif;}');
		d.writeln('h1 {font-size: 170%;}');
		d.writeln('#desc,label {font-size: 90%;}');
		d.writeln('#technique_id{width:80px;}');
		d.writeln('em {font-size: 70%;font-style:normal;font-weight:bold;color:#C00000;}');
		d.writeln('#all_text {width: 160px;}');
		d.writeln('#results {font-size:80%; width: 100%; height: 15em;}');
		d.writeln('#results dt {font-weight: bold;}');
		d.writeln('#results dd {margin: -1.5em 0 3px 11em;}');
		d.writeln('.first{margin-top: 25px;}');
		d.writeln('</style>');
		d.writeln('</head>');
		d.writeln('<body>');
		d.writeln('<script type="text/javascript">');
		d.writeln('var techs = {');
		d.writeln('"7.1.1.1": "H37,H24,G94,H2,H30,IFC2016,IFC1022,H44,H65,G68,G100,IFC1002,H67,C9",');
		d.writeln('"7.1.2.1": "G158,IFC1003",');
		d.writeln('"7.1.2.2": "IFC1004",');
		d.writeln('"7.1.2.3": "IFC1005",');
		d.writeln('"7.1.2.4": "IFC2007,IFC2008",');
		d.writeln('"7.1.2.5": "IFC1023",');
		d.writeln('"7.1.3.1": "IFC2001,G117,G140,G138,H51,IFC1036,H44,H65,H71,H85,H48,H42,SCR21,IFC2005",');
		d.writeln('"7.1.3.2": "IFC1006,C8",');
		d.writeln('"7.1.3.3": "G96",');
		d.writeln('"7.1.4.1": "IFC2006,IFC1037,IFC1038",');
		d.writeln('"7.1.4.2": "IFC1007",');
		d.writeln('"7.1.4.3": "G18,G148,G174,G145",');
		d.writeln('"7.1.4.4": "G142,IFC1025,IFC1026,G178,G179",');
		d.writeln('"7.1.4.5": "C22,C30,G140",');
		d.writeln('"7.2.1.1": "IFC1008",');
		d.writeln('"7.2.1.2": "G21",');
		d.writeln('"7.2.2.1": "G133,IFC2026,G198,G180,IFC1009,IFC2015",');
		d.writeln('"7.2.2.2": "IFC1039",');
		d.writeln('"7.2.3.1": "IFC1011",');
		d.writeln('"7.2.4.1": "IFC1040,H69,H50,SCR28",');
		d.writeln('"7.2.4.2": "IFC1013",');
		d.writeln('"7.2.4.3": "IFC1014,IFC1041",');
		d.writeln('"7.2.4.4": "IFC1015,H24,G53,H77,H78,H79,H80,H81,C7",');
		d.writeln('"7.2.4.5": "G125,G64,G63,G161,G126,G185",');
		d.writeln('"7.2.4.6": "G130,G131",');
		d.writeln('"7.2.4.7": "IFC1042",');
		d.writeln('"7.3.1.1": "H57",');
		d.writeln('"7.3.1.2": "H58",');
		d.writeln('"7.3.2.1": "G107",');
		d.writeln('"7.3.2.2": "IFC1016",');
		d.writeln('"7.3.2.3": "G61",');
		d.writeln('"7.3.2.4": "G197",');
		d.writeln('"7.3.3.1": "IFC2025,IFC1018",');
		d.writeln('"7.3.3.2": "G89,G184,G162,G83,H44,H65,H71,G167",');
		d.writeln('"7.3.3.3": "G83,IFC2017",');
		d.writeln('"7.3.3.4": "IFC2019,IFC2020,IFC2021",');
		d.writeln('"7.4.1.1": "IFC1019",');
		d.writeln('"7.4.1.2": "IFC1020,IFC1021,SCR21",');
		d.writeln('};');
		d.writeln('function create_techs(){');
		d.writeln('var select = document.getElementById("technique_id");');
		d.writeln('select.innerHTML = "";');
		d.writeln('var src = document.getElementById("guideline_id");');
		d.writeln('var guideline_id = src.options[src.selectedIndex].text;');
		d.writeln('var tmp = new Array();');
		d.writeln('for(var key in techs){');
		d.writeln('if(key == guideline_id){');
		d.writeln('var val = techs[key].toString();');
		d.writeln('tmp = val.split(",");');
		d.writeln('break;');
		d.writeln('}');
		d.writeln('}');
		d.writeln('for(var i=0; i < tmp.length; i++){');
		d.writeln('var elm = document.createElement("option");');
		d.writeln('elm.setAttribute("value", tmp[i].toString());');
		d.writeln('elm.textContent = tmp[i].toString();');
		d.writeln('select.appendChild(elm);');
		d.writeln('}');
		d.writeln('}');
		d.writeln('var pageid = "";');
		d.writeln('var guideline = "";');
		d.writeln('var technique = "";');
		d.writeln('var result_arr = new Array();');
		d.writeln('function browseSurvey() {');
		d.writeln('var pageid_src = document.getElementById("page_id");');
		d.writeln('var guideline_src = document.getElementById("guideline_id");');
		d.writeln('var technique_src = document.getElementById("technique_id");');
		d.writeln('guideline = guideline_src.options[guideline_src.selectedIndex].text;');
		d.writeln('pageid = pageid_src.options[pageid_src.selectedIndex].text;');
		d.writeln('technique = technique_src.options[technique_src.selectedIndex].text;');
		d.writeln('var projectid = document.getElementById("hdn_projectid").value;');
		d.writeln('if(projectid!="" && pageid!="" && guideline!="" && technique!=""){');
		d.writeln('data = {');
		d.writeln('projID: projectid,');
		d.writeln('controlID: pageid,');
		d.writeln('guideline: guideline,');
		d.writeln('technique: technique');
		d.writeln('};');
		d.writeln('$.ajax({');
		d.writeln('url: "/diagnose/indexv2/getResultsByTechnique/",');
		d.writeln('type: "POST",');
		d.writeln('data: data,');
		d.writeln('dataType: "html",');
		d.writeln('error: function(data){');
		d.writeln('alert("取得エラー");');
		d.writeln('},');
		d.writeln('success: function(data) {');
		d.writeln('var result_arr = new Array();');
		d.writeln('var myobj = eval("("+data+")");');
		d.writeln('var result_text = "";');
		d.writeln('var pass_cnt = 0;');
		d.writeln('var check_cnt = 0;');
		d.writeln('var fail_cnt = 0;');
		d.writeln('var na_cnt = 0;');
		d.writeln('for(var i=0; i< myobj.length; i++){');
		d.writeln('var id = pageid+"_"+guideline+"_"+technique+"_"+i;');
		d.writeln('var user = (myobj[i]["userid"]==null)? "PRG診断":myobj[i]["name"];');
		d.writeln('var comments = myobj[i]["comments2"];');
		d.writeln('var description = myobj[i]["description2"];');
		d.writeln('var srccode = myobj[i]["srccode2"];');
		d.writeln('var result = myobj[i]["result"];');
		d.writeln('switch(result){');
		d.writeln('case "PASS":');
		d.writeln('case "PASS_HC":');
		d.writeln('result = (myobj[i]["note"]=="1")? "適合(注記)":"適合";');
		d.writeln('pass_cnt += 1;');
		d.writeln('break;');
		d.writeln('case "CHECK":');
		d.writeln('result = "未";');
		d.writeln('check_cnt += 1;');
		d.writeln('break;');
		d.writeln('case "FAIL_HC":');
		d.writeln('case "FAIL_AC":');
		d.writeln('result = (myobj[i]["rejudgement"]=="1")? "不適合(要再判定)":"不適合";');
		d.writeln('fail_cnt += 1;');
		d.writeln('break;');
		d.writeln('case "NA_HC":');
		d.writeln('result = "非適用";');
		d.writeln('na_cnt;');
		d.writeln('break;');
		d.writeln('}');
		d.writeln('var cnt = result_arr.length;');
		d.writeln('result_arr[cnt] = new Array();');
		d.writeln('result_text += id + "\\n";');
		d.writeln('result_arr[cnt].push(id);');
		d.writeln('result_text += "検査員: " + user + "\\n";');
		d.writeln('result_arr[cnt].push(user);');
		d.writeln('result_text += "判定: " + result + "\\n";');
		d.writeln('result_arr[cnt].push(result);');
		d.writeln('result_text += "コメント:\\n" + comments + "\\n";');
		d.writeln('result_arr[cnt].push(comments);');
		d.writeln('result_text += "対象ソース:\\n" + mydecode(description) + "\\n";');
		d.writeln('result_arr[cnt].push(mydecode(description));');
		d.writeln('result_text += "修正ソース:\\n" + mydecode(srccode) + "\\n\\n";');
		d.writeln('result_arr[cnt].push(mydecode(srccode));');
		d.writeln('}');
		d.writeln('var pr = document.getElementById("desc");');
		d.writeln('var pr_text = "";');
		d.writeln('pr_text += "<strong>JIS番号:</strong> " + guideline+"  <strong>実装番号:</strong> " + technique + "&nbsp;&nbsp;&nbsp;&nbsp;";');
		d.writeln('pr_text += "<strong>適合:</strong>"+pass_cnt+" <strong>不適合:</strong>"+fail_cnt+" <strong>非適用:</strong>"+na_cnt+" <strong>未:</strong>"+check_cnt;');
		d.writeln('pr.innerHTML = pr_text;');
		d.writeln('var dl = document.getElementById("results");');
		d.writeln('dl.innerHTML = "";');
		d.writeln('for(var i=0; i<result_arr.length; i++){');
		d.writeln('if(get_radio_val() == "failonly" && result_arr[i][2].toString() != "不適合") continue;');
		d.writeln('if(get_radio_val() == "okonly" && result_arr[i][2].toString() != "適合") continue;');
		d.writeln('var dt1 = document.createElement("dt");');
		d.writeln('dt1.setAttribute("class", "first");');
		d.writeln('dt1.textContent = "ID:";');
		d.writeln('dl.appendChild(dt1);');
		d.writeln('var dd1 = document.createElement("dd");');
		d.writeln('dd1.textContent = result_arr[i][0].toString();');
		d.writeln('dl.appendChild(dd1);');
		d.writeln('var dt2 = document.createElement("dt");');
		d.writeln('dt2.textContent = "検査員:";');
		d.writeln('dl.appendChild(dt2);');
		d.writeln('var dd2 = document.createElement("dd");');
		d.writeln('dd2.textContent = result_arr[i][1].toString();');
		d.writeln('dl.appendChild(dd2);');
		d.writeln('var dt3 = document.createElement("dt");');
		d.writeln('dt3.textContent = "判定結果:";');
		d.writeln('dl.appendChild(dt3);');
		d.writeln('var dd3 = document.createElement("dd");');
		d.writeln('dd3.textContent = result_arr[i][2].toString();');
		d.writeln('dl.appendChild(dd3);');
		d.writeln('var dt4 = document.createElement("dt");');
		d.writeln('dt4.textContent = "判定コメント:";');
		d.writeln('dl.appendChild(dt4);');
		d.writeln('var dd4 = document.createElement("dd");');
		d.writeln('dd4.textContent = result_arr[i][3].toString();');
		d.writeln('if(result_arr[i][3].toString()=="") dd4.textContent = "なし";');
		d.writeln('dl.appendChild(dd4);');
		d.writeln('var dt5 = document.createElement("dt");');
		d.writeln('dt5.textContent = "対象ソースコード:";');
		d.writeln('dl.appendChild(dt5);');
		d.writeln('var dd5 = document.createElement("dd");');
		d.writeln('dd5.textContent = result_arr[i][4].toString();');
		d.writeln('if(result_arr[i][4].toString()=="") dd5.textContent = "なし";');
		d.writeln('dl.appendChild(dd5);');
		d.writeln('var dt6 = document.createElement("dt");');
		d.writeln('dt6.textContent = "修正ソースコード:";');
		d.writeln('dl.appendChild(dt6);');
		d.writeln('var dd6 = document.createElement("dd");');
		d.writeln('dd6.textContent = result_arr[i][5].toString();');
		d.writeln('if(result_arr[i][5].toString()=="") dd6.textContent = "なし";');
		d.writeln('dl.appendChild(dd6);');
		d.writeln('}');
		d.writeln('}');
		d.writeln('});');
		d.writeln('}else{');
		d.writeln('alert("参照エラーです！");');
		d.writeln('}');
		d.writeln('}');
		d.writeln('function mydecode(str){');
		d.writeln('str = str.replace(/&lt;/g,"<");');
		d.writeln('str = str.replace(/&gt;/g,">");');
		d.writeln('return str;');
		d.writeln('}');
		d.writeln('function chk_guideline(str){');
		d.writeln('var pat = new RegExp(/7\\.[1-4]\\.[0-9]\\.[0-9]/);');
		d.writeln('var arr = str.match(pat);');
		d.writeln('if(arr!=null){');
		d.writeln('return true;');
		d.writeln('}else{');
		d.writeln('return false;');
		d.writeln('}');
		d.writeln('}');
		d.writeln('function chk_technique(str){');
		d.writeln('var pat = new RegExp(/[A-Z][0-9]*/);');
		d.writeln('var arr = technique.match(pat);');
		d.writeln('if(arr!=null){');
		d.writeln('return true;');
		d.writeln('}else{');
		d.writeln('return false;');
		d.writeln('}');
		d.writeln('}');
		d.writeln('function get_radio_val(){');
		d.writeln('var ret = "";');
		d.writeln('var arr = document.getElementsByName("filter");');
		d.writeln('for(var i=0; i<arr.length; i++){');
		d.writeln('if(arr[i].checked){');
		d.writeln('ret = arr[i].value;');
		d.writeln('break;');
		d.writeln('}');
		d.writeln('}');
		d.writeln('return ret;');
		d.writeln('}');
		d.writeln('</script>');
		d.writeln('<h1>判定結果参照<small>(V5)</small></h1>');
		d.writeln('<label for="">URL:</label>');
		d.writeln('<select id="page_id"></select><br>');
		d.writeln('<label for="all_text">JIS番号と実装番号：</label>');
		d.writeln('<select id="guideline_id" onchange="create_techs()"></select>');
		d.writeln('<select id="technique_id"></select>');
		d.writeln('<label><input type="radio" id="all" name="filter" value="all" checked="checked">全件</label>');
		d.writeln('<label><input type="radio" id="failonly" name="filter" value="failonly">不適合のみ</label>');
		d.writeln('<label><input type="radio" id="okonly" name="filter" value="okonly">適合のみ</label>');
		d.writeln('<input type="hidden" id="hdn_projectid" value="' + projectid + '">');
		d.writeln('<button onclick="browseSurvey()">参照実行</button><br>');
		d.writeln('<p id="desc"></p>');
		d.writeln('<dl id="results"></dl>');
		d.writeln('</body>');
		d.writeln('</html>');
		alert(d.readyState+"..."+"数秒経ってからOKをクリックしてください");
		var gdselect = d.getElementById("guideline_id");
		for(var i=0; i<guidelines.length; i++){
			var row = guidelines[i].toString();
			var opt = d.createElement("option");
			opt.setAttribute("value", row);
			opt.textContent = row;
			gdselect.appendChild(opt);
		}
		var pageselect = d.getElementById("page_id");
		for(var i=0; i<urls.length; i++){
			var row = urls[i].toString();
			var opt = d.createElement("option");
			opt.setAttribute("value", row);
			opt.textContent = row;
			pageselect.appendChild(opt);
		}
	}
	function get_pageid(){
	  var urlval = "";
	  var pageid = "";
	  var element=document.getElementById("urlList");
	     for(var i=0;i<element.options.length;i++){
			if(element.options[i].selected){
				urlval=element.options[i].text;
				break;
			}
	     }
	     var pageidpat = new RegExp(/(\[)(.*?)(\])/);
	     var arr = urlval.match(pageidpat);
	     if(arr!=null){
	       pageid = arr[2].toString();
	 	  }
	 	  return pageid;
	}
	function get_projectid(){
		var projectid = "";
		var crturl = window.location.href;
		var prjpat = new RegExp(/projID\/([0-9]*)/);
		var arr = crturl.match(prjpat);
		if(arr!=null){
			projectid = arr[1].toString();
		}
		return projectid;
	}
	function create_pageid_arr(){
		var arr = new Array();
		var urlselect = document.getElementById("urlList");
		for(var i=0; i<urlselect.options.length; i++){
			var urlalltext = urlselect.options[i].text;
			var pageid_pat = new RegExp(/\[(.+?)\]/);
			var pageid_arr = urlalltext.match(pageid_pat);
			var pageidtext = "";
			if(pageid_arr!==null){
				pageidtext = pageid_arr[1].toString();
			}
			arr.push(pageidtext);
		}
		return arr;
	}
})();