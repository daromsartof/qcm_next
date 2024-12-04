import React from 'react'
import ColumnCompte from '../../../../common/materialTable/ColumnCompte'

const RenderGrandLivre = ({ image = {
    ecriture: [],
    id: 0,
    nom: ""
} }) => {
    return (
        <div className='d-flex'>
            {image.ecriture.map((detail, index) => (
                <div key={index} className='mx-1'>
                    
                    <ColumnCompte image={{
                        id: image.id,
                        nom: image.nom
                    }} compte={detail} />
                </div>
            ))}
        </div>
    )
}

export default RenderGrandLivre
