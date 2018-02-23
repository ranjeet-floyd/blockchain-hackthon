pragma solidity ^0.4.6;

contract BuyerPlatform {
    
    //Ref : https://coursetro.com/posts/code/102/Solidity-Mappings-&-Structs-Tutorial
    struct Product {
        string Name;
        uint Id;
        string Status;
        uint Quantity;
    }


    
    // Maintain product block history 
    mapping(uint => Product) ProductBought;
    uint8 ProductBoughtCount=0;


    // Bought product
     mapping(uint => Product) ProductShipped;
     uint8 ProductShippedCount=0;

    // delivered product
     mapping(uint => Product) ProductDelivered;
     uint8 ProductDeliverCount=0;


    function BuyProduct(string Name) constant returns(string, uint, string) {
        Product memory newProduct;
        newProduct.Name = Name;
        newProduct.Quantity = 1;
        newProduct.Status = "PLACED";
        newProduct.Id = ProductBoughtCount;//now();
        ProductBought[ProductBoughtCount] = newProduct;    
        ProductboughtCount++;
        return (newProduct.Name,newProduct.Id,newProduct.Status);
    }

    // Shipment of product
    function shippedProduct(uint ProductId) constant returns(string) {
        var newProduct = ProductBought[ProductId];
        newProduct.Status = "SHIPPED";
        ProductShipped[ProductShippedCount] = newProduct;
        ProductShippedCount++;
        return newProduct.Name;

    }

    function DeliverProduct(uint ProductId) {
        var newProduct = ProductBought[ProductId];
        newProduct.Status = "DELIVERED";
        ProductDelivered[ProductDeliverCount] = newProduct;
        ProductDeliverCount++;
        
    }

    function GetRegProductCount() constant returns(uint) {
        return ProductBoughtCount;
        
    }

    function GetSoldProductCount() constant returns(uint) {
        return ProductShippedCount;
        
    }

    function GetDeliveredProductCount()  constant returns(uint) {
        return ProductDeliverCount;
        
    }
    function GetProduct(uint ProductId) constant returns (string, uint) {
        return (ProductBought[ProductId].Name, ProductBought[ProductId].Id);
    }
}