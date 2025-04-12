import React, { useRef, useState } from "react";
import PopUpStructure from "./PopUpStructure";
import { XMarkIcon } from "@heroicons/react/24/outline";

function AddPopup() {
  const cancelButtonRef = useRef();
  const [show, setShow] = useState(localStorage.getItem("addPopup") == 'false' ? false : true);
  const closePopupHandler = () => {
    setShow(false);
    localStorage.setItem("addPopup", false);
  };
  if (!show) {
    return <></>;
  }
  return (
    <PopUpStructure
      cancelButtonRef={cancelButtonRef}
      canShowPopUp={show}
      dismissPopUP={closePopupHandler}
    >
      <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none relative sm:h-full relative">
        <img
          src="/VitaminCPost1.jpg"
          alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
          className="object-cover object-center group-hover:opacity-75"
        />
        <div
          aria-hidden="true"
          className="bg-gradient-to-b from-transparent to-black opacity-50"
        />
          <div className="absolute right-0 top-0">
            <div className="flex items-center justify-center bg-red-600 rounded-lg px-3 py-2">
            <XMarkIcon className="w-5 h-5 text-white" />
            <button
              type="button"
              onClick={closePopupHandler}
              className="inline-flex items-center rounded-md text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              close
            </button>
            </div>
          </div>
      </div>
    </PopUpStructure>
  );
}

export default AddPopup;
