const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_APP_OPENED":
      return {
        ...state,
        appOpened: action.payload,
      };
    case "ADD_EDIT_TASK":
      const existingItemIndex = state.taskDatas.findIndex(
        (item) => item.taskId === action.payload.taskId
      );

      if (existingItemIndex !== -1) {
        const newTaskDatas = [...state.taskDatas];
        newTaskDatas[existingItemIndex] = action.payload;
        return {
          ...state,
          taskDatas: newTaskDatas,
        };
      } else {
        return {
          ...state,
          taskDatas: [...state.taskDatas, action.payload],
        };
      }

    case "DELETE_TASK":
      const existingItemIndexForDelete = state.taskDatas.findIndex(
        (item) => item.taskId === action.payload.taskId
      );
      
      if (existingItemIndexForDelete !== -1) {
        const newTaskDatas = [...state.taskDatas];
        newTaskDatas.splice(existingItemIndexForDelete, 1);
        return {
          ...state,
          taskDatas: newTaskDatas,
        };
      } else {
        return {
          ...state,
          taskDatas: [...state.taskDatas],
        };
      }
      case "SET_TASKS":
        return {
          ...state,
          taskDatas: action.payload,
        };
        case "SET_LOCAL_COLLECTIONS":

        console.log("taskDatas==============================================>>",action.payload);
          return{
            ...state,
            taskDatas:action.payload
          }

    default:
      return state;
  }
};

export default Reducer;
