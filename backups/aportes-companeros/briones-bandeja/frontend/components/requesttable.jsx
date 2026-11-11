import RequestRow from "./requestrow";

export default function RequestTable({
  requests,
  onAssign,
  onChangeStatus,
  onCloseRequest,
  onReopen
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-blue-900 text-white">

            <tr>
              <th className="p-4">
                ID
              </th>
              <th>Estudiante</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Urgencia</th>
              <th>Estado</th>
              <th>Profesional</th>
              <th>Fecha Cierre</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {requests.map(
              (request) => (
                <RequestRow
                  key={request._id}
                  request={request}
                  onAssign={
                    onAssign
                  }
                  onChangeStatus={
                    onChangeStatus
                  }
                  onCloseRequest={
                    onCloseRequest
                  }
                  onReopen={
                    onReopen
                  }
                />
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}