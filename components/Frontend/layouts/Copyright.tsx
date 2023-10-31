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
              <p className="m-0">
                  Copyright @{new Date().getFullYear()}&nbsp;All Rights Reserved
                  By RisingCapitalist.
                </p>
              </div>

              <div className="col-lg-6 col-md-6">
                <ul>
                  <li>
                    <Link href="/terms-condition" style={{color:'#666'}}>Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href="/risk-investments" style={{color:'#666'}}>Risk Of Investments</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" style={{color:'#666'}}>Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="disclaimer-area">
        <div className="container">
          <div className="disclaimer-area-content">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12">
                <p className="m-0 mb-2" style={{"fontSize":"14px"}}><strong>Disclaimer: </strong> RisingCapitalist is NOT a stock exchange recognised by the Securities Exchange Board of India (SEBI) under the securities contract (regulation) act, 1956. RisingCapitalist does not allow any secondary market trading of securities on the Platform. Information presented on this website is for educational purposes only and should not be treated as legal, financial, or any other form of advice. RisingCapitalist is not liable for financial, or any other form of loss incurred by the user, or any affiliated party based on information provided herein.</p>
                {/* <p className="m-0 mb-3" style={{"fontSize":"14px"}}><strong>Address: </strong> Shop 13 Trishul Terraces, Sector 20, Koparkhairne, Thane, Maharashtra – 400709</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright;