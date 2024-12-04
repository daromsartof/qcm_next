import React, { useEffect, useState } from 'react'
import AccordionContainer from '../../../common/container/AccordionContainer'
import { Row } from 'reactstrap'
import ExerciceFilter from '../../../common/ExerciceFilter'
import ClientFilter from '../../../common/ClientFilter'
import SiteFilter from '../../../common/SiteFilter'
import DossierFilter from '../../../common/DossierFilter'
import { useTraitementImageContext } from '../contexts/TraitementImage.context'
import ModalContainer from './ModalContainer'
import FiltreBy from './_parcial/FiltreBy'
import Status from './_parcial/Status'
import { DEFAULT_FILTER_VALUE } from '../services/traitementImage.interface'
import PieceRemarquable from './_parcial/PieceRemarquable'

const Filter = ({

}) => {
    const {
        fetchImages,
        filter: {
            status
        },
        setFilter,
        fetchHistoriqueUploadDate,
        fetchDateScan
    } = useTraitementImageContext()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showPieceRemarquable, setShowPieceRemarquable] = useState(false)
    const togglePieceRemarquable = () => setShowPieceRemarquable(!showPieceRemarquable)
    const toggleModal = () => setIsModalOpen(!isModalOpen)

    const handleChangeDossier = (dossier) => {
        fetchHistoriqueUploadDate(dossier)
        fetchImages({
            dossier_id: dossier
        })
        fetchDateScan(dossier)
    }


    useEffect(() => {
        if (isModalOpen) {
            setFilter((filter) => {
                return {
                    ...filter,
                    categorie: DEFAULT_FILTER_VALUE.categorie,
                    num_image: DEFAULT_FILTER_VALUE.num_image,
                    tree_category: DEFAULT_FILTER_VALUE.tree_category,
                    nom_original: DEFAULT_FILTER_VALUE.nom_original,
                    date_envoi: DEFAULT_FILTER_VALUE.date_envoi
                }
            })
        }
        return () => { }
    }, [isModalOpen])

    return (
        <AccordionContainer title='Filtre' headerClassName="accordion-traitement-image">
            <Row>
                <ExerciceFilter className={"mb-0"} md={2} />
                <ClientFilter className={"mb-0"} />
                <SiteFilter className={"mb-0"} />
                <DossierFilter
                    withAllDossier
                    className={"mb-0"}
                    onChange={handleChangeDossier}
                    placeholder='Tous...'
                />
                <Status
                    value={status}
                />
                <FiltreBy
                    md='2'
                    onChange={(item) => {
                        // pièce remarquable
                        if (item.value === 4) {
                            togglePieceRemarquable()
                        } else {
                            toggleModal()
                        }

                    }}
                />
            </Row>
            <PieceRemarquable
                isOpen={showPieceRemarquable}
                toggle={togglePieceRemarquable}
            />
            <ModalContainer
                isOpen={isModalOpen}
                toggle={toggleModal}
            />
        </AccordionContainer>
    )
}

export default Filter