import React from "react"
import { Link } from "react-router-dom"

const Logout = () => {

	return (
		<>
			<li>
				<Link className="dropdown-item" to={"/profile"}>
					Profile
				</Link>
			</li>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<button className="dropdown-item" >
				Logout
			</button>
		</>
	)
}

export default Logout