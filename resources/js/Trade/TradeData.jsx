import axios from "axios";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function TradeData({time, setTime}) {

    const [tradeData, setTradeData] = useState([])

    // finding out the last given time in the data:
    // const [time, setTime] = useState(0)

    const loadTradeData = async () => {
        // Request with Axios:
        try {
            const response = await axios.get('/api/tradedata')
            // console.log(response.data);
            setTradeData(response.data)

            let maxTime = 0;
            response.data.forEach(element => {
                if (element.time > maxTime) {
                    maxTime = element.time;
                }
            });
            setTime(maxTime)
            console.log(maxTime);

        } catch (error) {
            console.log(error);
        }
    }

    // Using this for button, should be replaced with timer later:


    const loadSingularTrade = async () => {
        try {
            const response = await axios.get('/api/tradedata/' + time)
            const newTradeData = [...tradeData]
            newTradeData.shift()
            newTradeData.push(response.data)
            setTradeData(newTradeData)

        } catch (error) {
            console.log(error);
        }
    }

    //useEfect for loading all 100 trades on page load:
    useEffect(() => {
        loadTradeData()
    }, [])

    useEffect(() => {
        time && loadSingularTrade()
    }, [time])


    // Max & Min calculations for div heights:
    let max = 0;
    let min = 100000000;

    tradeData.forEach(element => {
        if (element.high < min) {
            min = element.high;
        }
        if (element.high > max) {
            max = element.high;
        }
    });
    if (tradeData !== []) {
        let percentage = (min / max) * 100
        // console.log(percentage);
    }

    // Return:
    return (
        <>
            {/* <p>Now: {time && DateTime.fromSeconds(time).toFormat('yyyy LL dd, HH:mm')}</p> */}
            <div className="trades">
                {
                    !tradeData
                        ? <div>Loading...</div>
                        :
                        tradeData.map((trade) => {
                            return (
                                <div key={trade.time} className={`trade_div ` + trade.time} style={{ height: (((trade.high - min) / (max - min)) * 80) + 20 + 'px' }}>
                                    <div className={`trade_info ` + trade.id} >
                                        <p>
                                        Time: {time && DateTime.fromSeconds(trade.time).toFormat('yyyy LL dd, HH:mm')} |
                                        Open: {trade.open} |
                                        Close {trade.close}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
            {/* <button onClick={loadSingularTrade}>Next Minute</button> */}
        </>
    )
}