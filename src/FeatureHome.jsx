import React from 'react';
import './Styles/FeatureHome.css';
import "./ViewEntity";
import Footer from './Components/Footer';
import CustomSearch from './CustomSearch';
import AddFeature from './AddFeature';
import MyFavorites from './MyFavorites';
import CsvUploader from './CsvUploader';
import UserFeatures from './UserFeatures';
import SearchResult from './SearchResult';
import ViewEntity from './ViewEntity';
import EditEntity from './EditEntity';
import EditFeature from './EditFeature';
import Header from './Header';
import { Routes, Route, Outlet , useLocation} from 'react-router-dom';
import FeatureHomeDefault from './FeatureHomeDefault';
import ChatbotEmbed from './Components/ChatbotEmbed';
import { useEffect } from 'react';

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const FeatureHome = () => {
  
  return (
    
        <>
        <ScrollToTopOnNavigate />
          <Header></Header>
          <Routes>
            <Route path="Addfeature" element={<AddFeature />} />
            <Route path="CsvUploader" element={<CsvUploader />} />
            <Route path="customsearch" element={<CustomSearch />} />
            <Route path="searchresult" element={<SearchResult />} />
            <Route path="userfeatures" element={<UserFeatures />} />
            <Route path="viewentity/:id" element={<ViewEntity />} />
            <Route path="editentity/:id" element={<EditEntity />} />
            <Route path="editfeature/:FeatureName" element={<EditFeature />} />
            <Route path='MyFavorites' element={<MyFavorites />} />
            <Route path='chatbot' element={<ChatbotEmbed />} />
            <Route path="*" element={<FeatureHomeDefault></FeatureHomeDefault>}></Route>
          </Routes>
          <Outlet></Outlet>
          <Footer></Footer>
        </>
      
  );
};

export default FeatureHome;
