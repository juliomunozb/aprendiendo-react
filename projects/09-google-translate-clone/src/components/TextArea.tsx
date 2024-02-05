import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  placeholder: string
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyles = { border: 0, height: '200px' }

export const TextArea = ({
  type,
  placeholder,
  loading,
  value,
  onChange
}: Props) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: '#f5f5f5' }
  return (
    <Form.Control
      as='textarea'
      autoFocus={type === SectionType.From}
      placeholder={placeholder}
      value={value}
      style={styles}
    />
  )
}
