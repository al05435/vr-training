import './App.css';
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginContext } from './AppContext/Context';
import { UserContext } from './AppContext/Context';

import { useState } from 'react';


function App() {
  const [user, setUser] = useState({})
  const [userdoc,setUserDoc] = useState({})
  return (
    // <div className="App">
    // <UserContext.Provider value={{user, setUser}} className="App" >
    <UserContext.Provider value={{userdoc,setUserDoc}}  >
    <LoginContext.Provider value={{user, setUser}}  className="App">
      <Navbar />
    </LoginContext.Provider>
    </UserContext.Provider>
    // </UserContext.Provider>
    // </div>

  );
}

export default App;
