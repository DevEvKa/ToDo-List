//получаем основные элементы интерфейса
let addBtn = document.querySelector('.add-btn'),
	addInput = document.querySelector('.add_input'),
	openTaskList = document.querySelector('.open_tasks'),
	doneTaskList = document.querySelector('.done_tasks'),
	clearOpenBtn = document.querySelector('.clear_open'),
	clearDoneBtn = document.querySelector('.clear_done'), 
	openSelect = document.querySelector('.open .select'),
	doneSelect = document.querySelector('.done .select'),
	searchTaskInput = document.querySelector('.search-input');


//привязываем обработчики на основные элементы
addBtn.addEventListener('click', createNewTask);
clearOpenBtn.addEventListener('click', clearOpenList);
clearDoneBtn.addEventListener('click', clearDoneList);
openSelect.addEventListener("change", selectOpenTaskList);
doneSelect.addEventListener("change", selectDoneTaskList);
searchTaskInput.addEventListener('keyup', searchTask);

//инициализируем пустой массив, который будет содержать задания
let taskList = [];

//проверяем localStorage и отрисовываем задания, если там не пусто
if (localStorage.getItem('todo')) {
	taskList = JSON.parse(localStorage.getItem('todo'));
	init();
}

//проверяем localStorage и заполняем select в разделе невыполненных заданий, если там не пусто
if (localStorage.getItem('openSelectionValue')) {
	let options = openSelect.querySelectorAll('option');
	options.forEach(option => {
		if (option.value === localStorage.getItem('openSelectionValue')) {
			option.setAttribute('selected', true);
		}
	})
}

//проверяем localStorage и заполняем select в разделе выполненных заданий, если там не пусто
if (localStorage.getItem('doneSelectionValue')) {
	let options = doneSelect.querySelectorAll('option');
	options.forEach(option => {
		if (option.value === localStorage.getItem('doneSelectionValue')) {
			option.setAttribute('selected', true);
		}
	})
}

//генерируем id для заданий (вспомогательная функция)
function generateId () {
	let symbols = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return id;
}

 //получаем время создания/выполнения задания (вспомогательная функция)
function getTime() {
	let time = new Date();
	return time;
};

//создаем массив объектов-заданий
function createNewTask() {
	if (addInput.value !== '') {
		let newTask = {
			id: generateId(),
			task: addInput.value,
			checked: false,
			setCreateTime: (getTime().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })),
			setCreateDate: getTime(),
			setDoneTime: ''
		}
		taskList.push(newTask);
		addInput.value = '';
	}
	init();
	localStorage.setItem('todo', JSON.stringify(taskList));	
}

//функция инициализации различных событий созданных заданий
function init() {
	displayOpenTasks(taskList);
	displayDoneTasks(taskList);
	deleteSingleTask();
	changeChecked();
	editTask ();
}

//отображаем невыполненные задания
function displayOpenTasks(tasksArray) {
	//проверка на пустой массив
	if (tasksArray === undefined || tasksArray.length === 0) {
		openTaskList.innerHTML = '';
		return
	};

	//наполнение списка
	let displayOpenTask = '';
	tasksArray.forEach(function (item) {
		if (item.checked === false) {
			displayOpenTask += `
			<li class='section_task' id='${item.id}'>
				<div class='task_descr'>
					<input type='checkbox' class='task-checkbox'>
					<label for='${item.id}' class='task-text'>${item.task}</label>
				</div>
				<div class="task-times">
					<p class="task_time">${item.setCreateTime}</p>
				</div>
				<button class="task_delete">
					<i class="fa fa-trash fa-2x" aria-hidden="true"></i>
				</button>
			</li>
			`;				
			openTaskList.innerHTML = displayOpenTask;
		}
	});
}

//отображаем выполненные задания
function displayDoneTasks(tasksArray) {
	//проверка на пустой массив
	if (tasksArray === undefined || tasksArray.length === 0) {
		doneTaskList.innerHTML = '';
		return
	}

	//наполнение списка
	let displayDoneTask = '';
	if (tasksArray.length === 0) doneTaskList.innerHTML = '';
	tasksArray.forEach(function (item) {
		if (item.checked === true) {
			displayDoneTask += `
			<li class='section_task' id='${item.id}'>
				<div class='task_descr'>
					<input type='checkbox' class='task-checkbox' checked>
					<label for='${item.id}' class='task-text'>${item.task}</label>
				</div>
				<div class="task-times">
					<p class="task_time">${item.setCreateTime}</p>
					<p class="task_time task-time_done">${(item.setDoneTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
				</div>
				<button class="task_delete">
					<i class="fa fa-trash fa-2x" aria-hidden="true"></i>
				</button>
			</li>
			`;
			doneTaskList.innerHTML = displayDoneTask;
		}
	});
}

//меняем статус задания ("выполнено"/"не выполнено")
function changeChecked() {
	let checkboxList = document.querySelectorAll('.task-checkbox');
	checkboxList.forEach(function(checkboxItem, index) {
		checkboxItem.addEventListener('click', function(event) {
			let taskItem = checkboxItem.parentNode.parentNode;
			let id = taskItem.getAttribute('id');
			if (checkboxItem.checked == true) {
				for (let i=0; i<taskList.length; i++) {
					if (taskList[i].id === id) {
						taskList[i].checked = true
						taskList[i].setDoneTime = getTime().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
					}
				}
			} else {
				for (let i=0; i<taskList.length; i++) {
					if (taskList[i].id === id) {
						taskList[i].checked = false;
					}
				}
			}
			taskItem.remove();
			localStorage.setItem('todo', JSON.stringify(taskList));
			init();			
		})
	})
}

