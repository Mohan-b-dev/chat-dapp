import React, { useState, useContext } from "react";
import Image from "next/image";
import styles from "./Model.module.css"
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Loader } from "../../Components/index";

const Modal = ({
  openBox,
  title,
  head,
  info,
  smallInfo,
  image,
  functionName,
  address,
}) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [error, setError] = useState("");
  const { loading } = useContext(ChatAppContext);

  const handleSubmit = () => {
    if (!name || !accountAddress) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    if (functionName) {
      functionName({ name, accountAddress });
    }
  };

  return (
    <div className={styles.Modal} role="dialog" aria-labelledby="modal-title">
      <div className={styles.Modal_box}>
        <div className={styles.Modal_box_left}>
          <Image
            src={image}
            alt="Modal image"
            width={700}
            height={700}
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className={styles.Modal_box_right}>
          <h1 id="modal-title">
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>
          {error && <p className={styles.Modal_error}>{error}</p>}
          <div className={styles.Modal_box_right_name}>
            <div className={styles.Modal_box_right_name_info}>
              <Image
                src={images.username}
                alt="User icon"
                width={24}
                height={24}
                className={styles.Modal_icon}
              />
              <label htmlFor="name-input" className={styles.Modal_label}>
                Your Name
              </label>
              <input
                id="name-input"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.Modal_input}
                aria-describedby="name-error"
              />
            </div>
            <div className={styles.Modal_box_right_name_info}>
              <Image
                src={images.account}
                alt="Account icon"
                width={24}
                height={24}
                className={styles.Modal_icon}
              />
              <label htmlFor="address-input" className={styles.Modal_label}>
                Account Address
              </label>
              <input
                id="address-input"
                type="text"
                placeholder={address || "Enter address..."}
                value={accountAddress}
                onChange={(e) => setAccountAddress(e.target.value)}
                className={styles.Modal_input}
                aria-describedby="address-error"
              />
            </div>
            <div className={styles.Modal_box_right_name_btn}>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`${styles.Modal_button} ${styles.Modal_button_submit}`}
                aria-label="Submit form"
              >
                <Image
                  src={images.send}
                  alt=""
                  width={24}
                  height={24}
                  className={styles.Modal_button_icon}
                />
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button
                onClick={() => openBox(false)}
                disabled={loading}
                className={`${styles.Modal_button} ${styles.Modal_button_cancel}`}
                aria-label="Cancel and close modal"
              >
                <Image
                  src={images.close}
                  alt=""
                  width={24}
                  height={24}
                  className={styles.Modal_button_icon}
                />
                Cancel
              </button>
            </div>
          </div>
          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
