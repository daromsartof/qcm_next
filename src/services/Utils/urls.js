export const API_URL = process.env.REACT_APP_API_URL
console.log(" === API_URL ", API_URL)
export const REFRESH_TOKKEN = `${API_URL}/users/refresh`
export const CLIENTS_URL = `${API_URL}/clients`
export const CLIENT_DETAIL_URL = `${API_URL}/clients/:id`
export const CLIENT_ADD_URL = `${API_URL}/clients/add`
export const CLIENT_STATUS_URL = `${CLIENTS_URL}/status`
export const CLIENTS_LOGO = `${API_URL}/clients/file`
// infos perdos url
export const INFOSPERDOS_URL = `${API_URL}/clients/infosperdo`
export const LOGICIEL_URL = `${INFOSPERDOS_URL}/logiciel`
export const MANDATAIRE_URL = `${INFOSPERDOS_URL}/mandataire`
export const FORM_JURIDIQUE_URL = `${INFOSPERDOS_URL}/juridic-form`
export const FILTER_CLIENT_URL = `${INFOSPERDOS_URL}/filtred-client`
export const UPDATE_RESPONSABLE_CSD_URL = `${INFOSPERDOS_URL}/:clientId/responsable-csd`
export const CONTRACT_URL = `${INFOSPERDOS_URL}/contrat`
export const ADD_RESPONSABLE_CSD_URL = `${UPDATE_RESPONSABLE_CSD_URL}/add`
export const DELETE_RESPONSABLE_CSD_URL = `${UPDATE_RESPONSABLE_CSD_URL}/delete`

export const AUTH_URL = `${API_URL}/users`
export const DOSSIERS_URL = `${API_URL}/dossiers`
export const DOSSIERS_STATUS = `${API_URL}/dossiers/activation_dossier`
export const DOSSIERS_UPDATE = `${API_URL}/dossiers/update_dossier`
export const DOSSIERS_TDI_URL = `${API_URL}/dossiers/tdi`
export const BANQUE_COMPTES_URL = `${API_URL}/banque_comptes`
export const SITES_URL = `${API_URL}/sites`
export const ADD_SITES_URL = `${SITES_URL}/add`
export const DETAIL_SITES_URL = `${SITES_URL}/:id`
export const SITE_STATUS_URL = `${SITES_URL}/:id/status`
export const DELETE_SITES_URL = `${SITES_URL}/:id/delete`
export const UPDATE_SITES_URL = `${SITES_URL}/:id/update`

