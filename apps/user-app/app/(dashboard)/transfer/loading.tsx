import React from "react";

const loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default loading;