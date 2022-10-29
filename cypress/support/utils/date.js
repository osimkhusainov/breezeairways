/*
    I would use these funcs in order to generate random search URL like below: 

    Create random url func
    const generateOneWayTripUrl = (passengers) => {
        return `/booking/availability?origin=${getRandomIndex(codes)}&destination=${getRandomIndex(codes)}&beginDate=${getDate(nextDay(6))}&searchDestinationMacs=false&searchOriginMacs=false&passengers=%7B"types":%5B%7B"count":${passengers},"type":"ADT"%7D%5D%7D&infantCount=0`;
  };

  Use that within test
  cy.visit(`/${generateOneWayTripUrl(1)}`);
  It would allows us to avoid filling UI search page
  
  But I need more time to research how available flight dates work, so I skipped test where I could use these methods
*/

// Get date with format YYYY-MM-DD
export const getDate = (date) => {
  return date
    ? new Date(date).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);
};

export const getRandomIndex = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

// Give you the next day of the week.
export const nextDay = (i) =>
  new Date().setDate(
    new Date().getDate() + ((i + (7 - new Date().getDay())) % 7)
  );
