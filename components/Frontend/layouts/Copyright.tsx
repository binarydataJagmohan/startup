import React from "react";
import Link from 'next/link'

const Copyright = () => {
  return (
    <div>
      {/* <!-- Start Copy Right Area --> */}
      <div className="copyright-area">
        <div className="container">
          <div className="copyright-area-content">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <p>
                  Copyright @{new Date().getFullYear()}&nbsp;All Rights Reserved
                  By Startup.
                </p>
              </div>

              <div className="col-lg-6 col-md-6">
                <ul>
                  <li>
                    <Link href="/terms-condition">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
