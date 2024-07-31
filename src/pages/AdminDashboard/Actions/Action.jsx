import React, { useContext } from 'react'
import AddNewProduct from './AddNewProduct/AddNewProduct'
import UserContext from '../../../hooks/UserContext';

const Action = ({ fetchData }) => {
	
  const { user, setUser } = useContext(UserContext);
	return (
		<div>
			<div className="d-flex align-items-center justify-content-end">
				<AddNewProduct fetchData={fetchData} />
			</div>
		</div>
	)
}

export default Action
