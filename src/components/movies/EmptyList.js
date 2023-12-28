

const EmptyList = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
        <div>
          <h2 className="mb-10 text-center">Your movie list is empty</h2>
          <div className="flex justify-center items-center"><button className="button max-w-52">Add a new movie</button></div>
        </div>
      </div>
  )
}

export default EmptyList
