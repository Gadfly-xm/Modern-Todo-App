import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      text: "学习 React 和 TypeScript",
      completed: true,
      createdAt: new Date(),
    },
    {
      id: "2",
      text: "完成项目开发",
      completed: false,
      createdAt: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue,
        completed: false,
        createdAt: new Date(),
      };
      setTodos([newTodo, ...todos]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                我的任务
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                保持专注，完成目标
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {completedCount}/{totalCount}
              </div>
              <p className="text-xs text-gray-600">已完成</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto px-4 py-8">
        {/* Input Section */}
        <Card className="p-6 mb-8 border-0 shadow-lg bg-white">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="添加新任务..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              className="flex-1 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-400 focus:ring-blue-100"
            />
            <Button
              onClick={addTodo}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 gap-2"
            >
              <Plus size={20} />
              添加
            </Button>
          </div>
        </Card>

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">进度</span>
              <span className="text-sm text-gray-600">
                {Math.round((completedCount / totalCount) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Todos List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <Card className="p-12 text-center border-0 shadow-sm bg-white/50">
              <div className="text-gray-400 mb-2">📝</div>
              <p className="text-gray-600 font-medium">暂无任务</p>
              <p className="text-sm text-gray-500 mt-1">
                添加一个新任务开始吧！
              </p>
            </Card>
          ) : (
            todos.map((todo) => (
              <Card
                key={todo.id}
                className={`p-4 border-0 shadow-md transition-all duration-300 hover:shadow-lg ${
                  todo.completed
                    ? "bg-gray-50/50 border-l-4 border-green-400"
                    : "bg-white border-l-4 border-blue-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {todo.completed ? (
                      <CheckCircle2 size={24} className="text-green-500" />
                    ) : (
                      <Circle size={24} />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-base font-medium break-words ${
                        todo.completed
                          ? "text-gray-500 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.text}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {todo.createdAt.toLocaleDateString("zh-CN")}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {totalCount > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 border-0 shadow-sm bg-blue-50">
                <div className="text-2xl font-bold text-blue-600">
                  {totalCount}
                </div>
                <p className="text-xs text-gray-600 mt-1">总任务数</p>
              </Card>
              <Card className="p-4 border-0 shadow-sm bg-green-50">
                <div className="text-2xl font-bold text-green-600">
                  {completedCount}
                </div>
                <p className="text-xs text-gray-600 mt-1">已完成</p>
              </Card>
              <Card className="p-4 border-0 shadow-sm bg-orange-50">
                <div className="text-2xl font-bold text-orange-600">
                  {totalCount - completedCount}
                </div>
                <p className="text-xs text-gray-600 mt-1">待完成</p>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
