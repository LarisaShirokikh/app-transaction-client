import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponceTransactionLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
    const { categories } = useLoaderData() as IResponceTransactionLoader
    const [visibleModal, setVisibleModal] = useState(false)

    return <div className='rounded-md bg-blue-100 p-4'>
        <Form className='grid gap-2'
            method='post'
            action='/transactions'
        >
            <label className="grid" htmlFor="title">
                <span>Название</span>
                <input className='input border-slate-400' type="text" placeholder='Заголовок...' name="title" required />
            </label>
            <label className="grid" htmlFor="amount">
                <span>Сумма</span>
                <input className='input border-slate-400' type="number" placeholder='Количество' name="amount" required />
            </label>

            {categories.length ? (
                <label htmlFor="category" className='grid'>
                    <span>Категория</span>
                    <select className="input border-slate-400" name="category" required>
                        {categories.map((ctg, idx) => (
                            <option key={idx} value={ctg.id}>{ctg.title}</option>
                        ))}
                    </select>
                </label>
            ) : (
                <h1 className='mt-1 text-red-300'>Вначале выберите категорию</h1>
            )}

            <button
                onClick={() => setVisibleModal(true)}
                className="max-w-fit flex items-center gap-2 text-blue/50 hover:text-white">
                <FaPlus />
                <span>Управление категориями</span>
            </button>
            <div className="flex gap-4 items-center">
                <label className='cursor-pointer flex items-center gap-2'>
                    <input type="radio" name='type' value={'income'} className='form-radio text-blue-300' />
                    <span>Доход</span>
                </label>
                <label className='cursor-pointer flex items-center gap-2'>
                    <input type="radio" name='type' value={'expense'} className='form-radio text-blue-300' />
                    <span>Расход</span>
                </label>
            </div>

            {/* Submit button */}
            <button className='btn btn-green max-w-fit mt-2'>Создать</button>
        </Form>

        {/* add transaction modal */}
        {visibleModal &&
            (<CategoryModal type='post' setVisibleModal={setVisibleModal} />)}
    </div>
}

export default TransactionForm