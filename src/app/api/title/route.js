
//indepemdant route pour le filtre de titre:
import { NextResponse } from "next/server";

import QuestionRepositorie from "@/repositories/QuestionRepositorie";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url, "http://localhost");
    const title = searchParams.get("title");

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    console.log(" API Recherche pour:", title);

    const questions = await QuestionRepositorie.getQuestionsByTitle(title);

    if (!questions || questions.length === 0) {
      console.log(" Aucune question trouvée");
      
return NextResponse.json([], { status: 200 });
    }

    console.log(" Des Résultats pour les filtres de titre sont trouvés:");
    
return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error(" Erreur API:", error);
    
return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

