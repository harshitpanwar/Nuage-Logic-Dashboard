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

function App() {
  const { authData, setAuth } = useAuth();

  const [fetchCurrentUser, { loading, error, data }] = useLazyQuery(ME_QUERY, {
    onCompleted: (data) => {
      if (data && data.me) {
        console.log('Fetch current user data', data);
        setAuth(data.me);
      }
      else{
        console.log('Fetch current user data', data);
        setAuth(null);
      }
    },
    onError: (error) => {
      console.error('Fetch current user error', error);
    },
  });

  useEffect(() => {
    fetchCurrentUser();
  }, []);


  return (
    <div className='app'>
    
      <Header />
      <div className='main'>
        <Router>
          {authData && authData.userId  && <SideBar />}
          {/* <SideBar /> */}
          <Routes>
            <Route path='/' exact />
            <Route path='/login' element={<Login />} />
            <Route path='/companies' element={<Companies/>} />
            <Route path='/company/:companyId' element={<CompanyDetails />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/contact/:contactId' element={<ContactDetails />} />
            <Route path='/create-contact' element={<ContactForm />} /> 
            <Route path='/create-company' element={<CreateCompany />} />
            <Route path='/update-contact/:contactId' element={<UpdateContact />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
