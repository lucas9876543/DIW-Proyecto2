const images = [
    {src: 'img/auriculares.jpg', nombre: 'Auriculares Bluetooth oferta', precioOriginal: 79.99, precioOferta: 59.99},
    {src: 'img/bicicleta.jpg', nombre: 'Bicicleta de montaña oferta', precioOriginal: 499.99, precioOferta: 399.99},
    {src: 'img/camara.webp', nombre: 'Cámara digital oferta', precioOriginal: 249.99, precioOferta: 199.99},
    {src: 'img/teclado.jpg', nombre: 'Teclado Mecánico RGB Gamer oferta', precioOriginal: 45.00, precioOferta: 35.00},
    {src: 'img/smartwatch.jpg', nombre: 'Smartwatch FitPro oferta', precioOriginal: 30.00, precioOferta: 25.00},
    {src: 'img/mochila.avif', nombre: 'Mochila Antirrobo UrbanTech oferta', precioOriginal: 40.00, precioOferta: 30.00}
  ];
    let currentIndex = 0;
    let countdown = 5;
    
    const imgElement = document.getElementById("current-image");
    const counterElement = document.getElementById("counter");
    const offerElement = document.getElementById("offer-price");
    const precioTachadoElement = document.getElementById("precioTachado");
    
    function changeImage() {
    const producto = images[currentIndex]; // Obtener el producto actual

    imgElement.src = producto.src;
    imgElement.setAttribute("data-nombre", producto.nombre);
    imgElement.setAttribute("data-precio-oferta", producto.precioOferta);

    offerElement.textContent = `$${producto.precioOferta.toFixed(2)}`; // Mostrar precio con 2 decimales
    precioTachadoElement.textContent = `$${producto.precioOriginal.toFixed(2)}`; // Mostrar precio con 2 decimales
    precioTachadoElement.style.textDecoration = "line-through"; // Aplicar tachado al precio original
    countdown = 59;
    counterElement.textContent = countdown;
}
    function updateCounter() {
        if (countdown > 0) {
            countdown--;
            counterElement.textContent = countdown;
        } else {
            currentIndex = (currentIndex + 1) % images.length;
            changeImage();
        }
    }
    
    changeImage();
    setInterval(updateCounter, 1000);