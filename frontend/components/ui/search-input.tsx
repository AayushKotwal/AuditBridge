"use client";

import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  loading = false,
}: SearchInputProps) {
  return (
    <div
      className="
        relative
        w-full

        group

        transition-all
        duration-300
      "
    >
      <div
        className="
          absolute
          inset-0

          rounded-2xl

          bg-gradient-to-r
          from-rose-500/0
          via-rose-500/20
          to-rose-500/0

          opacity-0

          group-focus-within:opacity-100

          blur-xl

          transition-all
          duration-300
        "
      />

      <div
        className="
          relative

          flex
          items-center

          rounded-2xl

          border
          border-zinc-800

          bg-zinc-900/80

          backdrop-blur-xl

          transition-all
          duration-300

          group-focus-within:border-rose-500/60
        "
      >
        <Search
          size={18}
          className="
            ml-4

            text-zinc-500

            group-focus-within:text-rose-400

            transition
          "
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            flex-1

            bg-transparent

            px-3
            py-3

            outline-none

            text-white

            placeholder:text-zinc-500
          "
        />

        {loading && (
          <div
            className="
              mr-4

              h-4
              w-4

              rounded-full

              border-2
              border-zinc-600
              border-t-rose-400

              animate-spin
            "
          />
        )}

        {!loading && value && (
          <button
            onClick={() => onChange("")}
            className="
              mr-3

              flex
              items-center
              justify-center

              rounded-full

              p-1

              text-zinc-500

              hover:bg-zinc-800
              hover:text-white

              transition
            "
          >
            <X size={15} />
          </button>
        )}
      </div>
    </div>
  );
}