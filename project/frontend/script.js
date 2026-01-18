const map = L.map("map").setView([26.85, 80.95], 7);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

let pts = [];
let line;

map.on("click", async e => {
  if (pts.length === 2) {
    pts = [];
    if (line) map.removeLayer(line);
  }

  pts.push([e.latlng.lat, e.latlng.lng]);
  L.marker(e.latlng).addTo(map);

  if (pts.length === 2) {
    const r = await fetch("http://localhost:8000/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start: pts[0], end: pts[1] })
    });

    const d = await r.json();

    if (d.error) {
      alert(d.error);
      return;
    }

    line = L.polyline(d.route, { color: "blue" }).addTo(map);
    alert(`Distance: ${d.distance} km\nTime: ${d.duration} min`);
  }
});
