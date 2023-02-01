export async function GetUser(email) {
    fetch("http://localhost:3001/user/", email)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
}

export async function AddUser(user) {
    fetch("http://localhost:3001/user/add", user)
      .catch((err) => console.log(err));
}