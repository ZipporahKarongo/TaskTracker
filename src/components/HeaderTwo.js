const HeaderTwo = (props) => {
  return (
    <header>
        <h2>{props.title}</h2>
    </header>
  )
}
HeaderTwo.defaultProps = {
    title: "Info",
   }

export default HeaderTwo