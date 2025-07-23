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

    struct AllUserStruct{
        string name;
        address accountAdress;
    }

    AllUserStruct[] getAllUsers;

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

        getAllUsers.push(AllUserStruct(name, msg.sender));
    }

    //GET USERNAME
    function getUsername(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey), "User is not registered");
        return usersList[pubkey].name;
    }

    //ADD FRIEND
    function addFriend(address friend_key, string calldata name) external{
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(msg.sender != friend_key, "User cannot add themselves as a friend");
        require(checkAlreadyFriend(msg.sender,friend_key)==false,"These User are already friend");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, usersList[msg.sender].name);
    }

    //checkAlreadyFriend
    function checkAlreadyFriend(address pubkey1,address pubkey2)internal view return(bool){

        if(userList[pubkey1].friendList.length> userList[pubkey2].friendList.length){
            address temp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = temp;
        }

        for(uint256 i=0;i<usersList[pubkey1].friendList.length;i++){
            if(usersList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    function _addFriend(address me,address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key, name);
        usersList[me].friendList.push(newFriend);
    }

    //GETMY FRIEND
    function getMyFriendList() external view returns(friend[] memory){
        return usersList[msg.sender].friendList;
    }

    //GET CHAT CODE
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32){
        if(pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else {
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }

    }

    //SEND MESSAGE
    function sendMessage(address friend_key, string calldata _msg) external{
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(checkAlreadyFriend(msg.sender, friend_key), "You are not friends with the given user");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMessage = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMessage);
    }

    //READ MESSAGE
    function readMessages(address friend_key) external view returns(message[] memory){
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(checkAlreadyFriend(msg.sender, friend_key), "You are not friends with the given user");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUsers() public view returns(AllUserStruct[] memory){
        return getAllUsers;
    }
}