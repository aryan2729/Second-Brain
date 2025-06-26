import { BrowserRouter , Routes , Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Layout } from "./pages/Layout";
import { ErrorPage } from "./pages/ErrorPage";
import { Share } from "./pages/Share";
import { CursorFollower } from "./components/CursorFollower";

function App(){

 return <>
   <CursorFollower />
   
   <BrowserRouter>

    <Routes>
      <Route path="/" element={<Navigate to="/homepage" replace />} />
      <Route path="/homepage" element={<Layout />} />
        <Route path="/signup" element={<Signup /> } />
        <Route path="/signin" element={<Signin /> } />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/share/:shareId" element={<Share />}/>
        <Route path="*" element={<ErrorPage/>} />

    </Routes>
    
  </BrowserRouter>
 </>
}

export default App;