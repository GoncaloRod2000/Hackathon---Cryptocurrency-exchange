import axios from "axios";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function TradeData() {

    const [tradeData, setTradeData] = useState([])

    // finding out the last given time in the data:
    const [timeNow, setTimeNow] = useState(0)

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
            setTimeNow(maxTime)
            console.log(maxTime);

        } catch (error) {
            console.log(error);
        }
    }

    // Using this for button, should be replaced with timer later:
    const [nextSingleTrade, setNextSingleTrade] = useState('')

    const loadSingularTrade = async () => {
        try {
            const response = await axios.get('/api/tradedata/' + timeNow)
            setNextSingleTrade(response.data)
            console.log(nextSingleTrade);
        } catch (error) {
            console.log(error);
        }
    }

    //useEfect for loading all 100 trades on page load:
    useEffect(() => {
        loadTradeData()
    }, [])


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
            <p>Now: {DateTime.fromSeconds(timeNow).toFormat('yyyy LL dd, HH:mm')}</p>
            <div className="trades">
                {
                    !tradeData
                        ? <div>Loading...</div>
                        :
                        tradeData.map((trade) => {
                            return (
                                <div key={trade.id} className={`trade_div ` + trade.id} style={{ height: (((trade.high - min) / (max - min)) * 80) + 20 + 'px' }}>
                                    <div className={`trade_info ` + trade.id} >
                                        <p>
                                        Time: {DateTime.fromSeconds(trade.time).toFormat('yyyy LL dd, HH:mm')} |
                                        Open: {trade.open} |
                                        Close {trade.close}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
            <button onClick={() => setTimeNow(timeNow + 60) & loadSingularTrade()}>Next Minute</button>
        </>
    )
}