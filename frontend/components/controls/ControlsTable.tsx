"use client";

import StatusBadge from "./StatusBadge";

interface Control {
  id: number;
  control_id: string;
  title: string;
  description?: string;
  framework: string;
  status: string;
  review_frequency: string;
  owner_id?: number | null;
}

interface Props {
  controls: Control[];
}

export default function ControlsTable({
  controls,
}: Props) {
  return (
    <div
    className="
    rounded-2xl
    border
    border-zinc-800
    bg-zinc-950/70
    backdrop-blur-xl
    overflow-hidden
    shadow-xl
    shadow-black/20
    "
    >
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left p-4 text-zinc-400">
              Control ID
            </th>

            <th className="text-left p-4 text-zinc-400">
              Title
            </th>

            <th className="text-left p-4 text-zinc-400">
              Framework
            </th>

            <th className="text-left p-4 text-zinc-400">
              Review
            </th>

            <th className="text-left p-4 text-zinc-400">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {controls.map((control) => (
            <tr
              key={control.id}
              className="
                border-b
                border-zinc-800/50
                hover:bg-zinc-800/30
                transition
              "
            >
              <td className="p-4 font-medium">
                {control.control_id}
              </td>

              <td className="p-4">
                <div className="font-medium">
                  {control.title}
                </div>

                {control.description && (
                  <div className="text-xs text-zinc-500 mt-1">
                    {control.description}
                  </div>
                )}
              </td>

              <td className="p-4">
                {control.framework}
              </td>

              <td className="p-4">
                {control.review_frequency}
              </td>

              <td className="p-4">
                <StatusBadge status={control.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {controls.length === 0 && (
        <div className="p-10 text-center text-zinc-500">
          No controls found.
        </div>
      )}
    </div>
  );
}