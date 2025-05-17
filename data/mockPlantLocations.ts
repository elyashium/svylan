import { GeoLocation } from "@/types";

// Define some region/area names where plants can be located
export const plantRegions = [
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Garden",
  "Patio",
  "Office",
  "Greenhouse",
  "Balcony"
];

// Mock geographical coordinates for plants
// These are placeholder coordinates - replace with accurate ones for your use case
export const mockPlantGeoLocations: Record<string, { geoLocation: GeoLocation, region: string }> = {
  // Household plants (Alice's plants)
  '1': { 
    geoLocation: { latitude: 40.7128, longitude: -74.0060 },  // New York
    region: "Living Room" 
  },
  '2': { 
    geoLocation: { latitude: 40.7135, longitude: -74.0046 },  // New York (nearby)
    region: "Kitchen" 
  },
  '3': { 
    geoLocation: { latitude: 40.7140, longitude: -74.0065 },  // New York (nearby)
    region: "Bedroom" 
  },
  // Commercial plants (Bob's plants)
  '4': { 
    geoLocation: { latitude: 38.8951, longitude: -77.0364 },  // Washington DC 
    region: "Greenhouse" 
  },
  '5': { 
    geoLocation: { latitude: 38.8980, longitude: -77.0390 },  // Washington DC (nearby)
    region: "Field A" 
  }
};

// Default region for centering the map
export const defaultMapRegion = {
  latitude: 40.7128,
  longitude: -74.0060,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Function to get a plant's location info
export const getPlantLocationInfo = (plantId: string) => {
  return mockPlantGeoLocations[plantId] || null;
};

// Emojis for different types of plants
export const plantEmojis: Record<string, string> = {
  'Monstera deliciosa': '🌿',
  'Ficus lyrata': '🌱',
  'Sansevieria trifasciata': '🪴',
  'Solanum lycopersicum': '🍅',
  'Triticum': '🌾',
  // Default emoji if species not found
  'default': '🌱'
};

// Get emoji for a plant based on species
export const getPlantEmoji = (species: string): string => {
  return plantEmojis[species] || plantEmojis.default;
}; 