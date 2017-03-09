javascript:(function(){
	var vect = "down";
	var auto_save = true;
	var main_method = "heading_level_repair";
	function surveyDialogUtil() {
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
			"yes":"1",
			"no":"0",
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
			var key = cp_hash[flag];
			var rds = document.getElementsByName("copy");
			if(rds !== "undefined") {
				for(var i=0; i<rds.length; i++) {
					var val = rds[i].value;
					if(key === val) {
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
		}
	};

	function surveyPackageUtil() {
		util = new surveyDialogUtil();
	}
	surveyPackageUtil.prototype = {
		heading_level_repair: function(flag, vect, auto_save) {
			var html = "";
			util.set_survey(flag);
			var src = util.get_description();
			src = util.text_clean(src);
			var pt = new RegExp(/(<)(..)(.*)(>)(.*)(<\/.*>$)/);
			var mt = src.match(pt);
			var nm = mt[2].toLowerCase();
			nm = nm.replace("h", "");
			nm = Number(nm);

			if(vect === "down") nm++;
			else if(vect === "up") nm--;
			if(nm < 1 || nm > 6) {
				alert("これ以上小さくまたは大きくできません");
			} else {
				html = "<h" + nm + mt[3] + mt[4] + mt[5] + "</h" + nm + ">";
				util.set_comment("文書構造上、この見出しはh" + nm + "要素にすべき");
				util.set_srccode(html);
			}
			if(auto_save) util.save();
		},
		update_copy: function(auto_save) {
			var src = prompt("確認用検査結果画面から行コピーしたデータを貼り付けてください");
			if(src === "") return;
			var tsv = src.split("\t");
			var survey = "FAIL";
			var comment = "セクション冒頭に見出し要素が設置されていない";
			var description = tsv[5];
			var srccode = tsv[6];
			util.set_survey(survey);
			util.set_comment(comment);
			util.set_description(description);
			util.set_srccode(srccode);
			if(auto_save) util.save();
		}
	};

	var pkg = new surveyPackageUtil();
	switch(main_method) {
		case "heading_level_repair":
			eval('pkg.' + main_method + '("PASS2", vect, true);');
			break;
		case "update_copy":
			eval('pkg.' + main_method + '(true);');
			break;
	}

})();