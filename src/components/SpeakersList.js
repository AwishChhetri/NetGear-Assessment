import React from 'react';
import SpeakerCard from './SpeakerCard';

const SpeakersList = ({ speakers }) => {
    console.log("this is speaker",speakers)
  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-700 mb-4">
        Meet Our Speakers
      </h2>
      <div className="space-y-4">
        {speakers.map((speaker, index) => (
          <SpeakerCard key={index} {...speaker} />
        ))}
      </div>
    </div>
  );
};

export default SpeakersList;