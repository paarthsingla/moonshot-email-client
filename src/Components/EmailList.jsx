import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailList } from "../Utils/emailSlice";
import { setState } from "../Utils/filterSlice";
import Email from "./Email";

function EmailList() {
  const [error, setError] = useState('Loading Mails!');
  const { bodyDisplayId, filterBy, readMails, favMails } = useSelector(state=>state.filters);
  const [display, setDisplay] = useState('full');
  const dispatch = useDispatch();
  const { emailList, emailPage } = useSelector(state=>state.emails);
  const [listDisplay, setListDisplay] = useState([]);

  useEffect(() => {
    dispatch(fetchEmailList(emailPage || 1));
    const savedFilterState = localStorage.getItem('savedFilterState');
    if(savedFilterState) {
      dispatch(setState(JSON.parse(savedFilterState)));
    }
  }, [])
  
  useEffect(() => {
    if(bodyDisplayId) setDisplay('side');
  }, [bodyDisplayId])
  
  useEffect(() => {
    if(Object.keys(emailList).length>0) {
      setError('');
      switch (filterBy) {
        case 'F':
          const fListDisplay = emailList.filter(item=>favMails.includes(item.id));
          setListDisplay(fListDisplay);
          break;
        case 'R':
          const rListDisplay = emailList.filter(item=>readMails.includes(item.id));
          setListDisplay(rListDisplay);
          break;
        case 'U':
          const uListDisplay = emailList.filter(item=>!(readMails.includes(item.id)));
          setListDisplay(uListDisplay);
          break;
        default:
          const nListDisplay = emailList.map(item=>item);
          setListDisplay(nListDisplay);
          break;
      }
    } else {
      setListDisplay([]);
      setError("No Mails to Display!");
    }
  }, [filterBy, emailList])
  
  return (
    <main className={display}>
    <div>{error}</div>
    {
      listDisplay.map(item=><Email key={item.id} emailData={item}/>)
    }
    </main>
  )
};
export default EmailList;