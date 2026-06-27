export default function RecentFindings() {
    const findings = [
      "Missing Access Review",
      "Password Policy Update",
      "Vendor Assessment Pending",
    ];
  
    return (
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Recent Findings
        </h2>
  
        <div className="space-y-3">
          {findings.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-zinc-300"
            >
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              {item}
            </div>
          ))}
        </div>
      </section>
    );
  }