//удаляем задание по клику на кнопку в элементе задания
function deleteSingleTask() {
	let delBtnList = document.querySelectorAll('.task_delete');
	delBtnList.forEach(function(delBtnItem, index) {
		delBtnItem.addEventListener('click', function() {
			let taskItem = delBtnItem.parentNode;
			let id = taskItem.getAttribute('id');
			for (let i=0; i<taskList.length; i++) {
				if (taskList[i].id === id) {
					taskList.splice(i, 1);
				}
			}
			taskItem.remove();
			localStorage.setItem('todo', JSON.stringify(taskList));
		})		
	})
	
}

//очищаем список невыполненных
function clearOpenList() {
	let tasksToRemove = document.querySelectorAll('.open_tasks .section_task');
	tasksToRemove.forEach((taskItem, index) => {
		for (let i=0; i<taskList.length; i++) {
			if (taskList[i].id === taskItem.id) {
				taskList.splice(i, 1);
				taskItem.remove()
			}
		}
	})
	localStorage.setItem('todo', JSON.stringify(taskList));	
	init();
}

//очищаем список выполненных
function clearDoneList() {
	let tasksToRemove = document.querySelectorAll('.done_tasks .section_task');
	tasksToRemove.forEach((taskItem, index) => {
		for (let i=0; i<taskList.length; i++) {
			if (taskList[i].id === taskItem.id) {
				taskList.splice(i, 1);
				taskItem.remove()
			}
		}
	})
	localStorage.setItem('todo', JSON.stringify(taskList));	
	init();
}

//редактируем задание
function editTask () {
	let editFieldList = document.querySelectorAll('.task-text');
	editFieldList.forEach(function (editField, index) {
		let counter = 0;
		editField.addEventListener('click', function(event) {
			let taskItem = editField.parentNode.parentNode;
			counter++;
      if (counter === 1) {
        setTimeout(function(){
          if(counter === 2) {
            changeTaskText();
          }
          counter = 0;
        }, 500);
			}

			function changeTaskText () {
				editField.contentEditable = true;
				let savedEditfieldValue = editField.textContent;
				editField.addEventListener('keydown', function (event) {
					let id = taskItem.getAttribute('id');
					if (event.code === 'Enter') {
						for (let i=0; i<taskList.length; i++) {
							if (taskList[i].id === id) {
								taskList[i].task = editField.textContent;
								editField.contentEditable = false;
							}
						}	
						event.preventDefault();
					}
					if (event.code === 'Escape') {
						editField.textContent = savedEditfieldValue;
						editField.contentEditable = false;
					}
					localStorage.setItem('todo', JSON.stringify(taskList));			
				})
			}	
		})	
	})	
}

//сортируем невыполненные задания
function selectOpenTaskList() {
	let tempOpenTasks = [];
	taskList.forEach((task, index) => {
			if (task.checked === false) {
				tempOpenTasks.push(task);
			}
		})
		if (openSelect.value === 'Date creation (Asc)') {
			let sortByDate = (a,b) => {
				let aDate = Date.parse(a.setCreateDate);
				let bDate = Date.parse(b.setCreateDate);
				return aDate < bDate ? 1 : -1;
			}
			tempOpenTasks.sort(sortByDate);
	} else if (openSelect.value === 'Date creation (Desc)') {
			let sortByDate = (a,b) => {
				let aDate = Date.parse(a.setCreateDate);
				let bDate = Date.parse(b.setCreateDate);
				return aDate > bDate ? 1 : -1;
			}
			tempOpenTasks.sort(sortByDate);
	}
	localStorage.setItem('openSelectionValue', openSelect.value);
	tempOpenTasks.reverse();

	for (let i=0; i<taskList.length; i++) {  
    if (taskList[i].checked === false) {
        for (let j=tempOpenTasks.length-1; j>=0; j--) {
            taskList.splice(i, 1, tempOpenTasks[j])
            tempOpenTasks.pop();
						break  
					}
			}  
	}

	init();
	localStorage.setItem('todo', JSON.stringify(taskList));
}

//сортируем выполненные задания
function selectDoneTaskList() {
	let tempDoneTasks = [];
	taskList.forEach((task, index) => {
			if (task.checked === true) {
				tempDoneTasks.push(task);
			}
		})
		
		if (doneSelect.value === 'Text (Asc)') {
		let sortByTaskText = (a,b) => {
			return a.task < b.task ? 1 : -1;
		}
		tempDoneTasks.sort(sortByTaskText);
	} else if (doneSelect.value === 'Text (Desc)') {
		
		let sortByTaskText = (a,b) => {
			console.log(a, b)
			return a.task > b.task ? 1 : -1;
		}
		tempDoneTasks.sort(sortByTaskText);
	}

	localStorage.setItem('doneSelectionValue', doneSelect.value);
	tempDoneTasks.reverse();

	for (let i=0; i<taskList.length; i++) {  
    if (taskList[i].checked === true) {
        for (let j=tempDoneTasks.length-1; j>=0; j--) {
            taskList.splice(i, 1, tempDoneTasks[j])
            tempDoneTasks.pop();
						break  
					}
			}  
	}

	init();
	localStorage.setItem('todo', JSON.stringify(taskList));
}

//производим поиск по тексту заданий
function searchTask() {

	let searchedText = searchTaskInput.value.toLowerCase();
	let textList = document.querySelectorAll('.task-text');

	textList.forEach(item => {
		let text = item.innerText.toLowerCase();
		if (!text.includes(searchedText)) {
			item.parentNode.parentNode.style.display = 'none';
		} else {
			item.parentNode.parentNode.style.display = 'flex';
		}
	})
}

