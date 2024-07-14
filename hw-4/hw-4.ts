interface INumberOrString {
  [key: string]: number | string;
}

interface IStringFunctions {
  [key: string]: (...args: any[]) => any;
}

interface IStringArrayLike {
  [index: number]: string;
}

interface IUser {
  name: string;
  [key: string]: any;
}

interface IBase {
  [key: string]: string;
}

interface ISecondInterface extends IBase {
  name: string;
  info: string;
}

interface IObject {
  [key: string]: any;
}

function areAllValuesNumbers(obj: IObject): boolean {
  for (const key in obj) {
    if (typeof obj[key] !== 'number') {
      return false;
    }
  }
  return true;
}