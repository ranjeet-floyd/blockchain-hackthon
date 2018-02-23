pragma solidity ^0.4.6;

contract SellerPlatform {
    
    //Ref : https://coursetro.com/posts/code/102/Solidity-Mappings-&-Structs-Tutorial
    struct Product {
        string Name;
        uint Id;
        string Status;
        uint Quantity;
        uint256 Timestamp;
    }

    
    
    // Maintain product block history 
    mapping(uint => Product) ProductReg;
    uint8 ProductRegCount=0;


    // sold product
     mapping(uint => Product) ProductSold;
     uint8 ProductSoldCount=0;

    // delibver product
     mapping(uint => Product) ProductDelivered;
     uint8 ProductDeliverCount=0;


    function RegisterProduct(string Name, uint Quantity)  returns(string, uint, string , uint, uint) {
        Product memory newProduct;
        newProduct.Name = Name;
        newProduct.Quantity = Quantity;
        newProduct.Status = "REGISTERED";
        newProduct.Id = ProductRegCount;
        newProduct.Timestamp = block.timestamp;
        ProductReg[newProduct.Id] = newProduct;    
        ProductRegCount++;
        return (newProduct.Name,newProduct.Id,newProduct.Status, block.number,ProductRegCount);
    }

    // registration of product
    function sellProduct(uint ProductId)  returns(string, uint, string , uint, uint) {
        var newProduct = ProductReg[ProductId];
        newProduct.Status = "SOLD";
        ProductSold[ProductSoldCount] = newProduct;
        ProductSoldCount++;
        return (newProduct.Name,newProduct.Id,newProduct.Status, block.number,ProductSoldCount);

    }

    function DeliverProduct(uint ProductId) returns(string, uint, string , uint, uint) {
        var newProduct = ProductReg[ProductId];
        newProduct.Status = "DELIVERED";
        ProductDelivered[ProductDeliverCount] = newProduct;
        ProductDeliverCount++;
        return (newProduct.Name,newProduct.Id,newProduct.Status, block.number,ProductDeliverCount);
    
    }

    function GetRegProductCount() constant returns(uint) {
        return ProductRegCount;
        
    }

    function GetSoldProductCount() constant returns(uint) {
        return ProductSoldCount;
        
    }

    function GetDeliveredProductCount()  constant returns(uint) {
        return ProductDeliverCount;
        
    }
    function GetProduct(uint ProductId) constant returns (string) {
        return ProductReg[ProductId].Name;
    }
}