from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Memo(BaseModel):
  id: str
  content: str
    
memos = []

app = FastAPI()


@app.get("/memos")
def read_memo():
  return memos

@app.post("/memos")
def create_memo(memo: Memo):
  memos.append(memo)
  return '메모추가: ', memo

@app.put("/memos/{memo_id}")
def put_memo(request_memo: Memo):
  for memo in memos:
    if memo.id == request_memo.id:
      memo.content = request_memo.content
      return "memo update: ", memo
  return "memo not found!!"

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id: str):
  for index, memo in enumerate(memos):
    if memo.id == memo_id:
      memos.pop(index)
      return "memo deleted!!"
  return "memo not found!!"

app.mount("/", StaticFiles(directory="static", html=True), name="static")