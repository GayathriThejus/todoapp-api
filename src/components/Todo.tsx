import todoimg from "../assets/todobg.jpg"
import Tasks from "./Tasks"
import "./Todo.css"
const todo = () => {
  return (
    <div className="w-full  ">
      <button className="absolute top-2 left-2 z-30 text-sm text-white px-3 py-1 rounded " onClick={()=>{}}>Logout</button>
        <div className="h-[10%] ">
            <img src={todoimg} className="image"/>
              <div className="background">
                <p className=" flex justify-center text-[40px] text-center  mt-[70px] text-white z-30">T O D O</p>
                <Tasks />
                
              </div> 
             
        </div>
    </div>
  )
}

export default todo