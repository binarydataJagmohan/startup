import React from "react";
import Link from 'next/link';
export default function ProjectOne() {
  return (
    <>
      <section className="projects-section pt-100 pb-70">
        <div className="container-fluid">
          <div className="section-title">
            <h2>Projects</h2>
            <p>
              At Startup or Invesment, we're committed to investing in
              innovative startups and bringing cutting-edge solutions to the
              market. Here are some of the exciting projects we're currently
              working on.
            </p>
            <div className="bar" />
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/1.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <Link href="single-projects.html">
                    <h3>Sustainable Housing Development</h3>
                  </Link>
                  <Link href="single-projects.html">
                    <span>
                    A project to build affordable, energy-efficient housing for low-income families.
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/2.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <Link href="single-projects.html">
                    <h3>Clean Water Initiative</h3>
                  </Link>
                  <Link href="single-projects.html">
                    <span>
                    A project to provide clean drinking water to communities in need.
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/3.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <Link href="single-projects.html">
                  <h3>Community Solar Farm</h3>
                  </Link>
                  <Link href="single-projects.html">
                    <span>
                    A project to build a solar farm that provides clean energy to the surrounding community.
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/4.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <Link href="single-projects.html">
                  <h3>Urban Garden Initiative</h3>
                  </Link>
                  <Link href="single-projects.html">
                    <span>
                    A project to establish community gardens in urban areas with limited access to fresh produce.
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/5.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <Link href="single-projects.html">
                  <h3>Youth Mentorship Program</h3>
                  </Link>
                  <Link href="single-projects.html">
                    <span>
                    A project to provide mentorship and guidance to at-risk youth in the community.
                    </span>
                  </Link>
                </div>
              </div>
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/6.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <Link href="single-projects.html">
                  <h3>Road Safety Campaign</h3>
                  </Link>
                  <Link href="single-projects.html">
                    <span>
                    A project to promote road safety awareness and reduce the number of accidents on the roads.
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/7.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <Link href="single-projects.html">
                  <h3>Online Learning Platform</h3>
                  </Link>
                  <Link href="single-projects.html">
                    <span>
                    A project to create an online learning platform that provides free educational resources to the public. 
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="section-title">
            <h2>
              Investment <span>Opportunities</span>
            </h2>
            <p>
              Describe your investment philosophy and the types of startups you
              invest in. Provide information on the investment opportunities
              available, such as equity investments or convertible notes.
              Encourage potential investors to get in touch to learn more about
              the investment process and opportunities.
            </p>
            <div className="bar" />
          </div>
          <div className="section-title">
            <h2>Conclusion</h2>
            <p>
              We're always on the lookout for innovative startups with the
              potential to make a real difference in the world. We're excited
              about the projects we're currently working on and are constantly
              seeking new investment opportunities to help drive growth and
              innovation. Stay tuned for updates on these and other exciting
              projects as we continue to invest in the future.
            </p>
            <div className="bar" />
          </div>
        </div>
      </section>
    </>
  );
}
