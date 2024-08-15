import MainHeader from "../layout/MainHeader";
import HotelServices from "../common/HotelServices";
import Parallax from "../common/Parallax";

const HomePage = () => {
    return(
        <section>
            <MainHeader/>
            <section className="container">
                <Parallax/>
                <HotelServices/>
                <Parallax/>
            </section>
        </section>
    )
}

export default HomePage;