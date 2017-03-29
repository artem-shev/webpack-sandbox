// import _ from 'lodash';

import Human from './Human';
import Student from './Student';

// console.log('NODE_ENV', NODE_ENV);
export let jack = new Human('jack', 27);
let ann = new Student('ann', 23);

// jack.sayHello();
// console.log('ann', ann);

console.log('app.js is online');

// let arr = [
// 	{id: 1, test: 3}, {id: 2, test: 3}, {id: 3, test: 5}
// ]

// console.log('_.find(arr, {id: 2})', _.filter(arr, {test: 3}));

let btn = document.querySelector('#btn-alert');

console.log('btn', btn);

btn.addEventListener('click', (e) => {
	require.ensure([], function(require) {
		let alert = require('./alert');
		alert('hello world!');
	})
})

// window.onload = (e) => { 
// 	console.log("window.onload", e)
// }