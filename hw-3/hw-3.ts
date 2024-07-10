//Створіть класи Circle, Rectangle, Square і Triangle. У кожного з них є загальнодоступний метод calculateArea. У кожної фігури є загальнодоступні властивості - колір і назва, які не можна змінювати після створення. У Square і Rectangle зі свого боку є ще додатковий метод print, який виводить рядок із формулою розрахунку площі

abstract class MainFigure {
  public readonly color: string;
  public readonly name: string;

  constructor(color: string, name: string) {
    this.color = color;
    this.name = name;
  }

  abstract calculateArea(): number;
}

interface IPrintable {
  print(): void;
}

class Circle extends MainFigure {
  radius: number;
  constructor(radius: number, color: string) {
    super(color, 'Circle');
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Triangle extends MainFigure {
  base: number;
  height: number;

  constructor(color: string, base: number, height: number) {
    super(color, 'Triangle');
    this.base = base;
    this.height = height;
  }

  calculateArea(): number {
    return (this.base * this.height)/2;
  }
}

class Rectangle extends MainFigure implements IPrintable {
  width: number;
  height: number;

  constructor(color: string, width: number, height: number) {
    super(color, 'Rectangle');
    this.width = width;
    this.height = height;
  }

  calculateArea(): number {
    return this.width * this.height;
  }

  print(): void {
    console.log(`Area of Rectangle: width * height`);
  }
}

class Square extends MainFigure implements IPrintable {
  sideLength: number;

  constructor(color: string, sideLength: number) {
    super(color, 'Square');
    this.sideLength = sideLength;
  }

  calculateArea(): number {
    return this.sideLength * this.sideLength;
  }

  print(): void {
    console.log(`Area of Square: sideLength * sideLength`);
  }
}