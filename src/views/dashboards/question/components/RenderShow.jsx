import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

import RenderResponse from './RenderResponse';

const RenderShow = ({ 
    questionTitle, 
    responses, 
    correctAnswer,
    open,
    setOpen
 }) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="quiz-question">
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{questionTitle}</DialogTitle>
                <DialogContent>
                    <RenderResponse data={responses} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RenderShow;