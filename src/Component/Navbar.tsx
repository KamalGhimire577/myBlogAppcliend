import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import Logo from "./logo";
import { logout } from "../store/slices/auth/auth.slice"


interface MenuItem {
  title: string;
  icon: string;
  href: string;
  onClick?: () => void;
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // =========================
  // MENU ITEMS
  // =========================
  const getMenuItems = (role?: string): MenuItem[] => {
    const commonItems: MenuItem[] = [
      {
        title: "Profile",
        icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z",
        href: "/profile",
      },
      {
        title: "Logout",
        icon: "M17 16l4-4m0 0l-4-4m4 4H7",
        href: "/logout",
        onClick: () => {
          dispatch(logout());
          navigate("/login");
        },
      },
    ];

    if (role === "admin") {
      return [
        {
          title: "Admin Dashboard",
          icon: "M3 3h7v7H3V3zm11 0h7v7h-7V3",
          href: "/admin/dashboard",
        },
        ...commonItems,
      ];
    }

    // Default: Author
    return [
      {
        title: "Dashboard",
        icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0",
        href: "/dashboard",
      },
      ...commonItems,
    ];
  };

  const menuItems = getMenuItems(user?.role);

  // =========================
  // RENDER
  // =========================
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium text-slate-700">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="flex-grow" />

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {!token ? (
            <>
              <Link to="/login" className="text-sm hover:text-red-500">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="rounded bg-red-500 px-3 py-1 text-sm text-white"
              >
                Become an Author
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="h-10 w-10 rounded-full bg-red-500 text-white"
              >
                {user?.username?.charAt(0).toUpperCase()}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-56 rounded-lg bg-white shadow-lg p-4">
                  <p className="text-sm font-semibold">{user?.username}</p>
                  <p className="text-xs text-gray-500 mb-3">
                    Role: {user?.role}
                  </p>

                  <div className="space-y-2">
                    {menuItems.map((item) =>
                      item.onClick ? (
                        <button
                          key={item.title}
                          onClick={() => {
                            item.onClick?.();
                            setProfileOpen(false);
                          }}
                          className="block w-full text-left text-sm text-red-600 hover:underline"
                        >
                          {item.title}
                        </button>
                      ) : (
                        <Link
                          key={item.title}
                          to={item.href}
                          onClick={() => setProfileOpen(false)}
                          className="block text-sm hover:underline"
                        >
                          {item.title}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-3">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/blog" onClick={() => setIsMenuOpen(false)}>
            Blog
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>

          <div className="border-t pt-3 space-y-2">
            {menuItems.map((item) =>
              item.onClick ? (
                <button
                  key={item.title}
                  onClick={() => {
                    item.onClick?.();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-red-600"
                >
                  {item.title}
                </button>
              ) : (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
