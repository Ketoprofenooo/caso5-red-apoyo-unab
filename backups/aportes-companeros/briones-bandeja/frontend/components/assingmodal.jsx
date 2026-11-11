import { useState } from "react";

export default function AssignModal({
  request,
  onClose,
  onSave
}) {

  const [professional,
    setProfessional] =
    useState("");

  const handleSave = () => {

    if (!professional)
      return;

    onSave(
      request._id,
      professional
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">

        <h2 className="text-xl font-bold mb-4">
          Asignar Profesional
        </h2>

        <p className="mb-4">
          {request.student}
        </p>

        <select
          value={professional}
          onChange={(e) =>
            setProfessional(
              e.target.value
            )
          }
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option value="">
            Seleccione
          </option>

          <option>
            Psicólogo
          </option>

          <option>
            Orientador
          </option>

          <option>
            Trabajador Social
          </option>
        </select>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Guardar
          </button>

        </div>

      </div>

    </div>
  );
}