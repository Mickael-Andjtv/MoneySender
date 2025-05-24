export interface DataClient {
  numTel: string;
  name: string;
  sex: string;
  country: string;
  pay: number;
  mail: string;
}

export interface DataRate {
  idRate: string;
  rising1: number;
  rising2: number;
}

export interface DataSendCosts {
  idCosts: string;
  rising1: number;
  rising2: number;
  costs: number;
}

export interface DataSend {
  idSend: string;
  numSender: string;
  numReceiver: string;
  rising: number;
  date: Date;
  reason: string;
}
