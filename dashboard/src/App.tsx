import React, { Fragment } from "react";

import "fontsource-roboto";
import { Container, GridList, GridListTile } from "@material-ui/core";

import { WelcomeScreen } from "./components/WelcomeScreen";
import { DataTile, MqttDataType } from "./components/DataTile";

const tileData: MqttDataType[] = [
  {
    key: 1,
    type: "Temperature",
    state: "10 Degrees",
    date: "27/02/2021",
    time: "12:02 p.m.",
  },
  {
    key: 2,
    type: "Humidity",
    state: "30%",
    date: "27/02/2021",
    time: "12:02 p.m.",
  },
  {
    key: 3,
    type: "Led Light",
    state: "Off",
    date: "27/02/2021",
    time: "12:02 p.m.",
  },
  {
    key: 4,
    type: "Button",
    state: "Off",
    date: "27/02/2021",
    time: "12:02 p.m.",
  },
];

export const App = () => (
  <Fragment>
    <WelcomeScreen />
    <Container>
      <GridList cols={2}>
        {tileData.map((tile) => (
          <GridListTile key={tile.key} cols={1}>
            <DataTile {...tile} />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  </Fragment>
);
