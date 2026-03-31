import { Routes, Route } from 'react-router-dom'
import { QuizProvider } from './context/QuizContext'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import Result from './pages/Result'

function App() {
  return (
    <QuizProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </QuizProvider>
  )
}

export default App