//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract ChatApp{

    //USER STRUCT
    struct user{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubkey;
        string name;
    }

    struct message{
        address sender;
        string content;
        uint256 timestamp;
    }

    mapping(address => user) public usersList;
    mapping(bytes32 => message[]) public allMessages;

    //CHECK USER EXIST
    function checkUserExists(address pubkey) public view returns(bool){
        return bytes(usersList[pubkey].name).length > 0;
    }

    //CREATE ACCOUNT
    function createAccount(string calldata name) external {
        require(!checkUserExists(msg.sender), "User already exists");
        require(bytes(name).length > 0, "Name cannot be empty");
        usersList[msg.sender].name = name;
        //usersList[msg.sender] = user(name, new friend[](0));
    }

    //GET USERNAME
    function getUsername(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey), "User is not registered");
        return usersList[pubkey].name;
    }

    //ADD FRIEND


}