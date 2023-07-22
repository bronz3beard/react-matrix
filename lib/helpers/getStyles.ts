export const getCustomStyles = (hasStyle: boolean) =>
  !hasStyle ? {} : hasStyle;

export const getContainerStyles = (
  hasStyle: boolean,
  styles: React.CSSProperties
): React.CSSProperties =>
  // if custom styles are passed remove default styles by returning a spread empty object
  !hasStyle
    ? { ...getCustomStyles(hasStyle) }
    : {
        top: `${50}%`,
        left: `${50}%`,
        height: `${100}%`,
        textAlign: "center",
        position: "absolute",
        transform: `translate(${-50}%, ${-50}%)`,
        ...styles,
      };

export const getTableBoarder = (hasStyle: boolean) =>
  !hasStyle ? {} : { border: `${1}px solid black` };

export const getTableStyles = (
  hasStyle: boolean,
  styles: React.CSSProperties
): React.CSSProperties =>
  !hasStyle
    ? { ...getCustomStyles(hasStyle) }
    : { width: `${70}rem`, ...styles };

export const getHeaderPrimaryTitleStyles = (
  hasStyle: boolean,
  styles: React.CSSProperties
): React.CSSProperties =>
  !hasStyle
    ? { ...getCustomStyles(hasStyle) }
    : {
        borderWidth: `${0}`,
        padding: `${1}rem ${0} ${1}rem ${0}`,
        ...styles,
      };

export const getHeaderRowStyles = (
  hasStyle: boolean,
  styles: React.CSSProperties
): React.CSSProperties =>
  !hasStyle
    ? { ...getCustomStyles(hasStyle) }
    : {
        borderColor: "black",
        borderStyle: "solid",
        padding: `${10}rem ${0} ${0} ${0}`,
        borderWidth: `${0} ${0} ${0} ${10}px`,
        ...styles,
      };

export const getHeaderTitleStyles = (
  hasStyle: boolean,
  styles: React.CSSProperties
): React.CSSProperties =>
  !hasStyle
    ? { ...getCustomStyles(hasStyle) }
    : {
        padding: `${0} ${0.5}rem ${0} ${0.5}rem`,
        backgroundColor: "light-grey",
        border: `${1}px solid black`,
        ...styles,
      };

export const getHeaderSubTitleStyles = (
  hasStyle: boolean,
  styles: React.CSSProperties
): React.CSSProperties =>
  !hasStyle
    ? { ...getCustomStyles(hasStyle) }
    : { fontSize: `${0.9}em`, fontWeight: "normal", ...styles };
