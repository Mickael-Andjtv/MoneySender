import { useState } from "react";

interface ClientData {
  numTel: string;
  nom: string;
  sexe: string;
  pays: string;
  solde: number;
  mail: string;
}

const initData = {
  numTel: "",
  nom: "",
  sexe: "",
  pays: "",
  solde: 0,
  mail: "",
};
const header = ["Numéro Téléphone", "Nom", "Sexe", "Pays", "Solde", "Mail"];
const Client = () => {
  const [data, setData] = useState<ClientData[]>([initData]);
  return (
    <>
      <table>
        <thead>
          <tr>
            {header.map((h, i) => (
              <th key={i}> h </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.numTel}>
              <td> {item.numTel} </td>
              <td> {item.nom} </td>
              <td> {item.sexe} </td>
              <td> {item.pays} </td>
              <td> {item.solde} </td>
              <td> {item.mail} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Client;
