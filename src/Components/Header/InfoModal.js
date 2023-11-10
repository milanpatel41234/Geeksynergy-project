import React from "react";
import Style from "./NavBar.module.css";

function Modal({ onClose, children }) {
  return <div className={Style.overlay} onClick={onClose}>
      <div className={Style.modal} onClick={(e) => e.stopPropagation()}>
        <button className={Style.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
}

export default Modal;
