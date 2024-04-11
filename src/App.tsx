import { Routes, Route } from "react-router-dom";
import { Auth } from "./views/";

function App() {
  return (
    <div className='min-h-screen bg-background-light'>
      <Routes>
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
