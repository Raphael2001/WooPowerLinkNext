import { dataReducers } from "redux/slices/data/index.ts";

const Reducers = {};

for (const reducer in dataReducers) {
  Reducers[reducer] = dataReducers[reducer];
}

export default Reducers;
