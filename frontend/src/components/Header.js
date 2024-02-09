import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useNavigate } from 'react-router'
import SearchBox from './SearchBox'
import { useLocation } from 'react-router'

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
  

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <header>
            <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect sticky='top'>
            <Container id="navcontainer" className='fluid' >
                    <LinkContainer to='/'>
                        <Navbar.Brand><img
                            src="/Banners/logo2.jpg"
                            width="180"
                            height="60"
                            className="d-md-inline-block align-top"
                            alt="logo"
                        /></Navbar.Brand>            
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <NavDropdown title="MEN">
                        <NavDropdown title="TOPWEAR">
                                <LinkContainer to='/menswear/shirt'>
                                    <NavDropdown.Item>Shirt</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                <LinkContainer to='/menswear/tshirt'>
                                    <NavDropdown.Item>Tshirt</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                <LinkContainer to='/menswear/jacket'>
                                    <NavDropdown.Item>Jackets</NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                        <NavDropdown.Divider />
                                <NavDropdown title="BOTTOMWEAR">
                                    <LinkContainer to='/menswear/jeans'>
                                        <NavDropdown.Item>Jeans</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                    <LinkContainer to='/menswear/trousers'>

                                        <NavDropdown.Item>Trousers</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                    <LinkContainer to='/menswear/shots'>
                                        <NavDropdown.Item>Shorts</NavDropdown.Item></LinkContainer>
                                </NavDropdown>
                                </NavDropdown>
                                <NavDropdown title="WOMEN">
                                <NavDropdown title="TOPWEAR">
                                    <LinkContainer to='/womenswear/top'>

                                        <NavDropdown.Item>Tops</NavDropdown.Item></LinkContainer>
                                    <NavDropdown.Divider />
                                    <LinkContainer to='/womenswear/kurti'>

                                        <NavDropdown.Item>Kurtis</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                    <LinkContainer to='/womenswear/jacket'>

                                        <NavDropdown.Item>Jackets</NavDropdown.Item></LinkContainer>
                                </NavDropdown>
                                <NavDropdown.Divider />
                                <NavDropdown title="BOTTOMWEAR">
                                    <LinkContainer to='/womenswear/jeans'>
                                        <NavDropdown.Item>Jeans</NavDropdown.Item>
                                    </LinkContainer><NavDropdown.Divider />
                                    <LinkContainer to='/womenswear/trouser'>
                                        <NavDropdown.Item>Trousers</NavDropdown.Item></LinkContainer>
                                </NavDropdown>  
                                </NavDropdown>               
                            <SearchBox/>
                            <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link active={location.pathname.endsWith('/cart')}>
                                    <i className='fas fa-shopping-cart' />cart
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Manage' id='adminmenu' style={{right: 0,left:15}}>
                                    <NavDropdown title='Products'>
                                        <LinkContainer to='/admin/menproductslist'>
                                            <NavDropdown.Item>MENS</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                        <LinkContainer to='/admin/womenproductslist'>
                                            <NavDropdown.Item>WOMENS</NavDropdown.Item></LinkContainer>
                                    </NavDropdown>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/contacts'>
                                        <NavDropdown.Item>Queries</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username' >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link active={location.pathname.endsWith('/login')}>
                                        <i className='fas fa-user' />sign in
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>

    )
}

export default Header