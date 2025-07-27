import React, { useContext, useState } from "react";
import Style from "./NavBar.module.css";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model } from "../index";
import images from "../../assets";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const menuItems = [
    { menu: "All users", link: "alluser" },
    { menu: "CHAT", link: "/" },
    { menu: "CONTACT", link: "/" },
    { menu: "SETTING", link: "/" },
    { menu: "FAQS", link: "/" },
    { menu: "TERMS OF USES", link: "/" },
  ];

  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet } = useContext(ChatAppContext);

  return (
    <nav className={Style.NavBar} aria-label="Main navigation">
      <div className={Style.NavBar_Box}>
        <div className={Style.NavBar_Box_left}>
          <Image src={images.logo} alt="Logo" width={50} height={50} priority />
        </div>
        <div className={Style.NavBar_Box_right}>
          <div className={Style.NavBar_Box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${Style.NavBar_Box_right_menu_items} ${
                  active === i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link
                  className={Style.NavBar_Box_right_menu}
                  href={el.link}
                  aria-current={active === i + 1 ? "page" : undefined}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
          <div className={`${Style.mobile_menu} ${open ? Style.open : ""}`}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => {
                  setActive(i + 1);
                  setOpen(false);
                }}
                key={i}
                className={`${Style.mobile_menu_items} ${
                  active === i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link className={Style.mobile_menu_items} href={el.link}>
                  {el.menu}
                </Link>
              </div>
            ))}
            <p className={Style.mobile_menu_btn}>
              <Image
                src={images.close}
                alt="Close menu"
                width={50}
                height={50}
                onClick={() => setOpen(false)}
              />
            </p>
          </div>
          <div className={Style.NavBar_Box_right_connect}>
            {account === "" ? (
              <button onClick={() => connectWallet()}>
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>
          <div
            className={Style.NavBar_box_right_open}
            onClick={() => setOpen(true)}
            role="button"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Image src={images.open} alt="Open menu" width={30} height={30} />
          </div>
        </div>
      </div>
      {openModel && <Model setOpenModel={setOpenModel} />}
    </nav>
  );
};

export default NavBar;