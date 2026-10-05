// Muestra lo que pasó después de entrar o de crear la cuenta.
// filas es un arreglo de { etiqueta, valor } y children son los botones.
function Resultado({ titulo, filas, pie, children }) {
  return (
    <div className="mt-6">
      <h3 className="text-2xl">{titulo}</h3>
      <dl className="mt-4 divide-y divide-borde border-y border-borde">
        {filas.map((fila) => (
          <div key={fila.etiqueta} className="flex justify-between gap-4 py-2 text-sm">
            <dt className="text-texto-suave">{fila.etiqueta}</dt>
            <dd className="text-right font-medium">{fila.valor}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-sm text-texto-suave">{pie}</p>
      <div className="mt-4 flex flex-col gap-2">{children}</div>
    </div>
  )
}

export default Resultado
