import React from "react";
import { faGithub, faNpm, faReadme } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./iconsRow.scss";

const IconsRow = () => {
  return (
    <div className="socialStylesContainer">
      <div className="socialStyles">
        <a
          target="_blank"
          rel="noopener noreferrer"
          title="github"
          href="https://github.com/bronz3beard/react-matrix#react-matrix"
        >
          <FontAwesomeIcon size="3x" color="#77B244" icon={faGithub} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          title="npm"
          href="https://www.npmjs.com/package/react-data-matrix"
        >
          <FontAwesomeIcon size="3x" color="#77B244" icon={faNpm} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          title="README.md"
          href="https://github.com/bronz3beard/react-matrix#readme"
        >
          <FontAwesomeIcon size="3x" color="#77B244" icon={faReadme} />
        </a>
      </div>
    </div>
  );
};

export default IconsRow;
