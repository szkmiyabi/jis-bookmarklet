javascript:(function(){
	function surveyDialogUtil() {
		url = window.location.href;
		form = document.forms["diag_form"];
		comment = document.getElementById("comments");
		description = document.getElementById("description");
		srccode = document.getElementById("srccode");
		hash = {
			"PASS":"適合",
			"PASS2":"適合(注記)",
			"FAIL":"不適合",
			"FAIL2":"不適合(要再判定)",
			"NA":"非適用"
		};
		cp_hash = {
			"1":"yes",
			"0":"no",
		};
	}
	surveyDialogUtil.prototype = {
		get_survey: function() {
			var key = "";
			for(var i=0; i<form.elements.length; i++) {
				var ip = form.elements[i];
				if(ip.checked==true) {
					key = ip.value;
					break;
				}
			}
			if(key!=="") return hash[key];
			else return "";
		},
		get_survey_cp: function() {
			var key = "";
			var rdos = document.getElementsByName("copy");
			if(rdos === "undefined") return "";
			for(var i=0; i<rdos.length; i++) {
				var rdo = rdos.item(i);
				if(rdo.checked==true) {
					key = rdo.value;
					break;
				}
			}
			if(key!=="") return cp_hash[key];
			else return "";
		},
		get_comment: function() {
			return comment.value;
		},
		get_description: function() {
			return description.value;
		},
		get_srccode: function() {
			return srccode.value;
		},
		set_survey: function(flag) {
			for(var i=0; i<form.elements.length; i++) {
				var ip = form.elements[i];
				var val = ip.value;
				if(val===flag) {
					this.diag_clean(flag);
					ip.click();
					break;
				}
			}
		},
		set_comment: function(str) {
			comment.value = str;
		},
		set_description: function(str) {
			description.value = str;
		},
		set_srccode: function(str) {
			srccode.value = str;
		},
		set_survey_copy: function(flag) {
			var rds = document.getElementsByName("copy");
			if(rds !== "undefined") {
				for(var i=0; i<rds.length; i++) {
					var val = rds[i].value;
					if(val===flag) {
						rds[i].click();
						break;
					}
				}
			}
		},
		save: function() {
			for(var i=0; i<form.elements.length; i++) {
				var ip = form.elements[i];
				var tp = ip.type;
				if(tp==="submit") {
					ip.click();
					break;
				}
			}
		},
		text_clean: function(str) {
		    str=str.replace(/^ +/m,"");
		    str=str.replace(/\t+/m,"");
		    str=str.replace(/(\r\n|\r|\n)/g,""); 
		    return str;
		},
		diag_clean: function(flag) {
			switch(flag) {
				case "PASS":
					this.set_comment("");
					this.set_srccode("");
					break;
				case "NA":
					this.set_comment("");
					this.set_description("");
					this.set_srccode("");
					break;
			}
		},
		get_survey_key: function(flag_word) {
			var ret_key = "";
			for(var key in hash) {
				var val = hash[key];
				if(val === flag_word) {
					ret_key = key;
					break;
				}
			}
			return ret_key;
		},
		get_survey_cp_key: function(flag_word) {
			var ret_key = "";
			for(var key in cp_hash) {
				var val = cp_hash[key];
				if(val === flag_word) {
					ret_key = key;
					break;
				}
			}
			return ret_key;
		},
		is_survey_page: function() {
			var pat1 = new RegExp(/\/diagnose\/indexv2\/index\/projID\/\"*[0-9]+\"*/);
			var pat2 = new RegExp(/\/diagnose\/indexv2\/index\/reset\/(true|false)\/projID\/\"*[0-9]+\"*/);
			if(pat1.test(url) || pat2.test(url)) return true;
			else return false;
		},
		is_main_page: function() {
			var pat = new RegExp(/\/diagnose\/indexv2\/report\/projID\/[0-9]+/);
			if(pat.test(url)) return true;
			else return false;
		},
		is_detail_page: function() {
			var pat = new RegExp(/\/diagnose\/indexv2\/report2\/projID\/[0-9]+\/controlID\//);
			if(pat.test(url)) return true;
			else return false;
		},
		get_tech: function() {
			var tech = "";
			var techList = document.getElementById("techList");
			tech = techList.options[techList.selectedIndex].value;
			tech = tech.replace(/【完】/,"");
			return tech;
		},
		get_safe_value: function(val) {
			if(typeof val === "undefined") return "";
			else return val;
		},
		get_survey_url: function() {
			var long_url = "";
			var sv_url = "";
			var pt = new RegExp(/(\[[a-zA-Z0-9]+\])(.+)/);
			var urlList = document.getElementById("urlList");
			long_url = urlList.options[urlList.selectedIndex].text;
			if(pt.test(long_url)) {
				var mt = long_url.match(pt);
				sv_url = mt[2].toString().trim();
			}
			return sv_url;
		}
	};

	function repoUtilClass() {

		this.sv_util = new surveyDialogUtil();

		this.tbl = document.getElementsByTagName("table").item(1);
		this.pt0 = new RegExp(/<.+?>/);
		this.pt1 = new RegExp(/(http.*:\/\/.+?\/)/);
		this.pt2 = new RegExp(/(src|href)="(.+?)"/);
		this.pt3 = new RegExp(/(http.*:\/\/.+)/);
		this.pt4 = new RegExp(/(IFC1019|IFC1020|IFC1021)/);
		this.pt5 = new RegExp(/(@import url)(\("*)(.+?)("*\);)/);

		this.get_this_url = function() {
			if(this.sv_util.is_detail_page()) {
				var rows = this.tbl.rows;
				var rowdata = rows.item(1);
				return rowdata.cells.item(1).innerText;
			} else if(this.sv_util.is_survey_page()) {
				return this.sv_util.get_survey_url();
			}
		};
		this.get_this_home_url = function(url) {
			var mt = url.match(this.pt1);
			if(mt!==null) return mt[1];
			else return null;
		};
		this.is_text_select = function() {
			if(window.getSelection().toString() !== "") return true;
			else return false;
		};
		this.is_valid_select = function(str) {
			var tt = this.get_select_text();
			if(this.pt0.test(tt)) return true;
			else return false;
		};
		this.is_validate_tech_selected = function() {
			var tt = this.get_select_text();
			if(this.pt4.test(tt)) return true;
			else return false;
		};
		this.is_other_css_selected = function() {
			var tt = this.get_select_text();
			if(this.pt5.test(tt)) return true;
			else return false;
		};
		this.get_select_text = function() {
			return window.getSelection().toString();
		};
		this.get_srcattr_text = function(str) {
			var mt = str.match(this.pt2);
			if(mt!==null) return mt[2];
			else return null;
		};
		this.browse_image = function() {
			if(!this.is_valid_select()) {
				alert("選択範囲が正しくありません");
				return;
			}
			var baseurl = this.get_this_home_url(this.get_this_url());
			var subdir = this.get_srcattr_text(this.get_select_text());
			var finalurl = baseurl + subdir;
			window.open(finalurl, "_blank");
		};
		this.browse_page = function() {
			var url = this.get_this_url();
			if(this.pt3.test(url)) {
				var burl = url.match(this.pt3)[1];
				window.open(burl, "_blank");
			}else{
				alert("エラーです。");
			}
		};
		this.validate_page = function() {
			var url = this.get_this_url();
			if(this.pt3.test(url)) {
				var burl = url.match(this.pt3)[1];
				window.open('http://validator.w3.org/check?ss=1&group=0&verbose=1&uri=' + burl, "_blank");
			}else{
				alert("エラーです。");
			}
		};
		this.import_other_css = function() {
			var tt = this.get_select_text();
			var nurl = location.href;
			var burl_home = this.pt1.test(nurl) ? nurl.match(this.pt1)[1] : "";
			var burl = burl_home + tt.match(this.pt5)[3];
			if(burl!=="") {
				window.open(burl, "_blank");
			}else{
				alert("エラーです。");
			}
		};
	}

	var util = new repoUtilClass();
	if(util.is_text_select()) {
		if(util.is_validate_tech_selected()) util.validate_page();
		else if(util.is_other_css_selected()) util.import_other_css();
		else util.browse_image();
	} else {
		util.browse_page();
	}

})();