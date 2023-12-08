import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar";
import BottomNavigation from "./components/BottomNavigation";

function App() {
  return (
    <div className="container max-w-xl mx-auto flex flex-col h-screen">
      <NavBar />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg flex items-center justify-center mx-auto">
          <div className="min-w-full py-3 px-8">
            <div className="font-sans">
              <div className="container mx-auto max-w-md px-2 py-2">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default App;
