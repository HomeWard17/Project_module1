let body = document.querySelector("body");
let productList = document.getElementById("product-list")
let openCart = document.getElementById("open-cart")
let closeCart = document.querySelector(".closeShopping")
openCart.addEventListener("click",()=> {
  body.classList.add("active")
})
closeCart.addEventListener("click",()=>{
  body.classList.remove("active")
})

class Product {
    constructor(id,name,image,price){
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
    }
}

let products =[
new Product(1,"BORN PINK STANDARD DIGIPACK - LISA","https://shop.blackpinkmusic.com/cdn/shop/products/LISA.png?v=1662606225",26.00,),
new Product(2,"BORN PINK STANDARD DIGIPACK - JENNIE","https://shop.blackpinkmusic.com/cdn/shop/products/JENNIECOVER.png?v=1662605862",26.00,),
new Product(3,"BORN PINK STANDARD DIGIPACK - JISOO","https://shop.blackpinkmusic.com/cdn/shop/products/JISOOCOVER.png?v=1662606043",26.00,),
new Product(4,"BORN PINK STANDARD DIGIPACK - ROSÉ","https://shop.blackpinkmusic.com/cdn/shop/products/ROSE.png?v=1662606370",26.00,),
new Product(5,"ICE CREAM TIE DYE TEE-SHIRT","https://shop.blackpinkmusic.com/cdn/shop/files/BP_ICETEE_FRONT.png?v=1689185570",35.00),
new Product(6,"ICE CREAM TIE DYE CREWNECK","https://shop.blackpinkmusic.com/cdn/shop/files/BP_ICECREW_FRONT.png?v=1689185773" ,80.00),
new Product(7,"PINK VENUM PHOTO YOUTH SIZED T-SHIRT","https://shop.blackpinkmusic.com/cdn/shop/files/BP_VENOMYOUTH_BACK.png?v=1689959444",35.00),
new Product(8,"THE ALBUM CROWN YOUTH SIZED T-SHIRT","https://shop.blackpinkmusic.com/cdn/shop/files/BP_CROWNTEE_FRONT.png?v=1689959459",35.00),
new Product(9,"PINK VENOM JENNIE LS TEE","https://shop.blackpinkmusic.com/cdn/shop/products/jennieLSBACK_78857a9c-abea-4598-9640-f55ebc516a7b.png?v=1681411695",60.00),
new Product(10,"PINK VENOM JISOO LS TEE","https://shop.blackpinkmusic.com/cdn/shop/products/jisooLSback.png?v=1681411914",60.00),
new Product(11,"PINK VENOM LISA LS TEE","https://shop.blackpinkmusic.com/cdn/shop/products/lisbackLS.png?v=1681412003",60.00),
new Product(12,"PINK VENOM ROSE LS TEE","https://shop.blackpinkmusic.com/cdn/shop/products/roseLSback.png?v=1681411800",60.00),
];

function renderProduct(){
    products.forEach((e,index)=> {
        let newdiv= document.createElement("div")
        newdiv.setAttribute("id","item");
        newdiv.classList.add("product-item");
        newdiv.innerHTML = `<div class="product-picture">
        <img
          src="${e.image}"
          class="card-img-top"
          alt="..."
        />
      </div>
      <p class="product-name">${e.name}</p>
      <p class="product-price">$${e.price}</p>
      <div class="product-add">
        <button class="product-add" id="${e.id}">Add to cart</button>
      </div>`

      productList.appendChild(newdiv);
    })
}
renderProduct()

// xử lý cart

let cart = []|| JSON.parse(localStorage.getItem("cart"))

let findIndex;

