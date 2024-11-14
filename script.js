// Definición de stickers con nombre y cantidad
const areas = {
  lounge: [
    { name: "pedro", quantity: "980", drinks: "tequila,tequila" },
    { name: "pedro", quantity: "900", drinks: "fernet,ron" },
    { name: "pedro", quantity: "40" , drinks: "jageer,havana" },
    { name: "pedro", quantity: "900", drinks: "singani,gin" },
    { name: "pedro", quantity: "900", drinks: "singani,gin" },
    { name: "pedro", quantity: "900", drinks: "singani,gin" },
    { name: "pedro", quantity: "900", drinks: "singani,ron" },
    { name: "pedro", quantity: "900", drinks: "singani,ron" },
    { name: "pedro", quantity: "500", drinks: "singani,ron" },
    { name: "pedro", quantity: "900", drinks: "fernet,ron" },
  ],
  mama: [
    { name: "", quantity: "", drinks: "" },
    { name: "pedro", quantity: "900", drinks: "fernet,ron" },
    { name: "pedro", quantity: "900", drinks: "fernet,ron" },
    { name: "pedro", quantity: "900", drinks: "singani,gin" },
    { name: "pedro", quantity: "900", drinks: "singani,gin" },
    { name: "pedro", quantity: "900", drinks: "singani,gin" },
    { name: "pedro", quantity: "900", drinks: "singani,ron" },
    { name: "pedro", quantity: "900", drinks: "singani,ron" },
    { name: "pedro", quantity: "900", drinks: "singani,ron" },
    { name: "pedro", quantity: "900", drinks: "fernet,ron" },
  ],
  camel: [
    { name: "pedro", quantity: "200", drinks: "fernet,ron" },
    { name: "pedro", quantity: "900", drinks: "fernet,ron" },
    { name: "pedro", quantity: "900", drinks: "fernet,ron" },
    { name: "pedro", quantity: "900", drinks: "singani,gin" },
    { name: "pedro", quantity: "900", drinks: "singani,gin" },
    { name: "pedro", quantity: "900", drinks: "singani,gin" },
    { name: "pedro", quantity: "900", drinks: "singani,ron" },
    { name: "pedro", quantity: "900", drinks: "singani,ron" },
    { name: "pedro", quantity: "900", drinks: "singani,ron" },
    { name: "pedro", quantity: "900", drinks: "fernet,ron" },
  ],
};

// Lista de stickers
const stickers = {
  lounge: "icons8-table-top-view-96 (2).png",
  mama: "icons8-table-top-view-96 (2).png",
  camel: "icons8-table-top-view-96 (2).png",
};

// Definición de números de cuenta
const accountNumbers = {
  "pedro": "190*****817",
  "jose": "150*****407",
};

// Seleccionar los contenedores para cada área
const loungeContainer = document.getElementById("lounge-container");
const mamaContainer = document.getElementById("mama-container");
const camelContainer = document.getElementById("camel-container");

// Función para generar stickers
function createSticker(container, index, area, stickerUrl) {
  const stickerDiv = document.createElement("div");
  stickerDiv.className = "sticker";

  const img = document.createElement("img");
  img.src = stickerUrl;
  img.alt = `Sticker ${index + 1}`;

  const numberLabel = document.createElement("span");
  numberLabel.className = "sticker-number";
  numberLabel.textContent = (index + 1).toString();

  const quantityLabel = document.createElement("span");
  quantityLabel.className = "sticker-quantity";
  quantityLabel.textContent = area[index].quantity;

  const nameLabel = document.createElement("span");
  nameLabel.className = "sticker-name";
  nameLabel.textContent = area[index].name;
  nameLabel.style.display = "none";

  stickerDiv.addEventListener("mouseover", () => {
    nameLabel.style.display = "block";
  });
  stickerDiv.addEventListener("mouseout", () => {
    nameLabel.style.display = "none";
  });

  stickerDiv.appendChild(img);
  stickerDiv.appendChild(numberLabel);
  stickerDiv.appendChild(quantityLabel);
  stickerDiv.appendChild(nameLabel);
  container.appendChild(stickerDiv);
}

