import { BUTTON, EVENT } from '../utils/const.js'
// crear navegación sin reacargar página
// Cambiar la url de la barra de direciones
export function navigate (href) {
  // cambia la url que se ve en el browser, a la que se quiere ir
  window.history.pushState({}, '', href)
  // Crear evento perzonalizado para avisar que se a creado la url
  const navigationEvent = new Event(EVENT.PUSHSTATE)
  // Despachar el evento
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTON.primary // botón redecho del mouse
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey // si se oprimen teclar Mayusculas, alt, ctrl, shift
    const isManageableEvent = target === undefined || target === '_self' // si enlace se abre en la misma ventana

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      // Omite el compatamiento del elemento a
      // No se refresca toda la pagina
      event.preventDefault()
      navigate(to) // Navegación con SPA
    }
  }
  // No se define directamente el children por que al pasar las ...props
  // se esta incluyendo la propiedad children={props.children}
  // <a onClick={handleClick} href={to} target={target} children={props.children} {...props} />
  return <a onClick={handleClick} href={to} target={target} {...props} />
}
