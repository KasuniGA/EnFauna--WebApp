import { useState } from "react";
import { useDonationStore } from "../../store/donation";
import { CheckCircle } from "lucide-react";

const AdoptionCard = ({ donation: initialDonation }) => {
  const [donation, setDonation] = useState(initialDonation);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const { adoptDonation } = useDonationStore();

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000
    );
  };

  const handleAdoptNow = async (donationId) => {
    try {
      const { success, message } = await adoptDonation(donationId);
      showToast(message, success ? "success" : "error");

      if (success) {
        setDonation(null);
      }
    } catch (error) {
      showToast("An error occurred while adopting the donation", "error");
    }
  };

  if (!donation) return null;

  return (
    <div className="w-full p-4">
    <div className="relative flex flex-col  rounded-xl bg-white dark:bg-gray-800 bg-clip-border text-gray-700 dark:text-gray-200 shadow-md ">
      
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({ show: false, message: "", type: "success" })
          }
        />
      )}

      <div className="relative mx-4 -mt-6 h-60  overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 dark:shadow-gray-900/40 bg-gradient-to-r from-blue-500 to-blue-600">
        <img
          src={donation.image || "https://via.placeholder.com/350x200"}
          alt={donation.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 dark:text-gray-100 antialiased">
          {donation.name}
        </h5>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Type: {donation.type}
        </p>
        <p className="block font-sans text-base font-light leading-relaxed text-gray-700 dark:text-gray-300 antialiased">
          {donation.description}
        </p>
        <div className="mt-4 text-lg font-semibold text-green-600 dark:text-green-400">
          ${donation.amount}
        </div>
      </div>

      <div className="p-6 pt-0">
        <button
          // onClick={() => handleAdoptNow(donation._id)}
          className="select-none rounded-lg bg-green-500 dark:bg-green-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 dark:shadow-green-800/20 transition-all hover:shadow-lg hover:shadow-green-500/40 dark:hover:shadow-green-800/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none flex items-center justify-center w-full"
        >
          <CheckCircle size={16} className="mr-2" />
          Adopt Now
        </button>
      </div>
    </div>
    </div>
  );
};

export default AdoptionCard;