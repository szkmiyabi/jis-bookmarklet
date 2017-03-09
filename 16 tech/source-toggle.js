//指定した実装番号でトグル
javascript:(function(){
	var techs="G94,H30,IFC2016";
	var techarr = new Array();
	techarr = techs.split(",");
	var ddlarr = new Array();
	ddlarr = create_ddl_arr();
	var sto = window.localStorage;
	var nowtech = sto.getItem("nowtech");
	if(nowtech == false || nowtech === undefined || nowtech === "") {
		nowtech = techarr[0].toString();
		sto.setItem("nowtech", nowtech);
	} else {
		if(!is_found_tech(nowtech, ddlarr)){
			sto.removeItem("nowtech");
			nowtech = techarr[0].toString();
			sto.setItem("nowtech", nowtech);
		}
	}
	var tar_opt_num = get_arr_num(nowtech, ddlarr);
	var gds = document.getElementById("techList");
	gds.selectedIndex = tar_opt_num;
	var event = document.createEvent("HTMLEvents");
	event.initEvent("change", true, false);
	gds.dispatchEvent(event);
	cr_num = get_arr_num(nowtech, techarr);
	cr_num++;
	var nexttech = get_arr_val(cr_num, techarr);
	sto.setItem("nowtech", nexttech);
	if(cr_num > (techarr.length-1)) {
		cr_num = 0;
		nowtech = techarr[0].toString();
		sto.setItem("nowtech", nowtech);
	}
	function get_arr_val(n, arr) {
		for(var i=0; i<arr.length; i++) {
			if(i == n)  {
				return arr[i].toString();
			}
		}
		return arr[0].toString();
	}
	function get_arr_num(str, arr) {
		for(var i=0; i<arr.length; i++) {
			if(str == arr[i].toString())  {
				return i;
			}
		}
		return 0;
	}
	function create_ddl_arr(){
		var ret = new Array();
		var ddls = document.getElementById("techList");
		for(var i=0; i<ddls.options.length; i++) {
			var v = ddls.options[i].value;
			ret.push(v);
		}
		return ret;
	}
	function is_found_tech(str, arr) {
		var ret = false;
		for(var i=0; i<arr.length; i++) {
			if(arr[i].toString() === str) {
				ret = true;
				break;
			}
		}
		return ret;
	}
})();