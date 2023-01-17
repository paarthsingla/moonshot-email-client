import { useSelector } from 'react-redux';
import './App.css';
import EmailBody from './Components/EmailBody';
import EmailFilter from './Components/EmailFilter';
import EmailList from './Components/EmailList';
import EmailPage from './Components/EmailPage';

function App() {
  const { bodyDisplayId } = useSelector(state=>state.filters);

  return (
    <div className="App">
      <EmailFilter/>
      <div className="emails">
        <EmailList/>
        { (bodyDisplayId) && <EmailBody id={bodyDisplayId}/>}
      </div>
      <EmailPage/>
    </div>
  );
}

export default App;
