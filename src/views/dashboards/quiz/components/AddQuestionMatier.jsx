import CustomTextField from "@/@core/components/mui/TextField"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from "@mui/material"

const AddQuestionMatier = ({ open, toggle,questions, handleSaveQuestion }) => {
    return (
        <div>
            <Dialog open={open} maxWidth={"lg"} fullWidth={true} onClose={toggle} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Matières</DialogTitle>
                <DialogContent>
                <CustomTextField
                    select
                    fullWidth
                    required
                    label='Questions'
                >
                    {
                        questions.map((question, index) => (
                            <MenuItem key={index} value={question.id}>{question.title}</MenuItem>
                        ))
                    }
                </CustomTextField>
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    <Button onClick={toggle}>Annuler</Button>
                    <Button onClick={handleSaveQuestion}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddQuestionMatier