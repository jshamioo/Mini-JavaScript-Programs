class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    greeting(){
        return 'Hello there';
    }
}

const mary = new Person('Mary', 'Williams');

console.log(mary.greeting());