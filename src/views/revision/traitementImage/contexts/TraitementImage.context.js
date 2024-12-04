import React, { useState, useEffect } from 'react'
import { DEFAULT_FILTER_VALUE, DEFAULT_OTIONS } from '../services/traitementImage.interface'
import { fetchCategorieTree, fetchHistoriqueUpload, fetchImageTraitement } from '../../../../services/images/traitementImageApi'
import { useSelector } from 'react-redux'
import { getAllCategories } from '../../../../services/categorieApi'
import { journaux } from '../../../../services/etats/comptablesApi'
//import { getDateScane } from '../../../../services/images/consultationApi'
import moment from 'moment'
const TraitementImageContext = React.createContext({
  filter: {},
  handleChangeFilter: () => { },
  options: {},
  handleSetOptions: () => { },
  fetchImages: async () => { },
  fetchCategories: async () => { },
  images: [],
  categories: [],
  setJournalData: () => {},
  isLoading: false, // Ajout de l'étahandleChangeFiltert de chargement
  fetchJournal: async () => { },
  fetchDateScan: async () => { },
  dateScan: [],
  openModal: {},
  modalData: {
    journal: []
  },
  gridView: false,
  toggleGridView: () => {},
  selectedImage: null,
  setSelectedImage: () => {},
  setFilter: () => {},
  toogleOpenModal: () => {},
  historiqueUpload: null,
  fetchHistoriqueUploadDate: async () => {}
})

const TraitementImageContextProvider = ({
  children
}) => {
  const [filter, setFilter] = useState(DEFAULT_FILTER_VALUE)
  const [options, setOptions] = useState(DEFAULT_OTIONS)
  const { dossier, client, site, exercice } = useSelector(({ filtre }) => filtre)
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false) // Nouvel état pour le chargement
  const [openModal, setOpenModal] = useState({
    journal: false,
    showImage: false
  })
  const [modalData, setModalData] = useState({
    journal: []
  })
  const [gridView, setGridView] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [historiqueUpload, setHistoriqueUpload] = useState(null)
  const [dateScan, setDateScan] = useState([])

  const toggleGridView = () => setGridView(g => !g)
  const handleSetModalData = (name, value) => {
    setModalData({
      ...modalData,
      [name]: value
    })
  }

  const toogleOpenModal = (name) => {
    setOpenModal({
      ...openModal,
      [name]: !openModal[name]
    })
  }

  const handleSetOptions = (optionName, value) => {
    setOptions({ ...options, [optionName]: value })
  }

  const handleChangeFilter = (filterName, value) => {
    setFilter({ ...filter, [filterName]: value })
  }

  const fetchImages = async ({
    dossier_id,
    client_id,
    site_id,
    num_image,
    categorie_id,
    nom_original,
    take,
    page,
    type,
    date_send_start,
    date_send_end,
    categorie,
    souscategorie,
    soussouscategorie
  }, callBackSetImage) => {
    setIsLoading(true) // Début du chargement
    try {
      const {images, dateScans} = await fetchImageTraitement({
        dossier_id: dossier_id ?? dossier,
        client_id: client_id ?? client,
        site_id: site_id ?? site,
        take,
        page,
        categorie_id: categorie_id ?? filter.categorie?.value ?? undefined,
        num_image: num_image ?? filter.num_image ?? undefined,
        nom_original: nom_original ?? filter.nom_original ?? undefined,
        date_send_start: date_send_start ?? filter.date_envoi.value.at(0) ? moment(filter.date_envoi.value.at(0)).format('DD/MM/YYYY') : undefined,
        date_send_end: date_send_end ?? filter.date_envoi.value.at(-1) ? moment(filter.date_envoi.value.at(-1)).format('DD/MM/YYYY') : undefined,
        exercice,
        type: type ?? filter.status.value,
        sous_categories: souscategorie ? JSON.stringify(souscategorie) : undefined,
        sous_sous_categories: soussouscategorie ? JSON.stringify(soussouscategorie) : undefined,
        categories: categorie ? JSON.stringify(categorie) : undefined
      })
      if (callBackSetImage) callBackSetImage(images)
      else setImages(images)
      setDateScan(dateScans)
    } catch (error) {
      console.error("Erreur lors du chargement des images:", error)
    } finally {
      setIsLoading(false) // Fin du chargement
    }
  }

  const fetchJournal = async (journal_dossier) => {
    const responses = await journaux(dossier, exercice, journal_dossier)
    handleSetModalData('journal', responses)
  }

  const fetchHistoriqueUploadDate = async (dossier_id) => {
      const responses = await fetchHistoriqueUpload(dossier_id || dossier, exercice)
      setHistoriqueUpload(responses)
  }

  const fetchCategories = async () => {
    try {
      const {data} = await getAllCategories()
      const fetchedCategories = data.categorie
      const formattedCategories = fetchedCategories.map(cat => ({
        label: cat.new_libelle,
        value: cat.id
      }))
      handleSetOptions('categories', [
        { value: null, label: 'TOUS' },
       ...formattedCategories
      ])
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error)
    }
  }

  const fetchTree = async () => {
      const data = await fetchCategorieTree()
      const optionValue = {
        categories: [{ value: null, label: 'TOUS' }],
        categorieTree: []
      }
      data.forEach(cat => {
        const item = {
          label: cat.new_libelle,
          value: cat.id
        }
        const categorie = {
          ...item,
          type: "categorie",
          children: []
        }
        cat.souscategorie.forEach(sous => {
          const souscategorie = {
            label: sous.new_libelle,
            value: sous.id,
            type: "souscategorie",
            children: []
          }
          sous.soussouscategorie.forEach(sousSous => {
            souscategorie.children.push({
              label: sousSous.new_libelle,
              type: "soussouscategorie",
              value: sousSous.id
            })
          })
          categorie.children.push(souscategorie)
        })
        optionValue.categories.push(item)
        optionValue.categorieTree.push(categorie)
      })
      setOptions((op) => ({
        ...op,
        ...optionValue
      }))
  }

  const fetchDateScan = async () => {
    //const data = await getDateScane(client, exercice, JSON.stringify([dossier || dossier_id]), site)
   // setDateScan(data)
  }

  useEffect(() => {
    fetchTree()
  }, [])

  return (
    <TraitementImageContext.Provider value={{
      filter,
      images,
      options,
      dateScan,
      fetchDateScan,
      handleChangeFilter,
      handleSetOptions,
      fetchImages,
      fetchCategories,
      isLoading, // Ajout de l'état de chargement dans la valeur du contexte
      fetchJournal,
      modalData,
      toogleOpenModal,
      selectedImage,
      setSelectedImage,
      openModal,
      gridView,
      toggleGridView,
      setFilter,
      historiqueUpload,
      fetchHistoriqueUploadDate
    }}>
      {children}
    </TraitementImageContext.Provider>
  )
}

export default TraitementImageContextProvider

export const useTraitementImageContext = () => {
  return React.useContext(TraitementImageContext)
}