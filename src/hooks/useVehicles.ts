import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Vehicle, VehicleListResponse, VehicleStatus } from "../types";

export function useVehicles(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ["vehicles", page, pageSize],
    queryFn: async (): Promise<VehicleListResponse | Vehicle[]> => {
      const { data } = await api.get("/vehicles", {
        params: { page, pageSize },
      });
      return data;
    },
    keepPreviousData: true,
  });
}

export function useVehicle(id: string) {
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: async (): Promise<Vehicle> =>
      (await api.get(`/vehicles/${id}`)).data,
    enabled: !!id,
  });
}

export function useVehicleStatus(id: string, date: string) {
  return useQuery({
    queryKey: ["vehicle-status", id, date],
    queryFn: async (): Promise<VehicleStatus> =>
      (await api.get(`/vehicles/${id}/status`, { params: { date } })).data,
    enabled: !!id && !!date,
  });
}
