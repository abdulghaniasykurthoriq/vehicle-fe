// src/hooks/useVehicles.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Vehicle, Paginated } from "../types";

type Params = { page: number; pageSize: number; search?: string };

export function useVehicles({ page, pageSize, search = "" }: Params) {
  return useQuery({
    queryKey: ["vehicles", { page, pageSize, search }],
    queryFn: async (): Promise<Paginated<Vehicle>> => {
      const base = import.meta.env.VITE_API_URL ?? "";
      const url = new URL("/vehicles", base);
      url.searchParams.set("page", String(page));
      url.searchParams.set("pageSize", String(pageSize));
      if (search) url.searchParams.set("search", search);

      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch vehicles");
      return res.json();
    },
    // v5: ini pengganti keepPreviousData: true
    placeholderData: keepPreviousData,
    // opsional recommended di v5
    refetchOnWindowFocus: false,
    staleTime: 30_000,
  });
}
