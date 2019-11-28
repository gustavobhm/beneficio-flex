import { DataDrillDownSerie } from './dataDrillDownSerie';

export class DrilldownSerie {

    type: any;
    name: string;
    id: string;
    data: DataDrillDownSerie[] = [];

    constructor(type: string, name: string, id: string, data: DataDrillDownSerie[]) {
        this.type = type;
        this.name = name;
        this.id = id;
        this.data = data;
    }

}