import { FC, useState } from "react"
import { AuthService } from "../services/auth.service"
import { toast } from "react-toastify"
import { setTokenToLocalStorage } from "../helpers/localstorage.helper"
import { useAppDispatch } from "../store/hooks"
import { login } from "../store/user/userSlice"
import { useNavigate } from "react-router-dom"


const Auth: FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>('')
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const registrationHendler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const data = await AuthService.registration({ email, password })
      if (data) {
        toast.success('Вы успешно зарегистрировались')
        setIsLogin(!isLogin)
      }
    } catch (err: any) {
      const error = err.response?.data.message
      toast.error(error.toString())
    }
  }

  const loginHendler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const data = await AuthService.login({ email, password })
      if (data) {
        setTokenToLocalStorage('token', data.token)
        dispatch(login(data))
        toast.success('Вы вошли в систему')
        navigate('/')
      }

    } catch (err: any) {
      const error = err.response?.data.message
      toast.error(error.toString())
    }
  }


  return <div className="mt-40 flex flex-col justify-center items-center bg-blue-100 text-gray">
    <h1 className="text-center text-xl mb-10">
      {isLogin ? "Login" : "Registration"}
    </h1>

    <form
      onSubmit={isLogin ? loginHendler : registrationHendler}
      className="flex w-1/3 flex-col mx-auto gap-5">
      <input
        type="text"
        className="input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="input"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-green mx-auto">Submit</button>
    </form>

    <div className="flex justify-center mt-5">
      {
        isLogin ? (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white">
            Не зарегистрирован?
            {/* <button className="btn btn-green mx-auto">Войти</button> */}
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white">
            Зарегистрироваться
            {/* <button className="btn btn-green mx-auto">Зарегистрироваться</button> */}
          </button>
        )
      }
    </div>
  </div>

}

export default Auth