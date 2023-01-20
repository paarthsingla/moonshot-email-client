import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailList } from "../Utils/emailSlice";
import { setState } from "../Utils/filterSlice";
import Email from "./Email";
import "./CSS/EmailList.css";
import loader from "../loader.gif";

function EmailList() {
  const { bodyDisplayId, filterBy, readMails, favMails } = useSelector(state=>state.filters);
  const [display, setDisplay] = useState('full');
  const dispatch = useDispatch();
  const { emailList, emailPage } = useSelector(state=>state.emails);
  const [listDisplay, setListDisplay] = useState([]);
  const [msg, setMsg] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    dispatch(fetchEmailList(emailPage || 1));
    const savedFilterState = localStorage.getItem('savedFilterState');
    if(savedFilterState) {
      dispatch(setState(JSON.parse(savedFilterState)));
    }
  }, [])
  
  useEffect(() => {
    if(bodyDisplayId) setDisplay('side');
    else setDisplay('full');
  }, [bodyDisplayId])
  
  useEffect(() => {
    setMsg(false);
    if(Object.keys(emailList).length>0) {
      setShowLoader(false);
      switch (filterBy) {
        case 'F':
          const fListDisplay = emailList.filter(item=>favMails.includes(item.id));
          if(fListDisplay.length===0) setMsg(true);
          setListDisplay(fListDisplay);
          break;
        case 'R':
          const rListDisplay = emailList.filter(item=>readMails.includes(item.id));
          if(rListDisplay.length===0) setMsg(true);
          setListDisplay(rListDisplay);
          break;
        case 'U':
          const uListDisplay = emailList.filter(item=>!(readMails.includes(item.id)));
          if(uListDisplay.length===0) setMsg(true);
          setListDisplay(uListDisplay);
          break;
        default:
          const nListDisplay = emailList.map(item=>item);
          setListDisplay(nListDisplay);
          break;
      }
    } else {
      setShowLoader(true);
      setListDisplay([]);
    }
  }, [filterBy, emailList])
  
  return (
    <main className={display}>
    { (msg) && <div className="error">
      <p>No Mails To Display!</p>
      <p>Please Check Next Page or Remove Filter.</p>
    </div> }
    { (showLoader) && <img src={loader} alt="Loading..." /> }
    {
      listDisplay.map(item=><Email key={item.id} emailData={item}/>)
    }
    </main>
  )
};
export default EmailList;