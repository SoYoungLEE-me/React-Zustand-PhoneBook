import React from "react";
import { Edit2 } from "lucide-react";

const ContactItem = ({ contact, onEdit }) => {
  return (
    <div className="contact-item">
      <img src={contact.icon} alt={contact.name} className="contact-avatar" />
      <div className="contact-info">
        <h3>{contact.name}</h3>
        <p>{contact.phoneNumber}</p>
      </div>
      <Edit2 className="edit-icon" onClick={() => onEdit(contact)} />
    </div>
  );
};

export default ContactItem;
