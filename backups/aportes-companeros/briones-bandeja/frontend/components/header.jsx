import { ClipboardList } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">

        <ClipboardList
          className="text-white"
          size={35}
        />

        <div>

          <h1 className="text-white text-2xl font-bold">
            Bandeja del Orientador
          </h1>

          <p className="text-blue-200 text-sm">
            Gestión de Solicitudes
          </p>

        </div>

      </div>
    </header>
  );
}