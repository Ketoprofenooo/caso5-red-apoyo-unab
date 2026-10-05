// Cuadro con un número grande. Lo usan la bandeja (Briones) y los reportes (Mena).
const bordes = {
  verde: 'border-l-verde',
  ambar: 'border-l-ambar',
  rojo: 'border-l-rojo',
  gris: 'border-l-texto-suave',
}

function Kpi({ numero, titulo, detalle, tono = 'verde' }) {
  return (
    <div className={`border border-l-4 border-borde bg-fondo p-4 ${bordes[tono]}`}>
      <p className="font-titulo text-3xl text-verde">{numero}</p>
      <p className="font-medium">{titulo}</p>
      {detalle && <p className="text-sm text-texto-suave">{detalle}</p>}
    </div>
  )
}

export default Kpi
