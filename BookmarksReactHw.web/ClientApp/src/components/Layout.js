import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../UserContext';

const Layout = ({ children }) => {

    const { user } = useUserContext();
    const isLoggedIn = !!user;

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm fixed-top border-bottom box-shadow">
                    <div className="container">
                        <Link to='/' className="navbar-brand"> Bookmarks Manager </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                {!!isLoggedIn && <>
                                    <li className="nav-item"><Link to="/" className='nav-link'>Home</Link></li>
                                    <li className="nav-item"><Link to="/AddBookmark" className='nav-link'>Add Bookmark</Link></li>
                                    <li className="nav-item"><Link to="/logout" className='nav-link'>Logout</Link></li>
                                </>}
                                {!isLoggedIn && <>
                                    <li className="nav-item"><Link to="/signup" className='nav-link'>Signup</Link></li>
                                    <li className="nav-item"><Link to="/login" className='nav-link'>Login</Link></li>
                                </>}
                            </ul>

                        </div>
                    </div>
                </nav>
            </header>
            <div className="container" style={{ marginTop: 60 }}>
                {children}
            </div>
        </div>
    )
}

export default Layout;