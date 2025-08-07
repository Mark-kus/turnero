import {put, del} from "@vercel/blob";

import {AVATARS_FOLDER_NAME} from "@/shared/constants";
import {BlobUploader} from "@/auth/contracts/blob-upload.port";

export class VercelBlobService implements BlobUploader {
  async upload(file: Blob, filename: string): Promise<string> {
    const blobName = `${AVATARS_FOLDER_NAME}/${filename}`;
    const blob = await put(blobName, file, {access: "public"});

    return blob.url;
  }

  async delete(filename: string): Promise<void> {
    const blobName = `${AVATARS_FOLDER_NAME}/${filename}`;

    await del(blobName);
  }
}
