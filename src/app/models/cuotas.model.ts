export class CuotasModel{

    COD_CUOTA:     number;
    COD_MATRICULA: number;
    F_INICIO : string;
    F_FIN : string;
    CUOTA:         number;

    constructor(){
        this.COD_CUOTA = 0;
        this.COD_MATRICULA = 0;
        this.F_INICIO = "01/01/" +  new Date().getFullYear();
        this.F_FIN = "31/12/" + new Date().getFullYear(); 
        this.CUOTA = 0;
       
    }
}