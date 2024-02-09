import React from 'react'
import { Nav, NavItem, NavLink } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({s1, s2, s3, s4}) => {
  return (
    <Nav className='justify-content-center mx-4 py-4'>
        <NavItem>
            <LinkContainer to='/login'>
                <NavLink disabled={!s1}>Sign In</NavLink>
            </LinkContainer>
        </NavItem>
        <NavItem><NavLink disabled={!s1}><i class="fa-solid fa-forward"/></NavLink></NavItem>
        <NavItem>
            <LinkContainer to='/shipping'>
                <NavLink disabled={!s2}>Shipping</NavLink>
            </LinkContainer>
        </NavItem>
        <NavItem><NavLink disabled={!s2}><i class="fa-solid fa-forward"/></NavLink></NavItem>
        <NavItem>
            <LinkContainer to='/payment'>
                <NavLink disabled={!s3}>Payment</NavLink>
            </LinkContainer>
        </NavItem>
        <NavItem><NavLink disabled={!s3}><i class="fa-solid fa-forward"/></NavLink></NavItem>
        <NavItem>
            <LinkContainer to='/placeorder'>
                <NavLink disabled={!s4}>Place Order</NavLink>
            </LinkContainer>
        </NavItem>
    </Nav>
  )
}

export default CheckoutSteps