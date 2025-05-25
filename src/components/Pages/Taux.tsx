import { useEffect, useState } from "react";
import Table from "../Table";
import type { DataRate } from "../services/Data";
import { API_URL } from "../services/Api";

const header = ["idTaux", "Montant 1", "Montant 2"];

export default function Taux() {
  const [data, setData] = useState<DataRate[]>([]);
  const [selectData, setSelectData] = useState<DataRate>();
  const [editData, setEditData] = useState<Partial<DataRate>>();
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [add, setAdd] = useState(false);

  const actionData = (item: DataRate, specifique: string) => {
    setSelectData(item);
    if (specifique === "edit") setEdit(true);
    else if (specifique === "del") setDel(true);
  };

  const updateData = async (editData: DataRate) => {
    console.log("one", editData);

    try {
      const response = await fetch(`${API_URL}/api/taux/${editData.idTaux}`, {
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
      setEditData(undefined)
    }
  };

  const addTaux = async (data: DataRate) => {
    try {
      const response = await fetch(`${API_URL}/api/taux`, {
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

  const deleteTaux = async (idTaux: string | undefined) => {
    try {
      const response = await fetch(`${API_URL}/api/taux/${idTaux}`, {
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
      const response = await fetch(`${API_URL}/api/taux`);
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
        title="Listes des Taux"
        name="Taux"
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
                idTaux: selectData?.idTaux,
                montant1: editData?.montant1 || selectData?.montant1,
                montant2:parseFloat(String(editData?.montant2)) || selectData?.montant2,
              };
              console.log(update);
              
              updateData(update as DataRate);
            }}
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Modifier le Taux
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <label
                htmlFor="montant1"
                className="block text-sm font-medium text-gray-700"
              >
                Montant 1
              </label>
              <input
                type="text"
                name="montant1"
                id="montant1"
                defaultValue={selectData?.montant1}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    montant1: parseFloat(e.target.value),
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="montant2"
                className="block text-sm font-medium text-gray-700"
              >
                montant2
              </label>
              <input
                type="text"
                name="montant2"
                id="montant2"
                defaultValue={selectData?.montant2}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    montant2: parseFloat(e.target.value),
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setEditData(undefined)
                  setEdit(false)
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
              <span className="text-blue-600">{selectData?.idTaux}</span> ?
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
                onClick={() => deleteTaux(selectData?.idTaux)}
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
                idTaux: (form.elements.namedItem("idTaux") as HTMLInputElement)
                  .value,
                montant1: parseFloat(
                  (form.elements.namedItem("montant1") as HTMLInputElement)
                    .value
                ),
                montant2: parseFloat(
                  (form.elements.namedItem("montant2") as HTMLInputElement)
                    .value
                ),
              };

              addTaux(newData);
            }}
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Ajouter un Taux
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <label
                htmlFor="idTaux"
                className="block text-sm font-medium text-gray-700"
              >
                IdTaux
              </label>
              <input
                type="text"
                name="idTaux"
                id="idTaux"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="montant 1"
                className="block text-sm font-medium text-gray-700"
              >
                Montant 1
              </label>
              <input
                type="text"
                name="montant1"
                id="montant 1"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label
                htmlFor="montant 2"
                className="block text-sm font-medium text-gray-700"
              >
                Montant 2
              </label>
              <input
                type="text"
                name="montant2"
                id="montant 2"
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
