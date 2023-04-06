import {v4} from "uuid";
import {FaEdit} from "react-icons/fa";
import {BsTrashFill} from "react-icons/bs";
import React, { useContext } from "react";
import moment from "moment";
import { MainCtx } from "../../contexts/MainContext";

export const TBodyCell = ({data, showDetails, th_data, action1, action2}) => {
    return (
        <tbody>
        {data.map((tb_d) => {

            return (
                <tr className='dark:hover:bg-green-500 hover:bg-slate-300' key={v4()}>
                    {th_data?.map(th => {
                        return !th.func() ? (
                            <td onClick={() => showDetails(tb_d._id)} className={"td"} key={v4()}>
                                {
                                    th.key === "createdAt" || th.key === "updatedAt"
                                    ? `${moment(tb_d[th.key]).format("DD-MM-YYYY")}`
                                    : tb_d[th.key] === "reliability"
                                    ? "ishonchlilik"
                                    : tb_d[th.key] === "disposable"
                                    ? "bir martalik"
                                    : tb_d[th.key] === "average"
                                    ? "o'rta me'yordagi"
                                    : tb_d[th.key]
                                }
                                 {tb_d[th.key] === 'accepted' ? `${tb_d[th.key] = 'qabul qilingan'}`: ''}
                                 { tb_d[th.key] === 'company' ? `${tb_d[th.key] = 'Korxona'}`: ''}

                            </td>
                        ) : (
                            <td className={"td"} key={v4()}>
                                <button onClick={() => {action2(tb_d._id, tb_d)}} className="bg-indigo-600 p-2 rounded  mr-3 text-slate-300 text-xl">
                                    <FaEdit/>
                                </button>
                                {action1 && (
                                    <button onClick={() => action1(tb_d._id)}
                                            className="bg-red-600 p-2 text-slate-300 rounded text-xl">
                                        <BsTrashFill/>
                                    </button>)}
                            </td>
                        )
                    })}
                </tr>
            )
        })}
        </tbody>
    );
}