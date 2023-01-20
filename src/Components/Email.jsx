import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReadMail, setBodyDisplayId } from "../Utils/filterSlice";
import "./CSS/Email.css";

function Email({emailData}) {
    const { id, from:{ email, name }, subject, short_description, date } = emailData;
    const filterState = useSelector(state=>state.filters);
    const { favMails, readMails, bodyDisplayId } = filterState;
    const [fav, setFav] = useState('');
    const [style, setStyle] = useState('unread');
    const dispatch = useDispatch();

    useEffect(() => {
      if(favMails.includes(id)) setFav('Favorite');
      else setFav('');
      localStorage.setItem('savedFilterState', JSON.stringify(filterState));
    }, [favMails]);

    useEffect(() => {
      if(readMails.includes(id)) setStyle('read');
      else setStyle('unread');
      localStorage.setItem('savedFilterState', JSON.stringify(filterState));
    }, [readMails]);
    
    useEffect(() => {
      if(bodyDisplayId===id) setStyle('select-y');
      else {
        if(readMails.includes(id)) setStyle('read');
        else setStyle('unread');
      }
    }, [bodyDisplayId])

    const clickHandler = ()=>{
        dispatch(addReadMail(id));
        dispatch(setBodyDisplayId(id));
    };

    return (
        <section className={style} onClick={clickHandler}>
            <div className="avatar">
                <div className="avatar-logo">{name[0]}</div>
            </div>
            <div className="details">
                <p>From: <span>{name+" <"+email+">"}</span></p>
                <p>Subject: <span>{subject}</span></p>
                <p>{short_description}</p>
                <p>{date} <span className="fav">{fav}</span></p>
            </div>
        </section>
    );
};
export default Email;