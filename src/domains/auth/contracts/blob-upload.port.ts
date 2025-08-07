export interface BlobUploader {
  upload(file: Blob, filename: string): Promise<string>;
  delete(filename: string): Promise<void>;
}
