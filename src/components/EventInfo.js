import React from 'react';
import { Calendar, Clock, Users} from 'lucide-react';

const EventInfo = ({ date, time, maxAttendees,timestamp }) => {
  // Sample data from the API
  const data = {
    time:`${time}`,
    maxAttendees: `${maxAttendees}`,
    timestamp: `${timestamp}`,
    date: `${date}`
  };

  // Format date to be human readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time to be human readable
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">{data.title}</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-purple-600">
          <Users className="w-5 h-5" />
          <span className="text-gray-700">Limited to {data.maxAttendees} attendees</span>
        </div>

        <div className="flex items-center gap-2 text-purple-600">
          <Calendar className="w-5 h-5" />
          <span className="text-gray-700">{formatDate(data.date)}</span>
        </div>

        <div className="flex items-center gap-2 text-purple-600">
          <Clock className="w-5 h-5" />
          <span className="text-gray-700">{formatTime(data.date)}</span>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Last updated: {formatDate(data.timestamp)} at {formatTime(data.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default EventInfo;