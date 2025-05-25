import { useEffect, useState } from "react";
import Table from "../Table";
import type { DataClient } from "../services/Data";
import { API_URL } from "../services/Api";

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
  const [data, setData] = useState<DataClient[]>([]);
  const [selectData, setSelectData] = useState<DataClient>();
  const [editData, setEditData] = useState<Partial<DataClient>>();
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [add, setAdd] = useState(false);

  const actionData = (item: DataClient, specifique: string) => {
    setSelectData(item);
    if (specifique === "edit") setEdit(true);
    else if (specifique === "del") setDel(true);
  };

  const updateData = async (editData: DataClient) => {
    console.log("one", editData);

    try {
      const response = await fetch(
        `${API_URL}/api/clients/${editData.numTel}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      const res = await response.json();
      console.log("two", res);
    } catch (error) {
      throw new Error(`${error}`);
    }

    // setEdit(false);
  };

  const addClient = async (data: DataClient) => {
    try {
      const response = await fetch(`${API_URL}/api/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const deleteClient = async (numTel: string | undefined) => {
    try {
      const response = await fetch(`${API_URL}/api/clients/${numTel}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/clients`);
      if (response.status >= 400) throw new Error("Error request");

      const res = await response.json();
      console.log(res);

      setData(res);

      console.log(res);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Table
        data={data}
        header={header}
        title="Listes des Clients"
        name="Clients"
        action={actionData}
        handleAdd={setAdd}
        search
      />

      {edit && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const update = {
                numTel: selectData?.numTel,
                nom: editData?.nom || selectData?.nom,
                sexe: editData?.sexe || selectData?.sexe,
                pays: editData?.pays || selectData?.pays,
                solde: editData?.solde || selectData?.solde,
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
                htmlFor="nom"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                type="text"
                name="nom"
                id="nom"
                defaultValue={selectData?.nom}
                onChange={(e) =>
                  setEditData({ ...editData, nom: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="sexe"
                className="block text-sm font-medium text-gray-700"
              >
                sexe
              </label>
              <input
                type="text"
                name="sexe"
                id="sexe"
                defaultValue={selectData?.sexe}
                onChange={(e) =>
                  setEditData({ ...editData, sexe: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="pays"
                className="block text-sm font-medium text-gray-700"
              >
                Pays
              </label>
              <input
                type="text"
                name="pays"
                id="pays"
                defaultValue={selectData?.pays}
                onChange={(e) =>
                  setEditData({ ...editData, pays: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="solde"
                className="block text-sm font-medium text-gray-700"
              >
                Solde
              </label>
              <input
                type="number"
                name="solde"
                id="solde"
                defaultValue={selectData?.solde}
                onChange={(e) =>
                  setEditData({ ...editData, solde: parseInt(e.target.value) })
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
                type="email"
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
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center relative">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              Voulez-vous vraiment supprimer le client : <br />
              <span className="text-blue-600">{selectData?.nom}</span> ?
            </h2>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                type="button"
                onClick={() => setDel(false)}
                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Annuler
              </button>
              <button
                type="button" // Change to type="button" to prevent form submission if not wrapped in <form>
                onClick={() => deleteClient(selectData?.numTel)}
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
      {add && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const newData = {
                numTel: (form.elements.namedItem("numTel") as HTMLInputElement)
                  .value,
                nom: (form.elements.namedItem("nom") as HTMLInputElement).value,
                sexe: (form.elements.namedItem("sexe") as HTMLInputElement)
                  .value,
                pays: (form.elements.namedItem("pays") as HTMLInputElement)
                  .value,
                solde: parseInt(
                  (form.elements.namedItem("solde") as HTMLInputElement).value
                ),
                mail: (form.elements.namedItem("mail") as HTMLInputElement)
                  .value,
              };

              addClient(newData);
            }}
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Ajouter un Client
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="nom"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                type="text"
                name="nom"
                id="nom"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="sexe"
                className="block text-sm font-medium text-gray-700"
              >
                sexe
              </label>
              <input
                type="text"
                name="sexe"
                id="sexe"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="pays"
                className="block text-sm font-medium text-gray-700"
              >
                Pays
              </label>
              <input
                type="text"
                name="pays"
                id="pays"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="solde"
                className="block text-sm font-medium text-gray-700"
              >
                Solde
              </label>
              <input
                type="number"
                name="solde"
                id="solde"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="mail"
                className="block text-sm font-medium text-gray-700"
              >
                Mail
              </label>
              <input
                type="email"
                name="mail"
                id="mail"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setAdd(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                AJouter
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
