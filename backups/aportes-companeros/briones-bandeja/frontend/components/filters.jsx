export default function Filters({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter
}) {

  return (
    <div className="bg-white rounded-xl shadow p-5 mb-6">

      <div className="grid md:grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Buscar estudiante..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg px-4 py-3"
        />

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
          className="border rounded-lg px-4 py-3"
        >

          <option value="">
            Todos los tipos
          </option>

          <option value="Emocional">
            Emocional
          </option>

          <option value="Académico">
            Académico
          </option>

          <option value="Social">
            Social
          </option>

          <option value="Económico">
            Económico
          </option>

          <option value="Convivencia">
            Convivencia
          </option>

        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border rounded-lg px-4 py-3"
        >

          <option value="">
            Todos los estados
          </option>

          <option value="Pendiente">
            Pendiente
          </option>

          <option value="En Proceso">
            En Proceso
          </option>

          <option value="Cerrada">
            Cerrada
          </option>

        </select>

      </div>

    </div>
  );
}