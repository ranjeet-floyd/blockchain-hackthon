pragma solidity ^0.4.6;

contract SellerPlatform {
    
    //Ref : https://coursetro.com/posts/code/102/Solidity-Mappings-&-Structs-Tutorial
    struct Product {
        string Name;
        uint Id;
        string Status;
        uint Quantity;
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


    function RegisterProduct(string Name) constant returns(string, uint, string) {
        Product memory newProduct;
        newProduct.Name = Name;
        newProduct.Quantity = 1;
        newProduct.Status = "REGISTERED";
        newProduct.Id = ProductRegCount;//now();
        ProductReg[ProductRegCount] = newProduct;    
        ProductRegCount++;
        return (newProduct.Name,newProduct.Id,newProduct.Status);
    }

    // registration of product
    function sellProduct(uint ProductId) constant returns(string) {
        var newProduct = ProductReg[ProductId];
        newProduct.Status = "SOLD";
        ProductSold[ProductSoldCount] = newProduct;
        ProductSoldCount++;
        return newProduct.Name;

    }

    function DeliverProduct(uint ProductId) {
        var newProduct = ProductReg[ProductId];
        newProduct.Status = "DELIVERED";
        ProductReg[ProductDeliverCount] = newProduct;
        ProductDeliverCount++;
        
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
    function GetProduct(uint ProductId) constant returns (string, uint) {
        return (ProductReg[ProductId].Name, ProductReg[ProductId].Id);
    }
}