productList.onclick = function (e) {
    if(e.target.classList.contains("product-add")){
        let id = Number(e.target.id);
        let buyItem = products.find((e)=>e.id==id);
        let findIndex = cart.findIndex((e)=> buyItem.id == e.id);
        if (findIndex==-1){
            buyItem.quantity = 1;
            cart.push(buyItem);
        }
        else{
            cart[findIndex].quantity++;
            }
        localStorage.setItem("cart",JSON.stringify(cart));
        renderNumber();   
        renderCart();
        tinhTong()      
    }
}
let quantity = document.getElementById("quantity");
function renderNumber() {
    quantity.innerText = cart.length;
}

let listCart = document.getElementById("list-cart");
// Hàm rendercart()

function renderCart() {
    listCart.innerHTML = `<div class="cart" id="list-cart"></div>`
    cart.forEach((e)=>{
        let cartItem = document.createElement("div");
        cartItem.innerHTML = `<div class="cart-item">
        <div class="cart-picture">
          <img
            src="${e.image}"
            alt=""
            class="cart-picture"
          />
        </div>
        <div class="cart-name">${e.name}</div>
        <div class="cart-price">
          <h6>Price</h6>
          $${e.price}
        </div>
        <div class="cart-buttons">
          <button id="${e.id}" class="btn-minus">-</button>
          <div class="cart-quantity">${e.quantity}</div>
          <button id="${e.id}" class="btn-add">+</button>
          <button id="${e.id}" class="btn-delete">delete</button>
        </div>
      </div>`
      listCart.appendChild(cartItem)
    });
}
let sum = 0;

// Làm thêm chức năng trong cart
listCart.onclick = function (element) {
  // bắt sự kiện với nút (-)

  if(element.target.classList.contains("btn-minus")){
    let minusID = Number(element.target.id);
    console.log("id của mặt hàng là",minusID);
    let findIndex = cart.findIndex((element) => element.id == minusID);
    console.log(findIndex);
    // Nếu sản phẩm có số lượng bằng 0 thì phải xóa ra khỏi giỏ hàng
    // nếu sản phẩm có số lượng lớn hơn 1 thì trừ đi 1
    if (cart[findIndex].quantity == 1) {
      cart.splice(findIndex,1);
      localStorage.setItem("cart",JSON.stringify(cart));
      sum = 0;
    quantity.innerText = cart.length;

      tinhTong();
      renderCart();
    }
    else{
      cart[findIndex].quantity--;
      localStorage.setItem("cart",JSON.stringify(cart));
      tinhTong();
      renderCart();
    }
    
  }
  else if(element.target.classList.contains("btn-add")){
    console.log(element.target.id);
    let addID = Number(element.target.id);
    let findIndex = cart.findIndex((element)=> addID == element.id);
    console.log(findIndex);
    cart[findIndex].quantity++;
    localStorage.setItem("cart",JSON.stringify(cart));
    tinhTong();
    renderCart();
  }
  else if(element.target.classList.contains("btn-delete")){
    // console.log("đây là nút xóa")
    // console.log(element.target.id);
    let deleteId = Number(element.target.id)
    let findIndex = cart.findIndex((e)=> deleteId== e.id)

    // console.log(findIndex);
    cart.splice(findIndex,1)
    localStorage.setItem("cart",JSON.stringify(cart));
    let quantity = document.getElementById("quantity");
    quantity.innerText = cart.length;
    sum = 0;
    tinhTong()
    renderCart()
  }
}
let total = document.getElementById("total");
function tinhTong() {
  sum = 0;
  for (let i = 0; i < cart.length; i++) {
   sum = sum + Number(cart[i].quantity)*Number(cart[i].price)
  }  

  const formatter = sum.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  total.innerText = formatter;
}

// Xác nhận đặt hàng
total.style.color = "pink";
let btnPay = document.getElementById("btn-pay");
btnPay.onclick = function(){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Xác nhận đặt hàng',
    text: `Giá trị đơn hàng là ${sum} USD` ,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      cart = [];
      localStorage.setItem("cart",JSON.stringify(cart))
      tinhTong();
      renderCart()
      swalWithBootstrapButtons.fire(
        'Done',
        'Đặt hàng thành công',
        'success'
        
      )
    }
  })
}