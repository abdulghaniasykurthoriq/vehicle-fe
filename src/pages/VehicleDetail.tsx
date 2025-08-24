function VehicleDetail() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-4 space-y-4">
        <>
          <h1 className="text-xl font-semibold">Vehicle Detail</h1>
          <div className="space-y-1 bg-white p-4 rounded-xl border">
            <p>
              <b>Plate:</b> e 67 pav
            </p>
            <p>
              <b>Model:</b> brand model tahun
            </p>
          </div>

          <div className="flex items-end gap-2">
            <div>
              <label className="block text-sm">Date</label>
              <input
                type="date"
                className="input"
                value={0}
                onChange={(e) => {}}
              />
            </div>
          </div>

          <div className="p-3 border rounded-xl bg-white">
            <p>
              Status on 17 juli 2000: <b className="uppercase">active</b>
            </p>
          </div>
        </>
      </div>
    </div>
  );
}

export default VehicleDetail;
