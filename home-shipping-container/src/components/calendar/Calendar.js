import React, {useEffect, useState} from "react";
import './calendarStyle.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {differenceInDays, isWithinInterval} from "date-fns";
import {useAtom} from 'jotai';
import {RESERVATION_DETAILS, TOTAL_NUMBER_OF_DAY} from "../jotai-atom/useAtom";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import {useParams} from "react-router-dom";


function CalendarReservation() {
    const [datesRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [totalNumberOfDays, setTotalNumberOfDays] = useAtom(TOTAL_NUMBER_OF_DAY);
    const [reservationDetails, setReservationDetails] = useAtom(RESERVATION_DETAILS);

    const containerReservedDates = [];
    const [datesContainerReserved, setDatesContainerReserved] = useState([]);
    const [datesContainerReservedRemove, setDatesContainerReservedRemove] = useState([]);
    let {id} = useParams();

    function tileDisable({date, view}) {
        if (view === 'month') {
            return isWithinRanges(date, containerReservedDates);
        }
    }

    function isWithinRange(date, range) {
        return isWithinInterval(date, {
            start: range[0],
            end: range[1]
        });
    }

    function isWithinRanges(date, ranges) {
        return ranges.some(range => isWithinRange(date, range));
    }

    function addReservedDates(dates) {
        let datesReservation = [];
        let counter = 0;

        for (let i = 0; i < dates.length; i++) {
            datesReservation.push(
                new Date(dates[i])
            );
            counter++;
            if (counter === 2) {
                containerReservedDates.push(datesReservation);
                counter = 0;
                datesReservation = [];
            }
        }
    }

    const numberOfDaysReservation = differenceInDays(
        new Date(
            endDate.getFullYear()
            + "/"
            + (endDate.getMonth() + 1)
            + "/"
            + endDate.getDate()
        ),
        new Date(
            startDate.getFullYear()
            + "/"
            + (startDate.getMonth() + 1)
            + "/"
            + startDate.getDate()
        )
    );

    useEffect(() => {
        setStartDate(datesRange[0]);
        setEndDate(datesRange[1]);
        setTotalNumberOfDays(numberOfDaysReservation);
        setReservationDetails(
            {
                startDate: startDate,
                finishDate: endDate,
                totalNumberOfDays: totalNumberOfDays,
                totalPrice: 0
            }
        );
    }, [datesRange
        , endDate
        , numberOfDaysReservation
        , startDate
        , totalNumberOfDays]);


    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API_CONTAINERS + "/dates/" + id)
            .then(data => {
                setDatesContainerReserved(data.data)
            })
            .catch(error => console.log(error));


        axios.get(process.env.REACT_APP_BACKEND_API_CONTAINERS + "/dates-remove/" + id)
            .then(response => {
                if (response.status === 200 && response.data !== "") {
                    // deleteDates(response.data);
                    setDatesContainerReservedRemove(response.data);
                }
            })
            .catch(error => console.log(error));
    }, [datesRange]);

    function deleteDates(dates) {
        for (let i = 0; i < containerReservedDates.length; i++) {
            for (let j = 0; j < containerReservedDates[i].length; j++) {
                if(new Date(dates[j]).getTime() === containerReservedDates[i][j].getTime()){
                    delete containerReservedDates[j];
                    break;
                }
            }
        }
        return containerReservedDates;
    }

    if (datesContainerReserved.length !== 0) {
        addReservedDates(datesContainerReserved);
    }
    if(datesContainerReservedRemove.length !== 0){
        deleteDates(datesContainerReservedRemove);
    }

    return (
        <div>
            <DateRangePicker
                onChange={setDateRange}
                value={datesRange}
                tileDisabled={tileDisable}
                format="dd-MM-yyyy"
                required={true}
                calendarAriaLabel={"Toggle calendar"}
                clearIcon={null}
                rangeDivider={"to"}
            />
        </div>
    );
}

export default CalendarReservation;

// const ContainerReservedDates = [
//     [new Date("2022/06/13"), new Date("2022/06/18")],
//     [new Date("2022/06/25"), new Date("2022/06/29")],
//     [new Date("2022/07/02"), new Date("2022/07/06")],
// ];
