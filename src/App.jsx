import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Details from "./pages/Details"
import Nav from "./components/Nav"
import "./App.css"

const App = () => {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/parks/:id" element={<Details />} />
      </Routes>
    </div>
  )
}

export default App
