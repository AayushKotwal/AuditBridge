interface Props {
  title: string;
  value: number;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/80
        backdrop-blur-xl
        p-4

        hover:border-rose-700/50
        hover:-translate-y-1

        transition-all
        duration-300
      "
    >
      <p
        className="
          text-xs
          uppercase
          tracking-wider
          text-zinc-500
        "
      >
        {title}
      </p>

      <h2
        className="
          mt-1
          text-3xl
          font-bold
          text-white
        "
      >
        {value}
      </h2>

      <div
        className="
          absolute
          -right-10
          -top-10
          h-20
          w-20
          rounded-full
          bg-rose-700/10
          blur-3xl
        "
      />
    </div>
  );
}