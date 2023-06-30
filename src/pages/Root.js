import {Outlet, Link} from 'react-router-dom';

export default function Root(){
    return(
        <>
            <nav>
                <ul>
                    <li><Link to={`/`}>Home</Link></li>
                    <li><Link to={`/sign-up`}>Sign Up</Link></li>
                    <li><Link to={`/login`}>Login</Link></li>
                    <li><Link to={`/admin`}>Admin</Link></li>
                    <li><Link to={`/student`}>Student</Link></li>
                    <li><Link to={`/approver`}>Approver</Link></li>
                    <li><Link to={`/student/application`}>Application</Link></li>
                    <li><Link to={`/student/application/adviser`}>Application</Link></li>
                </ul>
            </nav>

            <Outlet/>
        </>
    )
}