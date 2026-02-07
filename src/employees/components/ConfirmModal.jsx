const ConfirmModal = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Yes",
  cancelText = "No",
  processing = false,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        <p className="mt-2 text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={processing}
            className={`px-4 py-2 rounded border
              ${
                processing
                  ? "opacity-50 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={processing}
            className={`px-4 py-2 rounded text-white
              ${
                processing
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }
            `}
          >
            {processing ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
