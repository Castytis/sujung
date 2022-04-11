const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  parent: null,
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER_PARENT_SUCCESS':
    case 'LOGIN_PARENT_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
      };
    case 'PARENT_LOADED':
      return {
        ...state,
        isAuth: true,
        parent: action.payload,
        loading: false,
      };
    case 'REGISTER_PARENT_FAIL':
    case 'LOGIN_PARENT_FAIL':
    case 'LOGOUT_PARENT':
    case 'AUTH_PARENT_ERROR':
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
