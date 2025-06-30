
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './assets/components/home'
import Register from './assets/components/register'
import Login from './assets/components/login'
import Dashboard from './assets/components/dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddTask1 from './assets/components/AddTask1'
import UpdateTask from './assets/components/UpdateTask'

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addtask" element={<AddTask1 />} />
          <Route path="/updatetask" element={<UpdateTask />} />

        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
