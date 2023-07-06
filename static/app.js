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
  li.innerText = `[id: ${memo.id}] ${memo.content}`;
  ul.appendChild(li);
};

readMemo();
