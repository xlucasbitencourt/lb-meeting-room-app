import { NavLink, Outlet } from "react-router";

export default function Layout() {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
    const commonClasses = "px-3 py-2 rounded-md text-sm font-medium";
    if (isActive) {
      return `${commonClasses} bg-gray-900 text-white`;
    }
    return `${commonClasses} text-gray-300 hover:bg-gray-700 hover:text-white`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="font-bold text-white">
                  Reservas de salas de reuniões
                </span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink to="/bookings" className={getNavLinkClass}>
                    Reservas
                  </NavLink>
                  <NavLink to="/rooms" className={getNavLinkClass}>
                    Salas
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
