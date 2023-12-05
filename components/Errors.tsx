import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
export default function Errors() {
  return (
    <div>
      <section className="error-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container mt-5">
              <div className="error-content">
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_URL + "assets/images/404.png"} alt="error"
                  width={400}
                  height={266}
                  style={{ marginTop: '15%' }}
                />
                <h3>Page Not Found</h3>
                <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                <Link href="/" className="default-btn">Go to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
