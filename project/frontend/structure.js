document.getElementById("login_data").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone_number").value;
  const zone = document.getElementById("Zone").value;


  if (name === "" || phone === "" || zone === "") {
    alert("Fill all details");
    return;
  }


  if (zone !== "Center") {
    alert("This zone is not added yet");
    return;
  }


  fetch("http://localhost:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      zone: zone
    })
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Backend error");
      }
      return res.json();
    })
    .then(() => {
      window.location.href = "map.html";
    })
    .catch((err) => {
      console.error(err);
      alert("Backend not running");
    });
});
