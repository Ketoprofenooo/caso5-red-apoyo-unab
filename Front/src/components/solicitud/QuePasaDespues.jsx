// Columna lateral de la solicitud: qué sigue después de enviar
// y el recordatorio de que esto no es un canal de emergencia.
const pasos = [
  'Recibes un folio para seguir tu solicitud.',
  'Un orientador la revisa y la asigna.',
  'Te contactan para agendar la primera cita.',
]

function QuePasaDespues() {
  return (
    <aside className="space-y-5 text-sm">
      <div className="border border-borde bg-fondo-gris p-5">
        <h2 className="text-xl">Qué pasa después</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-texto-suave">
          {pasos.map((paso) => <li key={paso}>{paso}</li>)}
        </ol>
      </div>
      <div className="border border-rojo bg-rojo-fondo p-5">
        <h2 className="text-xl text-rojo">¿Es ahora?</h2>
        <p className="mt-2">
          Si sientes que no puedes esperar, no uses este formulario: llama a Salud Responde{' '}
          <strong>600 360 7777</strong> o a Emergencias <strong>131</strong>.
        </p>
      </div>
    </aside>
  )
}

export default QuePasaDespues
