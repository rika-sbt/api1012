const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, console.log("サーバーが開始されました"));

app.get("/", (req, res) => {
  res.send("チュートリアルにようこそ");
});

// CORSを全てのルートで許可
app.use(cors());

// お客様情報をサーバーに置いておく
const customers = [
  { title: "田中", id: 1 },
  { title: "斎藤", id: 2 },
  { title: "橋本", id: 3 },
  { title: "鈴木", id: 4 },
  { title: "安藤", id: 5 },
];

//データを取得(読み込み)してみよう(C「R」UD)
app.get("/api/customers", (req, res) => {
  res.send(customers);
});

app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  res.send(customer);
});

//データを送信(作成)してみよう(「C」RUD)
app.post("/api/customers", (req, res) => {
  const addCustomer = {
    title: req.body.title,
    id: customers.length + 1,
  };
  customers.push(addCustomer);
  res.send(customers);
});

//データを更新してみよう(C「U」RD)
app.put("/api/customers/:id",(req,res)=>{
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  customer.title = req.body.title;
  res.send(customer);
});

//データを更新してみよう(CUR「D」)
app.delete("/api/customers/:id",(req,res)=>{
  // URLで指定したidを、配列の要素一つ一つと比べて、同じidの要素を抽出
  const sarchCustomer = customers.find((c) => c.id === parseInt(req.params.id));
  // 前のステップで見つけた顧客の位置（index） をcustomers配列内で検索
  const index = customers.indexOf(sarchCustomer);
  // 例 index:3 = { title: "橋本", id: 3 } 
  // customersのindex個目の要素を一つ消す
  customers.splice(index,1);
  res.send(sarchCustomer);
});
