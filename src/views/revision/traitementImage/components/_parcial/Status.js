import React from 'react'
import { Col, Label } from 'reactstrap'
import { STATUS_INTERFACE } from '../../services/traitementImage.interface'
import Select from "react-select"
import { useTraitementImageContext } from '../../contexts/TraitementImage.context'
import { useSelector } from 'react-redux'

const Status = ({
    onChange = () => {},
    md = "2",
    value
}) => {
    const {
        handleChangeFilter,
        fetchImages,
        fetchCategories
    } = useTraitementImageContext()
    const { dossier } = useSelector(({ filtre }) => filtre)

    const handleChange = (item) => {
        handleChangeFilter("status", item)
        fetchCategories(item.value) 
        // Vérification si le dossier existe et n'est pas égal à 0 avant d'appeler fetchImages
        if (dossier && dossier !== 0) {
            fetchImages({
                type: item.value,
                dossier_id: dossier
            })
        }
        onChange(item)
    }

    return (
        <Col md={md} sm='12'>
            <Label className='form-label'>Statut</Label>
            <Select
                className='react-select'
                classNamePrefix='select'
                options={STATUS_INTERFACE}
                value={value}
                isClearable={false}
                onChange={handleChange}
            />
        </Col>
    )
}

export default Status