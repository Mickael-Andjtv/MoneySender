import { useEffect, useState } from "react";
import Table from "../Table";
import type { DataClient, DataPDF, DataSend,Devise } from "../services/Data";
import { API_URL } from "../services/Api";

const header = [
  "idEnv",
  "Numéro envoyeur",
  "Numéro destinataire",
  "Date",
  "Montant",
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
  const [research, setResearch] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [numbers, setNumbers] = useState<string[]>([]);
  const [devises, setDevises] = useState<Devise[]>([]);
  //const [pays, setPays] = useState<String>("");

  const actionData = (item: DataSend, specifique: string) => {
    setSelectData(item);
    if (specifique === "edit") {
      // getClientNumbers();
      setEdit(true);
    } else if (specifique === "del") setDel(true);
  };

  const addBox = (add: boolean) => {
    // getClientNumbers();
    setAdd(add);
  };
  const getClientNumbers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/clients`);

      if (!response.ok) throw new Error("Request error");

      const res: DataClient[] = await response.json();
      setNumbers(res.map((item) => item.numTel));
    } catch (error) {
      throw new Error(`${error}`);
    }
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

      setData(res);

      console.log(res);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getInitialTotal = async () => {
    try {
      const response = await fetch(`${API_URL}/api/envoyer/recette/${devises[0].pays}`);
      if (response.status >= 400) throw new Error("Error request");
      const res = await response.json();
      console.log(res);
      setTotal(res);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getTotal = async (e : React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const response = await fetch(`${API_URL}/api/envoyer/recette/${e.target.value}`);
      if (response.status >= 400) throw new Error("Error request");
      const res = await response.json();
      console.log(res);
      setTotal(res);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getDevises = async ()=>{
    try {
      const response = await fetch(`${API_URL}/api/envoyer/devises`);
      if (response.status >= 400) throw new Error("Error request");
      const res:Devise[] = await response.json();
      console.log(res);
      setDevises(res)
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  const generatePDF = async ({ numTel, mois, annee }: DataPDF) => {
    try {
      const response = await fetch(
        `${API_URL}/api/envoyer/pdf?numTel=${numTel}&mois=${mois}&annee=${annee}`
      );
      if (response.status >= 400) throw new Error("Error request");
      const res = await response.blob();

      const fileURL = URL.createObjectURL(res);

      const downloadLink = document.createElement("a");
      downloadLink.href = fileURL;
      downloadLink.download = `${numTel}.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getClientNumbers();

  }, []);

  useEffect(() => {
    const searchByData = async (research: string) => {
      try {
        if (!research) {
          fetchData();
          return;
        }
        const response = await fetch(`${API_URL}/api/envoyer/${research}`);

        if (!response.ok) throw new Error("Request Error");

        const res = await response.json();
        setData(res);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    searchByData(research);
  }, [research]);
  useEffect(() => {
    fetchData();
    getDevises()
  }, []);
  useEffect(()=>{
    getInitialTotal()
  },[devises])

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-lg font-medium text-gray-700">Recette total</h1>
        <div className="bg-white w-70 h-10 flex items-center justify-center gap-8  border border-slate-200 rounded shadow-sm">
          <span className="text-slate-700 font-medium">{total}</span>
          <select name="devise" id="devise" onChange={getTotal}>
            {devises.map((item)=>
              <option key={item.pays} value={item.pays}>{item.devise}</option>
            )}
          </select>
        </div>
      </div>
      <Table
        data={data}
        header={header}
        title="Listes des Envois"
        name="Envois"
        action={actionData}
        handleAdd={addBox}
        search
        date
        handeSearch={setResearch}
      />

      <div className="mt-[100px]">
        <h2>Generer PDF</h2>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-black-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Générer PDF
          </h2>
          <div className="max-w-md mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const date = (
                  form.elements.namedItem("date") as HTMLInputElement
                ).value;
                const [annee, mois] = date.split("-");
                const dataPDF = {
                  numTel: (form.elements.namedItem("num") as HTMLInputElement)
                    .value,
                  mois: parseInt(mois),
                  annee: parseInt(annee),
                };

                generatePDF(dataPDF);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="num"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Numéro du client
                  </label>
                  <select
                    name="num"
                    id="num"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="">Choisissez le numéro</option>
                    {numbers.map((number) => (
                      <option value={number} key={number} className="text-sm">
                        {number}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Période
                  </label>
                  <input
                    type="month"
                    name="date"
                    id="date"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 text-sm font-medium transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 text-sm font-medium transition-colors"
                >
                  Générer PDF
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

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
              <select
                // type="text"
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
              >
                {numbers.map((number) => (
                  <option value={number} key={number}>
                    {number}
                  </option>
                ))}
              </select>

              <label
                htmlFor="numRecepteur"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro Recepteur
              </label>
              <select
                // type="text"
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
              >
                {numbers.map((number) => (
                  <option value={number} key={number}>
                    {number}
                  </option>
                ))}
              </select>

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
                montant: parseFloat(
                  (form.elements.namedItem("montant") as HTMLInputElement).value
                ),
                raison: (form.elements.namedItem("raison") as HTMLInputElement)
                  .value,
              };

              addEnvois(newData as DataSend);
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
              <select
                name="numEnvoyeur"
                id="numEnvoyeur"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Choisissez le numéro</option>
                {numbers.map((number) => (
                  <option value={number} key={number}>
                    {number}
                  </option>
                ))}
              </select>

              <label
                htmlFor="numRecepteur"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro du récepteur
              </label>
              <select
                name="numRecepteur"
                id="numRecepteur"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Choisissez le numéro</option>

                {numbers.map((number) => (
                  <option value={number} key={number}>
                    {number}
                  </option>
                ))}
              </select>

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
