//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementsByClassName("list-form_text")[0];//Add a new task.
var addButton=document.getElementsByClassName("list-form_add-button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbox
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className='list-form_label';
    listItem.className="list-form"
    checkBox.className="list-form_checkbox"
    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="list-form_text";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="list-form_edit-button";
    editButton.addEventListener('click', editTask);

    deleteButton.className="list-form_remove-button";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.alt="remove button"
    deleteButtonImg.className="list-form_remove-button_img"
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(event){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);
    taskInput.value="";
    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

}

//Edit an existing task.
var editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
  
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('.list-form_text');
    var label = listItem.querySelector(".list-form_label");
    var editBtns = listItem.querySelectorAll(".list-form_edit-button");
    var containsClass = listItem.classList.contains("list-form_edit");
  
    //If class of the parent is .editmode
    if (containsClass) {
  
      //switch to .editmode
      //label becomes the inputs value.
      label.innerText = editInput.value;
      editBtns[0].innerText = "Edit"; //using index to get the first edit button
    } else {
      editInput.value = label.innerText;
      editBtns[0].innerText = "Save"; //using index to get the first edit button
    }
  
    //toggle .editmode on the parent.
    listItem.classList.toggle("list-form_edit");
};

var editBtns = document.querySelectorAll('.list-form_edit-button');

for (var i = 0; i < editBtns.length; i++) {
    editBtns[i].addEventListener('click', editTask);
}



//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted = function () {
    console.log("Complete Task...");
        // Remove event listeners from the checkbox and delete button
    var checkBox = this.parentNode.querySelector('.list-form_checkbox');
    var deleteButtonComplete = this.parentNode.querySelector('.list-form_remove-button');
    checkBox.removeEventListener('change', taskIncomplete);
    deleteButtonComplete.removeEventListener('click', deleteTask);

    // Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
  
  };
  
  var taskIncomplete = function () {
    console.log("Incomplete Task...");
  // Remove event listeners from the checkbox and delete button
var checkBox = this.parentNode.querySelector('.list-form_checkbox');
var deleteButtonIncomplete = this.parentNode.querySelector('.list-form_remove-button');
checkBox.removeEventListener('change', taskIncomplete);
deleteButtonIncomplete.removeEventListener('click', deleteTask);

    // Mark task as incomplete.
    // When the checkbox is unchecked
    // Append the task list item to the #incompleteTasks.
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  
  };




var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.

addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem, checkBoxEventHandler){
    console.log("bind list item events");
    //select ListItems children
    var checkBox = taskListItem.querySelector('.list-form_checkbox');
    var editButton = taskListItem.querySelector('.list-form_edit-button');
    var deleteButton = taskListItem.querySelector('.list-form_remove-button');

    // Remove existing event listeners from the checkbox and delete button
    checkBox.removeEventListener('change', taskCompleted);
    checkBox.removeEventListener('change', taskIncomplete);
    deleteButton.removeEventListener('click', deleteTask);

    //Bind checkBoxEventHandler to checkbox.
    checkBox.onchange = checkBoxEventHandler;

    editButton.addEventListener('click', editTask);

    deleteButton.addEventListener("click", deleteTask);
}


//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.