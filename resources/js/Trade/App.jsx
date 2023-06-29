import TradeData from "./TradeData";
import { DateTime } from "luxon";
import PriceChart from "./PriceChart"

export default function App(){

    const time = (new DateTime(1364774820)).toFormat('yyyy LL dd, HH:mm')

    return (
        <p>The time is {time}</p>
        // <TradeData />
    )
}