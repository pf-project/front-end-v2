import React from "react";
import { Link, Grid, Card, Typography, Box, Divider } from "@material-ui/core";

const LivreElement = ({ ecritureData, classes, serchByLettrage }) => {
  const {
    dataTable,
    dateComptable,
    lettrageManuel,
    libelleOperation,
    reference
  } = ecritureData;
  return (
    <Card small className={classes.LivreElement}>
      <Grid container spacing={2} direction="column">
        <Grid container direction="row">
          <Grid item sm={2}>
            <Typography component="div">
              <Box textAlign="left" m={1}>
                N° écriture
              </Box>
            </Typography>
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
              onClick={serchByLettrage(lettrageManuel)}
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
