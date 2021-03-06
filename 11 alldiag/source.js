javascript:(function() {
  var target_type = "uncomplete";
  var survey_type = "PASS";
  var mode = "";
  if(mode_check() == "first") {
    target_select_this(target_type);
    survey_select_this(survey_type);
    click_save_btn();
  } else {
    click_close_btn();
  }

  /* 画面モードチェック */
  function mode_check() {
    var tmp = null;
    var regx = new RegExp("allupd/$");
    var tmp = regx.test(location.href);
    if(tmp == false) {
      return "first";
    } else if(tmp == true) {
      return "last";
    }
  }

  /* 検査区分設定 */
  function target_select_this(key_str) {
    var d = document.getElementsByTagName("input");
    var flags = {
      "table" : "0",
      "checked" : "1",
      "uncomplete": "2"
    };
    var key_val = "";
    for(var key in flags) {
      if(key == key_str) {
        key_val = flags[key].toString();
        break;
      }
    }
    for(var i=0; i < d.length; i++) {
      var itag = d.item(i);
      var iname = itag.getAttribute("name");
      var ival = itag.getAttribute("value");
      if(iname == "target" && ival == key_val) itag.click();
    }
  }

  /* 判定結果選択 */
  function survey_select_this(key_str) {
    var s = document.getElementsByTagName("select");
    var flags = {
      "PASS" : "PASS_HC",
      "PASS2" : "PASS2",
      "NA" : "NA_HC"
    };
    var key_val = "";
    for(var key in flags) {
      if(key == key_str) {
        key_val = flags[key].toString();
        break;
      }
    }
    var nmflags = {
      "PASS_HC" : "0",
      "PASS2" : "1",
      "NA_HC" : "2"
    };
    var key_nm = 0;
    for(var key in nmflags) {
      if(key == key_val) {
        key_nm = Number(nmflags[key].toString());
        break;
      }
    }
    var ts = null;
    for(var i=0; i < s.length; i++) {
      var itag = s.item(i);
      var iname = itag.getAttribute("name");
      if(iname == "result") ts = itag;
    }
    for(var i=0; i < ts.length; i++) {
      if(ts.options[i].value == key_val) {
        ts.selectedIndex = key_nm;
        var event = document.createEvent("HTMLEvents");
        event.initEvent("change", true, false);
        ts.dispatchEvent(event);
        break;
      }
    }
  }

  /* 判定コメント挿入 */
  function insert_front_comment(str) {
    var tx = document.getElementsByTagName("textarea");
    for(var i=0; i < tx.length; i++) {
      var txtag = tx.item(i);
      var txname = txtag.getAttribute("name");
      if(txname == "comments") {
        txtag.value = str;
        break;
      }
    }
  }

  /* 保存ボタンクリック */
  function click_save_btn() {
    var d = document.getElementsByTagName("input");
    for(var i=0; i < d.length; i++) {
      var itag = d.item(i);
      var ival = itag.value;
      if(ival == "一括登録") {
        itag.click();
        break;
      }
    }
  }

  /* 閉じるボタンクリック */
  function click_close_btn() {
    var d = document.getElementsByTagName("input");
    for(var i=0; i < d.length; i++) {
      var itag = d.item(i);
      var ival = itag.value;
      if(ival == "閉じる") {
        itag.click();
        break;
      }
    }
  }
})();

