import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ModalComponent = ({ children }) => {
    const { open, title } = useSelector(state => state.modal);

    const dispatch = useDispatch();

    const handleClose = () => dispatch(closeModal());

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Card variant='outline'>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                            {title}
                        </Typography>
                        {children}
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    )
}
