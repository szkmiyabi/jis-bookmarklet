//事前検査の一連操作パック
javascript:(function() {
	var url = location.href;
	if(new RegExp(/diagnose\/indexv2\/index\/projID/).test(url)) {
		click_prediag();
	} else if(new RegExp(/diagnose\/indexv2\/openprediag\/projID/).test(url)) {
		if(is_radio_checked()) {
			click_prediag_save();
		} else {
			pre_survey();
		}
	}
	function click_prediag() {
		var parent = document.getElementById("preDiag");
		var btn = parent.getElementsByTagName("button").item(0);
		btn.click();
	}
	function click_prediag_save() {
		document.getElementById("entry").click();
	}
	function is_radio_checked() {
		var inp = document.getElementsByTagName("input");
		var cnt = 0;
		for(var i=0; i<inp.length; i++) {
			if(i == 0) continue;
			if(inp.item(i).checked) {
				cnt++;
			}
		}
		if(cnt < 1) {
			return false;
		} else {
			return true;
		}
	}
	function pre_survey() {
		/*問1.キーボード（Tabキー）でコンテンツ移動、フォーカスしただけで状況が変化するコンテンツがありますか？*/
		document.getElementsByName("16")[1].checked=true;
		/*問2.ページタイトルは適切ですか？*/
		document.getElementsByName("17")[0].checked=true;
		/*問3.言語属性は正しく設定されていますか？*/
		document.getElementsByName("18")[0].checked=true;
		/*問4.形、大きさ、位置、方向、又は音など、感覚的な特徴で情報を伝えているものはありますか？*/
		document.getElementsByName("19")[1].checked=true;
		/*問5.上下階層のページと比較して、サイト全体のナビゲーション位置が統一していますか？*/
		document.getElementsByName("20")[0].checked=true;
		/*問6.上下階層のページと比較して、ダウンロードアイコン、印刷アイコン、保存アイコンなどがサイトで統一（代替えテキスト）していますか？*/
		document.getElementsByName("21")[0].checked=true;
		/*問7.利用者にとって法的義務または金銭的な取引が生じるデータのやり取りを行うページですか？*/
		document.getElementsByName("22")[1].checked=true;
		/*問8.W3Cバリデータ等のツールを使用してHTML構文のチェックを行って下さい。その結果、問題は検知されましたか？*/
		document.getElementsByName("23")[0].checked=true;
		/*問9.リニアライズ（線形化）したときに、コンテンツは意味のある順序となっていますか？*/
		document.getElementsByName("24")[0].checked=true;
		/*問10.簡潔な代替えテキストに加え、長い説明が必要な非テキストコンテンツ（例えば、グラフやチャートなど）はありますか?*/
		document.getElementsByName("2")[0].checked=true;
		/*問11.ライブカメラの映像コンテンツを含んでいますか？*/
		document.getElementsByName("6")[1].checked=true;
		/*問12.実況による音声コンテンツを含んでいますか？*/
		document.getElementsByName("7")[1].checked=true;
		/*問13.画像のスライドショーやアニメーションGIFを含んでいますか？*/
		document.getElementsByName("5")[1].checked=true;
		/*問14.再生用の動画コンテンツを含んでいますか？*/
		document.getElementsByName("8")[1].checked=true;
		/*問15.再生用の音声コンテンツまたは自動再生のBGM音声を含んでいますか？*/
		document.getElementsByName("9")[1].checked=true;
		/*問16.スクロール・点滅・移動などをする情報を含んでいますか？*/
		document.getElementsByName("10")[1].checked=true;
		/*問17.時間の経過によってページが自動更新されたり、アラートが表示される、または制限時間付きのコンテンツを含んでいますか？*/
		document.getElementsByName("11")[1].checked=true;
		/*問18.検索キーワード入力欄（フィールド）を含んでいますか？*/
		document.getElementsByName("12")[0].checked=true;
		/*問19.テキスト入力フィールド(お問合せ登録・ログイン認証・申し込みなど)やラジオボタン、チェックボックス、またはセレクトリストなどの選択要素を含んでいますか？*/
		document.getElementsByName("13")[1].checked=true;
		/*問20.ユーザ登録時などに使用される、正しい回答を記入するためのCAPTCHAテストを含んでいますか？*/
		document.getElementsByName("14")[1].checked=true;
		/*問21.コンテンツがテキスト（非HTML）だけのページですか？*/
		document.getElementsByName("25")[1].checked=true;
	}
})();

