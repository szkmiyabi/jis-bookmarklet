javascript:(function() {
	var base = 'http://www.ciaj.or.jp/access/web/docs/WCAG-TECHS/';
	var sufx = '.html';
	var tech = prompt('実装番号を入力');
	var browse = '';
	if(new RegExp(/[a-zA-Z0-9]+/).test(tech)) {
		tech = tech.toUpperCase();
		browse = base + tech + sufx;
		window.open(browse, '_blank');
	} else {
		alert('入力が正しくありません');
	}
})();