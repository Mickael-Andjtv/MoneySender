import type {
  DataClient,
  DataRate,
  DataSend,
  DataSendCosts,
} from "./services/Data";

interface TableProps<
  T extends DataClient | DataSend | DataSendCosts | DataRate
> {
  data: T[];
  header: Array<string>;
  title: string;
  name: string;
  action: (data: T, specifique: string) => void;
  handleAdd: (add: boolean) => void;
  search: boolean;
  handeSearch?: (pattern: string) => void;
}

export default function Table<
  T extends DataClient | DataSend | DataSendCosts | DataRate
>({
  data,
  header,
  title,
  name,
  action,
  handleAdd,
  search,
  handeSearch,
}: TableProps<T>) {
  return (
    <>
      <div className="w-full flex justify-between items-center pl-3 mt-20 mb-10">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <p className="text-slate-500">Apperçus des {name} .</p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-100"
          onClick={() => handleAdd(true)}
        >
          Ajout
        </button>
        {search && (
          <div className="ml-3">
            <div className="w-full max-w-sm min-w-[200px] relative">
              <div className="relative">
                <input
                  type={"numTel" in data ? "text" : "date"}
                  onChange={(e) => handeSearch && handeSearch(e.target.value)}
                  className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                  placeholder={`rechercher...`}
                />
                <button
                  className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="3"
                    stroke="currentColor"
                    className="w-8 h-8 text-slate-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          <table className="w-full text-left table-auto">
            <thead className="sticky top-0 z-10 bg-slate-50">
              <tr>
                {header.map((head, index) => (
                  <th
                    className="p-4 border-b border-slate-300"
                    key={index}
                  >
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      {head}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  className="hover:bg-slate-50 border-b border-slate-200"
                  key={
                    "numTel" in item
                      ? item.numTel
                      : "idTaux" in item
                      ? item.idTaux
                      : "idFrais" in item
                      ? item.idFrais
                      : item.idEnv
                  }
                >
                  {Object.keys(item).map((key) => {
                    const value = item[key as keyof typeof item];
                    const displayValue =
                      value instanceof Date
                        ? value.toLocaleDateString()
                        : typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value);
                    return (
                      <td className="p-4 py-5" key={key}>
                        <p className="block font-semibold text-sm text-slate-800">
                          {displayValue}
                        </p>
                      </td>
                    );
                  })}
                  <td className="p-4 py-5">
                    <div className="block text-center">
                      <button
                        className="text-slate-600 hover:text-slate-800"
                        onClick={() => action(item, "del")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="red"
                          className="w-4 h-4"
                        >
                          <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                          <path
                            fill-rule="evenodd"
                            d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        className="text-slate-600 hover:text-slate-800"
                        onClick={() => {
                          action(item, "edit");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#10B981"
                          className="w-4 h-4"
                        >
                          <path d="M4 20h4l10.293-10.293a1 1 0 0 0 0-1.414l-2.586-2.586a1 1 0 0 0-1.414 0L4 16v4zM20.707 7.293a1 1 0 0 0 0-1.414l-2.586-2.586a1 1 0 0 0-1.414 0l-.586.586 4 4 .586-.586z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!data.length && (
            <div className="p-4 text-center">
              <h2>{name} vide pour le moment</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}