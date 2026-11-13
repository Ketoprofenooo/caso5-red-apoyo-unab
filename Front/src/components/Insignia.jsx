// Etiqueta chica de color para estados y urgencias.
// tono puede ser: verde, ambar, rojo o gris.
const colores = {
  verde: 'bg-menta text-verde',
  ambar: 'bg-ambar-fondo text-ambar',
  rojo: 'bg-rojo-fondo text-rojo',
  gris: 'bg-fondo-gris text-texto-suave border border-borde',
}

function Insignia({ texto, tono = 'gris' }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold capitalize ${colores[tono]}`}>
      {texto}
    </span>
  )
}

export default Insignia
