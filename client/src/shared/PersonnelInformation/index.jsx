import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateMyInfo } from "../../redux/Actions/auth.action";
import { parseISO, format } from "date-fns";
import {
  getMyProfile,
  updateMyProfile,
} from "../../redux/Actions/profile.action";
const PersonnelInformation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => {
    return state.authReducers;
  });

  const { isLoading, profile } = useSelector((state) => {
    return state.profileReducers;
  });
  const [file, setFile] = useState(null);
  const [birthDay, setBirthDay] = useState("");
  const [url, setUrl] = useState(profile?.avatar);
  //console.log(birthDay);
  const [Form, setForm] = useState({
    email: user?.email,
    oldPassword: "",
    firstName: user?.firstName,
    lastName: user?.lastName,
    number: user?.number,
    password: "",
  });
  const onInputChange = (e) => {
    e.preventDefault();
    setForm({ ...Form, [e.target.name]: e.target.value });
    console.log(Form);
  };
  const onSubmitAddress = (e) => {
    e.preventDefault();

    const newProfile = new FormData();
    newProfile.append("avatar", file);
    newProfile.append("birthday", birthDay);
    // newProfile.append("bio", bio);

    dispatch(updateMyProfile(newProfile));
    dispatch(updateMyInfo(Form));
    setForm({
      ...Form,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      number: user?.number,
    });
  };

  // const updateAvatar =(e)=>{

  //   const newProfile = new FormData();
  //   newProfile.append("avatar", file);
  //   dispatch(updateMyProfile(newProfile));
  // }
  useEffect(() => {
    if (user) {
      setForm({
        ...Form,
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        number: user?.number,
      });
      setUrl(user.profile?.avatar);
      //setBirthDay(format(parseISO(profile?.birthday), "P"));
    }
  }, [user]);

  return (
    <div className=" m-auto flex flex-row md:flex-col justify-around p-5 items-center">
      <form onSubmit={(e) => onSubmitAddress(e)} className="w-1/2">
        <div className="w-full flex -mx-3 sm:flex-col">
          <div className="w-1/2 px-3 mb-5">
            <label htmlFor="" className="text-xs font-semibold px-1">
              First name
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
              </div>
              <input
                onChange={(e) => onInputChange(e)}
                value={Form.firstName}
                type="text"
                name="firstName"
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="John"
              />
            </div>
          </div>
          <div className="w-1/2 px-3 mb-5">
            <label htmlFor="" className="text-xs font-semibold px-1">
              Last name
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
              </div>
              <input
                onChange={(e) => onInputChange(e)}
                value={Form.lastName}
                type="text"
                name="lastName"
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="Smith"
              />
            </div>
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <label htmlFor="" className="text-xs font-semibold px-1">
              Email
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
              </div>
              <input
                onChange={(e) => onInputChange(e)}
                value={Form.email}
                type="email"
                name="email"
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="johnsmith@example.com"
              />
            </div>
          </div>
        </div>
        <div className="flex -mx-3 sm:flex-col">
          <div className="w-full px-3 mb-5">
            <label htmlFor="" className="text-xs font-semibold px-1">
              Password
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
              </div>
              <input
                onChange={(e) => onInputChange(e)}
                value={Form.oldPassword}
                type="password"
                name="oldPassword"
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="************"
              />
            </div>
          </div>
          <div className="w-full px-3 mb-5">
            <label htmlFor="" className="text-xs font-semibold px-1">
              New Password
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
              </div>
              <input
              required
                onChange={(e) => onInputChange(e)}
                value={Form.password}
                type="password"
                name="password"
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="************"
              />
            </div>
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <label htmlFor="Number" className="text-xs font-semibold px-1">
              Number
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
              </div>
              <input
                onChange={(e) => onInputChange(e)}
                value={Form.number}
                type="number"
                name="number"
                id="Number"
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="0000000"
              />
            </div>
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <label htmlFor="Number" className="text-xs font-semibold px-1">
              birthDay
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
              </div>
              <input
                onChange={(e) => setBirthDay(e.target.value)}
                value={birthDay}
                type="date"
                name="birthday"
                id="birthday"
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="0000000"
              />
            </div>
          </div>
        </div>

        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <button
              type="submit"
              className="block w-full max-w-xs mx-auto bg-info hover:bg-infoDark focus:bg-infoDark text-white rounded-lg px-3 py-3 font-semibold"
            >
              Update NOW
            </button>
          </div>
        </div>
      </form>

      <div className=" w-96 h-96 md:w-48 md:h-48  sm:w-24 sm:h-24 relative">
        <img
          src={url}
          alt="..."
          className="shadow rounded-full object-cover  w-full h-full border-none "
        />

        <label
          htmlFor="image"
          className=" absolute bottom-10   left-[calc(50%-35px) flex flex-col items-center bg-info rounded-md text-white  py-1  w-[25%]"
        >
          <p className="text-xs sm:truncate sm:w-0 sm:h-0"> Upload image</p>
          <i className="fa-solid fa-upload"></i>
        </label>

        <input
          hidden
          type="file"
          name="image"
          id="image"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]));
            //  updateAvatar(e);
          }}
        />
      </div>
    </div>
  );
};

export default PersonnelInformation;
