const CtaLink = ({ Icon, Text }) => {
  return (
    <div className='cta'>
      <h2 className='text-xl'>{Text}</h2>
      <Icon className='text-gray-700' />
    </div>
  )
}

export default CtaLink
