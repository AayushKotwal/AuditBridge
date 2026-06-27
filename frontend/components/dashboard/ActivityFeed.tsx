export default function ActivityFeed() {
    const activity = [
      { text: "Evidence uploaded", time: "2m" },
      { text: "Control reviewed", time: "10m" },
      { text: "Finding created", time: "1h" },
    ];
  
    return (
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Recent Activity
        </h2>
  
        <div className="space-y-3">
          {activity.map((item) => (
            <div
              key={item.text}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-zinc-300">
                  {item.text}
                </span>
              </div>
  
              <span className="text-xs text-zinc-500">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }