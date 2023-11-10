import React from "react";
import Style from "./Modal.module.css";

function Modal({ onClose, children }) {
  return <div className={Style.overlay} onClick={onClose}>
      <div className={Style.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={Style.closeButton} onClick={onClose}>
          ok
        </button>
      </div>
    </div>
}

export default Modal;
