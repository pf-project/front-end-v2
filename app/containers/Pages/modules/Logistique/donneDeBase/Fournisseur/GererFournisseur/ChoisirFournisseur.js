import React, { useState } from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.object.isRequired,
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 100
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`
  },
  inputRoot: {
    flexWrap: "wrap"
  }
});

// const handleChange = event => console.log(event.target.value);

function ChoisirFournisseur(props) {
  const { classes, codes, designations, handleSelect, loading } = props;
  const [filterByDesignation, setFilter] = useState(false);
  if (!loading) {
    const codesSuggestions = [];
    const designationsSuggestions = [];
    if (codes && designations)
      for (let index = 0; index < codes.length; index++) {
        codesSuggestions.push({ label: codes[index] });
        designationsSuggestions.push({ label: designations[index] });
      }
    function getSuggestions(inputValue) {
      let count = 0;
      let suggestions = filterByDesignation
        ? designationsSuggestions
        : codesSuggestions;
      return suggestions.filter(suggestion => {
        const keep =
          (!inputValue ||
            suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !==
              -1) &&
          count < 5;

        if (keep) {
          count += 1;
        }

        return keep;
      });
    }
    return (
      <div className={classes.root}>
        <RadioGroup
        // className={classes.group}
        // value={value}
        // onChange={handleChange}
        >
          <FormControlLabel
            control={
              <Radio
                checked={filterByDesignation}
                onChange={() => setFilter(true)}
                color="primary"
                name="filter"
              />
            }
            label="Suggérer Par designations"
          />
          <FormControlLabel
            control={
              <Radio
                checked={!filterByDesignation}
                onChange={() => setFilter(false)}
                color="primary"
                name="filter"
              />
            }
            label="Suggérer Par codes"
          />
        </RadioGroup>
        <Downshift>
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex
          }) => (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  placeholder: "Chercher l'Article à modifier",
                  id: "integration-downshift-simple"
                })
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({
                        onClick: handleSelect(filterByDesignation)(
                          suggestion.label
                        ),
                        item: suggestion.label
                      }),
                      highlightedIndex,
                      selectedItem
                    })
                  )}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
      </div>
    );
  }
  return (
    <center>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </center>
  );
}

ChoisirFournisseur.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChoisirFournisseur);
