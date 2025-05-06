export const DEFAULT_MAX_PLAYERS = 12;
export const DEFAULT_TOTAL_CREDITS = 100;

export const DEFAULT_ROLE_LIMITS = {
  batsman: { min: 3, max: 5 },
  bowler: { min: 3, max: 5 },
  "all-rounder": { min: 2, max: 4 },
  "wicket-keeper": { min: 0, max: 12 },
  "impact-player": { min: 0, max: 12 },
};

export const DEFAULT_GENDER_LIMITS = {
  male: { min: 0, max: 12 },
  female: { min: 2, max: 2 },
  others: { min: 0, max: 12 },
};


export const PLAYER_IMAGE = 'https://tplmania.s3.eu-west-2.amazonaws.com/toleram/cf762a40-af15-4269-b42a-b7cd1a557ead-player%20(1).jpg'