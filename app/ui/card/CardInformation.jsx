const CardInformation = ({ title, content }) => {
  return (
    <>
      <h2 className='font-medium'>{title}</h2>
      <div className='text-xs'>
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
