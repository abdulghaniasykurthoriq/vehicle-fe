import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useVehicles } from "../hooks/useVehicles";
import Pagination from "../components/Pagination";
import { downloadReport } from "../services/report";
import { Link } from "react-router-dom";

type Vehicle = {
  id: string;
  plateNumber: string;
  brand: string;
  model: string;
  year: number;
};

type VehiclesResponse = {
  items: Vehicle[];
  total: number;
};

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, error } = useVehicles(page, pageSize) as { data: VehiclesResponse | Vehicle[] | undefined, isLoading: boolean, error: any };
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const items = Array.isArray(data) ? data : data?.items ?? [];
  const total = Array.isArray(data) ? undefined : data?.total ;

  useEffect(() => {
    const t = new Date().toISOString().slice(0, 10);
    setFrom(t);
    setTo(t);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Vehicles</h1>

        <div className="flex flex-wrap items-end gap-2">
          <div>
            <label className="block text-sm">From</label>
            <input
              type="date"
              className="input"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm">To</label>
            <input
              type="date"
              className="input"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <button
            className="btn"
            onClick={() =>
              downloadReport({ from, to }).catch((err) => alert(err.message))
            }
          >
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
            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
