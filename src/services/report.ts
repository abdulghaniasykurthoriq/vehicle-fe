// src/services/report.ts
import { api } from "../lib/api";

function filenameFromContentDisposition(cd?: string, fallback?: string) {
  if (!cd) return fallback;
  // filename*=UTF-8''<encoded> atau filename="<plain>"
  const m =
    cd.match(/filename\*=UTF-8''([^;]+)/i)?.[1] ??
    cd.match(/filename="?([^";]+)"?/i)?.[1];
  try {
    return m ? decodeURIComponent(m) : fallback;
  } catch {
    return m || fallback;
  }
}

export async function downloadReport({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  // optional guard tanggal
  if (!from || !to) throw new Error("Tanggal from/to wajib diisi");
  if (from > to) throw new Error("Range tanggal tidak valid (from > to)");

  const res = await api.get("/reports/trips.xlsx", {
    params: { from, to },
    responseType: "blob",
    // headers: { Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" } // optional
  });

  // Kalau server ngirim error JSON tapi kita expect blob, kasih pesan jelas
  const ct = String(res.headers["content-type"] || "");
  if (ct.includes("application/json")) {
    const text = (await res.data
      .text?.() // Blob punya .text() di browser modern
      .catch(() => "")) as string;
    try {
      const j = JSON.parse(text || "{}");
      throw new Error(j?.message || "Gagal membuat laporan");
    } catch {
      throw new Error("Gagal membuat laporan");
    }
  }

  const suggested = filenameFromContentDisposition(
    res.headers["content-disposition"] as string | undefined,
    `trips_${from}_${to}.xlsx`
  );

  const blob = res.data as Blob; // axios dengan responseType: "blob"
  const url = URL.createObjectURL(blob);

  // Buat anchor dan trigger download
  const a = document.createElement("a");
  a.href = url;
  a.download = suggested || "download.xlsx";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
