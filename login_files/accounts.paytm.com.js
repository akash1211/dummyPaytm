/* Copyright 2011-2017 HeatMap Inc. - All rights reserved */
heatmap_ext = window.heatmap_ext || {};

if (!heatmap_ext.isActive) heatmap_ext.isActive = function(elt) {
	return heatmap_ext.paytmURL(elt,false);
};

if (!heatmap_ext.getURL) heatmap_ext.getURL = function(elt) {
	return heatmap_ext.paytmURL(elt,true);
};

if (!heatmap_ext.paytmURL) heatmap_ext.paytmURL = function(elt,url) {
	var t = elt.tagName,
		lz = elt.getAttribute('afkl-lazy-image') || '';
	if (t=='DIV' && lz) {
		var p = elt.parentNode, i = 0;
		while (p && i<3) {
			if (p.tagName=='A' && p.href) return url ? p.href : true;
			p = p.parentNode; i++;
		}
	} else if (t=='IMG') {
		var a = elt.parentNode;
		if (a.tagName=='A' && a.href) return url ? a.href : true;
	}
};

if (!heatmap_ext.cleanupURL) heatmap_ext.cleanupURL = function(url) {
	if ((/performOperation/i).test(url)) {
		var l = location, orig = l.protocol+'//'+location.host;
		return orig+url.replace(/.*\('(.*)'\)/,'$1');
	}
};

(function(){
	heatmap.log.origURL = heatmap.log.url;
	heatmap.log.url = function(o) {
		var _ = this, u = '', ot = o.tagName;
		if (ot=='A' && o.href) {
			// detects links that are activated by libs (href="#") // using getAttribute is the easiest way to get the href as set in the html
			var ahref = _.attr(o,'href') || o.href;
			if ((ahref==='#' || ahref==='') && _.getLibEvent(o)) {
				return _.getLibEvent(o,true);
			} else {
				return _.clean(o.href);
			}
		}
		var clk = _.fn2str(o,'click');
		if (clk) {
			clk = _.clean(clk);
			if (/(hidedropdowninplansmodel|selectnewplan|proceed|hideleftsubcat|populatedata|frequentordercheckout|openplans)/i.test(clk)) return clk;
		}
		return heatmap.log.origURL(o);
	};
})();
heatmap.log.start(14852,"eu7",1494414153);
