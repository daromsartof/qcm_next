import React from 'react'
import Select from 'react-select'
import { useTraitementImageContext } from '../../contexts/TraitementImage.context'

const CategorieFilter = () => {
    const { options, filter, handleChangeFilter } = useTraitementImageContext()

    return (
        <div>
            <Select
                className='react-select'
                classNamePrefix='select'
                options={options.categories}
                value={filter.categorie}
                onChange={(selectedOption) => handleChangeFilter('categorie', selectedOption)}
                isClearable={true}
            />
        </div>
    )
}

export default CategorieFilter