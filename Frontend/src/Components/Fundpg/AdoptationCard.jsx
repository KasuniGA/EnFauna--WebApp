import { useState } from "react";
import { useDonationStore } from "../../store/donation";
import { CheckCircle } from "lucide-react";
import Toast from "../Toast"; // Ensure this exists
import Paypal from "../Fundpg/PayPal"; // Ensure this exists and works

const AdoptionCard = ({ donation: initialDonation }) => {
  const [donation, setDonation] = useState(initialDonation);
  const [showPayPal, setShowPayPal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [showBankInfo, setShowBankInfo] = useState(false);

  const { adoptDonation } = useDonationStore();

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000
    );
  };

  const handleAdoptionSuccess = async () => {
    try {
      const { success, message } = await adoptDonation(donation._id);
      showToast(message, success ? "success" : "error");
      if (success) {
        setDonation(null); // Hide card if adopted
      }
    } catch (error) {
      showToast("An error occurred during adoption", "error");
    }
    setShowPayPal(false);
  };

  if (!donation) return null;

  return (
    <div className="w-full p-4">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({ show: false, message: "", type: "success" })
          }
        />
      )}

      <div className="relative flex flex-col rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-md">
        <div className="relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl">
          <img
            src={donation.image || "https://via.placeholder.com/350x200"}
            alt={donation.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <h5 className="text-xl font-semibold mb-2">{donation.name}</h5>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Type: {donation.type}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {donation.description}
          </p>
          <div className="mt-4 text-lg font-semibold text-green-600 dark:text-green-400">
            ${donation.amount}
          </div>
        </div>

        <div className="p-6 pt-0">
          {showPayPal ? (
            <Paypal
              amount={donation.amount}
              description={`Adoption for ${donation.name}`}
              onSuccess={handleAdoptionSuccess}
              onClose={() => setShowPayPal(false)}
            />
          ) : (
            <button
              onClick={() => setShowPayPal(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg flex items-center justify-center transition-all"
            >
              <CheckCircle size={16} className="mr-2" />
              Adopt Now
            </button>
          )}
          <button
            onClick={() => setShowBankInfo(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors mt-2"
          >
            Bank / Wire Transfer
          </button>
          {showBankInfo && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-300 rounded-lg">
              <p className="text-sm mb-2">
                If this method is easier for you, drop us a message for the bank
                / wire transfer instructions.
              </p>
              <button
                onClick={() => (window.location.href = "/contact")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Contact Us
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdoptionCard;
