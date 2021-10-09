import React from "react";
import { faGitSquare, faNpm } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./iconsRow.scss";

const IconsRow = () => {
  return (
    <div className="socialStylesContainer">
      <div className="socialStyles">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/bronz3beard/react-matrix#react-matrix"
        >
          <FontAwesomeIcon size="3x" color="#77B244" icon={faGitSquare} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.npmjs.com/package/react-data-matrix"
        >
          <FontAwesomeIcon size="3x" color="#77B244" icon={faNpm} />
        </a>
      </div>
    </div>
  );
};

export default IconsRow;
