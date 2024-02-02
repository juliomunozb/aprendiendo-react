import React from 'react'
import { Form } from 'react-bootstrap'
import { SUPPORTED_LANGUAGES } from '../constants'
import { type Language } from '../types'

interface Props {
  onchange: (language: Language) => void
}

export const LanguageSelector: React.FC<Props> = ({ onchange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Se fuerza a typescript para decirle que el tipo
    // debe ser Language
    onchange(event.target.value as Language)
  }
  return (
    <Form.Select aria-label='Selecciona el idioma' onChange={handleChange}>
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
