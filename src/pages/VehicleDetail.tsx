import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useVehicle, useVehicleStatus } from "../hooks/useVehicles";

export default function VehicleDetail() {
  const { id = "" } = useParams();
  const [date, setDate] = useState("");
  const { data: v, isLoading: lv, error: ev } = useVehicle(id);
  const { data: s, isLoading: ls } = useVehicleStatus(id, date);

  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="p-4 space-y-4">
        {lv ? (
          <p>Loading…</p>
        ) : ev || !v ? (
          <p className="text-red-600">Vehicle not found</p>
        ) : (
          <>
            <h1 className="text-xl font-semibold">Vehicle Detail</h1>
            <div className="space-y-1 bg-white p-4 rounded-xl border">
              <p>
                <b>Plate:</b> {v.plateNumber}
              </p>
              <p>
                <b>Model:</b> {v.brand} {v.model} ({v.year})
              </p>
            </div>

            <div className="flex items-end gap-2">
              <div>
                <label className="block text-sm">Date</label>
                <input
                  type="date"
                  className="input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="p-3 border rounded-xl bg-white">
              {ls ? (
                <p>Loading status…</p>
              ) : s ? (
                <p>
                  Status on {s.date}: <b className="uppercase">{s.status}</b>
                </p>
              ) : (
                <p>Pilih tanggal…</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
