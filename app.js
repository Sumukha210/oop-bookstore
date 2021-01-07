//book class
const Book = function (author, title, isbn) {
  (this.author = author), (this.title = title), (this.isbn = isbn);
};

//ui class
const BookUi = function () {};

//adding a new book
BookUi.prototype.addBook = function ({ author, title, isbn }) {
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
};

//removing a book
BookUi.prototype.removeBook = function (target) {
  console.log(target);
  if (target.className.includes("btn-danger")) {
    target.parentElement.parentElement.remove();
  }
};

//clearing the inputs fields
BookUi.prototype.clearInputs = function () {
  document.getElementById("author").value = "";
  document.getElementById("title").value = "";
  document.getElementById("isbn").value = "";
};

//alert message
BookUi.prototype.alertMessage = function (type, message) {
  const mainTitle = document.getElementById("mainTitle");
  const div = document.createElement("div");

  div.className =
    "my-3 showAlert text-center d-flex justify-content-center  mx-auto ";

  div.innerHTML = `
    <div class="alert alert-${type}" role="alert">
        <h6 class="text-uppercase px-5">${message}</h6>
    </div>
  `;

  mainTitle.appendChild(div);

  setTimeout(() => {
    document.querySelector(".showAlert").remove();
  }, 2000);
};

//form submit event
const form = document.querySelector("form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const author = document.getElementById("author").value;
  const title = document.getElementById("title").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(author, title, isbn);
  const ui = new BookUi();

  if (author || title || isbn) {
    //add book
    ui.addBook(book);

    //alert = book is added
    ui.alertMessage("success", `${title} book is added !!!`);

    //clear inputs values
    ui.clearInputs();
  } else {
    //alert
    ui.alertMessage("danger", "Please fill all the fields !!!");
  }
});

//delete books events
const tableBody = document.querySelector("tbody");

//remove book
tableBody.addEventListener("click", e => {
  const ui = new BookUi();
  ui.removeBook(e.target);
  ui.alertMessage("danger", `${e.target.dataset.title} book is removed !!!`);
});
