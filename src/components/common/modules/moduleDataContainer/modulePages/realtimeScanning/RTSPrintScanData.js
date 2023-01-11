import React from "react";
import {
  TableBody,
  TableContainer,
  Table,
  TableCell,
  TableRow
} from "@mui/material";

function RTSPrintScanData(props) {
  const { completeData, moduleName, currentDate, loggedUser } = props;

  const completeHeader = [
    "ListId",
    "ListName",
    "MatchScore",
    "MatchedInfo",
    "MatchedDate",
    "Comments",
    "Status"
  ];
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody variant="outlined">
            <TableRow style={{ width: "25px" }}>
              <TableCell style={{ textDecorationLine: "underline" }}>
                UserInfo: <b>{moduleName}</b>
              </TableCell>
              <TableCell style={{ textDecorationLine: "underline" }}>
                Dated On: <b>{currentDate}</b>
              </TableCell>
              <TableCell style={{ textDecorationLine: "underline" }}>
                UserCode: <b>{loggedUser}</b>
              </TableCell>
            </TableRow>
            {completeData.map((data, dataIndex) => (
              <React.Fragment key={dataIndex}>
                <TableCell
                  colSpan={3}
                  style={{
                    backgroundColor: "#003463",
                    color: "white",
                    padding: "8px"
                  }}
                >
                  Black List Details :
                </TableCell>
                {completeHeader.map((header, headerIndex) => {
                  return (
                    <TableRow
                      key={headerIndex}
                      style={{ backgroundColor: "#f4f5fa" }}
                    >
                      <TableCell style={{ padding: "8px" }}>{header}</TableCell>
                      {header === "Comments" ? (
                        <TableCell
                          colSpan={2}
                          style={{ padding: "8px" }}
                        ></TableCell>
                      ) : (
                        <TableCell colSpan={2} style={{ padding: "8px" }}>
                          <b>{data[headerIndex]}</b>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default RTSPrintScanData;
