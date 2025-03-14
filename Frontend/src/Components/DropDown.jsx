import React, { useState } from "react";

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  const handleMouseEnter = () => {
    if (!isFrozen) setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isFrozen) setIsDropdownOpen(false);
  };

  const handleClick = () => {
    setIsDropdownOpen(true);
    setIsFrozen(!isFrozen); // Freeze when clicked, unfreeze on second click
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".dropdown-container")) {
      setIsDropdownOpen(false);
      setIsFrozen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="relative dropdown-container">
      <button
        className="w-full text-left px-4 py-2 hover:text-[#059669] text-gray-800 dark:text-white"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        Explore
      </button>

      {isDropdownOpen && (
        <div
          className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={handleMouseLeave}
        >
          <ul>
            <li className="px-4 py-2 hover:bg-gray-200">Option 1</li>
            <li className="px-4 py-2 hover:bg-gray-200">Option 2</li>
            <li className="px-4 py-2 hover:bg-gray-200">Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
