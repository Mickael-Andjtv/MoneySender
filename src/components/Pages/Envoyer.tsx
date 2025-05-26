import { useEffect, useState } from "react";
import Table from "../Table";
import type { DataSend } from "../services/Data";
import { API_URL } from "../services/Api";

const header = [
  "idEnv",
  "Numéro envoyeur",
  "Numéro destinataire",
  "Montant",
  "Date",
  "Raison",
  "Actions",
];

export default function Envoyer() {
  const [data, setData] = useState<DataSend[]>([]);
  const [selectData, setSelectData] = useState<DataSend>();
  const [editData, setEditData] = useState<Partial<DataSend>>();
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [add, setAdd] = useState(false);

  const actionData = (item: DataSend, specifique: string) => {
    setSelectData(item);
    if (specifique === "edit") setEdit(true);
    else if (specifique === "del") setDel(true);
  };

  const updateData = async (editData: DataSend) => {
    console.log("one", editData);

    try {
      const response = await fetch(`${API_URL}/api/envoyer/${editData.idEnv}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) throw new Error("Request error");
      fetchData();
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setEdit(false);
      setEditData(undefined);
    }
  };

  const addEnvois = async (data: DataSend) => {
    try {
      const response = await fetch(`${API_URL}/api/envoyer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Request error");
      fetchData();
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setAdd(false);
    }
  };

  const deleteEnvois = async (idEnv: string | undefined) => {
    try {
      const response = await fetch(`${API_URL}/api/envoyer/${idEnv}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Request error");
      fetchData();
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setDel(false);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/envoyer`);
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
        title="Listes des Envois"
        name="Envois"
        action={actionData}
        handleAdd={setAdd}
        search={false}
      />

      {edit && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const update = {
                idEnv: selectData?.idEnv,
                numEnvoyeur: editData?.numEnvoyeur || selectData?.numEnvoyeur,
                numRecepteur:
                  editData?.numRecepteur || selectData?.numRecepteur,
                montant: editData?.montant || selectData?.montant,
                date: editData?.date || selectData?.date,
                raison: editData?.raison || selectData?.raison,
              };
              console.log(update);

              updateData(update as DataSend);
            }}
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Modifier l'envois
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <label
                htmlFor="numEnvoyeur"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro Envoyeur
              </label>
              <input
                type="text"
                name="numEnvoyeur"
                id="numEnvoyeur"
                defaultValue={selectData?.numEnvoyeur}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    numEnvoyeur: e.target.value,
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="numRecepteur"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro Recepteur
              </label>
              <input
                type="text"
                name="numRecepteur"
                id="numRecepteur"
                defaultValue={selectData?.numRecepteur}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    numRecepteur: e.target.value,
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="montant"
                className="block text-sm font-medium text-gray-700"
              >
                Montant
              </label>
              <input
                type="text"
                name="montant2"
                id="montant2"
                defaultValue={selectData?.montant}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    montant: parseFloat(e.target.value),
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="datetime-local"
                name="date"
                id="date"
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    date: new Date(e.target.value),
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="raison"
                className="block text-sm font-medium text-gray-700"
              >
                raison
              </label>
              <input
                type="text"
                name="raison"
                id="raison"
                defaultValue={selectData?.raison}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    raison: e.target.value,
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setEditData(undefined);
                  setEdit(false);
                }}
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
              Voulez-vous vraiment supprimer ce taux: <br />
              <span className="text-blue-600">{selectData?.idEnv}</span> ?
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
                onClick={() => deleteEnvois(selectData?.idEnv)}
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
                idEnv: (form.elements.namedItem("idEnv") as HTMLInputElement)
                  .value,
                numEnvoyeur: (
                  form.elements.namedItem("numEnvoyeur") as HTMLInputElement
                ).value,
                numRecepteur: (
                  form.elements.namedItem("numRecepteur") as HTMLInputElement
                ).value,
                date: new Date(
                  (form.elements.namedItem("date") as HTMLInputElement).value
                ),
                montant: parseFloat(
                  (form.elements.namedItem("montant") as HTMLInputElement).value
                ),
                raison: (form.elements.namedItem("date") as HTMLInputElement)
                  .value,
              };

              addEnvois(newData);
            }}
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Envoyer de l'argent
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <label
                htmlFor="idEnv"
                className="block text-sm font-medium text-gray-700"
              >
                idEnv
              </label>
              <input
                type="text"
                name="idEnv"
                id="idEnv"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="numEnvoyeur"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro de l'envoyeur
              </label>
              <input
                type="text"
                name="numEnvoyeur"
                id="numEnvoyeur"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="numRecepteur"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro du récepteur
              </label>
              <input
                type="text"
                name="numRecepteur"
                id="numRecepteur"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="montant"
                className="block text-sm font-medium text-gray-700"
              >
                Montant
              </label>
              <input
                type="text"
                name="montant"
                id="montant"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="datetime-local"
                name="date"
                id="date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="raison"
                className="block text-sm font-medium text-gray-700"
              >
                Raison
              </label>
              <input
                type="text"
                name="raison"
                id="raison"
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
