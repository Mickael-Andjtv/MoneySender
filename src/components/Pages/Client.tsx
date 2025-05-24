import { useState } from "react";
import Table from "../Table";
import type { DataClient } from "../services/Data";



const initData = {
  numTel: "0343063371",
  name: "Mickael",
  sex: "M",
  country: "M/car",
  pay: 10,
  mail: "m@gmail.com",
};
const header = [
  "Numéro Téléphone",
  "Nom",
  "Sexe",
  "Pays",
  "Solde",
  "Mail",
  "Action",
];

export default  function Client(){
  const [data, setData] = useState<DataClient>(initData)
  return <>
  <Table data={[initData]} header={header} title="Listes des Clients" name="Clients" action={setData}/>
  </>
}