export const BANQUES_URL = `${API_URL}/banques`
export const IMAGES_URL = `${API_URL}/images`
export const ECRITURE_URL = `${API_URL}/ecriture`
export const CONSULTATIONS_URL = {
    IMAGES_URL_BAGE: `${API_URL}/image/`,
    TRATIEMENT: `${API_URL}/image/traitement-image`,
    TREE: `${API_URL}/image/consultation-piece/tree`,
    NUMBER: `${API_URL}/image/consultation-piece/number`,
    TREE_STATUS: `${API_URL}/image/consultation-piece/tree-avancement`,
    PERIODE: `${API_URL}/image/consultation-piece/periode`,
    STATUS: `${API_URL}/image/consultation-piece/status`,
    DATE_SCAN_GET: `${API_URL}/image/consultation-piece/date_scane`,
    LOTS: `${API_URL}/image/consultation-piece/tree-lot`,
    TIERS: `${API_URL}/image/consultation-piece/tree-tiers`
}
export const RELEVES_URL = `${API_URL}/releves`
export const ETAT_URL = {
    COMPTABLE: `${API_URL}/etat/comptable`,
    FINANCIER: `${API_URL}/etat/financier`,
    INDICATEUR: `${API_URL}/etat/indicateur`
}
export const BANQUE_URL = {
    RAPPROCHEMENT: `${API_URL}/banque/rapprochement`,
    PM: `${API_URL}/banque/pm`,
    RELEVE: `${API_URL}/banque/releve`,
    OB: `${API_URL}/banque/ob`,
    PM_COMPTA: `${API_URL}/banque/pm-compta`,
    PM_COMPTA_VALIDER: `${API_URL}/banque/pm-compta-valider`,
    BQ_MQTE: `${API_URL}/banque/banque-maquante`,
    PANIER: `${API_URL}/banque/panier`,
    BANQUE_COMPTE_GESTION: `${API_URL}/banque/banque-compte`,
    BANQUE_COMPTE_SOURCE_IMAGE: `${API_URL}/banque/banque-compte/sobanque`,
    BANQUE_AFFECTATION: `${API_URL}/banque/affectation`,
    BANQUE_COLLABORATEUR: `${API_URL}/banque/collaborateur`
}
export const JOURNAL_DOSSIER_URL = `${API_URL}/journal_dossiers`
export const CARTE_BLEU_BANQUE_COMPTE_URL = `${API_URL}/carte_bleu_banque_comptes`
export const BANQUE_TYPES_URL = `${API_URL}/banque-types`
export const IMAGE_URL = {
    ENVOI: `${API_URL}/image/envoi/upload`,
    PHYSIC: `${API_URL}/image/envoi/show`,
    RELATIVE_FILES: `${API_URL}/image/envoi/all-relative-files`,
    CODE_ANALYTIQUE: `${API_URL}/image/analytique`
}
export const USER_URL = {
    USER: `${API_URL}/user`,
    ACCESS: `${API_URL}/user/user/acess`
}
export const ECHANGE_URL = {
    ECRITURE: `${API_URL}/echange/ecriture`,
    TDI: `${API_URL}/echange/tableau-image/listes`, 
    TDI_IMAGE_ZERO: `${API_URL}/echange/tableau-image/image-zero-edit`, 
    TDI_CATEGORIE: `${API_URL}/echange/tableau-image/categories`, 
    TDI_CATEGORIE_EDIT_ALL: `${API_URL}/echange/tableau-image/categorie-edit-all`,
    TDI_CATEGORIE_EDIT: `${API_URL}/echange/tableau-image/categorie-edit`,
    TDI_PERIODE: `${API_URL}/echange/tableau-image/periodes`,
    TDI_PERIODE_EDIT: `${API_URL}/echange/tableau-image/periode-edit`,
    TDI_PERIODE_EDIT_ALL: `${API_URL}/echange/tableau-image/periode-edit-all`
}
export const POSTE_URL = `${API_URL}/poste`
export const DETAILS_IMAGE_URL = `${API_URL}/details-image`
export const PCCS_URL = `${API_URL}/pccs`
export const TIERS_URL = `${API_URL}/tiers`
export const TYPE_ACHAT_VENTE_URL = `${API_URL}/type-achat-vente`
export const TYPE_PIECE_URL = `${API_URL}/type-piece`
export const TYPE_TIERS_URL = `${API_URL}/type-tiers`
export const CATEGORIE_URL = `${API_URL}/categories`
export const SIREN_URL = `${API_URL}/siren`
export const SOUSCATEGORIE_URL = `${API_URL}/souscategories`
export const SOUSSOUSCATEGORIE_URL = `${API_URL}/soussouscategories`
export const SOUSSOUSCATEGORIE_COMPTE_URL = `${API_URL}/soussousCompte`
export const SOUSSOUSCATEGORIE_MOTCLE_URL = `${API_URL}/soussousmotCle`
export const SOUSSOUSCATEGORIE_DECISION_URL = `${API_URL}/soussousDecision`
export const SOUSSOUSCATEGORIE_CERFA_URL = `${API_URL}/soussousCerfa`
export const SOUSSOUSCATEGORIE_ORGANISME_URL = `${API_URL}/soussousOrganisme`
export const SOUSSOUSCATEGORIE_CONVENTION_COMPTE = `${API_URL}/soussousConventionCompte`
export const ORGANISME_URL = `${API_URL}/organisme`
export const MOT_CLE_URL = `${API_URL}/motCle`
export const DECISION_URL = `${API_URL}/decision`
export const CERFA_URL = `${API_URL}/cerfa`
export const TEMP_TABLE_URL = `${API_URL}/tempTable`
export const TACHE_URL = {
    PARAM_LISTE_TACHES: `${API_URL}/taches/parametrage/listes`,
    AGENDA: `${API_URL}/taches/agenda`,
    PARAM_TACHES_LEGALES: `${API_URL}/taches/parametrage/taches-legales`,
    PARAM_TACHES_LIBRES: `${API_URL}/taches/parametrage/taches-libres`,
    PARAM_TACHES_PAR_CLIENT_DOSSIER: `${API_URL}/taches/parametrage/taches/par-client-dossier`
}
export const REGIME_FISCAL = `${API_URL}/regime-fiscal`

//** Menu URL */ 
export const MENU_URL = `${API_URL}/menu`
/** Liste des menus par utilisateur
 * Paramètres : utilisateur_id 
 * */
export const MENU_UTILISATEUR = `${MENU_URL}/utilisateur`
//** FEATURES URL */ 
export const SAISIE_UNIVERSELLE_URL = `${API_URL}/saisie-universelle`
export const SAISIE_UNIVERSELLE_FISCAL = `${SAISIE_UNIVERSELLE_URL}/fiscal`
export const BAREME_URL = `${API_URL}/baremes-fiscaux`
export const GESTION_SU_URL = `${API_URL}/gestion-su`


