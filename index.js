const booksBar = document.getElementById("context-bar");
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

                
                 console.log(book_name.chapters.length);
                 //create a div for each chapters by looping the chapter length each div class name is chapter
                    for (let i = 0; i < book_name.chapters.length; i++) {
                        const chapterDiv = document.createElement("div");
                        chapterDiv.className = "chapter";
                        chapterDiv.innerText = i+1;
                        bookDiv.appendChild(chapterDiv);
                        //on click on the chapter show show bookname[i].verses
                        chapterDiv.addEventListener("click", () => {
                            console.log(book_name.chapters[i].verses);
                            //create a div for each verses by looping the verses length each div class name is verse
                            for (let j = 0; j < book_name.chapters[i].verses; j++) {
                                const verseDiv = document.createElement("div");
                                verseDiv.className = "verse";
                                verseDiv.innerText = j+1;
                                chapterDiv.appendChild(verseDiv);
                            }
                        }, {once: true}); // add the {once: true} option here
                    };

                bookDiv.removeEventListener("click", () => {
                    console.log(book_name.abbr);
                });

            }, {once: true}); // add the {once: true} option here too
        });

        //add click for button stoggle show and hide of the books div the button class is books_toggle

    });
    // add click event listerner to the button to add inline style options_books, show and hide




 //