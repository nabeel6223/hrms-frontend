import { useState } from "react";

export default function EditAttendanceModal({ data, onClose, onSubmit }) {
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (status) => {
    try {
      setProcessing(true);
      await onSubmit(status);
      onClose();
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 ${
          processing ? "pointer-events-none" : ""
        }`}
        onClick={() => !processing && onClose()}
      />

      <div className="relative bg-white p-6 rounded-xl w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">
          Edit Attendance – {data.date}
        </h3>

        <div className="flex gap-3">
          <button
            disabled={processing}
            className={`flex-1 py-2 rounded-lg text-white
              ${
                processing
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }
            `}
            onClick={() => handleSubmit(1)}
          >
            {processing ? "Processing..." : "Mark Present"}
          </button>

          <button
            disabled={processing}
            className={`flex-1 py-2 rounded-lg text-white
              ${
                processing
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }
            `}
            onClick={() => handleSubmit(0)}
          >
            {processing ? "Processing..." : "Mark Absent"}
          </button>
        </div>

        <button
          disabled={processing}
          onClick={onClose}
          className={`mt-4 text-sm underline
            ${processing ? "text-gray-400 cursor-not-allowed" : "text-gray-600"}
          `}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
