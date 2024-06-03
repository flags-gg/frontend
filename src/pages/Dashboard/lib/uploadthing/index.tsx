"use client"

import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";
import {useAuth} from "react-oidc-context";
import {generateReactHelpers, generateUploadButton} from "@uploadthing/react";

const f = createUploadthing({
  errorFormatter: (err) => {
    console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);

    return { message: err.message };
  },
});
export const uploadRouter = {
  profileImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(() => {
      const auth = useAuth()
      if (!auth.isAuthenticated) {
        console.error("need to be logged in to use upload")
      }

      return {userId: auth.user?.profile.sub}
    })
    .onUploadComplete(({ file, metadata }) => {
      metadata;
      console.log("upload completed", file, metadata);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;

export const UploadButton = generateUploadButton<OurFileRouter>();
export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
