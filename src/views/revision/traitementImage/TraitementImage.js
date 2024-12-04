import React from 'react'
import TraitementImageContextProvider, {  } from './contexts/TraitementImage.context'
import Filter from './components/Filter'
import TableImageTraitement from './components/TableImageTraitement'
import './styles/style.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import VisuImage from '../../images/visuImage/VisuImage'
import ModalJournal from './components/_parcial/ModalJournal'
import VisuCompte from '../../images/visuImage/VisuCompte'
import ModalShowImage from './components/_parcial/ModalShowImage'

const TraitementImage = () => {

  return (
    <div id='traitement-image'>
      <TraitementImageContextProvider>
        <Filter />
        <TableImageTraitement />
        <VisuImage />
        <VisuCompte defaultExpanded={true} />
        <ModalJournal
          active={2}
          title={"Journal"}
        />
        <ModalShowImage />
      </TraitementImageContextProvider>
    </div>
  )
}

export default TraitementImage