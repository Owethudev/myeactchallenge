import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#555555]">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 sm:px-8 lg:px-12">
        <section className="flex w-full flex-col items-center rounded-[2rem] border border-[#e8e0d0] bg-[#fdfaf3] px-6 py-12 shadow-[0_20px_60px_rgba(85,85,85,0.08)] sm:px-10 lg:px-16">
          {/* I make my page. */}
          <div className="mb-8 text-center">
            {/* I show my title. */}
            <h1 className="text-4xl font-semibold tracking-tight text-[#555555] sm:text-5xl lg:text-6xl">
              User Directory
            </h1>
          </div>

          {/* I keep my users here. */}
          <div className="mb-10 flex h-40 w-full max-w-4xl items-center justify-center rounded-[1.5rem] border border-dashed border-[#d9cfbb] bg-[#f7efe2] sm:h-48 lg:h-56">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8f8575]">
              Beehive area
            </p>
          </div>

          <div className="w-full max-w-3xl rounded-[1.5rem] border border-[#ece5d8] bg-white/70 p-6 sm:p-8 lg:p-10">
            <p className="text-center text-lg leading-8 text-[#666666]">
              This page is ready for the next step. I will add the user cards soon.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
