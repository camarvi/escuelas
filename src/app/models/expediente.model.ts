export class ExpedienteModel{

    NUM_EXPEDIENTE:   number;
    COD_TUTOR:        number;
    NIF_TUTOR:        string;
    APE1_TUTOR:       string;
    APE2_TUTOR:       string;
    NOMBRE_TUTOR:     string;
    PARENTESCO:       number;
    DESC_PARENTESCO:  string;
    NOMBRE_ALUMNO:    string;
    FECHA_NACIMIENTO: string;
    COD_ESCUELA:      number;
    DESC_ESCUELA:     string;
    FECHA_ALTA:       string;
    COD_VARIACION:    string;
    DESC_VARIACION:   string;
    FECHA_VARIACION:  string;
    FECHA_GESTION:    string;
    MES_JULIO:        string;
    
    constructor(){
        this.NUM_EXPEDIENTE = 0;
        this.COD_TUTOR = 0;
        this.NIF_TUTOR = "";   
        this.APE1_TUTOR = "";
        this.APE2_TUTOR = "";
        this.NOMBRE_TUTOR = "";
        this.PARENTESCO = 1;
        this.DESC_PARENTESCO = "";
        this.NOMBRE_ALUMNO = " ";
        this.FECHA_NACIMIENTO = new Date().toLocaleDateString('en-GB',{ timeZone: 'UTC' });
        this.COD_ESCUELA = 0;
        this.DESC_ESCUELA = "";
        this.FECHA_ALTA = new Date().toLocaleDateString('en-GB',{ timeZone: 'UTC' });
        this.COD_VARIACION = "A";
        this.DESC_VARIACION = "ALTA";
        this.FECHA_VARIACION =  new Date().toLocaleDateString('en-GB',{ timeZone: 'UTC' });
        this.FECHA_GESTION =    new Date().toLocaleDateString('en-GB',{ timeZone: 'UTC' });
        this.MES_JULIO = "N";        

    }
}