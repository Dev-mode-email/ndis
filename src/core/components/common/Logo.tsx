import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/core/constants/routes'

interface LogoProps {
  className?: string
  onClick?: () => void
  clickable?: boolean
}

export const Logo = ({ className = 'h-12', onClick, clickable = true }: LogoProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (clickable) {
      if (onClick) {
        onClick()
      } else {
        navigate(ROUTES.DASHBOARD.HOME)
      }
    }
  }

  return (
    <img 
      src="/logo_pay_connex.png" 
      alt="PAY CONNEX" 
      className={`${className} ${clickable ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    />
  )
}

