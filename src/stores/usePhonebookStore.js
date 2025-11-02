// usePhoneBookStore.js
import { create } from "zustand";

const usePhoneBookStore = create((set) => ({
  phoneBook: [],

  //검색 키워드
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  addContact: (name, phoneNumber, icon) =>
    set((state) => ({
      phoneBook: [
        ...state.phoneBook,
        { id: Date.now(), name, phoneNumber, icon },
      ],
    })),

  updateContact: (id, updatedData) =>
    set((state) => ({
      phoneBook: state.phoneBook.map((contact) =>
        contact.id === id ? { ...contact, ...updatedData } : contact
      ),
    })),

  deleteContact: (id) =>
    set((state) => ({
      phoneBook: state.phoneBook.filter((contact) => contact.id !== id), //선택한 아이디 외에만 반환
    })),
}));

export default usePhoneBookStore;
