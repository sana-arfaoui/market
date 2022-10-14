import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/dukkan2.png";
import { useSelector } from "react-redux";
const Footer = () => {
  const { store } = useSelector((state) => {
    return state.storeReducers;
  });
  return (
    <footer className="bg-Primary flex flex-col w-full px-16 py-3 gap-y-1 flex-wrap">
      <div className="flex justify-around items-center">
        <div className="flex gap-5 items-center ">
          <div className="flex flex-col items-center justify-center gap-5">
            <Link className="w-20 h-20" to={`/home/${localStorage.store}`}>
              <img
                className="object-cover rounded-full  w-full h-full"
                src={store?.logo}
                alt="montaProduct"
              />
            </Link>
            <Link to={`/home/${localStorage.store}`}>
              <img className="max-w-[5rem] " src={logo} alt="montaProduct" />
            </Link>
          </div>
          <div className="text-white flex flex-col gap-2">
            <h1>{store?.title}</h1>
            <p className="max-w-sm sm:max-w-xs">{store?.bio}</p>
          </div>
        </div>
        <div className="grid  grid-rows-1 grid-flow-col gap-4 sm:grid-rows-2 text-white ">
          <div className="flex flex-col gap-2">
            <h1>home</h1>
            <div>
              <div>category</div>
              <div>About us</div>
              <div>Help</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1>OUR PRODUCT</h1>
            <div>
              <div>cars</div>
              <div>Motorcycles</div>
              <div>bicycles</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1>About us</h1>
            <div>
              <div>Our story</div>
              <div>Team</div>
              <div>Careers</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1>Contact us</h1>
            <div className="max-w-[13rem]">
              Short description goes gere here herehere
            </div>

            <div className="flex gap-2 ">
              <Link to="">
                {/* <img className="max-w-[2rem]" src={facebook} alt="facebook" /> */}
                <i className="fa-brands fa-facebook"></i>
              </Link>
              <Link to="">
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <a
                href="https://www.linkedin.com/in/themri-montassar-160042149/"
                // target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-1 grid-flow-col text-white text-xs place-items-center">
        <p className="w-fit">Compyright 2022</p>
        <p className="w-fit">Privacy Policy </p>
        <p className="w-fit">Terms & Conditions </p>
      </div>
    </footer>
  );
};

export default Footer;
