import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;
}

const initialState: ProfileState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  birthDate: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<ProfileState>) => {
      return action.payload;
    },
  },
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
