// src/types.ts
export interface Vehicle {
  id: string;
  // tambahkan field nyata kalau sudah tahu; sementara biar aman:
  [key: string]: any;
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
