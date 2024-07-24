import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  site: [
    {id: "1", floorName: 'basement1', floorNum: '1', apartmentsCount: '2', apartmentLayoutImg: '/Webpage/floors/basement1.png', },
    {id: "2", floorName: 'basement3', floorNum: '2', apartmentsCount: '2', apartmentLayoutImg: '/Webpage/floors/basement1.png', },
    {id: "3", floorName: 'basement4', floorNum: '3', apartmentsCount: '2', apartmentLayoutImg: '/Webpage/floors/basement1.png', },
    {id: "4", floorName: 'basement5', floorNum: '4', apartmentsCount: '2', apartmentLayoutImg: '/Webpage/floors/basement1.png', },
    {id: "5", floorName: 'basement6', floorNum: '5', apartmentsCount: '2', apartmentLayoutImg: '/Webpage/floors/basement1.png', },
    {id: "6", floorName: 'groundFloor', floorNum: '6', apartmentsCount: '2', apartmentLayoutImg: '/Webpage/floors/basement1.png', },
    {id: "7", floorName: 'firstFloor', floorNum: '7', apartmentsCount: '2', apartmentLayoutImg: '/Webpage/floors/basement1.png', },
    {id: "8", floorName: 'secondFloor', floorNum: '8', apartmentsCount: '2', apartmentLayoutImg: '/Webpage/floors/basement1.png', },

  ],
};

const cardBoardSlice = createSlice({
  name: 'boxState',
  initialState,
  reducers: {
    addSite: (state, action) => {
      state.site.push(action.payload);
    },
    removeSite: (state, action) => {
      const { id } = action.payload;
      // console.log("Removing site with id:", id);
      // console.log("Current state:", JSON.stringify(state.site));
      // console.log("Type of id in state:", typeof state.site[0].id);
      // console.log("Type of id in action:", typeof id);
      const siteIndex = state.site.findIndex(site => site.id === id);
      if (siteIndex !== -1) {
        state.site.splice(siteIndex, 1);
        // console.log("Site removed successfully");
      } else {
        console.log("Site not found");
      }
      // console.log("New state:", JSON.stringify(state.site));
    },

    modifyMediaURL: (state, action) => {
      const { newID, mediaURL } = action.payload;
      const site = state.site.find(site => site.id === newID);
      if (site) {
        site.mediaURL = mediaURL;
      }
    },


  }
});

export const { addSite, removeSite, modifyMediaURL, modifyBoxLayout } = cardBoardSlice.actions;
export default cardBoardSlice.reducer;