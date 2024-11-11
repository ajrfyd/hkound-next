"use client";
import { useEffect, useState, useCallback } from "react";
import { headerData } from "./data";
import Link from "next/link";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const outsideClickHandler = useCallback(
    (e: Event) => {
      if (!(e.target instanceof Element)) return;
      if (showMenu && !e.target.closest(".header-menu, .mobile-nav-toggle")) {
        setShowMenu(false);
      }
    },
    [showMenu],
  );

  useEffect(() => {
    document.addEventListener("click", outsideClickHandler);

    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, [outsideClickHandler]);

  return (
    <header>
      <div className="header-placeholder" />
      <div className="header with-placeholder">
        <div className="container-fluid">
          <div className="header-logo">
            <h6 className="sm-heading logo">
              <Link href="/">{headerData.logo}</Link>
            </h6>
          </div>

          <div className={`header-menu ${showMenu ? "show" : ""}`}>
            <ul className="nav">
              {headerData.nav.map((item, index) => (
                <li key={index} className="nav-item fs-5">
                  <Link className="nav-link" href={item.url}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="header-end">
            <ul className="list-inline-lg">
              {headerData.headerEnd.map((item, index) => (
                <li key={index}>
                  {item.target ? (
                    <a href={item.url} target={item.target ? item.target : ""}>
                      <i className={item.bootstrapIcon}></i>
                    </a>
                  ) : (
                    <Link className="nav-link" href={item.url as string}>
                      <i className={item.bootstrapIcon}></i>
                    </Link>
                  )}
                  {/* <a href={item.url} target={item.target ? item.target : ''}>
                    <i className={item.bootstrapIcon}></i>
                  </a> */}
                </li>
              ))}
            </ul>
          </div>

          <button
            className={`mobile-nav-toggle ${showMenu ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
