// src/hooks/useVehicles.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Vehicle, Paginated } from "../types";
import { api } from "../lib/api"; // <-- sesuaikan path kalau beda

// ---- List Vehicles ----
type ListParams = { page: number; pageSize: number; search?: string };

export function useVehicles({ page, pageSize, search = "" }: ListParams) {
  return useQuery({
    queryKey: ["vehicles", { page, pageSize, search }],
    queryFn: async (): Promise<Paginated<Vehicle>> => {
      const { data } = await api.get<Paginated<Vehicle>>("/vehicles", {
        params: {
          page,
          pageSize,
          // kirim search hanya jika tidak kosong
          ...(search ? { search } : {}),
        },
      });
      return data;
    },
    // pengganti keepPreviousData: true di v4
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
  });
}

// ---- Vehicle Detail ----
export function useVehicle(id: string) {
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: async (): Promise<Vehicle> => {
      const { data } = await api.get<Vehicle>(`/vehicles/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 30_000,
  });
}

// ---- Vehicle Status per Date ----
export type VehicleStatus = { date: string; status: string; [k: string]: any };
type StatusParams = { vehicleId: string; date: string };

export function useVehicleStatus({ vehicleId, date }: StatusParams) {
  return useQuery({
    queryKey: ["vehicle-status", { vehicleId, date }],
    queryFn: async (): Promise<VehicleStatus> => {
      const { data } = await api.get<VehicleStatus>(
        `/vehicles/${vehicleId}/status`,
        { params: { date } }
      );
      return data;
    },
    enabled: !!vehicleId && !!date,
    staleTime: 30_000,
  });
}
