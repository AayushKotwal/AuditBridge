"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import ControlsTable from "@/components/controls/ControlsTable";
import AddControlModal from "@/components/controls/AddControlModal";

export default function ControlsPage() {
  const [controls, setControls] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  async function loadControls() {
    const res = await api.get("/controls");
    setControls(res.data);
  }

  useEffect(() => {
    loadControls();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.trim() === "") {
        loadControls();
      } else {
        const res = await api.get(
          `/controls/search?q=${encodeURIComponent(search)}`
        );

        setControls(res.data);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Controls
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage compliance controls across frameworks.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="
            cursor-pointer
            flex
            items-center
            gap-2

            bg-rose-950
            hover:bg-rose-900

            text-rose-400

            px-4
            py-2.5

            rounded-xl

            transition-all
            duration-200

            border
            border-transparent

            hover:border-rose-500/40
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14M5 12h14"
            />
          </svg>

          <span className="font-semibold">
            Add Control
          </span>
        </button>
      </div>

      <div
  className="
    mb-8

    flex
    items-center
    gap-4

    rounded-2xl

    border
    border-zinc-800

    bg-zinc-900/70

    backdrop-blur-xl

    p-3
  "
>
  {/* Search */}
  <div className="relative flex-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2

        w-5
        h-5

        text-zinc-500

        pointer-events-none
      "
    >
      <path d="M15 15L16.5 16.5" />

      <path d="M16.9333 19.0252C16.3556 18.4475 16.3556 17.5109 16.9333 16.9333C17.5109 16.3556 18.4475 16.3556 19.0252 16.9333L21.0667 18.9748C21.6444 19.5525 21.6444 20.4891 21.0667 21.0667C20.4891 21.6444 19.5525 21.6444 18.9748 21.0667L16.9333 19.0252Z" />

      <path d="M16.5 9.5C16.5 5.63401 13.366 2.5 9.5 2.5C5.63401 2.5 2.5 5.63401 2.5 9.5C2.5 13.366 5.63401 16.5 9.5 16.5C13.366 16.5 16.5 13.366 16.5 9.5Z" />
    </svg>

    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search controls..."
      className="
        w-full

        rounded-xl

        bg-transparent

        pl-12
        pr-10
        py-3

        text-white

        placeholder:text-zinc-500

        outline-none
      "
    />

    {search && (
      <button
        onClick={() => setSearch("")}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2

          w-7
          h-7

          rounded-full

          bg-zinc-800

          hover:bg-rose-600

          text-zinc-400
          hover:text-white

          transition
        "
      >
        ×
      </button>
    )}
  </div>

  {/* Framework Filter */}
  <select
    className="
      rounded-xl

      bg-zinc-800

      border
      border-zinc-700

      px-4
      py-3

      text-sm

      outline-none

      hover:border-rose-500

      transition
    "
  >
    <option>Framework</option>
    <option>SOC 2</option>
    <option>ISO 27001</option>
    <option>NIST</option>
    <option>HIPAA</option>
  </select>

  {/* Status Filter */}
  <select
    className="
      rounded-xl

      bg-zinc-800

      border
      border-zinc-700

      px-4
      py-3

      text-sm

      outline-none

      hover:border-rose-500

      transition
    "
  >
    <option>Status</option>
    <option>Active</option>
    <option>Pending</option>
    <option>Failed</option>
      </select>
    </div>

      <ControlsTable controls={controls} />

      <AddControlModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={loadControls}
      />
    </div>
  );
}