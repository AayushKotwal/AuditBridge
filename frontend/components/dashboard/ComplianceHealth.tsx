export default function ComplianceHealth() {
    return (
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">
            Compliance Health
          </h2>
  
          <span className="text-rose-300 font-semibold">
            92%
          </span>
        </div>
  
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-700 to-rose-500 rounded-full"
            style={{ width: "92%" }}
          />
        </div>
      </section>
    );
  }