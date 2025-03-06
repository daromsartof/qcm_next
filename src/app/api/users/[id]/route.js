import prisma from "@/services/Utils/prisma"

export async function GET(request, { params }) {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id: Number(params.id) }
    });

    
return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();

    const user = await prisma.user.update({
      where: { id: Number(params.id) },
      data: body,
    });

    
return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error updating user' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.user.delete({ where: { id: Number(params.id) } });
    
return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error deleting user' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}