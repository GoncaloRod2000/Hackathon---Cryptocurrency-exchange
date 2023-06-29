import { useState, useEffect } from "react";
import TradeData from "./TradeData";
import { DateTime } from "luxon";


export default function App(){

    // const time = (new DateTime(1364774820)).toFormat('yyyy LL dd, HH:mm')

    const [time, setTime] = useState(0);

    const increaseTime = () => {
        setTime(time + 60)
    }

    useEffect(() => {
        // creating a timeout when the component mounts, so...
        const myTimeout = setTimeout(() => {
            increaseTime()
        }, 1000);
     
        // ...returning a cleanup function which will be run
        // when the component unmounts
        return () => {
            clearTimeout(myTimeout);
        }
    }, [time])

    return (
        <>
            <p>The time is { DateTime.fromSeconds(1364774820 + time).toFormat('yyyy LL dd, HH:mm')}</p>
            {/* <button onClick={() => {setClicks(clicks+1)}}>{clicks}</button> */}
        </>
    )

}   



