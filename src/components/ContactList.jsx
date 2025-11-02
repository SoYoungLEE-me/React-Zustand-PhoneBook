import React from "react";
import ContactItem from "./ContactItem";
import usePhoneBookStore from "../stores/usePhonebookStore";

const ContactList = ({ onEdit }) => {
  const phoneBook = usePhoneBookStore((state) => state.phoneBook);
  const searchTerm = usePhoneBookStore((state) => state.searchTerm);

  const filteredContacts = !searchTerm
    ? phoneBook
    : phoneBook.filter((contact) => {
        const term = searchTerm.toLowerCase();
        return (
          contact.name.toLowerCase().includes(term) ||
          contact.phoneNumber.includes(term)
        );
      });

  if (phoneBook.length === 0) {
    return (
      <div className="empty-message">
        <div className="empty-icon">⭐</div>
        <p>저장된 연락처가 없습니다</p>
      </div>
    );
  }

  if (filteredContacts.length === 0) {
    return (
      <div className="empty-message">
        <div className="empty-icon">⭐</div>
        <p>검색 결과가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="contact-list">
      {filteredContacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default ContactList;
