import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  tenantId: 0,
  firstName: "",
  lastName: "",
  userId: "",
  title: "Home",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserName: (state, action) => {
      state.value = action.payload;
    },
    addTenantId: (state, action) => {
      state.value = action.payload;
    },
    addFirstName: (state, action) => {
      state.value = action.payload;
    },
    addLastName: (state, action) => {
      state.value = action.payload;
    },
    addUserId: (state, action) => {
      state.value = action.payload;
    },
    addTitle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {
  addTitle,
  addUserId,
  addUserName,
  addFirstName,
  addLastName,
  addTenantId,
} = userSlice.actions;

export default userSlice.reducer;
