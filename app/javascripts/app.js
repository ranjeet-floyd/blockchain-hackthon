// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'


// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var foodSafeContract;
var foodSafeCode;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account =  accounts[0];//"0x4317a6ad1efcdcde61d06962408db5fe499c9c08";//accounts[0];
      // web3.eth.defaultAccount = account;//"0x4317a6ad1efcdcde61d06962408db5fe499c9c08"//account;
      // var foodSafeSource = "pragma solidity ^0.4.19;\n\ncontract FoodSafe {\n\n    struct Location {\n        string Name;\n        uint LocationId;\n        uint PrevLocaltionId;\n        uint Timestamp;\n        string Secret;\n    }\n    \n    mapping(uint => Location) Trail;\n\n    \n    uint8 TrailCount = 0;\n\n    \n    function addNewLocaltion(uint LocationId, string Name, string Secret ) {\n\n        \n        Location memory newLocation; \n\n        newLocation.LocationId = LocationId;\n        newLocation.Name = Name;\n        newLocation.Secret = Secret;\n        newLocation.Timestamp = now;\n\n        \n        if (TrailCount != 0 ) {\n\n            newLocation.PrevLocaltionId = Trail[TrailCount].LocationId;\n        }\n\n        Trail[TrailCount] = newLocation;\n\n        TrailCount++;\n        \n    }\n\n    \n    function currentTrailCount() returns (uint8) {\n        return TrailCount;\n        \n    }\n\n    \n\n    function getLocation(uint8 TrailNo) returns(string, uint, uint, uint, string) {\n        var TrailNoLocation = Trail[TrailNo];\n        return (TrailNoLocation.Name, TrailNoLocation.LocationId, TrailNoLocation.PrevLocaltionId, TrailNoLocation.Timestamp\n        , TrailNoLocation.Secret);\n        \n    }\n\n\n\n\n}";
      // web3.eth.compile.solidity(foodSafeSource, function(err, foodSafeCompiled){
      //   if(err){
      //     console.error(err);
      //     return;
      //   }
      //   console.log(foodSafeCompiled);
      //   foodSafeABI = foodSafeCompiled['<stdin>:FoodSafe'].info.abiDefinition;
      //   foodSafeContract = web3.eth.contract(foodSafeABI);
      //   // get actual binary code from compiled contract
      //   foodSafeCode = foodSafeCompiled['<stdin>:FoodSafe'].code;

      // });

       foodSafeContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"LocationId","type":"uint256"},{"name":"Name","type":"string"},{"name":"Secret","type":"string"}],"name":"addNewLocaltion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"currentTrailCount","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"TrailNo","type":"uint8"}],"name":"getLocation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]);
       foodSafeCode = '0x60606040526000600160006101000a81548160ff021916908360ff160217905550341561002b57600080fd5b6106658061003a6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680637a1279f51461005c578063a5df601f14610105578063c0d25cf814610134575b600080fd5b341561006757600080fd5b610103600480803590602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610254565b005b341561011057600080fd5b610118610388565b604051808260ff1660ff16815260200191505060405180910390f35b341561013f57600080fd5b610158600480803560ff1690602001909190505061039f565b604051808060200186815260200185815260200184815260200180602001838103835288818151815260200191508051906020019080838360005b838110156101ae578082015181840152602081019050610193565b50505050905090810190601f1680156101db5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156102145780820151818401526020810190506101f9565b50505050905090810190601f1680156102415780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b61025c610530565b83816020018181525050828160000181905250818160800181905250428160600181815250506000600160009054906101000a900460ff1660ff161415156102d057600080600160009054906101000a900460ff1660ff168152602001908152602001600020600101548160400181815250505b80600080600160009054906101000a900460ff1660ff168152602001908152602001600020600082015181600001908051906020019061031192919061056c565b50602082015181600101556040820151816002015560608201518160030155608082015181600401908051906020019061034c92919061056c565b509050506001600081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff1602179055505050505050565b6000600160009054906101000a900460ff16905090565b6103a76105ec565b60008060006103b46105ec565b60008060008860ff16815260200190815260200160002090508060000181600101548260020154836003015484600401848054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104795780601f1061044e57610100808354040283529160200191610479565b820191906000526020600020905b81548152906001019060200180831161045c57829003601f168201915b50505050509450808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105155780601f106104ea57610100808354040283529160200191610515565b820191906000526020600020905b8154815290600101906020018083116104f857829003601f168201915b50505050509050955095509550955095505091939590929450565b60a060405190810160405280610544610600565b8152602001600081526020016000815260200160008152602001610566610600565b81525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106105ad57805160ff19168380011785556105db565b828001600101855582156105db579182015b828111156105da5782518255916020019190600101906105bf565b5b5090506105e89190610614565b5090565b602060405190810160405280600081525090565b602060405190810160405280600081525090565b61063691905b8082111561063257600081600090555060010161061a565b5090565b905600a165627a7a723058205254bcd1f509885e3b82586a844f370ee38b8ec750dad5bc1b921aa1e58b0d350029';
      
    });
  },

  createContract:  function(){

    // optinal param, txt param ,call back function
    var foodsafe = foodSafeContract.new(
      {
        from: account, 
        data: foodSafeCode,
        gas: '3000000'
      }, function (e, contract){
       console.log(e, contract);
      web3.eth.getTransaction(contract.transactionHash, function(err , transaction) {
        console.log(transaction);
      });
       
       if (typeof contract.address !== 'undefined') {

        document.getElementById("contractAddress").value = contract.address;
            console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
       }
    });
    // foodSafeContract.new("10", {from: account, data: foodSafeCode, gas:3000000}, function(err, deployedContract){
    //     if(err){
    //       console.error(err);
    //       return ;
    //     }
    //     if(deployedContract.address){
    //       alert(deployedContract.address);
    //       document.getElementById("contractAddress").value = deployedContract.address;
    //     }
    // });
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});
