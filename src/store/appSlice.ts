// src/store/appSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '../types/app';



const initialState: AppState = {
  currentStep: 1,
  isStepCompleted: false
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setStepCompleted: (state, action: PayloadAction<boolean>) => {
      state.isStepCompleted = action.payload;
    },
    nextStep: (state) => {
      if (state.isStepCompleted && state.currentStep < 9) {
        state.currentStep += 1;
        state.isStepCompleted = false;
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    }
  }
});

export const { setCurrentStep, setStepCompleted, nextStep, previousStep } = appSlice.actions;

export default appSlice.reducer;