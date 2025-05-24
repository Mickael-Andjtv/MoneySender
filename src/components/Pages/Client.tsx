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
  // const [data, setData] = useState<DataClient>(initData);
  const [selectData, setSelectData] = useState<DataClient>();
  const [editData, setEditData] = useState<Partial<DataClient>>();
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const actionData = (item: DataClient, specifique: string) => {
    console.log(item, specifique);

    setSelectData(item);
    if (specifique === "edit") setEdit(true);
    else if (specifique === "del") setDel(true);
  };

  const updateData = async (editData: DataClient) => {
    console.log(editData);
  };
  return (
    <>
      <Table
        data={[initData]}
        header={header}
        title="Listes des Clients"
        name="Clients"
        action={actionData}
      />

      {edit && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const update = {
                numTel: editData?.numTel || selectData?.numTel,
                name: editData?.name || selectData?.name,
                sex: editData?.sex || selectData?.sex,
                country: editData?.country || selectData?.country,
                pay: editData?.pay || selectData?.pay,
                mail: editData?.mail || selectData?.mail,
              };
              updateData(update as DataClient);
            }}
          >
            <input
              type="text"
              name="numTel"
              defaultValue={selectData?.numTel}
              onChange={(e) =>
                setEditData({ ...editData, numTel: e.target.value })
              }
            />
            <input
              type="text"
              name="name"
              defaultValue={selectData?.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <input
              type="text"
              name="sex"
              defaultValue={selectData?.sex}
              onChange={(e) =>
                setEditData({ ...editData, sex: e.target.value })
              }
            />
            <input
              type="text"
              name="country"
              defaultValue={selectData?.country}
              onChange={(e) =>
                setEditData({ ...editData, country: e.target.value })
              }
            />
            <input
              type="number"
              name="pay"
              defaultValue={selectData?.pay}
              onChange={(e) =>
                setEditData({ ...editData, pay: parseInt(e.target.value) })
              }
            />
            <input
              type="text"
              name="mail"
              defaultValue={selectData?.mail}
              onChange={(e) =>
                setEditData({ ...editData, mail: e.target.value })
              }
            />
            <button>Submit</button>
          </form>
        </div>
      )}
    </>
  );
}
