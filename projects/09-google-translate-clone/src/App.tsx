import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'

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
  console.log({ fromLanguage })
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
