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
    <div className="min-h-screen bg-[#F8F5EF] px-5 py-8 text-[#555555] sm:px-6 lg:px-8">
      <main className="mx-auto flex max-w-6xl flex-col">
        <h1 className="mb-8 text-center text-3xl font-semibold text-[#555555] sm:text-4xl">
          The Hive Mind
        </h1>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users..."
            className="w-full max-w-md rounded-full border border-[#D9D9D9] bg-[#FDFAF3] px-4 py-3 text-sm text-[#555555] outline-none ring-0"
          />
        </div>

        <section className="flex flex-wrap justify-center gap-x-3 gap-y-5">
          {error ? (
            <p className="text-center text-sm font-semibold text-[#8b4f4f]">
              {error}
            </p>
          ) : filteredUsers.length === 0 ? (
            <div className="flex min-h-[220px] items-center justify-center px-4 py-10 text-center">
              <div className="rounded-2xl border border-[#E5DCCF] bg-[#FDFAF3] px-8 py-8 shadow-sm">
                <p className="text-4xl">🔍</p>
                <p className="mt-3 text-lg font-medium text-[#555555]">No users found.</p>
              </div>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <article
                key={user.id}
                className="flex h-[250px] w-[220px] items-center justify-center bg-[#D9D9D9] p-5 transition duration-200 ease-out hover:scale-105 hover:bg-[#C7C7C7]"
                style={{ clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)" }}
              >
                {/* I show one user. */}
                <div className="w-[80%] text-center">
                  <h2 className="mb-2 text-base font-semibold text-[#333333]">{user.name}</h2>
                  <p className="mb-2 text-sm leading-5 text-[#444444]">{user.email}</p>
                  <p className="text-sm leading-5 text-[#444444]">{user.company.name}</p>
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
