import { useState } from "react";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";

const validUsers = ['max']

const initialState = {
  isSignedIn: false
}

export default function App() {
  const [auth, setAuth] = useState(initialState);
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard auth={auth} />} />
          <Route path="signin" element={<Signin auth={auth} setAuth={setAuth} />} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Signin(props) {
  const [username, updateUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    if (validUsers.includes(username)) {
      props.setAuth({ isSignedIn: true });
    }
  }

  const handleUsername = (e) => {
    e.persist();
    updateUsername(e.target.value);
  }

  if (props.auth.isSignedIn) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div>
      <p>You must log in to view the page /dashboard</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" value={username} onChange={handleUsername} />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

Signin.propTypes = {
  setAuth: 'function',
  auth: { isSignedIn: 'boolean' }
};

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <Button variant="primary">Home</Button>
    </div>
  );
}

function About() {
  return (
    <div>
      <Button variant="secondary">About</Button>
      
    </div>
  );
}

function Dashboard(props) {
  if (props.auth.isSignedIn) {
    return (
      <div>
        <Button variant="light">Dashboard</Button>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
      </div>
    );
  }
  return <Navigate to="/signin" />
}

Dashboard.propTypes = {
  auth: { isSignedIn: 'boolean' }
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}