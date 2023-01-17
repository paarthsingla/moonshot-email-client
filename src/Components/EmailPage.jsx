import { useDispatch, useSelector } from "react-redux";
import { fetchEmailList, setEmailPage } from "../Utils/emailSlice";

function EmailPage() {
    const { emailPage } = useSelector(state=>state.emails);
    const dispatch = useDispatch();

    const pageNoClickHandler = (pageNo) => {
        dispatch(setEmailPage(pageNo));
        dispatch(fetchEmailList(pageNo));
    };
  return (
    <nav>
        Page:
        <button className={(emailPage===1)?"filter-button-selected":"filter-button"} onClick={()=>pageNoClickHandler(1)}>1</button>
        <button className={(emailPage===2)?"filter-button-selected":"filter-button"} onClick={()=>pageNoClickHandler(2)}>2</button>
    </nav>
  )
}
export default EmailPage