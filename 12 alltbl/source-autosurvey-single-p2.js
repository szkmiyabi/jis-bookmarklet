javascript:(function(){

	var actName="";

	function allDiagClass() {
		tbl = document.getElementsByTagName("table").item(2);
		flags = {
			"CHECK": "CHECK",
			"PASS": "PASS_HC",
			"PASS2": "PASS2",
			"FAIL": "FAIL_HC",
			"FAIL2": "FAIL2",
			"NA": "NA_HC"
		};
		nmflags = {
			"CHECK": "0",
			"PASS_HC": "1",
			"PASS2": "2",
			"FAIL_HC": "3",
			"FAIL2": "4",
			"NA_HC": "5"
		};
	}
	allDiagClass.prototype = {
		init_datas: function() {
			return tbl.rows;
		},
		survey_obj: function(row_obj) {
			return row_obj.cells.item(2);
		},
		comment_obj: function(row_obj) {
			return row_obj.cells.item(3);
		},
		description_obj: function(row_obj) {
			return row_obj.cells.item(4);
		},
		srccode_obj: function(row_obj) {
			return row_obj.cells.item(5);
		},
		get_text: function(obj) {
			return obj.getElementsByTagName("textarea").item(0).value;
		},
		set_text: function(obj, str) {
			obj.getElementsByTagName("textarea").item(0).value = str;
		},
		clear_text: function(obj) {
			obj.getElementsByTagName("textarea").item(0).value = "";
		},
		set_survey: function(obj, flag) {
			var ts = obj.getElementsByTagName("select").item(0);
			var key_val = "";
			for(var key in flags) {
				if(key == flag) {
					key_val = flags[key];
					break;
				}
			}
			var key_nm = 0;
			for(var key in nmflags) {
				if(key == key_val) {
					key_nm = Number(nmflags[key]);
					break;
				}
			}
			for(var i=0; i<ts.length; i++) {
				if(ts.options[i].value == key_val) {
					ts.selectedIndex = key_nm;
					var event = document.createEvent("HTMLEvents");
					event.initEvent("change", true, false);
					ts.dispatchEvent(event);
					break;
				}
			}
		},
		get_survey: function(obj) {
			var ts = obj.getElementsByTagName("select").item(0);
			var idx = ts.selectedIndex + "";
			var primary_key = "";
			var secondary_key = "";
			for(var key in nmflags) {
				var val = nmflags[key] + "";
				if(idx === val) {
					primary_key = key;
					break;
				}
			}
			for(var key in flags) {
				var val = flags[key];
				if(primary_key === val) {
					secondary_key = key;
					break;
				}
			}
			return secondary_key;

		},
		is_text_empty: function(obj) {
			var ta = obj.getElementsByTagName("textarea").item(0);
			if(ta.value === "" || ta.value === null) return true;
			else return false;
		},
		save: function () {
			var d = document.getElementsByTagName("input");
			for(var i=0; i < d.length; i++) {
				var itag = d.item(i);
				var ival = itag.value;
				if(ival == "一括登録") {
					itag.click();
				break;
				}
			}
		},
		clean_text: function(str) {
			str = str.replace(/^ +/mg, "");
			str = str.replace(/(\r\n|\n)/mg, "");
			str = str.replace(/\t/mg, "");
			return str;
		},
		get_current_tech: function() {
			var tech = "";
			var tbl = document.getElementsByTagName("table").item(0);
			var trs = tbl.rows;
			var tr = trs.item(0);
			var td = tr.cells.item(5);
			tech = td.textContent;
			return tech;
		}
	};

	var funcs = {

		/* PDFリンクが別ウィンドウで開かないので一括不適合 */
		IFC1015_NA: function() {
			var diag = new allDiagClass();
			var arr = diag.init_datas();
			for(var i=0; i<arr.length; i++) {
				if(i == 0) continue;
				var row = arr.item(i);
				var survey_obj = diag.survey_obj(row);
				var comment_obj = diag.comment_obj(row);
				var description_obj = diag.description_obj(row);
				var srccode_obj = diag.srccode_obj(row);
				/* --- main処理 --- */
				var description = diag.get_text(description_obj);
				if(is_mic_doc_link(diag.clean_text(description)) && is_mic_doc_same_alt(diag.clean_text(description))) {
					diag.set_survey(survey_obj, "NA");
					var new_srccode = alt_attr_empty(description);
					diag.set_text(comment_obj, "直前のリンクテキストがリンクアイコンのalt属性値と重複する。");
					diag.set_text(srccode_obj, new_srccode);
				}
			}
			diag.save();

			/* --- docリンク判定 --- */
			function is_mic_doc_link(str) {
				var pat = new RegExp(/(<a.+>)(.*)(<img.+)(\/000000107|\/000000011|\/000000012|\/000000013)(\.gif)(.+<\/a>)/);
				if(pat.test(str)) return true;
				else return false;
			}
			/* --- target属性撤去 --- */
			function alt_attr_empty(str) {
				return str.replace(/alt=".*?"/, 'alt=""');
			}
			function is_mic_doc_same_alt(str) {
				var pat = new RegExp(/(<a.+?>)(PDF|EXCEL|WORD|Excel|Word|xls)(<img.+?>)(.*<\/a>)/);
				if(pat.test(str)) return true;
				else return false;
			}

		}
	};

	/* --- 実装番号を検出し、実行メソッドを制御 --- */
	var arg_flag = false;
	var diag = new allDiagClass();
	var tech = diag.get_current_tech();
	switch(tech) {
		case "IFC1015":
			actName = "IFC1015_NA";
			break;
	}

	if(arg_flag) eval("funcs." + actName);
	else eval("funcs." + actName + "()");

})();