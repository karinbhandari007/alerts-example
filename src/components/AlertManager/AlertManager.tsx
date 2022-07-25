import React, {
  forwardRef,
  FunctionComponent,
  ReactElement,
  useCallback,
  useEffect,
} from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import { Alert as AlertType, closeAlert } from "../../redux/alert/alert.slice";
import { alertSelector } from "../../redux/alert/alert.selectors";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { Link, Typography } from "@mui/material";

const MuiAlert = forwardRef<HTMLDivElement, any>((props, ref) => {
  const { id, text, title, timeLimit } = props;
  const dispatch = useAppDispatch();

  const _handleClose = useCallback(
    () => dispatch(closeAlert({ alertId: id })),
    [id, dispatch]
  );

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
      {title.length ? <AlertTitle>{title}</AlertTitle> : <React.Fragment />}
      {text ? (
        <Typography variant="body2" component="div">
          {text}
        </Typography>
      ) : (
        <React.Fragment />
      )}
    </Alert>
  );
});

const AlertManager: FunctionComponent = (): ReactElement => {
  const alerts = useAppSelector(alertSelector);

  if (!alerts.length) {
    return <React.Fragment />;
  }

  return (
    <Stack sx={{ position: "absolute", top: 10, right: 10 }} spacing={2}>
      {alerts.map((alert: AlertType) => {
        const { id, link } = alert;
        if (link.length) {
          return (
            <Link href={link} underline="none" target="_blank" variant="body2">
              <MuiAlert key={id} {...alert} />
            </Link>
          );
        }
        return <MuiAlert key={id} {...alert} />;
      })}
    </Stack>
  );
};

export default AlertManager;
