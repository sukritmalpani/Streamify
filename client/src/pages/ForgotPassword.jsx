import axios from 'axios'
import React, { useRef, useState } from 'react'

const ForgotPassword = () => {
  const [val,setVal] = useState(false)
  const [store,setStore] = useState('')
  const email = useRef(null)
  const otp = useRef(null)
  const newPass = useRef(null)
  const handleSubmit = async (e)=>{
    e.preventDefault()
    setVal(true)
    alert("otp sent to the email")
    const resp = await axios.post("http://localhost:5000/otp",{
      email:email.current.value
    })
    setStore(resp.data)
    console.log(resp)
  }

  const handleOtp = async ()=>{
    if(store===otp.current.value){
      const resp = await axios.put("http://localhost:5000/chPass",{
        email:email.current.value,
        newPass:newPass.current.value
      })
      console.log(resp)
      alert("changed password")
    }
    else{
      alert("wrong otp")
    }
  }

  return (
    <div>
      <form action="" onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="email">Enter Your Email</label>
        <div>
        <input 
        type="text" 
        id='email' 
        className='email' 
        style={{border:"2px solid black"}}
        ref={email}
        />
        </div>
      </form>
        {val && (
          <>
          <h1>Now Enter Your otp and new password</h1>
          <input 
          type="text" 
          className='otp' 
          style={{border:"2px solid black"}} 
          ref={otp}
          />
          <div>
          <input 
          type="text" 
          className='newPass' 
          style={{border:"2px solid black"}} 
          ref={newPass}
          />
          </div>
          <button 
          style={{backgroundColor:"lightgray",padding:"3px 5px"}} 
          onClick={handleOtp}> Submit</button>
          </>
        )}
    </div>
  )
}

export default ForgotPassword
