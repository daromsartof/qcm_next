import path from 'path';
import { writeFile } from 'fs/promises';

export async function uploadImage(file) {
  try {
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // Générer un nom de fichier unique
    const fileName = `${Date.now()}_${file.name.trim().replace(/ /g,'')}`;
    const filePath = path.join(uploadDir, fileName);

    // Écrire le fichier sur le serveur
    await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    // Retourner l'URL accessible de l'image
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}
