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
    setEdit(false);
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
        <div className="fixed inset-0  flex items-center justify-center z-50">
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
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Modifier le Client
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <label
                htmlFor="numTel"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro Téléphone
              </label>
              <input
                type="text"
                name="numTel"
                id="numTel"
                defaultValue={selectData?.numTel}
                onChange={(e) =>
                  setEditData({ ...editData, numTel: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={selectData?.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-700"
              >
                Sexe
              </label>
              <input
                type="text"
                name="sex"
                id="sex"
                defaultValue={selectData?.sex}
                onChange={(e) =>
                  setEditData({ ...editData, sex: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Pays
              </label>
              <input
                type="text"
                name="country"
                id="country"
                defaultValue={selectData?.country}
                onChange={(e) =>
                  setEditData({ ...editData, country: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="pay"
                className="block text-sm font-medium text-gray-700"
              >
                Solde
              </label>
              <input
                type="number"
                name="pay"
                id="pay"
                defaultValue={selectData?.pay}
                onChange={(e) =>
                  setEditData({ ...editData, pay: parseInt(e.target.value) })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="mail"
                className="block text-sm font-medium text-gray-700"
              >
                Mail
              </label>
              <input
                type="text"
                name="mail"
                id="mail"
                defaultValue={selectData?.mail}
                onChange={(e) =>
                  setEditData({ ...editData, mail: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setEdit(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Modifier
              </button>
            </div>
          </form>
        </div>
      )}
      {del && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <h2>Voulez vous vraiment supprimer ce Client</h2>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setDel(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
