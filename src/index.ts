// Напишіть функцію isString, яка перевірятиме, чи є передане значення рядком.
// Потім використовуйте її для звуження типу змінної.

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// У вас є масив з елементами різних типів. 
// Напишіть функцію, яка приймає цей масив і фільтрує його так, щоб у підсумку в ньому залишилися тільки рядки. 
// Використовуйте захисника типу для цього завдання.

function arrayStringFilter(arr: unknown[]): string[] {
  return arr.filter(isString);        
}

// У вас є об'єкт, який може містити довільні властивості.
// Напишіть функцію, яка приймає цей об'єкт і повертає значення однієї з властивостей, якщо воно існує і має певний тип.

let test = {id: 1, count: 3, name: 'dogs', active: true};

function returnValueProperty(obj: object): string | void {
  if ('name' in obj && isString(obj.name)){
    return obj.name;
  }  
}

console.log(returnValueProperty(test));

// Створіть кілька захисників типу, кожен з яких перевіряє певний аспект об'єкта (наприклад, наявність певної властивості або її тип). 
// Потім напишіть функцію, яка використовує цих захисників у комбінації для звуження типу об'єкта до більш конкретного типу.

let testObj = {id: 1, name: 'Alex', surname: 'Surname', status: true}
let testObj2 = {id: 1, name: 'Alex', surname: 'Surname', status: 'true'}
let testObj3 = {id: 1, name: 'Alex', surname: 2, status: true}

function firstGuard(text: object): text is {surname: string} {
  return 'surname' in text && typeof text.surname === 'string';
}

function secondGuard(bool: object): bool is {status: boolean} {
  return 'status' in bool && typeof bool.status === 'boolean';
}

function useGuards(mix: object): {surname: string, status: boolean} | string | boolean {
  if (firstGuard(mix) && secondGuard(mix)) {
    let newMix = {surname: mix.surname, status: mix.status};
    return newMix;
  } else if (firstGuard(mix) && !secondGuard(mix)) {
    return mix.surname;
  } else if (!firstGuard(mix) && secondGuard(mix)) {
    return mix.status;
  } else {
    //throw new Error('Not find');
    return 'Not find';
  }
}

console.log(useGuards(testObj));
console.log(useGuards(testObj2));
console.log(useGuards(testObj3));

// У вас є змінна, яка може бути одного з декількох типів (наприклад, рядок або число).
// Напишіть функцію, яка приймає цю змінну і виконує довільні операції, специфічні для кожного з типів.

function randomOperations(value: string | number): void {
  if (isString(value)) {
    let valueLen = value.toUpperCase();
  } else if (typeof value === 'number') {
    value +=1;
  }
}

// Створіть захисник типу, який перевірятиме, чи є передане значення функцією.
// Потім напишіть функцію, яка використовує цей гард для звуження типу змінної і викликає передану функцію, якщо вона існує.

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

function typeNarrow(func: unknown): void {
  if (isFunction(func)) {
    func();
  }
}

// Створіть класи з ієрархією успадкування і потім напишіть функцію, яка використовує захисник типу для звуження типу об'єктів,
// що базуються на цій ієрархії.

class Clothes {
  public name: string;
  public color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}

class Footwear extends Clothes {
  public sizeFootwear: string[] = [];
  public destination: string[] = [];

  constructor(name: string, color: string, sizeFootwear: [], destination: []) {
    super(name, color);
    this.sizeFootwear = sizeFootwear;
    this.destination = destination;
  }
}

function isFootwear(clothes: Clothes): clothes is Footwear {
  return clothes instanceof Footwear;
}

class Outerwear extends Clothes {
  public sizeClothes: number[] = [];
  public type: string[] = [];

  constructor(name: string, color: string, sizeClothes: [], type: []) {
    super(name, color);
    this.sizeClothes = sizeClothes;
    this.type = type;
  }
}

function isOuterwear(clothes: Clothes): clothes is Outerwear {
  return clothes instanceof Outerwear;
}

function clothesGuards(clothes: Clothes): void {
  if (isFootwear(clothes)) {
    clothes; 
  } else if (isOuterwear(clothes)) {
    clothes;
  } else {
    throw new Error('Unknown type clothes');
  }
}
