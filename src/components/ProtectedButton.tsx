import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  redirectTo?: string;
}

const ProtectedButton: React.FC<ProtectedButtonProps> = ({ 
  children, 
  className = '', 
  onClick,
  redirectTo = '/login'
}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      onClick?.();
    } else {
      navigate(redirectTo);
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export default ProtectedButton;