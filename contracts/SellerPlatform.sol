pragma solidity ^0.4.6;

contract SellerPlatform {
    struct ProductInfo {
        // register, sold, deliver
        string Status; 

    }
    //Ref : https://coursetro.com/posts/code/102/Solidity-Mappings-&-Structs-Tutorial
    struct Product {
        string Name;
        uint Id;
        ProductInfo ProductInfos;

    }

    
    
    // Maintain product block history 
    mapping(uint => Product) Products;

    // uint[] public ProductIds;


    function CreateProduct(string Name) {
        Product memory newProduct;
        newProduct.Name = Name;
        newProduct.Id = 1233;
        // ProductIds.push(newProduct.Id);
        // product status
        ProductInfo memory newProductInfo ;
        newProductInfo.Status = "REGISTER";
        newProduct.ProductInfos = newProductInfo;
        Products[newProduct.Id] = newProduct;
    }

    // registration of product
    function sellProduct(uint productId) {
        var product = Products[productId];
        // product status
        ProductInfo memory newProductInfo ;
        newProductInfo.Status = "SOLD";
        product.ProductInfos = newProductInfo;
        Products[product.Id] = product;

    }

    function DeliverProduct(uint productId) {
         var product = Products[productId];
        // product status
        ProductInfo memory  newProductInfo ;
        newProductInfo.Status = "DELIVER";
        product.ProductInfos = newProductInfo;
        Products[product.Id] = product;
        
    }


    function GetProduct(uint productId) returns (string) {
        return (Products[productId].Name);
    }
}