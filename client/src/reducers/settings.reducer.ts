export const settingsReducer = (state = { isDark: false }, action) => {
  switch (action.type) {
    case 'SWITCH_DARK_MODE':
      return {
        ...state,
        isDark: !state.isDark,
      };
    default:
      return {
        ...state,
      };
  }
};
