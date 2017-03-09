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
				var pat = new RegExp(/(<a.+>)(.*)(<img.+)(icon_pdf|icon_link|icon_word|icon_excel|icon_maillink|icon_dl|icon_powerpoint|icon_ichitaro)(\.gif)(.+<\/a>)/);
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

		/* IFC2001で非適用になるSPAN要素の一括非適用、STRONG要素の一括適合判定 */
		IFC2001_SPAN_NA_STRONG_PASS: function() {
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
				if(!is_strong(diag.clean_text(description))) {
					diag.set_survey(survey_obj, "NA");
				} else {
					diag.set_survey(survey_obj, "PASS");
				}
			}
			diag.save();

			/* --- 正規表現比較 --- */
			function is_strong(test_str) {
				var pat = new RegExp(/^<strong.+>/);
				if(pat.test(test_str)) return true;
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
				var description = diag.get_text(description_obj);
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

		},

		/* jqueryを非適用、myscriptを適合(注記) */
		JQ_NA_MJS_PASS2: function() {
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
				if(isJQ(description)) {
					diag.set_survey(survey_obj, "NA");
				} else if(!isJQ(description) && isMJS(description)) {
					diag.set_survey(survey_obj, "PASS2");
					diag.set_text(comment_obj, ".innerHTMLを用いている。ページロード時にサイト内検索フォームを動的挿入しているだけなので【適合（注記）】。可能ならば、createDocument、appendChildなどのDOMに基づくメソッドを使用して挿入する。");
				}
			}
			diag.save();

			/* --- jQuery判定 --- */
			function isJQ(str) {
				var pat = new RegExp(/jquery/);
				if(pat.test(str)) return true;
				else return false;
			}
			function isMJS(str) {
				var pat = new RegExp(/msearch\.js/);
				if(pat.test(str)) return true;
				else return false;
			}
		},

		/* IFC1025 自動検査 */
		IFC1025_SRV: function() {
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
				var survey = diag.get_survey(survey_obj);
				var description = diag.get_text(description_obj);
				if(survey !== "CHECK") {
					continue;
				}
				if(description === "" || description === null) {
					diag.set_survey(survey_obj, "NA");
				} else if(isOKLINK(description)) {
					diag.set_survey(survey_obj, "PASS");
				} else if(isOK2LINK(description)) {
					diag.set_survey(survey_obj, "PASS2");
					diag.set_text(comment_obj, "【適合（注記）】pxによる指定がある、ただしG142適合により1.4.4は満たしている");
				} else if(isNOTLINK(diag.clean_text(description))) {
					if(isNASTYLE(diag.clean_text(description))) {
						diag.set_survey(survey_obj, "NA");
					}
				}
			}
			diag.save();

			function isOKLINK(str) {
				var pat = new RegExp(/(\/main_content\/new_base|\/main_content\/base|\/css\/index2014|\/css\/base2014|\/css_org2011\/layout|publication|\/css\/overwrite2011)(\.css)/);
				if(pat.test(str)) return true;
				else return false;
			}
			function isOK2LINK(str) {
				var pat = new RegExp(/(print\.css|jquery|\/css_org2011\/base\.css)/);
				if(pat.test(str)) return true;
				else return false;
			}
			function isNOTLINK(str) {
				var pat = new RegExp(/<link .+>/);
				if(pat.test(str)) return false;
				else return true;
			}
			function isNASTYLE(str) {
				var pat = new RegExp(/font-size/);
				if(pat.test(str)) return false;
				else return true;
			}
		},

		/* 短いテキストリンク非適用 */
		SHORT_TXT_LINK_SRV: function(flag) {
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
				var link_conn = get_a_content(diag.clean_text(description));
				if(is_short_text_link(link_conn)) {
					if(flag === "na") diag.set_survey(survey_obj, "NA");
					else diag.set_survey(survey_obj, "PASS");
				}
			}
			diag.save();

			/* --- リンク内容取得 --- */
			function get_a_content(str) {
				var con = "";
				var pat = new RegExp(/(<a.+?>)(.+)(<\/a>)/);
				if(pat.test(str)) {
					var mt = str.match(pat);
					con = mt[2];
				}
				return con;
			}
			/* --- ショートリンク判定 --- */
			function is_short_text_link(str) {
				var pat = new RegExp(/(^もっと見る$|^[0-9０-９]+月$|^前のページに戻る$|^Directions$|^Data.*$|^Excel\/[0-9,]+KB$|^zip\/[0-9,]+KB$|^Outline$|^PDF\/[0-9,]+KB$)/);
				if(pat.test(str)) return true;
				else return false;
			}

		},

		/* altを空にすべき画像を不適合 */
		ALT_EMPTY_FAIL: function(flag) {
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
				var srccode = diag.get_text(srccode_obj);
				if(is_need_alt_empty(description)) {
					diag.set_survey(survey_obj, "FAIL");
					diag.set_text(comment_obj, "この画像はalt属性を空にすべき");
					diag.set_text(srccode_obj, get_alt_empty_text(srccode));
				}
			}
			diag.save();

			/* --- 対象画像判定 --- */
			function is_need_alt_empty(str) {
				var pat = new RegExp(/\/main_sosiki\/daijinkanbou\/sensai\/virtual\//);
				if(pat.test(str)) return true;
				else return false;
			}

			function get_alt_empty_text(str) {
				var pat = new RegExp(/(alt=")(.+?)(")/);
				return str.replace(pat, 'alt=""');
			}
		},

		/* イレギュラーコメントで非適用 */
		COMM_EDIT_NA: function(flag) {
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
				diag.set_survey(survey_obj, "NA");
				diag.set_text(comment_obj, "HC参照");
				diag.set_text(description_obj, "");
				diag.set_text(srccode_obj, "");
			}
			diag.save();

			/* --- 対象画像判定 --- */
			function is_need_alt_empty(str) {
				var pat = new RegExp(/\/main_sosiki\/daijinkanbou\/sensai\/virtual\//);
				if(pat.test(str)) return true;
				else return false;
			}

			function get_alt_empty_text(str) {
				var pat = new RegExp(/(alt=")(.+?)(")/);
				return str.replace(pat, 'alt=""');
			}
		}
	};

	/* --- 実装番号を検出し、実行メソッドを制御 --- */
	var arg_flag = false;
	var diag = new allDiagClass();
	var tech = diag.get_current_tech();
	switch(tech) {
		case "H2":
			actName = "H2_ICON_OK";
			break;
		case "IFC2001":
			//actName = "IFC2001_SPAN_NA_STRONG_PASS";
			actName = "COMM_EDIT_NA";
			break;
		case "SCR21":
			actName = "JQ_NA_MJS_PASS2";
			break;
		case "IFC1025":
			actName = "IFC1025_SRV";
			break;
		case "IFC1015":
			arg_flag = true;
			actName = "SHORT_TXT_LINK_SRV('na')";
			break;
		case "G53":
			arg_flag = true;
			actName = "SHORT_TXT_LINK_SRV('ok')";
			break;
		case "G94":
			actName = "ALT_EMPTY_FAIL";
			break;
	}

	if(arg_flag) eval("funcs." + actName);
	else eval("funcs." + actName + "()");

})();