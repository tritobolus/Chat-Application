import { Layout } from "./pages/Layout"
import { Login } from "./pages/Login"

import { Route, Routes } from "react-router-dom"
import { SignUp } from "./pages/SignUp"



function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<Layout/>}/>
      <Route path="/signin" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
     </Routes>
    </>
  )
}

export default App
