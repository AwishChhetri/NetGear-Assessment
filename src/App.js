import React, { useEffect, useState } from 'react';
import EventInfo from './components/EventInfo';
import RegistrationForm from './components/RegistrationForm';
import SpeakersList from './components/SpeakersList';
import WebinarPreview from './components/WebinarPreview';
import axios from 'axios';
import image from './images/icon.png';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-500">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-500">
      <div className="bg-white rounded-xl p-6 shadow-lg max-w-md">
        <p className="text-2xl font-bold text-red-600 mb-2">Error</p>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>
  );

  if (!webinarData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-500">
      {/* Header */}
      <header className="flex items-center justify-center space-x-4 py-6">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-4 ring-white/20">
          <img src={image} alt="event" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-semibold text-white">EventEase</h3>
        <p className="text-white-500 text-sm"><strong>Keeping you updated with the upcoming events!</strong></p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-purple-700 leading-tight">
                {webinarData.Title}
              </h1>

              <p className="text-gray-600 leading-relaxed">
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

            {/* Right Column */}
            <div className="space-y-8">
              <div className="md:hidden">
                <WebinarPreview 
                  image={webinarData["Event Image"] || 'https://res.cloudinary.com/da7eitibw/image/upload/v1738795355/images_1_y6nesz.jpg'}
                />
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6">
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
              </div>
              
              <div className="hidden md:block">
                <WebinarPreview 
                  image={webinarData["Event Image"] || 'https://res.cloudinary.com/da7eitibw/image/upload/v1738795355/images_1_y6nesz.jpg'}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;