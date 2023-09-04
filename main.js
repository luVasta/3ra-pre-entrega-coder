const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");
const cerrarModal = document.getElementById("cerrarModal");

let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

productos.forEach((producto) =>{
    let content = document.createElement("div");
    content.className = "card"
    content.innerHTML = `
    <h3>Nombre: ${producto.nombre}</h3>
    <p>Variedad: ${producto.varietal}</p>
    <p>Descripción: ${producto.descripcion}</p>
    <p class ="price">Precio: $${producto.precio}</p>
    <img src= "${producto.imagen}" alt="Imagen del producto">
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () =>{
        carrito.push({
            codigo: producto.codigo,
            img: producto.imagen,
            nombre: producto.nombre,
            varietal: producto.varietal,
            precio: producto.precio
        });

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    });
});

verCarrito.addEventListener("click", () =>{
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    modalContainer.innerHTML = "";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);
    cerrarModal.addEventListener("click", () => {
        modalContainer.innerHTML = "";
    });

    const modalButton = document.createElement("h1");
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })

    modalHeader.append(modalButton);

    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
        `;
        modalContainer.append(carritoContent);
    });
    
    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

    const totalSumado = document.createElement("div");
    totalSumado.className = "total-content";
    totalSumado.innerHTML = `total a pagar: $${total}`;
    modalContainer.append(totalSumado);
});