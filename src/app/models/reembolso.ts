import { Beneficio } from './beneficio';

export class Reembolso {

    id: number;
    solicitante: string = "";
    siglaSecao: string = "";
    valor: number;
    data: Date = new Date();
    beneficio: Beneficio = new Beneficio();
    observacao: string = "";

}