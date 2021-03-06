//事前検証自動入力
javascript:(function(){
	/*survey_level*/
	var type = "AA";
	/* A Hash */
	var single_A_hash = {
		/*問1 キーボードでコンテンツ移動しただけで状況が変化するか*/
		"16" : "いいえ",
		/*問2 ページタイトルは？*/
		"17" : "はい",
		/*問3 言語属性は？*/
		"18" : "はい",
		/*問4 形、大きさ、位置、方向など、感覚的な特徴で情報を？*/
		"19" : "いいえ",
		/*問5 W3Cバリデータの結果問題があった？*/
		"23" : "はい",
		/*問6 リニアラズすると順序は適切ですか？*/
		"24" : "はい",
		/*問7 グラフやチャートはありますか？*/
		"2" : "はい",
		/*問8 ライブカメラの映像コンテンツを含んでいますか？*/
		"6" : "いいえ",
		/*問9 実況による音声コンテンツを含んでいますか？*/
		"7" : "いいえ",
		/*問10 画像のスライドショーやアニメーションGIFを含んでいますか？*/
		"5" : "いいえ",
		/*問11 再生用の動画コンテンツを含んでいますか？*/
		"8" : "いいえ",
		/*問12 再生用の音声コンテンツまたは自動再生のBGM音声を含んでいますか？*/
		"9" : "いいえ",
		/*問13 スクロール・点滅・移動などをする情報を含んでいますか？*/
		"10" : "いいえ",
		/*問14 時間の経過によって自動更新されるページですか？*/
		"11" : "いいえ",
		/*問15 検索キーワード入力欄を含んでいますか？*/
		"12" : "はい",
		/*問16 お問い合わせ登録・ログイン認証などのフォームページですか？*/
		"13" : "いいえ",
		/*問17 CAPTCHAテストを含んでいますか？*/
		"14" : "いいえ",
		/*問18 テキストだけのページですか？*/
		"25" : "いいえ"
	};
	/* AA Hash */
	var double_A_hash = {
		/*問1 キーボードでコンテンツ移動しただけで状況が変化するか*/
		"16" : "いいえ",
		/*問2 ページタイトルは？*/
		"17" : "はい",
		/*問3 言語属性は？*/
		"18" : "はい",
		/*問4 形、大きさ、位置、方向など、感覚的な特徴で情報を？
		*/"19" : "いいえ",
		/*問5 ナビゲーション位置は統一されていますか？*/
		"20" : "はい",
		/*問6 ダウンロードアイコン、印刷アイコンなどが統一されていますか？*/
		"21" : "はい",
		/*問7 金銭的な取引が生じるページですか？*/
		"22" : "いいえ",
		/*問8 W3Cバリデータの結果問題があった？*/
		"23" : "はい",
		/*問9 リニアラズすると順序は適切ですか？*/
		"24" : "はい",
		/*問10 グラフやチャートはありますか？*/
		"2" : "はい",
		/*問11 ライブカメラの映像コンテンツを含んでいますか？*/
		"6" : "いいえ",
		/*問12 実況による音声コンテンツを含んでいますか？*/
		"7" : "いいえ",
		/*問13 画像のスライドショーやアニメーションGIFを含んでいますか？*/
		"5" : "いいえ",
		/*問14 再生用の動画コンテンツを含んでいますか？*/
		"8" : "いいえ",
		/*問15 再生用の音声コンテンツまたは自動再生のBGM音声を含んでいますか？*/
		"9" : "いいえ",
		/*問16 スクロール・点滅・移動などをする情報を含んでいますか？*/
		"10" : "いいえ",
		/*問17 時間の経過によって自動更新されるページですか？*/
		"11" : "いいえ",
		/*問18 検索キーワード入力欄を含んでいますか？*/
		"12" : "はい",
		/*問19 お問い合わせ登録・ログイン認証などのフォームページですか？*/
		"13" : "いいえ",
		/*問20 CAPTCHAテストを含んでいますか？*/
		"14" : "いいえ",
		/*問21 テキストだけのページですか？*/
		"25": "いいえ"
	};
	var hash = {};
	if(type == "A") {
		hash = hash_clone(single_A_hash);
	} else if(type == "AA") {
		hash = hash_clone(double_A_hash);
	}
	for(var key in hash) {
		var cv = hash[key].toString();
		if(cv == "はい") {
			document.getElementsByName("" + key + "")[0].checked=true;
		} else if(cv == "いいえ") {
			document.getElementsByName("" + key + "")[1].checked=true;
		}
	}
	/* Hash Copy */
	function hash_clone(src) {
		var dst = {};
		for(var k in src) {
			dst[k] = src[k];
		}
		return dst;
	}
})();