import { Route, Routes, BrowserRouter } from "react-router-dom";
import Protected from "./Protected";
import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

import Home from "./pages/Home";
import { useSelector } from "react-redux";

function App() {

  const signed_state = useSelector((state)=> state.isLoggedIn);

  let public1 = [
    { 
      path: "/", element: <Signup /> 
    },

    {
      path: "/login",
      element: <Login />,
    },
  ];

  let private1 = [
    {
      path: "/home",
      element: <Home />,
    },
  
  ];

  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      {private1.map((e, i) => {
        return (
          <Route
            key={i}
            path={e.path}
            element={
              <Protected signed_state={signed_state}>{e.element}</Protected>
            }
          />
        );
      })}
 
      // TODO : Public Routes here
      {public1.map((e, i) => {
        return (
          <Route
            key={i}
            path={e.path}
            element={e.element}/>
        );
      })}
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;