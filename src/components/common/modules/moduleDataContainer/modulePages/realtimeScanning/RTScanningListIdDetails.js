import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableRow,
  makeStyles
} from "@mui/material";
import { useClasses } from "@application";

const styles = theme => ({
  headCell: {
    border: "#2b6cb0"
  },
  tableHeader: {
    fontSize: "inherit",
    fontFamily: "inherit"
  }
});
function RTScanningListIdDetails(props) {
  const [header, setHeader] = useState([]);
  const [data, setData] = useState([]);
  const singleData = data ? data[0] : [];
  const classes = useClasses(styles);
  useEffect(() => {
    if (props.data.dataSet !== undefined) {
      props.data.dataSet.then(response => {
        setHeader(response.HEADER);
        setData(response.DATA);
      });
    }
  }, [props.data.dataSet]);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {header.map((eachHead, Headerindex) => {
              return (
                <TableRow className={classes.tableHeader} key={Headerindex}>
                  <TableCell
                    style={{
                      fontWeight: "900",
                      padding: "8px",
                      width: "25%",
                      backgroundColor: "#f4f5fa"
                    }}
                    className="border"
                  >
                    {eachHead}
                  </TableCell>
                  {singleData ? (
                    <TableCell
                      style={{
                        padding: "8px",
                        width: "75%",
                        backgroundColor: "#f4f5fa"
                      }}
                      className="border"
                    >
                      {singleData[Headerindex]}
                    </TableCell>
                  ) : (
                    <TableCell
                      style={{
                        padding: "8px",
                        width: "75%",
                        backgroundColor: "#f4f5fa"
                      }}
                      className="border"
                    >
                      Data not found
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default RTScanningListIdDetails;
