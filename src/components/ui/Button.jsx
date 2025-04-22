function Button({ children, onClick, disabled }) {
  if (disabled)
    return (
      <button
        disabled={disabled}
        className="rounded-full bg-blue-400 px-2.5 py-2 text-sm md:text-base"
      >
        {children}
      </button>
    )

  if (onClick)
    return (
      <button
        onClick={onClick}
        className="rounded-full bg-blue-400 px-2.5 py-2 text-sm md:text-base"
      >
        {children}
      </button>
    )
  return (
    <button className="rounded-full bg-blue-400 px-2.5 py-2 text-sm md:text-base">
      {children}
    </button>
  )
}

export default Button
