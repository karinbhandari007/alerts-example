import React, {
  ChangeEvent,
  FunctionComponent,
  ReactElement,
  useState,
} from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Alert, AlertType, openAlert } from "../../redux/alert/alert.slice";
import { useAppDispatch } from "../../hooks/store";
import { Paper, Typography } from "@mui/material";
import styles from "./alert-example.module.css";

const getUniqId = (): string => "id-" + new Date().getTime();

const AlertUI: FunctionComponent = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [alertDetails, setAlertDetails] = useState<Alert>({
    id: getUniqId(),
    title: "",
    text: "",
    link: "",
    timeLimit: 10,
    type: "success",
  });

  const _inputChangeHandler = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<any>,
    input: alertInput
  ) => {
    if (input === "title") {
      setAlertDetails((prevState) => ({
        ...prevState,
        title: event.target.value,
      }));
    } else if (input === "text") {
      setAlertDetails((prevState) => ({
        ...prevState,
        text: event.target.value,
      }));
    } else if (input === "link") {
      setAlertDetails((prevState) => ({
        ...prevState,
        link: event.target.value,
      }));
    } else if (input === "time-limit") {
      setAlertDetails((prevState) => ({
        ...prevState,
        timeLimit: parseInt(event.target.value),
      }));
    } else if (input === "alert-type") {
      setAlertDetails((prevState) => ({
        ...prevState,
        alertType: event.target.value as AlertType,
      }));
    }
  };

  const _createAlerts = () =>
    dispatch(openAlert({ ...alertDetails, id: getUniqId() }));
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      className={styles["box"]}
    >
      <Paper elevation={6} className={styles["paper"]}>
        <Typography variant="h4" gutterBottom component="div">
          Alert Example
        </Typography>
        <Stack spacing={2} className={styles["stack"]}>
          <TextField
            id="alert-text"
            label="Alert Title"
            defaultValue=""
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => _inputChangeHandler(event, "title")}
          />
          <TextField
            id="alert-text"
            label="Alert Text"
            defaultValue=""
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => _inputChangeHandler(event, "text")}
          />
          <TextField
            id="alert-link"
            label="Alert Link"
            defaultValue=""
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => _inputChangeHandler(event, "link")}
          />
          <TextField
            id="alert-time-limit"
            label="Time limit (Seconds)"
            defaultValue={alertDetails.timeLimit}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => _inputChangeHandler(event, "time-limit")}
          />

          <FormControl>
            <InputLabel id="alert-type-label">Alert Type</InputLabel>
            <Select
              id="alert-type"
              label="alert-type"
              defaultValue={alertDetails.type}
              onChange={(event: SelectChangeEvent<any>) =>
                _inputChangeHandler(event, "alert-type")
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="success">Success</MenuItem>
              <MenuItem value="error">Error</MenuItem>
              <MenuItem value="warning">Warning</MenuItem>
              <MenuItem value="info">Info</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" size="large" onClick={_createAlerts}>
            Submit
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

type alertInput = "title" | "text" | "link" | "time-limit" | "alert-type";

export default AlertUI;
