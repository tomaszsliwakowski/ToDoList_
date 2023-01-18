const input = document.querySelector(".form-control");
const btn = document.querySelector(".btn");
const list = document.querySelector(".todolist");

btn.addEventListener("click", () => {
  let InputValue = input.value;

  if (InputValue) {
    let listData = GetStorage();
    let id = (Math.random() * 12345).toFixed();
    let todo = { id, InputValue };
    listData = [todo, ...listData];
    AddStorage(listData);
    ShowListToDo();
    input.value = "";
  }
});

function ShowListToDo() {
  let data = GetStorage();
  let display = data.map(
    (item) =>
      `<li class="d-flex justify-content-between align-items-center flex-row list-group border border-primary px-3 py-2 mb-2 w-100 text-break " >
      <p class="m-0" >${item.InputValue}</p>
      <span class="m-0 ps-3"  onclick="RemoveTodo(${item.id})" ><i class="bi bi-trash3 h4" style="cursor:pointer"></i></span>
      </li>`
  );
  list.innerHTML = display.join("");
  if (data.length < 1) {
    list.innerHTML = "Brak zadań";
  }
}

function RemoveTodo(id) {
  let data = GetStorage();
  let newData = data.filter((item) => Number(item.id) !== id);
  AddStorage(newData);
  ShowListToDo();
}

function AddStorage(data) {
  localStorage.setItem("todo", JSON.stringify(data));
}

function GetStorage() {
  let storage =
    localStorage.getItem("todo") === null
      ? []
      : JSON.parse(localStorage.getItem("todo"));
  return storage;
}

window.addEventListener("DOMContentLoaded", ShowListToDo());
