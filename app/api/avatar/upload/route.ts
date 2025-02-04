import { AVATARS_FOLDER } from "@/app/constants";
import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json(
      { error: "Filename is required" },
      { status: 400 },
    );
  }

  if (!request.body) {
    return NextResponse.json(
      { error: "Request body is required" },
      { status: 400 },
    );
  }

  const blobName = `${AVATARS_FOLDER}/${filename}`;
  const blob = await put(blobName, request.body, {
    access: "public",
  });

  return NextResponse.json(blob);
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json(
      { error: "Filename is required" },
      { status: 400 },
    );
  }

  const blobName = `${AVATARS_FOLDER}/${filename}`;
  del(blobName);

  return NextResponse.json({ message: "Avatar deleted" });
}
