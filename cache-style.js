/**
 * 
 * @param url 文件url
 * @param callback(timeOfLoadStyle, url)
 * @param isJs true：url为js链接，否则为css链接
 * @param once true：只执行一次，否则会再参试从cache获取文件，并计算耗用的时间
 * example:
 * 	cacheStyle('http://style.aliunicorn.com/js/6v/atom/??atom-ws.js?t=6e7ef7c9_9c63269d7', 
 * 		function(timeOfLoadStyle, url) {
 * 		if (timeOfLoadStyle < 1000) {//如果从缓存加载文件的时间小于1秒，表示文件已存在浏览器缓存，可以使用了
 * 			$.getScript(url);
 * 		}
 * 	});
 */

;(function(global) {
	function cacheStyle(url, callback, isJs, once) {
		if (typeof callback == 'boolean') {
			var temp = callback;
			callback = isJs;
			isJs = temp;
		}
		
		var iframe = document.createElement('iframe');
		var fn = '_loadStyles_' + new Date().getTime();
		var style = isJs ? '<script src="' + url + '" type="text/javascript"></script>'
				: '<link href="' + url + '" rel="stylesheet" type="text/css" />';
		
		style = style.replace(/"/g, '\\"');
		iframe.style.display = 'none';
		window[fn] = function(loadTime) {
			window[fn] = null;
			if (once) {
				callback && callback(loadTime, url);
				document.body.removeChild(iframe);
			} else {
				cacheStyle(url, function() {
					callback && callback(loadTime, url);
				}, isJs, true);
			}
		};
		
		iframe.src = 'javascript:"<script>var start = new Date().getTime();</script>' + 
		style + '<script>parent.' + fn + '(new Date().getTime() - start);</script>"';
		
		if (!appendToBody()) {
			var id = setInterval(appendToBody, 100); //确保document.body存在
		}
		
		function appendToBody() {
			if (document.body) {
				id && clearInterval(id);
				document.body.appendChild(iframe);
				return true;
			}
		}
	}
	
	if ( typeof module == "object" && typeof module.exports == "object" ) {
		module.exports = cacheStyle;
	} else {
		global.cacheStyle = cacheStyle;
	}
})(typeof window !== "undefined" ? window : this);
