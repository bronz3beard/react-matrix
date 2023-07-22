export const getCustomStyles = (hasStyle) => !hasStyle ? {} : hasStyle;
export const getContainerStyles = (hasStyle, styles) => 
// if custom styles are passed remove default styles by returning a spread empty object
!hasStyle
    ? Object.assign({}, getCustomStyles(hasStyle)) : Object.assign({ top: `${50}%`, left: `${50}%`, height: `${100}%`, textAlign: "center", position: "absolute", transform: `translate(${-50}%, ${-50}%)` }, styles);
export const getTableBoarder = (hasStyle) => !hasStyle ? {} : { border: `${1}px solid black` };
export const getTableStyles = (hasStyle, styles) => !hasStyle
    ? Object.assign({}, getCustomStyles(hasStyle)) : Object.assign({ width: `${70}rem` }, styles);
export const getHeaderPrimaryTitleStyles = (hasStyle, styles) => !hasStyle
    ? Object.assign({}, getCustomStyles(hasStyle)) : Object.assign({ borderWidth: `${0}`, padding: `${1}rem ${0} ${1}rem ${0}` }, styles);
export const getHeaderRowStyles = (hasStyle, styles) => !hasStyle
    ? Object.assign({}, getCustomStyles(hasStyle)) : Object.assign({ borderColor: "black", borderStyle: "solid", padding: `${10}rem ${0} ${0} ${0}`, borderWidth: `${0} ${0} ${0} ${10}px` }, styles);
export const getHeaderTitleStyles = (hasStyle, styles) => !hasStyle
    ? Object.assign({}, getCustomStyles(hasStyle)) : Object.assign({ padding: `${0} ${0.5}rem ${0} ${0.5}rem`, backgroundColor: "light-grey", border: `${1}px solid black` }, styles);
export const getHeaderSubTitleStyles = (hasStyle, styles) => !hasStyle
    ? Object.assign({}, getCustomStyles(hasStyle)) : Object.assign({ fontSize: `${0.9}em`, fontWeight: "normal" }, styles);
