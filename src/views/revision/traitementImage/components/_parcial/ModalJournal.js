import React from 'react'
import Table from '../../../../etats/comptables/Table'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { useTraitementImageContext } from '../../contexts/TraitementImage.context'
import { ACTIVE_MODAL } from '../../services/traitementImage.interface'

const ModalJournal = ({
    active,
    title
}) => {

    const {
        openModal,
        modalData,
        toogleOpenModal
    } = useTraitementImageContext()
    const toggle = () => {
        toogleOpenModal(ACTIVE_MODAL[active])
    }
    return (
        <Modal isOpen={openModal.journal} toggle={toggle} size="xl">
            <ModalHeader toggle={toggle}>
                {title}
            </ModalHeader>
            <ModalBody>
                
                <Table
                    styles={{
                        maxBodyHeight: '600px'
                    }}
                    active={active}
                    datas={modalData[ACTIVE_MODAL[active]]}
                />
            </ModalBody>
        </Modal>
    )
}

export default ModalJournal