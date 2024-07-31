import React from 'react'
import AppNavbar from '../AppNavbar/AppNavbar'

const Body = ({ title, children }) => {
	return (
		<div className='main'>
			<AppNavbar />
			<div className="content-page">
				<div className="bg-title-container">
					<div className="bg-overlay">
						<div className="container">
							<h1 className='fw-bold text-center text-capitalized'>{title}</h1>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="my-4">
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Body
