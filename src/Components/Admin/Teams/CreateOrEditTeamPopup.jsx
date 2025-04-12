import React, { useState, useEffect } from "react";
import {
  DialogTitle,
} from "@headlessui/react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import {
  useCreateTeamMutation,
  useUpdateTeamsDetailsMutation,
} from "../../../app/Services/Admin/adminTeams";
import UploadImage from "../../UploadImage/Index";
import PopUpStructure from "../../PopUp/PopUpStructure";

export default function CreateOrEditTeamPopup({ open, setOpen, selectedTeam }) {
  const [createTeam, { isLoading: isCreateLoading }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdateLoading }] =
    useUpdateTeamsDetailsMutation(selectedTeam?.id);
  const cancelButtonRef = React.useRef(null);

  // Use useEffect to reset the form when the popup opens/closes or selectedTeam changes
  useEffect(() => {
    if (open) {
      setTeamName(selectedTeam?.team_name || "");
      setImageFile(null);
      setImageUrl("");
    }
  }, [open, selectedTeam]);

  const [teamName, setTeamName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const isLoading = isCreateLoading || isUpdateLoading;
  const isEditMode = Boolean(selectedTeam);

  const onSubmit = async () => {
    if (!teamName.trim()) {
      toast.error("Team name is required");
      return;
    }

    if (!imageUrl && !isEditMode) {
      toast.error("Team image is required");
      return;
    }

    try {
      const payload = {
        teamName,
        teamId: selectedTeam?.id,
        imageUrl: imageUrl,
      };

      if (isEditMode) {
        await updateTeam(payload).unwrap();
        toast.success("Team updated successfully");
      } else {
        await createTeam(payload).unwrap();
        toast.success("Team created successfully");
      }

      setOpen(false);
    } catch (error) {
      toast.error(
        error?.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} team`
      );
      console.error("Error details:", error);
    }
  };

  return (
    <>
      <PopUpStructure
        cancelButtonRef={cancelButtonRef}
        canShowPopUp={open}
        dismissPopUP={() => setOpen(false)}
      >
        <div className="bg-gray-900 p-5">
          <div>
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
              <UserGroupIcon
                aria-hidden="true"
                className="size-6 text-green-600"
              />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <DialogTitle
                as="h3"
                className="text-base font-semibold text-gray-100"
              >
                {isEditMode ? "Edit Team" : "Create New Team"}
              </DialogTitle>
              <div className="mt-4">
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
          <UploadImage
            placeholder={"Upload team logo"}
            updateImageUrl={setImageUrl}
            existingImageUrl={selectedTeam?.team_logo}
          />
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              onClick={onSubmit}
              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Team"
                : "Create Team"}
            </button>
            <button
              type="button"
              className="mt-2 inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              onClick={() => setOpen(false)}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </div>
      </PopUpStructure>
    </>
  );
}
