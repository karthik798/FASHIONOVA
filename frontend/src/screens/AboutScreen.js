import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const AboutScreen = () => {
    return (
        <Container style={{ paddingTop: '120px' }}>
            <Link to='/' className='btn btn-light my-3'>
                Go Back
            </Link>

            <h3>Registered Office</h3>
            <p>
                Buildings Alyssa,
                Begonia and Clover situated in Embassy Tech Village,
                Outer Ring Road,
                Devarabeesanahalli Village,
                Varthur Hobli,
                Bengaluru – 560103, India
            </p>
            <h6>Telephone: +91-80-61561999</h6>
            <h6>Email: fashionova@gmail.com</h6><br></br>

            <h3>Shop Address</h3>
            <p>
                Street: 106, Fashionova Garments, L B S Marg, Bhandup(w). City: Mumbai · Street: Bs Rbg Complex, Opp Telephone Exchange.
            </p>



        </Container>
    )
}

export default AboutScreen
