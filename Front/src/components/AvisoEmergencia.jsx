// Aviso fijo bajo el encabezado, en todas las páginas: la plataforma
// no reemplaza atención profesional y no es canal de emergencia.
function AvisoEmergencia() {
  return (
    <div className="border-b border-rojo/30 bg-rojo-fondo">
      <p className="contenedor py-2.5 text-sm text-texto">
        <strong className="text-rojo">No es un canal de emergencia.</strong>{' '}
        Si necesitas ayuda ahora, llama a{' '}
        <a href="tel:6003607777" className="font-semibold text-rojo underline">Salud Responde 600 360 7777</a>{' '}
        o a <a href="tel:131" className="font-semibold text-rojo underline">Emergencias 131</a>.
      </p>
    </div>
  )
}

export default AvisoEmergencia
