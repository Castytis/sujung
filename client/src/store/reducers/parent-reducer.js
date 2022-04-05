const initialState = {
  parents: [],
  parent: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'GET_CURRENT_PARENT':
      return {
        ...state,
        teacher: action.payload,
      };
    case 'PARENT_ERROR':
      return {
        ...state,
      };
  }
}
