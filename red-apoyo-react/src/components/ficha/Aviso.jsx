// Un aviso enviado al estudiante. lista=true se ve con ✓ verde;
// si todavía está pendiente, con ! ámbar.
function Aviso({ titulo, texto, lista }) {
  return (
    <li className="flex gap-3 border border-borde bg-fondo p-4">
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center text-sm font-bold ${
          lista ? 'bg-verde text-white' : 'bg-ambar-fondo text-ambar'
        }`}
      >
        {lista ? '✓' : '!'}
      </span>
      <div>
        <p className="font-semibold">{titulo}</p>
        <p className="text-sm text-texto-suave">{texto}</p>
      </div>
    </li>
  )
}

export default Aviso
