import { FarmSection, HealthIssue, Plant, PlantHealth, PlantSensorData, Tweet, User } from '@/types';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    userType: 'household',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@farmcorp.com',
    userType: 'commercial',
    createdAt: new Date('2023-02-20')
  }
];

// Mock plants
export const mockPlants: Plant[] = [
  {
    id: '1',
    name: 'Monstera',
    species: 'Monstera deliciosa',
    image: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
    location: 'indoor',
    age: 26, // 26 weeks
    userId: '1',
    twitterHandle: '@moody_monstera',
    sensorId: 'sensor-001',
    createdAt: new Date('2023-04-10')
  },
  {
    id: '2',
    name: 'Fiddle Leaf Fig',
    species: 'Ficus lyrata',
    image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
    location: 'indoor',
    age: 52, // 52 weeks
    userId: '1',
    twitterHandle: '@fiddle_feelings',
    sensorId: 'sensor-002',
    createdAt: new Date('2022-10-15')
  },
  {
    id: '3',
    name: 'Snake Plant',
    species: 'Sansevieria trifasciata',
    image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg',
    location: 'indoor',
    age: 18, // 18 weeks
    userId: '1',
    twitterHandle: '@sassy_snake',
    sensorId: 'sensor-003',
    createdAt: new Date('2023-07-20')
  },
  {
    id: '4',
    name: 'Tomato Garden',
    species: 'Solanum lycopersicum',
    image: 'https://images.pexels.com/photos/1198643/pexels-photo-1198643.jpeg',
    location: 'outdoor',
    age: 8, // 8 weeks
    userId: '2',
    sensorId: 'sensor-farm-001',
    createdAt: new Date('2023-08-05')
  },
  {
    id: '5',
    name: 'Wheat Field A',
    species: 'Triticum',
    image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg',
    location: 'outdoor',
    age: 16, // 16 weeks
    userId: '2',
    sensorId: 'sensor-farm-002',
    createdAt: new Date('2023-06-12')
  }
];

// Mock sensor data
export const mockSensorData: Record<string, PlantSensorData> = {
  '1': {
    plantId: '1',
    waterLevel: 18,
    humidity: 62,
    light: 75,
    temperature: 24,
    fertilizer: 84,
    nextWatering: 720, // 12 hours in minutes
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  '2': {
    plantId: '2',
    waterLevel: 45,
    humidity: 58,
    light: 62,
    temperature: 22,
    fertilizer: 39,
    nextWatering: 36, // 36 minutes
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
  },
  '3': {
    plantId: '3',
    waterLevel: 72,
    humidity: 38,
    light: 88,
    temperature: 26,
    fertilizer: 90,
    nextWatering: 2160, // 36 hours in minutes
    lastUpdated: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
  },
  '4': {
    plantId: '4',
    waterLevel: 12,
    humidity: 42,
    light: 95,
    temperature: 28,
    fertilizer: 65,
    nextWatering: 15, // 15 minutes
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
  },
  '5': {
    plantId: '5',
    waterLevel: 28,
    humidity: 40,
    light: 92,
    temperature: 26,
    fertilizer: 75,
    nextWatering: 30, // 30 minutes
    lastUpdated: new Date(Date.now() - 10 * 60 * 1000) // 10 minutes ago
  }
};

// Mock health issues
const mockHealthIssues: Record<string, HealthIssue[]> = {
  '1': [
    {
      type: 'water',
      severity: 'high',
      message: 'Plant is severely underwatered. Water immediately!'
    }
  ],
  '2': [
    {
      type: 'fertilizer',
      severity: 'medium',
      message: 'Fertilizer levels are below optimal. Consider adding fertilizer in the next few days.'
    }
  ],
  '3': [],
  '4': [
    {
      type: 'water',
      severity: 'high',
      message: 'Critical water shortage. Irrigation required immediately!'
    },
    {
      type: 'humidity',
      severity: 'medium',
      message: 'Humidity levels are below optimal for tomato growth. Consider misting or adjusting greenhouse conditions.'
    }
  ],
  '5': [
    {
      type: 'water',
      severity: 'medium',
      message: 'Water levels are below optimal. Plan for irrigation within 24 hours.'
    }
  ]
};

// Mock plant health
export const mockPlantHealth: Record<string, PlantHealth> = {
  '1': {
    overallStatus: 'poor',
    issues: mockHealthIssues['1'],
    recommendations: [
      'Water thoroughly immediately',
      'Move to a location with less direct sunlight',
      'Increase humidity by misting daily'
    ],
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000)
  },
  '2': {
    overallStatus: 'fair',
    issues: mockHealthIssues['2'],
    recommendations: [
      'Apply balanced liquid fertilizer within 2-3 days',
      'Ensure consistent watering schedule'
    ],
    lastUpdated: new Date(Date.now() - 60 * 60 * 1000)
  },
  '3': {
    overallStatus: 'excellent',
    issues: [],
    recommendations: [
      'Continue current care routine',
      'Consider repotting in 2-3 months as plant is thriving'
    ],
    lastUpdated: new Date(Date.now() - 90 * 60 * 1000)
  },
  '4': {
    overallStatus: 'critical',
    issues: mockHealthIssues['4'],
    recommendations: [
      'Urgent: Irrigate immediately',
      'Apply mulch to retain soil moisture',
      'Consider shade cloth to reduce evaporation during peak heat hours'
    ],
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000)
  },
  '5': {
    overallStatus: 'good',
    issues: mockHealthIssues['5'],
    recommendations: [
      'Schedule irrigation within the next 24 hours',
      'Monitor for signs of pest activity as conditions are favorable'
    ],
    lastUpdated: new Date(Date.now() - 180 * 60 * 1000)
  }
};

