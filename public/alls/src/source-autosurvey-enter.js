javascript:(function(){
	var actName="H2_ICON_OK";

	function allDiagClass() {
		tbl = document.getElementsByTagName("table").item(2);
		flags = {
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
		}
	};

	var funcs = {

		/* aタグ内リンクアイコンを全部適合にする */
		H2_ICON_OK: function() {
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
				if(is_meti_doc_link(diag.clean_text(description)) || is_mic_doc_link(diag.clean_text(description))) {
					diag.set_survey(survey_obj, "PASS");
				}
			}
			diag.save();

			/* --- docリンク判定 --- */
			function is_meti_doc_link(str) {
				var pat = new RegExp(/(<a.+>)(.*)(<img.+)(icon_pdf|icon_link|icon_word|icon_excel|icon_maillink|icon_dl)(\.gif)(.+<\/a>)/);
				if(pat.test(str)) return true;
				else return false;
			}
			/* --- docリンク判定 --- */
			function is_mic_doc_link(str) {
				var pat = new RegExp(/(<a.+>)(.*)(<img.+)(\/000000107|\/000000011|\/000000012|\/000000013)(\.gif)(.+<\/a>)/);
				if(pat.test(str)) return true;
				else return false;
			}
		},

		/* 太字箇所がstrong要素で囲まれていない不適合 */
		NO_SEMANTIC_FAIL: function() {
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
				if(is_span_bold(diag.clean_text(description))) {
					diag.set_survey(survey_obj, "FAIL");
					diag.set_text(comment_obj, "強調を意図しているなら、セマンティックなマークアップが必要。");
					diag.set_text(srccode_obj, get_semantic_code(description));
				}
			}
			diag.save();

			/* --- strongタグ付与 --- */
			function get_semantic_code(str) {
				return '<strong>' + str + '</strong>';
			}
			/* --- span-bold 判定 --- */
			function is_span_bold(str) {
				var pat = new RegExp(/(<span)(.+font-weight.+bold.+?)(>)/);
				if(pat.test(str)) return true;
				else return false;
			}
		},

		/* IFC2001で非適用になるSPAN要素の一括非適用判定 */
		IFC2001_SPAN_NA: function() {
			var str = prompt("非適用ソースを入力");
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
				if(is_near(diag.clean_text(description))) {
					diag.set_survey(survey_obj, "NA");
				}
			}
			diag.save();

			/* --- 正規表現比較 --- */
			function is_near(src_str, test_str) {
				var pat = new RegExp(test_str);
				if(pat.test(src_str)) return true;
				else return false;
			}
		},

		/* PDFリンクが別ウィンドウで開かないので一括不適合 */
		PDF_LINK_NEW_WIN_FAIL: function() {
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
				var description = diag.get_text(comment_obj);
				if(is_pdflink(description) && diag.is_text_empty(comment_obj)) {
					diag.set_survey(survey_obj, "FAIL");
					var new_description = target_attr_del(description);
					diag.set_text(comment_obj, "別ウィンドウで開くことを説明していない\r\n【適合（注記）】サイト内のリンクは同一ウィンドウで開くことが望ましい");
					diag.set_text(srccode_obj, new_description);
				}
			}
			diag.save();

			/* --- PDFリンク判定 --- */
			function is_pdflink(str) {
				var pat = new RegExp(/(\.pdf|\.PDF)/);
				if(pat.test(str)) return true;
				else return false;
			}
			/* --- target属性撤去 --- */
			function target_attr_del(str) {
				return str.replace(/ target="_blank"/, "");
			}

		}

	};

	eval("funcs." + actName + "()");

})();