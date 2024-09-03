import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SeriesList from '../pages/SeriesList';

const RoutesConfig = () => (
    <Router>
        <Routes>
            <Route path="/" element={<SeriesList />} />
        </Routes>
    </Router>
);

export default RoutesConfig;