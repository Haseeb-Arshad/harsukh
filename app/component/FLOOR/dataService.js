// dataService.js
import apartmentData from "./floorData";

export const findApartmentByNumber = (floorName, apartmentNumber) => {
  return apartmentData[floorName]?.find(
    (apt) => apt.Apartmentno.toString() === apartmentNumber
  );
};

export const getFloorName = (apartmentNumber) => {
  for (const floorName in apartmentData) {
    const apartment = apartmentData[floorName].find(
      (apt) => apt.Apartmentno.toString() === apartmentNumber
    );
    if (apartment) {
      return { apartment, floor: floorName };
    }
  }
  return { apartment: null, floor: "" };
};
