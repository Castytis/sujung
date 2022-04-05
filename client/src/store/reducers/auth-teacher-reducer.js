const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  teacher: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };
    case 'TEACHER_LOADED':
      return {
        ...state,
        isAuth: true,
        teacher: action.payload,
      };
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'LOGOUT_TEACHER':
    case 'AUTH_TEACHER_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
      };
    default:
      return state;
  }
}
