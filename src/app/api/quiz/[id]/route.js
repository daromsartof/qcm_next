import prisma from "@/services/Utils/prisma";

export async function DELETE(request, { params }) {
    try {
        await prisma.quiz.delete({ where: { id: Number(params.id) } });

        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error deleting qui' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}