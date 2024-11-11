// import Link from 'next/link';
import React from "react";
import profileData from "./profileData";

const page = () => {
  return (
    <main className="flex-fill">
      <div className="section-xs">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-12 col-lg-9">
              <div>
                <h1 className="display-2 fw-medium mb-0">
                  {profileData.about.title}
                </h1>
                <h1 className="display-3 fw-normal mb-0 text-black-02 fst-italic">
                  {profileData.about.introduce}
                </h1>
              </div>
              {/* <Link
              className="button button-lg button-outline mt-4"
              href={profileData.button.url}
            >
              {profileData.button.title}
            </Link> */}
            </div>

            {/*  */}

            <div className="col-12 col-xl-3 text-xl-end">
              <div className="row g-4">
                {profileData.about.hope.map((h) => (
                  <div className="col-12 col-sm-4 col-xl-12" key={h.desc}>
                    <h2 className="display-6 fw-medium mb-0">{h.desc}</h2>
                    {/* <span>{h.title}</span> */}
                  </div>
                ))}
              </div>{" "}
              {/* end row(inner) */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
