const booksBar = document.getElementById("context-bar");
const fetchButton = document.getElementById("fetch-button");
const selectButton = document.getElementById("select-button");
let reader_choice;

fetch("http://localhost:3000/bible")
  .then(response => response.json())
  .then(books => {
    books.forEach(book_name => {
      selectButton.addEventListener("click", () => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "books";
        bookDiv.innerText = book_name.book;
        booksBar.appendChild(bookDiv);
        //reload page
        

        // on click on the any book , it will show the chapters of that book 
        bookDiv.addEventListener("click", () => {
          // Remove other book options from DOM
          const bookOptions = booksBar.querySelectorAll(".books");
          bookOptions.forEach(option => {
            if (option !== bookDiv) {
              booksBar.removeChild(option);
            }
          });

          book_name.choice = book_name.book;
          console.log(book_name.choice);

          for (let i = 0; i < book_name.chapters.length; i++) {
            const chapterDiv = document.createElement("div");
            chapterDiv.className = "chapter-button";
            chapterDiv.innerText = i+1;
            bookDiv.appendChild(chapterDiv);

            //on click on the chapter show bookname[i].verses
            chapterDiv.addEventListener("click", () => {
              book_name.choice = book_name.choice + " " + (i+1)+":";
              console.log(book_name.choice);
              console.log(book_name.chapters[i].verses);

              for (let j = 0; j < book_name.chapters[i].verses; j++) {
                const verseDiv = document.createElement("div");
                verseDiv.className = "verse-button";
                verseDiv.innerText = j+1;
                chapterDiv.appendChild(verseDiv);

                //add click event listener to console log the verse clicked
                verseDiv.addEventListener("click", () => {
                  book_name.choice = book_name.choice+ (j+1);
                  console.log(book_name.choice);  
                  reader_choice = book_name.choice;
                        // hide all other chapter divs except for the current one
    const allChapters = bookDiv.querySelectorAll(".chapter-button");
    allChapters.forEach((chapter) => {
      if (chapter !== chapterDiv) {
        chapter.style.display = "none";
      }});
                  // hide all other verse divs except for the current one
                  const allVerses = chapterDiv.querySelectorAll(".verse-button");
                  allVerses.forEach((verse) => {
                    if (verse !== verseDiv) {
                      verse.style.display = "none";
                    }
                });

                }, {once: true});
              }

              // hide all other chapter divs except for the current one
              const allChapters = bookDiv.querySelectorAll(".chapter-button");
              allChapters.forEach((chapter) => {
                if (chapter !== chapterDiv) {
                  chapter.style.display = "none";
                }
              });

            }, {once: true});
          }

          bookDiv.removeEventListener("click", () => {
            console.log(book_name.abbr);
          });

        }, {once: true});

      });
      
    });

    fetchButton.addEventListener("click", (event) => {
      fetch(`https://bible-api.com/${reader_choice}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          event.stopPropagation();

          const contextBar = document.getElementById("context-bar");
          const h2 = document.createElement("h2");
          h2.innerText = data.reference;
          const p = document.createElement("p");
          p.innerText = data.text;
          contextBar.innerHTML = `<h2>${data.reference}</h2><p>${data.text}</p>`;

        });
    });
});
