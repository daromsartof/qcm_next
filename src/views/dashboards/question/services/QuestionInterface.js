import columHelper from "@/utils/columHelper"
import RenderIsMulti from "../components/RenderIsMulti"
import RenderAction from "../components/RenderAction"
import RenderResponse from "../components/RenderResponse"

const COLUMN = [
    columHelper.accessor('title', {
        header: "Titre",
        id: "titre",
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
        header: "Multiple",
        id: "ismultiple",
        size: 60,
        Cell: ({ cell }) => <RenderIsMulti checked={cell.getValue()} />
    }),
    columHelper.accessor('', {
        header: "Reponse",
        id: "response",
        Cell: ({ row }) => <RenderResponse data={row.original} />
    }),
    columHelper.accessor('', {
        header: "Action",
        id: "action",
        size: 80,
        Cell: ({ row }) => <RenderAction data={row.original} />
    })
]

export {
    COLUMN
}