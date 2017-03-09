javascript:(function() {
	var str = document.getElementById("memo_ctrl").value;
	str = str.replace(/<dl.+?>/mg, "<tr>");
	str = str.replace(/<\/dl>/mg, "</tr>");
	str = str.replace(/<dt.*?>/mg, '<th scope="row">');
	str = str.replace(/<\/dt>/mg, "</th>");
	str = str.replace(/<dd.*?>/mg, "<td>");
	str = str.replace(/<\/dd>/mg, "</td>");
	str = "<table>\n" + str + "\n</table>";
	document.getElementById("memo_ctrl").value=str;
})();

