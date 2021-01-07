class Book {
  constructor(author, title, isbn) {
    this.author = author;
    this.title = title;
    this.isbn = isbn;
  }
}

class UI {
  //addbook
  addBook({ author, title, isbn }) {
    const tbody = document.querySelector("tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="text-capitalize">${author}</td>
        <td class="text-capitalize">${title}</td>
        <td class="text-capitalize">${isbn}</td>
        <td class="text-capitalize">
            <a href="#" class="btn btn-danger btn-sm" data-title="${title}">x</a>
        </td>
    `;

    tbody.appendChild(tr);
  }

  //remove book
  removeBook(target) {
    if (target.className.includes("btn-danger")) {
      target.parentElement.parentElement.remove();
    }
  }

  //clear inputs
  clearInputs() {
    document.getElementById("author").value = "";
    document.getElementById("title").value = "";
    document.getElementById("isbn").value = "";
  }

  //alert message
  showAlert(type, message) {
    const mainTitle = document.getElementById("mainTitle");
    const div = document.createElement("div");

    div.className =
      "my-3 showAlert text-center d-flex justify-content-center  mx-auto ";

    div.innerHTML = `
      <div class="alert alert-${type}" role="alert">
          <h6 class="text-uppercase px-5">${message}
          </h6>
      </div>
    `;

    mainTitle.appendChild(div);

    setTimeout(() => {
      document.querySelector(".showAlert").remove();
    }, 2000);
  }
}

//form submit event
const form = document.querySelector("form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const author = document.getElementById("author").value;
  const title = document.getElementById("title").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(author, title, isbn);
  const ui = new UI();

  if (author || title || isbn) {
    //add book
    ui.addBook(book);

    //alert = book is added
    ui.showAlert("success", `${title} book is added !!!`);

    //clear inputs values
    ui.clearInputs();
  } else {
    //alert
    ui.showAlert("danger", "Please fill all the fields !!!");
  }
});

//delete books events
const tableBody = document.querySelector("tbody");

//remove book
tableBody.addEventListener("click", e => {
  const ui = new UI();
  ui.removeBook(e.target);
  ui.showAlert("danger", `${e.target.dataset.title} book is removed !!!`);
});
