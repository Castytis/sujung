const initialState = {
  meetings: [],
  meeting: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_MEETINGS':
      return {
        ...state,
        meetings: action.payload,
      };
    case 'GET_MEETING_BY_ID':
      return {
        ...state,
        meeting: action.payload,
      };
    case 'ADD_PARTICIPANT':
      return {
        ...state,
        meeting: action.payload,
      };
    case 'MEETINGS_ERROR':
      return {
        ...state,
      };
    default:
      return state;
  }
}
