showNotes();
// working with add note button
let addBtn = document.getElementById('addBtn');
// Storing the notes to the localStorage
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    function noteWork() {
        notesObject = {
            title: addTitle.value,
            text: addTxt.value
        }
        notesObj.push(notesObject);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTitle.value = "";
        addTxt.value = "";
    }
    if (addTxt.value != "") {
        noteWork();
    } else {
        alert("Please enter something 1st!");
    }
    showNotes();
});
// display function for notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notesCards my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title} </h5>
                    <p class="card-text">${element.text} </p>
                    <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary" >Delete</button>
                </div>
            </div>
        `
    });
    let notesElement = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElement.innerHTML = html;
    } else {
        notesElement.innerHTML = `<b>Nothing to show! Please add a note..`;
    }
}

// function for delete a notes
function deleteNotes(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
// adding search funtion for searching the notes
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputValue = search.value;
    let notesCards = document.getElementsByClassName('notesCards');
    Array.from(notesCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputValue)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });

})