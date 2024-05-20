import { writable } from 'svelte/store';

function createPantryStore() {
  const { subscribe, set } = writable(loadPantryFromLocalStorage());

  return {
    subscribe,
    setPantry: (newPantryString : string) => {
      savePantryToLocalStorage(newPantryString);
      set(newPantryString);
    },
  };

  function savePantryToLocalStorage(pantry : string) {
    localStorage.setItem('rupertPantryId', pantry);
  }

  function loadPantryFromLocalStorage() {
    const pantry = localStorage.getItem('rupertPantryId');
    return pantry ?? "";
  }
}

export const pantry = createPantryStore();
