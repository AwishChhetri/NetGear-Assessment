import React from 'react';

const SpeakerCard = ({ name, role, avatarUrl }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="w-12 h-12 bg-gray-200 rounded-full">
        {avatarUrl && <img src={avatarUrl} alt={name} className="w-full h-full rounded-full object-cover" />}
      </div>
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm">{role}</p>
      </div>
    </div>
  );
};

export default SpeakerCard;