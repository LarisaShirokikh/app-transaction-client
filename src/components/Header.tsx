import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BiArrowFromLeft, BiBuildings } from "react-icons/bi";
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper';
import { toast } from 'react-toastify';

const Header: FC = () => {

    const login = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHendler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('Вы вышли из системы')
        navigate('/')
    }
    return (

        <header className='flex items-center p-4 shadow-sm bg-blue-300 backdrop-blur-sm'>
            <Link to={'/'}>
                <BiBuildings size={40} />
            </Link>
            {/* Menu */}
            {login && (
                <nav className='ml-auto mr-10'>
                    <ul className="flex items-center gap-5 ">
                        <li>
                            <NavLink
                                to={'/'}
                                className={({ isActive }) => isActive ? 'text-black/25' : 'text-black/50'}>Главная</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/categories'}
                                className={({ isActive }) => isActive ? 'text-black/25' : 'text-black/50'}>Категории</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/transactions'}
                                className={({ isActive }) => isActive ? 'text-black/30' : 'text-black/50'}>Трансакции</NavLink>
                        </li>
                    </ul>
                </nav>
            )
            }
            {/* Actions */}
            {login ? (
                <button className='btn btn-red' onClick={logoutHendler}>
                    <span>Выйти</span>
                    <BiArrowFromLeft />
                </button>
            ) : (
                <Link className='py-2 text-black/30 hover:text-black ml-auto'
                    to={'auth'}
                >
                    Войти / Регистрация
                </Link>
            )}
        </header>
    )
}

export default Header