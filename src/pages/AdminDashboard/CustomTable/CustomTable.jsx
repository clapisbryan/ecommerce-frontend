import React from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import UpdateProduct from '../../../components/AdminView/UpdateProduct';
import DisableProduct from '../../../components/AdminView/DisableProduct';

const CustomTable = ({ items, fetchData }) => {

	const fields = [
		{ key: 'name', label: 'Name' },
		{ key: 'description', label: 'Description' },
		{ key: 'price', label: 'Price' },
		{ key: 'availability', label: 'Availability' },
		{ key: 'actions', label: 'Actions' },
	]

	return (
		<>
			<div>
				<Table striped bordered>
					<thead>
						<tr>
							{fields.map((field) => {
								return (
									<th key={field.key}>{field.label}</th>
								)
							})}

						</tr>
					</thead>
					<tbody>
						{items.map((item) => {

							return (

								<tr key={item._id}>
									<td>{item.name}</td>
									<td>{item.description}</td>
									<td>{item.price}</td>
									<td className={item.isActive ? "text-success" : "text-danger"}>
										{item.isActive ? "Available" : "Unavailable"}
									</td>

									{/* Action button here*/}
									<td className="text-center d-flex justify-content-end">
										<div className="mx-1">
											<UpdateProduct item={item} fetchData={fetchData} />
										</div>
										<div className="mx-1">
											<DisableProduct item={item} isActive={item.isActive} fetchData={fetchData} />
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</div>
		</>
	)
}

export default CustomTable
