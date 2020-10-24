const Home = ({ children, logout, getData }) => {
  return (
    <div>
      <button onClick={logout}>logout</button>
      <button onClick={getData}>get private data</button>
      <div>
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  )
}

export default Home
