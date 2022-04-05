const initialState = {
  teachers: [],
  teacher: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_TEACHERS':
    case 'GET_TEACHER_BY_ID':
      return {
        ...state,
        teachers: action.payload,
      };
    case 'TEACHERS_ERROR':
      return {
        ...state,
      };

    default:
      return state;
  }
}
