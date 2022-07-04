import {FaStar} from "react-icons/fa";
import styled from 'styled-components/macro';
import {useState} from "react";

const Input = styled.input`
    display: none;
`;

const Stars = styled(FaStar)`
    cursor: pointer; 
    transition: color 200ms;
`;


function StarRating() {
    const [rating, setRating] = useState(null);
    const [overRating, setOverRating] = useState(null);

    return (
        <div>
            {[...Array(5)].map((item, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <Input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <Stars
                            color={(ratingValue <= (overRating || rating)) ? "#ffc107" : "#82837E"}
                            onMouseEnter={() => setOverRating(ratingValue)}
                            onMouseLeave={() => setOverRating(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
}

export default StarRating;