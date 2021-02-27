import React from "react";
import {
  Card,
  CardContent,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";

export interface MqttDataType {
  key: number;
  type: string;
  state: string;
  date: string;
  time: string;
}

export const DataTile = ({ type, state, date, time }: MqttDataType) => (
  <Card variant="outlined">
    <CardContent>
      <Paper>
        <Typography variant="h4" align="center">
          {`${type}`}
        </Typography>
        <Typography variant="h5" align="center">
          {`${state}`}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
        >{`Last Updated: ${date}, ${time}`}</Typography>
        <Button size="medium" onClick={() => alert("Sensor!")}>
          Learn More
        </Button>
      </Paper>
    </CardContent>
  </Card>
);
