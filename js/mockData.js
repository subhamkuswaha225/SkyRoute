/* ============================================================
   SkyRoute Mock Data
   Rich realistic data for flights, hotels, users, and airlines
   ============================================================ */

const AIRLINES = {
  '6E': { name: 'IndiGo', code: '6E', color: '#3F51B5' },
  'AI': { name: 'Air India', code: 'AI', color: '#E53935' },
  'SG': { name: 'SpiceJet', code: 'SG', color: '#FF6F00' },
  'UK': { name: 'Vistara', code: 'UK', color: '#6A1B9A' },
  'EK': { name: 'Emirates', code: 'EK', color: '#D4AF37' },
  'QR': { name: 'Qatar Airways', code: 'QR', color: '#5C0632' },
  'SQ': { name: 'Singapore Airlines', code: 'SQ', color: '#FDB813' },
  'LH': { name: 'Lufthansa', code: 'LH', color: '#05164D' },
  'BA': { name: 'British Airways', code: 'BA', color: '#075AAA' },
  'AA': { name: 'American Airlines', code: 'AA', color: '#0078D2' }
};

const AIRPORTS = {
  'DEL': { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International', country: 'India' },
  'BOM': { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj', country: 'India' },
  'BLR': { code: 'BLR', city: 'Bangalore', name: 'Kempegowda International', country: 'India' },
  'HYD': { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International', country: 'India' },
  'MAA': { code: 'MAA', city: 'Chennai', name: 'Chennai International', country: 'India' },
  'CCU': { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhas Chandra Bose', country: 'India' },
  'GOI': { code: 'GOI', city: 'Goa', name: 'Manohar International', country: 'India' },
  'DXB': { code: 'DXB', city: 'Dubai', name: 'Dubai International', country: 'UAE' },
  'SIN': { code: 'SIN', city: 'Singapore', name: 'Changi Airport', country: 'Singapore' },
  'LHR': { code: 'LHR', city: 'London', name: 'Heathrow Airport', country: 'UK' },
  'JFK': { code: 'JFK', city: 'New York', name: 'John F. Kennedy International', country: 'USA' },
  'DOH': { code: 'DOH', city: 'Doha', name: 'Hamad International', country: 'Qatar' },
  'FRA': { code: 'FRA', city: 'Frankfurt', name: 'Frankfurt Airport', country: 'Germany' },
  'BKK': { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi Airport', country: 'Thailand' }
};

const FLIGHTS = [
  // Direct domestic flights
  {
    id: 'SR1001',
    airline: '6E',
    flightNumber: '6E-2045',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: '06:30',
    arrivalTime: '08:45',
    duration: 135,
    price: 4599,
    currency: 'INR',
    class: 'Economy',
    stops: 0,
    segments: [
      { from: 'DEL', to: 'BOM', departure: '06:30', arrival: '08:45', duration: 135, flightNum: '6E-2045', aircraft: 'A320neo' }
    ],
    amenities: ['wifi', 'meal', 'entertainment'],
    seatsLeft: 12,
    baggage: '15kg cabin + 25kg check-in'
  },
  {
    id: 'SR1002',
    airline: 'AI',
    flightNumber: 'AI-680',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: '09:15',
    arrivalTime: '11:30',
    duration: 135,
    price: 5899,
    currency: 'INR',
    class: 'Economy',
    stops: 0,
    segments: [
      { from: 'DEL', to: 'BOM', departure: '09:15', arrival: '11:30', duration: 135, flightNum: 'AI-680', aircraft: 'B787 Dreamliner' }
    ],
    amenities: ['wifi', 'meal', 'entertainment', 'power'],
    seatsLeft: 34,
    baggage: '15kg cabin + 25kg check-in'
  },
  {
    id: 'SR1003',
    airline: 'UK',
    flightNumber: 'UK-955',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: '14:00',
    arrivalTime: '16:20',
    duration: 140,
    price: 7250,
    currency: 'INR',
    class: 'Premium Economy',
    stops: 0,
    segments: [
      { from: 'DEL', to: 'BOM', departure: '14:00', arrival: '16:20', duration: 140, flightNum: 'UK-955', aircraft: 'A321neo' }
    ],
    amenities: ['wifi', 'meal', 'entertainment', 'power', 'lounge'],
    seatsLeft: 8,
    baggage: '15kg cabin + 30kg check-in'
  },
  {
    id: 'SR1004',
    airline: 'SG',
    flightNumber: 'SG-412',
    origin: 'BLR',
    destination: 'HYD',
    departureTime: '07:45',
    arrivalTime: '09:00',
    duration: 75,
    price: 3299,
    currency: 'INR',
    class: 'Economy',
    stops: 0,
    segments: [
      { from: 'BLR', to: 'HYD', departure: '07:45', arrival: '09:00', duration: 75, flightNum: 'SG-412', aircraft: 'B737-800' }
    ],
    amenities: ['meal'],
    seatsLeft: 45,
    baggage: '15kg cabin + 15kg check-in'
  },
  {
    id: 'SR1005',
    airline: '6E',
    flightNumber: '6E-879',
    origin: 'BOM',
    destination: 'GOI',
    departureTime: '11:00',
    arrivalTime: '12:10',
    duration: 70,
    price: 2899,
    currency: 'INR',
    class: 'Economy',
    stops: 0,
    segments: [
      { from: 'BOM', to: 'GOI', departure: '11:00', arrival: '12:10', duration: 70, flightNum: '6E-879', aircraft: 'A320' }
    ],
    amenities: ['meal'],
    seatsLeft: 28,
    baggage: '15kg cabin + 20kg check-in'
  },

  // 1-stop domestic with SHORT layover
  {
    id: 'SR1006',
    airline: 'AI',
    flightNumber: 'AI-302',
    origin: 'DEL',
    destination: 'MAA',
    departureTime: '08:00',
    arrivalTime: '14:30',
    duration: 390,
    price: 6450,
    currency: 'INR',
    class: 'Economy',
    stops: 1,
    segments: [
      { from: 'DEL', to: 'HYD', departure: '08:00', arrival: '10:15', duration: 135, flightNum: 'AI-302', aircraft: 'A320neo' },
      { from: 'HYD', to: 'MAA', departure: '11:30', arrival: '14:30', duration: 80, flightNum: 'AI-455', aircraft: 'ATR 72' }
    ],
    layoverMinutes: 75,
    layoverAirport: 'HYD',
    amenities: ['meal', 'entertainment'],
    seatsLeft: 19,
    baggage: '15kg cabin + 25kg check-in'
  },

  // 1-stop with LONG LAYOVER (> 4 hours) — triggers hotel
  {
    id: 'SR1007',
    airline: 'EK',
    flightNumber: 'EK-511',
    origin: 'DEL',
    destination: 'LHR',
    departureTime: '04:15',
    arrivalTime: '18:30',
    duration: 855,
    price: 42500,
    currency: 'INR',
    class: 'Economy',
    stops: 1,
    segments: [
      { from: 'DEL', to: 'DXB', departure: '04:15', arrival: '06:30', duration: 225, flightNum: 'EK-511', aircraft: 'A380' },
      { from: 'DXB', to: 'LHR', departure: '13:00', arrival: '18:30', duration: 480, flightNum: 'EK-029', aircraft: 'A380' }
    ],
    layoverMinutes: 390,
    layoverAirport: 'DXB',
    amenities: ['wifi', 'meal', 'entertainment', 'power', 'lounge'],
    seatsLeft: 6,
    baggage: '7kg cabin + 30kg check-in'
  },
  {
    id: 'SR1008',
    airline: 'QR',
    flightNumber: 'QR-571',
    origin: 'BOM',
    destination: 'JFK',
    departureTime: '02:50',
    arrivalTime: '19:10',
    duration: 1220,
    price: 55900,
    currency: 'INR',
    class: 'Economy',
    stops: 1,
    segments: [
      { from: 'BOM', to: 'DOH', departure: '02:50', arrival: '04:30', duration: 210, flightNum: 'QR-571', aircraft: 'B787-9' },
      { from: 'DOH', to: 'JFK', departure: '10:15', arrival: '19:10', duration: 835, flightNum: 'QR-701', aircraft: 'A350-1000' }
    ],
    layoverMinutes: 345,
    layoverAirport: 'DOH',
    amenities: ['wifi', 'meal', 'entertainment', 'power', 'lounge', 'blanket'],
    seatsLeft: 14,
    baggage: '7kg cabin + 30kg check-in'
  },
  {
    id: 'SR1009',
    airline: 'LH',
    flightNumber: 'LH-761',
    origin: 'DEL',
    destination: 'JFK',
    departureTime: '01:30',
    arrivalTime: '18:45',
    duration: 1275,
    price: 61200,
    currency: 'INR',
    class: 'Premium Economy',
    stops: 1,
    segments: [
      { from: 'DEL', to: 'FRA', departure: '01:30', arrival: '06:45', duration: 525, flightNum: 'LH-761', aircraft: 'A350-900' },
      { from: 'FRA', to: 'JFK', departure: '12:30', arrival: '18:45', duration: 555, flightNum: 'LH-400', aircraft: 'A340-600' }
    ],
    layoverMinutes: 345,
    layoverAirport: 'FRA',
    amenities: ['wifi', 'meal', 'entertainment', 'power', 'lounge', 'blanket'],
    seatsLeft: 3,
    baggage: '7kg cabin + 2x23kg check-in'
  },
  // Long layover Singapore
  {
    id: 'SR1010',
    airline: 'SQ',
    flightNumber: 'SQ-403',
    origin: 'DEL',
    destination: 'BKK',
    departureTime: '10:30',
    arrivalTime: '06:20',
    duration: 890,
    price: 28700,
    currency: 'INR',
    class: 'Economy',
    stops: 1,
    segments: [
      { from: 'DEL', to: 'SIN', departure: '10:30', arrival: '18:00', duration: 330, flightNum: 'SQ-403', aircraft: 'A350-900' },
      { from: 'SIN', to: 'BKK', departure: '23:30', arrival: '06:20', duration: 170, flightNum: 'SQ-978', aircraft: 'B787-10' }
    ],
    layoverMinutes: 330,
    layoverAirport: 'SIN',
    amenities: ['wifi', 'meal', 'entertainment', 'power'],
    seatsLeft: 22,
    baggage: '7kg cabin + 30kg check-in'
  },

  // More direct flights
  {
    id: 'SR1011',
    airline: '6E',
    flightNumber: '6E-1122',
    origin: 'BLR',
    destination: 'DEL',
    departureTime: '05:50',
    arrivalTime: '08:40',
    duration: 170,
    price: 4150,
    currency: 'INR',
    class: 'Economy',
    stops: 0,
    segments: [
      { from: 'BLR', to: 'DEL', departure: '05:50', arrival: '08:40', duration: 170, flightNum: '6E-1122', aircraft: 'A321neo' }
    ],
    amenities: ['meal'],
    seatsLeft: 51,
    baggage: '15kg cabin + 20kg check-in'
  },
  {
    id: 'SR1012',
    airline: 'UK',
    flightNumber: 'UK-827',
    origin: 'BLR',
    destination: 'DEL',
    departureTime: '16:30',
    arrivalTime: '19:20',
    duration: 170,
    price: 6800,
    currency: 'INR',
    class: 'Business',
    stops: 0,
    segments: [
      { from: 'BLR', to: 'DEL', departure: '16:30', arrival: '19:20', duration: 170, flightNum: 'UK-827', aircraft: 'B787 Dreamliner' }
    ],
    amenities: ['wifi', 'meal', 'entertainment', 'power', 'lounge', 'blanket'],
    seatsLeft: 4,
    baggage: '15kg cabin + 35kg check-in'
  },
  {
    id: 'SR1013',
    airline: 'EK',
    flightNumber: 'EK-501',
    origin: 'BOM',
    destination: 'DXB',
    departureTime: '22:30',
    arrivalTime: '00:45',
    duration: 195,
    price: 15400,
    currency: 'INR',
    class: 'Economy',
    stops: 0,
    segments: [
      { from: 'BOM', to: 'DXB', departure: '22:30', arrival: '00:45', duration: 195, flightNum: 'EK-501', aircraft: 'B777-300ER' }
    ],
    amenities: ['wifi', 'meal', 'entertainment', 'power'],
    seatsLeft: 30,
    baggage: '7kg cabin + 30kg check-in'
  },
  {
    id: 'SR1014',
    airline: 'AI',
    flightNumber: 'AI-101',
    origin: 'DEL',
    destination: 'DXB',
    departureTime: '12:00',
    arrivalTime: '14:15',
    duration: 225,
    price: 12800,
    currency: 'INR',
    class: 'Economy',
    stops: 0,
    segments: [
      { from: 'DEL', to: 'DXB', departure: '12:00', arrival: '14:15', duration: 225, flightNum: 'AI-101', aircraft: 'B787 Dreamliner' }
    ],
    amenities: ['wifi', 'meal', 'entertainment', 'power'],
    seatsLeft: 18,
    baggage: '15kg cabin + 25kg check-in'
  },
  {
    id: 'SR1015',
    airline: 'SG',
    flightNumber: 'SG-622',
    origin: 'DEL',
    destination: 'GOI',
    departureTime: '10:20',
    arrivalTime: '12:50',
    duration: 150,
    price: 3750,
    currency: 'INR',
    class: 'Economy',
    stops: 0,
    segments: [
      { from: 'DEL', to: 'GOI', departure: '10:20', arrival: '12:50', duration: 150, flightNum: 'SG-622', aircraft: 'B737 MAX 8' }
    ],
    amenities: ['meal'],
    seatsLeft: 38,
    baggage: '15kg cabin + 15kg check-in'
  },

  // Long layover international
  {
    id: 'SR1016',
    airline: 'BA',
    flightNumber: 'BA-256',
    origin: 'DEL',
    destination: 'JFK',
    departureTime: '21:15',
    arrivalTime: '16:40',
    duration: 1165,
    price: 72000,
    currency: 'INR',
    class: 'Business',
    stops: 1,
    segments: [
      { from: 'DEL', to: 'LHR', departure: '21:15', arrival: '03:30', duration: 525, flightNum: 'BA-256', aircraft: 'A380' },
      { from: 'LHR', to: 'JFK', departure: '10:00', arrival: '16:40', duration: 480, flightNum: 'BA-115', aircraft: 'B777-300ER' }
    ],
    layoverMinutes: 390,
    layoverAirport: 'LHR',
    amenities: ['wifi', 'meal', 'entertainment', 'power', 'lounge', 'blanket', 'amenity-kit'],
    seatsLeft: 2,
    baggage: '2x hand + 2x32kg check-in'
  },
  {
    id: 'SR1017',
    airline: 'AI',
    flightNumber: 'AI-175',
    origin: 'DEL',
    destination: 'SIN',
    departureTime: '01:10',
    arrivalTime: '09:30',
    duration: 340,
    price: 18900,
    currency: 'INR',
    class: 'Economy',
    stops: 0,
    segments: [
      { from: 'DEL', to: 'SIN', departure: '01:10', arrival: '09:30', duration: 340, flightNum: 'AI-175', aircraft: 'B787-9' }
    ],
    amenities: ['wifi', 'meal', 'entertainment', 'power'],
    seatsLeft: 25,
    baggage: '15kg cabin + 25kg check-in'
  },
  {
    id: 'SR1018',
    airline: '6E',
    flightNumber: '6E-5543',
    origin: 'HYD',
    destination: 'CCU',
    departureTime: '13:15',
    arrivalTime: '15:30',
    duration: 135,
    price: 4200,
    currency: 'INR',
    class: 'Economy',
    stops: 0,
    segments: [
      { from: 'HYD', to: 'CCU', departure: '13:15', arrival: '15:30', duration: 135, flightNum: '6E-5543', aircraft: 'A320neo' }
    ],
    amenities: ['meal'],
    seatsLeft: 41,
    baggage: '15kg cabin + 20kg check-in'
  },
  {
    id: 'SR1019',
    airline: 'UK',
    flightNumber: 'UK-701',
    origin: 'DEL',
    destination: 'BLR',
    departureTime: '19:00',
    arrivalTime: '21:45',
    duration: 165,
    price: 5600,
    currency: 'INR',
    class: 'Economy',
    stops: 0,
    segments: [
      { from: 'DEL', to: 'BLR', departure: '19:00', arrival: '21:45', duration: 165, flightNum: 'UK-701', aircraft: 'A321neo' }
    ],
    amenities: ['wifi', 'meal', 'entertainment', 'power'],
    seatsLeft: 16,
    baggage: '15kg cabin + 25kg check-in'
  },
  {
    id: 'SR1020',
    airline: 'AA',
    flightNumber: 'AA-292',
    origin: 'DEL',
    destination: 'JFK',
    departureTime: '00:15',
    arrivalTime: '06:45',
    duration: 900,
    price: 48500,
    currency: 'INR',
    class: 'Economy',
    stops: 0,
    segments: [
      { from: 'DEL', to: 'JFK', departure: '00:15', arrival: '06:45', duration: 900, flightNum: 'AA-292', aircraft: 'B777-300ER' }
    ],
    amenities: ['wifi', 'meal', 'entertainment', 'power', 'blanket'],
    seatsLeft: 10,
    baggage: '7kg cabin + 2x23kg check-in'
  },

  // Extra long layover
  {
    id: 'SR1021',
    airline: 'EK',
    flightNumber: 'EK-525',
    origin: 'BLR',
    destination: 'LHR',
    departureTime: '03:30',
    arrivalTime: '19:00',
    duration: 930,
    price: 38500,
    currency: 'INR',
    class: 'Economy',
    stops: 1,
    segments: [
      { from: 'BLR', to: 'DXB', departure: '03:30', arrival: '06:00', duration: 240, flightNum: 'EK-525', aircraft: 'B777-300ER' },
      { from: 'DXB', to: 'LHR', departure: '14:30', arrival: '19:00', duration: 480, flightNum: 'EK-003', aircraft: 'A380' }
    ],
    layoverMinutes: 510,
    layoverAirport: 'DXB',
    amenities: ['wifi', 'meal', 'entertainment', 'power', 'lounge'],
    seatsLeft: 11,
    baggage: '7kg cabin + 30kg check-in'
  }
];

const HOTELS = [
  // Dubai airport hotels
  {
    id: 'HTL001',
    name: 'Dubai International Hotel',
    airport: 'DXB',
    distanceKm: 0.1,
    rating: 4.3,
    pricePerNight: 8500,
    currency: 'INR',
    amenities: ['spa', 'pool', 'gym', 'restaurant', 'airport-shuttle'],
    image: 'hotel_dubai_1',
    type: 'Airport Transit',
    description: 'Luxurious transit hotel inside Terminal 3 with pool and spa access'
  },
  {
    id: 'HTL002',
    name: 'Premier Inn Dubai Airport',
    airport: 'DXB',
    distanceKm: 2.5,
    rating: 4.1,
    pricePerNight: 5200,
    currency: 'INR',
    amenities: ['gym', 'restaurant', 'airport-shuttle', 'wifi'],
    image: 'hotel_dubai_2',
    type: 'Near Airport',
    description: 'Modern hotel with complimentary airport shuttle, just 5 mins away'
  },
  {
    id: 'HTL003',
    name: 'Le Méridien Dubai',
    airport: 'DXB',
    distanceKm: 1.2,
    rating: 4.6,
    pricePerNight: 12000,
    currency: 'INR',
    amenities: ['spa', 'pool', 'gym', 'restaurant', 'bar', 'airport-shuttle'],
    image: 'hotel_dubai_3',
    type: 'Luxury',
    description: 'Premium 5-star hotel connected to airport via skywalk'
  },

  // Doha airport hotels
  {
    id: 'HTL004',
    name: 'Oryx Airport Hotel',
    airport: 'DOH',
    distanceKm: 0.1,
    rating: 4.4,
    pricePerNight: 9000,
    currency: 'INR',
    amenities: ['spa', 'pool', 'gym', 'restaurant', 'bar'],
    image: 'hotel_doha_1',
    type: 'Airport Transit',
    description: 'Award-winning airport hotel inside Hamad International'
  },
  {
    id: 'HTL005',
    name: 'Marriott Marquis Doha',
    airport: 'DOH',
    distanceKm: 8,
    rating: 4.7,
    pricePerNight: 14500,
    currency: 'INR',
    amenities: ['spa', 'pool', 'gym', 'restaurant', 'bar', 'airport-shuttle'],
    image: 'hotel_doha_2',
    type: 'Luxury',
    description: 'Twin-tower luxury hotel with panoramic city views'
  },

  // London Heathrow hotels
  {
    id: 'HTL006',
    name: 'Sofitel London Heathrow',
    airport: 'LHR',
    distanceKm: 0.3,
    rating: 4.5,
    pricePerNight: 16000,
    currency: 'INR',
    amenities: ['spa', 'pool', 'gym', 'restaurant', 'bar', 'airport-shuttle'],
    image: 'hotel_london_1',
    type: 'Airport Adjacent',
    description: 'Connected directly to Terminal 5 via covered walkway'
  },
  {
    id: 'HTL007',
    name: 'Hilton Garden Inn Heathrow',
    airport: 'LHR',
    distanceKm: 3,
    rating: 4.0,
    pricePerNight: 7500,
    currency: 'INR',
    amenities: ['gym', 'restaurant', 'airport-shuttle', 'wifi'],
    image: 'hotel_london_2',
    type: 'Near Airport',
    description: 'Budget-friendly option with free shuttle service'
  },

  // Frankfurt airport hotels
  {
    id: 'HTL008',
    name: 'Hilton Frankfurt Airport',
    airport: 'FRA',
    distanceKm: 0.2,
    rating: 4.4,
    pricePerNight: 13000,
    currency: 'INR',
    amenities: ['spa', 'pool', 'gym', 'restaurant', 'bar'],
    image: 'hotel_frankfurt_1',
    type: 'Airport Adjacent',
    description: 'Directly connected to Terminal 1 via SkyLine train'
  },
  {
    id: 'HTL009',
    name: 'NH Frankfurt Airport',
    airport: 'FRA',
    distanceKm: 5,
    rating: 4.1,
    pricePerNight: 8200,
    currency: 'INR',
    amenities: ['gym', 'restaurant', 'airport-shuttle', 'wifi'],
    image: 'hotel_frankfurt_2',
    type: 'Near Airport',
    description: 'Contemporary hotel with shuttle service to all terminals'
  },

  // Singapore Changi hotels
  {
    id: 'HTL010',
    name: 'YOTEL Singapore Changi',
    airport: 'SIN',
    distanceKm: 0.1,
    rating: 4.2,
    pricePerNight: 7000,
    currency: 'INR',
    amenities: ['gym', 'restaurant', 'wifi'],
    image: 'hotel_singapore_1',
    type: 'Airport Transit',
    description: 'Smart capsule hotel inside Jewel Changi with Rainforest views'
  },
  {
    id: 'HTL011',
    name: 'Crowne Plaza Changi Airport',
    airport: 'SIN',
    distanceKm: 0.5,
    rating: 4.6,
    pricePerNight: 15000,
    currency: 'INR',
    amenities: ['spa', 'pool', 'gym', 'restaurant', 'bar', 'airport-shuttle'],
    image: 'hotel_singapore_2',
    type: 'Luxury',
    description: 'Award-winning airport hotel with tropical pool and garden'
  },

  // Hyderabad airport hotel
  {
    id: 'HTL012',
    name: 'Novotel HICC Hyderabad',
    airport: 'HYD',
    distanceKm: 6,
    rating: 4.3,
    pricePerNight: 5500,
    currency: 'INR',
    amenities: ['pool', 'gym', 'restaurant', 'wifi'],
    image: 'hotel_hyderabad_1',
    type: 'Near Airport',
    description: 'Modern hotel with pool, close to Shamshabad airport'
  }
];

const POPULAR_DESTINATIONS = [
  { city: 'Goa', code: 'GOI', tagline: 'Sun, sand & serenity', priceFrom: 2899, image: 'dest_goa' },
  { city: 'Dubai', code: 'DXB', tagline: 'City of gold', priceFrom: 12800, image: 'dest_dubai' },
  { city: 'Singapore', code: 'SIN', tagline: 'Garden city magic', priceFrom: 18900, image: 'dest_singapore' },
  { city: 'London', code: 'LHR', tagline: 'Royal experience', priceFrom: 38500, image: 'dest_london' },
  { city: 'Bangkok', code: 'BKK', tagline: 'Temple of dreams', priceFrom: 28700, image: 'dest_bangkok' },
  { city: 'New York', code: 'JFK', tagline: 'The big apple', priceFrom: 48500, image: 'dest_newyork' }
];

const MOCK_USER = {
  id: 'USR001',
  name: 'Aryan Sharma',
  email: 'aryan.sharma@email.com',
  avatar: null,
  bookings: [
    {
      id: 'BK001',
      flightId: 'SR1001',
      status: 'completed',
      bookedAt: '2026-05-15T10:30:00',
      passengers: 1,
      totalPaid: 4599,
      pnr: 'SKY7X9M2'
    },
    {
      id: 'BK002',
      flightId: 'SR1007',
      status: 'upcoming',
      bookedAt: '2026-06-10T14:00:00',
      passengers: 2,
      totalPaid: 85000,
      pnr: 'SKY3K8P1'
    },
    {
      id: 'BK003',
      flightId: 'SR1013',
      status: 'upcoming',
      bookedAt: '2026-06-18T09:15:00',
      passengers: 1,
      totalPaid: 15400,
      pnr: 'SKY5N2Q7'
    }
  ]
};

// Helper functions
function getFlightById(id) {
  return FLIGHTS.find(f => f.id === id);
}

function searchFlights(origin, destination, date) {
  return FLIGHTS.filter(f => {
    const matchOrigin = !origin || f.origin === origin;
    const matchDest = !destination || f.destination === destination;
    return matchOrigin && matchDest;
  });
}

function getHotelsByAirport(airportCode) {
  return HOTELS.filter(h => h.airport === airportCode);
}

function getAirline(code) {
  return AIRLINES[code];
}

function getAirport(code) {
  return AIRPORTS[code];
}

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function formatPrice(price, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

function generatePNR() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pnr = 'SKY';
  for (let i = 0; i < 5; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
}

/* ============================================================
   Programmatic Flight Seeder (1000+ flights)
   ============================================================ */
function generateMockFlights() {
  const generated = [];
  const airports = Object.keys(AIRPORTS);
  const classes = ['Economy', 'Premium Economy', 'Business', 'First Class'];
  const aircraftTypes = {
    '6E': ['A320neo', 'A321neo', 'ATR 72'],
    'AI': ['A320neo', 'B787 Dreamliner', 'B777-300ER'],
    'SG': ['B737-800', 'B737 MAX 8'],
    'UK': ['A320neo', 'A321neo', 'B787 Dreamliner'],
    'EK': ['A380', 'B777-300ER'],
    'QR': ['A350-1000', 'B787-9', 'B777-300ER'],
    'SQ': ['A350-900', 'B787-10'],
    'LH': ['A350-900', 'A340-600', 'B747-8'],
    'BA': ['A380', 'B777-300ER', 'B787-10'],
    'AA': ['B777-300ER', 'B787-9']
  };
  const allAmenities = ['wifi', 'meal', 'entertainment', 'power', 'lounge', 'blanket', 'amenity-kit'];
  
  const today = new Date();
  let flightIdCounter = 2000;
  
  for (let i = 0; i < airports.length; i++) {
    for (let j = 0; j < airports.length; j++) {
      if (i === j) continue;
      
      const origin = airports[i];
      const dest = airports[j];
      const isDomestic = AIRPORTS[origin].country === 'India' && AIRPORTS[dest].country === 'India';
      
      let allowedAirlines;
      if (isDomestic) {
        allowedAirlines = ['6E', 'AI', 'SG', 'UK'];
      } else {
        allowedAirlines = ['EK', 'QR', 'SQ', 'LH', 'BA', 'AA', 'AI'];
      }
      
      // Generate 7 flights per route to get around 182 * 7 = 1274 flights
      for (let f = 0; f < 7; f++) {
        const airlineCode = allowedAirlines[Math.floor(Math.random() * allowedAirlines.length)];
        
        const depHour = Math.floor(Math.random() * 24);
        const depMin = Math.floor(Math.random() * 4) * 15;
        const departureTime = `${depHour.toString().padStart(2, '0')}:${depMin.toString().padStart(2, '0')}`;
        
        let duration = isDomestic 
          ? 60 + Math.floor(Math.random() * 120) 
          : 200 + Math.floor(Math.random() * 800);
          
        const depMinutes = depHour * 60 + depMin;
        const arrMinutes = (depMinutes + duration) % 1440;
        const arrHour = Math.floor(arrMinutes / 60);
        const arrMin = arrMinutes % 60;
        const arrivalTime = `${arrHour.toString().padStart(2, '0')}:${arrMin.toString().padStart(2, '0')}`;
        
        const basePrice = isDomestic
          ? 2500 + Math.floor(Math.random() * 8000)
          : 18000 + Math.floor(Math.random() * 70000);
          
        const flightClass = classes[Math.floor(Math.random() * classes.length)];
        
        let priceMultiplier = 1;
        if (flightClass === 'Premium Economy') priceMultiplier = 1.3;
        else if (flightClass === 'Business') priceMultiplier = 2.5;
        else if (flightClass === 'First Class') priceMultiplier = 4.0;
        
        const price = Math.round(basePrice * priceMultiplier);
        
        // Stops and layover
        const stops = (isDomestic || Math.random() > 0.4) ? 0 : 1;
        let layoverMinutes = 0;
        let layoverAirport = '';
        let segments = [];
        
        const aircraftList = aircraftTypes[airlineCode] || ['B737'];
        const aircraft = aircraftList[Math.floor(Math.random() * aircraftList.length)];
        const flightNumber = `${airlineCode}-${Math.floor(100 + Math.random() * 900)}`;
        
        if (stops === 0) {
          segments.push({
            from: origin,
            to: dest,
            departure: departureTime,
            arrival: arrivalTime,
            duration: duration,
            flightNum: flightNumber,
            aircraft: aircraft
          });
        } else {
          const potentialLayovers = airports.filter(a => a !== origin && a !== dest);
          layoverAirport = potentialLayovers[Math.floor(Math.random() * potentialLayovers.length)];
          
          layoverMinutes = 60 + Math.floor(Math.random() * 420);
          
          const dur1 = Math.floor(duration * 0.4);
          const dur2 = duration - dur1;
          
          const depMinutes1 = depMinutes;
          const arrMinutes1 = (depMinutes1 + dur1) % 1440;
          const arrHour1 = Math.floor(arrMinutes1 / 60);
          const arrMin1 = arrMinutes1 % 60;
          const arrivalTime1 = `${arrHour1.toString().padStart(2, '0')}:${arrMin1.toString().padStart(2, '0')}`;
          
          const depMinutes2 = (arrMinutes1 + layoverMinutes) % 1440;
          const depHour2 = Math.floor(depMinutes2 / 60);
          const depMin2 = depMinutes2 % 60;
          const departureTime2 = `${depHour2.toString().padStart(2, '0')}:${depMin2.toString().padStart(2, '0')}`;
          
          const arrMinutes2 = (depMinutes2 + dur2) % 1440;
          const arrHour2 = Math.floor(arrMinutes2 / 60);
          const arrMin2 = arrMinutes2 % 60;
          const arrivalTime2 = `${arrHour2.toString().padStart(2, '0')}:${arrMin2.toString().padStart(2, '0')}`;
          
          segments.push({
            from: origin,
            to: layoverAirport,
            departure: departureTime,
            arrival: arrivalTime1,
            duration: dur1,
            flightNum: flightNumber,
            aircraft: aircraft
          });
          
          segments.push({
            from: layoverAirport,
            to: dest,
            departure: departureTime2,
            arrival: arrivalTime2,
            duration: dur2,
            flightNum: `${airlineCode}-${Math.floor(100 + Math.random() * 900)}`,
            aircraft: aircraft
          });
        }
        
        const flightDateOffset = Math.floor(Math.random() * 30);
        const flightDate = new Date();
        flightDate.setDate(today.getDate() + flightDateOffset);
        const dateStr = flightDate.toISOString().split('T')[0];
        
        const amenitiesCount = 2 + Math.floor(Math.random() * 4);
        const amenities = [...allAmenities]
          .sort(() => 0.5 - Math.random())
          .slice(0, amenitiesCount);
          
        const seatsLeft = 1 + Math.floor(Math.random() * 59);
        const baggage = isDomestic 
          ? '15kg cabin + 15kg check-in' 
          : '7kg cabin + 2x23kg check-in';
          
        generated.push({
          id: `SR${flightIdCounter++}`,
          airline: airlineCode,
          flightNumber: flightNumber,
          origin: origin,
          destination: dest,
          departureTime: departureTime,
          arrivalTime: arrivalTime,
          duration: duration + (stops ? layoverMinutes : 0),
          price: price,
          currency: 'INR',
          class: flightClass,
          stops: stops,
          segments: segments,
          layoverMinutes: stops ? layoverMinutes : undefined,
          layoverAirport: stops ? layoverAirport : undefined,
          amenities: amenities,
          seatsLeft: seatsLeft,
          baggage: baggage,
          date: dateStr
        });
      }
    }
  }
  
  return generated;
}

// Seed the flight database
(function() {
  const seededFlights = generateMockFlights();
  FLIGHTS.push(...seededFlights);
  console.log(`✈️ SkyRoute Seeder: Programmatically generated ${seededFlights.length} mock flights. Total flights: ${FLIGHTS.length}`);
})();

