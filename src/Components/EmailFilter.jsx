import { useDispatch, useSelector } from "react-redux";
import { setBodyDisplayId, setFilterBy } from "../Utils/filterSlice";
import "./CSS/EmailFilter.css";

function EmailFilter() {
  const { filterBy } = useSelector(state=>state.filters);
  const dispatch = useDispatch();

  const filterClickHandler = (filterId) => {
    dispatch(setFilterBy(filterId));
    dispatch(setBodyDisplayId(''));
  };
  
  return (
    <nav className="nav">
        Filter By:
        <button className={(filterBy==='U')?"filter-button-selected":"filter-button"} onClick={()=>filterClickHandler('U')}>Unread</button>
        <button className={(filterBy==='R')?"filter-button-selected":"filter-button"} onClick={()=>filterClickHandler('R')}>Read</button>
        <button className={(filterBy==='F')?"filter-button-selected":"filter-button"} onClick={()=>filterClickHandler('F')}>Favorites</button>
        {(filterBy) && <button className="filter-button" onClick={()=>filterClickHandler('')}>x</button>}
    </nav>
  )
}
export default EmailFilter;