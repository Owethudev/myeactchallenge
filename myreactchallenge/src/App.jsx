import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // I get my users.
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Bad request");
        }
        return res.json();
      })
      .then((data) => {
        // I save my users.
        setUsers(data);
      })
      .catch(() => {
        setError("I could not load the users.");
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    // I check every name.
    const lowerSearch = search.toLowerCase();
    return user.name.toLowerCase().includes(lowerSearch);
  });

  return (
    <div className="page">
      <main className="main">
        <h1 className="title">The Hive Mind</h1>

        <div className="searchBox">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users..."
            className="searchInput"
          />
        </div>

        <section className="honeycomb">
          {error ? (
            <p className="error">{error}</p>
          ) : (
            filteredUsers.map((user) => (
              <article className="hexagon" key={user.id}>
                {/* I show one user. */}
                <div className="hexagonInner">
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                  <p>{user.company.name}</p>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
