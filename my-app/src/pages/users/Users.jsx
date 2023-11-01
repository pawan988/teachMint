import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/users";

import "./Users.css";

const UserInfoBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});
  const getUserListData = useSelector((state) => state && state?.user);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  useEffect(() => {
    if (getUserListData) {
      setUserData(getUserListData);
    }
  }, [getUserListData]);
  const navigateToPost = (items) => {
    navigate("/posts", { state: items });
  };

  return (
    <div className="user-info-container">
      <div className="user-heading">
        <h1>Users list</h1>
      </div>
      {getUserListData?.usersData &&
        getUserListData?.usersData?.length > 0 &&
        getUserListData?.usersData?.map((items, index) => {
          return (
            <div
              className="user-info-box"
              onClick={() => {
                navigateToPost(items);
              }}
              key={index}
            >
              <div className="user-name-box">
                <span>Name: </span>
                {items?.name}
              </div>
              <div className="user-name-box">
                <span>Posts: </span>12
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserInfoBox;
