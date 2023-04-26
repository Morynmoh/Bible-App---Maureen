document.addEventListener("DOMContentLoaded", function() {
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
        bookDiv.addEventListener("click", () => {

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

       
            chapterDiv.addEventListener("click", () => {
              book_name.choice = book_name.choice + " " + (i+1)+":";
              console.log(book_name.choice);
              console.log(book_name.chapters[i].verses);

              for (let j = 0; j < book_name.chapters[i].verses; j++) {
                const verseDiv = document.createElement("div");
                verseDiv.className = "verse-button";
                verseDiv.innerText = j+1;
                chapterDiv.appendChild(verseDiv);

                verseDiv.addEventListener("click", () => {
                  book_name.choice = book_name.choice+ (j+1);
                  console.log(book_name.choice);  
                  reader_choice = book_name.choice;
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
});

// recreate code above including DOMContentLoaded , dividing into functions and async await
document .addEventListener("DOMContentLoaded", function() {
  const booksBar = document.getElementById("context-bar");
  const fetchButton = document.getElementById("fetch-button");
  const selectButton = document.getElementById("select-button");
  let reader_choice;

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:3000/bible");
    const books = await response.json();
    return books;
  }

  const fetchVerses = async (reader_choice) => {
    const response = await fetch(`https://bible-api.com/${reader_choice}`);
    const verses = await response.json();
    return verses;
  }

  const createBookDiv = (book_name) => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "books";
    bookDiv.innerText = book_name.book;
    booksBar.appendChild(bookDiv);
    return bookDiv;
  }

  const createChapterDiv = (bookDiv, i) => {
    const chapterDiv = document.createElement("div");
    chapterDiv.className = "chapter-button";
    chapterDiv.innerText = i+1;
    bookDiv.appendChild(chapterDiv);
    return chapterDiv;
  }

  const createVerseDiv = (chapterDiv, j) => {
    const verseDiv = document.createElement("div");
    verseDiv.className = "verse-button";
    verseDiv.innerText = j+1;
    chapterDiv.appendChild(verseDiv);
    return verseDiv;
  }

  const createVerseDivs = (book_name, i) => {

    for (let j = 0; j < book_name.chapters[i].verses; j++) {
      const chapterDiv = createChapterDiv(bookDiv, i);
      const verseDiv = createVerseDiv(chapterDiv, j);
      verseDiv.addEventListener("click", () => {
        book_name.choice = book_name.choice+ (j+1);
        console.log(book_name.choice);  
        reader_choice = book_name.choice;
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
  }

  const createChapterDivs = (book_name, bookDiv) => {
    for (let i = 0; i < book_name.chapters.length; i++) {
      const chapterDiv = createChapterDiv(bookDiv, i);
      createVerseDivs(book_name, i);
      chapterDiv.addEventListener("click", () => {
        book_name.choice = book_name.choice + " " + (i+1)+":";
        console.log(book_name.choice);
        console.log(book_name.chapters[i].verses);
        // hide all other chapter divs except for the current one
        const allChapters = bookDiv.querySelectorAll(".chapter-button");
        allChapters.forEach((chapter) => {
          if (chapter !== chapterDiv) {
            chapter.style.display = "none";
          }
        });
      }, {once: true});
    }
  }

  const createBookDivs = (books) => {
    books.forEach((book_name) => {
      const bookDiv = createBookDiv(book_name);
      bookDiv.addEventListener("click", () => {
        book_name.choice = book_name.abbr;
        console.log(book_name.choice);
        createChapterDivs(book_name, bookDiv);
      }, {once: true});
    });
  }

  const createFetchButton = () => {
    fetchButton.addEventListener("click", async (event) => {
      const verses = await fetchVerses(reader_choice);
      event.stopPropagation();
      const contextBar = document.getElementById("context-bar");
      contextBar.innerHTML = `<h2>${verses.reference}</h2><p>${verses.text}</p>`;
    });
  }

  const createSelectButton = () => {
    selectButton.addEventListener("click", async (event) => {
      const books = await fetchBooks();
      event.stopPropagation();
      createBookDivs(books);
    });
  }

  createFetchButton();
  createSelectButton();
});

