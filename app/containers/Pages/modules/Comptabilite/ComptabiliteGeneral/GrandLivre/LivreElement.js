import React from "react";
import { Link, Grid, Card, Typography, Box, Divider } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const LivreElement = ({
  ecritureData,
  classes,
  findSimilarLettrage,
  handleSelect,
  index,
  selectedIndex
}) => {
  const {
    dataTable,
    dateComptable,
    lettrageManuel,
    libelleOperation,
    reference,
    ecriture_comptable
  } = ecritureData;
  return (
    <Card small className={classes.LivreElement}>
      <Grid container spacing={2} direction="column">
        <Grid container direction="row">
          <Grid item sm={2}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleSelect({
                    element: ecritureData,
                    index
                  })}
                  checked={index === selectedIndex}
                  value="checkedC"
                />
              }
              label={ecriture_comptable}
            />
          </Grid>

          <Grid item sm={8}>
            <Typography component="div">
              <Box textAlign="center" m={1}>
                {libelleOperation} / {dateComptable} / {reference}
              </Box>
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography
              onClick={findSimilarLettrage(lettrageManuel)}
              component="div"
            >
              <Link>
                <Box textAlign="right" m={1}>
                  {lettrageManuel}
                </Box>
              </Link>
            </Typography>
          </Grid>
        </Grid>

        <Divider />
        <Grid container direction="row">
          <Grid item sm={10} />
          <Grid item sm={1}>
            {" "}
            <Box fontWeight="fontWeightMedium" textAlign="left" m={1}>
              Débit
            </Box>
          </Grid>
          <Grid item sm={1}>
            {" "}
            <Box fontWeight="fontWeightMedium" textAlign="right" m={1}>
              Crédit
            </Box>{" "}
          </Grid>
        </Grid>
        {dataTable &&
          dataTable.map(element => {
            const {
              comptegeneral,
              designation,
              debiterCrediter,
              montant
            } = element;
            let textAlign = debiterCrediter === "Crédit" ? "right" : "left";
            return (
              <>
                <Grid container direction="row">
                  <Grid item sm={2}>
                    <Typography component="div">
                      <Box textAlign="left" m={1}>
                        {comptegeneral}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item sm={7}>
                    <Typography component="div">
                      <Box textAlign={textAlign} m={1}>
                        {designation}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item sm={1} />
                  <Grid item sm={2}>
                    <Typography component="div">
                      <Box textAlign={textAlign} m={1}>
                        {montant}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>{" "}
                <Divider variant="middle" light={true} />
              </>
            );
          })}
      </Grid>
    </Card>
  );
};

LivreElement.defaultProps = {
  ecritureData: {}
};

export default LivreElement;
