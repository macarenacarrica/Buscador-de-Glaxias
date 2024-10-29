document.querySelector('#btnBuscar').addEventListener('click', function() {
    const query = document.querySelector('#inputBuscar').value.trim();
    
    if (!query) {
      alert("Por favor, ingresa un término de búsqueda.");
      return;
    }
  
    const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;
  
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => displayResults(data.collection.items))
      .catch(err => console.error('Error al obtener los datos:', err));
  });
  
  function displayResults(items) {
    const container = document.querySelector('#contenedor');
    container.innerHTML = ''; // Limpiar resultados anteriores
    
    if (!items.length) {
      container.innerHTML = '<p>No se encontraron imágenes.</p>';
      return;
    }
  
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
  
    items.forEach(item => {
      const { data: [imageData], links } = item;
      const imageLink = links ? links[0].href : '';
  
      const colDiv = document.createElement('div');
      colDiv.classList.add('col-md-4', 'mb-4');
  
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'h-100');
  
      cardDiv.innerHTML = `
        <img src="${imageLink}" class="card-img-top" alt="${imageData.title}" style="max-height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${imageData.title}</h5>
          <p class="card-text" style="overflow: hidden; max-height: 100px;">${imageData.description || 'Descripción no disponible'}</p>
          <p class="card-text"><small class="text-muted">Fecha: ${new Date(imageData.date_created).toLocaleDateString()}</small></p>
        </div>
      `;
  
      colDiv.appendChild(cardDiv);
      rowDiv.appendChild(colDiv);
    });
  
    container.appendChild(rowDiv);
  }
  