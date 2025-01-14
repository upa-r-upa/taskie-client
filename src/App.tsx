import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar";
import BottomNavigation from "./components/BottomNavigation";
import TokenRefresher from "./components/TokenRefresher";
import Messages from "./components/Messages";

function App() {
  return (
    <>
      <div className="overflow-y-auto min-h-screen flex flex-col root-content">
        <NavBar />

        <div className="px-8 pt-20 pb-20 flex-1 relative">
          <Outlet />
        </div>

        <BottomNavigation />
        <Messages />
      </div>

      <TokenRefresher />
    </>
  );
}

export default App;
