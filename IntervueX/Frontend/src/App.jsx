import './App.css'
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Landing from "./components/Landing"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Signup from "./components/Signup"
import Session from "./components/Session"
import Add from './components/Add'
import AskAI from './components/RightDrawer'
function App() {
  return (
    <>
        <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<Landing/>}/>
            <Route path = "/Dashboard" element = {<Dashboard/>}/>
            <Route path = "/Signup" element = {<Signup/>}/>
            <Route path = "/Session/:id" element = {<Session/>}/>
            <Route path = "/Add" element = {<Add/>}/>
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
