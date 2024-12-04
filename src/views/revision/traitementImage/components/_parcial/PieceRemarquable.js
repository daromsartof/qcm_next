import React, { } from "react"
import DropdownTreeSelect from "react-dropdown-tree-select"
import "react-dropdown-tree-select/dist/styles.css"
import { useTraitementImageContext } from "../../contexts/TraitementImage.context"

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
let value = []
const PieceRemarquable = ({
    isOpen = false,
    toggle = () => {}
}) => {

    const {
        options: {
            categorieTree
        },
        fetchImages
    } = useTraitementImageContext()

    const onChange = (_currentNode, selectedNodes) => {
        value = selectedNodes
    }

    const handleValidate  = () => {
       const filter = {}
       value.forEach((item) => {
            if (item.type in filter) {
                filter[item.type].push(item.value) 
            } else {
                filter[item.type] = [item.value]
            }
       })
       console.log({
        ...filter
      })
       fetchImages({
         ...filter
       })
       toggle()  // fermeture de la modal
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                {"Pièce rémarquable"}
            </ModalHeader>
            <ModalBody>
                <DropdownTreeSelect data={categorieTree} onChange={onChange} className="piece-remarquable" />
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={handleValidate}>
                    Valider
                </Button>
            </ModalFooter>
        </Modal>
    )
}
export default PieceRemarquable
