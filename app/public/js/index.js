const Offer = {
    data() {
      return {
      //   students: [],
      //   selectedStudent: null,
      //   offers: [],
        bookForm: {},
        books: [],
        selectedBook: null,
      }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectStudent(s) {
            if (s == this.selectedStudent) {
                return;
            }
            this.selectedStudent = s;
            this.offers = [];
            this.fetchOfferData(this.selectedStudent);
        },
        fetchStudentData() {
            fetch('/api/student/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.students = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchOfferData(s) {
            console.log("Fetching offer data for ", s);
            fetch('/api/offer/?student=' + s.id)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.offers = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        fetchBookData() {
          fetch('/api/book/index.php')
          .then( response => response.json() )
          .then((parsedJson) => {
            this.books = parsedJson; 
          })
          .catch( (err) => {
              console.error(err);
          })
      },
      selectBook(b) {
          if (b == this.selectedBook) {
              return;
          }
          this.selectedBook = b;
          this.books = [];
          this.fetchBookData(this.selectedBook);
      },
      postNewBook(evt) {
          // this.bookForm.title = this.selectedBook.title;
          // console.log("Posting!", this.bookForm);
          alert("Created!");
  
          fetch('api/book/create.php', {
              method:'POST',
              body: JSON.stringify(this.bookForm),
              headers: {
                  "Content-Type": "application/json; charset=utf-8"
              }
          })
          .then( response => response.json())
          .then( json => {
              console.log("Returned from post:", json);
              this.books = json;
              this.bookForm = {};
          });
      }
    },
    created() {
        this.fetchBookData();
    }
  
  }
  
  Vue.createApp(Offer).mount('#offerApp');


























  const BookApp = {
    data() {
      return {
            result:undefined,
            app: 0,
            books: [],
            selectedBook: null,
            bookForm:{}
            
        }
    },

    computed: {
       
    },
    methods:{ fetchUserData()  {
        fetch('https://randomuser.me/api') // Getting the data from the site, opens webpage in background - returns a promise - either do then or catch
        .then( response => response.json())   //return response in json format, creates a method - it returns a promise object
        .then(
            (json) => {
                console.log(json); // put it in console log
                this.result = json.results[0]; // updaing the data value - vue recognizes it changed and updates it
                console.log(this.result);
                
            }
        )

    },

    prettyData(d) {
        return dayjs(d)
        .format('D MMM YYYY')
    },
    prettyDollar(n) {
        const d = new Intl.NumberFormat("en-US").format(n);
        return "$ " + d;
    },
    
    // selectedBook(s) {
    //     if (s == this.selectedBook) {
    //         return;
    //     }
    //     this.selectedBook = s;
    //     this.books = [];
    //     this.fetchBookData(this.selectedBook);
    // },
    
    fetchBookData() {
          fetch('/api/books/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.books = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      },
      postBook(evt) {
        console.log ("Test:", this.selectedBook);
      if (this.selectedBook) {
          this.postEditBook(evt);
      } else {
          this.postNewBook(evt);
      }
    },
      postNewBook(evt){
        //this.bookForm.id = this.id;
        //console.log("Posting:", this.bookForm);
        //alert("Posting!");

        fetch('api/books/create.php', {
            method:'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.books = json;

         // this.bookForm = {};
         this.bookForm={};
            this.fetchBookData();
         this.handleResetBook();
        });
    },
    postEditBook(evt){
        this.bookForm.id = this.selectedBook.id;
        //this.offerForm.id=this.selectedOffer.id;
        
       console.log("Updating!", this.bookForm);
        //alert("Posting!");

        fetch('api/books/update.php', {
            method:'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.books = json;

         // this.offerForm = {};
         this.handleResetBook();
         // this.resetOfferForm();
        });
    },
    postDeleteBook(o){
        if(!confirm("Are you sure you want to delete the book " +o.title+"?"))
            {return;}

        
        fetch('api/books/delete.php', {
            method:'POST',
            body: JSON.stringify(o),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.books = json;

         // this.offerForm = {};
         this.handleResetBook();
         // this.resetOfferForm();
        });

    },
    selectBook(o) {
        this.selectedBook = o;
        this.bookForm = Object.assign({}, this.selectedBook);
      },
      

    handleEditBook(book){
        this.selectedBook = book;
        this.bookForm = Object.assign({}, this.selectedBook);
    },
    handleResetBook(){
        this.selectedBook = null;
        this.bookForm = {};
    }
    
    
    },
    created() { 
        
        //this.fetchUserData();
        this.fetchBookData();
        // after vue instance created, the function is called 
        
        // .catch( (error) => console.error(error)/*;}*/ ) /*;*/ // Any error is caught
        
    }
}                      
Vue.createApp(BookApp).mount('#bookapp');