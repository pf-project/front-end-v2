import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1000
  }
}));

export default function SimpleTable({
  data,
  handleSelect,
  selectedRows,
  headers
}) {
  const classes = useStyles();
  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  const renderRow = row =>
    keys.map(key => (
      <TableCell component="th" scope="row">
        {row[key]}
      </TableCell>
    ));

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            {!headers &&
              keys.map((key, idx) => (
                <TableCell key={idx + 1}>{key}</TableCell>
              ))}
            {headers &&
              data.length !== 0 &&
              headers.map((key, idx) => (
                <TableCell key={idx + 1}>{key}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => {
            let selected = selectedRows.includes(idx);
            return (
              <TableRow
                key={idx}
                hover
                onClick={handleSelect(idx)}
                role="checkbox"
                selected={selected}
              >
                {" "}
                <TableCell component="th" scope="row">
                  <Checkbox checked={selected} padding="checkbox" />
                </TableCell>{" "}
                {renderRow(row)}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.defaultProps = {
  data: [],
  selectedRows: []
};
