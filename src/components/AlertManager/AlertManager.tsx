/**
 * @description Stateless component: displays all active Alerts.
 */
import React, {
  forwardRef,
  FunctionComponent,
  ReactElement,
  useCallback,
  useEffect,
} from "react";
/**
 * MUI components
 */
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import { Link, Typography } from "@mui/material";
/**
 * Redux
 */
import { Alert as AlertType, closeAlert } from "../../redux/alert/alert.slice";
import { alertSelector } from "../../redux/alert/alert.selectors";
import { useAppDispatch, useAppSelector } from "../../hooks/store";

const MuiAlert = forwardRef<HTMLDivElement, any>((props, ref) => {
  const { id, text, title, timeLimit, link } = props;
  const dispatch = useAppDispatch();

  /**
   * @description closes active alert component based on provided id
   */
  const _handleClose = useCallback(
    () => dispatch(closeAlert({ alertId: id })),
    [id, dispatch]
  );

  /**
   * @returns JSX element (Alert details)
   */
  const AlertChildren = () => (
    <>
      {title.length ? <AlertTitle>{title}</AlertTitle> : <React.Fragment />}
      {text ? (
        <Typography variant="body2" component="div">
          {text}
        </Typography>
      ) : (
        <React.Fragment />
      )}
    </>
  );

  /**
   * @description closes alert component after provided time limit
   */
  useEffect(() => {
    setTimeout(() => {
      _handleClose();
    }, timeLimit);
  }, [props, _handleClose, timeLimit]);

  return (
    <Alert
      id={id}
      elevation={6}
      ref={ref}
      variant="filled"
      severity={props.alertType}
      {...props}
      onClose={_handleClose}
    >
      {link.length ? (
        <Link
          href={link}
          underline="none"
          color="white"
          target="_blank"
          variant="body2"
        >
          <AlertChildren />
        </Link>
      ) : (
        <AlertChildren />
      )}
    </Alert>
  );
});

const AlertManager: FunctionComponent = (): ReactElement => {
  const alerts = useAppSelector(alertSelector);

  /**
   * @description if no alerts return empty component
   */
  if (!alerts.length) {
    return <React.Fragment />;
  }

  /**
   * @description if alerts on store loop through it and display alerts on right top
   */
  return (
    <Stack sx={{ position: "absolute", top: 10, right: 10 }} spacing={2}>
      {alerts.map((alert: AlertType) => {
        const { id } = alert;
        return <MuiAlert key={id} {...alert} />;
      })}
    </Stack>
  );
};

export default AlertManager;
