"use client"

import { useEffect, useState } from 'react';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        
        const response = await fetch('/api/auth/rankingapi?limit=11&days=10&status=open');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data.events || []); 
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className='flex justify-center space-y-4 min-h-screen overflow-y-auto '>
      <div className='flex flex-col gap-4 mt-7'>
        <div className='flex text-white justify-between items-center cursor-pointer bg-[#26272b] hover:bg-[#32333b] shadow-[0px_0px_12px_#18191b] hover:shadow-[0px_0px_16px_#111216] transform hover:scale-105 transition duration-300 ease-in-out rounded-lg mx-11 my-5 p-3 w-full '>
      <h1 className='text-white semi-bold text-2xl'>Live Events</h1></div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className='text-white font-sans  '>
          {events.map((event) => (
            <li key={event.id} className='flex text-white justify-between items-center cursor-pointer bg-[#26272b] hover:bg-[#32333b] shadow-[0px_0px_12px_#18191b] hover:shadow-[0px_0px_16px_#111216] transform hover:scale-105 transition duration-300 ease-in-out rounded-lg mx-11 my-5 p-3 w-full'>
              <h2 className='font-bold'>{event.title}</h2>
              <p>{event.description}</p>
              <a href={event.link} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </li>
          ))}
        </ul>
      )}</div>
    </div>
  );
}
