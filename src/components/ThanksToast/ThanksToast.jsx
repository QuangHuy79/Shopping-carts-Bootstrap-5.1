import React, { useEffect } from "react";
// import "./ThanksToast.css"; // tuỳ chọn

function ThanksToast({ show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000); // tự đóng sau 3s
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="toast-container position-fixed top-0 start-50 translate-middle-x p-3"
      style={{ zIndex: 9999 }}
    >
      <div
        className="toast show align-items-center text-white bg-success border-0 shadow"
        role="alert"
      >
        <div className="d-flex justify-content-between align-items-center px-3 py-2">
          <div>
            <i className="fas fa-check-circle me-2" />
            Cảm ơn bạn đã đặt hàng!
          </div>
          <button
            type="button"
            className="btn-close btn-close-white ms-2"
            aria-label="Close"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}

export default ThanksToast;
