import React, { useEffect, useState } from "react"

export function LocalTime() {

    function zero_first_format(value: any)
    {
        if (value < 10)
        {
            value='0'+value;
        }
        return value;
    }

    const [date, setDate] = useState<Date>(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => setDate(new Date()), 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    let day = zero_first_format(date.getDate()),
        month = zero_first_format(date.getMonth()+1),
        year = date.getFullYear(),
        hours = zero_first_format(date.getHours()),
        minutes = zero_first_format(date.getMinutes()),
        seconds = zero_first_format(date.getSeconds())
    let dayOfTheWeek = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']

    const time = day + '.' + month + '.' + year + ' ' + dayOfTheWeek[date.getUTCDay()] + ' ' + hours + ':' + minutes + ':' + seconds

    return (
        <div>
            {time}
        </div>
    )
}