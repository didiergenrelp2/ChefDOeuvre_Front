import { Ibureau } from "./ibureau";

export interface Imateriel {
    id_materiel: number;
	domaine: string;	
	type: string;
	marque: string;
	modele: string;
	numero_serie: string;
	code_parc: string;
	code_article: string;
    date_fin_garantie: any;
    //etat: string;
    id_bureau: number;
}
