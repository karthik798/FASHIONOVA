import React from 'react'
import { Carousel, Container } from 'react-bootstrap'


const Banner = () => {
    return (
        <>
            <Container id="carousel">
                <Carousel fade>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/Banners/b1.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>


                        </Carousel.Caption>

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/Banners/b2.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption>

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/Banners/b3.jpg"
                            alt="Third slide"

                        />

                        <Carousel.Caption>

                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

        </>
    )
}
export default Banner