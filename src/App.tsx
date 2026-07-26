import { AppHeader } from './components/AppHeader'
import { BookShelf } from './components/BookShelf'
import { BookSearchForm } from './components/BookSearchForm'
import './App.css'

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <BookShelf />
        <BookSearchForm />
      </main>
    </>
  )
}

export default App