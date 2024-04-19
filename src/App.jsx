import { useState,useEffect } from 'react'
import './App.css'
import Navbar from  "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo,settodo] = useState("");
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  const saveToLS=(params)=>{
    // setitem is to save key value pair in local storage
    // stringify is to convert the data from string to json format 
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem( "todos")) 
      settodos(todos)
    }
  }, [])

  const toggleFinished=(e)=>{
    setshowFinished(!showFinished);
  }
  

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    settodo(t[0].todo)

    let newTodos=todos.filter(item=>{
      return item.id!=id;
    });
    settodos(newTodos);
    saveToLS()
  }
  
  const handleDelete=(e,id)=>{
    // confirm will return true or false accordingly to the given condition
    if(confirm( "Are you sure to delete this todo?")){
    // filter returns an array according to the condition given inside function
    let newTodos=todos.filter(item=>{
      return item.id!=id;
    });
    settodos(newTodos)
    saveToLS()
    }
  }

  const handleAdd=()=>{
    settodos([...todos,{id:uuidv4(),todo,isCompleted:false}]) 
    // todo:todo = todo
    settodo("")
    saveToLS()
  }

  const handleChange=(e)=>{
    settodo(e.target.value);
  }

  const handleCheckbox=(e)=>{
    let id=e.target.name;
    // findIndex returns the index of the condition int the function
    let index=todos.findIndex((item)=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLS()
  }
 
  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-6 bg-slate-100 ">
         {/* Upper Container */}
        <div className="todo p-2 rounded-xl bg-violet-500 ">
         <h1 className=" text-3xl font-bold text-center text-white ">TODO List </h1>
         <div className='addTodo flex flex-col items-center bg-violet-50 rounded-xl m-3 px-4 pt-4 pb-3 '>
          <h2 className="text-xl font-bold mx-auto text-center mb-7  ">Add a Todo</h2>
          <div className="relative h-11 w-full min-w-[200px]">
          <input onChange={handleChange} value={todo} type='text' placeholder="Your Task"
           className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
          <label
           className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
           What would you like to do...
          </label>
          </div>
          {/* disabled is used to not create todo when empty or has less than 3 string */}
          <button onClick={handleAdd} disabled={todo.length<=5} className=' bg-violet-500 hover:bg-violet-700 disabled:bg-violet-700 mt-3 p-1 px-3 rounded-lg font-bold '>Add</button>
         </div>
        </div>
        <input onClick={toggleFinished} type="checkbox" checked={showFinished} className='mt-5 mr-2'/>Show Finished

         {/* Lower Container */}
        <div className="todolist mt-6  bg-violet-50 rounded-xl p-3 border border-zinc-500 ">
          <h1 className='font-bold p-2'>Your Todos</h1>
          <div className="todos p-2 pl-4  ">
            {todos.length===0 && <div>No todos at display</div>}
            {todos.map(item=>{


             return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between mb-3 w-auto ">
              <div className="flex gap-6 items-center " >
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" className='mt-1' />
            <div className={item.isCompleted?"line-through":""} >{item.todo}</div>
            </div>
            <div className="buttons flex h-full ">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className=' bg-violet-500 hover:bg-violet-700 mr-1 p-1 px-3 rounded-lg font-bold'>Edit</button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className=' bg-violet-500 hover:bg-violet-700 ml-1 p-1 px-3 rounded-lg font-bold'>Delete</button>
            </div>
            </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
