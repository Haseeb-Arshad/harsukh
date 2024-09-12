//  svgOverlay.querySelectorAll('polygon, path').forEach(element => {
//   element.addEventListener('click', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log("JNKJJKNLK")
//     const dataImage = element.getAttribute('data-image');
//     if (dataImage) {
//       console.log(dataImage)
//       router.push(`/${imageName}/Apartment${dataImage}`);
//     }
//   });
// });

// svgOverlay.querySelectorAll('polygon, path').forEach(element => {
//   element.addEventListener('click', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log("JNKJJKNLK")
//     const dataImage = element.getAttribute('data-image');
//     if (dataImage) {
//       console.log(dataImage)
//       router.push(`/${imageName}/Apartment${dataImage}`);
//     }
//   });
// });
// svgOverlay.addEventListener("click", (e) => {
//   const svgPoint = viewer.viewport.pointFromPixel(
//     new OpenSeadragon.Point(e.clientX, e.clientY)
//   );
//   const viewportPoint =
//     viewer.viewport.viewportToImageCoordinates(svgPoint);

//   // Check if the click is within any polygon
//   const polygons = svgOverlay.querySelectorAll("polygon");
//   for (let polygon of polygons) {
//     if (isPointInPolygon(viewportPoint, polygon)) {
//       const dataImage = polygon.getAttribute("data-image");
//       if (dataImage) {
//         const apartmentInfo = apartmentData["3rd Floor"].find(
//           (apt) => apt.Apartmentno.toString() === dataImage
//         );

//         if (apartmentInfo) {
//           setActivePolygon({
//             id: dataImage,
//             Type: apartmentInfo.Type,
//             Bedrooms: apartmentInfo.Bedrooms,
//             Area: apartmentInfo.Area,
//           });

//           setPopupPosition({ x: e.clientX, y: e.clientY });
//         }
//       }
//       break;
//     }
//   }
// });

// const handlePolygonInteraction = (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   const dataImage = e.target.getAttribute('data-image');
//   if (dataImage) {
//     // Find the corresponding apartment data
//     const apartmentInfo = apartmentData["3rd Floor"].find(apt => apt.Apartmentno.toString() === dataImage);

//     if (apartmentInfo) {
//       setActivePolygon({
//         id: dataImage,
//         Type: apartmentInfo.Type,
//         Bedrooms: apartmentInfo.Bedrooms,
//         Area: apartmentInfo.Area
//       });

//       const rect = e.target.getBoundingClientRect();
//       setPopupPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
//     }
//   }
// };

// svgOverlay.querySelectorAll('polygon').forEach(polygon => {
//   // Use both click and touchstart events
//   polygon.addEventListener('click', handlePolygonInteraction);
//   polygon.addEventListener('touchstart', handlePolygonInteraction);
// });

// Disable zoom on polygon hover
// polygon.addEventListener('mouseenter', () => {
//   viewer.setMouseNavEnabled(false);
// });

// polygon.addEventListener('mouseleave', () => {
//   viewer.setMouseNavEnabled(true);
// });
