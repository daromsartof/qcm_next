import React from 'react'
import { columnHelper } from "../../../../services/Utils/utils"
import CategorieFilter from "../components/_parcial/CategorieFilter"
import DateEnvoiFilter from "../components/_parcial/DateEnvoiFilter"
import NumPieceFilter from "../components/_parcial/NumPieceFilter"
import ColumnImage from "../../../common/materialTable/ColumnImage"
import moment from 'moment' // Assurez-vous d'avoir installé moment.js
import RenderJournal from '../components/_parcial/RenderJournal'
import RenderGrandLivre from '../components/_parcial/RenderGrandLivre'
import { RenderNameOriginal } from '../components/_parcial/ColumnRender'
import RenderAmonts from '../../../pilotages/homeCabinet/components/RenderAmonts'
import PieceRemarquable from '../components/_parcial/PieceRemarquable'

const DATE_RECEP = (id) => columnHelper.accessor('date_livraison', {
    id,
    header: 'Réception',
    
    size: 80,
    Cell: ({ row }) => {
        const date = row.original.lot.date_scan
        return date ? moment(date).format('DD/MM/YYYY') : ''
    }

})

const DATE_LIVRAISON = (id) => columnHelper.accessor('derinerMaj.datefait', {
    header: "Derinière Maj",
    id,
    
    size: 100,
    Cell: ({ row }) => {
        const date = row.original.derinerMaj.datefait
        return date ? moment(date).format('DD/MM/YYYY') : ''
    }
})

const STATUS = (id) => columnHelper.accessor('categorie.non_comptable', {
    id,
    header: 'Statut',
    size: 120,
    Cell: ({ row }) => {
        const nonComptable = row.original.categorie?.non_comptable
        if (nonComptable === 1) {
            return <span>Pièce non comptable</span>
        } else if (nonComptable === 0) {
            return <span>Pièce comptable</span>
        } else {
            return <span>Statut inconnu</span>
        }
    }
})

const ORIGINAL_NAME = (id) => columnHelper.accessor("originale", {
    id,
    header: 'Nom pièce originale',
    size: 160,
    enableResizing: true,
    Cell: ({ row }) => (
        <RenderNameOriginal
            image={row.original}
        />
    )
})

const PIECE = (id) => columnHelper.accessor('nom', {
    header: 'Num image',
    id,
    size: 110,
    Cell: ({ row }) => (
        <ColumnImage
            image={row.original}
        />
    )
})
const JOURNAL = (id) => columnHelper.accessor('journal_dossier.journal.code', {
    header: "Journal",
    id,
    size: 60,
    enableSorting: false,
    Cell: ({ row }) => {
        const journalDossier = row.original.journal_dossier
        return <RenderJournal journalDossier={journalDossier} />
    }
})

const GRAND_LIVRE = (id) => columnHelper.accessor('details_image_details_image_image_idToimage', {
    header: "Grand Livre",
    id,
    size: 210,
    enableSorting: false,
    Cell: ({ row }) => {
        return <RenderGrandLivre image={row.original} />
    }
})

const SOUS_CATEGORY = (id) => columnHelper.accessor('souscategorie.new_libelle', {
    header: "Sous catégorie",
    size: 120,
    enableResizing: true,
    enableSorting:  false,
    id,
    Cell: ({ row }) => {
        const souscategorie = row.original.souscategorie
        return <span>{souscategorie?.new_libelle}</span>
    }
})

const SOUS_SOUS_CATEGORY = (id) => columnHelper.accessor('soussouscategorie.new_libelle', {
    header: "Sous sous catégorie",
    size: 150,
    enableSorting:  false,
    enableResizing: true,
    id,
    Cell: ({ row }) => {
        const soussouscategorie = row.original.soussouscategorie
        return <span>{soussouscategorie?.new_libelle}</span>
    }
})

const CATEGORY = (id) => columnHelper.accessor('categorie.new_libelle', {
    header: "Catégorie",
    size: 110,
    id,
    Cell: ({ cell }) => <span>{cell.getValue()}</span>
})

const BILAN = (id) => columnHelper.accessor('montant.bilan', {
    header: "Bilan",
    size: 80,
    
    id,
    Cell: ({ cell }) => <RenderAmonts data={cell.getValue()} />
})

const RESULTAT = (id) => columnHelper.accessor('montant.resultat', {
    header: "Resultat",
    size: 80,
    
    id,
    Cell: ({ cell }) => <RenderAmonts data={cell.getValue()} />
})

const TVA = (id) => columnHelper.accessor('montant.tva', {
    header: "Tva",
    
    size: 80,
    id,
    Cell: ({ cell }) =>  <RenderAmonts data={cell.getValue()} />
})

