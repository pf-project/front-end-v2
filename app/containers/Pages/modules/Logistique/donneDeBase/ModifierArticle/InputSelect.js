import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function CustomizedSelects({
  handleValeursChange,
  valeur,
  valeurs
}) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const handleChange = event => {
    setAge(event.target.value);
  };
  return (
    <ValidatorForm className={classes.root} autoComplete="off">
      <FormControl className={classes.margin}>
        <TextValidator
          onChange={handleValeursChange}
          name="valeur"
          value={valeur}
          label="Valeur"
        />
      </FormControl>
      <FormControl className={classes.margin}>
        <SelectValidator
          value={valeur}
          onChange={handleValeursChange}
          name="valeur"
          label="valeur"
          style={{ minWidth: 100 }}
          validators={["required"]}
          errorMessages={["Ce Champ est Obligatoire : "]}
        >
          {valeurs &&
            valeurs.map(valeur => (
              <MenuItem value={valeur}>{valeur} </MenuItem>
            ))}
        </SelectValidator>
      </FormControl>
    </ValidatorForm>
  );
}
