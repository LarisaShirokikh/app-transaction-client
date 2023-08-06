import { FC, useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { IResponceTransactionLoader, ITransaction } from "../types/types"
import { Form, useLoaderData } from "react-router-dom"
import { formatDate } from "../helpers/date.helper"
import { formatToRU } from "../helpers/currency.helper"
import { instance } from "../api/axios.api"
import ReactPaginate from "react-paginate"

interface ITransactionTable {
    limit: number
}
const TransactionTable: FC<ITransactionTable> = ({ limit = 3 }) => {
    const { transactions } = useLoaderData() as IResponceTransactionLoader

    const [data, setData] = useState<ITransaction[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)

    const fatchTransactions = async (page: number) => {
        const response = await instance.get(
            `/transactions/pagination?page=${page}&limit=${limit}`
        )
        setData(response.data)
        setTotalPages(Math.ceil(transactions.length / limit))
    }

    const hendlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1)
    }

    useEffect(() => {
        fatchTransactions(currentPage)
    }, [currentPage, transactions])

    return (
        <>
            <ReactPaginate
                className="flex gap-3 justify-end mt-4 items-center"
                activeClassName="bg-blue-100 rounded-sm"
                pageLinkClassName="text-black/50 text-xs py-1 px-2 rounded-sm"
                previousClassName="text-black/50 py-1 px-2 bg-blue-300 rounded-sm text-xs"
                nextClassName="text-black/50 py-1 px-2 bg-blue-300 rounded-sm text-xs"
                disabledClassName="text-black/50 cursor-not-allowed"
                disabledLinkClassName="text-black/50 cursor-not-allowed"
                pageCount={totalPages}
                pageRangeDisplayed={1}
                marginPagesDisplayed={3}
                onPageChange={hendlePageChange}
            />
            <div className="bg-blue-300 px-4 py-3 mt-4 rounded-md">
                <table className="w-full">
                    <thead>
                        <tr>
                            <td className="font-bold">№</td>
                            <td className="font-bold">Название</td>
                            <td className="font-bold">Баланс(RU)</td>
                            <td className="font-bold">Категории</td>
                            <td className="font-bold">Дата</td>
                            <td className="text-right">Действие</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((transaction, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{transaction.title}</td>
                                <td className={transaction.type === 'income' ? 'text-green-200' : 'text-red-200'}
                                >{transaction.type === 'income'
                                    ? `+ ${formatToRU.format(transaction.amount)}`
                                    : `- ${formatToRU.format(transaction.amount)}`}
                                </td>
                                <td>{transaction.category?.title || 'Другая'}</td>
                                <td>{formatDate(transaction.createdAt)}</td>
                                <td>
                                    <Form method="delete" action="/transactions">
                                        <input type="hidden" name="id" value={transaction.id} />
                                        <button className="btn hover:btn-red ml-auto">
                                            <FaTrash />
                                        </button>
                                    </Form>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TransactionTable