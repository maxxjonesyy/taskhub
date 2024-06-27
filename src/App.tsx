import { Routes, Route } from "react-router-dom";
import { Auth, Dashboard } from "./views";

function App() {
  return (
    <div className='min-h-screen bg-background-primary'>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
