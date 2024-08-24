import MainHeader from "../layout/MainHeader";
import HotelServices from "../common/HotelServices";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from '../common/RoomSearch'

const HomePage = () => {
    return (
        <section>
            <MainHeader />
            <section className="container">
                <RoomSearch />
                <RoomCarousel />
                <Parallax />
                <HotelServices />
                <Parallax />
                <RoomCarousel />
            </section>
        </section>
    )
}

export default HomePage;