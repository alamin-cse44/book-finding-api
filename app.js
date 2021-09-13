const errorDiv = document.getElementById('error-div');
const searchResult = document.getElementById('search-result');
const booksNumber = document.getElementById('books-number');


const searchBook = () => {
    const inputField = document.getElementById('search-field');
    const inputText = inputField.value;
    inputField.value = "";
    if(inputText===""){
        errorDiv.innerText = "Search Field can't be empty";
        searchResult.innerHTML = "";
        booksNumber.innerText = "";
        return;
    }
    booksNumber.innerText = "";
    searchResult.innerHTML = "";
    const url = `https://openlibrary.org/search.json?q=${inputText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs,data));

    errorDiv.innerText = "";
}


 const displaySearchResult = (books,data) => {
    //  console.log(books.length);
     if(books.message === "NOT FOUND" || books.length === 0){
         errorDiv.innerText = "No Result Found!"
         booksNumber.innerText = "";
         return;
     }
     booksNumber.innerText = `Total This Type of Book is : ${data.numFound}`;
     searchResult.textContent = "";
     books.forEach(book => {
        //  console.log(book);
         const div = document.createElement('div');
         div.classList.add('col');
         div.innerHTML = `
         <div class="card h-100">
            <img class="mx-auto" src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title text-center">${book.title}</h3>
                <h5 class="card-title">Author : ${book.author_alternative_name ? book.author_alternative_name : "Not Available"}</h5>
                <h5 class="card-title">Publisher : ${book.publisher ? book.publisher : "Not Available"}</h5>
                <p class="card-text">First publish year : ${book.first_publish_year ? book.first_publish_year : "Not Available"}</p>
            </div>
         </div>
         `;
         searchResult.appendChild(div);
     })
 }