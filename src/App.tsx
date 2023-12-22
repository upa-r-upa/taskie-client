import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar";
import BottomNavigation from "./components/BottomNavigation";

function App() {
  return (
    <div className="container max-w-xl mx-auto flex flex-col h-screen">
      <NavBar />

      <div className="flex-1 w-full overflow-y-auto">
        <div className="w-full min-h-full flex flex-col mx-auto max-w-md font-sans py-5 px-10">
          <Outlet />
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default App;
