import { userService } from "../services/user.service"
import { SvgIcon } from "./SvgIcon"

export function Signup() {
     
     function handleSubmit(ev) {
          ev.preventDefault()
          const { username, password } = ev.target
          userService.signup(username.value, password.value)
     }

  return (
    <div className="signup">
          <form onSubmit={handleSubmit}>
               <SvgIcon iconName="lock" />
               <label htmlFor="username">Username</label>
               <input id="username" name="username" type="text" placeholder="Username" />
               <label htmlFor="password">Password</label>
               <input id="password" name="password" type="password" placeholder="Password" />
               <button>Signup</button>
          </form>
    </div>
  )
}
