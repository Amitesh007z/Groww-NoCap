import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  Compass,
  HelpCircle,
  Home,
  Menu,
  Play,
  Search,
  Sparkles,
  Target,
  UserRound,
  Wallet,
  X,
  ChartCandlestick,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "../ui/primitives";
import { AssistantPanel } from "./AssistantPanel";
import { useAppStore } from "../../store/appStore";
import { useUserStore } from "../../store/userStore";
import { Modal } from "../ui/overlays";
import { Brand } from "../ui/Brand";

const desktopNav = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/goal", label: "My Goal", icon: Target },
  { to: "/path", label: "My Path", icon: Compass },
  { to: "/lens", label: "Learn", icon: BookOpen },
  { to: "/sim", label: "Sim", icon: Play },
  { to: "/portfolio", label: "Portfolio", icon: Wallet },
  { to: "/missions", label: "Missions", icon: Sparkles },
  { to: "/investor", label: "Investor", icon: UserRound },
];

const exploreNav = [
  { to: "/ipo", label: "IPO experience", icon: ChartCandlestick },
  { to: "/fno", label: "F&O simulator", icon: Play },
  { to: "/guard", label: "Groww Guard", icon: ShieldCheck },
];

const mobileNav = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/goal", label: "Goal", icon: Target },
  { to: "/lens", label: "Learn", icon: BookOpen },
  { to: "/sim", label: "Sim", icon: Play },
  { to: "/investor", label: "You", icon: UserRound },
];

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const setAssistant = useAppStore((s) => s.setAssistantOpen);
  const drop = useAppStore((s) => s.market.dropActive);
  const name = useUserStore((s) => s.user.name);

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-line bg-white p-4 lg:flex">
          <Link to="/home" className="block px-2 py-2" aria-label="Groww NoCap home">
            <Brand />
          </Link>
          <nav className="mt-6 flex flex-1 flex-col gap-1">
            {desktopNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex min-h-tap items-center gap-3 rounded-xl px-3 text-sm font-medium ${isActive ? "bg-groww-faint text-groww-dark" : "text-ink hover:bg-canvas"}`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
            <p className="mt-5 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Explore safely</p>
            {exploreNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex min-h-tap items-center gap-3 rounded-xl px-3 text-sm font-medium ${isActive ? "bg-groww-faint text-groww-dark" : "text-ink hover:bg-canvas"}`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <p className="px-2 text-xs leading-5 text-muted">
            Learn before you risk.
            <br />
            <b className="text-ink">Your money, your call.</b>
          </p>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button className="absolute inset-0 bg-ink/40" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />
            <div className="relative h-full w-72 bg-white p-4">
              <div className="flex items-center justify-between">
                <Brand compact />
                <button className="grid h-11 w-11 place-items-center" onClick={() => setSidebarOpen(false)} aria-label="Close">
                  <X size={18} />
                </button>
              </div>
              <nav className="mt-4 flex flex-col gap-1">
                {desktopNav.map((item) => (
                  <NavLink key={item.to} to={item.to} onClick={() => setSidebarOpen(false)} className="flex min-h-tap items-center gap-3 rounded-xl px-3 text-sm">
                    <item.icon size={18} />
                    {item.label}
                  </NavLink>
                ))}
                <p className="mt-4 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Explore safely</p>
                {exploreNav.map((item) => (
                  <NavLink key={item.to} to={item.to} onClick={() => setSidebarOpen(false)} className="flex min-h-tap items-center gap-3 rounded-xl px-3 text-sm">
                    <item.icon size={18} />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-white/90 px-4 py-3 backdrop-blur md:px-6">
            <button className="grid h-11 w-11 place-items-center rounded-full lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>
            <form
              className="flex min-h-tap flex-1 items-center gap-2 rounded-full border border-line bg-canvas px-4 text-sm text-muted"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/lens${query ? `?q=${encodeURIComponent(query)}` : ""}`);
              }}
            >
              <Search size={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 w-full bg-transparent outline-none"
                placeholder="Search a term, metric or product..."
                aria-label="Search"
              />
            </form>
            <Badge tone="amber">DEMO MODE</Badge>
            <button className="grid h-11 w-11 place-items-center rounded-full hover:bg-canvas" aria-label="Notifications" onClick={() => setBellOpen(true)}>
              <Bell size={18} />
            </button>
            <button className="grid h-11 w-11 place-items-center rounded-full hover:bg-canvas" aria-label="Help" onClick={() => setAssistant(true)}>
              <HelpCircle size={18} />
            </button>
            <Link to="/settings" className="grid h-11 w-11 place-items-center rounded-full bg-groww text-sm font-bold text-white" aria-label="Account">
              {name.slice(0, 1)}
            </Link>
          </header>

          <main className="flex-1 px-4 pb-24 pt-6 md:px-8 lg:pb-10">
            <Outlet />
          </main>

          <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-white px-1 py-1 lg:hidden">
            {mobileNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex min-h-tap flex-col items-center justify-center gap-0.5 text-[11px] ${isActive ? "text-groww-dark" : "text-muted"}`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <AssistantPanel />
      <Modal open={bellOpen} onClose={() => setBellOpen(false)} title="Updates">
        {drop ? (
          <p className="text-sm leading-6">
            A demo market drop is active. Your goal is still in view.{" "}
            <Link className="font-semibold text-groww-dark" to="/guard" onClick={() => setBellOpen(false)}>
              Open Groww Guard
            </Link>
          </p>
        ) : (
          <p className="text-sm text-muted">Nothing needs your attention right now.</p>
        )}
      </Modal>
    </div>
  );
}
