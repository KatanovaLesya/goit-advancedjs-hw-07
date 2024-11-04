// Клас Key
class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

// Клас Person
class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

// Абстрактний клас House
abstract class House {
  protected door: boolean = false;   // Двері спочатку закриті
  protected key: Key;
  protected tenants: Person[] = [];  // Список мешканців

  constructor(key: Key) {
    this.key = key;
  }

  // Метод для входу в будинок, якщо двері відкриті
  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log(`${person.getKey().getSignature()} has entered the house.`);
    } else {
      console.log("The door is closed. Can't come in.");
    }
  }

  // Абстрактний метод для відкриття дверей
  abstract openDoor(key: Key): void;
}

// Клас MyHouse, що успадковується від House
class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  // Реалізація методу openDoor
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("Door is now open.");
    } else {
      console.log("Wrong key. Door remains closed.");
    }
  }
}

// Тестування сценарію
const key = new Key();                  // Створення ключа
const house = new MyHouse(key);         // Створення будинку з ключем
const person = new Person(key);         // Створення людини з ключем

house.openDoor(person.getKey());        // Відкриваємо двері за допомогою ключа людини
house.comeIn(person);                   // Людина намагається увійти в будинок
