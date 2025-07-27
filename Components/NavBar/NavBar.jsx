import React, { useContext, useState } from "react";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import images from "../../assets";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const menuItems = [
    {
      menu: "All users",
      link: "/alluser",
    },
    {
      menu: "CHAT",
      link: "/",
    },
    {
      menu: "CONTACT",
      link: "/",
    },
    {
      menu: "SETTING",
      link: "/",
    },
    {
      menu: "FAQS",
      link: "/",
    },
    {
      menu: "TERMS OF USES",
      link: "/",
    },
  ];

  //USESTATE
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet } = useContext(ChatAppContext);
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_Box}>
        <div className={Style.NavBar_Box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={Style.NavBar_Box_right}>
          {/*DESKTOP */}
          <div className={Style.NavBar_Box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i}
                className={`${Style.NavBar_Box_right_menu_items} ${
                  active == i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link className={Style.NavBar_Box_right_menu} href={el.link}>
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>

          {/*MOBILE */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i}
                  className={`${Style.mobile_menu_items} ${
                    active == i + 1 ? Style.active_btn : ""
                  }`}
                >
                  <Link className={Style.mobile_menu_items_link} href={el.link}>
                    {el.menu}
                  </Link>
                </div>
              ))}
              <p className={Style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}

          {/*CONNECT WALLET */}
          <p>hi</p>
          <div className={Style.NavBar_Box_right_connect}>
            {account == "" ? (
              <button onClick={() => connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                {""}
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                    width={20}
                    height={20}
                  />
                  {""}
                  <small>{userName||"create Account" }</small>
              </button>
            )}
          </div>

          <div className={Style.NavBar_Box_right_open} onClick={() => setOpen(true)}>
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
