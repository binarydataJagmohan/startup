import React, { useEffect } from "react";


const PopupModal = ({ handleClose, show, children, staticClass,width }: any) => {
  let showHideClassName = '';
  if (staticClass == 'var-login') {
    showHideClassName = show ? "modal modal-part var-login  d-block" : "modal modal-part d-none";
  } else {
    showHideClassName = show ? "modal modal-part d-block same-here" : "modal modal-part d-none";
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (event.target.className === "modal  modal-part d-block") {
        handleClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div className={showHideClassName} id="location_popup">
      <div className="modal-dialog max-w-632" style={{
        maxWidth:width
      }}>
        <div className="modal-content">
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
