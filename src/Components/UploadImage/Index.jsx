import React, { useEffect, useReducer, useState } from "react";
import { useAddImageUrlMutation } from "../../app/Services/Admin/adminTeams";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { XCircleIcon } from "@heroicons/react/24/outline";

function Index({ placeholder, updateImageUrl, existingImageUrl }) {
  const [addImageUrl] = useAddImageUrlMutation();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imgUrl, setImgUrl] = useState(existingImageUrl || "");

  const resetImage = () => {
    setImgUrl(null);
  };

  useEffect(() => {
    if (imgUrl && imgUrl !== existingImageUrl) {
      updateImageUrl(imgUrl);
    }
  }, [imgUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("Please upload a valid image file (JPG, JPEG or PNG)");
        return;
      }
      setIsImageUploading(true);

      try {
        const response = await addImageUrl({
          fileName: file.name,
          fileType: file.type,
        }).unwrap();
        const { presignedUrl, imageUrl } = response;
        const uploadResponse = await fetch(presignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }
        setImgUrl(imageUrl);
      } catch (error) {
        toast.error("Failed to generate image upload URL");
        console.error("Error:", error);
      } finally {
        setIsImageUploading(false);
      }
    }
  };
  return (
    <>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {placeholder}
        </label>

        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-600 px-6 py-4">
          {imgUrl ? (
            <>
              <span className="relative inline-block">
                <img
                  alt={"loading.."}
                  src={imgUrl}
                  className="size-16 rounded-md"
                />
                <span
                  className="absolute right-0 top-0 block size-4 -translate-y-1/2 translate-x-1/2 transform rounded-full ring-2"
                  onClick={resetImage}
                >
                  <XCircleIcon />
                </span>
              </span>
            </>
          ) : isImageUploading ? (
            <Loader />
          ) : (
            <>
              <div className="text-center">
                <div className="mt-1 flex text-sm text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-300"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Index;
