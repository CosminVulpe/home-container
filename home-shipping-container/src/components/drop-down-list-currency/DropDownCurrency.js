import {useState} from "react";


function DropDownCurrency() {
    const [valueSelected, setValueSelected] = useState();

    return (
        <div>
            <select
                name=""
                id=""
                value={valueSelected}
                required
                onChange={e => setValueSelected(e.target.value)}
                style={{width: "8rem"}}
            >
                <option disabled selected value="">Currency Preference</option>
                <option defaultValue="UK">UK</option>
                <option defaultValue="US">US</option>
                <option defaultValue="France">France</option>
                <option defaultValue="Canada">Canada</option>
                <option defaultValue="Chinese">China</option>
                <option defaultValue="Germany">Germany</option>
                <option defaultValue="Japan">Japan</option>
                <option defaultValue="Korean">Korea</option>
            </select>
        </div>
    );
}

export default DropDownCurrency;