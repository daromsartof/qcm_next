import React from 'react'
import { Button, Input } from 'reactstrap'
import { useTraitementImageContext } from '../../contexts/TraitementImage.context'

const NumPieceFilter = ({
    isOriginal
}) => {
    const { filter, handleChangeFilter } = useTraitementImageContext()

    return (
        <div>
            <Input
                value={isOriginal ? filter.nom_original : filter.num_image}
                placeholder={isOriginal ? 'nom originale de pièce' : 'numero de pièce'}
                onChange={({target}) => handleChangeFilter(isOriginal ? 'nom_original' : 'num_image', target.value)}
            />
        </div>
    )
}

export default NumPieceFilter