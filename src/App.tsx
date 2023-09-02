import './App.css'
import { Footer } from './app/common/Footer'
import { Navbar } from './app/common/Navbar'
import { Rutas } from './routes/Routes'

function App() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex-grow flex justify-center">
        <Rutas />
      </div>
      <Footer />
    </div>
  )
}

export default App
