import ReactMatrix, { type MatrixData } from "../lib";
import IconsRow from "./components/iconsRow";
import Footer from "./components/footer";

// Demo page: the matrix with the default Original preset. The preset gallery
// replaces this page later in the 1.0 work.
function App({ data }: { data: MatrixData }) {
  return (
    <>
      <IconsRow />
      <ReactMatrix data={data} styles={{ table: { width: '70rem' } }} />
      <Footer />
    </>
  );
}

export default App;
