import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar";

function App() {
  return (
    <div className="container max-w-xl mx-auto">
      <NavBar />
      <div className="max-w-lg mx-auto flex items-center justify-center">
        <div className="min-w-full py-3 px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
