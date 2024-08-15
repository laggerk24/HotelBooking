import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './Header'
import { Row, Col,Card } from 'react-bootstrap'
import { FaClock,FaCocktail,FaParking,FaSnowflake,FaTshirt,FaUtensils,FaWifi } from 'react-icons/fa'

const HotelServices = () => {
    return (
        <Container className='mb-2'>
            <Header title={"Our Services"} />
            <Row>
                <h4 className='text-center'>
                    Services at <span className='hotel-color'>Bookerrr </span>
                    <span className='gap-2' >
                        <FaClock /> - 24-Hour Front Desk
                    </span>
                </h4>
            </Row>
            <hr />
            <Row xs={1} md={2} lg={3}  >
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaWifi/> Wifi
                            </Card.Title>
                            <Card.Text>Stay connected with high-speed internet access.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaUtensils/> Breakfast
                            </Card.Title>
                            <Card.Text>Star</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaTshirt/> Laundry
                            </Card.Title>
                            <Card.Text>Keep your clothes clean fresh with your laundry service.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaCocktail/> Mini-bar
                            </Card.Title>
                            <Card.Text>Enjoy a refreshing drink or snack from our in-room mini-bar.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaParking/> Parking
                            </Card.Title>
                            <Card.Text>Park your car conveniently in our on-site parking lot.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaSnowflake/> Air Conditioning
                            </Card.Title>
                            <Card.Text>Stay cool and comfortable with our air Conditioning system.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default HotelServices