const COMPTABILISE_COLUMN = [
    DATE_RECEP("date_reception_comptable"),
    DATE_LIVRAISON("date_livraison_comptable"),
    STATUS("status_comptable"),
    PIECE("number_comptable"),
    ORIGINAL_NAME("name_comptable"),
    JOURNAL("journal_comptable"),
    GRAND_LIVRE("grand_livre_comptable"), // Ajout du composant Grand Livre
    BILAN("bilan_comptable"),
    RESULTAT("resultat_comptable"),
    TVA("tva_comptable"),
    CATEGORY("categories_comptable"),
    SOUS_CATEGORY("sous_categories_comptable"),
  //  SOUS_SOUS_CATEGORY("comptable_ssous_cat"),
    columnHelper.accessor('', {
        header: "Commentaire",
        size: 300,
        id: "comptable_commentaire",
        Cell:  ({ row }) => {
            const categorie = row.original.categorie
            if (categorie && categorie.non_comptable === 1) {
                return <span>Attention la pièce n'est pas un justificatif comptable, mais un simple support d'ecriture</span>
            }
            return <span></span>
        }
    })
]

const NON_COMPTABILISE_COLUMN = [
    DATE_RECEP("date_reception_non_comptable"),
    DATE_LIVRAISON("date_livraison_non_comptable"),
    PIECE("number_non_comptable"),
    ORIGINAL_NAME("name_non_comptable"),
    STATUS("non_comptable_status"),
    columnHelper.accessor('avancement', {
        header: "Avancement",
        size: 120,
        id: "non_comptable_avancement"
    }),
    CATEGORY("non_comptable_category"),
    SOUS_CATEGORY("non_comptable_sous_categories")
   // SOUS_SOUS_CATEGORY("nom_comptable_ssous_cat")
]

const ALL_COLUMNS = [
    // Colonnes communes (sans duplication)
    DATE_RECEP("date_reception_comptable"),
    DATE_LIVRAISON("date_livraison_comptable"),
    STATUS("status_comptable"),
    PIECE("number_comptable"),
    ORIGINAL_NAME("name_comptable"),
   
    
    // Colonnes spécifiques à COMPTABILISE_COLUMN
    JOURNAL("journal_comptable"),
    GRAND_LIVRE("grand_livre_comptable"), // Ajout du composant Grand Livre
    BILAN("bilan_comptable"),
    RESULTAT("resultat_comptable"),
    TVA("tva_comptable"),
    CATEGORY("categories_comptable"),
    SOUS_CATEGORY("sous_categories_comptable"),
   // SOUS_SOUS_CATEGORY("comptable_ssous_cat"),
    columnHelper.accessor('', {
        header: "Commentaire",
        size: 300,
        id: "comptable_commentaire",
        Cell: ({ row }) => {
            const categorie = row.original.categorie
            if (categorie && categorie.non_comptable === 1) {
                return (
                    <span>
                        Attention la pièce n'est pas un justificatif comptable,
                        mais un simple support d'écriture
                    </span>
                )
            }
            return <span></span>
        }
    }),

    // Colonnes spécifiques à NON_COMPTABILISE_COLUMN
    columnHelper.accessor('avancement', {
        header: "Avancement",
        size: 120,
        id: "non_comptable_avancement"
    })
]

const FILTER_INTERFACE = [
    {
        value: 0,
        label: "Catégorie",
        filterRender: <CategorieFilter />
    },
    {
        value: 1,
        label: "Num pièce",
        filterRender: <NumPieceFilter />
    },
    {
        value: 2,
        label: "Nom image origine",
        filterRender: <NumPieceFilter isOriginal={true} />
    },
    {
        value: 3,
        label: "Date envoi par lot",
        filterRender: <DateEnvoiFilter />
    },
    {
        value: 4,
        label: "Pièce rémarquable"
    }
]


const STATUS_INTERFACE = [
    {
        value: 0,
        label: "Pièces comptabilisées",
        column: COMPTABILISE_COLUMN
    },
    {
        value: 2,
        label: "Pièces non comptabilisées",
        column: COMPTABILISE_COLUMN
    },
    {
        value: 1,
        label: "Pièces en cours de traitement",
        column: NON_COMPTABILISE_COLUMN
    }
]

const DEFAULT_FILTER_VALUE = {
    status: STATUS_INTERFACE.at(0),
    type: FILTER_INTERFACE.at(0),
    categorie: null,
    tree_category: [],
    num_image: "",
    nom_original: "",
    date_envoi: {
        active: [],
        value: []
    }
}

const DEFAULT_OTIONS = {
    categories: [{ value: null, label: 'TOUS' }],
    categorieTree: [{ value: null, label: 'TOUS'}]
}

const ACTIVE_MODAL = {
    [2]: "journal"
}
export {
    COMPTABILISE_COLUMN,
    ACTIVE_MODAL,
    DEFAULT_FILTER_VALUE,
    DEFAULT_OTIONS,
    SOUS_SOUS_CATEGORY,
    FILTER_INTERFACE,
    STATUS_INTERFACE
}