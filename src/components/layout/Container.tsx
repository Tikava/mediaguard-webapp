import React from 'react'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 md:px-8 ${className}`}>{children}</div>
)

export default Container
