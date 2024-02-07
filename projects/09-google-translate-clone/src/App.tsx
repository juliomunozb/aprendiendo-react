import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    setFromText,
    setResult,
    setFromLanguage,
    setToLanguage,
    interchangeLanguage
  } = useStore()

  const debouncedFromText = useDebounce(fromText)
  useEffect(() => {
    if (debouncedFromText === '') return
    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        // en typescript con el  == se hace la comprobación de null y tambien undefined
        if (result == null) return
        setResult(result)
      })
      .catch(() => {
        setResult('Error')
      })
    console.log(debouncedFromText, 'useEffect')
  }, [debouncedFromText, fromLanguage, toLanguage])
  return (
    <>
      <Container fluid>
        <h2>Google Translate</h2>
        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onchange={setFromLanguage}
              />
              <TextArea
                type={SectionType.From}
                placeholder='Introducir texto'
                value={fromText}
                onChange={setFromText}
                loading={loading}
              />
            </Stack>
          </Col>
          <Col xs='auto'>
            <Button
              variant='link'
              disabled={fromLanguage === AUTO_LANGUAGE}
              onClick={interchangeLanguage}
            >
              <ArrowsIcon />
            </Button>
          </Col>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onchange={setToLanguage}
              />
              <TextArea
                placeholder='Traducción'
                type={SectionType.To}
                value={result}
                onChange={setResult}
                loading={loading}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
