import React from 'react'
import { Col, Label } from 'reactstrap'
import { FILTER_INTERFACE } from '../../services/traitementImage.interface'
import Select from "react-select"
import { useTraitementImageContext } from '../../contexts/TraitementImage.context'
import { useSelector } from 'react-redux'
const FiltreBy = ({
    md = "2",
    onChange
}) => {
    const {
        handleChangeFilter
    } = useTraitementImageContext()
    const { dossier } = useSelector(({ filtre }) => filtre)
    const handleChange = async (item) => {
        handleChangeFilter("type", item)
        onChange(item)
    }
    return (
        <Col md={md}>
            <Label className='form-label'>Filtre par </Label>
            <Select
                className='react-select'
                classNamePrefix='select'
                options={FILTER_INTERFACE}
                defaultValue={FILTER_INTERFACE[0]}
                isDisabled={dossier === 0}
                isClearable={false}
                onChange={handleChange}
            />
        </Col>
    )
}

export default FiltreBy