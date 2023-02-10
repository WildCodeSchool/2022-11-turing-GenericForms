import { NavLink } from "react-router-dom";
import React from "react";


export default function Header() {

  return (
    <header className="pt-4">
      <div className="container">
        <h1 className="mb-5">Generic Forms</h1>
        <nav className="c">
          <ul className="flex">
            <li className="mr-2 h-8">
              <NavLink
                end
                to={"/dashboard"}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="mr-2 h-8">
              <NavLink
                end
                to={"/home"}
              >
                Page publique
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
