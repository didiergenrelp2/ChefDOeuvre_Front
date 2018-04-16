import {Imateriel} from "./imateriel";

export interface Ibureau {
    id_bureau?: number;
    nom_bureau: string;
    code_regate: string;
    adresse: string;
	code_postal: string;
	ville: string;
    telephone: string;
    materiel: Imateriel[];
}
