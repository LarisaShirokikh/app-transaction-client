import { FC } from "react"
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const COLORS = ['#00C49F', '#FF8042'];

interface IChart {
    totalIncome: number;
    totalExpense: number;
}

interface IData {
    value: number
    name: string
}

const Chart: FC<IChart> = ({ totalExpense, totalIncome }) => {
    const data = new Array<IData>({
        value: totalExpense, name: 'расход'
    }, {
        value: totalIncome, name: 'доход'
    })
    return (
        <PieChart width={240} height={240}>
            <Pie
                data={data}
                cx={'58%'}
                cy={'58%'}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
                <Legend />
                <Tooltip />
        </PieChart>
    )
}

export default Chart