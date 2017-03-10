//ブックマークレット生成機
javascript:(function(){
  trgr();
  function trgr(){
  	d = window.open().document;
	d.writeln('<!DOCTYPE html>');
	d.writeln('<html lang="ja">');
	d.writeln('<head>');
	d.writeln('<meta charset="utf-8">');
	d.writeln('<style type="text/css">');
	d.writeln('* {font-family:"メイリオ",Meiryo,sans-serif;}');
	d.writeln('input,textarea,label{font-size: 90%;}');
	d.writeln('button#bkm_create_btn {font-size:110%;}');
	d.writeln('dd {margin-left: 0;}');
	d.writeln('#bkm {border-collapse: collapse;width: 600px;}');
	d.writeln('#bkm th {background: #eee;border:3px solid #fff;padding: 5px;}');
	d.writeln('#bkm td {background: #FFFFE0;border:3px solid #fff;padding: 5px;}');
	d.writeln('#bkm_comments,#bkm_srccode,#regx_after_text,#regx_text,#bkm_descript {width: 430px;}');
	d.writeln('#bkm td.btnarea {text-align: center;background: #eee;}');
	d.writeln('#bkm td.codeare {background: #eee;}');
	d.writeln('#bkm_code {width: 600px; height: 10em;}');
	d.writeln('</style>');
	d.writeln('</head>');
	d.writeln('<body>');
	d.writeln('<script type="text/javascript">');
	d.writeln('function bkm_create(){');
	d.writeln('var bkm_body = "javascript:(function(){";');
	d.writeln('var bkm_results = document.getElementsByName("bkm_result");');
	d.writeln('var bkm_result_val = "";');
	d.writeln('for(var i=0; i<bkm_results.length; i++){');
	d.writeln('if(bkm_results[i].checked==true){');
	d.writeln('bkm_result_val = bkm_results[i].value;');
	d.writeln('break;');
	d.writeln('}');
	d.writeln('}');
	d.writeln('var bkm_comments_status = document.getElementsByName("bkm_comment_status");');
	d.writeln('var bkm_comment_status_val = "";');
	d.writeln('for(var i=0; i<bkm_comments_status.length; i++){');
	d.writeln('if(bkm_comments_status.item(i).checked==true){');
	d.writeln('bkm_comment_status_val = bkm_comments_status[i].value;');
	d.writeln('break;');
	d.writeln('}');
	d.writeln('}');
	d.writeln('var bkm_descripts_status = document.getElementsByName("bkm_descript_status");');
	d.writeln('var bkm_descript_status_val = "";');
	d.writeln('for(var i=0; i<bkm_descripts_status.length; i++){');
	d.writeln('if(bkm_descripts_status[i].checked==true){');
	d.writeln('bkm_descript_status_val = bkm_descripts_status[i].value;');
	d.writeln('break;');
	d.writeln('}');
	d.writeln('}');
	d.writeln('var bkm_srccodes_status = document.getElementsByName("bkm_srccode_status");');
	d.writeln('var bkm_srccode_status_val = "";');
	d.writeln('for(var i=0; i<bkm_srccodes_status.length; i++){');
	d.writeln('if(bkm_srccodes_status[i].checked==true){');
	d.writeln('bkm_srccode_status_val = bkm_srccodes_status[i].value;');
	d.writeln('break;');
	d.writeln('}');
	d.writeln('}');
	d.writeln('var bkm_autosaves = document.getElementsByName("bkm_autosave");');
	d.writeln('var bkm_autosave_val = "";');
	d.writeln('for(var i=0; i<bkm_autosaves.length; i++){');
	d.writeln('if(bkm_autosaves[i].checked==true){');
	d.writeln('bkm_autosave_val = bkm_autosaves[i].value;');
	d.writeln('break;');
	d.writeln('}');
	d.writeln('}');
	d.writeln('switch(bkm_result_val){');
	d.writeln('case "0":');
	d.writeln('bkm_body += \'var form=document.forms["diag_form"];for(var i=0;i<form.elements.length;i++){var obj=form.elements[i].value;if(obj=="PASS"){form.elements[i].click();break;}}\';');
	d.writeln('break;');
	d.writeln('case "1":');
	d.writeln('bkm_body += \'var form=document.forms["diag_form"];for(var i=0;i<form.elements.length;i++){var obj=form.elements[i].value;if(obj=="PASS2"){form.elements[i].click();break;}}\';');
	d.writeln('break;');
	d.writeln('case "2":');
	d.writeln('bkm_body += \'var form=document.forms["diag_form"];for(var i=0;i<form.elements.length;i++){var obj=form.elements[i].value;if(obj=="FAIL"){form.elements[i].click();break;}}\';');
	d.writeln('break;');
	d.writeln('case "3":');
	d.writeln('bkm_body += \'var form=document.forms["diag_form"];for(var i=0;i<form.elements.length;i++){var obj=form.elements[i].value;if(obj=="FAIL2"){form.elements[i].click();break;}}\';');
	d.writeln('break;');
	d.writeln('default:');
	d.writeln('bkm_body += \'var form=document.forms["diag_form"];for(var i=0;i<form.elements.length;i++){var obj=form.elements[i].value;if(obj=="NA"){form.elements[i].click();break;}}\';');
	d.writeln('break;');
	d.writeln('}');
	d.writeln('if(bkm_comment_status_val=="0"){');
	d.writeln('var val1 = document.getElementById("bkm_comments").value;');
	d.writeln('val1 = br_escape(val1);');
	d.writeln('if(document.getElementsByName("bkm_comment_overwrite").item(0).checked==true) {');
	d.writeln('bkm_body += \'var tmpv1=document.getElementById("comments").value;\';');
	d.writeln('bkm_body += \'document.getElementById("comments").value = tmpv1 + "\\\\n\\\\n" + \\\'\';');
	d.writeln('bkm_body += val1 + \'\\\';\';');
	d.writeln('}else{');
	d.writeln('bkm_body += \'document.getElementById("comments").value=\\\'\';');
	d.writeln('bkm_body += val1 + \'\\\';\';');
	d.writeln('}');
	d.writeln('}');
	d.writeln('if(bkm_descript_status_val=="0"){');
	d.writeln('var val2 = document.getElementById("bkm_descript").value;');
	d.writeln('val2 = br_escape(val2);');
	d.writeln('if(document.getElementsByName("bkm_descript_overwrite").item(0).checked==true) {');
	d.writeln('bkm_body += \'var tmpv2=document.getElementById("description").value;\';');
	d.writeln('bkm_body += \'document.getElementById("description").value = tmpv2 + "\\\\n\\\\n" + \\\'\';');
	d.writeln('bkm_body += val2 + \'\\\';\';');
	d.writeln('}else{');
	d.writeln('bkm_body += \'document.getElementById("description").value=\\\'\';');
	d.writeln('bkm_body += val2 + \'\\\';\';');
	d.writeln('}');
	d.writeln('}');
	d.writeln('if(bkm_srccode_status_val=="0"){');
	d.writeln('var val3 = document.getElementById("bkm_srccode").value;');
	d.writeln('val3 = br_escape(val3);');
	d.writeln('if(document.getElementsByName("bkm_srccode_overwrite").item(0).checked==true) {');
	d.writeln('bkm_body += \'var tmpv3=document.getElementById("srccode").value;\';');
	d.writeln('bkm_body += \'document.getElementById("srccode").value = tmpv3 + "\\\\n\\\\n" + \\\'\';');
	d.writeln('bkm_body += val3 + \'\\\';\';');
	d.writeln('} else {');
	d.writeln('bkm_body += \'document.getElementById("srccode").value=\\\'\';');
	d.writeln('bkm_body += val3 + \'\\\';\';');
	d.writeln('}');
	d.writeln('} else if(bkm_srccode_status_val=="2") {');
	d.writeln('var patval = document.getElementById("regx_text").value;');
	d.writeln('var repval = document.getElementById("regx_after_text").value;');
	d.writeln('bkm_body += \'var pat=new RegExp(/\' + patval + \'/);\';');
	d.writeln('bkm_body += \'var regx_before_text=document.getElementById("srccode").value;\';');
	d.writeln('bkm_body += \'var regx_after_text=regx_before_text.replace(pat, \\\'\' + repval + \'\\\');\';');
	d.writeln('bkm_body += \'document.getElementById("srccode").value=regx_after_text;\'');
	d.writeln('}');
	d.writeln('if(bkm_autosave_val=="0"){');
	d.writeln('bkm_body += \'for(var i=0;i<form.elements.length;i++){var obj=form.elements[i].type;if(obj=="submit"){form.elements[i].click();}}\';');
	d.writeln('}');
	d.writeln('bkm_body += "})();"');
	d.writeln('document.getElementById("bkm_code").value = bkm_body;');
	d.writeln('}');
	d.writeln('function clear_this_text(obj){');
	d.writeln('document.getElementById(obj).value = "";');
	d.writeln('}');
	d.writeln('function br_escape(str) {');
	d.writeln('var ret = str.replace(/(\\r\\n|\\n)/mg, "\\\\n");');
	d.writeln('return ret;');
	d.writeln('}');
	d.writeln('</script>');
	d.writeln('<h1>Bookmarkletter</h1>');
	d.writeln('<table id="bkm">');
	d.writeln('<tr>');
	d.writeln('<th><label for="bkm_result">判定結果</label></th>');
	d.writeln('<td>');
	d.writeln('<label><input type="radio" name="bkm_result" value="0">適合</label>');
	d.writeln('<label><input type="radio" name="bkm_result" value="1">適合(注記)</label>');
	d.writeln('<label><input type="radio" name="bkm_result" value="2">不適合</label>');
	d.writeln('<label><input type="radio" name="bkm_result" value="3">不適合(要判定)</label>');
	d.writeln('<label><input type="radio" name="bkm_result" value="4">非適用 </label>');
	d.writeln('</td>');
	d.writeln('</tr>');
	d.writeln('<tr>');
	d.writeln('<th><label for="bkm_comments">判定コメント</label></th>');
	d.writeln('<td>');
	d.writeln('<dl>');
	d.writeln('<dt>');
	d.writeln('<label><input type="radio" name="bkm_comment_status" value="0">はい</label>');
	d.writeln('<label><input type="radio" name="bkm_comment_status" value="1">いいえ</label>');
	d.writeln('<label><input type="checkbox" name="bkm_comment_overwrite" value="0">追記有効</label>');
	d.writeln('</dt>');
	d.writeln('<dd><textarea id="bkm_comments"></textarea><br>');
	d.writeln('<button onclick="clear_this_text(\'bkm_comments\')">Clear</button>');
	d.writeln('</dd>');
	d.writeln('</dl>');
	d.writeln('</td>');
	d.writeln('</tr>');
	d.writeln('<tr>');
	d.writeln('<th><label>対象ソースコード</label></th>');
	d.writeln('<td>');
	d.writeln('<dl>');
	d.writeln('<dt>');
	d.writeln('<label><input type="radio" name="bkm_descript_status" value="0">はい</label>');
	d.writeln('<label><input type="radio" name="bkm_descript_status" value="1">いいえ</label>');
	d.writeln('<label><input type="checkbox" name="bkm_descript_overwrite" value="0">追記有効</label>');
	d.writeln('</dt>');
	d.writeln('<dd>');
	d.writeln('<textarea id="bkm_descript"></textarea>');
	d.writeln('<br><button onclick="clear_this_text(\'bkm_descript\')">Clear</button>');
	d.writeln('</dd>');
	d.writeln('</dl>');
	d.writeln('</td>');
	d.writeln('</tr>');
	d.writeln('<tr>');
	d.writeln('<th><label for="bkm_srccode">修正ソースコード</label></th>');
	d.writeln('<td>');
	d.writeln('<dl>');
	d.writeln('<dt>');
	d.writeln('<label><input type="radio" name="bkm_srccode_status" value="0">はい</label>');
	d.writeln('<label><input type="radio" name="bkm_srccode_status" value="1">いいえ</label>');
	d.writeln('<label><input type="radio" name="bkm_srccode_status" value="2">正規表現置換</label>');
	d.writeln('<label><input type="checkbox" name="bkm_srccode_overwrite" value="0">追記有効</label>');
	d.writeln('</dt>');
	d.writeln('<dd><textarea id="bkm_srccode"></textarea><br>');
	d.writeln('<button onclick="clear_this_text(\'bkm_srccode\')">Clear</button><br>');
	d.writeln('<label>検索パターン</label><br><input type="text" name="regx_text" id="regx_text"><br>');
	d.writeln('<label>置換テキスト</label><br><textarea name="regx_aftr_text" id="regx_after_text" rows="1"></textarea>');
	d.writeln('<br><button onclick="clear_this_text(\'regx_after_text\')">Clear</button>');
	d.writeln('</dd>');
	d.writeln('</dl>');
	d.writeln('</td>');
	d.writeln('</tr>');
	d.writeln('<tr>');
	d.writeln('<th><label>自動登録</label></th>');
	d.writeln('<td>');
	d.writeln('<label><input type="radio" name="bkm_autosave" value="0">はい</label>');
	d.writeln('<label><input type="radio" name="bkm_autosave" value="1">いいえ</label>');
	d.writeln('</td>');
	d.writeln('</tr>');
	d.writeln('<tr>');
	d.writeln('<td colspan="2" class="btnarea">');
	d.writeln('<button id="bkm_create_btn" onclick="bkm_create()">Create</button>');
	d.writeln('</td>');
	d.writeln('</tr>');
	d.writeln('<tr>');
	d.writeln('<td colspan="2" class="codearea"><textarea id="bkm_code"></textarea><br>');
	d.writeln('<button onclick="clear_this_text(\'bkm_code\')">Clear</button>');
	d.writeln('</td>');
	d.writeln('</tr>');
	d.writeln('</table>');
	d.writeln('</body>');
	d.writeln('</html>');
  }
})();