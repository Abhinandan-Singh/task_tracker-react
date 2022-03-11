import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, showForm, display}) => {

  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color={display?"red":"Green"} text={display?"Close":"Add"} onClick={showForm}/>
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header;