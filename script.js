let carrito = [];

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio) {
  // Verificar si el usuario está logueado
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario) {
    alert('Debes iniciar sesión para añadir productos al carrito.');
    mostrarSeccion('login'); // Redirige a la página de login
    return; // No añadir al carrito si no está logueado
  }

  // Si el usuario está logueado, proceder con la adición al carrito
  let productoExistente = carrito.find(producto => producto.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  console.log(`Producto añadido: ${nombre} - $${precio}`);
  alert(`${nombre} ha sido añadido al carrito.`);
  actualizarCarrito();
}

function agregarAlCarritoDesdeOferta() {
  const productoOferta = document.getElementById("current-image");
  
  // Obtenemos el nombre y el precio de los atributos de la imagen
  const nombre = productoOferta.getAttribute("data-nombre");
  const precioOferta = parseFloat(productoOferta.getAttribute("data-precio-oferta"));

  // Validamos que los datos existan
  if (!nombre || isNaN(precioOferta)) {
      console.error("Error: No se pudo obtener el producto en oferta.");
      alert("Error al obtener el producto en oferta.");
      return;
  }

  // Agregamos al carrito
  agregarAlCarrito(nombre, precioOferta);
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
  const carritoContenido = document.getElementById('carrito-contenido');
  carritoContenido.innerHTML = '';
  if (carrito.length === 0) {
    carritoContenido.innerHTML = '<p>No hay productos en el carrito.</p>';
    return;
  }

  carrito.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto-carrito');
    productoDiv.innerHTML = `
      <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
    `;
    carritoContenido.appendChild(productoDiv);
  });

  const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
  carritoContenido.appendChild(totalDiv);
}

// Función para mostrar las secciones
function mostrarSeccion(seccion) {
  let secciones = document.querySelectorAll('.seccion');
  secciones.forEach(seccion => {
    seccion.style.display = 'none';
  });
  document.getElementById(seccion).style.display = 'block';
}

// Función para finalizar la compra
function finalizarCompra() {
  if (carrito.length > 0) {
    alert('Proceso de compra finalizado.');
    carrito = [];
    actualizarCarrito();
    mostrarSeccion('home');
  } else {
    alert('Tu carrito está vacío.');
  }
}

// Mostrar la sección de inicio por defecto
mostrarSeccion('home');

// Verificar si el usuario está logueado al cargar la página
window.onload = function() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (usuario) {
    mostrarUsuario(usuario.nombre);
    mostrarMensajeLoginRegistro(); // Mostrar el mensaje de advertencia
  }
};

// Mostrar el nombre del usuario en la esquina superior derecha
function mostrarUsuario(nombre) {
  const usuarioDiv = document.createElement('div');
  usuarioDiv.id = 'usuario';
  usuarioDiv.innerHTML = `
    <p>Hola, ${nombre} <a href="#" onclick="cerrarSesion()">Cerrar sesión</a></p>
  `;
  document.body.appendChild(usuarioDiv);
}

// Mostrar mensaje de advertencia si ya se ha iniciado sesión
function mostrarMensajeLoginRegistro() {
  // Ocultar formularios de login y registro
  document.getElementById('form-login').style.display = 'none';
  document.getElementById('form-registro').style.display = 'none';

  // Mostrar el mensaje de login y registro
  document.getElementById('mensaje-login').style.display = 'block';
  document.getElementById('mensaje-registro').style.display = 'block';
}

// Iniciar sesión
document.getElementById('form-login')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const correo = e.target.querySelector('input[type="email"]').value;
  const contrasena = e.target.querySelector('input[type="password"]').value;

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

  if (usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    mostrarUsuario(usuario.nombre);
    mostrarSeccion('home');
    mostrarMensajeLoginRegistro(); // Mostrar el mensaje de advertencia
  } else {
    alert('Credenciales incorrectas');
  }
});

// Registrar nuevo usuario
document.getElementById('form-registro')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = e.target.querySelector('input[type="text"]').value;
  const correo = e.target.querySelector('input[type="email"]').value;
  const contrasena = e.target.querySelector('input[type="password"]').value;

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioExistente = usuarios.find(u => u.correo === correo);

  if (usuarioExistente) {
    alert('Ya existe una cuenta con ese correo');
  } else {
    const nuevoUsuario = { nombre, correo, contrasena };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Registro exitoso');
    
    // Redirigir a la sección de inicio de sesión
    mostrarSeccion('login');
  }
});

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuario');
    document.getElementById('usuario')?.remove();
    // Ocultar los mensajes de login y registro
    document.getElementById('mensaje-login').style.display = 'none';
    document.getElementById('mensaje-registro').style.display = 'none';
    // Mostrar los formularios de login y registro
    document.getElementById('form-login').style.display = 'block';
    document.getElementById('form-registro').style.display = 'block';
    // Redirigir a la página de cerrado de sesión
    window.location.href = 'cerrado.html';
}