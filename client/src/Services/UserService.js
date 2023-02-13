export async function GetUser(uid) {
  fetch("http://localhost:3001/user/" + uid)
    .then((res) => {
      res.json()
    })
    .then((data) => {
      return data;
    });
}

export async function AddUser(user) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    fetch("http://localhost:3001/user/add", requestOptions);
}