/* 確認用検査結果を表示 */
javascript:(function(){
	function reportUtil() {
		url = window.location.href;
		base_origin = "https://jis.infocreate.co.jp/diagnose/indexv2/report/projID/";
	}
	reportUtil.prototype = {
		is_text_select: function() {
			if(window.getSelection().toString() !== "") return true;
			else return false;
		},
		is_valid_select: function(str) {
			var pat = new RegExp(/^[0-9]+/);
			var tt = this.get_select_text();
			if(pat.test(tt)) return true;
			else return false;
		},
		get_select_text: function() {
			return window.getSelection().toString();
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
		is_top_page: function() {
			var pat = new RegExp(/https:\/\/jis\.infocreate\.co\.jp[^.]/);
			if(pat.test(url)) return true;
			else return false;
		},
		browse_report_from_survey_page: function() {
			var pat = new RegExp(/projID\/([0-9]+)/);
			if(pat.test(url)) {
				var mt = url.match(pat);
				var new_url = base_origin + mt[1].toString();
				window.open(new_url, "_blank");
			} else {
				return;
			}
		},
		browse_report_from_selection: function() {
			if(!this.is_text_select()) {
				alert('プロジェクトIDが選択されていません！');
				return;
			}
			if(!this.is_valid_select()) {
				alert('範囲選択が正しくありません！');
				return;
			}
			var new_url = base_origin + this.get_select_text().trim();
			window.open(new_url, "_blank");
		},
		browse_report_from_prompt: function() {
			var src = prompt("プロジェクト番号を入力してください").trim();
			if(!new RegExp(/^[0-9]+/).test(src)) {
				alert('プロジェクト番号が正しくありません！');
				return;
			}
			var new_url = base_origin + src;
			window.open(new_url, "_blank");
		}
	};

	var util = new reportUtil();
	if(util.is_top_page())util.browse_report_from_selection();
	else if(util.is_survey_page()) util.browse_report_from_survey_page();
	else util.browse_report_from_prompt();

})();