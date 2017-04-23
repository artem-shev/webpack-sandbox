import Model from './Model';
import View from './View';
import Controller from './Controller';

const app = () => {
	console.log('online');
	console.log('NODE_ENV', NODE_ENV);

	const body = document.body;
	console.log('body', body);
	body.style.backgroundColor = 'green';

	const wrapper = document.querySelector('.wrapper');
	console.log('wrapper', wrapper);

}

export default app;