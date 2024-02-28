import './home.scss'
import databaseMapping from './database_mapping.png'
const Home = (props) => {
    return (
        <div className='homepage container'>
            <div className='row'>
                <h2 className='mt-3'>Project Title: User Management System with Node.js & React</h2>
                <hr />
                <h5>Overview:</h5>
                <hr />
                <p>User management system with Node.js for the backend, React for the front end, and JSON Web Tokens (JWT) for user authentication. The main functions are to help manage users, authenticate users, assign user roles, and control user permissions.</p>
                <h5>Features:</h5>
                <hr />
                <ul className='ps-5'>
                    <li>
                        User Management: Provide CRUD operations for managing user accounts, including creation, reading, updating, and deleting.
                    </li>
                    <li>
                        User Authentication: User authentication using JWT to ensure authorized access to the system.
                    </li>
                    <li>
                        Authorization: Assign user roles to manage users' actions based on their assigned roles and permissions.
                    </li>
                    <li>
                        Database: Analysis and design of database for this system
                    </li>
                </ul>
                <h5>Database Mapping</h5>
                <hr />
                <img className='database_mapping' src={databaseMapping} alt="Database mapping picture"></img>
                <h5>Backend Technologies used:</h5>
                <hr />
                <ul className='ps-5'>
                    <li>
                        Platform/ Framework: Node.js, Express.js, ReactJS
                    </li>
                    <li>
                        Database: MySQL, ORM - Sequelize
                    </li>
                    <li>
                        Technologies: Axios, React Router, Bootstrap 5, SCSS
                    </li>
                    <li>
                        Authentication: JSON Web Tokens (JWT)
                    </li>
                    <li>
                        Other tool: Postman
                    </li>
                </ul>
                <h5>Contributions:</h5>
                <hr />
                <p>
                    Contributions to this project are welcome! If you find any bugs, have feature requests, or would like to contribute enhancements, feel free to let me know by email: <span className='text-decoration-underline text-primary'>anninh1511@gmail.com.</span> Thanks!
                </p>
            </div>
        </div>
    )
}
export default Home