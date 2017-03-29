export default class Human {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	sayHello() {
		alert(`Hello, my name is ${ this.name }, and I'm ${ this.age }`);
	}

	sayBye() {
		alert(`Bye-bye`);
	}
}

console.log('Human.js is online');