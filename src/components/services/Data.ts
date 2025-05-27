export interface DataClient {
  numTel: string;
  nom: string;
  sexe: string;
  pays: string;
  solde: number;
  mail: string;
}

export interface DataRate {
  idTaux: string;
  montant1: number;
  montant2: number;
}

export interface DataSendCosts {
  idFrais: string;
  montant1: number;
  montant2: number;
  frais: number;
}

export interface DataSend {
  idEnv: string;
  numEnvoyeur: string;
  numRecepteur: string;
  montant: number;
  date: Date;
  raison: string;
}

export interface DataPDF {
  numTel: string;
  mois: number;
  annee: number;
}
