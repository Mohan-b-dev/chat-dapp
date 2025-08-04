import React, { useContext, useState } from "react";
import Style from "./NavBar.module.css";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model } from "../index"; // Ensure Model is correctly imported
// Import the Error component if it exists, e.g.:
// import { Error } from "../index";
import images from "../../assets";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const menuItems = [
    { menu: "All users", link: "/alluser" },
    { menu: "CHAT", link: "/" },
    { menu: "CONTACT", link: "/" },
    { menu: "SETTING", link: "/" },
    { menu: "FAQS", link: "/" },
    { menu: "TERMS OF USES", link: "/" },
  ];

  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error } = useContext(ChatAppContext);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (err) {
      console.error("Wallet connection failed:", err);
      alert(
        "Failed to connect wallet. Please ensure MetaMask is installed and try again."
      );
    }
  };

  // Fallback Error component if not imported
  const Error = ({ error }) => (
    <div className={Style.error}>
      <p>Error: {error}</p>
    </div>
  );

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
            {account ? (
              <button onClick={() => setOpenModel(true)}>
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />
                <small>{userName || "Create Account"}</small>
              </button>
            ) : (
              <button onClick={handleConnectWallet}>
                <span>Connect Wallet</span>
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

      {/* MODAL COMPONENT */}
      {!openModel && (
        <div className={Style.modelBox}>
          <Model
            openBox={setOpenModel}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="AI Overview: A chat application built on a Decentralized Application (DApp) architecture leverages blockchain technology to provide a secure, private, and censorship-resistant messaging platform. Unlike traditional centralized chat applications, DApp-based chat solutions do not rely on a single server or entity to store and manage user data and communications."
            smallInfo="KINDLY SELECT YOUR NAME..."
            image={images.hero}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}

      {/* ERROR HANDLING */}
      {error && error !== "" && <Error error={error} />}
    </nav>
  );
};

export default NavBar;