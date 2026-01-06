import NavBar from "@/components/NavBar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="z-50">
        <NavBar />
      </header>
      <main className="w-full">
        {children}
      </main>
    </>
  );
}