import { promises as fs } from "fs";
import path from "path";

export class FileService {
  static async saveCoverImage(file: File): Promise<string> {
    const bookCoverDir = path.join(process.cwd(), "public", "bookCover");
    await fs.mkdir(bookCoverDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(bookCoverDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    return `/bookCover/${fileName}`;
  }
}
