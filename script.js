/**
 * Creates an alias for the document object.
 * @type {Document}
 */
let $ = document;

/**
 * Selects and returns the first element with the specified class name.
 * @param {string} selector - The class name of the desired element.
 * @returns {Element | null} - The first element found with the specified class name.
 */
const _class = (selector) => {
    const element =  $.querySelector('.'+ selector);
    if(!element){
        throw new Error(`No element found with class ${selector}`);
    }
    return element;
}

/**
 * Selects and returns the element with the specified ID.
 * @param {string} selector - The ID of the desired element.
 * @returns {Element | null} - The element found with the specified ID.
 */
const _id = (selector) => {
    const element = $.querySelector('#'+ selector);
    if(!element){
        throw new Error(`No element found with id ${selector}`)
    }
    return element;
}

/**
 * Creates a new DOM element with the specified name.
 * @param {string} name - The name of the element to be created (e.g., 'div', 'span', etc.).
 * @returns {Element} - The created DOM element.
 * @throws {Error} - Throws an error if the provided name is not valid.
 */
const _create = (name) => {
    let element;

    if (name !== '') {
        element = $.createElement(name);
    } else {
        throw new Error('Element name is not valid');
    }

    return element;
}

/**
 * Logs the provided value to the console.
 * @param {*} value - The value to be logged.
 */
const _log = (value)=>{
    if(typeof value == 'undefined'){
        console.log('-------------')
    }else{
        console.log(value);
    }   
}

// Add
const inputElement = _id('todo-input');
const buttonElement = _id('add-button');

buttonElement.addEventListener('click',()=>{
    const todoList = _id('todo-list');
    
    if(inputElement.value.trim()!== ""){
        const createDivItem = _create('div');
        createDivItem.classList.add('todo-item');

        const createSpan = _create('span');
        createSpan.classList.add('title')
        createSpan.innerHTML = inputElement.value;

        const deleteButton = _create('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = 'Delete';

        const editButton = _create('button');
        editButton.classList.add('edit'); 
        editButton.innerHTML = 'Edit';

        todoList.append(createDivItem);
        createDivItem.append(createSpan,deleteButton,editButton);
    }else{
        alert('To add a new item to your list, you must enter a value.')
    }
})

/**
 * Displays a modal for deleting an item.
 * @param {string} title - The title of the modal.
 * @param {string} body - The body text of the modal.
 * @param {Function} deleteback - The callback function to be executed when the delete button is clicked.
 *                               It receives the delete button element and the modal container element as parameters.
 * @param {Function} cancelBack - The callback function to be executed when the cancel button is clicked.
 *                               It receives the cancel button element and the modal container element as parameters.
 */
const showDeleteModal = (title, body, deleteback, cancelBack) => {
    const getModalDelete = _id('modal-container');
    getModalDelete.style.display = 'flex';

    let modalTitle = getModalDelete.querySelector('#modal-header h2');
    modalTitle.innerHTML = title;

    let modalBody = getModalDelete.querySelector('#modal-body p');
    modalBody.innerHTML = body;

    let deleteButton = getModalDelete.querySelector('#modal-footer button#delete-btn');
    let cancelButton = getModalDelete.querySelector('#modal-footer button#cancel-btn');

    deleteback(deleteButton, getModalDelete);
    cancelBack(cancelButton, getModalDelete);
}


/**
 * Displays a modal for editing an item.
 * @param {string} title - The title of the modal.
 * @param {Function} editCallback - The callback function to be executed when the edit button is clicked.
 *                                  It receives the edit button, the modal container element, and the input element as parameters.
 * @param {Function} cancelCallBack - The callback function to be executed when the cancel button is clicked.
 *                                    It receives the cancel button and the modal container element as parameters.
 */
const showModalEdit = (title, editCallback, cancelCallBack) => {
    const getModal = _id('edit-modal-container');
    getModal.style.display = 'flex';

    let modalTitle = getModal.querySelector('div#edit-modal-header h2');
    modalTitle.innerHTML = title;

    let getInputValue = getModal.querySelector('input#edit-input');
    
    let getEditButton = getModal.querySelector('button#edit-btn');
    let getCancelButton = getModal.querySelector('button#cancel-edit-btn');

    editCallback(getEditButton, getModal, getInputValue);
    cancelCallBack(getCancelButton, getModal);
}


// Delete
let todoList = _id('todo-list');
todoList.addEventListener('click',(event)=>{
    if(event.target.classList.contains('delete-btn')){
        const todoItem = event.target.closest('.todo-item');
        const title = todoItem.querySelector('.title').innerHTML;
        
        if(todoItem){
            showDeleteModal('Delete Confirmation',`Are you sure you want to delete the item ${title}?`,(del,modal)=>{
                del.addEventListener('click',()=>{
                    todoItem.remove();
                    modal.style.display = 'none';
                });
            },(cancel,modal)=>{
                cancel.addEventListener('click',()=>{
                    modal.style.display = 'none';
                })
            });
        }
    }
})

// Update
todoList.addEventListener('click',(event)=>{
    if(event.target.classList.contains('edit')){
        let todoItem = event.target.closest('.todo-item');
        const getTitle = todoItem.querySelector('.title').innerHTML;
        showModalEdit(`Update ${getTitle}`,(saveButton,modal,input)=>{
            saveButton.addEventListener('click',()=>{
                if(input.value !== null && input.value.trim()!==""){
                    todoItem.querySelector('.title').innerHTML = input.value;
                    modal.style.display = 'none';
                    input.value =''
                }
            })
        },(cancel,modal)=>{
            cancel.addEventListener('click',()=>{
                modal.style.display = 'none';
            })
        })
    }
})
