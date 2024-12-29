import columHelper from "@/utils/columHelper"
import RenderIsMulti from "../components/RenderIsMulti"
import RenderAction from "../components/RenderAction"
import RenderResponse from "../components/RenderResponse"

const COLUMN = [
    columHelper.accessor('title', {
        header: "Titre",
        id: "titre",
        size: 120,
    }),
    columHelper.accessor('Category.title', {
        header: "Categorie",
        id: "categorie",
        size: 100,
    }),
    columHelper.accessor('Source.title', {
        header: "Source",
        id: "source",
        size: 100,
    }),
    columHelper.accessor('Matiere.title', {
        header: "Matière",
        id: "matiere",
        size: 100
    }),
    columHelper.accessor('isMultiChoice', {
        header: "choix multiple",
        id: "ismultiple",
        size: 20,
        Cell: ({ cell }) => <RenderIsMulti checked={cell.getValue()} />
    }),
    columHelper.accessor('', {
        header: "Reponse",
        size: 250,
        id: "response",
        Cell: ({ row }) => <RenderResponse data={row.original.answers} />
    })

    /*columHelper.accessor('', {
        header: "Action",
        id: "action",
        size: 100,
        Cell: ({ row }) => <RenderAction data={row.original} />
    })*/
]

export {
    COLUMN
}