// Mock tweets
export const mockTweets: Tweet[] = [
  {
    id: 't1',
    plantId: '1',
    message: "Is anyone going to give me water anytime soon, or should I just shrivel up and die? #ThirstySinceTuesday #PlantNeglect",
    sentiment: 'distressed',
    createdAt: new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago
  },
  {
    id: 't2',
    plantId: '1',
    message: "My human walked by me THREE TIMES today without even a droplet of water. I'm keeping score. #RememberThis",
    sentiment: 'annoyed',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
  },
  {
    id: 't3',
    plantId: '2',
    message: "I sense a nutrient deficiency coming on. Not that anyone around here would notice... #FeedMe #SlowlyStarving",
    sentiment: 'annoyed',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 't4',
    plantId: '3',
    message: "Living my best life with perfect light and just the right amount of water. #ThrivingThursday #PlantParentOfTheYear",
    sentiment: 'happy',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
  }
];

// Mock farm sections for commercial users
export const mockFarmSections: FarmSection[] = [
  {
    id: 'fs1',
    name: 'Greenhouse A',
    type: 'greenhouse',
    plantCount: 120,
    area: 500,
    userId: '2'
  },
  {
    id: 'fs2',
    name: 'Field B',
    type: 'field',
    plantCount: 2000,
    area: 10000,
    userId: '2'
  },
  {
    id: 'fs3',
    name: 'Hydroponic System C',
    type: 'hydroponics',
    plantCount: 350,
    area: 200,
    userId: '2'
  }
];

// Helper function to get plant sensor data
export const getPlantSensorData = (plantId: string): PlantSensorData | undefined => {
  return mockSensorData[plantId];
};

// Helper function to get plant health data
export const getPlantHealthData = (plantId: string): PlantHealth | undefined => {
  return mockPlantHealth[plantId];
};

// Helper function to get plant tweets
export const getPlantTweets = (plantId: string): Tweet[] => {
  return mockTweets.filter(tweet => tweet.plantId === plantId);
};

// Helper function to get default user
export const getDefaultUser = (userType: 'household' | 'commercial' = 'household'): User => {
  return userType === 'household' ? mockUsers[0] : mockUsers[1];
};