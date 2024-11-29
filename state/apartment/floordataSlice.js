// state/floorData/floorDataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // Adjust the path as needed

// Async Thunks
export const fetchFloorData = createAsyncThunk('floorData/fetchFloorData', async () => {
  const floors = {};
  const floorsCollection = collection(db, 'floors');
  const floorsSnapshot = await getDocs(floorsCollection);
  for (const floorDoc of floorsSnapshot.docs) {
    const apartmentsSnapshot = await getDocs(collection(db, 'floors', floorDoc.id, 'apartments'));
    floors[floorDoc.id] = apartmentsSnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
  }
  return floors;
});

export const addNewApartment = createAsyncThunk('floorData/addNewApartment', async ({ floorName, apartment }) => {
  const apartmentsCollection = collection(db, 'floors', floorName, 'apartments');
  const docRef = await addDoc(apartmentsCollection, apartment);
  return { floorName, apartment: { ...apartment, id: docRef.id } };
});

export const editApartment = createAsyncThunk('floorData/editApartment', async ({ floorName, apartment }) => {
  const apartmentDoc = doc(db, 'floors', floorName, 'apartments', apartment.id);
  await updateDoc(apartmentDoc, apartment);
  return { floorName, apartment };
});

export const removeApartment = createAsyncThunk('floorData/removeApartment', async ({ floorName, apartmentId }) => {
  const apartmentDoc = doc(db, 'floors', floorName, 'apartments', apartmentId);
  await deleteDoc(apartmentDoc);
  return { floorName, apartmentId };
});

const floorDataSlice = createSlice({
  name: 'floorData',
  initialState: {
    floors: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFloorData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFloorData.fulfilled, (state, action) => {
        state.loading = false;
        state.floors = action.payload;
      })
      .addCase(fetchFloorData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewApartment.fulfilled, (state, action) => {
        const { floorName, apartment } = action.payload;
        if (!state.floors[floorName]) {
          state.floors[floorName] = [];
        }
        state.floors[floorName].push(apartment);
      })
      .addCase(editApartment.fulfilled, (state, action) => {
        const { floorName, apartment } = action.payload;
        const index = state.floors[floorName].findIndex((apt) => apt.id === apartment.id);
        if (index !== -1) {
          state.floors[floorName][index] = apartment;
        }
      })
      .addCase(removeApartment.fulfilled, (state, action) => {
        const { floorName, apartmentId } = action.payload;
        state.floors[floorName] = state.floors[floorName].filter((apt) => apt.id !== apartmentId);
      });
  },
});

export default floorDataSlice.reducer;
