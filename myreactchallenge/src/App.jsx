import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
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

  return (
    <div className="page">
      <main className="main">
        <h1 className="title">User Directory</h1>

        <section className="honeycomb">
          {error ? (
            <p className="error">{error}</p>
          ) : (
            users.map((user) => (
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
