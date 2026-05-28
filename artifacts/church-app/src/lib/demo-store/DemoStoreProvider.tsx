import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from "react";
import type { DemoAction, DemoState } from "./types";
import { createSeedState, DEMO_STORAGE_KEY } from "./seed";
import { demoReducer } from "./reducer";

interface DemoStoreContextValue {
  state: DemoState;
  dispatch: (action: DemoAction) => void;
  reset: () => void;
}

const DemoStoreContext = createContext<DemoStoreContextValue | null>(null);

function loadState(): DemoState {
  try {
    const raw = localStorage.getItem(DEMO_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DemoState;
      if (parsed.members?.length) return parsed;
    }
  } catch {
    /* use seed */
  }
  return createSeedState();
}

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatchBase] = useReducer(demoReducer, undefined, loadState);

  useEffect(() => {
    try {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota errors */
    }
  }, [state]);

  const dispatch = useCallback((action: DemoAction) => dispatchBase(action), []);
  const reset = useCallback(() => dispatchBase({ type: "RESET" }), []);

  return (
    <DemoStoreContext.Provider value={{ state, dispatch, reset }}>
      {children}
    </DemoStoreContext.Provider>
  );
}

export function useDemoStore() {
  const ctx = useContext(DemoStoreContext);
  if (!ctx) throw new Error("useDemoStore must be used within DemoStoreProvider");
  return ctx;
}

export function useDemoState<T>(selector: (state: DemoState) => T): T {
  const { state } = useDemoStore();
  return selector(state);
}

export function useDemoDispatch() {
  return useDemoStore().dispatch;
}
