import {useAuth} from "react-oidc-context";
import {createUploadthing, type FileRouter} from "uploadthing/next";
import {UploadThingError} from "uploadthing/server"

const f = createUploadthing()

export const flagsFileRouter = {
  imageUploader: f({image: {maxFileSize: "4MB"}}).middleware(async () => {
    const auth = useAuth();
    if (!auth.isAuthenticated) {
      throw new UploadThingError('No user profile found. User must be logged in.');
    }

    return {userId: auth.user?.profile.sub}
  }).onUploadComplete(async ({metadata, file}) => {
    console.log("Image uploaded", metadata, file)

    return {uploadedBy: metadata.userId}
  })
} satisfies FileRouter

export type FlagsFileRouter = typeof flagsFileRouter
