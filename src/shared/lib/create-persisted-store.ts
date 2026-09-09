type PersistedStoreOptions<TState, TAction> = {
  key: string
  initialState: TState
  parse: (raw: string | null) => TState
  reducer: (state: TState, action: TAction) => TState
}

function createPersistedStore<TState, TAction>({
  key,
  initialState,
  parse,
  reducer,
}: PersistedStoreOptions<TState, TAction>) {
  let state = read()
  const listeners = new Set<() => void>()

  function read() {
    if (typeof window === 'undefined') {
      return initialState
    }

    try {
      return parse(localStorage.getItem(key))
    } catch {
      return initialState
    }
  }

  function emit() {
    for (const listener of listeners) {
      listener()
    }
  }

  function getSnapshot() {
    return state
  }

  function getServerSnapshot() {
    return initialState
  }

  function subscribe(onStoreChange: () => void) {
    listeners.add(onStoreChange)

    return () => {
      listeners.delete(onStoreChange)
    }
  }

  function persist(action: TAction) {
    state = reducer(state, action)
    emit()

    return Promise.resolve().then(() => {
      localStorage.setItem(key, JSON.stringify(state))
    })
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key !== key) {
        return
      }

      state = read()
      emit()
    })
  }

  return {
    getSnapshot,
    getServerSnapshot,
    subscribe,
    persist,
  }
}

export { createPersistedStore }
