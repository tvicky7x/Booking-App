// axios global
let axiosBase = axios.create({
  baseURL: "https://crudcrud.com/api/4a9d370ddffa46d281684bef5cc9a398",
});
// getting data from crud
axiosBase.get("/UserDetails").then((res) => {
  console.log(res.data.length);
  let n = res.data.length;
  for (let i = 0; i < n; i++) {
    makeList(res.data[i]);
  }
});
// submit event
document.getElementById("myform").addEventListener("submit", storeDate);
document.getElementById("user").addEventListener("click", clearData);
document.getElementById("user").addEventListener("click", editData);
// storing function
function storeDate(e) {
  e.preventDefault();
  clearMouse = true;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let vname, vemail;
  if (name === "" || name < 1) {
    document.getElementById("name").style.backgroundColor = "#F8BEBE";
  } else {
    document.getElementById("name").style.backgroundColor = "white";
    vname = name;
  }
  if (email === "" || email < 1) {
    document.getElementById("email").style.backgroundColor = "#F8BEBE";
  } else {
    document.getElementById("email").style.backgroundColor = "white";
    vemail = email;
  }
  if (vname && vemail) {
    let userDetails = { name: vname, email: vemail };
    let unique_id;
    axiosBase
      .post("/UserDetails", userDetails)
      .then((res) => {
        makeList(res.data);
        localStorage.setItem(res.data._id, JSON.stringify(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// clear data function
function clearData(e) {
  if (e.target.classList.contains("delete")) {
    let li = e.target.parentNode;
    document.getElementById("user").removeChild(li);
    axiosBase
      .delete(`/UserDetails/${li.id}`)
      .then((res) => {
        localStorage.removeItem(li.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// Edit form function
function editData(e) {
  if (e.target.classList.contains("edit")) {
    let li = e.target.parentNode;
    document.getElementById("user").removeChild(li);
    axiosBase
      .delete(`/UserDetails/${li.id}`)
      .then((res) => {
        let userDetails = JSON.parse(localStorage.getItem(li.id));
        document.getElementById("name").value = userDetails.name;
        document.getElementById("email").value = userDetails.email;
        localStorage.removeItem(li.id);
        let name = li.firstChild.te;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// making list item function
function makeList(data) {
  let li = document.createElement("li");
  li.className = "list-group-item";
  li.id = data._id;
  li.innerHTML = `${data.name} - ${data.email}<button class="btn btn-sm btn-danger fw-semibold float-end delete">
        X
      </button>
      <button
        class="btn btn-sm btn-warning fw-bolder float-end me-2 edit"
      >
        EDIT
      </button>`;
  document.getElementById("user").appendChild(li);
}
