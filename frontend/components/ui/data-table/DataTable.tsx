"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,

    columns,

    state: {
      sorting,
      globalFilter,
    },

    onSortingChange: setSorting,

    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950/60
        backdrop-blur-xl
        overflow-hidden
      "
    >
      <table className="w-full">
        <thead className="bg-zinc-900/80">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="
                    px-6
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-zinc-300
                    border-b
                    border-zinc-800
                  "
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>

        {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="
                  border-b
                  border-zinc-900

                  hover:bg-zinc-900/40

                  transition-colors
                  duration-200
                "
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="
                      px-6
                      py-4

                      text-sm
                      text-zinc-300
                    "
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="
                  py-20
                  text-center
                  text-zinc-500
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      w-14
                      h-14

                      rounded-full

                      bg-zinc-900

                      flex
                      items-center
                      justify-center
                    "
                  >
                    📄
                  </div>

                  <div>
                    <h3
                      className="
                        text-white
                        font-semibold
                      "
                    >
                      No data found
                    </h3>

                    <p className="text-sm mt-1">
                      Try changing your filters.
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        className="
          flex
          items-center
          justify-between

          px-6
          py-4

          border-t
          border-zinc-800

          bg-zinc-950
        "
      >
        <p className="text-sm text-zinc-500">
          Showing{" "}
          <span className="text-white font-medium">
            {table.getRowModel().rows.length}
          </span>{" "}
          entries
        </p>

        <div className="flex items-center gap-2">
        <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="
              px-4
              py-2

              rounded-xl

              border
              border-zinc-800

              bg-zinc-900

              text-zinc-300

              hover:bg-zinc-800

              disabled:opacity-40
              disabled:cursor-not-allowed

              transition-all
            "
          >
            Previous
          </button>

          <span
            className="
              px-3
              text-sm
              text-zinc-400
            "
          >
            Page{" "}
            <span className="text-white font-semibold">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            of{" "}
            <span className="text-white font-semibold">
              {table.getPageCount()}
            </span>
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="
              px-4
              py-2

              rounded-xl

              border
              border-zinc-800

              bg-zinc-900

              text-zinc-300

              hover:bg-zinc-800

              disabled:opacity-40
              disabled:cursor-not-allowed

              transition-all
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}