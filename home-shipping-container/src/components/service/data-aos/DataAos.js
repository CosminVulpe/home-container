import AOS from "aos";
import "aos/dist/aos.css";

export const dataAos = () => {
    AOS.init({
        duration: 1500
    });
    AOS.refresh();
}
