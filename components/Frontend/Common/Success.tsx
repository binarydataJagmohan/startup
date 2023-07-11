import { useEffect, useRef,useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Success = () => {
  useEffect(() => {
    // Code to open the modal by default
    const modal = document.getElementById('ignismyModal');
    if (modal) {
      $(modal).modal('show');
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        {/* <a className="btn btn-primary" data-toggle="modal" href="#ignismyModal">
          open Popup
        </a> */}
        <div className="modal fade show" id="ignismyModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div> */}
              <div className="modal-body">
                <div className="thank-you-pop">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+"assets/img/Green-Round-Tick.png"} alt="" />
                  <h1>Thank You!</h1>
                  <p>Your Payment has been Done Successfully.</p>
                  <h3 className="cupon-pop">
                    Your Payment Id: <span>12345</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Success