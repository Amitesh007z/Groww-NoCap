import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppEventType, MarketContext } from "../types/intelligence";

type LoggedEvent = { type: AppEventType; at: string; detail?: string };

type AppState = {
  market: MarketContext;
  events: LoggedEvent[];
  assistantOpen: boolean;
  fnoCards: Record<string, boolean>;
  ipoLessons: Record<string, boolean>;
  logEvent: (type: AppEventType, detail?: string) => void;
  triggerMarketDrop: () => void;
  clearMarketDrop: () => void;
  setAssistantOpen: (open: boolean) => void;
  markFnoCard: (id: string) => void;
  markIpoLesson: (id: string) => void;
  reset: () => void;
};

const idleMarket: MarketContext = { dropActive: false, marketChange: 0, portfolioChange: 0 };

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      market: idleMarket,
      events: [],
      assistantOpen: false,
      fnoCards: {},
      ipoLessons: {},
      logEvent: (type, detail) =>
        set((s) => ({
          events: [{ type, at: new Date().toISOString(), detail }, ...s.events].slice(0, 40),
        })),
      triggerMarketDrop: () =>
        set((s) => {
          if (s.market.dropActive) return s;
          return {
            market: {
              dropActive: true,
              eventId: "guard-drop",
              marketChange: -8.2,
              portfolioChange: -6.8,
            },
            events: [{ type: "MARKET_EVENT_TRIGGERED", at: new Date().toISOString(), detail: "guard-drop" }, ...s.events],
          };
        }),
      clearMarketDrop: () => set({ market: idleMarket }),
      setAssistantOpen: (assistantOpen) => set({ assistantOpen }),
      markFnoCard: (id) => set((s) => ({ fnoCards: { ...s.fnoCards, [id]: true } })),
      markIpoLesson: (id) => set((s) => ({ ipoLessons: { ...s.ipoLessons, [id]: true } })),
      reset: () =>
        set({
          market: idleMarket,
          events: [],
          assistantOpen: false,
          fnoCards: {},
          ipoLessons: {},
        }),
    }),
    { name: "nocap-app" },
  ),
);

export function resetDemo() {
  localStorage.removeItem("nocap-user");
  localStorage.removeItem("nocap-goal");
  localStorage.removeItem("nocap-portfolio");
  localStorage.removeItem("nocap-learning");
  localStorage.removeItem("nocap-sim");
  localStorage.removeItem("nocap-app");
  window.location.href = "/";
}
