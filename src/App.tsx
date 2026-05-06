import { Header } from './components/Header/Header'
import { ConceptSection } from './components/ConceptSection/ConceptSection'

export default function App() {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--color-bg)' }}>
        <ConceptSection />
      </main>
    </>
  )
}
