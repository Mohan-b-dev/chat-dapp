import { useRouter } from "next/router";
import React, { useState, useEffect, createContext } from "react";

// INTERNAL IMPORT
import {
  checkIfWalletIsConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";

export const ChatAppContext = createContext();

export const ChatAppProvider = ({ children }) => {
    //USESTATE
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    //CHAT USER DATA
    const [currentUserName,setCurrentUserName] = useState("")
    const [currentUserAddress,setCurrentUserAddress] = useState("")

    const router = useRouter();

    //FETCH DATA TIME OF PAGE LOAD
    const fetchData = async () => {
        try {
            //GET CONTRACT
            const contract = await connectingWithContract();

            //GET ACCOUNT
            const connectAccount = await connectWallet();
            setAccount(connectAccount);

            //GET USER NAME
            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);

            //GET MY FRIEND LIST
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);

            //GET ALL APP USER LIST
            const userList = await contract.getAllAppUsers();
            setUserLists(userList);
        } catch (e) {
            setError("Please Install And Connect Your Wallet")
        }
    };

    useEffect(() => {
        fetchData();
    },[])

    return (
    <ChatAppContext.Provider value={{  }}>
      {children}
    </ChatAppContext.Provider>
  );
};
