import { useDispatch, useSelector } from "react-redux";
import { fetchEmailList, setEmailList, setEmailPage } from "../Utils/emailSlice";
import { setBodyDisplayId } from "../Utils/filterSlice";
import "./CSS/EmailPage.css";

function EmailPage() {
    const { emailPage } = useSelector(state=>state.emails);
    const dispatch = useDispatch();

    const pageNoClickHandler = (pageNo) => {
        dispatch(setBodyDisplayId(''));
        dispatch(setEmailList());
        dispatch(setEmailPage(pageNo));
        dispatch(fetchEmailList(pageNo));
    };
  return (
    <footer>
        Page:
        <button className={(emailPage===1)?"page-selected":"page"} onClick={()=>pageNoClickHandler(1)}>1</button>
        <button className={(emailPage===2)?"page-selected":"page"} onClick={()=>pageNoClickHandler(2)}>2</button>
    </footer>
  )
}
export default EmailPage