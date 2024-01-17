if (!localStorage.getItem("carrello")) {
  localStorage.setItem("carrello", JSON.stringify([]));
}

const getLibrary = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 404) {
          throw new Error("404 - Pagina non trovata");
        } else if (response.status === 500) {
          throw new Error("500 - Internal server error");
        } else {
          throw new Error("Errore generico");
        }
      }
    })
    .then((library) => {
      const row = document.getElementById("main-row");
      library.forEach((element) => {
        const newCol = document.createElement("div");
        newCol.classList.add("col-6");
        newCol.classList.add("col-md-4");
        newCol.classList.add("col-lg-3");

        newCol.innerHTML = `<div class="card">
        <img src="${element.img}" class="card-img-top img-fluid" alt="img" />
        <div class=" row card-body">
          <h5 class="col-12 card-title">${element.title}</h5>
          <p class="col-12 card-text">
            € ${element.price}
          </p>
          
        </div>
      </div>`;
        row.appendChild(newCol);

        const buyNowButton = document.createElement("button");
        buyNowButton.innerText = "Compra Ora";

        buyNowButton.addEventListener("click", () => {
          const carrello = JSON.parse(localStorage.getItem("carrello"));
          carrello.push(element.title + element.id);
          localStorage.setItem("carrello", JSON.stringify(carrello));
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Scarta";

        deleteButton.addEventListener("click", () => {
          const card = deleteButton.closest(".card");
          if (card) {
            card.remove();
          }
        });

        const divButtonContainer = document.createElement("div");
        divButtonContainer.classList.add("buttons");
        const cardBody = newCol.querySelector(".card-body");
        divButtonContainer.appendChild(buyNowButton);
        divButtonContainer.appendChild(deleteButton);
        cardBody.appendChild(divButtonContainer);
      });
    })

    .catch((err) => {
      console.log("errore", err);
    });
};

getLibrary();
