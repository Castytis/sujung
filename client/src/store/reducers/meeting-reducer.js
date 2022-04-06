const initialState = {
  meetings: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_MEETINGS':
      return {
        ...state,
        meetings: action.payload,
      };
    case 'MEETINGS_ERROR':
      return {
        ...state,
      };
    default:
      return state;
  }
}
