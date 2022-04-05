const initialState = {
  teachers: [],
  teacher: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_TEACHERS':
      return {
        ...state,
        teachers: action.payload,
      };
    case 'GET_TEACHER_BY_ID':
    case 'GET_CURRENT_TEACHER':
      return {
        ...state,
        teacher: action.payload,
      };
    case 'TEACHERS_ERROR':
      return {
        ...state,
      };

    default:
      return state;
  }
}
