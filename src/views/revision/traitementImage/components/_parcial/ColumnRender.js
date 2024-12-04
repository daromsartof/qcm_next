import React from 'react'
import { useTraitementImageContext } from '../../contexts/TraitementImage.context'

const RenderNameOriginal = ({
    image
}) => {
    const {
        setSelectedImage,
        toogleOpenModal
    } = useTraitementImageContext()
    const handleClick = () => {
        setSelectedImage(image)
        toogleOpenModal("showImage")
    }
    return (
        <div className={image.id > 0 ? 'pointer' : ''} onClick={handleClick} style={{
            color: "black"
        }}>{image.originale}</div>
    )
}

export {
    RenderNameOriginal
} 