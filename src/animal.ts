export default class Animal {
	public name: string;
	protected age: number | undefined;

	/**
	 * Creates an instance of Animal.
	 * @param {string} theName 
	 * @memberof Animal
	 */
	constructor(theName: string, theAge?: number) { 
		this.name = theName; 
		this.age = theAge;
	}
}

class Test extends Animal {
	constructor() {
		super('no', 20);
	}

	public printAge(): void {
		console.log('age', this.age);
	}
}

const t = new Test();

console.log(t.printAge());