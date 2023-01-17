import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchEmailBody, setEmailBody } from "../Utils/emailSlice";
import { addFavMail, removeFavMail } from "../Utils/filterSlice";

function EmailBody() {
  const [emailDetails, setEmailDetails] = useState({
    from: {
      name: ''
    },
    date: ''
  });
  const { favMails, bodyDisplayId } = useSelector(state=>state.filters);
  const { emailList, emailBody } = useSelector(state=>state.emails);
  const dispatch = useDispatch();
  const { from:{ name }, date } = emailDetails;
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setEmailDetails(emailList.find(item => item.id===bodyDisplayId));
    if(favMails.includes(bodyDisplayId)) setFav(true);
    else setFav(false);
    dispatch(setEmailBody('Loading...'));
    dispatch(fetchEmailBody(bodyDisplayId));
  }, [bodyDisplayId])

  const markFavHandler = () => {
    if(fav) dispatch(removeFavMail(bodyDisplayId));
    else dispatch(addFavMail(bodyDisplayId));
    setFav(p=>!p);
  }
  
  return (
    <aside>
      <section className="body-section">
        <div className="avatar">
          <div className="avatar-logo">{name[0]}</div>
        </div>
        <div className="body">
          <div className="body-details">
            <span className="body-email-name">{name}</span>
            <button className={(fav)?'unmark-fav':'mark-fav'} onClick={markFavHandler}>
            {(fav?'Unmark Favorite':'Mark as Favorite')}
            </button>
          </div>
          <p>{date}</p>
          <div dangerouslySetInnerHTML={{ __html: emailBody }}></div>
        </div>
      </section>
    </aside>
  )
}
export default EmailBody