// Generar los stickers para cada área
for (let i = 0; i < 10; i++) {
  createSticker(loungeContainer, i, areas.lounge, stickers.lounge);
  createSticker(mamaContainer, i, areas.mama, stickers.mama);
  createSticker(camelContainer, i, areas.camel, stickers.camel);
}

// Función para calcular el total de cada área
function calcularTotal() {
  let totalLounge = areas.lounge.reduce((acc, sticker) => {
    if (sticker.name && sticker.quantity) { // Filtrar solo si hay nombre y cantidad
      return acc + (Number(sticker.quantity) || 0);
    }
    return acc;
  }, 0);

  let totalMama = areas.mama.reduce((acc, sticker) => {
    if (sticker.name && sticker.quantity) { // Filtrar solo si hay nombre y cantidad
      return acc + (Number(sticker.quantity) || 0);
    }
    return acc;
  }, 0);

  let totalCamel = areas.camel.reduce((acc, sticker) => {
    if (sticker.name && sticker.quantity) { // Filtrar solo si hay nombre y cantidad
      return acc + (Number(sticker.quantity) || 0);
    }
    return acc;
  }, 0);

  const totalGeneral = totalLounge + totalMama + totalCamel;

  const totalPorNombre = {};

  [...areas.lounge, ...areas.mama, ...areas.camel].forEach(sticker => {
    const name = sticker.name;
    if (name && sticker.quantity) { // Filtrar solo si hay nombre y cantidad
      totalPorNombre[name] = (totalPorNombre[name] || 0) + (Number(sticker.quantity) || 0);
    }
  });

  return {
    totalGeneral,
    totalPorNombre,
  };
}


// Función para contar total de bebidas y cuántas de cada tipo
function contarDrinks() {
  const totalDrinks = {};
  let totalCount = 0;

  // Recorremos las áreas para contar las bebidas
  [...areas.lounge, ...areas.mama, ...areas.camel].forEach(sticker => {
    const drinksList = sticker.drinks ? sticker.drinks.split(",").map(d => d.trim()).filter(d => d) : []; // Filtramos entradas vacías

    drinksList.forEach(drink => {
      totalDrinks[drink] = (totalDrinks[drink] || 0) + 1; // Contamos cada tipo de bebida
    });

    // Acumulamos el total de bebidas solo si hay alguna bebida
    totalCount += drinksList.length;
  });

  return { totalDrinks, totalCount };
}

// Ejemplo de uso
const { totalDrinks, totalCount } = contarDrinks();
console.log('Total de bebidas:', totalCount); // Ahora debería dar el total correcto
console.log('Cantidad por tipo de bebida:', totalDrinks);



// Función para calcular el porcentaje de ocupación de cada área
function calcularPorcentajeOcupacion() {
  const ocupadas = {
    lounge: areas.lounge.filter(sticker => sticker.name && sticker.quantity).length,
    mama: areas.mama.filter(sticker => sticker.name && sticker.quantity).length,
    camel: areas.camel.filter(sticker => sticker.name && sticker.quantity).length,
  };

  const porcentajes = {};

  for (const area in ocupadas) {
    porcentajes[area] = (ocupadas[area] / 10) * 100; // Suponiendo que cada área tiene 10 stickers
  }

  return porcentajes;
}

