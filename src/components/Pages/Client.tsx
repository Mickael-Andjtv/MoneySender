import { useEffect, useState } from "react";
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

export default function Client() {
  const [data, setData] = useState<DataClient>(initData);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const actionData = (item: DataClient, specifique: string) => {
    setData(item);
    if (specifique === "edit") setEdit(true);
    else if (specifique === "del") setDel(true);
  };
  useEffect(() => {}, [data]);
  return (
    <>
      <Table
        data={[initData]}
        header={header}
        title="Listes des Clients"
        name="Clients"
        action={setData}
      />
    </>
  );
}
