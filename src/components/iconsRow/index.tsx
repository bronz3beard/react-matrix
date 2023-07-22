import { IconProp, library } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faGithub, faNpm, faReadme } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./iconsRow.scss";

// Import the icons dynamically
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
library.add(
  faGithub as IconDefinition,
  faNpm as IconDefinition,
  faReadme as IconDefinition
);
/* eslint-enable @typescript-eslint/no-unnecessary-type-assertion */

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
          <FontAwesomeIcon
            size="3x"
            color="#77B244"
            icon={faGithub as IconProp}
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          title="npm"
          href="https://www.npmjs.com/package/react-data-matrix"
        >
          <FontAwesomeIcon size="3x" color="#77B244" icon={faNpm as IconProp} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          title="README.md"
          href="https://github.com/bronz3beard/react-matrix#readme"
        >
          <FontAwesomeIcon
            size="3x"
            color="#77B244"
            icon={faReadme as IconProp}
          />
        </a>
      </div>
    </div>
  );
};

export default IconsRow;
