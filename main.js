import{ data } from "./js/data.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js'
const contentDelicatessen = document.querySelector(".content-delicatessen");
const cartShopping = document.querySelector(".cartShopping");
const containerShopping = document.querySelector(".container-shopping");
const contentShopping = document.querySelector(".content-shopping");
const shoppingTotal = document.querySelector(".shoppingTotal");

let shoppingObj =  JSON.parse(localStorage.getItem("shoppingObj")) || {}; 
console.log(shoppingObj);

contentShopping.addEventListener("click",(event)=>{
 if (event.target.classList.contains("rest")) {
     const id = parseInt(event.target.parentElement.id);
     if (shoppingObj[id].amount === 1) {
        Swal.fire({
            title: 'Desea Eliminar?',
            showCancelButton: true,
            confirmButtonText: 'OK',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {            
              delete shoppingObj[id];  
                  
            }else{
                  shoppingObj[id].amount--;
            }
            amountProductInCart();
            printTotalPrice();
            printShoppingCart(); 
          })
        
     }else{
        shoppingObj[id].amount--;
     }
     localStorage.setItem("shoppingObj",JSON.stringify(shoppingObj));
     amountProductInCart();
     printTotalPrice();
     printShoppingCart();
 }
 if (event.target.classList.contains("add")) {
    const id = parseInt(event.target.parentElement.id);
    if (shoppingObj[id].stock > shoppingObj[id].amount) {
        shoppingObj[id].amount++;       
        localStorage.setItem("shoppingObj",JSON.stringify(shoppingObj));  
     }else{
        Swal.fire('No hay stock')
     }
     localStorage.setItem("shoppingObj",JSON.stringify(shoppingObj));
     amountProductInCart();
    printTotalPrice();
    printShoppingCart();
}
if (event.target.classList.contains("del")) {
    const id = parseInt(event.target.parentElement.id);
    Swal.fire({
        title: 'Seguro que desea eliminar?',
        showCancelButton: true,
        confirmButtonText: 'OK',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {            
          delete shoppingObj[id];  
              
        }else{
              shoppingObj[id].amount--;
        }
        localStorage.setItem("shoppingObj",JSON.stringify(shoppingObj));
        amountProductInCart();
        printTotalPrice();
        printShoppingCart(); 
      })
}
 
});

contentDelicatessen.addEventListener("click",(event)=>{
 if (event.target.classList.contains("add-principal")) {
     const id = parseInt(event.target.parentElement.id);
     const [currentProduct] = data.filter((n) => n.id === id);

     if(shoppingObj[id]){
         if (shoppingObj[id].stock > shoppingObj[id].amount) {
            shoppingObj[id].amount++;    
            localStorage.setItem("shoppingObj",JSON.stringify(shoppingObj));            
         }else{
            Swal.fire('Ups, Lo sentimos no hay stock')
         }
          
     }else{
        shoppingObj[id] = currentProduct;
        shoppingObj[id].amount=1;
        localStorage.setItem("shoppingObj",JSON.stringify(shoppingObj));
     }

     amountProductInCart();
     printTotalPrice();
     printShoppingCart();
 }
});

function amountProductInCart() {    
    const infoQuatityProducts = document.querySelector(".infoQuatityProducts");
    infoQuatityProducts.textContent = Object.values(shoppingObj).length;
 }

function printTotalPrice() {
    const shoppingArray = Object.values(shoppingObj);
     let suma =0;

     shoppingArray.forEach((n)=>{
        suma += n.amount * n.price;
     });

     shoppingTotal.textContent = suma;
}

function printShoppingCart(params) {
    const shoppingArray = Object.values(shoppingObj);
    let html='';
    shoppingArray.forEach(({id,name,price,stock,urlImages,amount}) => {
        html += `
        <div class="shopping">
        <div class="shopping-header">
            <div class="shopping-img">
                <img src="${urlImages}" alt="${name}">
            </div>
            <div class="shopping-info">
                <p>Nombre: ${name}</p>
                <p>Precio: ${price}</p>
                <p>Stock: ${stock}</p>
            </div>
        </div>                
       
        <div class="shopping-actions" id="${id}">
            <span class="rest">-</span>
            <b class="amount">${amount}</b>
            <span class="add">+</span>
            <i class='bx bxs-trash del'></i>
        </div>
    </div>`;
    });
    contentShopping.innerHTML = html;
}

function printDelicatessen(){
    let html = '';

    data.forEach(({ id,name,price,stock,urlImages
    })=>{
    html += `
            <div class="delicatessen">
                <div class="delicatessen-img">
                    <img src="${urlImages}" alt="">
                </div>
                <div class="delicatessen-info">
                    <p class="delicatessen-info-name">Nombre: ${name} </p>
                    <p class="delicatessen-info-stock">Stock: ${stock} </p>
                    <p class="delicatessen-info-price">Precio: ${price} </p>
                </div>
                <div class="delicatessen-action" id="${id}">
                    <button type="button" class="add-principal">Agregar</button>
                </div>
            </div>`;

    });
    contentDelicatessen.innerHTML = html;
}
printDelicatessen();

printShoppingCart();
amountProductInCart();
printTotalPrice();
cartShopping.addEventListener('click',()=>{       
    containerShopping.classList.toggle("show-shopping");
});