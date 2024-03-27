// import { Operator } from "./enum";

// export class GridInfo {
//     fields?: string;
//     filters: Filter[] = [];
//     sorts: Sort[] = [];
//     includes?: Include[] = [];
//     pageInfo: PageInfo = new PageInfo();

//     getFilterValue?(field: any, removeFilter: boolean = false) {
//         if (!this.filters) return;
//         for (let i = 0; i < this.filters.length; i++) {
//             if (this.filters[i].field == field) {
//                 const value = this.filters[i].value;
//                 if (removeFilter) {
//                     this.filters.splice(i, 1);
//                 }
//                 return value;
//             }
//         }
//     }

//     async modifyFilter?(field: any, funcModify: (filter: Filter) => void) {
//         if (!this.filters) return;
//         for (let i = 0; i < this.filters.length; i++) {
//             if (this.filters[i].field == field) {
//                 await funcModify(this.filters[i]);
//                 break;
//             }
//         }
//     }

//     constructor(init?: GridInfo) {
//         for (const key in init) {
//             this[key] = init[key];
//         }
//     }
// }

// export class PageInfo {
//     page = 1;
//     pageSize = 10;

//     constructor(init?: PageInfo) {
//         for (const key in init) {
//             this[key] = init[key];
//         }
//     }
// }

// export class Include {
//     field: string;
//     thenInclude?: Include;
//     filters?: Filter[];

//     constructor(init: Include) {
//         for (const key in init) {
//             this[key] = init[key];
//         }
//     }
// }

// export class Sort {
//     field = 'id';
//     dir = 1;

//     constructor(init?: Sort) {
//         for (const key in init) {
//             this[key] = init[key];
//         }
//     }
// }

// export class Filter {
//     field?: string;
//     logic?: 'or' | 'and';
//     sourceField?: string;
//     subField?: string | number;
//     funcGetValue?: (item: any) => any;
//     isArrayField?: boolean;
//     value?: any;
//     valueIsField?: boolean = false;
//     operator?: Operator;
//     filters?: Filter[] = [];
//     stringCompareOption?: StringCompareOption = StringCompareOption.Normal;

//     constructor(init?: Filter) {
//         for (const key in init) {
//             this[key] = init[key];
//         }
//     }

//     convertFilterForArrayField?(field?: string) {
//         if (!field) {
//             field = this.field;
//         }
//         try {
//             const values = JSON.parse(this.value);
//             if (!Array.isArray(values)) return;
//             this.field = null;
//             this.operator = null;
//             this.logic = 'or';
//             this.value = null;
//             this.filters = [];
//             values.forEach(value => {
//                 this.filters.push(
//                     new Filter({
//                         field: field,
//                         operator: Operator.equal,
//                         value: JSON.stringify(value)
//                     }),
//                     new Filter({
//                         field: field,
//                         operator: Operator.startWith,
//                         value: JSON.stringify(`${value},`)
//                     }),
//                     new Filter({
//                         field: field,
//                         operator: Operator.endWith,
//                         value: JSON.stringify(`,${value}`)
//                     }),
//                     new Filter({
//                         field: field,
//                         operator: Operator.contain,
//                         value: JSON.stringify(`,${value},`)
//                     })
//                 );
//             });
//         }
//         catch (ex) {

//         }
//     }
// }

// export enum StringCompareOption { Normal, FreeText, IgnoreCase }
