import { useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import usePhoneBookStore from "./stores/usePhonebookStore";

const PRESET_ICONS = [
  "https://i.namu.wiki/i/UhKnN-Ugtlgpdb1e_vWVDeSqsFjONLbpwPKSQHpQvpqsH-2AqXXyqEY7P4OVe1fvr4CsAwj_lVWzn_wgcVJiMA.svg",
  "https://i.namu.wiki/i/uc0Udr7MxKs7kHq7ty9gWUVLmhjU0jmIbfX1i0yiWmt1IdPh8EJRp2IMOmfwAviJpExZQlmAkDvJrnY8uKuumg.webp",
  "https://i.namu.wiki/i/V1ezCD80sDEgdxUrymETobcXEoTfXU4zEooor3prQ2HMWKXCiurwaOvvAKa89evS41d42xnEooO-yxgzMLzdSw.webp",
  "https://i.namu.wiki/i/mdB4BnfvMPx99B1zL0rnNQSV5WFh53Zy2CAq482I_mPNTaJHAephagdt-jUVPSQJ-tLTpb5JqtPb4nGsVRhX6w.webp",
  "https://i.pinimg.com/236x/0a/ab/8e/0aab8e21c687bd806806ba23ee323684.jpg",
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const setSearchTerm = usePhoneBookStore((state) => state.setSearchTerm);

  //연락처 작성 모달 열기
  const handleOpenModal = (contact = null) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  //닫기
  const handleCloseModal = () => {
    setEditingContact(null);
    setIsModalOpen(false);
  };

  return (
    <div className="app-wrapper">
      <div className="contact-app">
        {/* 헤더 */}
        <div className="app-header">
          <h1>My Address Book</h1>
        </div>

        {/* 검색창 */}
        <div className="search-box">
          <input
            type="text"
            placeholder="이름 또는 전화번호로 검색하세요"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 연락처 목록 */}
        <ContactList onEdit={handleOpenModal} />

        {/* 추가 버튼 */}
        <button
          className="add-btn"
          onClick={() => {
            handleOpenModal(null);
          }}
        >
          ＋
        </button>

        {/* 모달 (연락처 추가/수정 폼 한꺼번에) */}
        {isModalOpen && (
          <ContactForm
            presetIcons={PRESET_ICONS}
            onClose={handleCloseModal}
            editingContact={editingContact}
          />
        )}
      </div>
    </div>
  );
}

export default App;
