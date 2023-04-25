const booksBar = document.getElementById("context-bar");
const fetchButton = document.getElementById("fetch-button");
let reader_choice;
fetch("http://localhost:3000/bible")
    .then(response => response.json())
    .then(books => {
        books.forEach(book_name => {
            const bookDiv = document.createElement("div");
            //give the div a class name 
            bookDiv.className = "books";
            
            bookDiv.innerText = book_name.book;
            booksBar.appendChild(bookDiv);
            // on click on the any book , it will show the chapters of that book 
            bookDiv.addEventListener("click", () => {
                // capture the book name
                // update the book name context db at choice,
                  book_name.choice = book_name.book;
                    console.log(book_name.choice);

                 //create a div for each chapters by looping the chapter length each div class name is chapter
                    for (let i = 0; i < book_name.chapters.length; i++) {
                        const chapterDiv = document.createElement("div");
                        chapterDiv.className = "chapter";
                        chapterDiv.innerText = i+1;
                        bookDiv.appendChild(chapterDiv);
                        //on click on the chapter show show bookname[i].verses
                        chapterDiv.addEventListener("click", () => {
                            // update book_names choice by appending the chapter number
                            book_name.choice = book_name.choice + " " + (i+1)+":";
                            console.log(book_name.choice);
                            console.log(book_name.chapters[i].verses);
                            //create a div for each verses by looping the verses length each div class name is verse
                            for (let j = 0; j < book_name.chapters[i].verses; j++) {
                                const verseDiv = document.createElement("div");
                                verseDiv.className = "verse";
                                verseDiv.innerText = j+1;
                                chapterDiv.appendChild(verseDiv);
                                //add click event lister to console log the verse clicked
                                verseDiv.addEventListener("click", () => {
                                    book_name.choice = book_name.choice+ (j+1);
                                    console.log(book_name.choice);  
                                    reader_choice = book_name.choice;
                            });
                            }
                        }, {once: true}); // add the {once: true} option here
                    };

                bookDiv.removeEventListener("click", () => {
                    console.log(book_name.abbr);
                });

            }, {once: true}); // add the {once: true} option here too

    });
    fetchButton.addEventListener("click", (event) => {
        fetch(`https://bible-api.com/${reader_choice}`)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        //stop the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
        //break loop
        event.stopPropagation();
        // do something with the response data

        //replace every text in context-bar with the response data
        // data.reference as h2 and data.text as p create the html elements
        //append the elements to the context-bar
        //replace all the elements in the context-bar with the new elements
        const contextBar = document.getElementById("context-bar");
        const h2 = document.createElement("h2");
        h2.innerText = data.reference;
        const p = document.createElement("p");
        p.innerText = data.text;
        contextBar.innerHTML = `<h2>${data.reference}</h2><p>${data.text}</p>`;



    });
});  

    });