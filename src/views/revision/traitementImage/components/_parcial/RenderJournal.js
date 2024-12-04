import { useTraitementImageContext } from "../../contexts/TraitementImage.context"  

const RenderJournal = ({
    journalDossier
}) => {
    const { toogleOpenModal, fetchJournal } = useTraitementImageContext()
    const handleClick = () => {
        toogleOpenModal('journal')
        fetchJournal(journalDossier?.id)
    }
    return (
        <div style={{
            width: '100%'
        }}>
            <div className={"w-100 texte-center d-flex justify-content-center"} onClick={handleClick}>{journalDossier?.journal?.code}</div>
        </div>
    )
}

export default RenderJournal
