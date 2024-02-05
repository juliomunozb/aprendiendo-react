import React from 'react'
import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionType, type FromLanguage, type Language } from '../types.d'

/* interface Props {
  onchange: (language: Language) => void
} */
// Los Props se puede definir por cualquiera de los dos:
// 1. intreface
// 2. type
/* eslint-disable @typescript-eslint/indent */
type Props =
  | {
      type: SectionType.From
      value: FromLanguage
      onchange: (language: FromLanguage) => void
    }
  | {
      type: SectionType.To
      value: Language
      onchange: (language: Language) => void
    }

export const LanguageSelector: React.FC<Props> = ({
  onchange,
  type,
  value
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Se fuerza a typescript para decirle que el tipo
    // debe ser Language
    onchange(event.target.value as Language)
  }
  return (
    <Form.Select
      aria-label='Selecciona el idioma'
      onChange={handleChange}
      value={value}
    >
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGE}>Detectar idioma</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
