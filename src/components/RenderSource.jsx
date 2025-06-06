import { useEffect, useState } from "react"

import { MenuItem } from "@mui/material"

import CustomTextField from "@/@core/components/mui/TextField"
import { getAllSources } from "@/services/sourceService"

const RenderSource = ({
    value,
    onChange
}) => {
    const [sources, setSources] = useState([])

    const handleFetchSources = async () => {
        try {
            const matiere = await getAllSources()

            setSources(matiere)
        } catch (error) {
            console.error('Error fetching matieres:', error)
        }
    }

    useEffect(() => {
        handleFetchSources()

        return () => {
            setSources([])
        }
    }, [])


    return (
        <CustomTextField
            select
            fullWidth
            label='Sources'
            value={value}
            onChange={onChange}
        >
             <MenuItem value={0}>Tous</MenuItem>
            {
                sources.map((source, index) => (
                    <MenuItem key={index} value={source.id}>{source.title}</MenuItem>
                ))
            }
        </CustomTextField>
    )
}

export default RenderSource