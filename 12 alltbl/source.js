javascript:(function(){
  var row_nm = 2;
  var col_nm = 0;
  all_survey("PASS");
  var comment = "コントラスト比4.5:1以上を満たさないが、ロゴのため許容する";

  if(mode_check() == "first") {
    target_select_table();
    all_check_toggle();
    var td_select = get_cell_obj(row_nm, col_nm + 2);
    var td_textarea = get_cell_obj(row_nm, col_nm + 3);
    dropdown_select(td_select, "PASS2");
    insert_comments(td_textarea, comment);
  } else {
    click_close_btn();
  }

  /* 検査区分設定 */
  function target_select_table() {
    var d = document.getElementsByTagName("input");
    for(var i=0; i < d.length; i++) {
      var itag = d.item(i);
      var iname = itag.getAttribute("name");
      var ival = itag.getAttribute("value");
      if(iname == "target" && ival == "0") itag.click();
    }
  }

  /* 全選択をon/offする */
  function all_check_toggle() {
    var td = get_cell_obj(0, 0);
    td.getElementsByTagName("input").item(0).click();
  }

  /* チェックをon/offする */
  function check_toggle(obj) {
    obj.getElementsByTagName("input").item(0).click();
  }

  /* コメント挿入 */
  function insert_comments(obj, str) {
    obj.getElementsByTagName("textarea").item(0).value = str;
  }

  /* コメント削除 */
  function clear_comments(obj) {
    obj.getElementsByTagName("textarea").item(0).value = "";
  }

  /* 判定結果選択 */
  function dropdown_select(obj, key_str) {
    var ts = obj.getElementsByTagName("select").item(0);
    var flags = {
      "PASS": "PASS_HC",
      "PASS2": "PASS2",
      "FAIL": "FAIL_HC",
      "FAIL2": "FAIL2",
      "NA": "NA_HC"
    };
    var key_val = "";
    for(var key in flags) {
      if(key == key_str) {
        key_val = flags[key].toString();
        break;
      }
    }
    var nmflags = {
      "CHECK": "0",
      "PASS_HC": "1",
      "PASS2": "2",
      "FAIL_HC": "3",
      "FAIL2": "4",
      "NA_HC": "5"
    };
    var key_nm = 0;
    for(var key in nmflags) {
      if(key == key_val) {
        key_nm = Number(nmflags[key].toString());
        break;
      }
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
  
  /* 一括判定選択 */
  function all_survey(flag) {
    var tbl = document.getElementsByTagName("table").item(2);
    var tr = tbl.rows;
    for(var i=0; i< tr.length; i++) {
      if(i > 0) {
        var s = tr.item(i).cells.item(2);
        dropdown_select(s, flag);
      }
    }
  }

  /* 指定した行・列のcellオブジェクトを取得 */
  function get_cell_obj(row, col) {
    var tbl = document.getElementsByTagName("table").item(2);
    var tr = tbl.rows;
    return tr.item(row).cells.item(col);
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
})();