const productos = [
    {
      nombre: "Porta Vasos Individuales",
      precio: 10000,
      imagen: "Cosos.png",
      descripcion: "Porta vaso individual cilindrico de 15cm."
    },
    {
      nombre: "Porta Posillos",
      precio: 10000,
      imagen: "PortaPosillos.png",
      descripcion: "Es facil de llevar y resistente."
    },
    {
      nombre: "Porta Retratos",
      precio: 23000,
      imagen: "Marcos.png",
      descripcion: "Diversos colores de eleccion y muy buena calidad."
    },
    {
      nombre: "Escritorio Oficina",
      precio: 130000,
      imagen: "Escritorio En Madera.webp",
      descripcion: "Medidas de 90cm X 120cm."
    },
    {
      nombre: "Caja Organizadora",
      precio: 5000,
      imagen: "WhatsApp Image 2025-08-07 at 11.54.03.jpeg",
      descripcion: "20cm X 20cm."
    },
    {
      nombre: "Portalapices",
      precio: 8000,
      imagen: "portalapices.PNG",
      descripcion: "Totalmente ecologico."
    },
    {
      nombre: "Estante Pared",
      precio: 15000,
      imagen: "ESTANTE.jpg",
      descripcion: "Medidas de 15cm X 20cm."
    },
    {
      nombre: "Revistero",
      precio: 5000,
      imagen: "revistero.jpg",
      descripcion: "De gran ayuda para tener todo ordenado."
    },
    {
      nombre: "Lampara",
      precio: 25000,
      imagen: "lampara.jpg",
      descripcion: "Es muy servible para los universitarios."
    },
    {
      nombre: "Organizador de escritorio",
      precio: 5000,
      imagen: "organizador.jpg",
      descripcion: "Con este producto organizas todo lo que necesitas, libros, cuadernos, etc."
    },
    {
      nombre: "Limpia Madera",
      precio: 5000,
      imagen: "limpiamadera.png",
      descripcion: "Producto 100% probado por nosotros."
    },
    {
      nombre: "Bandeja Desayuno",
      precio: 15000,
      imagen: "bandeja.jfif",
      descripcion: "Para que le lleve el desayuno a la jermu."
    },
    {
      nombre: "Librero",
      precio: 45000,
      imagen: "librero.webp",
      descripcion: "Para ponerle orden a sus libros."
    },
    {
      nombre: "Bolsa Regalo Reutilizable",
      precio: 4500,
      imagen: "bolsaregalo.webp",
      descripcion: "Para cuidar el medio ambiente pero con regalos."
    },
    {
      nombre: "Separador Libros",
      precio: 3000,
      imagen: "separador.jpg",
      descripcion: "No se pierda leyendo."
    },
  ];
  
  const catalogo = document.getElementById("catalogo");
  const listaCarrito = document.getElementById("listaCarrito");
  const totalElemento = document.getElementById("total");
  let carrito = [];
  
  function mostrarProductos(lista) {
    catalogo.innerHTML = "";
    lista.forEach(producto => {
      const card = document.createElement("div");
      card.className = "producto";
  
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>$${producto.precio}</p>
        <button class="boton-info" onclick="verInfo('${producto.nombre}', '${producto.descripcion}')">Ver más</button>
        <button class="boton-carrito" onclick="agregarAlCarrito('${producto.nombre}')">Agregar al carrito</button>
      `;
  
      catalogo.appendChild(card);
    });
  }
  
  function aplicarFiltros() {
    const nombre = document.getElementById("filtroNombre").value.toLowerCase();
    const precioMax = parseFloat(document.getElementById("filtroPrecio").value);
  
    const filtrados = productos.filter(p => {
      const coincideNombre = p.nombre.toLowerCase().includes(nombre);
      const dentroDePrecio = isNaN(precioMax) || p.precio <= precioMax;
      return coincideNombre && dentroDePrecio;
    });
  
    mostrarProductos(filtrados);
  }
  
  function resetearFiltros() {
    document.getElementById("filtroNombre").value = "";
    document.getElementById("filtroPrecio").value = "";
    mostrarProductos(productos);
  }
  
  function verInfo(nombre, descripcion) {
    alert(`Producto: ${nombre}\n\nDescripción: ${descripcion}`);
  }
  
  function agregarAlCarrito(nombreProducto) {
    const producto = productos.find(p => p.nombre === nombreProducto);
    carrito.push(producto);
    actualizarCarrito();
  }
  
  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;
  
    carrito.forEach(p => {
      const item = document.createElement("li");
      item.textContent = `${p.nombre} - $${p.precio}`;
      listaCarrito.appendChild(item);
      total += p.precio;
    });
  
    totalElemento.textContent = total;
  }
  
  function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
  }
  
  // Mostrar todos al cargar
  mostrarProductos(productos);  
  function comprar() {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
  
    let resumen = "Resumen de tu compra:\n\n";
    let total = 0;
  
    carrito.forEach(p => {
      resumen += `• ${p.nombre} - $${p.precio}\n`;
      total += p.precio;
    });
  
    resumen += `\nTotal a pagar: $${total}\n\n¡Gracias por tu compra!`;
  
    alert(resumen);
    vaciarCarrito();
  }
  function comprar() {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
  
    let total = carrito.reduce((suma, p) => suma + p.precio, 0);
  
    const pedido = {
      productos: carrito,
      total: total,
      fecha: new Date().toLocaleString()
    };
  
    // Guardar pedido en "base de datos" (localStorage)
    let historial = JSON.parse(localStorage.getItem("pedidos")) || [];
    historial.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(historial));
  
    // Generar y descargar recibo PDF
    generarReciboPDF(pedido);
  
    // Confirmación
    alert("¡Compra realizada con éxito!\n\nTu recibo fue generado y tu pedido guardado.");
  
    // Limpiar carrito
    vaciarCarrito();
  }
  async function generarReciboPDF(pedido) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    doc.setFontSize(16);
    doc.text("Recibo de Compra", 20, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${pedido.fecha}`, 20, 30);
  
    let y = 40;
    pedido.productos.forEach((p, i) => {
      doc.text(`${i + 1}. ${p.nombre} - $${p.precio}`, 20, y);
      y += 10;
    });
  
    doc.setFontSize(14);
    doc.text(`Total: $${pedido.total}`, 20, y + 10);
  
    // Descargar el archivo PDF
    doc.save(`recibo_${Date.now()}.pdf`);
  }
  function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem("pedidos")) || [];
    const listaHistorial = document.getElementById("listaHistorial");
    listaHistorial.innerHTML = "";
  
    if (historial.length === 0) {
      listaHistorial.innerHTML = "<li>No hay pedidos previos.</li>";
      return;
    }
  
    historial.forEach((pedido, index) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <strong>Pedido #${index + 1}</strong><br>
        Fecha: ${pedido.fecha}<br>
        Productos: ${pedido.productos.map(p => p.nombre).join(", ")}<br>
        Total: $${pedido.total}
      `;
      listaHistorial.appendChild(item);
    });
  }
  mostrarProductos(productos);
mostrarHistorial();  
doc.autoPrint(); // abre diálogo de impresión
window.open(doc.output("bloburl"), "_blank"); // abre el PDF en nueva pestaña
async function generarReciboPDF(pedido) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Recibo de Compra", 20, 20);
  doc.setFontSize(12);
  doc.text(`Fecha: ${pedido.fecha}`, 20, 30);

  // Tabla de productos
  const filas = pedido.productos.map((p, i) => [i + 1, p.nombre, `$${p.precio}`]);

  doc.autoTable({
    startY: 40,
    head: [["#", "Producto", "Precio"]],
    body: filas,
  });

  const totalY = doc.previousAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text(`Total: $${pedido.total}`, 20, totalY);

  // Abrir e imprimir
  doc.autoPrint();
  window.open(doc.output("bloburl"), "_blank");
}
function enviarPorCorreo(pedido) {
  const correo = prompt("Ingresa tu correo para recibir el recibo:");

  if (correo && correo.includes("@")) {
    alert(`Recibo enviado a ${correo} (simulado).`);
    // Aquí podrías usar EmailJS o API backend real
  } else {
    alert("Correo no válido.");
  }
}
generarReciboPDF(pedido);
enviarPorCorreo(pedido);
async function generarReciboPDF(pedido) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Recibo de Compra", 20, 20);
  doc.setFontSize(12);
  doc.text(`Fecha: ${pedido.fecha}`, 20, 30);

  // Tabla de productos
  const filas = pedido.productos.map((p, i) => [i + 1, p.nombre, `$${p.precio}`]);

  doc.autoTable({
    startY: 40,
    head: [["#", "Producto", "Precio"]],
    body: filas,
  });

  const totalY = doc.previousAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text(`Total: $${pedido.total}`, 20, totalY);

  // Abrir e imprimir
  doc.autoPrint();
  window.open(doc.output("bloburl"), "_blank");
}
function enviarPorCorreo(pedido) {
  const correo = prompt("Ingresa tu correo para recibir el recibo:");

  if (correo && correo.includes("@")) {
    alert(`Recibo enviado a ${correo} (simulado).`);
    // Aquí podrías usar EmailJS o API backend real
  } else {
    alert("Correo no válido.");
  }
}
generarReciboPDF(pedido);
enviarPorCorreo(pedido);