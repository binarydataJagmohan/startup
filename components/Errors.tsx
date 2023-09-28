import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
export default function Errors() {
  return (
    <div>
      <section className="error-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="error-content">
                <Image
                  src="assets/img/404.png" alt="error"
                  width={500}
                  height={266}
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
