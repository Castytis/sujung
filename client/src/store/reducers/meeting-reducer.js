const initialState = {
  meetings: [],
  organised: [],
  meeting: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_MEETINGS':
    case 'PARTICIPATION_MEETINGS':
      return {
        ...state,
        meetings: action.payload,
      };
    case 'ORGANISED_MEETINGS':
      return {
        ...state,
        organised: action.payload,
      };
    case 'CREATE_MEETING':
    case 'GET_MEETING_BY_ID':
    case 'ADD_PARTICIPANT':
    case 'DELETE_PARTICIPANT':
      return {
        ...state,
        meeting: action.payload,
      };
    case 'DELETE_MEETING':
      return {
        ...state,
      };
    case 'MEETINGS_ERROR':
      return {
        ...state,
      };
    default:
      return state;
  }
}
