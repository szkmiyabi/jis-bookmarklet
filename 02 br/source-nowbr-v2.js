//現在開いている判定画面の情報を表示
javascript:(function(){
	function surveyResultBrowse() {
		urls = document.getElementById("urlList");
		guidelines = document.getElementById("guideline");
		techs = document.getElementById("techList");
		diag = document.getElementById("dialog");
		diag_ctrls = diag.getElementsByTagName("input");
		comments = document.getElementById("comments");
		description = document.getElementById("description");
		srccode = document.getElementById("srccode");
		survey_hash = {
			"PASS":"適合",
			"PASS2":"適合(注記)",
			"FAIL":"不適合",
			"FAIL2":"不適合(要再判定)",
			"NA":"非適用"
		};
	}
	surveyResultBrowse.prototype = {
		get_pageNum: function(str, bracket) {
			var num_str = "";
			var pat = new RegExp(/\[([a-zA-Z]+[0-9]+)\](.+)/);
			var mt = str.match(pat);
			if(mt.length > 0) {
				num_str = mt[1];
			} else {
				return "";
			}
			if(bracket==true && num_str!=="") {
				return "[" + num_str + "]";
			} else if(bracket==false && num_str!=="") {
				return num_str;
			} 
		},
		get_guideline_str: function(str) {
			var pat = new RegExp(/([a-zA-Z0-9\.]+)/);
			var mt = str.match(pat);
			if(mt.length > 0) {
				return mt[1];
			} else {
				return "";
			}
		},
		get_tech_str: function(str) {
			var pat = new RegExp(/([a-zA-Z0-9]+)/);
			var mt = str.match(pat);
			if(mt.length > 0) {
				return mt[1];
			} else {
				return "";
			}
		},
		get_pageID: function() {
			var n = urls.selectedIndex;
			var text = this.get_pageNum(urls.options[n].text, false);
			return text;
		},
		get_guideline: function() {
			var n = guidelines.selectedIndex;
			var text = this.get_guideline_str(guidelines.options[n].text);
			return text;
		},
		get_tech: function() {
			var n = techs.selectedIndex;
			var text = this.get_guideline_str(techs.options[n].text);
			return text;
		},
		is_active_diag: function() {
			var spat = new RegExp(/display: block;/);
			var diag_div = document.getElementById("diag");
			var parent_div = diag.parentNode;
			var style_attr = parent_div.getAttribute("style");
			if(spat.test(style_attr)) return true;
			else return false;
		},
		get_survey: function() {
			var str = "";
			for(var i=0; i<diag_ctrls.length; i++) {
				var ip = diag_ctrls.item(i);
				if(ip.type === "radio" && ip.checked == true) {
					var vl = ip.value;
					str = survey_hash[vl];
					break;
				}
			}
			if(!this.is_active_diag()) return "";
			else return str;
		},
		get_comment: function() {
			if(!this.is_active_diag()) return "";
			else return comments.value;
		},
		get_description: function() {
			if(!this.is_active_diag()) return "";
			else return description.value;
		},
		get_srccode: function() {
			if(!this.is_active_diag()) return "";
			else return srccode.value;
		},
		get_data_arr: function() {
			var arr = new Array();
			arr.push(this.get_pageID());
			arr.push(this.get_guideline());
			arr.push(this.get_tech());
			arr.push(this.get_survey());
			arr.push(this.get_comment());
			arr.push(this.get_description());
			arr.push(this.get_srccode());
			return arr;
		},
		get_report: function() {
			var str = "";
			var datas = this.get_data_arr();
			str += datas[0] + "\n" + datas[1] + "\n" + datas[2] + "\n";
			str += datas[3] + "\n";
			str += "判定コメント:" + "\n" + datas[4] + "\n";
			str += "対象ソース:" + "\n" + datas[5] + "\n";
			str += "修正ソース:" + "\n" + datas[6] + "\n";
			return str;
		},
		display_diag: function(str) {
			var rid = 'nowbr_diag';
			var elm = document.createElement('div');
			var tpos = this.diag_position_y();
			var div_css = 'font-family:"メイリオ",sans-serif;font-size:90%;padding:5px;position:absolute;';
			div_css += 'top:' + tpos + 'px;left:0;background:#fff;border:solid #ccc 1px;z-index:2999;width:560px;height:390px;';
			var ta_css = ' style="width:550px; height: 360px; font-size: 90%"';
			var btnfunc = 'this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);';
			var in_html = '<div style="padding:3px;background:#eee;height:19px;"><span style="float:left;"><strong>現在の検査結果表示</strong>';
			in_html += '</span><a style="float:right;" onclick="' + btnfunc + '">閉じる' + '</a></div><textarea' + ta_css + '>';
			in_html += str + '</textarea>';
			elm.id = rid;
			elm.style.cssText = div_css;
			elm.innerHTML = in_html;
			document.getElementsByTagName("body").item(0).appendChild(elm);
			$(eval('"#' + rid + '"')).draggable();
		},
		diag_position_y: function() {
			var divs = document.getElementsByTagName("div");
			for(var i=0; i<divs.length; i++) {
			  var div = divs.item(i);
			  var pat = new RegExp(/ui\-dialog/);
			  var divclass = div.getAttribute("class");
			  if(pat.test(divclass)) {
			    var rect = div.getBoundingClientRect();
			    var positionY = rect.top;
		       var dElm = document.documentElement , dBody = document.body ;
		       var scrollY = dElm.scrollTop || dBody.scrollTop ;
		       var y = positionY + scrollY ;
			    return y;
			  }
			}
		}
	};

	var util = new surveyResultBrowse();
	var msg = util.get_report();
	util.display_diag(msg);
})();