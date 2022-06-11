import {useEffect, useRef, useState} from "react";
import {DateRangePicker} from 'react-date-range';
import format from 'date-fns/format';
import './calendarStyle.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {addDays, differenceInDays} from "date-fns";
import {useAtom} from 'jotai';
import {RESERVATION_DETAILS, TOTAL_NUMBER_OF_DAY} from "../jotai-atom/useAtom";


function CalendarReservation() {

    const [openCalendar, setOpenCalendar] = useState(false);
    const ref = useRef(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [totalNumberOfDays, setTotalNumberOfDays] = useAtom(TOTAL_NUMBER_OF_DAY);
    const [reservationDetails, setReservationDetails] = useAtom(RESERVATION_DETAILS);

    const [calendarRange, setCalendarRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection"
        }
    ]);

    const numberOfDaysReservation = differenceInDays(
        new Date(
            endDate.getFullYear()
            + "/"
            + (endDate.getMonth()+1)
            + "/"
            + endDate.getDate()
        ),
        new Date(
            startDate.getFullYear()
            + "/"
            + (startDate.getMonth()+1)
            + "/"
            + startDate.getDate()
        )
    );

    useEffect(() => {
        document.addEventListener("keydown", hideOnEscape, true);
        document.addEventListener("click", hideOnClick, true);

        setStartDate(calendarRange[0].startDate);
        setEndDate(calendarRange[0].endDate);
        setTotalNumberOfDays(numberOfDaysReservation);
        setReservationDetails(
            {
                startDate: startDate,
                finishDate: endDate,
                totalNumberOfDays: totalNumberOfDays,
                totalPrice: 0
            }
        );
        return () => {
            document.removeEventListener("keydown", hideOnEscape);
            document.removeEventListener("click", hideOnClick);
        }
    }, [calendarRange
        , endDate
        , numberOfDaysReservation
        , startDate
        , totalNumberOfDays]);


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