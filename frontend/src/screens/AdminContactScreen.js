import React, { useEffect } from 'react'
import { Table, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { contactlist } from '../actions/contactActions'
import {useNavigate} from 'react-router-dom'

const AdminContactScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const contactList = useSelector((state) => state.contactList)
    const { loading, error, contacts } = contactList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(contactlist())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo])

    return (
        <><Container style={{ paddingTop: '120px' }}>
            <h1>Contacts</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PHONE</th>
                            <th>EMAIL</th>
                            <th>CATEGORY</th>
                            <th>COMMENT</th>
                            <th>DATE</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact._id}>
                                <td>{contact._id}</td>
                                <td>{contact.name}</td>
                                <td>{contact.phone}</td>
                                <td>{contact.email}</td>
                                <td>{contact.category}</td>
                                <td>{contact.comment}</td>
                                <td>{contact.createdAt.substring(0, 10)}</td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}</Container>
        </>
    )
}

export default AdminContactScreen
