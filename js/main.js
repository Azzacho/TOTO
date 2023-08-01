///////////////////////////////////////////////////////////////////////
//                      TOTO LIST
///////////////////////////////////////////////////////////////////////
//    e.preventDefault(); отменяет обновление страницы 
//       taskInput.value  содержание то что внутри 
//       taskList.insertAdjacentHTML('beforeend',taskHTML);  добавить html <li> 
//       taskInput.value = ""
//       taskInput.focus();    фокус вернется после ентер

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput')
const taskList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) =>  renderTask(task));
}



checkEmptyList();

// добавление задачи
//  submit  кнопок означает "отправить" или "подтвердить".
//addEventListener прослушка 
form.addEventListener('submit',addTask)
//удаление задачи 
taskList.addEventListener('click',deleteTask)
// отмечаем задачу завершонной 
taskList.addEventListener('click',doneTask)



function addTask(event){
    // отменяем проверку формы
    event.preventDefault();

    // достаем текс из поля ввода
    const taskText = taskInput.value

    //описываем задачу в виде обьекта 
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };
    // Добовляем задачу в Массив с задачами
    tasks.push(newTask)

    
// очишаем и делаем фокус инпута
taskInput.value = ""
taskInput.focus();

// // если в списке задач более 1 ого эл. скрывает блок 
// if(taskList.children.length > 1) {
//     emptyList.classList.add('none');
//     }

// HTML
renderTask(newTask)

checkEmptyList();
    // saveHTML()
    saveToLocalStorage()
}
function deleteTask(event){
// (event.target под таргет находится элемент который справоцировал клик(куда кликнул)
    if (event.target.dataset.action !== 'delete') return; // после ретурн не работает если не по кнопке delete
// что бы нужно обратиться к дата атрибутам, нада работать с dataset 

    const perentNode =  event.target.closest('li') 

    //определяем ID задачи по родителям
    const id = Number(perentNode.id);
    
    // // находим индекс задачи в массиве 
    // const index = tasks.findIndex((task) => task.id === id);
    //     // удалить задачу из массива 
    //     tasks.splice(index,1)

        // 2  удалить задачу из массива фильтром 
        tasks = tasks.filter((task) => task.id !== id)




    // удалить задачу из разметки 
    perentNode.remove()
  
    //    // если в списке задач  1  эл. показываем блок 
    // if(taskList.children.length === 1) {
    //     emptyList.classList.remove('none');
    // }

    checkEmptyList();
    // saveHTML()
    saveToLocalStorage()
}
function  doneTask(event){
    if (event.target.dataset.action === 'done') {

        const parentDone = event.target.closest ('li')

        // определяем ID задачи по родителям 
         const id = Number(parentDone.id);  
         const task = tasks.find ((task) => task.id === id )
         task.done = !task.done 



        const taskTitle = parentDone.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')  // toggle выкл-вкл
    }

    // saveHTML()
    saveToLocalStorage()
} 

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
        <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
            
        taskList.insertAdjacentHTML('afterbegin',emptyListHTML)

        if (tasks.length > 0) {
            const emptyEL = document.querySelector('#emptyList')
            emptyList ? emptyEL.remove() : null;
        }
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function renderTask(task) {
  // либо тот либо тот
  const cssClass = task.done ? 'task-title task-title--done' : 'task-title'


  // форма для новой задачи
  const taskHTML = `
      <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
  <span class="${cssClass}">${task.text}</span>
  <div class="task-item__buttons">
      <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18">
      </button>
      <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Done" width="18" height="18">
      </button>
  </div>
</li>`;

//добовляем задачу на страницу
taskList.insertAdjacentHTML('beforeend',taskHTML);
}


// антисохранение
// if (localStorage.getItem('taskHTML')) {
//     taskList.innerHTML = localStorage.getItem('taskHTML');
// }
// function saveHTML(){
//     localStorage.setItem('taskHTML',taskList.innerHTML);
// }










/*  задача
1 - найти форму где кнопка 
2 - найти область ввода текста 
3 -  добавить прослушку на форму и остановить обновление стр через функцию 
4 -  получить текст из ввода
5 -  создать константу на создание HTML задачи 
6 - найти таск доску задач = добавить на доску наш HTML 
7 -  очищять ввод и фокус сделать 
8 - найти иконку листочек
8.5 - скрывать иконку none список пуст - если есть задача у детей больше 1

              ***2*** удалить
9 -  ставим прослушку на доску что бы найти по клику 
10 - функция на прослушку если таргет кнопка равна delete
11 - обратившись кнопке находим ближайший родитель блок и делаем конст
12 - удаляем этот родитель
13 - вернем иконку лмчточек

             ***3*** готово
14 -  ставим прослушку на доску что бы найти по клику кнопку готово
15 - функция на прослушку если таргет кнопка равна done 
16 - обратившись кнопке находим ближайший родитель блок
15 - от рожителя находим span там и тег с .
16 -  добовляем класс текст--done , и делаем его как включатель 

             ***4***  массив сейф
17 - создадим массив с перемнной меняющей = пустой массив 
18 - созаем конст бокс для массива внутри id= время text, done= слсьляние 
19 - в массив добовляем бокс елемент в конец с пушом
20 - данные HTML переадресация делаем текст айди и ссклас состояние
21 - пишем логику если сскласс = состояние true либо false текст

             ***5*** удаляем из массива
22 - определяем ID задачи по родителям 
23 -       находим индекс задачи в массиве   (сложно)
24 -       удалить задачу из разметки массива  (сложно)

             ***6*** добавим из массива
25 - определяем ID задачи по родителям 

             ***7*** меняем листочек что бы был на массиве 
26 - создаем функцию проверку листочек *  если массив равна 0 то ()
27 -  конст = листочек новый 
28 -  на доску добавим листочек после начала 
29 - а если масса больше 0 * находим листочек 
30 -  строчнымы удаляем если нет то нет
31 - листочек запускаем в начале в добавлении и удалении

             ***8*** меняем листочек что бы был на массиве 
32 - создаем функцию  жейсон стрингифай ()
33 - запускаем сейф в добаление , удалиение и готово

             ***9*** получаем если в локал есть то добавим в массив
34 - получаем данные с локал стора
35 - парсим жейсона из локала в массив
36 - обходим массив через foreach и добавим html и редактим

             ***10***  новый HTNL делаем на функцию

*/









