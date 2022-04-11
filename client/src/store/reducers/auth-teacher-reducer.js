const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  teacher: null,
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER_TEACHER_SUCCESS':
    case 'LOGIN_TEACHER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
      };
    case 'TEACHER_LOADED':
      return {
        ...state,
        isAuth: true,
        teacher: action.payload,
        loading: false,
      };
    case 'REGISTER_TEACHER_FAIL':
    case 'LOGIN_TEACHER_FAIL':
    case 'LOGOUT_TEACHER':
    case 'AUTH_TEACHER_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    default:
      return state;
  }
}
