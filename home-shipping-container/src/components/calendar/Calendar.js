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
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalNumberOfDays, setTotalNumberOfDays] = useAtom(TOTAL_NUMBER_OF_DAY);
    const [reservationDetails, setReservationDetails] = useAtom(RESERVATION_DETAILS);

    const [calendarRange, setCalendarRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            isInvalidDate: function (date) {
                let dateArray = ["2022/06/07", "2022/06/10"];
                return dateArray.indexOf(startDate) < false;

            },
            key: "selection"
        }
    ]);


    const numberOfDaysReservation = differenceInDays(
        new Date(
            endDate.substring(6, endDate.length)
            + "/"
            + endDate.substring(3, 5)
            + "/"
            + endDate.substring(0, 2)
        ),
        new Date(
            startDate.substring(6, startDate.length)
            + "/"
            + startDate.substring(3, 5)
            + "/"
            + startDate.substring(0, 2)
        )
    );

    useEffect(() => {
        document.addEventListener("keydown", hideOnEscape, true);
        document.addEventListener("click", hideOnClick, true);

        setStartDate(format(calendarRange[0].startDate, "dd/MM/yyyy"));
        setEndDate(format(calendarRange[0].endDate, "dd/MM/yyyy"));
        setTotalNumberOfDays(numberOfDaysReservation);
        setReservationDetails(
            {
                startDay: parseInt(startDate.substring(0, 2)),
                startMonth: parseInt(startDate.substring(3, 5)),
                year: parseInt(startDate.substring(6, startDate.length)),
                finishDay: parseInt(endDate.substring(0, 2)),
                finishMonth: parseInt(endDate.substring(3, 5)),
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