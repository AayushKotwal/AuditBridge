export default function ControlsOverview() {
    const controls = [
      { name: "Access Control", score: 92 },
      { name: "Vendor Management", score: 85 },
      { name: "Incident Response", score: 78 },
      { name: "Asset Inventory", score: 96 },
      { name: "Change Management", score: 88 },
    ];
  
    return (
      <div
        className="
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900/80
          backdrop-blur-xl
          p-5
        "
      >
        <h3 className="text-lg font-semibold mb-5">
          Controls Overview
        </h3>
  
        <div className="space-y-4">
          {controls.map((control) => (
            <div key={control.name}>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-300">
                  {control.name}
                </span>
  
                <span className="text-sm font-medium text-rose-300">
                  {control.score}%
                </span>
              </div>
  
              <div
                className="
                  h-2
                  rounded-full
                  bg-zinc-800/70
                  overflow-hidden
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-rose-900
                    via-rose-700
                    to-rose-300
                    shadow-[0_0_12px_rgba(225,29,72,0.25)]
                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${control.score}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }