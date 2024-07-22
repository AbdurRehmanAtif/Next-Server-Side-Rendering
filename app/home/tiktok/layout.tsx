export default function TiktokLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <h4>Tik Tok Layout</h4>
        {children}
      </section>
    )
  }