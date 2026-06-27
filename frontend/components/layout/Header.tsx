export default function Header() {
  return (
    <header
      className="
        flex
        items-center
        justify-between
        mb-8
      "
    >
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Dashboard
        </h1>

        
      </div>

      <div
        className="
          px-4
          py-2

          rounded-xl

          bg-zinc-900/70
          border
          border-zinc-800

          text-sm
          text-zinc-300

          backdrop-blur-sm
        "
      >
        Admin
      </div>
    </header>
  );
}