# cache-style
不影响当前页面的情况下，把js、css文件预加载到缓存

#Exapmle
	//预加载js
	cacheStyle('http://xxx.yyy.com/test.js', 
	  function(timeForLoadingCache, url) {
		//如果从缓存加载文件的时间小于1秒，表示文件已存在浏览器缓存，可以使用了
	    if (timeForLoadingCache < 1000) {
	    		$.getScript(url);
	    }
	  }, true);

	//预加载css
	cacheStyle('http://xxx.yyy.com/test.css', 
	  function(timeForLoadingCache, url) {
		//如果从缓存加载文件的时间小于1秒，表示文件已存在浏览器缓存，可以使用了
	    if (timeForLoadingCache < 1000) {
	    		loadCss(url);
	    }
	  }, true);
