javascript:(function(){
	var type="next-uncomp";

	function techDropdownUtil(){
		this.tech = document.getElementById("techList");
		this.min = 0;
		this.max = this.tech.options.length;
		this.idx = this.tech.selectedIndex;
		this.pat = new RegExp(/【完】.+/);

		this.select_next = function(){
			this.idx++;
			if(!this.is_max_ov(this.idx)) {
				this.tech.selectedIndex = this.idx;
				this.event_ignite(this.tech);
			} else {
				alert("これ以上進めません！");
			}
		};

		this.select_next_uncomp = function() {
			this.idx++;
			if(!this.is_max_ov(this.idx)){
				var row = this.tech.options[this.idx].text;
				if(this.pat.test(row)) {
					this.select_next_uncomp();
				}
				this.tech.selectedIndex = this.idx;
				this.event_ignite(this.tech);
			} else {
				alert("これ以上進めません！");
			}
		};

		this.select_prev = function(){
			this.idx--;
			if(!this.is_min_ov(this.idx)) {
				this.tech.selectedIndex = this.idx;
				this.event_ignite(this.tech);
			} else {
				alert("これ以上戻れません！");
			}
		};

		this.select_prev_uncomp = function() {
			this.idx--;
			if(!this.is_min_ov(this.idx)){
				var row = this.tech.options[this.idx].text;
				if(this.pat.test(row)) {
					this.select_prev_uncomp();
				}
				this.tech.selectedIndex = this.idx;
				this.event_ignite(this.tech);
			} else {
				alert("これ以上戻れません！");
			}
		};

		this.select_top = function() {
			this.tech.selectedIndex = 1;
			this.event_ignite(this.tech);
		};

		this.select_top_uncomp = function() {
			for(var i=0; i<this.tech.options.length; i++) {
				if(i == 0) continue;
				if(i == this.idx) continue;
				var row = this.tech.options[i].text;
				if(!this.pat.test(row)) {
					this.tech.selectedIndex = i;
					this.event_ignite(this.tech);
					break;
				}
			}
		};

		this.select_bottom = function() {
			this.tech.selectedIndex = (this.max - 1);
			this.event_ignite(this.tech);
		};

		this.event_ignite = function(obj) {
				var event = document.createEvent("HTMLEvents");
				event.initEvent("change", true, false);
				obj.dispatchEvent(event);
		};

		this.is_max_ov = function(num){
			if(num >= this.max) {
				return true;
			} else {
				return false;
			}
		};

		this.is_min_ov = function(num){
			if(num <= this.min) {
				return true;
			} else {
				return false;
			}
		};
	}

	var diag = new techDropdownUtil();
	switch(type) {
		case "next":
			diag.select_next();
			break;
		case "next-uncomp":
			diag.select_next_uncomp();
			break;
		case "prev":
			diag.select_prev();
			break;
		case "prev-uncomp":
			diag.select_prev_uncomp();
			break;
		case "top-uncomp":
			diag.select_top_uncomp();
			break;
		case "top":
			diag.select_top();
			break;
		case "bottom":
			diag.select_bottom();
			break;
	}

})();