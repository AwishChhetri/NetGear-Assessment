import React, { useEffect, useState } from 'react';
import EventInfo from './components/EventInfo';
import RegistrationForm from './components/RegistrationForm';
import SpeakersList from './components/SpeakersList';
import WebinarPreview from './components/WebinarPreview';
import axios from 'axios';

const App = () => {
  const [webinarData, setWebinarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebinarData = async () => {
      try {
        const response = await axios.get('https://script.google.com/macros/s/AKfycbzq52ZoWz_GUBPwlbBzO3t2qbkAID0f2iojgW2f81rseOfWc9OSonz_v0Z0YR44ojQK/exec');
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          const lastEntry = data[data.length - 1];
          setWebinarData(lastEntry);
        } else {
          setError('No data available');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWebinarData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-red-600 text-center max-w-md">
        <p className="text-xl font-semibold">Error</p>
        <p className="mt-2">{error}</p>
      </div>
    </div>
  );

  if (!webinarData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-500 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-4 md:p-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 shadow-xl">
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-2xl md:text-4xl font-bold text-purple-700 break-words">
            {webinarData.Title}
          </h1>

          <p className="text-sm md:text-base text-gray-600">
            {webinarData.Description}
          </p>

          <EventInfo
            date={webinarData.date}
            time={webinarData.Tiime}
            timestamp={webinarData.Timestamp}
            maxAttendees={webinarData['Maximum attedees']}
          />

          <RegistrationForm />
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="md:hidden">
            <WebinarPreview 
              image={webinarData["Event Image"] || 'https://res.cloudinary.com/da7eitibw/image/upload/v1738795355/images_1_y6nesz.jpg'}
            />
          </div>
          
          <SpeakersList 
            speakers={[
              {
                name: webinarData['Speaker(1) Name'],
                role: webinarData['Speaker(1) Role'],
                avatarUrl: webinarData['Speaker(1) Image Url'] || 'https://res.cloudinary.com/da7eitibw/image/upload/v1724481759/ddvzgcupdwv1awzjpar4.png'
              },
              {
                name: webinarData['Speaker(2) Name'],
                role: webinarData['Speaker(2) Role'],
                avatarUrl: webinarData['Speaker(2) Image Url'] || 'https://res.cloudinary.com/da7eitibw/image/upload/v1724481759/ddvzgcupdwv1awzjpar4.png'
              }
            ]} 
          />
          
          <div className="hidden md:block">
            <WebinarPreview 
              image={webinarData["Event Image"] || 'https://res.cloudinary.com/da7eitibw/image/upload/v1738795355/images_1_y6nesz.jpg'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;