const SomeApp = {
    data() {
      return {
      //   students: [],
      //   selectedStudent: null,
      //   offers: [],
        books: [],
        selectedBook: null,
        bookForm: {}
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
          fetch('/api/book/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.book = responseJson;
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
          this.book = [];
          this.fetchBooksData(this.selectedBook);
      },
      postNewBook(evt) {
          // this.bookForm.title = this.selectedBook.title;
          // console.log("Posting!", this.bookForm);
          alert("Created!");
  
          fetch('api/books/create.php', {
              method:'POST',
              body: JSON.stringify(this.bookForm),
              headers: {
                  "Content-Type": "application/json; charset=utf-8"
              }
          })
          .then( response => response.json())
          .then( json => {
              console.log("Returned from post:", json);
              this.book = json;
              this.bookForm = {};
          });
      }
    },
    created() {
        this.fetchBookData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#offerApp');