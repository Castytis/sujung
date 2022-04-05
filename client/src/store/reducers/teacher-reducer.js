const initialState = {
  teachers: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_TEACHERS':
      return {
        ...state,
        teachers: payload,
      };
    default:
      return state;
  }
}
