import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Link } from "react-router";

export default function AdModal({ setIsOpen, isOpen }) {
  function close() {
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 flex justify-end items-end pointer-events-none">
        {/* Transition Container */}
        <div
          className={`p-4 w-full max-w-xs sm:max-w-sm transform transition-transform ease-in-out duration-700
          ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
          transition-opacity delay-150 pointer-events-auto`}
        >
          <DialogPanel className="rounded-lg shadow-lg bg-white p-5 border border-gray-300">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Special Offer 🎉
            </DialogTitle>
            <p className="mt-2 text-sm text-gray-600">
              Subscribe now to access premium articles and exclusive features!
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300"
                onClick={close}
              >
                Dismiss
              </Button>
              <Link to={"subscriptions"}>
                <Button
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={close}
                >
                  Subscribe Now
                </Button>
              </Link>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
