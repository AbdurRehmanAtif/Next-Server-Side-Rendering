import React, { useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const FormikCustomError = ({children }) => {


  return (
    <div className="flex items-left text-center p-1" role="alert">
      <ExclamationCircleIcon className="h-6 w-6 text-[#dc3548]" />
      <h4 className="text-[#dc3548] mt-[2px] pl-2 text-left font-medium text-sm">{children}</h4>
    </div>
  );
};

export default FormikCustomError;
