// get ul element

let form=document.querySelector('#book-form');
let booklist=document.querySelector('#book-list')



//book class
class Book
{
    constructor(title,author,isbn)
    {
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

//UI class
class UI
{
    
    static addToBookList(book)
    {
    
        let list=document.querySelector('#book-list');

        let row=document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>`
        
        list.appendChild(row);
        
        console.log(row);
    }
    
    static clearFields()
    {
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
        
    }
    static showAlert(message,className)
    {
        let div=document.createElement('div');
        div.className=`alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container=document.querySelector('.container');
        let form=document.querySelector('#book-form');
        container.insertBefore(div,form);

        setTimeout(function()
        {
            document.querySelector('.alert').remove();
        },3000);
    }

    static deleteFromBook(target)
    {
        if(target.hasAttribute('href'))
        {
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim())
            UI.showAlert('Book Remove!','success');
        }
    }
}


//local storage class
class Store{
    static getBooks()
    {
        let books;
        if(localStorage.getItem('books')===null)
        {
            books=[];
        }
        else
        {
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book)
    {
        let books=Store.getBooks();
        books.push(book)
        localStorage.setItem('books',JSON.stringify(books))
    }

    static displayBooks()
    {
        let books = Store.getBooks();
        books.forEach(book => {
            UI.addToBookList(book)
        });

    }

    static removeBook(isbn)
    {
        let books = Store.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn === isbn )
            {
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books))
    }
}

// Event Listener

form.addEventListener('submit',newBook);
booklist.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBooks())



// Define function

function newBook(e)
{
    let title=document.querySelector('#title').value;
    let author=document.querySelector('#author').value;
    let isbn=document.querySelector('#isbn').value;

    //let ui=new UI();//calling ui class inside new ui variable 
        
    if(title===''|| author===''|| isbn==='' )
    {
            UI.showAlert("Please fill all the feild","error")
    }

    else
    {

        let book=new Book(title,author,isbn);//This book
    
        UI.addToBookList(book) ;///here the book variable is called .... calling the function addToBookList

        UI.clearFields();

        UI.showAlert("Book added","success");

        Store.addBook(book);
    }

    

    e.preventDefault();
}


function removeBook(e)
{
    
        UI.deleteFromBook(e.target);
       
    e.preventDefault();
}

