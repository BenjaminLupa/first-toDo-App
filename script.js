let toDos = [];

function speichern() {
  localStorage.setItem("elemente", JSON.stringify(toDos));
}

function laden() {
  const erhalteDaten = localStorage.getItem("elemente");
  toDos = JSON.parse(erhalteDaten) ? JSON.parse(erhalteDaten) : [];
}

function toDoHinzufuegen() {
  const uebergebenerText = document.querySelector("#uebergebenerText");
  let zaehler = 0;
  toDos.forEach((e) => {
    if (e.beschreibung.toLowerCase() === uebergebenerText.value.toLowerCase()) {
      alert("bereits vorhanden");
      zaehler++;
    }
  });
  if (uebergebenerText.value === "") {
    alert("Bitte Wert angeben");
    zaehler++;
  }

  if (zaehler === 0) {
    const neuesObjekt = {
      beschreibung: uebergebenerText.value.trim(),
      erledigt: false,
    };
    toDos.push(neuesObjekt);
    speichern();
  }
  zaehler = 0;
}

function toDoUmwandeln() {
  const list = document.querySelector("#list");
  toDos.forEach((element) => {
    const neuerEintrag = document.createElement("li");
    neuerEintrag.classList = "list-element";

    const text = document.createTextNode(element.beschreibung);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList = "check";
    checkbox.checked = element.erledigt;
    neuerEintrag.appendChild(checkbox);
    neuerEintrag.appendChild(text);

    statusAendern(checkbox, element, neuerEintrag);

    erledigtJaNein(element, neuerEintrag);

    listeSteuern(neuerEintrag, element);
    list.appendChild(neuerEintrag);
  });
}

function erledigtJaNein(element, neuerEintrag) {
  if (element.erledigt === true) {
    neuerEintrag.style.textDecoration = "line-through";
  } else {
    neuerEintrag.style.textDecoration = "none";
  }
}

function statusAendern(checkbox, element, neuerEintrag) {
  checkbox.addEventListener("change", (e) => {
    element.erledigt = e.target.checked;

    erledigtJaNein(element, neuerEintrag);
    speichern();
  });
}

function listeSteuern(neuerEintrag, element) {
  const anzeige = document.querySelector("#anzeige");
  anzeige.addEventListener("change", (e) => {
    if (e.target.id === "all") {
      neuerEintrag.style.display = "";
    } else if (e.target.id === "todo") {
      if (element.erledigt === true) {
        neuerEintrag.style.display = "none";
      } else {
        neuerEintrag.style.display = "";
      }
    } else if (e.target.id === "done") {
      if (element.erledigt === false) {
        neuerEintrag.style.display = "none";
      } else {
        neuerEintrag.style.display = "";
      }
    }
  });
}

const loeschen = document.querySelector("#loeschen");
loeschen.addEventListener("click", () => {
  const filtern = toDos.filter((todo) => !todo.erledigt);
  toDos = filtern;

  speichern();
  location.reload();
});

const knopfDruecken = document.querySelector("#eingabe");

knopfDruecken.addEventListener("submit", () => {
  toDoHinzufuegen();
});

laden();
toDoUmwandeln();
