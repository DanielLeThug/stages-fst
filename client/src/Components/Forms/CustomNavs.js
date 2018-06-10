import React from "react";
import { GENERIC_NAV } from "react-jsonschema-form-pagination/lib/utils";

function CustomNavs({ navs: { links }, onNavChange }) {
  let relLinks = links.filter(({ nav }) => nav !== GENERIC_NAV);
  return (
    <ul className="nav nav-tabs">
      {relLinks.map(({ nav, name, icon, isActive }, i) => (
        <li className="nav-item" key={i} onClick={() => onNavChange(nav)}>
          <a className={isActive ? "active nav-link" : "nav-link"}>
            {icon && <span className={icon} aria-hidden="true" />}
            &nbsp;{name || nav}            
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CustomNavs;
