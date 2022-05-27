# Final task for JavaScript Basics Course: Todo List 

The practice task is a simple Todo List application written without using libraries with pure JS only.


## Basic requirement 

1. Interface to view/add/edit/delete Todo list items 
2. The application consists of two lists: Open and Done 
3. Each entry in the lists must have two statuses: completed or open 
4. The application provides the ability to search by lists 
5. The state of the application should be saved after a page is reloaded 

## Technical details 

### Application 

1. The application must have a search field for all records. When a user starts typing a query in the search field, each time a key is pressed, if the field is not empty, both Open and Done lists are filtered relative to the entered query. When the field is cleared, the lists are displayed in their original state. 
2. A data should be stored in localStorage and displayed after a page is reloaded. Saving should occur at every key action:
    *  add/delete/edit records 
    *  sorting lists 

### Lists 

1. To add a new entry to the Open list, a user enters text in the “New task" field and presses the "ADD" button. The "New task" field is cleared and a new entry appears in the Open list
2. Under each list there is a link with which you can clear the entire list
3. The Open list should be sorted by:
    * creation date (asc/desc) 
4. The Done list should be sorted by: 
    * records (asc/desc) 

### Records

1. Each record must have the following fields: 
    * text 
    * creation date 
    * status 
    * due date (after changing the status to completed) 
2. When a user clicks on the checkbox of an open record, it is marked as completed and will be placed in the Done list 
3. When a user clicks on the checkbox of a completed record, it is marked as opened and will be placed in the Open list 
4. When a user hovers over a record, the delete icon appears 
5. When a user clicks on the delete icon the entry is deleted 
6. To edit a record a user needs to double click on its text 
7. When a user double-clicks, the text is replaced with an input field where you can correct the current value. When a user presses Enter key, the value is saved and the field is hidden, showing the corrected text. When a user presses Esc key, the field is hidden, showing the previous value. 

### Design 

The design of the application is presented in the form of layouts below in this document. When working with layouts, you should pay attention primarily to the location of elements and their behavior. The style of the elements is optional, but it is recommended to use the one proposed. Precision indentation between elements can also be neglected, as it is presented solely for the sake of clarity. 

## Check list 

1. Overall interface of the application 
2. Display two task lists 
3. Add, edit, and delete tasks 
4. Clearing of task lists 
5. Sorting of task lists 
6. Search by task lists 
7. Save application state after page reload 

## Layouts

_Main application window_ 

![Main application window](images/1.png)

_Editing a task_

![Editing a task](images/2.png)

_Double click on the button brings up the edit field_

![Double click on the button brings up the edit field](images/3.png)

_Task delete icon_

![Task delete icon](images/4.png)

_Delete icon appears when user hovers over the item_

![Delete icon appears when user hovers over the item](images/5.png)


### About the JavaScript Basics Course 

Duration: 10 weeks (October-December 2021)

Consists of following modules:
1. Introduction to JS basics (Basic concepts of Javascript language; Understanding Variable Scope & Closures; Types conversions and equality; ES6 features + Excersises)
2. Functions and functional expressions (Functions basics; Recursion; Closures; Currying + Excersises)
3. Objects, context and inheritance basics (Basics; Objects creation; Inheritance + Excersises)
4. OOP. Prototypes. More on objects and inheritance (Inheritance; Object Creation; History of OOP + Excersises)
5. Asynchronous JavaScript (Callbacks; Promises; Async functions; Generators; Event loop + Excersises)
6. Styling and Layout (Basics; Flexbox)
7. DOM (DOM; Events + Excersises)
8. Browser API. Web storage and AJAX calls (Basics; Web storage API; Working With Data; Other APIs)
9. Bundlers and environment preparation  (NPM; Babel; Webpack; Eslint; IDE and plugins)
10. Final task: Todo List

_My mentoring program diploma_ 

![My mentoring program diploma](images/Diploma.png)



