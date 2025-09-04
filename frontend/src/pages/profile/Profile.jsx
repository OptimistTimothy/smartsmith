import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
	getUserDetails,
	updateUserProfile,
} from '../../redux/actions/userActions';


const Profile = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [confirmPassword, setConfirmPassword] = useState('');
	// const [message, setMessage] = useState(null);

	const loacation = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userDetails = useSelector((state) => state.userDetails);

	console.log('user details >>>>>', userDetails);
  const { loading, error, user } = userDetails;

  const loginUser = useSelector((state) => state.loginUser);
	const {  users } = loginUser;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	// console.log('user update details >>>>>', userUpdateProfile);


	const { success } = userUpdateProfile;



	useEffect(() => {
		if (!users) {
			navigate('/login');
    } else {
      if (!user?.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user?.name)
        setEmail(user?.email)
      }
    }
	}, [dispatch,users, navigate, user]);

	const submitHandler = (e) => {
    e.preventDefault();

		// if (password !== confirmPassword) {
		// 	setMessage('Passwords do not match');
		// } else {
    // 	dispatch(register(name, email, password));


    dispatch(updateUserProfile({id: user?._id, name, email}))
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{/* {message && <Message variant='danger'>{message}</Message>} */}
				{error && <Message variant='danger'>{error}</Message>}
				{success && <Message variant='success'>Profile Updated</Message>}

				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='email'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}></Form.Control>
					</Form.Group>

					{/* <Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='onfirmPassword'
							placeholder='Enter confirm password'
							value={confirmPassword}
							onChange={(e) =>
								setConfirmPassword(e.target.value)
							}></Form.Control>
					</Form.Group> */}
					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	);
};

export default Profile;
