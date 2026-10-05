import OpcionTarjeta from './OpcionTarjeta'

// Recorre una lista de opciones con map() y arma un OpcionTarjeta por
// cada una. Sirve para cualquier pregunta de "elige una sola".
function GrupoOpciones({ nombre, opciones, valor, alCambiar, error, columnas = 'md:grid-cols-2' }) {
  return (
    <div>
      <div className={`grid gap-3 ${columnas}`}>
        {opciones.map((opcion) => (
          <OpcionTarjeta
            key={opcion.valor}
            nombre={nombre}
            valor={opcion.valor}
            titulo={opcion.titulo}
            texto={opcion.texto}
            imagen={opcion.imagen}
            marcada={valor === opcion.valor}
            alCambiar={alCambiar}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-rojo">{error}</p>}
    </div>
  )
}

export default GrupoOpciones
