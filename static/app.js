const handleSubmit = (event) => {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
  readMemo();
};

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
const createMemo = async (memo) => {
  const respone = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: memo,
    }),
  });
};

const readMemo = async () => {
  const respons = await fetch("/memos");
  const jsonRespone = await respons.json();
  const ul = document.querySelector("#memo-list");
  ul.innerHTML = "";
  jsonRespone.forEach(displayMemo);
};

const displayMemo = (memo) => {
  const ul = document.querySelector("#memo-list");
  const li = document.createElement("li");
  const editBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  li.innerText = `${memo.content}`;
  editBtn.innerText = "수정";
  editBtn.dataset.id = memo.id;
  delBtn.innerText = "삭제";
  delBtn.dataset.id = memo.id;

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);

  editBtn.addEventListener("click", editMemo);
  delBtn.addEventListener("click", deleteMemo);
};

const editMemo = async (event) => {
  const id = event.target.dataset.id;
  const editContent = prompt("수정할 내용을 입력하세요.");
  const editMemo = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: editContent,
    }),
  });

  readMemo();
};

const deleteMemo = async (event) => {
  const id = event.target.dataset.id;
  const respons = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
};

readMemo();
