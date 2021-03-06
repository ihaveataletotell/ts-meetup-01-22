import sum from './sum';
import multiply from './multiply';
import {readFromFile} from './readFromFile';
import * as path from 'path';
import {person, org, innerPerson, innerPerson2} from 'codebase';

// const objTest: {
//     method?(): void;
// } = {};
//
// objTest.method?.();
// const fn = objTest.method ?? (() => 1);


console.log('2 + 2 is', sum(2, 2));
console.log('3 * 3 is', multiply(3, 3));
console.log(
    'codebase parse result',
    readFromFile(
        path.resolve(__dirname, 'readFromFile', 'codebase.ts')
    )
);






// const obj: InnerPersonsData = {
//   clientId: 1,
//   firstName: 'Vasya',
// };
//
// obj.middleName.toLowerCase(); // TypeError
// obj.docs[0]; // TypeError






// function getPersonName(person: BasePersonData): string {
//   return person.firstName || '';
// }
//
// getPersonName(person); // OK
//
// getPersonName(org); // We want error, but getting ok
//
// getPersonName(innerPerson); // we want it to be compatible




// const myValue: any = {
//   test: 1,
// };
//
// type A = typeof myValue;











// class Adder implements IAdder<string> {
//   data;
//
//   constructor(private _initValue: string) {
//     this.data = new Set([_initValue]);
//   }
//
//   add(value: string) {
//     this.data.add(value);
//     return this;
//   }
//
//   remove: IAdder<string>['remove'] = (value) => {
//     this.data.delete(value);
//     return this;
//   }
// }
//
// const myAdder = new Adder('str');



// const numArr: {num: number}[] = [
//   {num: 1},
//   {num: 2},
//   {num: 3},
//   {num: 4},
//   {num: 5}
// ];
//
// type ConditionalType<T> = T extends any[] ? 1 : 2;
// type ConditionalTypeRes = ConditionalType<typeof numArr>;
//
// // any[] === Array<any>
// type ArrayItemOf<T> = T extends Array<infer Item> ? Item : never;
// type NumArrItem = ArrayItemOf<typeof numArr>;
//
// // type AdderType<T> = T extends IAdder<infer Arg> ? Arg : never;
// // type AdderTypeResult = AdderType<typeof myAdder>;
//
// function thisWillNotWork<T extends unknown[]>(value: T) {
//   type ItemType = ArrayItemOf<T>;
//
//   const result: ItemType = value[0];
//   result.toFixed();
// }
//
// thisWillNotWork([1,2,3,4,5]);
// thisWillNotWork(['one', 'two']);
//
// function thisWillWork<T extends keyof InnerPersonsData>(
//   key: T, item: ArrayItemOf<InnerPersonsData[T]>,
// ) {
//   if ('docKind' in item) {
//     return item.docValue;
//
//   } else if ('signingId' in item) {
//     return item.signingId;
//   }
// }
//
// thisWillWork('signings', { signingId: 1 });







// // function isPerson(data: BasePersonData | BaseOrgData): data is BasePersonData {
// //   return 'firstName' in data;
// // }
//
// function mapToFrontendFormat(data: BasePersonData | BaseOrgData): FrontendParticipantFormat {
//   // const all: UnionToIntersection<typeof data> = data;
//
//   return {};
// }
//
// mapToFrontendFormat(person);
// mapToFrontendFormat(org);
// mapToFrontendFormat(innerPerson); // don't want from fn to accept it



