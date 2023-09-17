import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../../models/user";
import { UserState } from "../../../models/userState";

const initialState: UserState = {
  loading: false,
  users: [],
  error: undefined,
}
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  () => {
    const res = fetch('https://jsonplaceholder.typicode.com/users').then(data => data.json());
    return res;
  }
)
const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<Array<User>>) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
  reducers: {}
})
export const userFetchSelector = (state: RootState) => state.userFetchReducer;
export default userSlice.reducer;