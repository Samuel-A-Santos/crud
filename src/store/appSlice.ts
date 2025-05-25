import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  currentStep: number;
  isStepCompleted: boolean;
  completedSteps: Set<number> | number[];
}

const initialState: AppState = {
  currentStep: 1,
  isStepCompleted: false,
  completedSteps: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      if (Array.isArray(state.completedSteps)) {
        state.isStepCompleted = state.completedSteps.includes(action.payload);
      } else {
        state.isStepCompleted = state.completedSteps.has(action.payload);
      }
    },

    setStepCompleted: (state, action: PayloadAction<boolean>) => {
      state.isStepCompleted = action.payload;

      if (action.payload) {
        if (Array.isArray(state.completedSteps)) {
          if (!state.completedSteps.includes(state.currentStep)) {
            state.completedSteps.push(state.currentStep);
          }
        } else {
          state.completedSteps.add(state.currentStep);
        }
      } else {
        if (Array.isArray(state.completedSteps)) {
          state.completedSteps = state.completedSteps.filter(
            step => step !== state.currentStep
          );
        } else {
          state.completedSteps.delete(state.currentStep);
        }
      }
    },

    nextStep: state => {
      if (state.currentStep < 9) {
        state.currentStep += 1;

        if (Array.isArray(state.completedSteps)) {
          state.isStepCompleted = state.completedSteps.includes(
            state.currentStep
          );
        } else if (state.completedSteps) {
          state.isStepCompleted = state.completedSteps.has(state.currentStep);
        }
      }
    },

    previousStep: state => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;

        if (Array.isArray(state.completedSteps)) {
          state.isStepCompleted = state.completedSteps.includes(
            state.currentStep
          );
        } else {
          state.isStepCompleted = state.completedSteps.has(state.currentStep);
        }
      }
    },
  },
});

export const { setCurrentStep, setStepCompleted, nextStep, previousStep } =
  appSlice.actions;

export default appSlice.reducer;
