import  { FC } from 'react'
import { useAuth } from '../hooks/useAuth'
import img from '../assets/img.png'

interface Props {
    children: JSX.Element
}


export const ProtectedRoute: FC<Props> = ({ children }) => {
    const isAuth = useAuth()
  return <>
  {isAuth ? children : <div className='flex flex-col justify-center items-center mt-20 gap-10'>
    <h1 className='text-2xl'>Для просмотра этой страницы вы должны войти в систему</h1>
    <img className="w-1/3" src={img} alt="img" />
    </div>}
  </>
}
