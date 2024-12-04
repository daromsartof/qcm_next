import React from 'react'
import MaterialTableV2 from '../../../common/materialTable/MaterialTableV2'
import { useTraitementImageContext } from '../contexts/TraitementImage.context'
import moment from 'moment'
import { Grid } from 'react-feather'
import GridView from './GridView'
import { selectThemeColors } from '../../../../utility/Utils'

const TableImageTraitement = () => {
    const {
        filter: {
            status
        },
        historiqueUpload,
        gridView,
        images,
        toggleGridView,
        isLoading // Ajout de l'état de chargement depuis le contexte
    } = useTraitementImageContext()

    const renderTopToolbarCustomActions = () => {
        return (
            <div className='h-100 w-100 d-flex align-items-center justify-content-between'>
                <div>
                    <span>
                        <strong>{status.label}</strong> au {historiqueUpload ? moment(historiqueUpload.date_upload).format('DD/MM/YYYY') : ''}
                    </span>
                </div>
                <div>
                    <span onClick={toggleGridView}>
                        <Grid size={18} />
                    </span>
                </div>
            </div>
        )
    }
    return (
        <>
            {
                gridView ? <GridView 
                    datas={images}
                    renderTopToolbarCustomActions={renderTopToolbarCustomActions}
                /> : (
                    <MaterialTableV2
                        columns={status.column}
                        data={images} // Modification de cette ligne pour utiliser les images Kcomme données
                        progressPending={isLoading} // Ajout de la prop isLoading
                        options={{
                            enableGrouping: false,
                            enableColumnDragging: false,
                            enableColumnResizing: true,
                            enableRowNumbers: true
                        }}
                        muiTableHeadCellProps={{
                            sx: {
                                background: selectThemeColors({}).colors.primaryGradient,
                                color: '#FFF'
                            }
                        }}
                        muiTableBodyCellProps={{
                            sx: {
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderTop: 'none',
                                borderBottom: 'none'
                            }
                        }}
                        muiTableBodyProps={{
                            sx: {
                                tr: {
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                    borderBottom: 'none'
                                },
                                minHeight: "90vh"
                            }
                        }}
                        renderTopToolbarCustomActions={renderTopToolbarCustomActions}
                    />
                )
            }
        </>

    )
}

export default TableImageTraitement