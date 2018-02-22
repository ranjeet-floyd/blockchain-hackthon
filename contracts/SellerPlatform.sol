pragma solidity ^0.4.6;

contract SellerPlatform {
    struct Product {
        string Name;
        string Company;
        uint LocationId; // returnm 
        uint PreviousLocationId; // return 
        uint Timestamp;
        string Secret;
        string status;
    }
    
    // Maintain product history 
    mapping(uint => Product) Trail;
    uint8 TrailCount=0;

    function AddNewProduct(string Company, string Name, uint LocationId ,string Secret) {
        // new product in memory
        Product memory newProduct;
        newProduct.Name = Name;
        newProduct.Company = Company;
        newProduct.LocationId = LocationId;
        newProduct.Secret = Secret;
        newProduct.Timestamp = now;
        // 
        if(TrailCount!=0) {
            newProduct.PreviousLocationId= Trail[TrailCount].LocationId;
        }
        Trail[TrailCount] = newProduct;
        TrailCount++;
    }
    function GetTrailCount() returns(uint8) {
        return TrailCount;
    }

    function GetLocation(uint8 TrailNo) returns (string,uint,uint,uint,string) {
        return (Trail[TrailNo].Name, Trail[TrailNo].LocationId, Trail[TrailNo].PreviousLocationId, Trail[TrailNo].Timestamp,Trail[TrailNo].Secret);
    }
}