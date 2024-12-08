import React from 'react'

import { Card, CardContent, Grid, MenuItem } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'

const QuizFilter = () => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={3}>
                        <CustomTextField select fullWidth defaultValue={0} label='Catégorie' id='select-category'>
                            <MenuItem value={0} selected>
                                <em>Tous</em>
                            </MenuItem>
                        </CustomTextField>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <CustomTextField select fullWidth defaultValue={0} label='Source' id='select-source'>
                            <MenuItem value={0} selected>
                                <em>Tous</em>
                            </MenuItem>
                        </CustomTextField>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <CustomTextField select fullWidth defaultValue={0} label='Matière' id='select-matière'>
                            <MenuItem value={0} selected>
                                <em>Tous</em>
                            </MenuItem>
                        </CustomTextField>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default QuizFilter