//** Gestion */
export const GESTION = `${API_URL}/etat`
export const GESTION_SETTINGS = `${GESTION}/setting`
export const RUBRIQUE = {
    GET_RUBRIQUE: `${GESTION_SETTINGS}/rubrique/all-rubrique`,
    ADD_RUBRIQUE: `${GESTION_SETTINGS}/rubrique/add-rubrique`,
    FORMULE_RUBRIQUE: `${GESTION_SETTINGS}/rubrique/formule-rubrique`,
    ADD_FORMULE_RUBRIQUE: `${GESTION_SETTINGS}/rubrique/add-formule-rubrique`,
    UPDATE_RUBRIQUE: `${GESTION_SETTINGS}/rubrique/:rubricId/update-rubrique`,
    DETAILS_FORMULE_RUBRIQUE: `${GESTION_SETTINGS}/rubrique/:rubricId/formule-rubrique`,
    DELETE_RUBRIQUE: `${GESTION_SETTINGS}/rubrique/delete-rubrique`,
    ADD_PCGS_RUBRIQUE: `${GESTION_SETTINGS}/rubrique/add-pcg-rubrique`,
    ADD_PCG: `${GESTION_SETTINGS}/rubrique/add-pcg`,
    UPDATE_PCGS_RUBRIQUE: `${GESTION_SETTINGS}/rubrique/:pcg_rubric_id/update-pcg-rubrique`,
    DELETE_PCGS_RUBRIQUE: `${GESTION_SETTINGS}/rubrique/:pcg_rubric_id/delete-pcg-rubrique`,
    ALL_GROUPEDS: `${GESTION_SETTINGS}/rubrique/all/grouped`
}

//** Pilotage */
export const PILOTAGE = `${API_URL}/pilotage` 
export const ACCUEIL_CABINET = {
    GENERAL_DOSSIER: `${PILOTAGE}/acceuil-ec/general-dossier`,
    GENERAL_TACHES: `${PILOTAGE}/acceuil-ec/general-taches`,
    GENERAL : `${PILOTAGE}/acceuil-ec/general`
}

// ** Production 
export const CHECK_LIST = `${API_URL}/production/check-list-model`
export const CHECK_LIST_MODEL = {
    ETAPS: `${CHECK_LIST}/etaps`,
    ENTETE: `${CHECK_LIST}/entete`, 
    DETAILS: `${CHECK_LIST}/detail`
}

// ** Revision
export const REVISION_GUIDE_REVISION = `${API_URL}/guide-revision`

export const CHECK_LIST_URL = {
    SHOW: `${API_URL}/production/check-list`
}
export const PANIER_REVISION = `${API_URL}/production/panier-revision`

export const CONTROLE_SU = `${API_URL}/production/controle-su`

export const SIRET_URL = `${API_URL}/production/siret`

//** PCG */
export const PCGS_URL = `${API_URL}/pcgs`
//** Setting PM */
export const PM_SETTINGS = `${GESTION_SETTINGS}/pm`
//**  Relance PM */
export const RELANCE_PIECES = `${API_URL}/production/relance`
export const NATURE_ENREGISTRER_PAR_SIREN = `${API_URL}/nature-by-siren` 
export const NATURE_SU = `${API_URL}/nature-su` 
export const MODE_REGLEMENT = `${API_URL}/mode-reglement`
export const TAUX_TVA = `${API_URL}/tva-taux`

// ** Mode règlement Image
export const MODE_REGLEMENT_IMAGE_URL = `${API_URL}/mode-reglement-image`

// ** Réception et séparation
export const RECEPTION_URL = `${API_URL}/reception-image/reception`

export const CAPACITE_URL = `${API_URL}/capacite`

//** TENUE PILOTAGE */
export const TENUE_PILOTAGE_URL = `${API_URL}/tenue-compta/tenue`

// ** TAUX DEVISE */
export const TAUX_DEVISE_URL = `${API_URL}/devise-taux`

// ** MENTION LEGALE */
export const MENTION_LEGALE_URL = `${API_URL}/mention-legale`

// ** IMAGE IGNORE DOUBLON */
export const IMAGE_IGNORE_DOUBLON_URL = `${API_URL}/ignore-doublon`

export const NOTIFICATION_URL = {
    NOTIF: `${API_URL}/notification`,
    DESTINATAIRE: `${API_URL}/notification/destinataire`,
    TEMPLATE: `${API_URL}/notification/template`,
    MOBILE: `${API_URL}/notification/mobile/setting`,
    USER: `${API_URL}/notification/user`,
    TYPE: `${API_URL}/notification/type`,
    ACCESS: `${API_URL}/notification/access`
}

export const SOBANK_NOT_FOUND_URL = `${API_URL}/banque/sobank`

export const PRODUCTION_OUTILS = `${API_URL}/production/outils`
export const SIRET_CODE_TVA_URL = `${API_URL}/siret-code-tva`

export const HISTORIQUES = `${API_URL}/historique`
