const stock_products=[
    {
        "id":1,
        "name":"iPhone 15 Plus",
        "brand":"Apple",
        "image":"https://m.media-amazon.com/images/I/71xb2xkN5qL._SX679_.jpg",
         "mrp":59000,
         "price":40000,
         "ram":"6GB",
         "internal":"128GB"
         

    },

    {
        "id":2,
        "name":"Galaxy M15 5G ",
        "brand":"Samsung",
        "image":"https://m.media-amazon.com/images/I/818Voe9yzCL._SX679_.jpg",
         "mrp":35000,
         "price":25000,
         "ram":"8GB",
         "internal":"128GB"

    },

    {
        "id":3,
        "name":"iQOO Z7s 5G ",
        "brand":"iQOO",
        "image":"https://m.media-amazon.com/images/I/71k3gOik46L._SX679_.jpg",
         "mrp":30000,
         "price":25000,
         "ram":"8GB",
         "internal":"128GB"

    },


    {
        "id":4,
        "name":"Redmi Note 13 5G ",
        "brand":"Redmi",
        "image":"https://m.media-amazon.com/images/I/71VW8LmqqPL._SX679_.jpg",
         "mrp":25000,
         "price":20000,
         "ram":"6GB",
         "internal":"128GB"

    },


    {
        "id":5,
        "name":"Camon 20s Pro 5G ",
        "brand":"TECNO",
        "image":"https://m.media-amazon.com/images/I/712KUiu03SL._SX679_.jpg",
         "mrp":15000,
         "price":20000,
         "ram":"8GB",
         "internal":"128GB"

    },


    {
        "id":6,
        "name":"Lava Agni 2 5G  ",
        "brand":"Lava",
        "image":"https://m.media-amazon.com/images/I/61Mm0fKH-IL._SX679_.jpg",
         "mrp":15000,
         "price":10000,
         "ram":"8GB",
         "internal":"128GB"

    },


    {
        "id":7,
        "name":"Mi 12 Pro+ 5G ",
        "brand":"Redmi",
        "image":"https://m.media-amazon.com/images/I/71VW8LmqqPL._SX679_.jpg",
         "mrp":27000,
         "price":20000,
         "ram":"8GB",
         "internal":"128GB"

    },

    {
        "id":8,
        "name":"Apple iPhone 15 ",
        "brand":"Apple",
        "image":"https://m.media-amazon.com/images/I/71657TiFeHL._SX679_.jpg",
         "mrp":35000,
         "price":25000,
         "ram":"8GB",
         "internal":"128GB"

    }
    
]

const productSection = document.getElementById("productPage");
const btnCard=document.getElementById("btnCart")
const myModal=new bootstrap.Modal("#myModal");
const cardCount=document.querySelector(".cardCount")
const modalDiv=document.getElementById("myModal")

let cardItems=[]

function localStockProducts (){
let output = "";
stock_products.forEach((product)=>{
    output+=`<div class="col">
                    <div class="card h-100">
                        <img class=" card-img-top " src="${product.image}" alt="mobile">
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5>${product.name}</h5>
                                <span class="text-muted"><b>Brand</b>:${product.brand}</span>
                                <span class="text-muted d-block"><b>Storage</b> : ${product.ram} / ${product.internal}</span>

                                <span class="text-muted text-decoration-line-through">Rs : ${product.mrp}</span>
                            <span class="fw-bold text-success">Rs : ${product.price}</span>
                            </div>
                        </div>
                        <div class="cart-footer  bg-transparent border-top-0 p-4">
                            <div class="text-center">
                                <button class="btn btn-primary btnProduct"  data-id="${product.id}">
                                    <i class="bi bi-cart "></i> Add to Card
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`
})
productSection.innerHTML=output;
//Add product
const productBtns=document.querySelectorAll(".btnProduct");

productBtns.forEach((btn)=>{
    btn.addEventListener("click",addToCard)
})


}
localStockProducts();
btnCard.addEventListener("click",()=>{
    myModal.show();
});

function addToCard() {
    this.disabled=true; 
    this.innerHTML=`<i class="bi bi-cart "></i> Added to Card`
    const pid=this.dataset.id;
    const product_details=stock_products.filter((product)=>
        product.id == pid)[0];
    const product={
        ...product_details,
        quantity:1,
        amount:product_details.price,
    };
    cardItems.push(product)
    cardCount.textContent=cardItems.length;
    
}
modalDiv.addEventListener("shown.bs.modal",()=>{
    let output ='';
    cardItems.forEach((product)=>{
        output +=`
        <tr>
        <td>
            <img src="${product.image}" class='img-fluid' width="100px" alt="">
        </td>
        <td>${product.name}</td>
        <td>${product.price.toFixed(2)}</td>
        <td><input type="number" style="width:80px" min=1 data-id="${product.id}" value="${product.quantity}" class="form-control txtQty"></td>
        <td>${product.amount.toFixed(2)}</td>
        <td>
          <button class="btn btn-danger btn-sm btnDelete" data-id="${product.id}">
          <i class="bi bi-trash3"></i>
          </button>
        </td>
    </tr>
    `;
    });
    tbody.innerHTML = output;
    const removeBtns = document.querySelectorAll(".btnDelete");
    removeBtns.forEach((btn)=>{
        btn.addEventListener("click",removeFormCart)
        
    });
    const txtQtys=document.querySelectorAll(".txtQty");
    txtQtys.forEach((txt) => {
        txt.addEventListener("change",updateQty)
    });
})
function removeFormCart(){
    const id=this.dataset.id;
    const tr=this.closest("tr");
    cardItems=cardItems.filter((product)=> product.id != id)
    tr.remove();

}

function updateQty(){

    const id=this.dataset.id;
    const newQty=this.value;
    const amountTd=this.parentElement.nextElementSibling;
    const productIndex= cardItems.findIndex((product)=>product.id==id);
    cardItems[productIndex].quantity=newQty;
    cardItems[productIndex].amount=(newQty*cardItems[productIndex].price);
    amountTd.textContent=(newQty*cardItems[productIndex].price).toFixed(2);
    updateTotal()
    
    }
modalDiv.addEventListener("hide.bs.modal",()=>{
    cardCount.textContent=cardItems.length;

    //check button
const productBtns=document.querySelectorAll(".btnProduct");
productBtns.forEach((btn)=>{
const pid= btn.dataset.id;
if(isIdPresent(pid)){
    btn.disabled = false;
}
})

});

function updateTotal(){
    let totalAmount= 0;
    cardItems.forEach((product)=>{
        totalAmount += product.amount;
    });
    const totalTd=document.querySelector(".total");
    totalTd.textContent= `Total Rs : ${totalAmount.toFixed(2)}`
}
const isIdPresent=(id)=>{
   for(const product of cardItems){
    if(product.id==id){
        return true;
    }
   }
   return false;
}