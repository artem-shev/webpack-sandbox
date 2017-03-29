import Human from './Human';

export default class Student extends Human {
	constructor(name, age) {
		super(name, age);
	}
}

console.log('Student.js is online');