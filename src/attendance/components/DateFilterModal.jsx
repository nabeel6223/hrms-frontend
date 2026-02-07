import { useState } from "react";

export function DateFilterModal({ dateRange, onClose, onApply }) {
  const [from, setFrom] = useState(dateRange.from);
  const [to, setTo] = useState(dateRange.to);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Filter Attendance
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={() => onApply({ from, to })}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
