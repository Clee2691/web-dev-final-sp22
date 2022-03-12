import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-primary'>
            <div className='container-fluid ms-2 me-2'>
                <Link to='/' className='navbar-brand'>SwoleMate</Link>

                <div className='collapse navbar-collapse' id="navbarNav">
                    <ul class='navbar-nav me-auto'>
                        <li className='nav-item'>
                            <Link to='/home' className='nav-link active'>HOME</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/search' className='nav-link'>SEARCH</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/profile' className='nav-link'>PROFILE</Link>
                        </li>
                    </ul>
                    <div className='d-flex'>
                        <Link to='/login' className='btn btn-outline-success me-2'>LOGIN</Link>
                        <Link to='/register' className='btn btn-outline-danger'>SIGN UP</Link>
                    </div>
                </div>

                <button class="navbar-toggler mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
            </div>
        </nav>
    )
}

export default NavigationBar;