import bcrypt from 'bcryptjs'

import prisma from "@/services/Utils/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany();


    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching users' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const saltRounds = 10

    console.log(body)


    // Hash the password if it exists in the request body
    if (body.password) {
      body.password =  await bcrypt.hash(body.password, saltRounds);
    }

    const user = await prisma.user.create({ data: body });


    return new Response(JSON.stringify(user), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error)
    
return new Response(JSON.stringify({ error: 'Error creating user' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}