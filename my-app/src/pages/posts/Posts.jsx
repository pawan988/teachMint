import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import CustomAutoSearch from "../../component/dropdown/Dropdown";
import Clock from "../../component/clock/Clock";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/post";
import "./Posts.css";

const Posts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [postData, setPostData] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [isRunning, setIsRunning] = useState(true);

  const getPostListData = useSelector((state) => state && state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  useEffect(() => {
    if (location?.state) {
      setUserDetail(location?.state);
    }
    if (getPostListData) {
      setPostData(getPostListData?.postsData);
    }
  }, [location, getPostListData]);
  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const navigateToPost = () => {
    navigate("/");
  };

  return (
    <div className="post-container">
      <div className="post-top-container">
        <div className="back-btn-container">
          <button onClick={() => navigateToPost()}>
            <IoMdArrowRoundBack />
            Back
          </button>
        </div>
        <div className="top-right-container">
          <div className="dropdown-container">
            <CustomAutoSearch />
          </div>
          <div className="clocke-container">
            <Clock isRunning={isRunning} setIsRunning={setIsRunning} />
          </div>
          <div className="start-pause-container">
            <div className="clock-buttons">
              <button className="clock-button" onClick={handleStart}>
                Start
              </button>
              <button className="clock-button" onClick={handlePause}>
                Pause
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* POST TOP END */}
      {/* POST USER INFO START */}
      <div className="post-user-box">
        <div className="post-user-name-box">
          <div className="name">
            <span>Name: </span>
            {userDetail?.name}
          </div>
          <div className="name">
            <span>Username: </span>
            {userDetail?.username} | <span>Catch phrase: </span>
            {userDetail?.company?.catchPhrase}
          </div>
        </div>
        <div className="post-user-name-box">
          <div className="name">
            <span>Address: </span>
            {userDetail?.address?.city}
          </div>
          <div className="name">
            <span>Email: </span>
            {userDetail?.email} | <span>Phone: </span>
            {userDetail?.phone}
          </div>
        </div>
      </div>
      {/* POST USER INFO END */}
      {/* POST BLOG START */}
      <div className="blog-container">
        {postData &&
          postData?.length > 0 &&
          postData?.map((items, index) => (
            <div className="blog-post" key={index}>
              <h4>{items?.title}</h4>
              <p>{items?.body}</p>
            </div>
          ))}
      </div>

      {/* POST BLOG END */}
    </div>
  );
};

export default Posts;
