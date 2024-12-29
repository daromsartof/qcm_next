import React from 'react';
import RenderResponse from './RenderResponse';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

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