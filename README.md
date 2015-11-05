# cache-style
不影响当前页面的情况下，把js、css文件预加载到缓存

# Installation
支持webpack等构建

	$ npm install cache-style --save
	
也可以直接引用：

	<script src="xxxx/cache-style.js"></script>

#Exapmle
	//预加载js
	cacheStyle('http://xxx.yyy.com/test.js', 
	  function(timeOfLoadStyle, url) {
		//如果加载的时间小于1秒，表示文件已存在浏览器缓存，可以使用了
	    if (timeOfLoadStyle < 1000) {
	    		$.getScript(url);
	    }
	  }, true);

	//预加载css
	cacheStyle('http://xxx.yyy.com/test.css', 
	  function(timeOfLoadStyle, url) {
		//如果加载的时间小于1秒，表示文件已存在浏览器缓存，可以使用了
	    if (timeOfLoadStyle < 1000) {
	    		loadCss(url);
	    }
	  }, true);
