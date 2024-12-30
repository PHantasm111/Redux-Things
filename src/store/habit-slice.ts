// 引入 Redux Toolkit 的 createSlice，用于创建 Redux 的切片。
// createSlice 是 Redux Toolkit 提供的一个简化工具，它结合了 action 和 reducer 的逻辑。
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定义一个 Habit 接口，表示一个习惯的结构。
// 这里定义了一个习惯的属性，包括 id、名称、频率、完成的日期以及创建时间。
// 这样可以在 TypeScript 中获得类型检查的好处。
export interface Habit {
    id: string; // 每个习惯的唯一标识符。
    name: string; // 习惯的名称。
    frequency: "daily" | "weekly"; // 习惯的频率：每天或每周。
    completedDates: string[]; // 一个数组，存储完成习惯的日期（ISO 字符串格式）。
    createAt: string; // 习惯创建的时间戳。
}

// 定义 HabitState 接口，表示存储中习惯的状态结构。
// 主要用于描述整个 Redux store 的某部分状态。
interface HabitState {
    habits: Habit[]; // 一个包含多个 Habit 的数组。
}

// 定义初始状态，遵循 HabitState 的结构。
// 这里 habits 被初始化为空数组，表示刚开始时没有任何习惯。
const initialState: HabitState = {
    habits: [],
};

// 使用 createSlice 创建一个切片（slice）。
// createSlice 将 reducer 和 action 集成到了一起，使代码更加简洁。
const habitSlice = createSlice({
    // 定义这个切片的名称。Redux 的 state 会使用这个名称作为键名。
    name: 'habits',
    // 指定初始状态。
    initialState,
    // 定义 reducers，即对状态进行操作的方法。
    reducers: {
        // 定义一个 addHabit reducer 方法，用于添加新的习惯。
        addHabit: (
            state,
            action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
        ) => {
            // 在这里实现添加习惯的逻辑。
            const newHabit: Habit = {
                id: Date.now().toString(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completedDates: [],
                createAt: new Date().toISOString(),
            }

            // 将新的习惯添加到 state 中。
            state.habits.push(newHabit);
        },
        toggleHabit: (
            state,
            action: PayloadAction<{ id: string; date: string }>
        ) => {
            const habit = state.habits.find((h) => h.id === action.payload.id);

            if (habit) {
                const index = habit.completedDates.indexOf(action.payload.date);
                if (index > -1) {
                    habit.completedDates.splice(index, 1);
                } else {
                    habit.completedDates.push(action.payload.date);
                }
            }
        },
        removeHabit: () => {},
    }
});

// 导出 addHabit action，这样可以在组件中触发此 action。
// habitSlice.actions 会自动生成对应的 action 创建函数。
export const { addHabit, toggleHabit } = habitSlice.actions;

// 导出这个切片的 reducer，用于在 Redux store 中注册。
export default habitSlice.reducer;
