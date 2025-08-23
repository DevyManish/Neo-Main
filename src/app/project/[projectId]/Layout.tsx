import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neo Project",
  description:
    "Neo is an agentic coder that helps dev teams to increase their productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="px-8 md:px-30">{children}</div>
      </body>
    </html>
  );
}
