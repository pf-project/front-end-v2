import React from "react";
import {
  //   ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import Done from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

// const useStyles = makeStyles(theme => ({
//   typography: {
//     padding: theme.spacing(2)
//   }
// }));

export default function AjoutAttribut({
  classes,
  handleChange,
  errors,
  item,
  position,
  addValues,
  removeLastValue,
  removeAllValues
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  //   const classes = useStyles();
  const showPopover = event => {
    setAnchorEl(event.currentTarget);
  };
  function handleClose() {
    setAnchorEl(null);
  }

  const annuler = () => {
    handleClose();
    removeAllValues(position);
    setNbrValues(typeof item.valeurs === "undefined" ? 1 : item.valeurs.length);
  };

  const valider = () => {
    handleClose();
  };

  const [nbrValues, setNbrValues] = React.useState(
    typeof item.valeurs === "undefined" ? 0 : item.valeurs.length
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const incrimentNbrValues = () => {
    setNbrValues(nbrValues + 1);
  };

  const dicrimentNbrValues = () => {
    if (nbrValues >= 0) {
      removeLastValue({ position, nbrValues });
      setNbrValues(nbrValues - 1);
    }
  };
  let Elementexists =
    item.valeurs.length == 0
      ? false
      : item.valeurs.some(elmnt => elmnt !== null && elmnt !== "");
  return (
    <TableRow>
      <TableCell component="td" scope="row">
        <TextValidator
          className={classes.input}
          onChange={handleChange(position)}
          name="nom"
          validators={["required", "maxStringLength:25"]}
          errorMessages={[errors.required, `${errors.size} ${25} characters `]}
          value={item.nom}
          //   label="Nom d'attribut : *"
        />
      </TableCell>
      <TableCell component="td" scope="row">
        <SelectValidator
          className={classes.select}
          value={item.type}
          onChange={handleChange(position)}
          name="type"
          //   label="Type d'attribut  :  *"
          //   style={{ minWidth: 300 }}
          validators={["required"]}
          errorMessages={[errors.required]}
        >
          <MenuItem value="number">Numérique</MenuItem>
          <MenuItem value="alphabetical">Alphabétique</MenuItem>
          <MenuItem value="alphanumeric">Alphanumérique</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="time">Heure</MenuItem>
          <MenuItem value="float">Décimale</MenuItem>
          <MenuItem value="float-1">Décimale, 1 après virgule</MenuItem>
          <MenuItem value="float-2">Décimale, 2 après virgules</MenuItem>
          <MenuItem value="float-3">Décimale, 3 après virgules</MenuItem>
          <MenuItem value="float-4">Décimale, 4 après virgules</MenuItem>
        </SelectValidator>
      </TableCell>
      <TableCell component="td" scope="row">
        <TextValidator
          className={classes.input}
          type="number"
          onChange={handleChange(position)}
          name="longueur"
          value={item.longueur}
          validators={["isNumber", "isPositive"]}
          errorMessages={[errors.number, `${errors.positive}  `]}
          //   label="Langueur max : *"
        />
      </TableCell>
      <TableCell>
        <Checkbox
          name="obligatoire"
          checked={item.obligatoire}
          onChange={handleChange(position)}
          color="primary"
          inputProps={{
            "aria-label": "secondary checkbox"
          }}
        />
      </TableCell>
      <TableCell>
        <Tooltip title="Ajouter">
          <Button
            variant="contained"
            color="primary"
            onClick={showPopover}
            aria-describedby={id}
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          style={{ minWidth: 400 }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
        >
          <Typography className={classes.typography}>
            {/* <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Valeurs :</TableCell>
                </TableRow>
              </TableHead>
              <TableBody> */}
            <Grid container style={{ minWidth: 300 }}>
              <Grid xs={3}>
                {Elementexists && (
                  <Tooltip title="Valider">
                    <Button
                      color="primary"
                      variant="outlined"
                      size="small"
                      className={classes.margin}
                      onClick={valider}
                    >
                      <Done />
                    </Button>
                  </Tooltip>
                )}
              </Grid>
              <Grid xs={3}>
                <Tooltip title="Annuler">
                  <Button
                    onClick={annuler}
                    variant="outlined"
                    size="small"
                    className={classes.margin}
                  >
                    <CancelIcon />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
            {[...Array(nbrValues).keys()].map(index => (
              // <TableRow>
              //   <TableCell>
              <TextField
                label={`${index + 1}`}
                value={item.valeurs[index]}
                onChange={addValues(position)(index)}
                type={item.type}
                // margin="normal"
                // variant="outlined"
              />
              //   </TableCell>
              // </TableRow>
            ))}
            <div>
              {" "}
              {Elementexists && (
                <>
                  <Checkbox
                    name="limite"
                    checked={item.limite}
                    onChange={handleChange(position)}
                    //   value="checkedB"
                    color="primary"
                    inputProps={{
                      "aria-label": "secondary checkbox"
                    }}
                  />
                  <span>se limiter par ces valeurs </span>
                </>
              )}
            </div>
            <div>
              <Tooltip title="Ajouter">
                <IconButton
                  onClick={incrimentNbrValues}
                  color="primary"
                  className={classes.button}
                  disabled={!item.type || item.type === ""}
                >
                  +
                </IconButton>
              </Tooltip>
              <Tooltip title="Supprimer">
                <IconButton
                  onClick={dicrimentNbrValues}
                  color="primary"
                  className={classes.button}
                >
                  -
                </IconButton>
              </Tooltip>
              <p />
              {(!item.type || item.type === "") && (
                <span>Veuillez choisir le type d'attribut </span>
              )}
            </div>

            {/* <TableRow>
                  <TableCell> */}

            {/* </TableCell>
                </TableRow>
              </TableBody>
            </Table> */}
          </Typography>
        </Popover>
      </TableCell>
    </TableRow>
  );
}
