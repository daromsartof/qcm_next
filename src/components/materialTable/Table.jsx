import React from 'react'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_FR } from 'material-react-table/locales/fr'

const Table = ({
    columns,
    data,
    progressPending,
    renderRowActions = () => { },
    options = {},
    muiTableBodyCellProps = {},
    muiTableHeadCellProps = {},
    muiTableContainerProps = {},
    muiTablePaperProps = {},
    onClickCell = () => { },
    renderTopToolbarCustomActions = () => { },
    displayColumnDefOptions = null,
    onClickRow = () => { },
    onHoverRow = () => { },
    onRowSelectionChange = () => { },
    enableRowIsSelectionFunction = false,
    selectedRowIds = [],
    renderDetailPanel = null,
    cellStyles = {}
}) => {
    const defaultOptions = {
        enableRowSelection: false,
        enableColumnOrdering: false,
        enablePagination: false,
        enableColumnActions: false,
        enableCellActions: true,
        enableEditing: false,
        enableRowNumbers: true,
        enableMultiSort: true,
        enableDensityToggle: true,
        enableFullScreenToggle: true,
        enableTopToolbar: true,
        enableBottomToolbar: true,
        enableColumnDragging: false,
        enableColumnResizing: false,
        enableGlobalFilter: true,
        enableColumnFilters: true,
        enableSorting: true,
        enableGrouping: false,
        enableHiding: true,
        groupedColumnMode: 'remove',
        expanded: false,
        grouping: [],
        columnVisibility: {},
        enableExpandAll: false,
        enableExpanding: false,
        enableSubRowExpand: false,
        enableRowExpansion: false,
        enableExpandAll: false,
        ...options
    }

    const table = useMaterialReactTable({
        columns,
        data,
        enableBottomToolbar: defaultOptions.enableBottomToolbar,
        enableTopToolbar: defaultOptions.enableTopToolbar,
        enableRowSelection: enableRowIsSelectionFunction ? (row) => defaultOptions.enableRowSelection(row) : defaultOptions.enableRowSelection,
        enableColumnOrdering: defaultOptions.enableColumnOrdering,
        enableGrouping: defaultOptions.enableGrouping,
        groupedColumnMode: defaultOptions.groupedColumnMode,
        enableHiding: defaultOptions.enableHiding,
        enableExpandAll: defaultOptions.enableExpandAll,
        enableExpanding: defaultOptions.enableExpanding,
        enableSubRowExpand: defaultOptions.enableSubRowExpand,
        enableRowExpansion: defaultOptions.enableRowExpansion,
        initialState: {
            density: 'compact',
            columnPinning: {
                right: ['mrt-row-actions'],
            },
            pagination: {
                pageSize: 10
            },
            expanded: defaultOptions.expanded,
            grouping: defaultOptions.grouping,
            columnVisibility: defaultOptions.columnVisibility
        },
        state: {
            isLoading: progressPending,
            showProgressBars: progressPending,
            rowSelection: selectedRowIds
        },
        onRowSelectionChange: (newRowSelection) => {
            onRowSelectionChange(newRowSelection)
        },
        enablePagination: defaultOptions.enablePagination,
        enableColumnActions: defaultOptions.enableColumnActions,
        enableRowVirtualization: true,
        muiSkeletonProps: {
            animation: 'wave'
        },
        renderTopToolbarCustomActions,
        muiTableBodyProps: {
            sx: {
                tr: {
                    borderBottom: '1px solid #D6D9DB !important',
                    borderRight: '1px solid #D6D9DB !important'
                }
            }
        },
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
                if (!event.target.closest('.no-event-click')) {
                    onClickRow(row, event)
                }
            },
            onMouseEnter: () => onHoverRow(row),
            onMouseLeave: () => onHoverRow(null),
            sx: {
                '.Mui-TableBodyRow-checkbox': {
                    display: row.depth === 0 || row.depth === 1 ? 'none' : 'table-cell'
                }
            }
        }),
        muiTableBodyCellProps: ({ cell }) => ({
            sx: {
                borderLeft: '1px solid rgba(81, 81, 81, .3)!important',

                ...cellStyles
            },
            onClick: (event) => { onClickCell(event, cell) },
            ...muiTableBodyCellProps
        }),
        muiTableHeadCellProps: {
            sx: {
                '& .MuiTableSortLabel-icon': {
                    display: 'none'
                }
            },
            ...muiTableHeadCellProps
        },
        muiTableHeadRowProps: {
            border: '1px solid #D6D9DB !important'
        },
        enableStickyHeader: true,
        enableCellActions: defaultOptions.enableCellActions,
        enableEditing: true,

       // editingMode: "custom",
        //createDisplayMode: 'custom',
        //editDisplayMode: 'custom',
        enableRowNumbers: defaultOptions.enableRowNumbers,
        enableMultiSort: defaultOptions.enableMultiSort,
        enableColumnResizing: defaultOptions.enableColumnResizing,
        enableSorting: defaultOptions.enableSorting,
        enableDensityToggle: defaultOptions.enableDensityToggle,
        enableFullScreenToggle: defaultOptions.enableFullScreenToggle,
        enableColumnDragging: defaultOptions.enableColumnDragging,
        enableGlobalFilter: defaultOptions.enableGlobalFilter,
        enableColumnFilters: defaultOptions.enableColumnFilters,
        muiPaginationProps: {
            rowsPerPageOptions: [10, 20, 50, 100]
        },
        localization: MRT_Localization_FR,
        muiTableContainerProps: {
            ...muiTableContainerProps
        },
        muiTablePaperProps: ({ table }) => ({
            style: {
                left: table.getState().isFullScreen ? muiTablePaperProps?.style?.left : undefined,
                width: table.getState().isFullScreen ? muiTablePaperProps?.style?.width : undefined
            },
            sx: muiTablePaperProps.sx
        }),
        ...(displayColumnDefOptions && { displayColumnDefOptions }),
        getRowId: (row) => row.id,
        ...(renderDetailPanel && { renderDetailPanel }),
        renderRowActions
    })

    return (
        <div>
            <MaterialReactTable table={table} />
        </div>
    )
}

export default Table