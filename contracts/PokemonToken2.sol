// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4 <0.9.0;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

//contract PokemonToken is ERC721 {

contract PokemonToken2{

    address public owner;
    uint256 tokenId = 1;
    uint256 totalPokemon = 0;
    uint256 totalPokemonDiscovered = 20;
    uint256 totalCoins = 10000000;
    uint256 currCoins = 10000000;

    struct Pokemon{
        uint256 tokenId;
        uint256 pokemonId; 
        address owner;
        uint256 level;
        uint256 exp;
        uint256 attack;
    }

    struct pokemonAttr{
        uint256 indexId;
        uint256 amountInPool;
        uint256 amountMax;
        uint256 attackBase;
        uint256 attackVar;        
    }

    // struct userWallet {
    //     address owner;
    //     uint256 coins;
    // }
    
    uint256[] public idList;

    mapping(address => bool) public playerExists;
    mapping(uint256 => bool) public pokemonExists;
    mapping(uint256 => Pokemon) public allPokemon;
    mapping(address => uint256[]) public pokemonAddress;
    mapping(uint256 => pokemonAttr) public pokemonIndex;
    mapping(address => uint256) public walletAddress;

    event RegisterNewPlayer(address indexed _from, bool _registered);
    event Lottery(address indexed _from, Pokemon _pokemon);
    event TransferPokemon(address indexed _from, address indexed _to, uint256 _pokemonId);
    event TransferCoins(address indexed _from, address indexed _to, uint256 _coins);
    event Fight(address indexed _from, uint256 indexed _pokemonId, Pokemon _pokemon, bool _result, uint256 _coins);
    event ReleaseNewPokemon(uint256 indexed _indexId, uint256 _amountInPool,uint256 _amountMax,uint256 _attackBase,uint256 _attackVar);

    //constructor() ERC721("PokemonToken","CLR") {
    constructor(){
        owner = msg.sender;

        pokemonIndex[1] = pokemonAttr(1,10000,10000,3,4);
        pokemonIndex[2] = pokemonAttr(1,10000,10000,3,4);
        pokemonIndex[3] = pokemonAttr(1,10000,10000,3,4);
        pokemonIndex[4] = pokemonAttr(1,10000,10000,3,4);
        pokemonIndex[5] = pokemonAttr(1,10000,10000,3,4);
        pokemonIndex[6] = pokemonAttr(1,10000,10000,3,4);
        pokemonIndex[7] = pokemonAttr(1,10000,10000,3,4);
        pokemonIndex[8] = pokemonAttr(1,10000,10000,3,4);
        pokemonIndex[9] = pokemonAttr(1,10000,10000,3,4);
        pokemonIndex[10] = pokemonAttr(1,10000,10000,3,4);
        pokemonIndex[11] = pokemonAttr(1,5000,5000,5,4);
        pokemonIndex[12] = pokemonAttr(1,5000,5000,5,4);
        pokemonIndex[13] = pokemonAttr(1,5000,5000,5,4);
        pokemonIndex[14] = pokemonAttr(1,5000,5000,5,4);
        pokemonIndex[15] = pokemonAttr(1,5000,5000,5,4);
        pokemonIndex[16] = pokemonAttr(1,1000,1000,8,6);
        pokemonIndex[17] = pokemonAttr(1,1000,1000,8,6);
        pokemonIndex[18] = pokemonAttr(1,1000,1000,8,6);
        pokemonIndex[19] = pokemonAttr(1,1000,1000,8,6);
        pokemonIndex[20] = pokemonAttr(1,100,100,10,10);

        for (uint8 i=1; i<= totalPokemonDiscovered; i++){
            totalPokemon += pokemonIndex[i].amountInPool;
        }

    }

    function random() private view returns (uint256) {
        // return uint256(keccak256(abi.encodePacked(block.number, block.timestamp, tokenId)));
        return uint256(1);
    }

    function drawPool() private view returns (uint256) {

        uint256 drawResult = random() % totalPokemon;

        for (uint8 i=1; i<= totalPokemonDiscovered; i++){
            if (drawResult<pokemonIndex[i].amountInPool){
                // console.log("drawresult:");
                // console.log(uint256(i));
                // console.log(uint256(i)<<16);
                // console.log(pokemonIndex[i].amountMax-pokemonIndex[i].amountInPool+1);
                // console.log("-----------------");
                return (uint256(i)<<16) + (pokemonIndex[i].amountMax-pokemonIndex[i].amountInPool+1);
            
            }
            
            drawResult -= pokemonIndex[i].amountInPool;
        }

        revert();
    }

    function getTokenId() public view returns (uint256) {
        
        return tokenId;
    
    }

    function getTotalPokemon() public view returns (uint256) {
        
        return totalPokemon;
    
    }
    
    function getTotalPokemonDiscovered() public view returns (uint256) {
        
        return totalPokemonDiscovered;
    
    }

    function getPokemon(uint256[] memory _idList) private view returns (Pokemon[] memory) {

        Pokemon[] memory memoryArray = new Pokemon[](_idList.length);

        for(uint i = 0; i < _idList.length; i++) {
            memoryArray[i] = allPokemon[_idList[i]];

            console.log("tokenId %s, pokemonId  %s, owner  %s", 
            memoryArray[i].tokenId,
            memoryArray[i].pokemonId,
            memoryArray[i].owner);
            console.log("IndexId %s", (memoryArray[i].pokemonId>>16));
            console.log( "level  %s, exp  %s, attack  %s.", memoryArray[i].level, memoryArray[i].exp, memoryArray[i].attack);

        }

        return memoryArray;
        
    }

    function getAllPokemon() public view returns (Pokemon[] memory) {

        console.log("getAllPokemon---------------------------------------------");

        return getPokemon(idList);
    
    }

    function getMyPokemon(address _player) public view returns (Pokemon[] memory) {

        console.log("getMyPokemon ---------------------------------------------");
        
        return getPokemon(pokemonAddress[_player]);
    
    }

    function getMyPokemonList(address _player) public view returns (uint256[] memory) {
        
        for(uint i=0;i<pokemonAddress[_player].length;i++){

            console.log(pokemonAddress[_player][i]);

        }

        return pokemonAddress[_player];

    }

    function getMyCoins(address _player) public view returns (uint256){
    
        return walletAddress[_player];

    }

    function checkPlayerExists(address _player) public view returns (bool){
    
        return playerExists[_player];
    
    }

    function unitCoins(uint256 _unit) public view returns (uint256){

        uint256 temp = totalCoins;

        while (temp/2 > currCoins){
            
            temp = temp/2;

            _unit = _unit/2;

        }

        return _unit;

    }

    function registerNewPlayer() external {
    
        if (!playerExists[msg.sender]){

            walletAddress[msg.sender]=unitCoins(10000);
            
            currCoins = currCoins - unitCoins(10000);

            playerExists[msg.sender]=true;

            console.log(msg.sender, walletAddress[msg.sender]);

            emit RegisterNewPlayer(msg.sender, true);
            
        } 
        else{
            
            emit RegisterNewPlayer(msg.sender, false);

        }

    
    }

    function mintPokemon(address _player) private returns (Pokemon memory){

        uint256 _pokemonId = drawPool();

        //console.log(_pokemonId);

        require(!pokemonExists[_pokemonId], "Pokemon already exists");

        //_safeMint(player, _pokemonId);

        uint256 attack = pokemonIndex[_pokemonId>>16].attackBase + random()%(pokemonIndex[_pokemonId>>16].attackVar);

        Pokemon memory newPokemon = Pokemon(tokenId, _pokemonId, _player, 1, 0, attack);

        allPokemon[_pokemonId]=newPokemon;

        idList.push(_pokemonId);

        //console.log("All Pokemon:------------------------------------------------------------------------------------------");
        // for (uint i=0;i<idList.length;i++){
        //     console.log("tokenId %s, pokemonId  %s, owner  %s", 
        //     allPokemon[idList[i]].tokenId,
        //     allPokemon[idList[i]].pokemonId,
        //     allPokemon[idList[i]].owner);
        //     console.log("IndexId %s", (allPokemon[idList[i]].pokemonId>>16));
        //     console.log( "level  %s, exp  %s, attack  %s.", allPokemon[idList[i]].level, allPokemon[idList[i]].exp, allPokemon[idList[i]].attack);
        // }

        pokemonAddress[_player].push(_pokemonId);

        // console.log("Player's Pokemon:-------------------------------------------------------------------------------------");
        // for (uint i=0;i<pokemonAddress[player].length;i++){
        //     console.log("tokenId %s, pokemonId  %s, owner  %s", 
        //     allPokemon[pokemonAddress[player][i]].tokenId,
        //     allPokemon[pokemonAddress[player][i]].pokemonId,
        //     allPokemon[pokemonAddress[player][i]].owner);
        //     console.log("IndexId %s", (allPokemon[pokemonAddress[player][i]].pokemonId>>16));
        //     console.log( "level  %s, exp  %s, attack  %s.",allPokemon[pokemonAddress[player][i]].level, 
        //     allPokemon[pokemonAddress[player][i]].exp, 
        //     allPokemon[pokemonAddress[player][i]].attack);
        // }

        pokemonExists[_pokemonId] = true;

        tokenId++;
        
        totalPokemon--;

        pokemonIndex[_pokemonId>>16].amountInPool--;

        //console.log("pokemonId %s, pokemonIndex amount in %s", _pokemonId>>16, pokemonIndex[_pokemonId>>16].amountInPool);

        return newPokemon;

    }

    function lottery() external{

        require(playerExists[msg.sender], "Player not registered!");

        if (walletAddress[msg.sender]>=100){

            walletAddress[msg.sender]-= 100;

            currCoins += 100;

            Pokemon memory newPokemon = mintPokemon(msg.sender);
            // console.log("New Pokemon---------------------------------");
            // console.log("tokenId %s, pokemonId  %s, owner  %s", 
            // newPokemon.tokenId,
            // newPokemon.pokemonId,
            // newPokemon.owner);
            // console.log("IndexId %s", (newPokemon.pokemonId>>16));
            // console.log( "level  %s, exp  %s, attack  %s.",newPokemon.level, newPokemon.exp, newPokemon.attack);
            // console.log("-------------------------------------------------");
            emit Lottery(msg.sender, newPokemon);

        }
        else{

            revert('No enough coins!');

        }

    }
    
    function transferPokemon(address _to, uint256 _pokemonId) external {

        require(playerExists[msg.sender], "Current player not registered!");

        require(playerExists[_to], "Target player not registered!");

        require(pokemonExists[_pokemonId], "Exchange pokemon not exsits!");

        require(allPokemon[_pokemonId].owner == msg.sender, "Pokemon doesn't belong to curr player!");

        allPokemon[_pokemonId].owner = _to;

        for (uint i=0; i<pokemonAddress[msg.sender].length; i++){

            if (pokemonAddress[msg.sender][i]==_pokemonId){
                
                pokemonAddress[msg.sender][i] = pokemonAddress[msg.sender][ pokemonAddress[msg.sender].length-1];

                pokemonAddress[msg.sender].pop();

            }

        }

        pokemonAddress[_to].push(_pokemonId);

        emit TransferPokemon(msg.sender, _to, _pokemonId);
        
    }

    function transferCoins(address _to, uint256 _coins) external {

        require(playerExists[msg.sender], "Current player not registered!");

        require(playerExists[_to], "Target player not registered!");

        require(walletAddress[msg.sender]>=_coins, "Doesn't have enough coins!");

        walletAddress[_to] += _coins;

        walletAddress[msg.sender] -= _coins;

        console.log("to:%s, from:%s", walletAddress[_to], walletAddress[msg.sender]);

        emit TransferCoins(msg.sender, _to, _coins);
        
    }

    function fight(uint256 _pokemonId) external{

        require(pokemonExists[_pokemonId],"Pokemon doesn't exsits!");

        require(allPokemon[_pokemonId].owner==msg.sender,"This is not your pokemon!");

        uint256 component = random() % idList.length;

        console.log("fight detail ---------------------------------------------");
        console.log("My : tokenId %s, pokemonId  %s, owner  %s", 
            allPokemon[_pokemonId].tokenId,
            allPokemon[_pokemonId].pokemonId,
            allPokemon[_pokemonId].owner);
        console.log("IndexId %s", (allPokemon[_pokemonId].pokemonId>>16));
        console.log( "level  %s, exp  %s, attack  %s.",allPokemon[_pokemonId].level, 
            allPokemon[_pokemonId].exp, 
            allPokemon[_pokemonId].attack);
        console.log("coins: %s", walletAddress[allPokemon[_pokemonId].owner]);

        console.log("Component: tokenId %s, pokemonId  %s, owner  %s", 
            allPokemon[idList[component]].tokenId,
            allPokemon[idList[component]].pokemonId,
            allPokemon[idList[component]].owner);
        console.log("IndexId %s", (allPokemon[idList[component]].pokemonId>>16));
        console.log( "level  %s, exp  %s, attack  %s.",allPokemon[idList[component]].level, 
            allPokemon[idList[component]].exp, 
            allPokemon[idList[component]].attack);
        console.log("coins: %s", walletAddress[allPokemon[idList[component]].owner]);

        if ( (random() % (allPokemon[_pokemonId].attack+allPokemon[idList[component]].attack)) <allPokemon[_pokemonId].attack ){


            allPokemon[_pokemonId].exp += 10 * allPokemon[idList[component]].level;

            console.log(allPokemon[_pokemonId].exp);

            while (allPokemon[_pokemonId].exp>=allPokemon[_pokemonId].level*10) {
                
                allPokemon[_pokemonId].exp -= allPokemon[_pokemonId].level*10;

                allPokemon[_pokemonId].level += 1;

                allPokemon[_pokemonId].attack += random() % 3;
                
            }

            walletAddress[msg.sender] += unitCoins(20);

            currCoins -= unitCoins(20);

            console.log("Win!");
            console.log("My : pokemonId  %s, owner  %s, IndexId %s", allPokemon[_pokemonId].pokemonId,allPokemon[_pokemonId].owner,(allPokemon[_pokemonId].pokemonId>>16));
            console.log( "level  %s, exp  %s, attack  %s.",allPokemon[_pokemonId].level, allPokemon[_pokemonId].exp, allPokemon[_pokemonId].attack);
            console.log("coins: %s", walletAddress[allPokemon[_pokemonId].owner]);
            
            emit Fight(msg.sender, _pokemonId, allPokemon[_pokemonId], true, walletAddress[msg.sender]);

        }
        else{

            allPokemon[_pokemonId].exp += 5 * allPokemon[idList[component]].level;

            while (allPokemon[_pokemonId].exp>=allPokemon[_pokemonId].level*10) {
                
                allPokemon[_pokemonId].exp -= allPokemon[_pokemonId].level*10;

                allPokemon[_pokemonId].level += 1;

                allPokemon[_pokemonId].attack += random() % 3;
                
            }

            console.log("Loss!");
            console.log("My : pokemonId  %s, owner  %s, IndexId %s", allPokemon[_pokemonId].pokemonId,allPokemon[_pokemonId].owner,(allPokemon[_pokemonId].pokemonId>>16));
            console.log( "level  %s, exp  %s, attack  %s.",allPokemon[_pokemonId].level, allPokemon[_pokemonId].exp, allPokemon[_pokemonId].attack);
            console.log("coins: %s", walletAddress[allPokemon[_pokemonId].owner]);

            emit Fight(msg.sender, _pokemonId, allPokemon[_pokemonId], false, walletAddress[msg.sender]);

        }

    }

    function releaseNewPokemon(uint256 _amountInPool,uint256 _amountMax,uint256 _attackBase,uint256 _attackVar) external{
        require(owner==msg.sender,"Only GM can release new pokemon!");

        totalPokemonDiscovered ++;
        
        pokemonIndex[totalPokemonDiscovered] = pokemonAttr(totalPokemonDiscovered,_amountInPool,_amountMax,_attackBase,_attackVar);

        totalPokemon += _amountInPool;

        emit ReleaseNewPokemon(totalPokemonDiscovered,_amountInPool,_amountMax,_attackBase,_attackVar);
        
    }

}