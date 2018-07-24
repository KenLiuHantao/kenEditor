/**
 * Created by liuhantao on 2018/7/24.
 */
var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.type='text/css';
link.rel = 'stylesheet';
link.href = './dist/main.css';
head.appendChild(link);
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = './dist/bundle-6b7f446665d7ee6ecb08.js';
head.appendChild(script);