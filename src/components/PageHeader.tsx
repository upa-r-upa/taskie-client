import MainNavigation from "./MainNavigation";
import UserNavigation from "./UserNavigation";

export default function PageHeader() {
  return (
    <header className="border-grid fixed top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 mx-auto">
        <MainNavigation />

        <nav className="flex flex-1 items-center justify-end">
          <UserNavigation />
        </nav>
      </div>
    </header>
  );
}
