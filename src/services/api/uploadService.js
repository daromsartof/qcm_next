import { createClient } from '@supabase/supabase-js'

// Initialiser le client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log("supabaseUrl", supabaseUrl)
console.log("supabaseKey", supabaseKey)

const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadImage(file) {
  console.log("file", file)

  try {
    // Générer un nom de fichier unique
    const fileName = `${Date.now()}_${file.name.trim().replace(/ /g, '')}`

    // Définir le bucket et le chemin de stockage
    const bucketName = 'images'
    const filePath = `uploads/${fileName}`

    // Convertir le fichier en ArrayBuffer
    const fileBuffer = await file.arrayBuffer()

    // Uploader le fichier vers Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading to Supabase:', error)
      throw new Error(`Failed to upload image: ${error.message}`)
    }

    // Générer l'URL publique de l'image
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)

    console.log('publicUrlData.publicUrl', publicUrlData.publicUrl)

    // Retourner l'URL accessible de l'image
    return publicUrlData.publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}
