import React, { useEffect, useContext,useState } from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import apiService from "../../api";
import { MainCtx } from "../../contexts/MainContext";
import moment from "moment";
function OrderDetails() {
  const { id } = useParams();
  const { details, setDetails } = useContext(MainCtx);
  const [marketClient, setMarketClient] = useState({})
  const [productsList, setProductsList] =useState([])
  useEffect(() => {
    apiService("get", `market/${id}`).then((res) => {
      let marketRes = res.data.market
      setDetails(marketRes);
      setProductsList(details.products)
      console.log(details)
    });
    apiService("get", `client/${details.client_id}`).then((res) => {
      let clientRes = res.data.client
      setMarketClient(clientRes);
      console.log(marketClient)

    });
  }, [id]);

  return (
    <div className="h-screen">
      <div className={"max-w-7xl mx-auto px-4  sm:pt-10 sm:px-6 lg:px-8"}>
        <div className="flex flex-wrap justify-center items-center  md:justify-between mb-5 ">
        <div className="Cards">
            <div className="CardsBody ">
              <p className="CardsTitle">Garov puli:</p>
              <span className="text-violet-600 dark:text-gray-300">{details.bail_payment}</span>
            </div>
            <div className="CardsBody">
              <p className="CardsTitle">Umumiy summa:</p>
              <span className="text-violet-600 dark:text-gray-300">{details.total_sum}</span>
            </div>
            <div className="CardsBody">
              <p className="CardsTitle">Qolgan summa:</p>
              <span className="text-violet-600 dark:text-gray-300">{details.remaining_money}</span>
            </div>
            <div className="CardsBody">
              <p className="CardsTitle">Tomonidan:</p>
              <span className="text-violet-600 dark:text-gray-300">{
              details.creator_type === "company" ? "Korxona" : " "}</span>
            </div>
            <div className="CardsBody">
              <p className="CardsTitle">Kiritilgan vaqt:</p>
              <span className="text-violet-600 dark:text-gray-300">{moment(details.createdAt).format('DD-MM-YYYY')}</span>
            </div>
            <div className="CardsBody">
              <p className="CardsTitle">Yangilangan vaqt:</p>

              <span className="text-violet-600 dark:text-gray-300">{moment(details.updatedAt).format("DD-MM-YYYY")}</span>
            </div>
            <div></div>
        </div>
        <div className="Cards">
            <div className="CardsBody ">
              <p className="CardsTitle">Ism:</p>
              <span className="text-violet-600 dark:text-gray-300">{marketClient.name}</span>
            </div>
            <div className="CardsBody">
              <p className="CardsTitle">Manzil:</p>
              <span className="text-violet-600 dark:text-gray-300  text-right pl-5">{marketClient.address}</span>
            </div>
            <div className="CardsBody">
              <p className="CardsTitle">Telefon raqam:</p>
              <span className="text-violet-600 dark:text-gray-300">{marketClient.phone_number}</span>
            </div>
            <div className="CardsBody">
              <p className="CardsTitle">Status:</p>
              <span className="text-violet-600 dark:text-gray-300">{
              marketClient.status === 'disposable' ? 'bir martalik'
              : marketClient.status === 'reliability' ? 'ishonchlilik'
              : marketClient.status === 'average' ? "o'rta me'yordagi"
            : " " }</span>
            </div>

            <div></div>
        </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-full max-sm:overflow-scroll">
            <table className={"table"}>
              <thead className={"thead"}>
                <tr>
                  <th className="td">Nomi</th>
                  <th className="td">Turi</th>
                  <th className="td">Miqdori</th>
                  <th className="td">Sotilgan narxi</th>
                </tr>
              </thead>
              <tbody>
                {
                  productsList?.map(product =>{
                return(
                  <tr className="dark:hover:bg-indigo-500 hover:bg-slate-300" key={v4()}>
                  <td className="td">{product.name}</td>
                  <td className="td">{product.type}</td>
                  <td className="td"> {product.quantity}</td>
                  <td className="td"> {product.solt_cost}</td>
              </tr>
                )
                  })
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
