javascript:(function(){
	var comment = "同じリンク先の隣り合うa要素は、単一のa要素で記述する";
	var cmm = document.getElementById("comments");
	if(comment!=="") cmm.value = comment;
	var dsc = document.getElementById("description");
	var scc = document.getElementById("srccode");
	scc.value = dsc.value;

	var text = scc.value;
	var pat = new RegExp(/(<a .+?>)(.+?)(<\/a>)/mg);
	var arr = text.match(pat);
	var astart = "";
	var aend = "";
	var firstcont = "";
	var secondcont = "";
	if(arr.length == 2) {
		var line1 = arr[0];
		var line2 = arr[1];
		var pat2 = new RegExp(/(<a .+?>)(.+?)(<\/a>)/);
		astart = line1.match(pat2)[1];
		aend = line1.match(pat2)[3];
		firstcont = line1.match(pat2)[2];
		secondcont = line2.match(pat2)[2];
	}

	if(is_img(firstcont)) firstcont = alt_empty(firstcont);
	if(is_img(secondcont)) firstcont = alt_empty(secondcont);

	text = astart + firstcont + secondcont + aend;
	scc.value = text;

	function is_img(str) {
		if(new RegExp(/<img.+?>/).test(str)) return true;
		else return false;
	}
	function alt_empty(img_str) {
		var pat=new RegExp(/alt=".+?"/);
		var ret = img_str.replace(pat, 'alt=""');
		return ret;
	}
})();
