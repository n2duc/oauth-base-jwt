import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  isShow: boolean;
}

const initialState: DialogState = {
  isShow: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isShow = true;
    },
    closeDialog: (state) => {
      state.isShow = false;
    },
    setDialog: (state, action: PayloadAction<boolean>) => {
      state.isShow = action.payload;
    }
  },
});

export const { openDialog, closeDialog, setDialog } = dialogSlice.actions;
export default dialogSlice.reducer;