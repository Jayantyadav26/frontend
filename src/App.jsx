// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Signup from './pages/Signup.jsx';
// import Login from './pages/Login';



// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/login" element={<Login />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Packing from './pages/packing.jsx';
import Unpack from './pages/unpack.jsx';
import SearchItem from './pages/searchItem.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Delete from './pages/Delete.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      <Route
          path="/packing"
          element={
            <ProtectedRoute>
              <Packing/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/unpacking"
          element={
            <ProtectedRoute>
              <Unpack />
            </ProtectedRoute>
          }
        />
        <Route
          path="/searchItem"
          element={
            <ProtectedRoute>
              <SearchItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deleteItem"
          element={
            <ProtectedRoute>
              <Delete/>
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
