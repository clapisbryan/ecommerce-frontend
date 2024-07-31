import Body from '../../components/Body/Body';
import ShowProducts from '../Products/ShowProducts/ShowProducts';
export default function Home() {
	return (
		<>
			<Body title="Welcome to Ecommerce">
				<div className='text-center my-5'>
					<h2>Our Products</h2>
					<ShowProducts />
				</div>
			</Body>
		</>
	)
}