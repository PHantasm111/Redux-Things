// 引入 Redux Toolkit 的 configureStore，用于创建 Redux store。
// configureStore 是 Redux Toolkit 提供的简化工具，集成了中间件、reducers 等配置。
import { configureStore } from "@reduxjs/toolkit";
// 引入习惯的 reducer，它是由 habit-slice.tsx 文件导出的。
import habitsReducer from "./habit-slice";

// 使用 configureStore 创建 Redux store。
// reducer 是一个对象，每个键值对代表 store 中的一部分状态。
// habits: habitsReducer 表示状态中的 habits 部分由 habitsReducer 管理。
const store = configureStore({
    reducer: {
        habits: habitsReducer,
    },
});

// 定义 RootState 类型，它是 store.getState 的返回值类型。
// 这使得我们可以从 TypeScript 中获得 state 的类型提示。
export type RootState = ReturnType<typeof store.getState>;

// 定义 AppDispatch 类型，它是 store.dispatch 的类型。
// 这样可以在组件中使用类型安全的 dispatch。
export type AppDispatch = typeof store.dispatch;

// 导出 store，供应用程序使用。
export default store;
