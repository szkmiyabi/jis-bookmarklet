javascript:(function(d) {
    function l() {
        (function($) {
            var rid = 'ALL_link_check';
            if (document.getElementById(rid))
                return;
            function e(t) {
                return document.getElementsByTagName(t);
            }
            function a(o, a) {
                return o.getAttribute(a);
            }
            anchors = document.getElementsByTagName('a');
            if (anchors.length <= 0)
                return;
            var r = document.createElement('div');
            var rcss = 'padding:5px;position:absolute;top:0;left:0;background:#fff;border:solid #ccc 1px;z-index:2999;';
            var tblcss = ' style=\'border-collapse:collapse;background:#fff;\'';
            var tdlcss = ' style=\'padding:4px;border-bottom:solid #ffffff 2px;text-align:right;\'';
            var tdrcss = ' style=\'padding:4px;border-bottom:solid #ffffff 2px;text-align:left;\'';
            r.id = rid;
            r.style.cssText = rcss;
            var h = '<table' + tblcss + '>';
            h += '<tr><td colspan=\'2\' style=\'text-align:center;\'><span id=\'checkinglink\'>Checking link existence....</span></td></tr>';
            for (var j = 0; j < anchors.length; j++) {
                h += (j % 2 == 0) ? '<tr bgcolor=#cccccc>' : '<tr bgcolor=#f9f9f9>';
                h += '<td' + tdlcss + '>' + anchors[j].innerHTML + '</td><td' + tdrcss + '><span id=\'existcheck' + j + '\'>' + a(anchors[j], 'href') + '</span></td></tr>';
            }
            h += '</table>';
            e('body')[0].appendChild(r);
            r.innerHTML = h;
            r.onclick = function() {
                this.parentNode.removeChild(this);
            };
            window.scrollTo(0, 0);
            function checkurl(id, geturl, maxcnt) {
                $.post(geturl, {value: 1}, function(data) {
                }).fail(function(error) {
                    if (error.status == 404) {
                        $('#existcheck' + id).css('background-color', '#ff0000');
                    } else {
                        $('#existcheck' + id).css('background-color', '#0000ff');
                    }
                }).always(function() {
                    if (geturl == '#') {
                        $('#existcheck' + id).css('background-color', '#ff0000');
                    }
                    if (!geturl) {
                        $('#existcheck' + id).css('background-color', '#ff0000');
                    }
                    if (id == maxcnt - 1) {
                        $('#checkinglink').html('Done!!');
                    }
                });
            }
            var maxcnt = anchors.length;
            for (var j = 0; j < maxcnt; j++) {
                var geturl = a(anchors[j], 'href');
                checkurl(j, geturl, maxcnt);
            }
        })(jQuery)
    }
    if (typeof jQuery == 'undefined') {
        var j = d.createElement('script');
        j.type = 'text/javascript';
        j.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js';
        d.body.appendChild(j);
        j.onload = l
    } else {
        l()
    }
})(document);