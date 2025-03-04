
export async function POST(req) {
    try {
        const body = await req.json()

        const answer = await ReponseRepositorie.createReponse(body) 


        return NextResponse.json(answer, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}