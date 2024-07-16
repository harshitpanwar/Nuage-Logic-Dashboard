import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import './App.css';
import SideBar from './components/SideBar/SideBar';
import Login from './components/Login/Login';
import { useAuth } from './context/AuthContext';
import Companies from './components/Companies/Companies';
import { ME_QUERY } from './graphql/queries/login';
import { useLazyQuery } from '@apollo/client';
import CompanyDetails from './components/Companies/CompanyDetails/CompanyDetails';
import Contacts from './components/Contacts/Contacts';
import ContactDetails from './components/Contacts/ContactDetails/ContactDetails';
import ContactForm from './components/Contacts/ContactForm/ContactForm';
import CreateCompany from './components/Companies/CreateCompany/CreateCompany';
import UpdateContact from './components/Contacts/UpdateContact/UpdateContact';
import ProtectedRoute from './components/ProtectedRoute';
import { Loader } from 'lucide-react';
import UpdateCompany from './components/Companies/UpdateCompany/UpdateCompany';

function App() {
  const { authData, setAuth } = useAuth();

  const [fetchCurrentUser, { loading, error, data }] = useLazyQuery(ME_QUERY, {
    onCompleted: (data) => {
      if (data && data.me) {
        setAuth(data.me);
      }
      else{
        setAuth(null);
      }
    },
    onError: (error) => {
      setAuth(null);
      console.error("Error fetching current user:", error);
    },
  });

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if(loading) return <Loader/>


  return (
    <div className='app'>
    
      {/* <div className='main'> */}
        <Router>
        <Header />

          {/* {authData && authData.userId  && <SideBar />} */}
          {/* <SideBar /> */}
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
            <Route path="/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
            <Route path='/company/:companyId' element={<ProtectedRoute><CompanyDetails /></ProtectedRoute>} />
            <Route path='/contacts' element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
            <Route path='/contact/:contactId' element={<ProtectedRoute><ContactDetails /></ProtectedRoute>} />
            <Route path='/create-contact' element={<ProtectedRoute><ContactForm /></ProtectedRoute>} /> 
            <Route path='/create-company' element={<ProtectedRoute><CreateCompany /></ProtectedRoute>} />
            <Route path='/update-contact/:contactId' element={<ProtectedRoute><UpdateContact /></ProtectedRoute>} />
            <Route path='/update-company/:companyId' element={<ProtectedRoute><UpdateCompany /></ProtectedRoute>} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
        </Router>
      </div>
    // </div>
  );
}

export default App;
