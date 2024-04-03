const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let id_num = 1;

function newTodo() {
  const todoText = prompt("TODO text:");
  console.log(todoText);
  addToDo(todoText);
  id_num++;
}


function addToDo(text) {

  //create container
  const li = createContainer()
  //add a checkbox
  li.appendChild(createCheckbox(li.id))
  //add the text
  li.appendChild(createSpan(li.id, text))
  //add a delete button
  li.appendChild(createDelete(li.id))
  //append to list
  list.appendChild(li)
  //update count
  itemCountSpan.innerHTML = list.getElementsByTagName('li').length
  uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + 1

}

function createContainer() {

  const container = document.createElement('li')
  container.className = classNames['TODO_ITEM']
  const id = id_num;
  container.setAttribute("id", id)
  return container

}

function createCheckbox(id) {

  const checkbox = document.createElement('input')
  checkbox.className = classNames['TODO_CHECKBOX']
  checkbox.setAttribute("type", "checkbox")
  checkbox.setAttribute("id", "check" + id)
  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) - 1
    } else {
      uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + 1
    }
  })
  return checkbox

}

function createSpan(id, text) {

  const span = document.createElement('span')
  span.className = classNames['TODO_TEXT']
  span.setAttribute("id", "text" + id)
  span.innerHTML = text
  return span

}

function createDelete(id) {

  const delbtn = document.createElement('button')
  delbtn.className = classNames['TODO_DELETE']
  delbtn.setAttribute("id", "delete" + id)
  delbtn.innerHTML = "DELETE"
  delbtn.addEventListener('click', function() {
    let item = document.getElementById(id)
    if (!document.getElementById(`check${id}`).checked) {
      uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) - 1
    }
    list.removeChild(item)
    itemCountSpan.innerHTML = list.getElementsByTagName('li').length
  })
  return delbtn

}
