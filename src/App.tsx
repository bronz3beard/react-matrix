import { useState } from "react";
import ReactMatrix, { type MatrixData } from "../lib";
import IconsRow from "./components/iconsRow";
import Footer from "./components/footer";

// Demo page: the matrix with the default Original preset, showing the chosen
// cell's response through `onCellClick`. The preset gallery replaces this page
// later in the 1.0 work.
function App({ data }: { data: MatrixData }) {
  const [selection, setSelection] = useState("Choose a cell to see its response.");

  return (
    <>
      <IconsRow />
      <ReactMatrix
        data={data}
        styles={{ table: { width: '70rem' } }}
        onCellClick={(cell, { row, column }) =>
          setSelection(
            `${row.row_header_title} × ${column.header_title}: ${cell.description} (${cell.score_value}). ${cell.response}.`
          )
        }
      />
      <p role="status" style={{ textAlign: 'center' }}>
        {selection}
      </p>
      <Footer />
    </>
  );
}

export default App;
