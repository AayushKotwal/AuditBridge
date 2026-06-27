interface Props {
    status: string;
  }
  
  export default function StatusBadge({
    status,
  }: Props) {
    const styles = {
      Active:
        "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  
      Pending:
        "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  
      Failed:
        "bg-red-500/15 text-red-400 border-red-500/20",
    };
  
    return (
      <span
        className={`
          px-3
          py-1
          rounded-full
          text-xs
          border
          ${styles[status as keyof typeof styles]}
        `}
      >
        {status}
      </span>
    );
  }