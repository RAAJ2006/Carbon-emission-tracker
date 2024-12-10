import { NextResponse } from 'next/server';

// app/api/auth/rankingapi/route.js
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    
    const limit = searchParams.get('limit') || '11';
    const days = searchParams.get('days') || '10';
    const status = searchParams.get('status') || 'open';
  
    const url = `https://eonet.gsfc.nasa.gov/api/v2.1/events?limit=${limit}&days=${days}&status=${status}`;
    
    try {
      const response = await fetch(url); // Request to NASA API
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  