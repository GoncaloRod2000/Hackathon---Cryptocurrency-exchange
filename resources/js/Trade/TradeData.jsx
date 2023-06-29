import axios from "axios";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function TradeData() {

    const [tradeData, setTradeData] = useState('')

    const loadTradeData = async () => {
        // Request with Axios:
        try {
            const response = await axios.get('/api/tradedata')
            console.log(response.data);
            setTradeData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadTradeData()
    }, [])

    // {DateTime.fromSeconds(trade.time).toFormat('yyyy LL dd, HH:mm')}

    return (
        <div className="trades">
            {
                !tradeData
                    ? <div>Loading...</div>
                    :
                    tradeData.map((trade) => {
                        return (
                            <>
                            <div key={trade.id} className={`trade_div ` + trade.id}></div>
                            </>
                        )

                    })
}

        </div>
    )
}