"use client";

type Props = {
  icon: React.ReactNode;
  label: string;
};

export default function SidebarItem({
  icon,
  label,
}: Props) {
  return (
    <div className="group relative flex justify-center">
      <button
        className="
        h-12
        w-12
        rounded-2xl

        flex
        items-center
        justify-center

        text-zinc-400

        hover:text-rose-300
        hover:bg-rose-950/30

        transition-all
        duration-300
        "
      >
        {icon}
      </button>

      <div
        className="
        absolute
        left-16
        top-1/2
        -translate-y-1/2

        px-3
        py-2

        rounded-xl

        bg-zinc-900
        border
        border-rose-900/40

        text-sm
        whitespace-nowrap

        opacity-0
        translate-x-2

        group-hover:opacity-100
        group-hover:translate-x-0

        transition-all
        duration-300
        pointer-events-none
        "
      >
        {label}
      </div>
    </div>
  );
}