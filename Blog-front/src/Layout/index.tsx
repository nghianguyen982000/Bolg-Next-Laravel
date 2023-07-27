import { Route, Routes } from 'react-router-dom';

import Home from '../Pages/Home';

const Layout = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
  );
};

export default Layout;
