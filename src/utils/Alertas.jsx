import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useSelector, useDispatch } from 'react-redux';
import { closeAlert } from '../store/alerts';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AlertSucces = () => {
    const { open, msg, vertical, severity } = useSelector(state => state.alertas);

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeAlert());
    }

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar onClose={handleClose} open={open} autoHideDuration={3000} anchorOrigin={{ vertical, horizontal: 'right' }}>
                <Alert severity={severity} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
