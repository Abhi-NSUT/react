import { useCallback, useState ,useEffect,useRef} from 'react'

function App() {
  const[length,setLength]=useState(8);
  const[numberallowed,setnumberallowed]=useState(false);
  const[charallowed,setcharallowed]=useState(false);
  const[password,setpassword]=useState("");
  const passwordref=useRef(null)
  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberallowed) str+="0123456789";
    if(charallowed) str+="!@#$%^&*()";
    for(let i=1;i<=length;i++){
      let element=Math.floor(Math.random()*str.length)
      pass+=str.charAt(element);
    }
    setpassword(pass)
  },[length,numberallowed,charallowed,setpassword])
  useEffect(()=>{
    passwordGenerator()
  },[length,numberallowed,charallowed,passwordGenerator])


  const copypasswordtoclipboard=useCallback(()=>{
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>PassGenerator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3 bg-white text-black'
          placeholder='password'
          readOnly   
          ref={passwordref}
          />
        <button  onClick={copypasswordtoclipboard} className='bg-blue-800 text-white'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items=center gap-x-1'>
          <input type="range"
          min={6}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
           />
           <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
            defaultChecked={numberallowed}
            id="numberInput"
            onChange={()=>{
              setnumberallowed((prev)=>!prev)
            }}
          />   
{ /*this html for is used to mark like this label number belongs to element with id number input 
u can toggle checkbox by clicking on number text */  }   
          <label htmlFor='numberInput'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={charallowed}
          id="characterInput"
          onChange={()=>{
            setcharallowed((prev)=>!prev)
          }} />
          <label htmlFor='characterInput'>Character</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
