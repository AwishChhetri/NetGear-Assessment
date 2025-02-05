import React from 'react';

const WebinarPreview = ({ image }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 mt-6">
      <img src={image} alt="Webinar Preview" className="rounded-md w-[600px] h-[300px]" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2 pt-5">
        Webinar Preview
      </h3>
      <p className="text-gray-600">
      "Education is not preparation for life; education is life itself."
      </p>
    </div>
  );
};

export default WebinarPreview;
