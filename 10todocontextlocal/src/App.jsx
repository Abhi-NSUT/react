import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"
import { TodoProvider } from "./contexts"
import { useEffect, useState } from "react"
function App() {
  const[todos,setTodos]=useState([])
  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  }
  const updatedTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((todoprev)=>(todoprev.id===id?todo:todoprev)))
  }
  const deletedTodo=(id)=>{
    setTodos((prev)=>prev.filter((todoprev)=>(todoprev.id!==id)))
  }
  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((todoprev)=>(todoprev.id===id?{...todoprev,completed:!todoprev.completed}:todoprev)))
  }
  //local storage part
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))
    if(todos&&todos.length>0){
      setTodos(todos)
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <TodoProvider value={{todos,addTodo,updatedTodo,deletedTodo,toggleComplete}}>
  <div className="bg-[#172842] min-h-screen py-8">
            <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                <div className="mb-4">
                    {/* Todo form goes here */} 
                    {<TodoForm/>}
                </div>
                <div className="flex flex-wrap gap-y-3">
                    {/*Loop and Add TodoItem here */}
                    {/*pass key value bina key ke bhi ho jaayega but performance degrades we can also use index but if i delete something array will restructure itself causing problems */}
                    {todos.map((todo)=>(
                      <div key={todo.id} className="w-full"
                      ><TodoItem todo={todo}/></div>
                    ))}
                </div>
            </div>
        </div>
    </TodoProvider>
  )
}

export default App
