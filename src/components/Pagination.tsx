type Props = {
  page: number;
  pageSize: number;
  total?: number;
  onPageChange: (p: number) => void;
};
export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
}: Props) {
  const totalPages = total
    ? Math.max(1, Math.ceil(total / pageSize))
    : page + 1;
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>
      <span className="text-sm">
        Page {page} / {totalPages}
      </span>
      <button
        className="btn"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
