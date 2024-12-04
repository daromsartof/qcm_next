import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useTraitementImageContext } from '../contexts/TraitementImage.context'

const ModalContainer = ({
    isOpen,
    toggle
}) => {
    const {
        filter,
        fetchImages // Ajout de fetchImages depuis le contexte
    } = useTraitementImageContext()
    // Nouvelle fonction pour gérer le clic sur le bouton Valider
    const handleValidate = () => {
        fetchImages({}) // Appel de la fonction fetchImages
        toggle() // Fermeture de la modal
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                {filter.type.label}
            </ModalHeader>
            <ModalBody>
                {filter.type.filterRender}
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={handleValidate}>
                    Valider
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalContainer