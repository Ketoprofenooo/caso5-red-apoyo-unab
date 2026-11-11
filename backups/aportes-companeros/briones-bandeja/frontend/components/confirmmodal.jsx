import { TriangleAlert } from "lucide-react";

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel
}) {

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">

        <div className="flex items-center gap-3 mb-4">

          <TriangleAlert
            size={30}
            className="text-red-600"
          />

          <h2 className="text-xl font-bold">
            {title}
          </h2>

        </div>

        <p className="mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Confirmar
          </button>

        </div>

      </div>

    </div>
  );
}