
const addNote = document.querySelector(".add-note");
const notesContainer = document.querySelector(".notes-container");
let noteTexts = [];

//if there are storage, get it and post it by creating the note
if(localStorage.getItem('noteList') !== null){
    noteTexts = JSON.parse(localStorage.getItem('noteList'));
    noteTexts.forEach(element => {
        addNewNote(element);
    });
}

function addNewNote(value) {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
    <div class="cross"><i class="fas fa-times"></i></div>
    <div class="main-text"></div>
    <textarea class="hidden" placeholder="Enter what you need to do..."></textarea>
    <div class="tools">
        <div class="tools-box">
            <i class="far fa-edit" id="edit"></i></div>
        </div>
    </div>
    `;

    const editBtn = note.querySelector(".tools-box");
    const deleteBtn = note.querySelector(".cross");
    const mainText = note.querySelector(".main-text");
    const textArea = note.querySelector("textarea");
    const theEditI = note.querySelector(".far");

    mainText.innerHTML = value;

    editBtn.addEventListener('click',()=>{
        mainText.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
        //change the edit icon to the "times" icon
        if(theEditI.classList.contains("far")){
            theEditI.classList.remove("far","fa-edit");
            theEditI.classList.add("fas","fa-check");
            //update the changes to the array for storage
            noteTexts = noteTexts.filter(text=>text !== mainText.innerHTML);
        }
        //change the "times" icon to the edit icon
        else{
            theEditI.classList.add("far","fa-edit");
            theEditI.classList.remove("fas","fa-check");
            noteTexts.push(mainText.innerHTML);
            localStorage.setItem('noteList',JSON.stringify(noteTexts));
        }
    })

    deleteBtn.addEventListener('click',()=>{
        note.remove();
    })

    textArea.addEventListener('input',(e)=>{
        const {value} = e.target;
        mainText.innerHTML = value;
    })
    notesContainer.appendChild(note);
}

addNote.addEventListener('click',()=>{addNewNote("")});