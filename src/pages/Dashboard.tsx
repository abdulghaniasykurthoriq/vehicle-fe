import { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [isLoading, setfirst] = useState(false);
  const [error, setfirsst] = useState(null);
  const items = [
    {
      id: "1",
      plateNumber: "B 1234 CD",
      brand: "Toyota",
      model: "Avanza",
      year: 2020,
    },
    {
      id: "2",
      plateNumber: "D 5678 EF",
      brand: "Honda",
      model: "Civic",
      year: 2019,
    },
    {
      id: "3",
      plateNumber: "E 9101 GH",
      brand: "Mitsubishi",
      model: "Xpander",
      year: 2021,
    },
    {
      id: "4",
      plateNumber: "F 1112 IJ",
      brand: "Suzuki",
      model: "Ertiga",
      year: 2018,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Vehicles</h1>

        <div className="flex flex-wrap items-end gap-2">
          <div>
            <label className="block text-sm">From</label>
            <input
              type="date"
              className="input"
              value={0}
              onChange={(e) => {}}
            />
          </div>
          <div>
            <label className="block text-sm">To</label>
            <input
              type="date"
              className="input"
              value={0}
              onChange={(e) => {}}
            />
          </div>
          <button className="btn" onClick={() => {}}>
            Download .xlsx
          </button>
        </div>

        {isLoading ? (
          <p>Loading…</p>
        ) : error ? (
          <p className="text-red-600">Failed to load</p>
        ) : (
          <>
            <div className="overflow-auto border rounded-xl bg-white">
              <table className="min-w-[700px] w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-2">Plate</th>
                    <th className="text-left p-2">Brand</th>
                    <th className="text-left p-2">Model</th>
                    <th className="text-left p-2">Year</th>
                    <th className="text-left p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((v: any) => (
                    <tr key={v.id} className="border-t">
                      <td className="p-2">{v.plateNumber}</td>
                      <td className="p-2">{v.brand}</td>
                      <td className="p-2">{v.model}</td>
                      <td className="p-2">{v.year}</td>
                      <td className="p-2">
                        <Link className="btn" to={`/vehicles/${v.id}`}>
                          Detail & Status
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td className="p-3" colSpan={5}>
                        No data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* // pagination */}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
