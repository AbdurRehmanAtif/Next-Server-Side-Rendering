async function handshake() {

  const response = await fetch('http://localhost:3000/api/handshake', {
    method: "GET",
    cache: 'no-store'
  });
  return response.json();
}

export default async function Todo() {

  const data = await handshake()

  return (

    <div className="w-[400px] m-6 h-[200px]">
      <button>{data?.statue} Coming from clirnyt</button>
    </div >
  );
}
