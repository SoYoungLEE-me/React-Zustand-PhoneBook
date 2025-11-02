import React, { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import usePhoneBookStore from "../stores/usePhonebookStore";

const ContactForm = ({ presetIcons = [], onClose, editingContact = null }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(presetIcons[0]);

  const [errorMessage, setErrorMessage] = useState(""); //전화번호 유효성 검사 메세지

  const { addContact, deleteContact, updateContact } = usePhoneBookStore();
  const phoneBook = usePhoneBookStore((state) => state.phoneBook);

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setPhoneNumber(editingContact.phoneNumber);
      setSelectedIcon(editingContact.icon);
    }
  }, [editingContact]); //수정 모드일 경우 기존 정보로 세팅

  const handleAddContact = () => {
    if (!name.trim() || !phoneNumber.trim()) {
      alert("이름과 연락처를 입력해주세요!");
      return;
    }

    //중복검사
    const duplicatePhone = phoneBook.some(
      (c) =>
        c.phoneNumber === phoneNumber &&
        (!editingContact || c.id !== editingContact.id)
    );
    const duplicateName = phoneBook.some(
      (c) =>
        c.name === name.trim() &&
        (!editingContact || c.id !== editingContact.id)
    );

    if (duplicatePhone && duplicateName) {
      setErrorMessage("이미 등록된 이름과 전화번호입니다");
      return;
    }

    if (duplicatePhone) {
      setErrorMessage("이미 등록된 전화번호입니다");
      return;
    }
    if (duplicateName) {
      setErrorMessage("이미 등록된 이름입니다");
      return;
    }

    if (!isValidPhone(phoneNumber)) {
      setErrorMessage("전화번호 형식이 올바르지 않습니다");
      return;
    }

    setErrorMessage("");

    if (editingContact) {
      updateContact(editingContact.id, {
        name,
        phoneNumber,
        icon: selectedIcon,
      });
      alert("연락처가 수정되었습니다");
    } else {
      addContact(name, phoneNumber, selectedIcon);
      alert("연락처가 추가되었습니다");
    }

    onClose(); // 닫기
  };

  const handleDelete = () => {
    if (!editingContact) return;
    const confirmDelete = window.confirm(
      `${editingContact.name} 님의 연락처를 삭제할까요?`
    );
    if (confirmDelete) {
      deleteContact(editingContact.id);
      alert("삭제가 완료되었습니다");
      onClose();
    }
  };

  // 전화번호 유효성 검사
  const isValidPhone = (phone) => {
    const regex = /^(0(?:2|[3-6][1-5]|70|80|10))-(\d{3,4})-(\d{4})$/;
    return regex.test(phone);
  };

  //전화번호 입력 시 자동 하이픈 처리
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용

    if (value.startsWith("02")) {
      if (value.length > 2 && value.length <= 5)
        value = value.replace(/(\d{2})(\d+)/, "$1-$2");
      else if (value.length > 5)
        value = value.replace(/(\d{2})(\d{3,4})(\d+)/, "$1-$2-$3");
    } else {
      if (value.length > 3 && value.length <= 7)
        value = value.replace(/(\d{3})(\d+)/, "$1-$2");
      else if (value.length > 7)
        value = value.replace(/(\d{3})(\d{3,4})(\d+)/, "$1-$2-$3");
    }

    setPhoneNumber(value);
  };

  return (
    <div className="modal-overlay">
      <div className="contact-form">
        <div className="form-header">
          <h2>새 연락처</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="form-body">
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* 프로필 미리보기 */}
          <div className="avatar-preview">
            <img
              src={selectedIcon}
              alt="Selected profile"
              className="selected-avatar"
            />
          </div>

          {/* 아이콘 선택 영역 */}
          <div className="icon-picker">
            {presetIcons.map((iconUrl) => (
              <img
                key={iconUrl}
                src={iconUrl}
                alt="icon"
                className={`icon-option ${
                  selectedIcon === iconUrl ? "active" : ""
                }`}
                onClick={() => setSelectedIcon(iconUrl)}
              />
            ))}
          </div>

          {/*이름 입력*/}
          <div className="form-group">
            <label>이름</label>
            <input
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={
                errorMessage &&
                (name.trim() === "" ||
                  phoneBook.some(
                    (c) =>
                      c.name === name.trim() &&
                      (!editingContact || c.id !== editingContact.id)
                  ))
                  ? "input-error"
                  : ""
              }
            />
          </div>

          {/*연락처 입력*/}
          <div className="form-group">
            <label>연락처</label>
            <input
              type="tel"
              placeholder="전화번호 입력"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className={
                errorMessage &&
                (!isValidPhone(phoneNumber) ||
                  phoneBook.some(
                    (c) =>
                      c.phoneNumber === phoneNumber &&
                      (!editingContact || c.id !== editingContact.id)
                  ))
                  ? "input-error"
                  : ""
              }
            />
          </div>

          <div className="form-actions">
            <button
              className={`delete-btn ${!editingContact ? "disabled" : ""}`}
              onClick={editingContact ? handleDelete : undefined}
              disabled={!editingContact}
            >
              <Trash2 size={18} />
            </button>
            <button className="save-btn" onClick={handleAddContact}>
              {editingContact ? "수정" : "저장"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
