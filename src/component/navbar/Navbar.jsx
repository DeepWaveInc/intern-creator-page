import React, { useEffect, useCallback, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { sendGAEvent } from '../../_helpers'
import { subscriptionActions } from '../../_actions'
import { API_ACCOUNT_URL } from '../../_constants'
import { axios } from '../../_services'
import clsx from 'clsx'
import { ReactComponent as Logo } from '../../assets/image/logo.svg'
import Navigation from '../navigation'
import Hamburger from '../hamburger'
import './Navbar.scss'

const Navbar = ({ className = null }) => {
  const [isOpen, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { update } = subscriptionActions
  const getSubscriptionRef = useRef(false)
  const user = useSelector((state) => state.authentication?.user, shallowEqual)

  const [isLeavingTop, setLeavingTop] = useState(false)
  const navRef = useRef(null)
  const hamburgerRef = useRef(null)

  const handleHamburgerTrigger = useCallback((e) => {
    e.stopPropagation()
    setOpen((value) => !value)
  }, [])

  const handleDocumentScroll = () => {
    setLeavingTop(
      () =>
        window.scrollY >= navRef.current.offsetHeight &&
        className !== 'dark-theme'
    )
  }

  const handleGetSubscription = useCallback(async () => {
    if (user) {
      const { data } = await axios.get(
        `${API_ACCOUNT_URL}/api/v1/user/me/subscription`
      )
      dispatch(update(data.result))
    }
  }, [dispatch, update, user])

  useEffect(() => {
    document.addEventListener('scroll', handleDocumentScroll)
    return () => {
      document.removeEventListener('scroll', handleDocumentScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    !getSubscriptionRef.current && handleGetSubscription()

    return () => {
      getSubscriptionRef.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <nav
      ref={navRef}
      className={clsx(className, { 'dark-theme': isLeavingTop })}
    >
      <Link
        to={user ? '/studio' : '/'}
        className="logo"
        onClick={() => {
          sendGAEvent('header', 'click', 'btn_logo')
        }}
      >
        <Logo />
      </Link>
      <Navigation
        {...{ user, active: isOpen, setActive: setOpen, hamburgerRef }}
      />
      <Hamburger
        active={isOpen}
        onClick={handleHamburgerTrigger}
        ref={hamburgerRef}
      />
    </nav>
  )
}

Navbar.propTypes = {
  className: PropTypes.oneOf(['dark-theme', null])
}

export default Navbar
