// React Imports
import { useState } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import { Plus } from 'react-feather'
import MatierCard from './MatierCard'
import { Grid } from '@mui/material'

const data = [
    { key: 0, avatar: '/images/avatars/1.png', avatarAlt: 'User Avatar', label: 'Norman Santiago' },
    { key: 1, avatar: '/images/avatars/2.png', avatarAlt: 'User Avatar', label: 'Cecelia Tucker' },
    { key: 2, label: 'Max Burns' },
    { key: 3, avatar: '/images/avatars/4.png', avatarAlt: 'User Avatar', label: 'Ellen Nguyen' },
    { key: 4, avatar: '/images/avatars/5.png', avatarAlt: 'User Avatar', label: 'Edward Francis' }
]

// Separate component for rendering each chip
const ChipItem = ({ data, onDelete }) => {
    const avatarUrl = data.avatar ? data.avatar : undefined

    return (
        <Chip
            deleteIcon={<Plus size={18} />}
            key={data.key}
            label={data.label}
            avatar={avatarUrl ? <Avatar src={avatarUrl} alt={data.avatarAlt} /> : <></>}
            onDelete={onDelete}
        />
    )
}

const MatiereList = () => {
    // States
    const [chipData, setChipData] = useState(data)
    const [activeMatiere, setActiveMatiere] = useState([])
    const handleDelete = chipToDelete => () => {
        setChipData(chips => {
            return chips.filter(chip => chip.key !== chipToDelete.key)
        })
        setActiveMatiere((activeMatiere) => {
            const active = [...activeMatiere]
            active.push(chipToDelete)
            return active
        })
    }

    return (
        <div>
            <div className='flex gap-4 flex-wrap mb-4'>
                {chipData.map(data => (
                    <ChipItem key={data.key} data={data} onDelete={handleDelete(data)} />
                ))}
            </div>
            <Grid container spacing={6}>
            {
                activeMatiere.map((data, key) => (
                    <MatierCard data={data} key={key} />
                ))
            }
            </Grid>
            
        </div>

    )
}

export default MatiereList