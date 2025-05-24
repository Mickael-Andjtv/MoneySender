export interface DataClient {
  numTel: string;
  nom: string;
  sexe: string;
  pays: string;
  solde: number;
  mail: string;
}

export interface DataTaux {
  idTaux: string;
  montant1: number;
  montant2: number;
}

export interface FraisEnvoy {
  idFrais: string;
  montant1: number;
  montant2: number;
  frais: number;
}
