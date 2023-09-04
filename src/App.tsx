import './App.css'
import { Footer } from './app/common/Footer'
import { Navbar } from './app/common/Navbar'
import { Rutas } from './routes/Routes'

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex-grow pt-14 min-h-screen">
        <Rutas />
      </div>
      <Footer />
    </div>
  )
}

export default App
