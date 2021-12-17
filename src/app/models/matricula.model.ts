export class MatriculaModel{

    COD_MATRICULA:  number;
    NUM_EXPEDIENTE: number;
    ANYO_ACADEMICO: number;
    COD_CURSO:      number;
    DESC_CURSO:     string;
    CUOTA_MES:      number;

    constructor(){
        this.COD_MATRICULA = 0;
        this.NUM_EXPEDIENTE = 0;
        this.ANYO_ACADEMICO = 0;   
        this.COD_CURSO = 1;
        this.DESC_CURSO = "";
        this.CUOTA_MES = 0;
       
    }
}