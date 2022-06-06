import {useEffect, useRef, useState} from "react";
import {DateRangePicker} from 'react-date-range';
import format from 'date-fns/format';
import './calendarStyle.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {addDays} from "date-fns";

function CalendarReservation() {

    const [calendarRange, setCalendarRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection"
        }

    ]);
    const [openCalendar, setOpenCalendar] = useState(false);
    const ref = useRef(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    useEffect(() => {
        document.addEventListener("keydown", hideOnEscape, true);
        document.addEventListener("click", hideOnClick, true);

        setStartDate(format(calendarRange[0].startDate, "dd/MM/yyyy"));
        setEndDate(format(calendarRange[0].endDate, "dd/MM/yyyy"));

        return () => {
            document.removeEventListener("keydown", hideOnEscape);
            document.removeEventListener("click", hideOnClick);
        }
    }, [calendarRange]);


    function hideOnEscape(event) {
        if (event.key === "Escape") {
            setOpenCalendar(false);
        }
    }

    function hideOnClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpenCalendar(false);
        }
    }

    return (
        <div>
            <input
                value={`${format(calendarRange[0].startDate, "dd/MM/yyyy")} to ${format(calendarRange[0].endDate, "dd/MM/yyyy")}`}
                readOnly
                className="inputBox"
                onClick={() => setOpenCalendar(openCalendar => !openCalendar)}
            />
            <div ref={ref}>
                {openCalendar &&
                    <DateRangePicker
                        onChange={item => setCalendarRange([item.selection])}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={true}
                        ranges={calendarRange}
                        months={2}
                        direction="horizontal"
                    />
                }
            </div>
        </div>
    );
}

export default CalendarReservation;