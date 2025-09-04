import { useEffect } from 'react';
import Products from '../products/Products';
import * as Styles from './HomeStyles';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/actions/productAction';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Slider from '../../components/slider/Slider';
import { FadeInAlways } from '../../components/fadeIn/FadeInAlways';

const Home = () => {
	const { products, error, loading } = useSelector(
		(state) => state.productLists,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);
	return (
		<>
			<Slider />
			<Container>
				<Styles.Title>Latest Products</Styles.Title>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Row>
						{products?.map((product, i) => (
							<Col sm={12} md={6} xl={4} key={i}>
								<FadeInAlways delay={(0.1 * i) + 1} direction='left'>
									<Products product={product} />
								</FadeInAlways>
							</Col>
						))}
					</Row>
				)}
			</Container>
		</>
	);
};

export default Home;
