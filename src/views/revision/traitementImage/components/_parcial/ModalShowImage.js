import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { useTraitementImageContext } from '../../contexts/TraitementImage.context'
import { getImagePhysic } from '../../../../../services/imagesApi'

const ModalShowImage = () => {
    const {
        openModal,
        selectedImage,
        toogleOpenModal
    } = useTraitementImageContext()
    const toggle = () => toogleOpenModal("showImage")
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const fetchDatas = async () => {
        setIsLoading(true)
        const data = await getImagePhysic(selectedImage)
        const url = window.URL.createObjectURL(data)
        setData({ pdf: url })
        setIsLoading(false)
    }

    useEffect(() => {
        if (selectedImage) {
            fetchDatas()
        }
       
        return () => {
            setData({})
        }
    }, [selectedImage])

    return (
        <Modal id='modal-show-image' isOpen={openModal.showImage} toggle={toggle} size='lg'>
            <ModalHeader toggle={toggle}>
                {selectedImage?.nom}
            </ModalHeader>
            <ModalBody className='h-100'>
                {
                    isLoading ? (
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            <div className='spinner-border' style={{ width: '3rem', height: '3rem' }} role='status'>
                                <span className='visually-hidden'>Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <object data={data.pdf} width="100%" height={"100%"}></object>
                    )
                }
            </ModalBody>
        </Modal>
    )
}

export default ModalShowImage