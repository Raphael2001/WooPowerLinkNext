import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { generateUniqueId } from "utils/functions";
import { generalInfo, init, item, notification, popup } from "utils/types";
let dataReducers = {};
let dataActions = {};
const Slices: Slice[] = [];

/* --------------------------------------------------------------- */

export const initSlice = createSlice({
  name: "init",
  initialState: {},
  reducers: {
    setInit: (state, action) => action.payload,
    updateInit: (state: init, action) => {
      return { ...state, ...action.payload };
    },

    addNewText: (state: init, action) => {
      const key = action.payload.key;
      const value = action.payload.value;

      const texts = { [key]: value, ...state.texts };

      state.texts = texts;
      return state;
    },
    deleteText: (state: init, action) => {
      const key = action.payload.key;
      delete state.texts[key];
      return state;
    },
    addMedia: (state: init, action) => {
      const mediaId = action.payload._id;
      state.media = { ...state.media, [mediaId]: action.payload };
      return state;
    },

    removeMedia: (state: init, action) => {
      const mediaId = action.payload;
      const media = { ...state.media };
      delete media[mediaId];
      return { ...state, media };
    },

    addGeneralInfo: (state, action) => {
      const { _id, name, value } = action.payload;
      if (!state[name]) {
        state[name] = [];
      }
      const item = { _id, value };
      state[name].push(item);

      return state;
    },
    updateGeneralInfo: (state: init, action) => {
      const { _id, name, value } = action.payload;

      const field = JSON.parse(JSON.stringify(state[name]));
      const index = field.findIndex((m: generalInfo) => m._id === _id);
      state[name][index].value = value;
      return state;
    },
    removeGeneralInfo: (state, action) => {
      const { _id, name } = action.payload;
      const field = state[name].filter((item: generalInfo) => item._id !== _id);
      state[name] = field;
      return state;
    },
    updateKey: (state, action) => {
      const { _id, name, value } = action.payload;

      const field = JSON.parse(JSON.stringify(state[name]));
      const index = field.findIndex((m: generalInfo) => m._id === _id);
      state[name][index] = value;
      return state;
    },
    addNewKey: (state, action) => {
      const { name, value } = action.payload;

      const field = [...state[name], value];

      state[name] = field;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
Slices.push(initSlice);

/* --------------------------------------------------------------- */

export const deviceSlice = createSlice({
  name: "deviceState",
  initialState: false,
  reducers: {
    setDeviceState: (state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
Slices.push(deviceSlice);

/* --------------------------------------------------------------- */

export const loaderSlice = createSlice({
  name: "loaderState",
  initialState: false,
  reducers: {
    setLoader: (state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
Slices.push(loaderSlice);

/* --------------------------------------------------------------- */

export const popupsSlice = createSlice({
  name: "popupsArray",
  initialState: [],
  reducers: {
    addPopup: (state: popup[], action: PayloadAction<popup>) => {
      state.push(action.payload);
    },
    removePopup: (state) => {
      state.pop();
    },
  },
});

// Action creators are generated for each case reducer function
Slices.push(popupsSlice);

/* --------------------------------------------------------------- */

export const notificationsSlice = createSlice({
  name: "notificationsArray",
  initialState: [],
  reducers: {
    addNotification: (
      state: notification[],
      action: PayloadAction<notification>
    ) => {
      const id: string = generateUniqueId(16);
      state.push({
        type: action.payload.type,
        payload: { ...action.payload.payload, id },
      });
    },
    removeNotification: (
      state: notification[],
      action: PayloadAction<string>
    ) => {
      state.filter((item) => item.payload.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
Slices.push(notificationsSlice);

/* --------------------------------------------------------------- */

export const requestingSlice = createSlice({
  name: "requestingState",
  initialState: false,
  reducers: {
    requestStarted: (state, action) => true,
    requestEnded: (state, action) => false,
  },
});

// Action creators are generated for each case reducer function
Slices.push(requestingSlice);

/* --------------------------------------------------------------- */

export const burgerSlice = createSlice({
  name: "burgerState",
  initialState: false,
  reducers: {
    setBurger: (state, action: PayloadAction<boolean>) => action.payload,
  },
});

// Action creators are generated for each case reducer function
Slices.push(burgerSlice);

/* --------------------------------------------------------------- */

export const cmsLoginFromSlice = createSlice({
  name: "cmsLoginForm",
  initialState: {},
  reducers: {
    updateCmsLoginForm: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});
Slices.push(cmsLoginFromSlice);
/* --------------------------------------------------------------- */

/* --------------------------------------------------------------- */

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {},
  reducers: {
    updateUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetUserData: () => {
      return false;
    },
  },
});
Slices.push(userDataSlice);

/* --------------------------------------------------------------- */

export const tokensSlice = createSlice({
  name: "tokens",
  initialState: {},
  reducers: {
    setAccessToken: (state, action) => {
      return { ...state, accessToken: action.payload };
    },
    setRefreshToken: (state, action) => {
      return { ...state, refreshToken: action.payload };
    },
    resetTokens: (state, action) => ({}),
  },
});
Slices.push(tokensSlice);

/* --------------------------------------------------------------- */

export const itemsFormSlice = createSlice({
  name: "itemsForm",
  initialState: {},
  reducers: {
    setItemsForm: (state, action) => action.payload,
    setItemQuantity: (
      state: { [key: string]: item },
      action: PayloadAction<item>
    ) => {
      const { wooId, quantity } = action.payload;

      const prevIds = state?.[wooId]?.powerLinkIds;
      return {
        ...state,
        [wooId]: {
          powerLinkIds: prevIds || [],
          wooId,
          quantity: Number(quantity),
        },
      };
    },
    setItemIds: (state: item[], action: PayloadAction<item>) => {
      const { wooId, powerLinkIds } = action.payload;

      const prevQuantity = state[wooId]?.quantity;

      return {
        ...state,
        [wooId]: {
          powerLinkIds,
          wooId,
          quantity: prevQuantity || 1,
        },
      };
    },
  },
});
Slices.push(itemsFormSlice);

// build export objects
for (const Slice of Slices) {
  dataActions = { ...dataActions, ...Slice.actions };
  const reducer = { [Slice.name]: Slice.reducer };
  dataReducers = { ...dataReducers, ...reducer };
}

export { dataActions };
export { dataReducers };
