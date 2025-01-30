import { useState } from "react"
import { Link } from "react-router-dom"
import SignupImg from './../../images/ai.png'
const Signup = () => {
    interface User {
        name:string,
        email:string,
        password:string
    }
    const [user, setUser] = useState<User>({
        name:'',
        email:'',
        password:''
    })

  return (
    <div className=" flex justify-evenly items-center h-[100vh]">
        <div className="signup-vector">
           <h1 className=" text-4xl font-bold">Create Account Now</h1>
        </div>
        <div className="singup-box">
            <form action="" className=" space-y-6">
            <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
  <input type="input" required placeholder="Username"  />
</label> <br />
<label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
  <input type="email" placeholder="mail@site.com" required/>
</label> <br />
<label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
  <input type="password" required placeholder="Password" />
</label> <br />
<button className="btn btn-primary w-[20rem]">Signup</button>
<p>Already have an Account <Link to={'/login'} className=" underline" >Login Now</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Signup