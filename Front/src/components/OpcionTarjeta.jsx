// Opción grande y clickeable (radio o checkbox con forma de tarjeta).
// marcada viene del estado del formulario; alCambiar lo actualiza.
function OpcionTarjeta({ tipo = 'radio', nombre, valor, titulo, texto, imagen, marcada, alCambiar }) {
  return (
    <label
      className={`flex cursor-pointer gap-3 border p-3 transition-colors ${
        marcada ? 'border-verde bg-menta' : 'border-borde bg-fondo hover:border-verde-claro'
      }`}
    >
      <input
        type={tipo}
        name={nombre}
        value={valor}
        checked={marcada}
        onChange={alCambiar}
        className="mt-1 accent-verde"
      />
      {imagen && <img src={imagen} alt="" loading="lazy" className="h-14 w-14 shrink-0 object-cover" />}
      <span>
        <span className="block font-semibold text-texto">{titulo}</span>
        {texto && <span className="block text-sm text-texto-suave">{texto}</span>}
      </span>
    </label>
  )
}

export default OpcionTarjeta
