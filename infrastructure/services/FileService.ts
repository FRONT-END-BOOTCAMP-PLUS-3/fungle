import { promises as fs } from "fs";
import path from "path";

export class FileService {
  static async deleteExistingProfileImage(
    userId: string,
    directory: string
  ): Promise<void> {
    try {
      const files = await fs.readdir(directory);
      for (const file of files) {
        if (file.startsWith(userId)) {
          await fs.unlink(path.join(directory, file));
        }
      }
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return;
      }
      throw error;
    }
  }

  static async saveCoverImage(file: File): Promise<string> {
    const bookCoverDir = path.join(process.cwd(), "public", "bookCover");
    await fs.mkdir(bookCoverDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(bookCoverDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    return `/bookCover/${fileName}`;
  }

  static async deleteCoverImage(imagePath: string): Promise<void> {
    try {
      const filePath = path.join(process.cwd(), "public", imagePath);

      await fs.unlink(filePath);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        "code" in error &&
        (error as any).code === "ENOENT"
      )
        return;
      throw error;
    }
  }

  static async saveProfileImage(userId: string, file: File): Promise<string> {
    const profileImageDir = path.join(process.cwd(), "public", "profileImage");
    await fs.mkdir(profileImageDir, { recursive: true });

    await this.deleteExistingProfileImage(userId, profileImageDir);

    const fileName = `${userId}-${file.name}`;
    const filePath = path.join(profileImageDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    return `/profileImage/${fileName}`;
  }
}
