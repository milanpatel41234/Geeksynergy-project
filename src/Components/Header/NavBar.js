import React, { useState } from "react";
import Style from "./NavBar.module.css";
import Modal from "./InfoModal"; // Import the Modal component

function NavBar({LoginState}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className={Style.navbar}>
        <h2>Geeksynergy</h2>
       {LoginState && <button onClick={openModal}>Company Info</button>}
      </header>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div>
            <h3>Company Info</h3>
            <div className={Style.info} >
            <b>Name</b>
            <p>Geeksynergy Technologies Pvt Ltd</p>
            <b>Address</b>
            <p>Sanjayanagar, Bengaluru-56</p>
            <b>Phone</b>
            <p>XXXXXXXX09</p>
            <b>Email</b>
            <p>XXXXXXXX@gmail.com</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default NavBar;
