import Animal from './animal';

class T extends Animal {
	constructor() {
		super('yes');
	}
}

const t = new T();

console.log(t.name);

if (t == null) {
	console.log('1111');
}