import { Condition } from "../interfaces/condition";
import { ColumnCore } from "./column-core";

export class TableCore {
    columns: ColumnCore[];
    data: any[];
    tableName: string;
    tableNumber: number;
    primaryField: string;
    foreignField: string;
    nameField: string;
    parentField: string;
    foreignValue: number;
    parentValue: number;
    orderField: string;
    conditions: Condition;
    rows = 10;
    numberRows = 1000;
    page = 1;
    currentRow = 0;
    selected: any;
    selecteds: any[];
    read = false;
    uid: number;
    formType = false;
    // isree = false;
    title: string;
    relation: TableCore;
    isParent = false;
    height = '200px';
    isSearch= false;
    isVisible = true;
}
