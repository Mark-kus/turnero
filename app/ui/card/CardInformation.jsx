const CardInformation = ({ title, content }) => {
  return (
    <>
      <h2 className='font-medium leading-3'>{title}</h2>
      <div className='text-xs leading-5'>
        {content.map((item, index) => {
          return (
            <p key={index}>
              {item.name}: {item.value}
            </p>
          )
        })}
      </div>
    </>
  )
}

export default CardInformation