// Función para mostrar el total y detalles en el modal
function mostrarDetalles() {
  const totals = calcularTotal();
  const { totalDrinks, totalCount } = contarDrinks();
  const porcentajes = calcularPorcentajeOcupacion();
  const totalNames = Object.keys(totals.totalPorNombre);
  const totalNombreTitle = document.getElementById("total-nombre-title");
  const totalContainer = document.getElementById("total-container");

  if (totalNames.length === 1) {
    const name = totalNames[0];
    const accountNumber = accountNumbers[name] || "N/A";
    const totalAmount = totals.totalGeneral;

    totalContainer.innerHTML = `
      <div class="card-credit">
        <div class="total-label">Total Registrado</div>
        <h2>${name}</h2>
        <div class="amount">${totalAmount} bs</div>
        <div class="account-number">Cuenta: ${accountNumber}</div>
      </div>
    `;

    document.getElementById("total-nombre-container").innerHTML = "";
    document.getElementById("nombre-table").style.display = "none";
    totalNombreTitle.style.display = "none";
  } else {
    

    const totalPorNombreContainer = document.getElementById("total-nombre-container");
    totalPorNombreContainer.innerHTML = "";
    document.getElementById("nombre-table").style.display = "";
    totalNombreTitle.style.display = "";

    let totalMonto = 0;

    for (const [nombre, total] of Object.entries(totals.totalPorNombre)) {
      const accountNumber = accountNumbers[nombre] || "N/A";
      const row = document.createElement("tr");
      row.innerHTML = `<td>${nombre} (${accountNumber})</td><td>${total} bs</td>`;
      totalPorNombreContainer.appendChild(row);
      totalMonto += total;
    }

    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td style="font-weight: bold; color:green;">Total:</td><td style="font-weight: bold;color:green;">${totalMonto} bs</td>`;
    totalPorNombreContainer.appendChild(totalRow);
  }



  // Muestra los totales de bebidas en una tabla
  let drinksTable = `<h3>Total de Bebidas</h3>
  <div style="display: flex; justify-content: center;"> <!-- Contenedor centrado -->
    <table style="width: 50%; border-collapse: collapse; font-size: 19px;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; border-top: 1px solid #ddd; border-left: 1px solid #ddd; background-color: white; padding: 4px; width: 70%; color: black;">Bebida</th>

          <th style="border: 1px solid #ddd; border-top: 1px solid #ddd; border-right: 1px solid #ddd; background-color: #e67e22; padding: 4px; width: 30%;color:black;">Cantidad</th>
        </tr>
      </thead>
      <tbody>`;


  let totalDrinksCount = 0; // Para el total general

  for (const [drink, count] of Object.entries(totalDrinks)) {
    drinksTable += `
      <tr>
        <td style="border: 1px solid #ddd;border-left: none; padding: 4px;">${drink}</td>
        <td style="border: 1px solid #ddd;border-right: none; padding: 4px;">${count}</td>
      </tr>`;
    totalDrinksCount += count; // Sumar al total general
  }

  drinksTable += `
      <tr style="font-weight: bold; color: green;">
        <td style="border: 1px solid #ddd; padding: 4px;">Total:</td>
        <td style="border: 1px solid #ddd; padding: 4px;">${totalDrinksCount}</td>
      </tr>
    </tbody>
  </table>
  </div>`; // Cierre del contenedor

  totalContainer.innerHTML += drinksTable;

  // Aquí agregamos el mensaje de total dentro de un div con la clase CSS aplicada
  totalContainer.innerHTML += `
    <div class="total-message">
      <span>Se registró un total de ${totals.totalGeneral} bs.</span>
    </div>
  `;


  let count900 = 0;
  let count980 = 0;
  let countOthers = 0;

  const otrosMontos = []; // Para almacenar los montos de otras mesas

  [...areas.lounge, ...areas.mama, ...areas.camel].forEach(sticker => {
    const quantity = Number(sticker.quantity);
    if (quantity === 900) {
      count900++;
    } else if (quantity === 980) {
      count980++;
    } else if (quantity) {
      countOthers++;
      otrosMontos.push(`${sticker.name}: ${quantity} bs`); // Agregar a la lista de otros montos
    }
  });

  const countContainer = document.getElementById("count-container");
  countContainer.innerHTML = `
    <div class="card-container">
      <div class="card">
        <div class="card-content">
          <div class="card-title">Mesas de 980 bs:</div>
          <div class="card-value">${count980}</div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="card-title">Mesas de 900 bs:</div>
          <div class="card-value">${count900}</div>
        </div>
      </div>
      <div class="card" id="otros-montos-card">
        <div class="card-content">
          <div class="card-title">Mesas de otros montos:</div>
          <div class="card-value">${countOthers}</div>
        </div>
        <div class="otros-montos-list" style="display: none;"></div>
      </div>
    </div>
  `;

  const otrosMontosCard = document.getElementById("otros-montos-card");
  const listaContainer = otrosMontosCard.querySelector(".otros-montos-list");

  otrosMontosCard.addEventListener("click", () => {
    if (listaContainer.style.display === "none" || listaContainer.style.display === "") {
      // Asegúrate de que se muestre primero
      listaContainer.style.display = "block";
      listaContainer.innerHTML = otrosMontos.map(monto => `<div style="color: black; font-weight: bold; font-size: 18px;">${monto}</div>`).join('');

      // Calcular y aplicar la altura máxima
      const height = listaContainer.scrollHeight + "px";
      listaContainer.style.maxHeight = height;

      // Esperar a que se establezca la altura antes de aplicar la transición
      setTimeout(() => {
        listaContainer.style.maxHeight = height; // Activar la transición
      }, 0);
    } else {
      // Para ocultar la lista
      listaContainer.style.maxHeight = listaContainer.scrollHeight + "px"; // Asegurarse de que tenga la altura actual

      // Luego, ajustar max-height a 0 para la transición
      setTimeout(() => {
        listaContainer.style.maxHeight = "0"; // Aplicar la transición a cero
      }, 0);

      // Esperar la finalización de la transición antes de ocultar completamente
      setTimeout(() => {
        listaContainer.style.display = "none"; // Ocultar completamente después de la transición
      }, 900); // Debe coincidir con el tiempo de transición de CSS
    }
  });


  // Mostrar porcentajes de ocupación
  const porcentajeContainer = document.createElement("div");
  porcentajeContainer.className = "porcentaje-container"; // Clase para CSS
  porcentajeContainer.innerHTML = `
    <h3>Porcentaje de áreas Ocupadas</h3>
    <div class="porcentaje-area">
      <div class="area lounge">
        <div class="porcentaje-circle" style="--porcentaje: ${porcentajes.lounge.toFixed(2)}%;"></div>
        <p>Lounge: ${porcentajes.lounge.toFixed(2)}%</p>
      </div>
      <div class="area mama">
        <div class="porcentaje-circle" style="--porcentaje: ${porcentajes.mama.toFixed(2)}%;"></div>
        <p>Mama: ${porcentajes.mama.toFixed(2)}%</p>
      </div>
      <div class="area camel">
        <div class="porcentaje-circle" style="--porcentaje: ${porcentajes.camel.toFixed(2)}%;"></div>
        <p>Camel: ${porcentajes.camel.toFixed(2)}%</p>
      </div>
    </div>
  `;

  countContainer.appendChild(porcentajeContainer);
  document.getElementById("modal").style.display = "block";
  modal.classList.add("show");
}

// Cerrar el modal al hacer clic en la X
document.getElementById("close-modal").addEventListener("click", () => {
  modal.classList.remove("show");
  modal.classList.add("hide");

  modal.addEventListener('animationend', () => {
    document.getElementById("modal").style.display = "none";
    modal.classList.remove("hide");
  }, { once: true });
});

// Opción 1 del menú
document.getElementById("opcion-1").addEventListener("click", () => {
  mostrarDetalles();
  sideMenu.classList.remove("open");
});

// Función para mostrar/ocultar el menú
const menuSticker = document.getElementById("top-left-sticker");
const sideMenu = document.getElementById("side-menu");

menuSticker.addEventListener("click", (event) => {
  sideMenu.classList.toggle("open");
  event.stopPropagation();
});

// Cerrar el menú si se hace clic fuera de él
document.addEventListener("click", (event) => {
  if (sideMenu.classList.contains("open") && !sideMenu.contains(event.target) && !menuSticker.contains(event.target)) {
    sideMenu.classList.remove("open");
  }
});

// Evento para el botón de correo electrónico
document.getElementById("enviar-correo").addEventListener("click", () => {
  const email = 'cristianqueteguari8@gmail.com';
  const subject = 'Reporte de Totales';
  const message = `Presione el enlace para ver los registros de mesas:\n\nEnlace: [https://www.google.com/url?sa=i&url=https%3A%2F%2Fbasercor.es%2Fes%2Fexplicacion-factura-luz.html&psig=AOvVaw2-GIJRfE7wRlhhRu9NG8W1&ust=1730233964740000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCLvfz1sYkDFQAAAAAdAAAAABAE]`;

  const body = `${message}`;

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
});
