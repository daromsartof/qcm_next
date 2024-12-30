import CustomTextField from "@/@core/components/mui/TextField"
import { getAllSources } from "@/services/sourceService"
import { MenuItem } from "@mui/material"
import { useEffect, useState } from "react"

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
            {
                sources.map((source, index) => (
                    <MenuItem key={index} value={source.id}>{source.title}</MenuItem>
                ))
            }
        </CustomTextField>
    )
}

export default RenderSource