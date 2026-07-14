import { useEffect, useMemo, useState } from 'react'

export default function App() {
  // I make this input controlled, so it always matches what I type.
  const [search, setSearch] = useState('')

  // I store users after I fetch them from the API.
  const [users, setUsers] = useState([])

  // I use this to show loading while I fetch users.
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      try {
        setIsLoading(true)
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await res.json()

        if (isMounted) {
          setUsers(data)
        }
      } catch (error) {
        // I keep it simple: if fetch fails, users stay empty.
        if (isMounted) setUsers([])
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  // I filter users by name as I type (no page refresh).
  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return users

    return users.filter((u) => {
      const name = (u.name || '').toLowerCase()
      return name.includes(q)
    })
  }, [search, users])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">User Directory</h1>
          <p className="mt-2 text-slate-600">Search users by name.</p>
        </header>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700" htmlFor="search">
            Search
          </label>
          <input
            id="search"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="Type a name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* No users found in stages */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          {isLoading ? (
            <p className="text-slate-600">Loading...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-slate-600">No users found.</p>
          ) : (
            <ul className="space-y-3">
              {filteredUsers.map((u) => (
                <li key={u.id} className="rounded-md border border-slate-200 p-3">
                  <p className="text-lg font-semibold text-slate-900">{u.name}</p>
                  <p className="text-sm text-slate-700">{u.email}</p>
                  <p className="text-sm text-slate-700">{u.company?.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="mt-6 text-xs text-slate-500">
          I fetch data from jsonplaceholder and filter it as I type.
        </footer>
      </div>
    </div>
  )
}

